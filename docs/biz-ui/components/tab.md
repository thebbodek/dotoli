# Tab 구현 기록

`apps/biz-ui/src/components/Tab` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 이 컴포넌트 고유 사실만 둡니다.

출처는 Figma가 아니라 주문 메인 개편 디자인 아티팩트(`claude.ai/artifact/BNjNgpDeuFY8x6EhkBtdUJ`)입니다. 아티팩트는 목업이라 색은 DS 토큰으로 옮기고 구조와 상태만 따랐습니다.

| variant | 보드 | 소비처 | 정책 |
| --- | --- | --- | --- |
| `line` | Q1(주문 관리 · 주문 목록, 탭 2개) · Q2(고정주문, 탭 3개) | biz-customer-app BP-130 주문 관리 상단 탭 | 「주문(new)」 2-3 「화면 구성 — 상단 탭」 |
| `filled` | E3(주문하기) · E4(이번만 변경)의 「이번 주 / 다음 주 / 다다음 주」 | 주문 등록(ORD-REG) 3-1, 일정 미정 | 「주문(new)」 3-1 「주 선택」 |

## 구현 현황

| 컴포넌트   | 티켓       | 공개 | 설명                                              |
| ---------- | ---------- | ---- | ------------------------------------------------- |
| `Tab`      | DOTOLI-334 | ✅   | 탭 바. `variant` 2종(밑줄 · 세그먼트). `role="tablist"`. 탭은 `items`로 받음 |
| `TabItem`  | DOTOLI-334 | ❌   | 탭 하나. `<button role="tab">`                    |
| `TabPanel` | DOTOLI-334 | ✅   | `role="tabpanel"`. 탭과 id로 연결                 |

## Variant 축

| 축 | 값 |
| --- | --- |
| `variant` | `line`(밑줄, 기본값) · `filled`(회색 트랙 안 세그먼트) |
| 탭 상태 | 선택 · 비선택. `value`에서 파생 |

## 실측 스펙

### `line`

| 요소 | 아티팩트 | 구현 |
| --- | --- | --- |
| 바 | 흰 바탕, 아래 1px `rgb(227,230,238)`, 좌우 padding 20 | `bg-white` `border-b border-gray-200`(값이 같음) `px-[20px]` |
| 칸 나누기 | 같은 폭 | `grid w-full grid-flow-col auto-cols-fr`. `w-full`은 가로 flex 안에서 바가 내용 폭으로 줄어들지 않게 함(`BottomTab` · `PageBody` · `HeaderBar`와 같음) |
| 탭 | 높이 48, 글자 16 | `h-[48px]` |
| 선택 | `rgb(26,34,51)` · 700 · 아래 2px | `text-body-bold` `text-gray-900`(값이 같음) + `shadow-[inset_0_-2px_0_0_var(--color-gray-900)]` |
| 비선택 | `rgb(139,149,170)` · 600 | `text-body-semibold` `text-gray-500`(`#8a93a8`) |

### `filled`

| 요소 | 아티팩트 | 구현 |
| --- | --- | --- |
| 트랙 | `rgb(240,242,247)`, padding 4, 칸 gap 4, radius 999 | `bg-gray-100`(값이 같음) `p-[4px]` `gap-[4px]` `rounded-full` |
| 탭 | 높이 44, radius 999, 글자 16 | `h-[44px]` `rounded-full` |
| 선택 | 흰 바탕, `rgb(49,130,246)` · 700, 그림자 `0 4px 16px rgba(51,60,81,0.12)` | `bg-white` `text-blue-500`(값이 같음) `text-body-bold` `shadow-8` |
| 비선택 | `rgb(105,115,140)` · 600 | `text-body-semibold` `text-gray-600`(값이 같음) |

칸 나누기(`grid w-full grid-flow-col auto-cols-fr`)는 두 variant가 같습니다. hover · pressed · 포커스 표시는 두 variant 모두 아티팩트에 없습니다.

## 결정

- **밑줄 탭이고 `Chip`(알약)을 쓰지 않습니다.** `Chip`은 필터와 같은 층으로 보이고 radio 의미라서 주문 관리 상단 탭으로는 새로 두기로 했습니다(소비 앱 plan.md DS3). `filled`도 알약 모양이지만 아래 날짜 목록을 바꾸는 탭이라 아티팩트도 `role="tablist"`로 그렸고, `Chip`이 아니라 `Tab`의 variant입니다.
- **탭 목록을 DS가 그립니다(`items`).** 탭이 2~3개이고 탭마다 다른 모양이 없어 children 조립형(compound + context)을 열지 않았습니다. `BottomTab`이 목록을 DS가 갖는 것과 같은 방식입니다.
- **이름은 바가 `Tab`, 탭 하나가 비공개 `TabItem`입니다.** 티켓 제목과 `BottomTab` · `BottomTabItem`의 명명을 따랐습니다. internal-ui는 묶음이 `Tabs`, 하나가 `Tab`입니다.
- **세그먼트형 탭을 따로 만들지 않고 `variant`로 넣었습니다(11/16).** 처음엔 쓰는 곳이 ORD-REG라 열지 않기로 했다가, 소비 앱 세션 제안으로 334에 넣었습니다. 두 모양이 하는 일(`tablist`/`tab`, 하나 선택, 폭 균등, `value` · `onChange` 제어, 패널 id 연결)이 같아 컴포넌트를 나누면 이 로직이 두 벌이 됩니다. `filled`를 쓸 곳(주문 등록 3-1)은 아직 일정이 없지만 디자인이 정해져 있고 값이 토큰과 거의 그대로 맞아, 지어낼 시각이 없다고 봤습니다.
- **값 이름은 internal-ui `Tab`을 따라 `line` · `filled`입니다.** internal-ui `TAB_VARIANTS`가 밑줄 + `border-b`(`line`), 배경 트랙 + 선택 표시(`filled`) 두 모양이라 지금과 정확히 대응합니다. 기본값은 `line`입니다.
- **variant가 바(`LIST`)와 탭(`ITEM` · `STATES`) 스타일을 함께 정합니다.** `TAB_VARIANT_STYLES[variant]` 한 레코드에서 고르고, 상태 클래스는 `Record<TabItemState, string>`입니다. `filled`는 페이지 padding 안에 들어가는 모양이라 바 자체의 좌우 padding 20 · 흰 바탕 · 아래 선이 없습니다.
- **`filled`의 그림자는 `shadow-8`입니다.** 아티팩트 `0 4px 16px` 12%와 같은 토큰이 없어, 아래로 4px · 12%가 같은 `shadow-8`(`0 4px 8px`)로 두었습니다. 퍼짐만 절반입니다.
- **제어 전용입니다.** `value`와 `onChange`가 둘 다 필수입니다. 탭별 `disabled`는 정책에 비활성 탭이 없어 두지 않았습니다.
- **`onChange`는 객체가 아니라 `value` 하나를 받습니다.** 계열 선례가 갈립니다. `QuantityStepper`의 `onChange` · `BottomTab`의 `onTabSelect`는 값 하나이고([bottom-tab.md 「API」](./bottom-tab.md#api)), `DateBottomSheet`의 `onChange`는 `{ value }` 객체입니다. 넘길 것이 탭의 `value` 하나뿐이고, 값으로 받으면 소비 앱이 `onChange={setValue}`로 바로 물릴 수 있어 값 쪽을 골랐습니다.
- **이미 선택된 탭을 다시 눌러도 `onChange`를 부르지 않습니다.** 이름이 `onChange`라 소비자는 값이 바뀔 때만 불린다고 읽습니다. BP-130이 여기에 재조회나 라우팅을 걸면 다시 누를 때마다 돌게 되므로 `TabItem`에서 막습니다. `BottomTab`의 `onTabSelect`가 재탭에도 불리는 것은 「재탭 부수효과」용으로 일부러 연 것이라 성격이 다릅니다.
- **`id`는 바(`tablist`)의 DOM id이면서 탭 · 패널 id의 바탕입니다.** 이름이 `id`라 소비자가 바를 `getElementById`나 외부 `aria-labelledby`로 가리킬 수 있다고 읽기 쉬워 DOM에도 붙였습니다. 탭 id(`{id}-tab-…`) · 패널 id(`{id}-panel-…`)와 겹치지 않습니다. 타입은 `Required<Pick<HTMLAttributes<HTMLDivElement>, 'id'>>`로 가져옵니다.
- **바 아래 선은 `border-b`, 선택 밑줄은 inset shadow입니다.** 아래 선은 구획을 가르는 선이라 CLAUDE.md 테두리 표대로 `border-b`이고, 선택 밑줄은 한 방향 선이라 `InfoBanner`의 `isSticky`처럼 `shadow-[inset_0_-2px_0_0_…]`로 그립니다. 아티팩트는 버튼의 `border-bottom` 2px라 라벨이 위로 1px 올라가 있는데, inset shadow는 박스를 줄이지 않아 라벨이 48px 가운데에 옵니다. 1px 차이입니다.
- **밑줄이 미끄러지는 애니메이션은 없습니다.** internal-ui `TabIndicator`는 탭 위치를 재서 `transform`으로 옮기지만 아티팩트에 모션이 없습니다. 색은 계열 관례대로 `transition-colors`를 걸고, `box-shadow`인 밑줄은 즉시 바뀝니다.
- **`line`의 좌우 padding 20은 DS가 갖습니다.** 흰 바탕과 아래 선은 화면 끝까지 가고 탭만 안쪽에 둡니다. 소비 앱이 바깥에 padding을 주면 선이 잘립니다. `filled`는 반대로 소비 앱의 페이지 padding 안에 둡니다.
- **sticky는 붙이지 않습니다.** 스크롤 컨테이너 구조에 따라 BP-130이 정합니다.
- **탭이 1개일 때 바를 그리지 않는 판단은 소비 앱 몫입니다.** 운영 중지 · 해지에서는 변경 이력 하나만 남아 정책 2-3대로 바 없이 보여 줍니다(아티팩트 Q4).

## 접근성

- 바는 `role="tablist"`, 탭은 `<button type="button" role="tab" aria-selected>`입니다. 바 이름(`aria-label`, 예: 「주문 관리」)은 소비 앱이 붙입니다.
- **패널은 `TabPanel` 컴포넌트로 연결합니다.** 컨텍스트 없이 `Tab`의 `id`와 같은 `tabId`, 지금 보여 주는 `value`를 받아 `role="tabpanel"` · `id` · `aria-labelledby`를 갖춘 `div`를 그립니다. id는 `{id}-tab-{value}` · `{id}-panel-{value}` 규칙이고 `generateTabItemId` · `generateTabPanelId`가 만듭니다(비공개). 그래서 `value`에는 id에 쓸 수 있는 값(공백 없는 문자열)을 넣습니다.
  - 패널은 `tabIndex={0}`입니다. 탭 다음 탭 순서에서 패널로 바로 들어갈 수 있게 하는 WAI-ARIA 권장이고, internal-ui `TabPanel`과 같습니다. eslint `jsx-a11y/no-noninteractive-tabindex`도 `tabpanel`은 허용합니다.
  - 탭은 선택된 것만 `aria-controls`로 패널을 가리킵니다. 소비 앱은 지금 탭의 패널 하나만 그리므로, 나머지 탭이 가리키면 없는 id를 가리키게 됩니다.
  - 유틸(`getTabPanelProps`)을 공개해 소비 앱이 속성을 펼쳐 쓰게 하는 안도 있었습니다. CLAUDE.md 「소비자의 진입점은 항상 완성된 컴포넌트」에 맞춰 컴포넌트로 열었습니다.
- **키보드는 기본 탭 순서입니다.** 모든 탭이 포커스를 받고 방향키 이동은 없습니다. WAI-ARIA 권장(선택된 탭만 `tabIndex=0` + 방향키)을 따르려면 biz-ui에 키보드 이동 유틸을 새로 만들어야 하는데, 모바일 WebView 대상이라 이번에는 빼기로 했습니다(11/16). 선택 탭만 포커스를 받게 하고 방향키를 빼면 비선택 탭에 키보드로 갈 수 없으므로 둘은 같이 넣어야 합니다.
- 히트 영역은 48px 높이에 칸 폭 전체라 넓히지 않습니다.

## internal-ui와 갈린 지점

[bottom-tab.md 「internal-ui와 갈린 지점」](./bottom-tab.md#internal-ui와-갈린-지점) 표와 같은 결이고, `Tab`에서 다른 점만 적습니다.

| 항목 | internal-ui `Tab` | biz-ui `Tab` | 갈린 이유 |
| --- | --- | --- | --- |
| 조립 | compound + context | `items`를 DS가 그림 | 탭 2~3개, 모양 하나 |
| 패널 | `TabPanel`이 컨텍스트로 탭 id를 받음 | `TabPanel`이 `tabId` · `value`를 prop으로 받음. `tabIndex={0}`은 같음 | 컨텍스트 없이 같은 id 규칙 |
| 인디케이터 | `TabIndicator`가 위치를 재서 미끄러짐 | 선택 탭 자체에 정적 밑줄(`line`) · 흰 알약(`filled`) | 아티팩트에 모션 없음 |
| 키보드 | `tabIndex` 롤링 + 방향키 | 기본 탭 순서 | 위 「접근성」 |
| `variant` | `line` · `filled` | 같은 이름 · 같은 두 모양 | 이름을 맞춤 |
| `theme` · `size` | 있음 | 없음 | 아티팩트에 축 없음 |
| `disabled` | 있음 | 없음 | 정책에 비활성 탭 없음 |
| 변경 핸들러 | 탭마다 `onChange` | 바에 `onChange(value)` 하나. 선택된 탭 재클릭엔 안 부름 | 목록을 DS가 그림 |

## API

### `Tab`

| prop | 필수 | 기본값 | 비고 |
| --- | --- | --- | --- |
| `id` | ✅ | — | 바의 DOM id. 탭 · 패널 id의 바탕 |
| `items` | ✅ | — | `TabItemOption[]` (`{ value, label }`) |
| `value` | ✅ | — | 선택된 탭의 `value` |
| `variant` | | `'line'` | `filled`는 회색 트랙 세그먼트 |
| `onChange` | ✅ | — | `(value: string) => void`. 선택된 탭을 다시 누르면 부르지 않음 |
| `aria-label` | | — | 바 이름 |
| `className` | | — | |

### `TabPanel`

| prop | 필수 | 기본값 | 비고 |
| --- | --- | --- | --- |
| `tabId` | ✅ | — | `Tab`의 `id` |
| `value` | ✅ | — | 지금 보여 주는 탭의 `value` |
| `className` | | — | |

## 디자인 확인 필요

| 항목 | 내용 |
| --- | --- |
| Figma 심볼 | 컴포넌트 세트 추가 필요. 지금 출처는 디자인 아티팩트 |
| 포커스 링 | 아티팩트에 없어 그리지 않음(CLAUDE.md 폼 컨트롤 7) |
| `filled` 그림자 | 아티팩트 `0 4px 16px` 12% → 같은 토큰이 없어 `shadow-8`(`0 4px 8px` 12%) |
| 라벨 세로 위치 | 아티팩트는 `border-bottom` 2px로 라벨이 1px 위, 구현은 48px 가운데 |
| hover · pressed | 없음 |

## Storybook

`apps/storybook/src/stories/biz-ui/Tab.stories.tsx`, `meta.title`은 `core/biz-ui/Tab`. 폭은 화면과 같은 380px입니다.

| 스토리 | 보는 것 |
| --- | --- |
| `Default` | 컨트롤 패널. 탭 2개(Q1) |
| `ThreeTabs` | 탭 3개(Q2). `args`만 덮어써 컨트롤이 살아 있음 |
| `Filled` | `filled` 주 선택 탭(E3). 페이지 padding 20 안에 둠 |
| `Interactive` | `useState`로 전환하고 `TabPanel`이 따라 바뀌는 것 |

`value` 컨트롤의 선택지는 그 스토리 `items`의 `value`에서 뽑고, 타입 표기는 실제 타입인 `string`입니다.
