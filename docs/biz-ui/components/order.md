# Order 계열 구현 기록

`apps/biz-ui/src/components/Order` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 Order 계열 고유 사실만 둡니다.

Figma: [Order 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=203-847&m=dev) (`203:847`). 섹션 안의 `302:1434`(OrderBoxCell) · `302:1451`(OrderBox) · `302:1631`(OrderDateInfo) · `302:1573`(QuantityStepper) · `302:1204`(OrderInputCard)는 전부 문서용 프레임이고, 실제 값은 각 컴포넌트 세트에서 실측합니다.

**OrderBox(DOTOLI-335~351) · OrderDateInfo(DOTOLI-336~350)는 한동안 Figma가 아니라 주문 메인 개편 디자인 아티팩트(`claude.ai/artifact/BNjNgpDeuFY8x6EhkBtdUJ`)가 출처였고, 11/25~26 DS 개편 뒤 DOTOLI-355 · 356에서 DS Figma로 돌아왔습니다.** 아티팩트를 따르던 동안의 원칙은 이랬습니다. 아티팩트는 목업이지만 「개선안」이라 기존 Figma 값보다 우선하고, 맞는 토큰이 없거나 의미가 너무 벗어날 때만 가장 가까운 토큰으로 옮깁니다. 색은 가장 비슷한 토큰을 쓰고, 차이는 각 절 「디자인 확인 필요」에 남깁니다(11/16 사용자 확인). 각 절에는 어느 보드를 봤는지만 적습니다.

## 구현 현황

| 컴포넌트          | 티켓       | 설명                                                        |
| ----------------- | ---------- | ----------------------------------------------------------- |
| `OrderBox`        | DOTOLI-230 · 335 · 354 · 351 · 355 | 패키지별 수량 상자. 355에서 DS Figma 상자형만 남기고, 한 줄을 비공개 `OrderBoxCell`로 되돌리고, 수량을 숫자로 받아 DS가 조립 |
| `OrderDateInfo`   | DOTOLI-231 · 336 · 350 · 356 | 날짜 제목 + 설명 글자 묶음. `theme` × `size` × `dayType`. 356에서 한 줄 날짜 행(버튼 · 배지 포함)을 교체 |
| `QuantityStepper` | DOTOLI-232 | 상품 + 수량 증감 + 총계. Order 계열 첫 상호작용 컴포넌트    |
| `OrderInputCard`  | DOTOLI-233 · 346 · 357 | `orderStatus` 3종(`unset` · `zero` · `ordered`) × `isLocked` × `dayType`. 357에서 상태 이름을 바꾸고 마감을 `isLocked`로 분리 |
| `OrderNotiCollapse` | DOTOLI-264 | `type` 4종 × `isOpen`. **헤더만** 그리고 접히는 내용은 소비 앱이 형제로 둠 |

`OrderNotiCollapse`만 Order 섹션 밖([`205:4063`](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=205-4063&m=dev))에 있습니다.

## 계열 공통 결정

- **`shared/`를 DOTOLI-357에서 닫았습니다.** 함께 쓰는 곳이 하나만 남아서입니다. 열고 닫은 경위는 이렇습니다. 착수 시점에는 열지 않았습니다 — 당시 OrderBox가 `OrderBoxCell`(DOTOLI-335에서 지웠다가 355에서 비공개로 되돌림)을 **인스턴스로** 쓰는 관계라 공통 조각이 아니라 조합이었고, 나머지도 겹치는 것이 없었습니다. DOTOLI-233에서 `OrderDateInfo`와 `OrderInputCard`가 **둘 다 `· 휴일`을 붙이는 것**이 확인돼 그때 열었습니다(`ORDER_HOLIDAY_LABEL` · `ORDER_HOLIDAY_SUFFIX`). 디자이너가 이 표기를 바꾸면 같이 움직여야 하는 실제 결합입니다 (CLAUDE.md [코드 규칙] 1).

  DOTOLI-336에서 OrderDateInfo가 접미어를 뺐다가 DOTOLI-350에서 다시 붙여 두 컴포넌트가 `ORDER_HOLIDAY_SUFFIX`를 함께 썼고, DOTOLI-356에서 「· 공휴일」(`ORDER_PUBLIC_HOLIDAY_SUFFIX`)이 더해졌습니다. 「주문마감」(`ORDER_DEADLINE_PASSED_LABEL`)도 `OrderDateInfo` · `OrderInputCard`가 함께 쓰다가(`OrderWeekStatus`도 썼지만 DOTOLI-348에서 지움) 356 · 357에서 두 컴포넌트가 마감 배지를 빼면서 지웠습니다.

  **357에서 `OrderInputCard`가 꼬리말을 직접 붙이지 않고 OrderDateInfo에 `dayType`만 넘기게 되면서, 휴일 문구를 쓰는 곳이 OrderDateInfo 하나만 남았습니다.** 「진짜 공통인 것만 둔다」는 기준(CLAUDE.md [코드 규칙] 1)에 맞지 않아 네 상수(`ORDER_HOLIDAY_LABEL` · `ORDER_HOLIDAY_SUFFIX` · `ORDER_PUBLIC_HOLIDAY_LABEL` · `ORDER_PUBLIC_HOLIDAY_SUFFIX`)를 `OrderDateInfo/constants`로 옮기고 `Order/shared`를 지웠습니다. 이름은 그대로라 `@bbodek/biz-ui`에서 import하던 코드(소비 앱 `OrderConfirmRow`의 `ORDER_HOLIDAY_SUFFIX`)는 깨지지 않습니다. 다시 둘 이상이 함께 쓰게 되면 그때 엽니다.

---

## OrderBox

날짜 하나의 주문을 패키지마다 한 줄씩 적는 상자입니다. 왼쪽 패키지명, 오른쪽 수량(「4박스 (80개)」)이고, 박스 수가 0인 줄은 「주문 없음」으로 흐리게 그립니다. DOTOLI-355에서 DS Figma가 다시 출처가 됐습니다. 세트 `OrderBox`(`169:688`)의 `default`(`169:687`) · `empty`(`179:577`)와 한 줄 세트 `OrderBoxCell`(`169:530`)입니다. 지난 결정은 아래 「이력」에 있습니다.

### Variant 축

| Figma | 구현 |
| --- | --- |
| `OrderBox` `variant` `default` · `empty` | prop이 아니라 `items` 유무로 파생 |
| `OrderBoxCell` `state` `default` · `muted` · `empty` | `empty`는 `boxCount === 0`, `muted`는 비공개 `isMuted`(쓰는 곳은 `OrderInputCard`의 잠긴 주문 패널) |

### 실측 스펙

| 요소 | Figma | 구현 |
| --- | --- | --- |
| 상자 | 338 × 103, 흰 바탕, `gray-100` 1px, r16, padding 17/15, 줄 사이 2 | `ORDER_BOX_STYLE` |
| 한 줄 | 266 × 23, 양끝 정렬 | `ORDER_BOX_CELL_STYLE`(`justify-between` `gap-[8px]`) |
| 패키지명 · 수량 | body 16 · 500 / body-bold 16 · 700 | `Typography` `body` · `body-bold` |
| 줄 색 | `default` `gray-800` · `muted` `gray-500` · `empty` `gray-400`(두 글자 같은 색) | `ORDER_BOX_CELL_COLORS` |
| 빈 상자 | 338 × 50, `gray-100` 바탕, `gray-300` 1px, r16, padding 17/15, 가운데 정렬 label 14 · 500 `gray-400` | `ORDER_BOX_EMPTY_STYLE` + `ORDER_BOX_EMPTY_LABEL_COLOR` |

테두리는 `inset-ring`이라 자리를 차지하지 않아 Figma padding(17/15)을 그대로 씁니다. 높이 103 = 15 × 2 + 23 × 3 + 2 × 2로 Figma 테두리도 자리를 차지하지 않는 것과 맞습니다.

### 결정

- **상자형 하나만 남겼습니다(DOTOLI-355, 11/26 사용자 결정).** DS Figma 세트에 `default` · `empty`만 남아서 `variant`(`list` · `box`)를 지웠습니다. `list`는 아티팩트 Q1의 14px 글자 목록이었고 소비 앱 카드 안(`OrderDayCard` · `OrderConfirmRow` · `FixedOrderDayItem`)에서 썼습니다. 그 세 곳은 버전을 올리면 상자로 바뀝니다. Figma에 없는 변형을 코드만 들고 있지 않기로 했습니다.
- **수량은 숫자로 받고 DS가 조립합니다.** `OrderBoxItem`이 `{ packageName, boxCount, unitCount }`이고, 「4박스 (80개)」 표기와 0일 때의 「주문 없음」을 DS가 만듭니다(`generateOrderBoxQuantityLabel`, `ORDER_BOX_QUANTITY_UNITS`). DOTOLI-335가 「단위 · 구분자는 도메인 규칙이라 소비 앱이 조립」으로 정했던 것을 뒤집었습니다. Figma `OrderBoxCell`이 `quantity`를 「4박스 (80개)」 하나로 고정해 그렸고, 0일 때의 문구와 색이 같은 판정(박스 수 0)에서 나와서 숫자를 받아야 한 곳에서 정해집니다. 표기가 「5박스 · 125개」에서 「5박스 (125개)」로 바뀝니다.
- **0 판정은 `boxCount`만 봅니다.** 박스가 0인데 내품이 남는 데이터는 없다고 봤습니다. `unitCount`는 표기에만 씁니다.
- **한 줄은 비공개 `OrderBoxCell`입니다.** 이름은 Figma 세트를 따라 DOTOLI-335의 `OrderBoxRow`에서 되돌렸고, 배럴로 내보내지 않습니다. 마크업이 `<dt>` · `<dd>`라 `<dl>` 밖에서는 쓸 수 없고, 소비 앱 진입점은 완성된 컴포넌트(`OrderBox` · `OrderInputCard`)뿐이라는 원칙(`apps/biz-ui/CLAUDE.md` 코드 규칙 1)을 따랐습니다. 단독으로 쓰는 화면이 확인되면 그때 엽니다.
- **목록은 비공개 `OrderBoxList`이고 `OrderInputCard`도 씁니다(DOTOLI-354).** `<dl>`만 그리고 바탕 · 테두리 · padding은 쓰는 쪽이 `className`으로 얹습니다. DOTOLI-354의 글자 묶음 레코드(`OrderBoxListStyles`)는 두 곳 글자가 Figma에서 같아져 지웠고, 남은 차이는 `isMuted` 하나입니다.
- **`emptyLabel`과 기본값 `주문 없음`은 그대로입니다(DOTOLI-288).** 줄의 「주문 없음」(`ORDER_BOX_NO_ORDER_LABEL`)과 같은 값을 씁니다. Figma 빈 상자 글자(「오늘은 배송이 없습니다」)는 자리표시자로 봤습니다.
- **마크업은 `<dl>`입니다.** 줄마다 `<div><dt>패키지</dt><dd>수량</dd></div>`이고, 빈 상자는 `<dl>` 밖 단독 `<p>`입니다. [info.md](./info.md) 「InfoField」 기준(`<dl>`은 묶음을 소유한 쪽이 둠)을 따릅니다.
- **패키지명은 줄을 바꾸고 수량은 바꾸지 않습니다.** 패키지명에 `min-w-0`, 수량에 `shrink-0` `whitespace-nowrap`입니다.
- **`w-full`입니다.** 폭은 담는 쪽이 정합니다.
- **`key`는 `packageName`입니다.** 한 날짜에 같은 패키지가 두 줄로 나오는 것은 데이터 오류라 인덱스를 쓰지 않았습니다.

### API

| prop | 필수 | 기본값 | 비고 |
| --- | --- | --- | --- |
| `items` | ✅ | — | `OrderBoxItem[]`(`{ packageName, boxCount, unitCount }`). 빈 배열이면 빈 상자 |
| `emptyLabel` | | `'주문 없음'` | 기본값은 `ORDER_BOX_EMPTY_LABEL` |
| `className` | | — | 비어 있으면 `<p>`, 아니면 `<dl>`에 붙음 |

**DOTOLI-355는 파괴적 변경입니다.** 소비 앱에서 버전을 올리면 아래가 깨집니다.

| 소비 앱 위치 | 바뀌는 것 |
| --- | --- |
| `getOrderBoxItems` | `{ itemName, quantity }` 문자열 조립 → `{ packageName, boxCount, unitCount }` 숫자 |
| `OrderConfirm/types.ts` | `OrderBoxItem` 모양이 바뀜 |
| `OrderDayCard` · `OrderConfirmRow` · `FixedOrderDayItem` | 컴파일은 되지만 글자 목록이 상자로 바뀜(시각 변경) |

없어진 공개 이름은 `variant` · `ORDER_BOX_VARIANTS` · `OrderBoxVariant` · `ORDER_BOX_VARIANT_STYLES` · `OrderBoxVariantStyles` · `ORDER_BOX_BOX_BASE_STYLE` · `ORDER_BOX_BOX_LIST_STYLES` · `ORDER_BOX_LIST_STYLES` · `OrderBoxListStyles` · `OrderBoxTextStyle` · `ORDER_BOX_ROW_STYLE` · `ORDER_BOX_ITEM_NAME_STYLE` · `OrderBoxRowProps`, `OrderBoxItem`의 `itemName` · `quantity` · `isNoOrder`, `OrderInputCard`의 `OrderInputCardItem` · `ORDER_INPUT_CARD_ITEMS_STYLES` · `ORDER_INPUT_CARD_QUANTITY_UNIT`입니다. 상수 · 타입을 소비 앱이 import하는 곳은 `OrderBoxItem` · `OrderBoxProps`뿐입니다(stage, 11/26). 새로 생긴 것은 `ORDER_BOX_CELL_STATES` · `OrderBoxCellState` · `ORDER_BOX_CELL_COLORS` · `ORDER_BOX_NO_ORDER_LABEL` · `ORDER_BOX_QUANTITY_UNITS` · `ORDER_BOX_STYLE` · `ORDER_BOX_BASE_STYLE`(값이 다름) · `ORDER_BOX_EMPTY_STYLE` · `ORDER_BOX_EMPTY_LABEL_COLOR` · `ORDER_BOX_CELL_STYLE` · `ORDER_BOX_PACKAGE_NAME_STYLE`입니다.

### Storybook

`apps/storybook/src/stories/biz-ui/OrderBox.stories.tsx`, `meta.title`은 `core/biz-ui/Order/OrderBox`. 폭은 Figma 심볼과 같은 338px입니다.

| 스토리 | 보는 것 |
| --- | --- |
| `Default` | 컨트롤 패널. 패키지 3개 |
| `PartialZero` | 일부 패키지만 0. 「주문 없음」 `gray-400` |
| `LongName` | 긴 패키지명이 줄바꿈되고 수량은 한 줄로 남는 것 |
| `Empty` | 빈 상자 기본 문구 ↔ `emptyLabel` 지정 |

### 이력

DOTOLI-355 전의 결정입니다. 코드는 없어졌지만 다른 문서가 인용하는 것만 남깁니다. 상세는 git 이력(이 파일의 DOTOLI-334 시점)에 있습니다.

- **DOTOLI-229 · 230 (Figma 실측).** `OrderBoxCell`은 박스수 · 품목명 2행(`tone` 3종), OrderBox는 셀을 담는 컨테이너(`variant` `noBg` · `default` · `past`)였습니다. **biz-ui가 컴포넌트 안에서 `Typography`를 쓴 첫 사례**가 `OrderBoxCell`이고, 그 `inverse` tone 때문에 `COLOR_VARIANTS`에 `white`가 들어왔습니다(토큰이 아니라 variants 미러와 safelist에만). `white`는 지금도 `Badge` · `CalendarDayButton` 등이 써서 남아 있습니다.
- **DOTOLI-288.** 빈 상태 문구를 `emptyLabel`로 열었습니다. 지금도 그대로입니다.
- **DOTOLI-317.** `inverse`를 넷째 `variant`로 넣으면서 「빈 상태는 variant를 타지 않는다」를 뒤집었습니다. 그때 세운 기준이 **「디자인이 있는 조합만 값을 갖고 나머지는 기존 값을 그대로 쓴다」**입니다. `tone` 축을 따로 열면 디자인 없는 7조합을 구현이 지어내야 해서 기각한 것이고, 이 기준은 CtaButton `white` 테마([button.md](./button.md))가 인용합니다.
- **DOTOLI-319.** 셀의 `min-w` · `max-w`를 버리고 `grid-cols-3`으로 셀을 항상 1/3로 고정했습니다.
- **DOTOLI-335 · 354 · 351 (아티팩트 Q1).** 가로 3열을 세로 목록(14px 글자, 바탕 없음)으로 교체하고 `OrderBoxCell`을 `OrderBoxRow`로 바꿨습니다. 354에서 목록을 `OrderInputCard`와 함께 쓰는 `OrderBoxList`로 뽑고, 351에서 DS Figma 상자형을 `variant="box"`로 더했습니다. 355에서 상자형만 남았습니다.

---

## OrderDateInfo

날짜 제목과 설명 한 줄을 위아래로 쌓는 글자 묶음입니다. 버튼 · 배지는 갖지 않고 쓰는 쪽이 옆에 조합합니다. DOTOLI-356에서 DS Figma 세트 `203:872`(문서 `302:1631`)가 다시 출처가 됐고, 한 줄 날짜 행(DOTOLI-336, 아티팩트 Q1)을 **교체**했습니다. 지난 결정은 아래 「이력」에 있습니다.

### Variant 축

| 축 | 값 | 바뀌는 것 |
| --- | --- | --- |
| `theme` | `default`(기본) · `muted` · `red` | 제목 색 `gray-700` · `gray-400` · `red-600` |
| `size` | `md`(기본) · `lg` | 제목 `body-semibold`(16) · `body-lg-semibold`(18) |
| `dayType` | `weekday`(기본) · `weekend` · `publicHoliday` | 제목 뒤 꼬리말 없음 · 「· 휴일」 · 「· 공휴일」 |
| `hasTitle` · `hasDescription` | boolean | **prop이 아니라 `title` · `description` 유무로 파생** |

Figma 18개 심볼(3 × 2 × 3)이 전부 있습니다.

### 실측 스펙

| 요소 | Figma | 구현 |
| --- | --- | --- |
| 묶음 | 세로 쌓기, 왼쪽 정렬, 폭 hug | `flex-v-stack items-start` |
| 제목 줄 | 제목 + 꼬리말, 사이 4, 아래 여백 -2 | `flex-h-stack items-center gap-[4px]`, 설명이 있을 때만 `-mb-0.5` |
| 설명 | label 14 · 500 `gray-400`(theme와 무관) | `Typography` `label` |

심볼 높이는 md 제목만 23, lg 제목만 26입니다.

### 결정

- **버튼 · 배지 · 마감 문구를 뺐습니다.** DS 개편(11/25~26)에서 「오른쪽에 있으면 버튼」이라는 규칙을 세우면서, 날짜 행 오른쪽을 비우고 버튼은 쓰는 쪽(`OrderInputCard` · 소비 앱 카드)이 두기로 했습니다. 마감 배지 자리는 비우고, 마감 같은 이유는 `description`으로 씁니다.
- **`theme`과 `dayType`을 묶지 않았습니다.** Figma에 평일 + red, 휴일 + default 조합이 전부 심볼로 있습니다. 휴일을 빨갛게 그릴지는 화면마다 다르고(`OrderInputCard`는 휴일이어도 날짜는 `gray-700`이고 요일 원만 빨갛다) DS가 정할 수 없어서입니다.
- **휴일 꼬리말은 두 가지입니다.** 「· 휴일」(`weekend`)과 「· 공휴일」(`publicHoliday`)이고, 문구는 `ORDER_HOLIDAY_SUFFIX` · `ORDER_PUBLIC_HOLIDAY_SUFFIX`입니다(356에서는 `Order/shared`, 357부터 이 컴포넌트의 `constants`). DOTOLI-350에서 「· 공휴일」을 옛 표기로 보고 따르지 않았던 것을 뒤집었습니다. DS 개편에서 둘을 구분하기로 해서입니다.
- **꼬리말은 제목과 다른 `span`입니다.** Figma가 두 글자 사이를 공백이 아니라 간격 4로 띄웠습니다. 종전처럼 문자열로 이어 붙이면(`16일 · 휴일`) 간격이 글꼴 공백 폭에 달립니다.
- **`hasTitle` · `hasDescription`은 값 유무로 파생합니다.** 계열의 「값 유무로 상태 파생」 기준(DOTOLI-231 `hasDelivery`)과 같습니다.
- **제목 아래 -2는 설명이 있을 때만 겁니다.** CSS에서 마지막 자식의 음수 margin은 묶음 높이를 줄여, 제목만 있을 때 Figma(23)보다 2 작아집니다.
- **`whitespace-nowrap`은 걸지 않았습니다.** Figma의 hug 표현이고, 담는 쪽이 좁으면 줄을 바꾸는 편이 넘치는 것보다 낫습니다(QuantityStepper 상품명과 같은 판단).
- **기본 `size`는 Figma 기본값 `md`입니다.** 종전 날짜 행은 18(`lg`)이었으니, 소비 앱이 같은 크기를 유지하려면 `size="lg"`를 넘겨야 합니다.

### API

| prop | 필수 | 기본값 | 비고 |
| --- | --- | --- | --- |
| `title` | | — | `16일` · `12일(목)`. 소비 앱이 포맷. 없으면 제목 줄을 그리지 않음 |
| `description` | | — | 마감 시각 · 입력 상태 · 잠긴 이유 등. 소비 앱이 조립. `ReactNode`라 일부만 다른 색으로 칠할 수 있음 |
| `theme` | | `'default'` | `ORDER_DATE_INFO_THEMES` |
| `size` | | `'md'` | `ORDER_DATE_INFO_SIZES` |
| `dayType` | | `'weekday'` | `ORDER_DATE_INFO_DAY_TYPES` |
| `className` | | — | |

**DOTOLI-356은 파괴적 변경입니다.** 소비 앱에서 버전을 올리면 아래가 깨집니다.

| 소비 앱 위치 | 바꿀 것 |
| --- | --- |
| `OrderDayCard` | `dateLabel` → `title`, `isHoliday` → `theme="red"` + `dayType="weekend"`, `size="lg"`(종전 크기 유지) |
| `OrderConfirmRow` | 위와 같음. 지금 `dateLabel`에 `ORDER_HOLIDAY_SUFFIX`를 직접 붙이고 있어 빼야 함(안 빼면 「· 휴일」이 두 번) |

없어진 공개 이름은 `dateLabel` · `isHoliday` · `deadlineLabel` · `action` · `isDeadlinePassed`, `OrderDateInfoAction` · `OrderDateInfoStyles` · `ORDER_DATE_INFO_STYLES` · `ORDER_DATE_INFO_DATE_STYLE` · `ORDER_DATE_INFO_TRAILING_STYLE`, `GenerateOrderDateInfoDateLabelProps`입니다. `ORDER_DATE_INFO_BASE_STYLE`은 값이 바뀌었습니다. 새로 생긴 것은 `ORDER_DATE_INFO_THEMES` · `ORDER_DATE_INFO_SIZES` · `ORDER_DATE_INFO_DAY_TYPES`와 각 타입, `ORDER_DATE_INFO_TITLE_COLORS` · `ORDER_DATE_INFO_TITLE_VARIANTS` · `ORDER_DATE_INFO_DAY_TYPE_SUFFIXES` · `ORDER_DATE_INFO_DESCRIPTION_COLOR` · `ORDER_DATE_INFO_TITLE_STYLE` · `ORDER_DATE_INFO_TITLE_WITH_DESCRIPTION_STYLE`, `Order/shared`의 `ORDER_PUBLIC_HOLIDAY_LABEL` · `ORDER_PUBLIC_HOLIDAY_SUFFIX`입니다. 소비 앱이 상수 · 타입을 import하는 곳은 0건입니다(stage, 11/26).

### Storybook

`apps/storybook/src/stories/biz-ui/OrderDateInfo.stories.tsx`, `meta.title`은 `core/biz-ui/Order/OrderDateInfo`.

| 스토리 | 보는 것 |
| --- | --- |
| `Default` | 컨트롤 패널. 제목 + 설명 |
| `Matrix` | `theme` × `size` × `dayType` 18조합. Figma 세트와 같은 배치 |
| `WithDescription` | 제목 + 설명 · 휴일 + 설명 · 흐림 + 설명 · 설명만 |
| `WithHighlightedDescription` | `description`에 노드를 넘겨 「이번만 변경」만 `yellow-600`으로 칠한 예. 강조 색은 쓰는 쪽이 정함 |
| `WithOrderBox` | 쓰는 쪽 조합 예. `lg` 제목 옆에 `CtaButton`, 아래 [OrderBox](#orderbox). 카드는 스토리가 그림 |

### 이력

DOTOLI-356 전의 결정입니다. 다른 문서가 인용하는 것만 남깁니다. 상세는 git 이력(이 파일의 DOTOLI-335 시점)에 있습니다.

- **DOTOLI-231 (Figma 실측, `203:872`).** 1행 날짜(`body-lg-semibold` `gray-700`, 휴일 `red-600` + 「· 휴일」), 2행 배송 정보(`body` `blue-400`, 없으면 「배송없음」 `gray-400`), 행 간격 `-mb-0.5`였습니다. **`hasDelivery`를 prop으로 열지 않고 `deliveryInfo` 유무로 파생**시킨 것이 계열의 「값 유무로 상태 파생」 선례로 여러 문서에 인용됩니다. 「· 휴일」 접미어를 DS가 붙인 것이 `Order/shared`를 연 근거 중 하나였습니다.
- **DOTOLI-336 · 350 (아티팩트 Q1, 한 줄 날짜 행).** 배송 정보 2행을 날짜 + 오른쪽(마감 문구 · `action` 버튼 · 마감 뒤 「주문마감」 배지) 한 줄로 바꿨고, 350에서 날짜 글자만 Figma(18 · 600 `gray-700`, 휴일 `red-600` + 「· 휴일」)로 되돌렸습니다. 휴일 빨강을 `red-600`으로 고른 근거(18px 600은 큰 글씨 기준에 들지 않아 4.5:1 필요, `red-600` 6.15:1)는 지금도 그대로입니다.

---

## QuantityStepper

Figma: 컴포넌트 세트 `199:823`. 심볼은 `199:822`(empty) · `199:821`(filled) · `534:1727`(error) · `1244:2615`(warning)입니다.

상품명 · 수량 증감 묶음이 한 줄이고, 그 아래 오른쪽에 총계와 안내 문구가 붙습니다. **DOTOLI-347에서 세트가 다시 그려진 것을 따라 세로형(이미지 · 가운데 상품명 · 꽉 찬 증감 행 · 총계 pill)에서 가로형으로 바꿨습니다.** **Order 계열에서 처음으로 상호작용이 있는 컴포넌트**이고, 선행은 기구현 `IconButton`뿐입니다.

### Variant 축

| 축      | 값                          |
| ------- | --------------------------- |
| `state` | `empty` · `filled` · `error` · `warning` |

Figma 심볼은 `199:822`(empty) · `199:821`(filled) · `534:1727`(error, 이름은 `state3`) · `1244:2615`(warning, DOTOLI-347)입니다.

**`state`를 prop으로 열지 않습니다.** `empty`는 `value === null`, `error`는 `value > max`, `warning`은 `warningMessage`가 있을 때입니다. 우선순위는 `empty` > `error` > `warning` > `filled`이고, 판정은 `resolveQuantityStepperState`가 합니다 — `Input/shared`의 `resolveInputState`와 같은 형태입니다.

### 실측 스펙

DOTOLI-347 기준(세트 `199:823` 재실측).

| 영역             | 값                                                                       |
| ---------------- | ------------------------------------------------------------------------ |
| 루트             | `flex-v-stack` · gap 8px · `py-[12px]`. 폭은 선언하지 않음 (문서 프레임 312px, 실제 fill) |
| 본문             | `flex-v-stack items-end` · gap 4px · `w-full`                            |
| 상품 행          | `flex-h-stack items-center` · gap 12px                                   |
| 상품명           | `body-lg-semibold` · `gray/800` · `flex-1 min-w-0`                       |
| 증감 묶음        | gap 6px                                                                  |
| 감소 · 증가 버튼 | `IconButton` `lg` 40px + `inset-ring` 1px `gray/200`                     |
| 값 인풋          | `w-[72px]` · `h-[40px]` · `bg-gray-50` · `rounded-6` · `px-[13px]` · 가운데 정렬 |
| 값 텍스트        | `heading-5` — 값 `gray/900` / 플레이스홀더 `0` `gray/300`               |
| 총계             | `label-semibold` · 배경 없음 · 오른쪽                                     |
| 안내 문구        | `caption` · 오른쪽 정렬 · 넘치면 줄바꿈                                    |

| state     | `value`         | 인풋 링                       | 총계       | 문구       |
| --------- | --------------- | ----------------------------- | ---------- | ---------- |
| `empty`   | `null` (미주문) | `inset-ring` 1px `gray/200`   | `gray/300` | —          |
| `filled`  | `0` ~ `max`     | `inset-ring` 1px `gray/200`   | `blue/500` | —          |
| `error`   | `> max`         | `inset-ring-2` `red/400`      | `red/500`  | `red/400` `errorMessage` |
| `warning` | `warningMessage` 있음 | `inset-ring-2` `yellow/400` | `yellow/600` | `yellow/600` `warningMessage` |

### 결정

- **세로형에서 가로형으로 바꿨습니다(DOTOLI-347).** 티켓은 경고 안내 추가였지만 세트가 이미 가로형으로 다시 그려져 있었고, 11/23 주간주문 시안(W22 `241:22382`)도 새 심볼을 그대로 썼습니다. 경고만 세로형에 붙이면 소비 앱 수량 시트(BP-247)가 시안을 그릴 수 없어 함께 맞췄습니다. 당시 소비 앱 사용처는 0건이었고 상품 이미지(`imageUrl`)는 지웠습니다(아래 「결정」).
- **값 박스 높이는 40입니다.** 심볼은 정상 41 · error/warning 40인데, 정상 쪽은 1px stroke와 안쪽 0.5px 투명 테두리가 레이아웃에 들어간 값입니다. `inset-ring`이라 두 상태 모두 40이고 버튼(40)과 높이가 맞습니다. 폭은 Figma `min-w-[72px]`(내용 hug)인데 `<input>`은 내용에 맞춰 늘지 않아 `w-[72px]`로 고정했습니다. 세 자리(`100`)까지 들어갑니다. 테두리를 `inset-ring`으로 그리는 것 자체는 CLAUDE.md [스타일 규칙].
- **경고는 `warningMessage` 하나로 켭니다(DOTOLI-347).** 「평소보다 많다」의 기준(평소 수량 · 배수)은 소비 앱 정책이라 DS가 받지 않고, 문구가 있으면 경고입니다. 저장을 막지 않는 안내라 `aria-invalid`는 걸지 않고 `aria-describedby`만 겁니다. 초과(`error`)와 겹치면 error가 이깁니다 — 막는 쪽 안내가 먼저입니다.
- **empty 표시는 플레이스홀더 `0`입니다(DOTOLI-347).** 새 심볼이 empty에서 회색 `0`을 보여 줘서 `placeholder` 기본값을 「얼마나 시킬까요」에서 `0`으로 바꿨습니다. 의도적 `0`은 진한 글자 · 파란 총계라 미주문과 계속 갈립니다. prop은 남겨 두어 다른 문구가 필요하면 넘깁니다.
- **루트에 폭을 선언하지 않습니다.** 심볼의 312px은 문서 값이고 실제로는 fill입니다. 루트에 `w-full`을 넣었더니 소비처가 `className`으로 준 `w-[312px]`과 충돌해 폭이 240px로 줄었습니다 — 이 레포는 `clsx`만 쓰고 tailwind-merge가 없어서 두 클래스가 동시에 나오면 CSS 순서에 맡겨집니다. 안쪽 블록들만 `w-full`을 갖습니다.
- **값 박스는 `<input>`이고 정수만 받습니다.** 버튼으로도, 키보드로도 조절합니다. `type='text'` + `inputMode='numeric'`이고(모바일 숫자 키패드, `type='number'`의 스피너·`e`·`-` 허용 문제 회피) `parseQuantityInput`이 `\D`를 전부 걷어냅니다 — 소수점도 걸러지므로 **소수 입력이 불가능**합니다. 빈 문자열은 `null`로 정규화해 플레이스홀더로 돌아갑니다.

- **미주문(`null`)과 의도적 `0` 주문을 구분합니다 (DOTOLI-284).** 소비 도메인이 「주문을 등록하지 않은 상태」와 「수량을 0으로 정한 상태」를 다르게 다뤄야 해서 `value`를 `number | null`로 엽니다. `null`은 `empty`(회색 총계 · 플레이스홀더), `0`은 `filled`(파란 총계 · 진한 숫자 `0`)입니다 — 둘 다 감소 버튼은 비활성이지만 총계 색과 인풋 글자 색으로 갈립니다. DOTOLI-347 전에는 총계가 색 pill이었습니다.

  **전에는 `0`과 미주문이 같은 것이었습니다.** `parseQuantityInput`이 빈 입력을 `0`으로 내리고 인풋을 `value > 0`일 때만 렌더해서, `0`을 치면 빈칸으로 튕겨 미주문과 구분이 불가능했습니다. 파서를 `null` 반환으로, 인풋 표시를 `value !== null`로 바꿔 `0`이 살아남게 했습니다. **`0`의 시각은 Figma에 심볼이 없어 `filled`로 정했습니다** — pill 색이 「이 행에 결정이 있다」는 신호라 미주문(회색)과 갈려야 합니다. 아래 「디자인 확인 필요」에 올렸습니다.

  **별도 `isOrdered` boolean을 두지 않았습니다.** 두 prop이면 `isOrdered=false`인데 `value=5`처럼 어긋난 상태가 생깁니다 — 값이 항상 같이 움직이므로 하나로 흡수합니다(이 계열의 축 흡수 기준과 같음).
- **입력 파서는 internal-ui `Filter/utils/parseNumericInput`의 축소판입니다.** 거기서 `isDecimal=false`일 때 하는 `\D` 제거가 필요한 전부입니다. 정수만 쓰므로 소수 분기를 두지 않았고, biz-ui는 internal-ui에 의존하지 않으므로 코드를 가져오지 않고 `QuantityStepper/utils/`에 따로 뒀습니다.
- **입력값을 상한으로 절단하지 않습니다.** `parseNumericInput`은 `max` 초과 시 `max`로 잘라내는데, 그렇게 하면 초과 상태가 만들어지지 않아 **에러 심볼(`534:1727`)이 영원히 렌더되지 않습니다.** 초과를 표현할 UI가 생겼으므로 값은 그대로 통과시키고 소비처가 `errorMessage`로 알립니다.
- **감소 버튼은 `value`가 `null`이거나 `0`일 때 비활성합니다.** 둘 다 「더 내릴 곳이 없는」 상태입니다 — `0` 아래로는 못 가고 `null`은 아직 값이 없습니다. Figma 주석 `337:3554`(「빈박스 수량이 0 일때 - 버튼 비활성화」)가 근거인데, **미주문(`null`)이 새 상태로 갈라지면서 주석 문구가 이 둘을 함께 가리키지 못하게 됐습니다** — 아래 「디자인 확인 필요」. `IconButton`의 `disabled`가 `gray/300`으로 빠지는 것이 `empty` 심볼의 흐린 `Minus`와 일치합니다(활성은 `gray/500`).
- **error · warning 링을 `inset-ring-2`로 그려서 높이가 안 변합니다.** Figma는 정상 1px / error · warning 2px인데 심볼 높이가 41 → 40으로 어긋납니다(stroke가 레이아웃에 포함된 값). `inset-ring`은 레이아웃을 차지하지 않아 모든 상태가 40px로 유지되고, 에러가 떴다 사라져도 행이 튀지 않습니다 — CLAUDE.md [스타일 규칙]이 `Input` 1px↔2px 사례로 든 바로 그 상황입니다.
- **에러 메시지 문구는 소비처가 넘깁니다.** Figma 텍스트가 `에러 메시지가 표시됩니다`라는 자리표시자이고, 실제 문구는 재고·마감 등 도메인 사유마다 달라집니다. `aria-invalid`와 `aria-describedby`도 함께 겁니다 (`InputField`와 같은 처리).
- **`max`는 「몇 개부터 에러인지」를 정합니다.** 기본값 `100`. `value > max`면 에러 상태가 되고, 절단하거나 버튼을 막지 않습니다. 상한 장치를 `max`와 `errorMessage` 둘로 나누면 판정 기준이 두 군데로 흩어지므로 **기준은 `max` 하나, 문구만 `errorMessage`**로 갈랐습니다.
- **증가 버튼은 비활성하지 않습니다.** 에러 심볼 `534:1727`은 이미 초과 상태인데도 `Plus`가 활성(`gray/500`)이고, 주석 `337:3554`도 감소 버튼만 언급합니다. 버튼으로도 상한을 넘길 수 있고 넘기면 에러로 알립니다.
- **총계는 `unitsPerBox`를 받아 컴포넌트가 곱합니다.** 상자당 갯수는 상품명과 무관하게 API로 따로 내려옵니다 — 이름의 `10입` · `20개`는 표시용 문자열일 뿐이라 파싱 대상이 아닙니다. `총 {value × unitsPerBox}개` 조립까지 DS가 하는 이유는 곱셈이 포맷이 아니라 계산이고, 단위 `개`가 심볼 3종에서 모두 고정이기 때문입니다 — OrderBox의 `quantity`(「5박스 · 125개」)처럼 단위와 표기가 도메인마다 달라지는 경우와 다릅니다.
- **인풋 라벨은 `aria-labelledby`로 상품명을 가리킵니다.** 보이는 라벨이 없고, 한 화면에 스테퍼가 여러 개 놓이면 `aria-label='수량'`으로는 어느 상품인지 구분되지 않습니다. `useId`로 상품명에 id를 붙여 연결합니다.
- **상품 이미지를 그리지 않습니다(DOTOLI-347).** 새 세트에 `showImage` 축(기본 꺼짐)이 남아 있지만 쓰지 않기로 해서 `imageUrl` prop을 지웠습니다. Figma 축은 구현하지 않은 채로 둡니다.
- **상품명은 `flex-1 min-w-0`이라 길면 줄바꿈됩니다.** 증감 묶음은 `shrink-0`이라 줄어들지 않습니다.
- **증감 버튼 테두리는 스테퍼가 `className`으로 얹습니다.** `IconButton`에 테두리 테마가 없고, 이 모양을 쓰는 곳이 아직 여기뿐이라 `IconButton`을 넓히지 않았습니다. 아이콘 20px는 `IconButton` `lg` 기본값이라 따로 넘기지 않습니다(DOTOLI-353, [button.md](./button.md)).

### API

| prop           | 필수 | 기본값            | 비고                                                    |
| -------------- | ---- | ----------------- | ------------------------------------------------------- |
| `name`         | ✅   | —                 | 상품명. `10입` 같은 표기는 표시용                        |
| `value`        | ✅   | —                 | 박스 수량 `number \| null`. `null`=미주문(empty), `0`=의도적 0 주문(filled) |
| `unitsPerBox`  | ✅   | —                 | 상자당 갯수. 총계 = `value × unitsPerBox`               |
| `onChange`     | ✅   | —                 | `(value: number \| null) => void`. 버튼·입력 모두 이걸로 올라옴. 비우면 `null` |
| `errorMessage` |      | —                 | 초과했을 때 총계 아래에 띄울 빨간 문구                  |
| `warningMessage` |    | —                 | 있으면 경고 상태. 총계 아래 노란 문구. error가 우선      |
| `max`          |      | `100`             | 넘으면 에러 상태. 절단도 버튼 잠금도 하지 않음          |
| `placeholder`  |      | `0`               | 값이 `null`일 때 문구                                   |
| `className`    |      | —                 | 담는 쪽의 폭 지정용                                     |

### 디자인 확인 필요

| 항목 | 내용 |
| --- | --- |
| `0` 주문의 시각 | Figma에 「의도적 0 주문」 심볼이 없습니다. `filled`(파란 총계 + 진한 숫자 `0`)로 정해 미주문(`null`·회색)과 갈랐습니다 (DOTOLI-284). 별도 시각을 원하면 심볼 필요 |
| 경고 색 대비 | warning 총계 · 문구 `yellow/600`(#ce9f1d)이 흰 바탕에서 약 2.4:1로 AA(4.5:1) 미달. error 문구 `red/400`도 약 3.6:1. Figma 값 그대로 둠 (DOTOLI-347) |
| 네 자리 수량 | 값 칸이 `w-[72px]`(내용 46px)라 `heading-5` 세 자리까지 들어감. `max`를 절단하지 않아 네 자리 이상도 입력되고 그때는 칸 안에서 잘림 |
| 문구 알림 | 안내 문구에 `role` · `aria-live`가 없어 나타날 때 스크린 리더가 바로 읽지 않음(`aria-describedby`로 인풋 포커스 때 읽힘). `InputMessage`는 error에 `role='alert'`. 경고는 저장을 막지 않아 `alert`가 과하다고 보고 error와 함께 그대로 둠 |
| 주석 `337:3554` 문구 | 「빈박스 수량이 0 일때 - 버튼 비활성화」가 이제 `null`·`0` 두 상태를 함께 가리킵니다. 감소 버튼은 둘 다 비활성이라 동작은 맞지만 문구 갱신이 필요합니다 |

### Storybook

`apps/storybook/src/stories/biz-ui/QuantityStepper.stories.tsx`, `meta.title`은 `core/biz-ui/Order/QuantityStepper`. 스토리 3종 (`Default` · `States` · `UnitsPerBox`).

**controlled 컴포넌트라 스토리마다 상태를 들려 줍니다.** `value`를 arg로 고정해 두면 버튼과 입력이 아무 반응도 없어 컴포넌트가 고장난 것처럼 보입니다. 파일 안의 `StatefulStepper`가 `useState`로 값을 들고, `Default`는 `key={args.value}`로 remount 해서 `value` 컨트롤을 바꿨을 때 다시 seed 되게 합니다. `States`는 재고 20개(`max=20`)를 가정하고 `null`(미주문) · `0`(의도적 0) · `2` · `8`(warning) · `21`(초과, warning 문구도 넘겨 error 우선을 확인)을 나열하며 — **`null`과 `0`이 갈리는 자리** — `UnitsPerBox`는 상자당 갯수 `10` · `20` · `30`에서 총계가 각각 달라지는 것을 봅니다.

---

## OrderInputCard

Figma: 컴포넌트 세트 `309:1965`(문서 `302:1204`). 심볼 12개이고 이름은 `orderStatus, isLocked, isHoliday` 조합입니다(3 × 2 × 2 전부 있음). 구현은 `isHoliday` 대신 `dayType`을 받습니다(아래 「결정」).

요일 원 · 날짜를 왼쪽에, 버튼을 오른쪽에 두는 주문 입력 카드입니다. `ordered`만 아래에 수량 패널이 붙습니다. DOTOLI-357에서 DS 개편(11/25~26)을 반영해 상태 이름과 구조를 바꿨습니다. 왼쪽 글자는 [OrderDateInfo](#orderdateinfo) `md`, 수량 패널은 [OrderBox](#orderbox)의 비공개 `OrderBoxList`, 버튼은 `CtaButton`입니다.

### Variant 축

| 축 | 값 | 뜻 |
| --- | --- | --- |
| `orderStatus` | `unset` · `zero` · `ordered` | 미주문 · 수량 0으로 주문 · 수량 1 이상 |
| `isLocked` | boolean | 이유와 상관없이 입력할 수 없음(마감 · 운영중지 · 이용 전 등). 이유는 `description` |
| `dayType` | `weekday`(기본) · `weekend` · `publicHoliday` | 요일 원 색과 날짜 꼬리말 「· 휴일」 · 「· 공휴일」. Figma `isHoliday`를 OrderDateInfo와 같은 축으로 넓힘 |

### 실측 스펙

| 항목 | 값 |
| --- | --- |
| 카드 | `rounded-16` · `px-[20px] py-[14px]` · `inset-ring` 1px · 폭 340(문서 값, 실제 fill) |
| 요약 줄 | `flex-h-stack items-center` · gap 5 |
| 요약 블록 | `flex-1 min-w-0` · gap 8. 요일 원 + OrderDateInfo `md` |
| 요일 원 | `size-[40px] rounded-full` · `body-bold` |
| 버튼 | `CtaButton` `sm`(높이 32) |
| 수량 패널 | `rounded-10` · `px-[16px] py-[14px]` · 카드와 gap 10 · 줄은 OrderBoxCell(16 · 500 / 16 · 700, 줄 사이 2) |

모양은 「흐린 카드」(`zero`이거나 잠김)인지에 따라 먼저 갈리고, 나머지는 `orderStatus`를 따릅니다.

| 모양 | 조건 | 카드 | 요일 원 | 날짜(OrderDateInfo `theme`) |
| --- | --- | --- | --- | --- |
| `unset` | 미주문 · 열림 | `white` · `gray/100` | `gray/50` + `gray/700` | `default`(`gray/700`) |
| `ordered` | 주문 · 열림 | `white` · `blue/300` | `blue/50` + `blue/500` | `default` |
| `muted` | `zero` 또는 잠김 | `gray/50` · `gray/100` | `gray/300` + `gray/50` | `muted`(`gray/400`) |

휴일(`weekend` · `publicHoliday`)은 흰 카드(`unset` · `ordered`)일 때만 요일 원을 `red/50` + `red/400`으로 바꾸고, 흐린 카드는 휴일이어도 `gray/300` + `gray/50`입니다. 날짜 꼬리말은 모양과 상관없이 붙습니다.

| `orderStatus` | 버튼(열림) | 수량 패널 |
| --- | --- | --- |
| `unset` | primary filled 「주문 입력」 | 없음 |
| `zero` | gray outlined 「주문 수정」 | 없음 |
| `ordered` | primary outlined 「주문 수정」 | 열림 `blue/50`, 잠김 `gray/100` + 줄 `muted`(`gray/500`) |

잠기면 버튼이 없습니다. 0인 줄은 잠김과 상관없이 OrderBoxCell `empty`(`gray/400`, 「주문 없음」)입니다.

### 결정

- **상태 이름을 `unset` · `zero` · `ordered`로 바꿨습니다(DS 개편 결정).** COM-017이 「미주문과 주문 수량 0은 서로 다른 상태이며 서버에서도 구분되어야 한다」고 정한 구분을 이름에 그대로 드러냅니다. 종전 `inputRequired` · `noOrder` · `completed`는 화면 문구에 가까워 수량 0(`noOrder`)과 미주문이 이름으로 갈리지 않았습니다.
- **`inputClosed`를 상태에서 빼고 `isLocked`로 나눴습니다.** 마감 · 운영중지 · 이용 전처럼 입력할 수 없는 이유는 여러 가지인데 카드 모양은 같고, 잠긴 날에도 이미 들어간 주문(`ordered`)은 보여야 합니다. 상태 하나로 묶으면 「잠긴 주문」을 그릴 수 없어서 축을 나눴습니다. 이유는 `description` 문자열로 받습니다(정책이 늘릴 수 있어 union으로 묶지 않음).
- **잠기면 오른쪽을 비웁니다.** DS 개편에서 「오른쪽에 있으면 버튼」 규칙을 세워 마감 배지(DOTOLI-346의 `badgeLabel` · `badgeTheme`)를 없앴습니다. COM-017의 「주문입력 · 주문수정 버튼 모두 미노출, 탭 액션 없음」과 맞습니다.
- **날짜 아래 줄은 `description` 하나입니다.** DOTOLI-346의 `statusLabel`(기본 「입력 필요」 · 「주문 없음」)을 지우고, 기본 문구 없이 소비 앱이 넘깁니다. 시안이 이 자리에 「오늘 18시 마감 · 입력 필요」 · 「주문 없음」 · 「주문이 마감된 날이에요」처럼 마감 시각과 상태를 섞어 쓰는데, 마감 시각은 서버 값이라 DS가 조립할 수 없고 기본값이 있으면 소비 앱이 끌 방법이 따로 필요해집니다.
- **휴일은 `isHoliday`가 아니라 `dayType`으로 받습니다(11/26 사용자 결정).** Figma 카드 세트는 `isHoliday` boolean이라 안쪽 OrderDateInfo가 늘 `weekend`(「· 휴일」)인데, 카드에서도 「· 공휴일」을 그릴 수 있어야 해서 OrderDateInfo의 `dayType`을 그대로 받아 내려 줍니다(`Pick<OrderDateInfoProps, 'dayType'>`). 요일 원은 `weekend` · `publicHoliday` 둘 다 빨강이라 Figma `isHoliday=true`와 같고, 꼬리말만 갈립니다.
- **모양은 `resolveOrderInputCardAppearance`가 먼저 셋으로 줄입니다.** 12 심볼을 한 레코드에 펼치면 같은 값이 반복되고, 실제로 다른 값은 「흐린 카드인가」와 `orderStatus`뿐이라 `unset` · `ordered` · `muted` 세 모양(`ORDER_INPUT_CARD_STYLES`)과 휴일 요일 원 하나로 다 그려집니다.
- **흐린 카드에는 휴일 빨강을 얹지 않습니다.** 종전 결정(디자이너 확인)과 같고, DS 개편 Figma도 그렇게 그렸습니다. 종전에는 `inputRequired`일 때만 빨강이었는데 이제 `ordered`(열림)도 빨강입니다.
- **날짜 색은 `gray/700`입니다.** 종전 `gray/800`에서 OrderDateInfo `default`로 맞췄습니다(DS 개편에서 날짜 기본색을 `gray/700`으로 통일).
- **잠긴 `ordered` 패널은 줄을 흐리게(`muted`) 그립니다.** 패널 바탕이 `gray/100`으로 바뀌고 수량 있는 줄이 `gray/500`이 됩니다. 0인 줄은 원래 `gray/400`이라 그대로입니다. OrderBoxList에 비공개 `isMuted`로 넘깁니다.
- **수량 패널은 `ordered` 전용입니다.** `items`를 넘겨도 다른 상태에서는 그리지 않습니다(종전과 같음).
- **수량은 [OrderBox](#orderbox)와 같은 `OrderBoxItem`(`{ packageName, boxCount, unitCount }`)입니다.** DOTOLI-355에서 OrderBox가 숫자를 받아 「4박스 (80개)」를 조립하게 되면서 종전 `OrderInputCardItem`(`name` · `quantity` · `quantityLabel`)을 지웠습니다. 표기 규칙이 한 곳(`generateOrderBoxQuantityLabel`)에만 있습니다.
- **카드가 심볼보다 2px 낮습니다.** 테두리를 `inset-ring`으로 그려 레이아웃을 차지하지 않아서입니다(종전과 같음).
- **루트에 폭을 선언하지 않습니다.** 심볼 340px은 문서 값이고 실제로는 fill입니다.

### API

| prop | 필수 | 기본값 | 비고 |
| --- | --- | --- | --- |
| `orderStatus` | ✅ | — | `ORDER_INPUT_CARD_ORDER_STATUSES` 3종 |
| `dayLabel` | ✅ | — | 요일 한 글자. `월` · `일` |
| `dateLabel` | | — | `16일`. OrderDateInfo `title`. 없으면 날짜 줄을 그리지 않음 |
| `description` | | — | 날짜 아래 줄. 마감 시각 · 입력 상태 · 잠긴 이유 |
| `isLocked` | | `false` | 버튼을 숨기고 흐린 카드 |
| `dayType` | | `'weekday'` | `ORDER_DATE_INFO_DAY_TYPES`. 휴일 둘은 요일 원 빨강(흰 카드일 때) + 「· 휴일」 · 「· 공휴일」 |
| `items` | | — | `ordered` 전용 `OrderBoxItem[]` |
| `onAction` | | — | 주문 입력 · 주문 수정 클릭. 잠기면 버튼이 없어 호출되지 않음 |
| `className` | | — | 담는 쪽의 폭 지정용 |

**DOTOLI-357은 파괴적 변경이지만 소비 앱 사용처는 0건입니다(stage, 11/26).** `orderStatus` 값이 바뀌었고(`inputRequired` → `unset`, `noOrder` → `zero`, `completed` → `ordered`, `inputClosed` → `isLocked`), `isHoliday`가 `dayType`으로 바뀌었고, `statusLabel` · `badgeLabel` · `badgeTheme`, `ORDER_INPUT_CARD_BADGE_THEMES` · `OrderInputCardBadgeTheme` · `ORDER_INPUT_CARD_STATUS_LABELS` · `ORDER_INPUT_CARD_STATUS_LABEL_COLOR` · `ORDER_INPUT_CARD_EMPTY_ITEM_LABEL` · `ORDER_INPUT_CARD_TEXT_STYLE` · `OrderInputCardStatusStyles` · `GenerateOrderInputCardDateLabelProps`, `Order/shared`의 `ORDER_DEADLINE_PASSED_LABEL`이 없어졌습니다. `Order/shared` 폴더도 지웠고, 남은 휴일 문구 네 개는 같은 이름으로 `OrderDateInfo/constants`에서 내보냅니다(공개 이름은 그대로). 새로 생긴 것은 `isLocked` · `description` · `dayType`, `ORDER_INPUT_CARD_APPEARANCES` · `OrderInputCardAppearance` · `OrderInputCardAppearanceStyles` · `ORDER_INPUT_CARD_DATE_INFO_STYLE` · `ORDER_INPUT_CARD_ITEMS_BACKGROUNDS` · `ResolveOrderInputCardAppearanceProps`이고, `ORDER_INPUT_CARD_STYLES`는 키가 모양 3종으로 바뀌었습니다. `ORDER_INPUT_CARD_ITEMS_STYLE`에서 `bg-blue-50`이 빠졌습니다.

### 디자인 확인 필요

| 항목 | 내용 |
| --- | --- |
| 버튼 문구 띄어쓰기 | Figma 심볼은 「주문입력」 · 「주문수정」(붙임)인데 DOTOLI-346에서 시안 · 소비 앱 plan을 따라 띄어 쓴 「주문 입력」 · 「주문 수정」을 유지함 |
| 카드 탭 | 시안 인스턴스는 카드 전체가 `<a>` · `<button>`이지만 DS는 버튼만 눌림. 바꾸면 버튼과 카드가 중첩 인터랙티브가 되어 함께 정해야 함 |

### Storybook

`apps/storybook/src/stories/biz-ui/OrderInputCard.stories.tsx`, `meta.title`은 `core/biz-ui/Order/OrderInputCard`. 폭은 Figma 심볼과 같은 340px입니다.

| 스토리 | 보는 것 |
| --- | --- |
| `Default` | 컨트롤 패널. `ordered` + 수량 패널 |
| `Matrix` | `orderStatus` 3 × `dayType` 3 × 잠김 2 = 18조합. Figma 12조합에 공휴일 행을 더함 |
| `LockedReasons` | 잠긴 이유(주문중지 · 이용 전 · 서비스 해지)를 `description`으로 넘긴 카드 |

---

## OrderNotiCollapse

Figma: [OrderNotiCollapse 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=205-4063&m=dev) (`205:4063`), 컴포넌트 세트 `179:1158`.

주문 이력 카드의 **헤더**입니다. 사용예시는 소비 앱의 [ORD-301 주문 내역](https://www.figma.com/design/LomGIAwvPAkyRbBcGbk9rs/%EA%B3%A0%EA%B0%9D-%EB%B9%84%EC%A6%88?node-id=1426-12990&m=dev) (`1426:12990`)이고 인스턴스가 14개 있습니다.

### `useDetail` 축은 구현하지 않습니다

Figma 심볼은 9개(`type` 3 × `isOpen` 2 × `useDetail` 2 중 `isOpen=false·useDetail=true`는 없음)인데, **디자이너가 「디자인상에만 추가해 둔 것이니 개발에서 제외해 달라」고 확인해 줬습니다.**

빼고 나면 남는 6개 심볼에서 **`isOpen`은 caret 방향만 바꿉니다** — 박스 · 색 · 텍스트 · 높이(62)가 전부 같습니다. `isOpen=true·useDetail=false`(`179:1296`)가 같은 헤더를 `flex-col` 래퍼로 한 겹 더 감싸는데, **상세 블록을 담으려고 만든 자리**라 내용이 없으면 아무 일도 하지 않습니다. 구현에서는 걷어냈습니다.

**실사용이 이 결정과 맞습니다.** ORD-301의 인스턴스 14개가 전부 **62 높이**이고, 접히는 내용(`OrderBox` · 사유 · 기간)은 인스턴스 안이 아니라 **형제 `Container` 프레임**에 있습니다. 주석 `355:1286`도 「선택영역 헤더 전체(**콘텐츠 영역 외**)」입니다. 즉 이 컴포넌트는 **자기가 접는 것을 담지 않습니다** — [`CollapseButton`](./button.md)과 같은 계약입니다.

### Variant 축

| 축       | 값                                                          |
| -------- | ----------------------------------------------------------- |
| `type`   | `orderStop` · `orderEdit` · `fixedOrder` · `weeklyOrder`     |
| `isOpen` | `false` · `true` — caret 방향만                              |

### 실측 스펙

| 항목        | 값                                                    |
| ----------- | ------------------------------------------------------ |
| 높이        | 62 → `h-[62px]` 고정 (아래 「결정」)                    |
| 폭          | 심볼 380이지만 **fill** → `w-full`                      |
| 구분선      | **상단** 1px `gray/100` — `border-t`                    |
| padding     | 좌우 20 → `px-[20px]`. 상하 12는 높이로 대체            |
| 배치        | `justify-between`                                       |
| 유형명      | `label-bold` · `type`별 색                              |
| 등록일시    | `label` · `gray/600`                                    |
| 등록자      | `label` · `gray/600` · caret과 `gap-[4px]`              |
| caret       | 24px 박스 안 16px · weight `fill` · `gray/400`           |

**구분선이 `border-b`가 아니라 `border-t`입니다.** 카드가 세로로 붙어 쌓이는 형태라 헤더 위쪽에 선이 그어집니다.

| `type`        | 배경        | 유형명 색   | 문구      |
| ------------- | ----------- | ----------- | --------- |
| `orderStop`   | `red/50`    | `red/700`   | 주문 중지 |
| `orderEdit`   | `yellow/50` | `yellow/700`| 주문 수정 |
| `fixedOrder`  | **`gray/50`** | `blue/700`| 고정주문  |
| `weeklyOrder` | **`gray/50`** | `blue/700`| 주간주문  |

바인딩된 hex가 기존 토큰과 전부 일치해 **신규 토큰이 없습니다.**

### 결정

- **`weeklyOrder`는 DS 섹션이 아니라 사용예시에서 왔습니다.** Figma 컴포넌트 세트에는 `type` 3종뿐인데, ORD-301 인스턴스 2개(`1217:12860` · `1217:12899`)가 **「주간주문」**을 렌더하고 기획 패널(`1506:18895`)도 고정주문과 주간주문을 **서로 다른 유형**으로 나열합니다(본문에 담는 내용이 다름).

  렌더를 확대해 보니 **배경 · 유형명 색이 `fixedOrder`와 완전히 같고 문구만 다릅니다.** 값을 지어낸 것이 아니라 디자인 파일에서 읽은 것이라 4번째 타입으로 넣었고, **DS 심볼에 추가해 달라는 요청은 「디자인 확인 필요」에 올렸습니다.** 넣지 않으면 소비 앱이 배포 직후부터 우회해야 합니다.

- **유형명 문구를 DS가 소유합니다.** `type`에 1:1로 묶인 값이라 소비자가 정할 것이 없습니다 — [`CollapseButton`](./button.md)의 `COLLAPSE_BUTTON_LABELS`과 같은 판단입니다. `registeredAtLabel` · `registrant`만 소비자 값입니다.

- **Figma의 `badge` prop을 `registrant`로 바꿨습니다.** 담기는 값이 등록자(「뽀득」 또는 계정명)인데 `badge`는 내용을 설명하지 못하고, **같은 패키지의 `Badge` 컴포넌트와 이름이 겹쳐** 읽는 사람을 헷갈리게 합니다. Figma 이름을 그대로 따르는 규칙은 컴포넌트명에 걸리는 것이고, prop 이름은 [`MenuItem`](./menu-item.md)이 `label` · `description`을 새로 붙인 선례가 있습니다.

- **caret은 아이콘 교체가 아니라 회전입니다.** Figma는 `CaretUp`/`CaretDown` 교체인데, 같은 배치의 [`CollapseButton`](./button.md) · [`FaqAccordion`](./faq-accordion.md)과 회전으로 통일하기로 확인받았습니다.

  **weight는 `fill`이고 명시해 넘깁니다.** `Icon`은 `weight`를 안 주면 `ICON_DEFAULT_WEIGHT`(=`bold`)로 떨어져 라인 캐럿이 나옵니다. 접기 계열 셋이 같은 캐럿을 쓰므로 값도 같습니다 — **셋 다 처음에 이걸 빠뜨렸습니다.** 안 넘겨도 타입·빌드·린트가 전부 통과하고 기본값이 조용히 채워집니다.

- **헤더 전체가 `<button>`이고 caret은 장식입니다.** Figma는 안에 `IconButton` 인스턴스를 넣어 버튼이 중첩되는데, caret에 독립된 동작이 없어 `aria-hidden` `Icon`으로 내렸습니다. `InfoBanner` · `CollapseButton` · `FaqAccordion`과 같은 처리입니다.

- **높이를 고정합니다 — `h-[62px]`, `py-[12px]` 없음.** Figma 두 텍스트가 `mb-[-2px]`로 겹쳐 있는데 [`MenuItem`](./menu-item.md)과 같은 폰트 메트릭 아티팩트라 음수 마진을 옮기지 않았습니다. 패딩으로 쌓으면 `12 + 40.6 + 12 = 64.6`이 되어 Figma 62와 어긋나므로 높이를 고정합니다.

- **`aria-expanded`를 붙이고 `aria-controls`는 통로로 엽니다.** 접히는 영역이 **소비 앱 것**이라 id를 DS가 알 수 없습니다 — [`CollapseButton`](./button.md)과 같고, 영역을 자기가 가진 [`FaqAccordion`](./faq-accordion.md)이 `useId`로 직접 배선한 것과 갈립니다.

- **행에 `gap-[8px]`을 넣었습니다.** `justify-between`은 **여유 공간이 있을 때만** 두 그룹을 벌리므로, 좌측이 줄어들어 말줄임이 걸리는 순간에는 여유가 0이라 `…`와 등록자가 맞닿습니다. 아래 가드가 실제로 성립하려면 필요한 한 줄입니다 — `NavigationListItem`(`gap-[6px]`) · `FaqAccordion`(`gap-[8px]`)이 같은 이유로 갖고 있습니다.

- **좌측 텍스트에 `min-w-0 truncate`를 겁니다 — Figma는 양쪽 다 `shrink-0`입니다.** `registrant`가 계정명이라 길이가 변합니다(기획 `1436:12308`의 등록자 유형 4종). Figma대로 두면 긴 이름에서 헤더가 넘치므로, **우측(등록자 + caret)을 `shrink-0`으로 지키고 좌측만 줄어들게** 했습니다. `NavigationListItem`의 「라벨만 잘리고 값은 안 잘린다」와 같은 구조입니다.

- **문구는 `ORDER_NOTI_COLLAPSE_LABELS`로 스타일 맵과 분리했습니다.** 한 레코드에 텍스트·클래스·토큰을 섞으면 계열 선례와 어긋납니다 — `OrderInputCard`가 `*_STYLES` / `*_ACTION_LABELS` / `*_STATUS_LABELS`를 같은 union 키로 각각 두고, `CollapseButton`도 `COLLAPSE_BUTTON_LABELS`를 따로 둡니다.

- **prop 이름이 `registeredAt`이 아니라 `registeredAtLabel`입니다.** 받는 값이 `Date`나 타임스탬프가 아니라 **이미 포맷된 표시 문자열**(`2026-00-00 16:30 등록`)입니다. Order 계열이 `OrderDateInfo.dateLabel` · `OrderInputCard.dayLabel`로 같은 접미어를 쓰고 있어 맞췄습니다.

- **`ref`를 엽니다.** 「펼친 뒤 헤더로 스크롤」처럼 소비자가 잡을 이유가 실제로 있는 자리이고, 형제인 `CollapseButton` · `MenuItem`이 `RefAttributes<HTMLButtonElement>`를 엽니다.

- **caret 회전에 `transition`을 겁니다 — `MOTION_TIMING_STYLE`.** Figma에 모션 정의는 없지만, 같은 접기 계열인 [`FaqAccordion`](./faq-accordion.md)이 이미 같은 캐럿을 250ms로 돌립니다. 맞추지 않으면 **한 DS 안에서 어떤 caret은 부드럽게 돌고 어떤 건 튑니다.** 값의 출처와 판단 근거는 [`faq-accordion.md`](./faq-accordion.md) 「결정」에 있습니다.

  caret 말고는 전환할 것이 없습니다 — `isOpen`이 caret 방향만 바꾸고, 접히는 내용은 이 컴포넌트가 담지 않습니다.

  **접기 계열에서 [`CollapseButton`](./button.md)만 회전 모션이 없는데, 그건 누락이 아니라 결정입니다** — 그쪽은 라벨이 상태에 따라 바뀌어 caret이 수평으로 밀리고 버튼 자체도 콘텐츠 아래라 수직으로 뜁니다. 여기 caret은 `size-[24px]` 슬롯에 고정돼 제자리에서 돕니다.

- **2행 겹침을 `-mb-0.5` 대신 높이 고정으로 처리한 것은 계열 안에서 갈립니다.** 같은 「2행 스택」이던 예전 `OrderDateInfo` · `OrderBoxCell`은 Figma의 2px 겹침을 `-mb-0.5`로 그대로 옮겼고, 여기는 `MenuItem` 선례를 따라 높이를 고정했습니다. **총 높이는 62로 같고 행 간격만 2.6px 넓습니다.** 두 컴포넌트가 DOTOLI-335 · 336에서 한 줄 구조로 바뀌어, 지금은 계열에 맞출 2행 스택이 이것만 남았습니다.

  `h-[62px]`는 `border-box`라 **`border-t` 1px을 포함**합니다. 콘텐츠 박스가 61이 되어 상하 여백이 12가 아니라 10.2로 계산되는데, Figma도 자식 좌표가 `12 + 38 + 12 = 62`로 딱 닫혀 stroke 몫이 따로 없으므로 **총 높이가 맞는 쪽**을 택했습니다. 카드가 세로로 붙어 쌓이는 형태라 총 높이가 어긋나는 편이 비쌉니다.

### API

| prop            | 필수 | 기본값 | 비고                                     |
| --------------- | ---- | ------ | ---------------------------------------- |
| `type`          | ✅   | —      | 4종. 배경 · 유형명 색 · 문구를 함께 정함 |
| `registeredAtLabel` | ✅ | —    | 등록일시 **표시 문자열**. 길면 말줄임      |
| `registrant`    | ✅   | —      | 등록자. 줄어들지 않음                     |
| `isOpen`        | ✅   | —      | caret 방향                                |
| `onClick`       | ✅   | —      | 헤더 전체 탭                              |
| `aria-controls` |      | —      | 접히는 영역의 id                          |
| `ref`           |      | —      | `<button>`을 가리킴                        |
| `className`     |      | —      | 담는 쪽의 여백 보정용                     |

### 디자인 확인 필요

| 항목                | 내용                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------- |
| `weeklyOrder` 심볼  | 사용예시에만 있고 DS 세트에는 없습니다. **`type`에 추가가 필요합니다** (구현은 사용예시 값으로 이미 반영). **반려되면 published union에서 값을 빼는 breaking change**가 되므로 우선순위가 높습니다 |
| `fixedOrder` 배경   | 자기 계열의 `blue/50`(#f1f6ff)이 토큰에 있는데도 `gray/50`을 씁니다. 의도인지                            |
| 상호작용            | `hover` · `pressed` · `focus` 축이 없습니다                                                              |
| caret 회전 모션     | Figma에 지정이 없는데 **넣었습니다** — `FaqAccordion`과 같은 250ms · `cubic-bezier(0, 0, 0.5, 1)`         |
| 등록자 길이         | 계정명 길이 가이드가 없습니다. 구현은 등록자를 지키고 좌측을 말줄임합니다                                 |

### Storybook

`apps/storybook/src/stories/biz-ui/OrderNotiCollapse.stories.tsx`, `meta.title`은 `core/biz-ui/Order/OrderNotiCollapse`. 데코레이터로 화면 폭과 같은 `w-[380px]`을 겁니다.

| 스토리        | 보는 것                                                          |
| ------------- | ---------------------------------------------------------------- |
| `Default`     | 컨트롤 패널                                                       |
| `Types`       | 4종을 붙여 쌓아 **`border-t`가 카드 사이를 가르는 것**까지 확인    |
| `Interactive` | `useState`로 caret 회전                                           |
| `LongText`    | 긴 등록일시 · 등록자에서 **좌측만 말줄임되고 우측이 유지되는 것**  |

---

## OrderWeekStatus (DOTOLI-348에서 제거)

DOTOLI-333에서 주문 메인 상태 카드의 7칸으로 만들었고, 11/18 시안에서 그 자리가 [`CalendarDayStatus`](./calendar.md#calendardaystatus)(DOTOLI-340)로 바뀌어 DOTOLI-348에서 지웠습니다. 소비 앱 사용처는 0건이었습니다. 다른 문서가 인용하는 결정만 남기고, 상세는 git 이력(DOTOLI-347 시점 이 파일)에 있습니다.

- **상태 이름은 bbodek-internal · 소비 앱 용어를 따랐습니다** (`ordered` · `unordered` · `deadlinePassed` · `suspended` · `noOrder`). `OrderDateInfo`의 `isDeadlinePassed`가 이 이름을 따릅니다.
- **둥근 점선을 SVG로 그렸습니다.** 둥근 `border-dashed`는 Android · iOS WebView가 점선을 다르게 나누고 이음매에서 뭉쳐서, 둘레를 계산해 12개로 균등 분할했습니다.
