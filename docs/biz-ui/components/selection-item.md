# SelectionItem 구현 기록

`apps/biz-ui/src/components/SelectionItem` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 이 컴포넌트 고유 사실만 둡니다.

Figma: [SelectionItem 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=129-718&m=dev) (`129:718`). 실제 값은 심볼 `128:471` · `128:472`에서 실측했습니다. 선택 영역 주석은 `355:1277`입니다.

사용 예시는 「고객 비즈」 파일의 [ORD-001-B01 날짜 선택](https://www.figma.com/design/LomGIAwvPAkyRbBcGbk9rs/%EA%B3%A0%EA%B0%9D-%EB%B9%84%EC%A6%88?node-id=1424-12550&m=dev) (`1424:12550`) — 바텀시트 안에 7개가 세로로 놓입니다(340 폭 · gap 10).

## 구현 현황

| 컴포넌트               | 티켓       | 공개 | 설명                                                 |
| ---------------------- | ---------- | ---- | ---------------------------------------------------- |
| `SelectionItem`        | DOTOLI-246 | ✅   | `checked` 1축. 카드 전체가 선택 영역. **값을 고름**   |
| `ActionSelectionItem`  | DOTOLI-311 | ✅   | 같은 카드의 버튼판. **누르면 동작이 일어남**          |
| `SelectionItemContent` | DOTOLI-311 | ❌   | 라벨 + `선택중` 배지. 둘이 공유하는 계열 조각         |

**DOTOLI-311에서 단독 폴더를 계열로 승격했습니다** — `Chip`이 `ActionChip`을(DOTOLI-295), `NavigationListItem`이 `LinkNavigationListItem`을(DOTOLI-306) 맞으면서 한 것과 같은 형태입니다. 시각은 `shared`가 통째로 갖고 두 컴포넌트는 **감싸는 요소만 다릅니다.**

**`ActionSelectionItem`에는 Figma 심볼이 없습니다.** 카드 시각이 `SelectionItem`과 같고 요소만 `<button>`이라, 대응 심볼 없이 만든 `LinkCtaButton` · `LinkIconButton`과 같은 자리입니다 ([button.md](./button.md) 「이름」).

## Variant 축

| 축           | Figma 이름   | 값               |
| ------------ | ------------ | ---------------- |
| 선택 여부    | `isSelected` | `false` · `true` |

**`disabled` 축이 없습니다.**

## 실측 스펙

| 항목      | 값                                                       |
| --------- | ---------------------------------------------------------- |
| 카드      | 340 × 56 → **`h-[56px]` · `w-full`**. 340은 모바일 컨텐츠 폭이라 고정하지 않습니다 |
| padding   | `px-[24px]`. 세로는 아래 「높이를 고정합니다」               |
| radius    | 6 → `rounded-6`                                             |
| 라벨      | `body-lg` (18 · Medium · 1.45 · -0.54px) · `gray/900`       |
| 배지      | `Badge` `variant='filled'` `theme='primary'`, 라벨 `선택중` |

| 상태       | 배경         | 테두리            | 배지   |
| ---------- | ------------ | ----------------- | ------ |
| `default`  | `base/white` | **없음**          | 없음   |
| `selected` | `blue/100`   | 1px `blue/300`    | 있음   |

### 테두리는 `inset-ring`입니다 — `ItemCheckbox`와 갈립니다

겉모습이 가장 가까운 `ItemCheckbox`는 `border`인데 여기는 `inset-ring`입니다. **두 카드의 Figma 수치가 실제로 다르기 때문입니다.**

| | `ItemCheckbox` (340 × 60) | `SelectionItem` (340 × 56) |
| --- | --- | --- |
| 계산 | 15 + 28(체크박스) + 15 = **58** | 15 + 26.1(라벨) + 15 = **56.1** |
| 프레임과의 차 | +2 → **stroke가 프레임에 포함됨** | 0 → **stroke가 프레임을 안 키움** |
| 테두리 축 | 두 상태 모두 1px (색만 바뀜) | **선택 시에만** 있음 |
| 결론 | `border` | `inset-ring` |

두 근거가 같은 방향을 가리킵니다 — 패딩 계산이 프레임과 맞아떨어져 stroke가 프레임 밖이고, 애초에 테두리가 상태별로 생겼다 사라집니다.

**높이를 고정한 뒤에도 `border`는 답이 아닙니다.** preflight의 `box-sizing: border-box` 덕에 바깥 높이는 56으로 버티지만, **콘텐츠 박스가 선택 시에만 2px 줄어** 라벨이 밀리고 말줄임 지점도 함께 움직입니다. CLAUDE.md 「스타일 규칙」이 못박은 「콘텐츠가 밀린다」가 그대로입니다.

### 배지는 `Badge`를 그대로 씁니다

Figma의 배지가 `Badge` 컴포넌트 인스턴스(`533:1676`)이고, `variant='filled'` · `theme='primary'` 조합이 실측값과 **정확히** 일치합니다.

| 항목    | Figma                        | `BADGE_STYLES.filled.primary` |
| ------- | ---------------------------- | ----------------------------- |
| 배경    | `blue/600` (`#2372dc`)       | `bg-blue-600`                 |
| 라벨    | `caption` · `base/white`     | `caption` · `COLOR_VARIANTS.WHITE` |
| padding | `px-[8px] py-[3px]`          | `BADGE_BASE_STYLE`            |
| radius  | 6                            | `rounded-6`                   |

`theme='primary'`는 `Badge`의 기본값과 같지만 **실측으로 확인한 값이라 상수로 명시**했습니다 (`CHECKBOX_ICON_WEIGHT`와 같은 판단).

**배지 텍스트 `선택중`은 DS 소유입니다.** Figma에서 고정 텍스트이고 소비자가 바꿀 축이 없습니다.

## 결정

- **`ItemCheckbox`의 variant가 아니라 별도 컴포넌트입니다.** plan.md가 「겉모습이 겹치는지 실측으로 대조하고, 겹치면 둘 중 하나가 다른 하나의 variant일 수 있다」로 판단을 이 티켓에 넘겼습니다. **대조 결과 겹치지 않습니다.**

  | | `ItemCheckbox` | `SelectionItem` |
  | --- | --- | --- |
  | 높이 | 60 | **56** |
  | padding | `px-[20px]` | **`px-[24px]`** |
  | 선택 표시 | 체크박스 28px | **배지 `선택중`** |
  | 테두리 | 두 상태 모두 | **선택 시만** |
  | 선택 개수 | 다중(checkbox) | **단일(radio)** |
  | 배경 | `white` ↔ `blue/100` | 같음 |
  | 라벨 | `body-lg` · `gray/900` | 같음 |

  같은 것은 폭 · radius · 배경 · 라벨 4가지뿐이고 나머지가 전부 다릅니다. **특히 선택 개수가 달라 렌더하는 `<input type>`이 갈리므로**, 하나로 합치면 variant가 엘리먼트 의미까지 바꾸게 됩니다 — `Chip`에서 `useIcon`을 `selectMode`로 고쳐 부른 것과 같은 이유로 피했습니다.

- **`<label>` + `sr-only` 네이티브 `<input type="radio">`입니다.** 「카드 전체가 선택 영역」(주석 `355:1277`)이라 `<label>`이 클릭을 위임하고, CLAUDE.md 「폼 컨트롤 공통」이 `SelectionItem`을 직접 지목하므로 1 · 2 · 4를 그대로 따릅니다. `ItemCheckbox`와 같은 구조이고 `type`만 다릅니다.

- **단일 선택(radio)입니다 — 사용 예시로 확인했습니다.** Figma 컴포넌트 세트에는 축이 `isSelected` 하나뿐이라 개수를 말해 주지 않는데, [ORD-001-B01 날짜 선택](https://www.figma.com/design/LomGIAwvPAkyRbBcGbk9rs/%EA%B3%A0%EA%B0%9D-%EB%B9%84%EC%A6%88?node-id=1424-12550&m=dev)이 답을 갖고 있습니다.

  - 「선택 상태 표기」(`1326:18411`) — **「현재 선택 항목 — 배경 강조 + 선택중 뱃지」**. 「현재 선택 항목」이 단수입니다.
  - 「옵션 목록」(`1326:18405`) — 「주차 옵션 탭 → 선택 주차부터 주문 목록 나열, **바텀시트 닫힘**」. 하나를 고르면 끝나는 흐름입니다.
  - 화면에서도 7개 중 `최신 날짜` 하나만 배지를 답니다.

  **`Chip`처럼 `selectMode` 축을 열지 않았습니다** — Chip은 Figma가 두 모드를 심볼로 갖고 있지만 여기는 단일뿐이라, 열면 근거 없이 소비자 결정거리만 늘어납니다.

- **마지막 행이 선택이 아니라 이동인 경우가 있습니다.** 같은 화면의 `선택한 날부터 보기`가 SelectionItem 인스턴스인데, 탭하면 선택이 아니라 **달력 바텀시트로 전환**됩니다(`1326:18417`). 배지도 없습니다.

  **DOTOLI-246에서는 이 자리를 따로 만들지 않았습니다.** 컴포넌트가 선택 컨트롤 하나뿐이라, 그 행은 소비자가 `checked={false}`로 두고 `onChange`에서 화면 전환을 하는 형태였습니다. **radio 하나가 선택되지 않는 동작을 하는 셈이라 보조기술에 어긋났습니다.**

  **DOTOLI-311이 이 자리를 채웠습니다** — 그 행은 `ActionSelectionItem`(`isSelected={false}`)으로 빼면 되고, 목록 안에서 시각이 갈리지 않는 것은 `shared`가 보장합니다.

- **즉시 실행하는 목록은 `ActionSelectionItem`입니다 (DOTOLI-311).** `Chip` ↔ `ActionChip`과 같은 짝입니다 — [chip.md](./chip.md) 「`Chip`은 값을 고르고, `ActionChip`은 누르면 동작이 일어납니다」. 업체 전환 시트(COM-002)도 위 주차 선택도 **확인 단계 없이 탭 즉시 적용 + 시트 닫힘**이라, 「값만 고르고 확정은 나중」을 약속하는 radio와 흐름이 어긋납니다.

  **radio로 두면 증상이 넷입니다.** ①이미 선택된 행을 다시 눌러도 `change`가 안 와 「현재 업체 재탭 → 시트만 닫힘」을 만들 수 없고, ②그걸 `onClick`으로 뚫으려면 `<label>`이 아니라 `<input>`에 붙여야 하며(label에 붙이면 위임된 click이 되돌아와 **두 번** 발화합니다), ③미선택 행은 `onClick`·`onChange`가 둘 다 발화하고, ④같은 `name`에서 **방향키가 포커스 이동과 동시에 선택을 바꿔** 업체가 전환됩니다. `<button>`이면 넷 다 사라집니다.

  **그래서 `SelectionItem`에는 `onClick`을 열지 않았습니다.** 재선택 신호가 필요한 자리를 버튼판이 맡으므로 확인된 필요가 없고, CLAUDE.md 「공개는 되돌리기 비대칭이라 필요가 확인될 때 여는 순서로 갑니다」에 걸립니다.

- **버튼판의 선택 상태는 `isSelected`이고 `aria-current`로 내보냅니다 (DOTOLI-311).** `<button>`에 `selected` 속성이 없어 `is` 접두어가 붙는 자리입니다(CLAUDE.md 「Boolean prop」 · `Filter` 선례). radio가 `checked`로 알리던 「지금 이것」은 `<button>`에서 `aria-current`가 맡습니다 — 누르면 즉시 적용되는 목록에 맞는 속성이고, `aria-pressed`는 눌린 채 유지되는 **토글**용이라 다릅니다.

  **`aria-expanded`와 달리 `false`도 그대로 렌더합니다.** `aria-expanded`는 속성이 없는 것과 `false`의 뜻이 갈려 `HeaderBar`가 미전달 시 속성을 아예 안 붙이지만([header-bar.md](./header-bar.md) 「구현 결정」), `aria-current`의 `false`는 토큰 목록에 있는 **기본값**이라 「현재 아님」을 그대로 뜻합니다.

  **계열 밖 이웃 둘과 갈리는 지점을 적어 둡니다.** `BottomTabItem`도 `aria-current`를 쓰지만 값이 `page`이고 **선택 안 된 탭에는 속성을 안 붙입니다** — 그쪽은 내비게이션이라 토큰이 다르고, 여기는 목록 안의 현재 항목이라 `true`/`false`입니다. `Filter`는 **prop 이름이 똑같이 `isSelected`인데 `aria-pressed`**입니다 — 그쪽은 다시 누르면 꺼지는 독립 토글이고 여기는 N개 중 하나라 재탭해도 안 꺼집니다. 같은 이유로 여기에는 `aria-pressed`를 쓸 수 없습니다.

- **시각을 `shared`가 통째로 갖습니다 (DOTOLI-311).** 스타일 상수와 내용 조각(`SelectionItemContent`), 상태별 클래스를 고르는 `generateSelectionItemStyle`이 전부 `shared`에 있고 두 컴포넌트는 감싸는 요소(`<label>` ↔ `<button>`)와 그 요소의 prop만 다릅니다. `LinkCtaButton`이 생성기를 형제 폴더에서 가져다 쓴 것과 결과는 같고, 여기는 계열이라 `shared`가 정식 자리입니다.

  **`SelectionItemContent` · `generateSelectionItemStyle`은 배럴에서 내보내지 않습니다.** 내용 조각이 Fragment로 형제 둘을 뱉어 **`flex` 부모 안에서만 배치가 맞는다**는 사정까지 [`NavigationListItemContent`](./navigation-list-item.md) 「결정」과 같습니다.

- **prop 이름이 `isSelected`가 아니라 `checked`입니다.** 실제로 네이티브 input을 렌더하므로 `checked`가 HTML 기본 속성입니다 — `ItemCheckbox` · `Chip`과 같은 판단이고 근거는 [checkbox.md](./checkbox.md) 「ItemCheckbox 결정」에 있습니다.

- **높이를 고정합니다 — `h-[56px]`, `py-[15px]` 없음.** 패딩으로 쌓으면 `15 + 26.1 + 15 = 56.1`이 나옵니다. 라벨 행높이가 `body-lg`의 `1.45 × 18 = 26.1`인데 **Figma의 텍스트 박스는 26**이라 0.1px이 남습니다. `Chip`(`32.3` → `h-[32px]`)과 같은 상황이라 같은 답을 씁니다 — [chip.md](./chip.md) 「높이를 고정합니다」.

  대신 **패딩이 높이를 만들지 않습니다.** 타이포가 바뀌어도 56이 유지되므로, 라벨 크기를 바꾸려면 높이도 함께 봐야 합니다. `ItemCheckbox`는 패딩 방식 그대로인데 그쪽은 `15 + 28 + 15 + 2(border) = 60`으로 프레임과 정확히 맞아 고칠 것이 없습니다.

- **`gap-[10px]`과 라벨 `truncate`는 Figma에 없는 추가입니다.** Figma는 라벨이 `whitespace-nowrap`이고 컨테이너가 `justify-between`이라, **라벨이 길어지면 배지와 겹치거나 카드를 넘칩니다.** 340px 고정 카드에 매장명이 들어가는 자리라 실제로 일어납니다. `ItemCheckbox`가 이미 `flex-1` + `gap-[10px]`이라 같은 값을 맞췄고, 넘침 처리는 아래 「디자인 확인 필요」에 올려 둡니다.

- **`disabled`를 넣지 않습니다.** Figma에 축이 없습니다 (`ItemCheckbox` · `Chip`과 같은 판단).

- **접근성 이름은 `label`이 집니다.** `<label>`이 input을 감싸고 그 안에 텍스트가 있습니다. 「폼 컨트롤 공통」 6의 반대편 사례라 `aria-label`을 열지 않았습니다. **배지는 `Badge`가 `<span>`으로 렌더하므로 라벨 텍스트에 `선택중`이 함께 읽힙니다** — 선택 상태가 이름에 섞이지만, radio의 `checked` 상태를 보조기술이 따로 읽어 주므로 중복일 뿐 정보 손실은 없습니다.

## API

**둘이 공유하는 것** — `label`(필수, 카드 텍스트이자 접근성 이름) · `className`(선택, 카드에 적용) · `ref`.

**갈리는 것**

| prop           | `SelectionItem`                        | `ActionSelectionItem`                     |
| -------------- | -------------------------------------- | ----------------------------------------- |
| 선택 상태      | `checked` **필수** — 네이티브 속성      | `isSelected` **필수** — `<button>`에 없는 속성이라 접두어 |
| 핸들러         | `onChange` **필수**                     | `onClick` **필수**                         |
| `name`         | **radio 그룹을 묶으려면 사실상 필수**   | 없음                                       |
| `value` · `id` | `<input>`으로 전달                      | 없음                                       |
| `ref`          | `HTMLInputElement`(`<input>`)           | `HTMLButtonElement`(카드 자체)             |

둘 다 **제어 전용**입니다 (CLAUDE.md 「폼 컨트롤 공통」 4). `disabled`는 어느 쪽에도 없습니다 — Figma에 축이 없습니다.

`name`이 없으면 HTML 표준상 radio 그룹이 형성되지 않습니다 — 제어 전용이라 화면은 멀쩡히 동작하고 폼 전송값 · 보조기술 set size · 화살표 키 이동만 조용히 죽습니다. 같은 함정과 근거가 [chip.md](./chip.md) 「결정」에 있습니다.

## 디자인 확인 필요

| 항목            | 내용                                                                                             |
| --------------- | -------------------------------------------------------------------------------------------------- |
| 라벨 넘침       | 라벨이 `whitespace-nowrap`이라 길어지면 배지와 겹칩니다. 구현은 `truncate`로 뒀는데 말줄임이 맞는지, 줄바꿈이면 카드 높이가 늘어도 되는지 |
| 상호작용 상태   | hover · pressed 정의가 없습니다. 카드 전체가 탭 타깃이라 눌린 느낌이 필요한지                        |
| 포커스          | 포커스 링 정의가 없습니다. **두 판이 갈립니다** — radio판은 실제 컨트롤이 `sr-only`라 키보드 포커스가 화면에 안 보이고(공통 규칙 7), 버튼판은 `<button>`이라 UA 기본 링이 그대로 뜹니다. class는 같은데 포커스 시각만 다릅니다 |
| `disabled`      | 축이 없습니다. 선택 불가 항목(운영중지 매장 등)을 표시할 일이 없는지                                 |
| 선택 해제       | radio는 네이티브로 해제가 안 됩니다. 선택한 카드를 다시 눌러 해제하는 동작이 필요한지 (`ActionSelectionItem`은 소비자가 `isSelected`를 내리면 됩니다) |
| 버튼판의 시각   | `ActionSelectionItem`이 `SelectionItem`과 **같은 카드**를 쓰는데, 누르면 동작이 일어나는 행이라 눌린 피드백이 더 필요한지. `ActionChip`은 `pressed`를 받았습니다 |
| `ItemCheckbox`와의 관계 | 두 카드가 같은 화면에 함께 나오는 자리가 있는지. 있으면 높이 60 ↔ 56 차이가 눈에 띕니다     |

## Storybook

`apps/storybook/src/stories/biz-ui/SelectionItem.stories.tsx`, `meta.title`은 `core/biz-ui/SelectionItem`. 스토리 4종입니다.

- `Default` — 컨트롤 패널용. `onChange`가 비어 있어 캔버스에서는 선택되지 않습니다
- `States` — Figma 문서 프레임과 같은 배치로 `checked` 2조합
- `SingleSelect` — 매장 3개를 같은 `name`으로 묶어 **하나만 선택되는 것**을 확인
- `LongLabel` — 라벨이 카드를 넘칠 때의 `truncate` 동작. 배지가 있는 쪽(`checked=true`)이 더 좁아지는 것을 함께 봅니다

`ActionSelectionItem.stories.tsx`가 따로 있고 `meta.title`은 `core/biz-ui/ActionSelectionItem`입니다. **소스는 계열로 중첩됐지만 스토리 타이틀은 평평합니다** — 계열명과 대표 컴포넌트명이 같아 `core/biz-ui/SelectionItem`이 스토리이자 폴더가 되기 때문이고, 근거는 [chip.md](./chip.md) 「Storybook」에 있습니다. 스토리 4종입니다.

- `Default` · `States` · `LongLabel` — radio판과 같은 배치. **두 판의 카드가 한 글자도 다르지 않은지** 나란히 놓고 봅니다
- `CompanySwitch` — 이 컴포넌트가 존재하는 이유. 업체 3개 중 **현재 업체를 다시 눌러도 `onClick`이 오는 것**과 다른 업체를 눌렀을 때가 갈리는 것을 마지막 동작 문구로 확인합니다

카드가 `w-full`이라 `DOCUMENT_FRAME_WIDTH = 'w-[340px]'`로 감쌉니다 (`ItemCheckbox` · `NotificationCard` 선례).

## 검증

Storybook 렌더의 계산값으로 대조했습니다.

| 항목      | 기대                                        | 실측                                                                     |
| --------- | ------------------------------------------- | ------------------------------------------------------------------------ |
| 카드 높이 | 56                                          | **56** — 4스토리 전부 · 선택 전후 동일                                    |
| 폭        | `w-full`                                    | 340(`DOCUMENT_FRAME_WIDTH`를 그대로 채움)                                 |
| padding   | 좌우 24 · 높이는 `h-[56px]`                 | `0px 24px`                                                                |
| radius    | 6                                           | `6px`                                                                     |
| 테두리    | `selected`만 1px `blue/300`                 | `rgb(151,190,250) 0 0 0 1px inset` · `default`는 `none`                    |
| 배경      | `white` ↔ `blue/100`                       | `rgb(255,255,255)` ↔ `rgb(235,243,255)`                                  |
| 라벨      | `body-lg` · `gray/900`                      | 18px / 500 · 행높이 26.1 · 자간 -0.54px · `rgb(26,34,51)`                  |
| 배지      | `filled` · `primary` · `caption`            | 46.76 × 24 · `rgb(35,114,220)` 배경 · 라벨 12px / 600 흰색                 |
| 단일 선택 | 같은 `name`에서 하나만 · `FormData` 1건     | `stores` 그룹에서 1번 → 3번으로 이동 · `FormData` **1건**                  |
| 넘침      | 카드 높이 유지 · 라벨만 말줄임              | `LongLabel` 라벨 292 / 235.24(배지 46.76 + gap 10만큼 좁음) · 둘 다 말줄임 · 높이 **56 유지** |

**`h-[56px]`이 계열에서 처음 나온 클래스인데 실행 중이던 서버에 그대로 먹었습니다.** CLAUDE.md 「검증」의 재시작 함정에 안 걸린 사례입니다.

빌드 · 린트 · `dist` 공개 API(`SelectionItem` + `SELECTION_ITEM_*` 9종) 확인했습니다.

### DOTOLI-311

| 항목            | 기대                              | 실측                                                               |
| --------------- | --------------------------------- | ------------------------------------------------------------------ |
| 두 판의 카드    | class가 같고 태그만 다름           | **문자열 완전 일치** · `LABEL` ↔ `BUTTON` · 높이 둘 다 **56**       |
| `aria-current`  | `isSelected`대로                   | `false` ↔ `true` · 목록에서 선택된 행만 `true`                       |
| **현재 항목 재탭** | `onClick` 발화                  | 「현재 업체 재탭 → 시트만 닫힘」 — **radio가 못 하던 자리**          |
| 다른 항목 탭    | 전환 + `aria-current` 이동         | 「뽀득 판교점 전환 → 시트 닫힘」 · `aria-current`가 따라 이동         |
| 배지            | `isSelected`일 때만                | 선택된 행에만 `선택중`                                              |

**폴더 승격이라 `dist`를 지우고 재빌드했습니다** — 안 그러면 옮기기 전 경로의 타입 선언이 남아 조용히 어긋납니다. 재빌드 후 공개 API에 `SelectionItem` · `ActionSelectionItem`이 둘 다 있고 `SelectionItemContent` · `generateSelectionItemStyle`은 없습니다.

**신규 export라 Storybook 재시작이 필요했습니다** (CLAUDE.md 「검증」의 `managedPaths` 함정). DOTOLI-246 때 안 걸렸던 것과 갈리는 지점입니다 — 그때는 클래스만 새로 나왔고 이번은 export가 새로 생겼습니다.
