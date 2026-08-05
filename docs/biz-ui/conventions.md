# biz-ui 컴포넌트 · 속성 컨벤션

> 디자인팀이 정리한 `@bbodek/internal-ui` 컨벤션 문서를 biz-ui의 컴포넌트 API 계약으로 채택한 것입니다.
> 원 근거: Storybook `core/internal-ui` 및 Figma "Bbodek Design System" (Button, SearchSelect, MultiSearchSelect, DatePicker, ConfirmModal, InfoModal, FormDialog, InfoDialog).
>
> **biz-ui 컴포넌트를 만들 때는 이 문서를 먼저 읽고, 여기서 벗어나는 API를 새로 만들지 않습니다.**
> biz-ui가 internal-ui와 갈라지는 지점은 [§8 biz-ui 적용 시 차이](#8-biz-ui-적용-시-차이)에 모아 둡니다.

---

## 1. 컴포넌트 명명 규칙

- **PascalCase 복합어**로 짓는다.
- **수식어(접두어)를 쌓아 파생**한다: `Select` → `SearchSelect`(검색형) → `MultiSearchSelect`(다중+검색형).
  - `Multi` = 다중 선택, `Search` = 검색 가능.
- **용도 접두어 + 형태 접미어** 패턴(오버레이 계열): `Confirm`/`Info`/`Form` + `Modal`/`Dialog`.
- Storybook 계층: `core/internal-ui/<그룹>/<컴포넌트>` (성격이 같은 컴포넌트는 그룹 폴더로 묶음).

### 주의: 파일 ID ≠ 컴포넌트명

스토리 ID가 `calendar`인 컴포넌트의 실제 이름은 **DatePicker**다. 경로명과 컴포넌트명이 다를 수 있으니 컴포넌트명 기준으로 판단한다.

---

## 2. 속성(prop) 명명 규칙

모든 prop은 **camelCase**.

### Boolean

- HTML 기본 속성은 접두어 없이 그대로: `disabled`, `required`
- 컴포넌트 고유 상태는 `is` 접두어: `isError`, `isPending`, `isLoading`, `isOpen`
- 기능 on/off 토글은 `use` 접두어: `useReset`, `useIcon`, `useTooltip`

### 이벤트 핸들러

- `on` + 동사(PascalCase): `onClick`, `onChange`, `onSelect`, `onConfirm`, `onCancel`
- 의미에 맞게 선택: 단일 선택 = `onSelect`, 다중/폼 변경 = `onChange`

### 설정 묶음 객체 — `~Option` 접미어

관련 세부 설정을 개별 prop으로 흩뿌리지 않고 하나의 객체로 캡슐화한다.
`inputOption`, `popoverOption`, `iconOption`, `confirmOption`, `cancelOption`, `tooltipOption`

- 예) `confirmOption = { label*, onConfirm*, tooltipOption: { content, useTooltip } }`
- 예) `iconOption = { iconKey, color, backgroundColor }`

### 값(제어형)

- `value` = 현재 값, `displayValue` = 표시용 값(분리)
- **제어 컴포넌트 패턴 강제**: `value` + 콜백을 항상 쌍으로 필수(★) 지정

### 공통 옵션 prop

- `className`(스타일 오버라이드, string), `ref`(전달), `children`(ReactNode)
- 폼 필드: `label`(주 텍스트), `placeholder`, `feedback`(도움말/에러 메시지), `badge`(라벨 옆 ReactNode)

---

## 3. 스타일 열거형 규칙

스타일 축을 **역할별로 분리**하여 각각 string literal union으로 받는다.

| prop      | 의미      | 값                                             | 기본      |
| --------- | --------- | ---------------------------------------------- | --------- |
| `variant` | 형태/채움 | `'filled' \| 'outlined' \| 'tonal' \| 'text'`  | `filled`  |
| `theme`   | 색상      | `'primary' \| 'gray' \| 'red' \| 'green' \| 'yellow'` | `primary` |
| `size`    | 크기      | `'xs' \| 'sm' \| 'md' \| 'lg'`                 | `lg`      |

**반응형**: `responsive` 중첩 객체 안에 `mobile / tablet / desktop` 키, 각각 동일한 size 스케일(breakpoint override).

---

## 4. 문서화 규칙

- 필수 속성은 이름 뒤 **빨간 별표(`*`)**.
- 설명은 **"`<컴포넌트명> <속성 목적>`"** 형식으로 시작 ("Button Label", "SearchSelect label").
- Boolean 기본값은 대부분 `false`, 기능 활성 토글만 예외(`useReset: true`).

---

## 5. 컴포넌트별 속성표

### Button — `core/internal-ui/Button/Button`

| 속성                               | 타입                                    | 필수 | 기본    |
| ---------------------------------- | --------------------------------------- | ---- | ------- |
| `label`                            | string                                  | ★    | -       |
| `variant`                          | 'filled'\|'outlined'\|'tonal'\|'text'   |      | filled  |
| `size`                             | 'xs'\|'sm'\|'md'\|'lg'                  |      | lg      |
| `theme`                            | 'primary'\|'gray'\|'red'\|'green'\|'yellow' |  | primary |
| `disabled`                         | boolean                                 |      | false   |
| `onClick`                          | function                                |      | -       |
| `type`                             | 'button'\|'submit'\|'reset'             |      | button  |
| `isPending`                        | boolean                                 |      | false   |
| `iconPosition`                     | 'left'\|'right'                         |      | left    |
| `className`                        | string                                  |      | -       |
| `ref`                              | Ref\<HTMLButtonElement\>                |      | -       |
| `iconOption.iconKey`               | string (@phosphor-icons/web)            |      | -       |
| `responsive.mobile/tablet/desktop` | 'xs'\|'sm'\|'md'\|'lg'                  |      | -       |

### SearchSelect — `core/internal-ui/Select/SearchSelect` (단일 선택 + 검색)

| 속성            | 타입                | 필수 | 기본  |
| --------------- | ------------------- | ---- | ----- |
| `label`         | string              | ★    | -     |
| `value`         | string\|number\|null | ★   | -     |
| `displayValue`  | string\|number\|null | ★   | -     |
| `onSelect`      | function            | ★    | -     |
| `popoverOption` | object              |      | -     |
| `inputOption`   | object              |      | -     |
| `badge`         | ReactNode           |      | -     |
| `placeholder`   | string              |      | -     |
| `isError`       | boolean             |      | false |
| `disabled`      | boolean             |      | false |
| `required`      | boolean             |      | false |
| `feedback`      | string              |      | -     |
| `useReset`      | boolean             |      | true  |

### MultiSearchSelect — `core/internal-ui/Select/MultiSearchSelect` (다중 선택 + 검색)

| 속성            | 타입                       | 필수 | 기본  |
| --------------- | -------------------------- | ---- | ----- |
| `label`         | string                     | ★    | -     |
| `options`       | MultiSelectOption\<T\>[]   | ★    | -     |
| `value`         | MultiSelectOption\<T\>[]   | ★    | -     |
| `onChange`      | function                   | ★    | -     |
| `disabled`      | boolean                    |      | false |
| `feedback`      | string                     |      | -     |
| `required`      | boolean                    |      | false |
| `isError`       | boolean                    |      | false |
| `placeholder`   | string                     |      | -     |
| `className`     | string                     |      | -     |
| `badge`         | ReactNode                  |      | -     |
| `inputOption`   | InputSearchProps           |      | -     |
| `popoverOption` | object                     |      | -     |

### DatePicker — `core/internal-ui/Calendar`

스토리로 확인된 모드: Single, Range, Unbounded, With Min Max Date, With Holidays, With Disabled Days, With External Days Labels, With Weekend. (속성표 미확보)

---

## 6. 오버레이 계열 (Modal / Dialog)

### 6-1. 최상위 구분

| 그룹       | 용도               | 형태                | 컴포넌트                 |
| ---------- | ------------------ | ------------------- | ------------------------ |
| **Modal**  | 알림·확인/컨펌     | 화면 중앙, 작은 크기 | ConfirmModal, InfoModal  |
| **Dialog** | 정보 입력·상세 정보 제공 | 큰 크기, 폼·차트·테이블 | FormDialog, InfoDialog |

> 둘 다 내부적으로 `<dialog>`(`ref: Ref<HTMLDialogElement>`) 기반. 선택 축: ① 입력/상세=Dialog vs 확인/알림=Modal → ② 그룹 내 세부.

### 6-2. 공통 속성 계약

| 속성            | 타입                                     | 필수 | 의미                     |
| --------------- | ---------------------------------------- | ---- | ------------------------ |
| `title`         | string                                   | ★    | 타이틀                   |
| `isOpen`        | boolean                                  | ★    | 열림 상태(제어형)        |
| `confirmOption` | object(label★, onConfirm★, tooltipOption) | ★   | 확인 버튼                |
| `cancelOption`  | object(label, onCancel)                  |      | 취소 버튼(생략 시 단일 버튼) |
| `isLoading`     | boolean                                  |      | 로딩                     |
| `children`      | ReactNode                                |      | 본문                     |
| `className`     | string                                   |      | 스타일 오버라이드        |
| `ref`           | Ref\<HTMLDialogElement\>                 |      | DOM 참조                 |

> `isPending`("data fetching is pending")은 **서버 액션형(FormDialog·ConfirmModal)만** 보유. 읽기 전용(InfoModal·InfoDialog)엔 없음.

### 6-3. 컴포넌트별 고유 속성 · 사용 상황

| 컴포넌트         | 고유 속성                                          | 사용 상황                                                                                                  |
| ---------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **ConfirmModal** | `useIcon`, `iconOption`, `possibleConfirm`          | 유저 확인/컨펌. `cancelOption` 있으면 2버튼(예/아니요) — 삭제·이탈 등 되돌릴 수 없는 액션 확인. 없으면 1버튼(확인) — 완료 알림 |
| **InfoModal**    | `confirmOption.tooltipOption`                       | 정보 제공 + 알림. `children`에 설명/이미지. 1~2버튼(닫기/바로가기)                                        |
| **FormDialog**   | `slot`, `wrapperClassName`, `possibleConfirm`, `isPending` | Form 형식 정보 입력(날짜·선택·인풋). 취소/완료                                                     |
| **InfoDialog**   | `confirmOption.tooltipOption`                       | 상세 정보 제공(차트·테이블). 닫기 버튼 전용(읽기 전용). 가장 단순                                          |

### 6-4. 특유 패턴

- **중첩 `~Option` 캡슐화**: 버튼/아이콘 설정을 역할 단위 객체로 묶음.
- **`possibleConfirm` ↔ 툴팁 연동**: `tooltipOption.useTooltip` 기본값이 `!possibleConfirm`. 확인 불가 시 자동으로 "필수 항목을 모두 입력해주세요" 툴팁 노출. 폼 유효성 + 버튼 활성화 + 안내가 한 속성으로 묶임.

---

## 7. 발견된 비일관성 (점검 필요)

1. 에러 상태는 `isError`인데 `disabled`/`required`는 접두어 없음(HTML 기본 속성은 원형 유지 규칙으로 설명 가능하나 혼용 주의).
2. 유사 콜백이 컴포넌트마다 `onSelect`(SearchSelect) vs `onChange`(MultiSearchSelect)로 갈림.
3. `className`이 Button·MultiSearchSelect엔 문서화됐지만 SearchSelect 표엔 미표기.
4. 스토리 ID(`calendar`)와 컴포넌트명(`DatePicker`) 불일치.

---

## 8. biz-ui 적용 시 차이

위 컨벤션은 internal-ui(어드민·데스크톱) 기준입니다. biz-ui는 모바일 WebView 타깃이라 아래 항목이 달라집니다.
**Figma BIZpartner 파일의 실제 variant 축을 기준으로 판단하고, 이 문서의 표를 그대로 베끼지 않습니다.**

| 항목                  | internal-ui 컨벤션                            | biz-ui 실제 (Figma `46:148` Button 섹션)                                              |
| --------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------- |
| `size` 스케일         | `xs \| sm \| md \| lg`                        | CtaButton은 `sm \| md \| lg` — **`xs` 없음**. 터치 타겟 44px 하한과 충돌               |
| `theme` 값            | `primary \| gray \| red \| green \| yellow`    | CtaButton은 `primary \| gray` 2종만                                                    |
| `theme` 공유 여부     | 컴포넌트 간 공통 union 가정                    | IconButton은 `default \| filled \| dark` — **CtaButton과 값이 겹치지 않음.** 컴포넌트별로 따로 정의 |
| 상호작용 상태         | `hover` 중심                                   | Figma가 `hover`·`pressed`를 모두 정의. 터치 기기에선 `pressed`(`:active`)가 주력       |
| `responsive` prop     | `mobile / tablet / desktop` breakpoint override | 모바일 단일 타깃이라 해당 없음. 도입 전까지 넣지 않음                                 |
| Storybook 타이틀      | `core/internal-ui/…`                           | `core/biz-ui/…`                                                                        |

### `theme='primary'` ↔ 컬러 토큰 `blue` 관계

두 이름이 다른 것은 의도된 것입니다. 레이어가 다릅니다.

- **토큰 레이어**: `--color-blue-500`. Figma 변수명(`blue/500`)을 그대로 씁니다. `primary`로 개명하지 않습니다.
- **컴포넌트 API 레이어**: `theme='primary'`. 색이 아니라 **역할**을 가리킵니다.

`theme='primary'`가 내부적으로 `blue` 토큰을 참조하는 구조입니다. 둘을 일치시키려고 어느 한쪽을 바꾸지 않습니다.

### 토큰 프리픽스 없음

biz-ui 토큰·유틸리티에는 프리픽스가 **없습니다** (`--color-blue-500`, `text-body`, `safe-area-top`).
internal-ui의 `in-` 프리픽스는 그쪽이 다른 디자인시스템과 공존하느라 붙인 것이라 biz-ui는 따라가지 않습니다. 자세한 배경은 [frontend.md](./frontend.md)를 참고합니다.

---

## 부록: 미확보 항목

원문 기준으로 아래 항목은 속성표가 확보되지 않았습니다. 해당 컴포넌트를 만들 때는 이 문서에 기댈 수 없으므로 Figma와 internal-ui 구현을 직접 확인해야 합니다.

- Alert 속성표 (스토리: Default, With Title, With Button, With Close, With Collapsible)
- Checkbox 속성표 (스토리: Default, With Label, Checked, Disabled)
- DatePicker 상세 속성표
