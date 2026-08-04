import { KeyboardEvent } from 'react';

import { TABLE_INPUT_CELL_MARKER_ATTRIBUTE } from '@/components/Table/constants';

type ArrowDirection = 'up' | 'down' | 'left' | 'right';

const ARROW_KEY_DIRECTIONS: Record<string, ArrowDirection> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
};

const ROW_SELECTOR = '[role="row"]';
// 헤더(별도 rowgroup)를 제외하고 본문 행만 탐색하기 위해 Body rowgroup 으로 범위를 한정한다.
const ROW_GROUP_SELECTOR = '[role="rowgroup"]';
// 고정 열은 별도 그룹 div 로 감싸이므로 직계 자식이 아닌 하위 전체에서 셀을 찾는다.
const CELL_SELECTOR = '[role="cell"], [role="rowheader"]';
// 체크박스·토글·라디오 등 다른 input 은 제외하고 TableInputCell 의 편집 input 만 이동 대상으로 한다.
const ENABLED_INPUT_SELECTOR = `input[${TABLE_INPUT_CELL_MARKER_ATTRIBUTE}]:not([disabled])`;

const getRowInputs = (row: Element) =>
  Array.from(row.querySelectorAll<HTMLInputElement>(ENABLED_INPUT_SELECTOR));

const getRowCells = (row: Element) =>
  Array.from(row.querySelectorAll<HTMLElement>(CELL_SELECTOR));

/**
 * 상/하 이동은 편집 가능한 input 순서가 아니라 실제 셀(열) 위치를 기준으로 삼는다.
 * disabled InputCell 이 섞인 행은 편집 가능한 input 개수가 행마다 달라져,
 * input 순서를 열 위치로 쓰면 다른 열로 이동하게 된다.
 */
const getColumnIndex = (row: Element, input: HTMLInputElement) => {
  const cell = input.closest<HTMLElement>(CELL_SELECTOR);

  if (!cell) return -1;

  return getRowCells(row).indexOf(cell);
};

const getInputAtColumn = (row: Element, columnIndex: number) =>
  getRowCells(row)[columnIndex]?.querySelector<HTMLInputElement>(
    ENABLED_INPUT_SELECTOR,
  ) ?? null;

/**
 * 좌/우 이동은 캐럿이 텍스트 경계(맨 앞/맨 뒤)에 있을 때만 셀 이동으로 처리하고,
 * 그 외에는 input 내부 캐럿 이동(기본 동작)을 유지한다.
 * type="number" 등 selection API 를 지원하지 않는 input 은 경계 판별이 불가능하므로
 * 좌/우 이동을 하지 않는다.
 */
const isCaretAtEdge = (
  input: HTMLInputElement,
  direction: 'left' | 'right',
) => {
  const { selectionStart, selectionEnd, value } = input;

  if (selectionStart === null || selectionEnd === null) return false;

  if (selectionStart !== selectionEnd) return false;

  return direction === 'left'
    ? selectionStart === 0
    : selectionEnd === value.length;
};

const getTargetInput = (input: HTMLInputElement, direction: ArrowDirection) => {
  const row = input.closest<HTMLElement>(ROW_SELECTOR);

  if (!row) return null;

  // 좌/우 이동은 같은 행 안에서 순환(맨 끝에서 더 이동하면 반대편 끝)한다.
  if (direction === 'left' || direction === 'right') {
    const rowInputs = getRowInputs(row);
    const inputIndex = rowInputs.indexOf(input);
    const step = direction === 'left' ? -1 : 1;
    const nextIndex = (inputIndex + step + rowInputs.length) % rowInputs.length;

    return rowInputs[nextIndex] ?? null;
  }

  const body = input.closest(ROW_GROUP_SELECTOR);

  if (!body) return null;

  const rows = Array.from(body.querySelectorAll<HTMLElement>(ROW_SELECTOR));
  const rowIndex = rows.indexOf(row);
  const columnIndex = getColumnIndex(row, input);

  if (rowIndex === -1 || columnIndex === -1) return null;

  // 위/아래 이동은 항상 같은 열을 유지하며 순환(맨 끝 행에서 더 이동하면 반대편 끝 행)하고,
  // 그 열이 비어 있거나 disabled 인 행은 건너뛰고 다음 행을 찾는다.
  const step = direction === 'up' ? -1 : 1;

  for (let offset = 1; offset < rows.length; offset += 1) {
    const targetRowIndex =
      (((rowIndex + step * offset) % rows.length) + rows.length) % rows.length;
    const targetInput = getInputAtColumn(rows[targetRowIndex], columnIndex);

    if (targetInput) return targetInput;
  }

  return null;
};

/**
 * 테이블 InputCell 안에서 상/하/좌/우 화살표 키로 인접한 InputCell 로 포커스를 이동한다.
 * 체크박스·토글·라디오 등은 이동 대상에서 제외되며, 테이블은 compound 컴포넌트
 * (중앙 그리드 모델이 없음)이므로 `role` 기반 DOM 탐색으로 인접 input 을 찾는다.
 */
export const handleTableCellInputArrowNavigation = (
  e: KeyboardEvent<HTMLInputElement>,
) => {
  const direction = ARROW_KEY_DIRECTIONS[e.key];

  if (!direction) return;

  // 한글 등 IME 조합 중에 이동하면 조합 중이던 글자가 이동한 셀에 입력되므로,
  // 조합이 끝난 뒤(다음 키 입력)에 이동하도록 한다.
  if (e.nativeEvent.isComposing) return;

  const input = e.currentTarget;

  if (
    (direction === 'left' || direction === 'right') &&
    !isCaretAtEdge(input, direction)
  ) {
    return;
  }

  const targetInput = getTargetInput(input, direction);

  if (!targetInput) return;

  e.preventDefault();
  targetInput.focus();
  targetInput.select();
};
