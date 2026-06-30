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
// 체크박스·토글·라디오 등 다른 input 은 제외하고 TableInputCell 의 편집 input 만 이동 대상으로 한다.
const ENABLED_INPUT_SELECTOR = `input[${TABLE_INPUT_CELL_MARKER_ATTRIBUTE}]:not([disabled])`;

const getRowInputs = (row: Element) =>
  Array.from(row.querySelectorAll<HTMLInputElement>(ENABLED_INPUT_SELECTOR));

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

  const rowInputs = getRowInputs(row);
  const columnIndex = rowInputs.indexOf(input);

  // 좌/우 이동은 같은 행 안에서 순환(맨 끝에서 더 이동하면 반대편 끝)한다.
  if (direction === 'left' || direction === 'right') {
    const step = direction === 'left' ? -1 : 1;
    const nextIndex =
      (columnIndex + step + rowInputs.length) % rowInputs.length;

    return rowInputs[nextIndex] ?? null;
  }

  const body = input.closest(ROW_GROUP_SELECTOR);

  if (!body) return null;

  const editableRows = Array.from(
    body.querySelectorAll<HTMLElement>(ROW_SELECTOR),
  ).filter((candidate) => candidate.querySelector(ENABLED_INPUT_SELECTOR));
  const rowIndex = editableRows.indexOf(row);

  // 위/아래 이동도 같은 열에서 순환(맨 끝 행에서 더 이동하면 반대편 끝 행)한다.
  const step = direction === 'up' ? -1 : 1;
  const targetRow =
    editableRows[(rowIndex + step + editableRows.length) % editableRows.length];

  if (!targetRow) return null;

  const targetInputs = getRowInputs(targetRow);
  const clampedIndex = Math.min(columnIndex, targetInputs.length - 1);

  return targetInputs[clampedIndex] ?? null;
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
