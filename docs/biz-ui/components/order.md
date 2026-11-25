# Order 계열 구현 기록

`apps/biz-ui/src/components/Order` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 Order 계열 고유 사실만 둡니다.

Figma: [Order 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=203-847&m=dev) (`203:847`). 섹션 안의 `302:1434`(OrderBoxCell) · `302:1451`(OrderBox) · `302:1631`(OrderDateInfo) · `302:1573`(QuantityStepper) · `302:1204`(OrderInputCard)는 전부 문서용 프레임이고, 실제 값은 각 컴포넌트 세트에서 실측합니다.

**OrderBox(DOTOLI-335 이후) · OrderDateInfo(DOTOLI-336 이후)는 Figma가 아니라 주문 메인 개편 디자인 아티팩트(`claude.ai/artifact/BNjNgpDeuFY8x6EhkBtdUJ`)가 출처입니다.** 그래서 위 Figma 프레임 중 `302:1434` · `302:1451` · `302:1631`은 지금 구현과 맞지 않습니다. 예외로 OrderDateInfo의 날짜 글자는 DOTOLI-350에서 Figma로 되돌렸습니다(그 절 「결정」). 아티팩트는 목업이지만 「개선안」이라 기존 Figma 값보다 우선하고, 맞는 토큰이 없거나 의미가 너무 벗어날 때만 가장 가까운 토큰으로 옮깁니다. 색은 가장 비슷한 토큰을 쓰고, 차이는 각 절 「디자인 확인 필요」에 남깁니다(11/16 사용자 확인). 각 절에는 어느 보드를 봤는지만 적습니다.

## 구현 현황

| 컴포넌트          | 티켓       | 설명                                                        |
| ----------------- | ---------- | ----------------------------------------------------------- |
| `OrderBox`        | DOTOLI-230 · 335 · 354 · 351 | SKU 세로 목록(품목명 · 수량). 335에서 가로 3열을 교체하고 `OrderBoxCell`을 지움. 354에서 목록을 `OrderInputCard`와 함께 쓰는 비공개 `OrderBoxList`로 뽑음. 351에서 테두리 상자 변형(`variant="box"`)과 빈 상자 추가 |
| `OrderDateInfo`   | DOTOLI-231 · 336 · 350 | 날짜 행 한 줄. 오른쪽에 마감 문구 + 버튼, 마감 뒤엔 「주문마감」 배지. 336에서 배송 정보 2행을 교체, 350에서 날짜 글자를 Figma로 되돌림 |
| `QuantityStepper` | DOTOLI-232 | 상품 + 수량 증감 + 총계. Order 계열 첫 상호작용 컴포넌트    |
| `OrderInputCard`  | DOTOLI-233 | `orderStatus` 4종 × 휴일 × 날짜 유무. 계열에서 가장 큼      |
| `OrderNotiCollapse` | DOTOLI-264 | `type` 4종 × `isOpen`. **헤더만** 그리고 접히는 내용은 소비 앱이 형제로 둠 |

`OrderNotiCollapse`만 Order 섹션 밖([`205:4063`](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=205-4063&m=dev))에 있습니다.

## 계열 공통 결정

- **`shared/`에는 계열이 함께 쓰는 문구만 있습니다.** 착수 시점에는 열지 않았습니다 — 당시 OrderBox가 `OrderBoxCell`(DOTOLI-335에서 제거)을 **인스턴스로** 쓰는 관계라 공통 조각이 아니라 조합이었고, 나머지도 겹치는 것이 없었습니다. DOTOLI-233에서 `OrderDateInfo`와 `OrderInputCard`가 **둘 다 `· 휴일`을 붙이는 것**이 확인돼 그때 열었습니다(`ORDER_HOLIDAY_LABEL` · `ORDER_HOLIDAY_SUFFIX`). 디자이너가 이 표기를 바꾸면 같이 움직여야 하는 실제 결합입니다 (CLAUDE.md [코드 규칙] 1).

  DOTOLI-336에서 OrderDateInfo가 접미어를 뺐다가 DOTOLI-350에서 다시 붙여, 지금은 두 컴포넌트가 `ORDER_HOLIDAY_SUFFIX`를 함께 씁니다. 여기에 더해 「주문마감」(`ORDER_DEADLINE_PASSED_LABEL`)이 새로 들어와 `OrderDateInfo` · `OrderInputCard` 둘이 함께 씁니다(`OrderWeekStatus`도 썼지만 DOTOLI-348에서 지움). 정책 2-3이 이 라벨을 「3-2 입력 불가 라벨과 통일」로 묶어 둔 결합입니다.

---

## OrderBox

SKU를 한 줄에 하나씩 세로로 적는 목록입니다. 왼쪽 품목명, 오른쪽 수량입니다(정책 「주문(new)」 1-10). DOTOLI-335에서 가로 3열(`OrderBoxCell`을 담는 grid)을 **통째로 교체**했고, 예전 모양은 남기지 않았습니다(11/13 사용자 결정). 지난 결정은 아래 「이력」에 있습니다.

목록형(`list`)의 출처는 Figma가 아니라 주문 메인 개편 디자인 아티팩트(`claude.ai/artifact/BNjNgpDeuFY8x6EhkBtdUJ`)의 Q1(주문 관리 · 주문 목록)입니다(원칙은 문서 머리말). 소비처는 biz-customer-app BP-132(주문 관리 SKU 세로 표기)입니다. 상자형(`box`)은 DS Figma OrderBox 세트(`169:688`)의 `default`(`169:687`) · `empty`(`179:577`)가 출처이고, 소비처는 바깥 카드 없이 날짜별 상자를 늘어놓는 주문 확인 · 완료 화면(BP-250, 시안 W8 `241:22514` · W21 `241:22567`)입니다.

### Variant 축

| `variant` | 모양 | 쓰는 곳 |
| --- | --- | --- |
| `list`(기본값) | 바탕 · 테두리 · padding 없는 글자 목록 14px | 소비 앱 카드(`OrderDayCard`) 안 |
| `box` | 흰 바탕 · 테두리 상자 안의 16px 목록. 비면 회색 상자 가운데 정렬 | 바깥 카드가 없는 주문 확인 · 완료 화면 |

빈 상태는 prop이 아니라 `items` 유무로 파생합니다(두 변형 공통).

### 실측 스펙

| 요소 | 아티팩트 Q1 | 구현 |
| --- | --- | --- |
| 한 줄 | 왼쪽 품목명 · 오른쪽 수량, 글자 14, 줄 높이 20 | `flex-h-stack` `justify-between` `gap-[8px]` |
| 품목명 | `rgb(26,34,51)` · 600 | `label-semibold` `gray-900`(값이 같음) |
| 수량 | `rgb(74,84,104)` · 400 | `label` `gray-700`(`#4c566e`, 가장 가까운 토큰). 굵기는 500(14px 토큰은 500 · 600 · 700뿐) |
| 하루 전체 0 | 품목명 자리에 굵은 「주문 없음」 한 줄 | `emptyLabel`을 품목명과 같은 글자(`label-semibold` `gray-900`)로 |
| 줄 사이 | 디자인에 SKU가 하나뿐이라 값 없음 | `gap-[2px]`(옛 `OrderInputCardItems` 선례) |

바탕 · 테두리 · padding은 없습니다. 날짜 행과 SKU 행을 담는 흰 카드(Q1의 `.row`)는 소비 앱이 그립니다.

`box`(DOTOLI-351)는 DS Figma 실측입니다.

| 요소 | Figma | 구현 |
| --- | --- | --- |
| 상자 | `default` 338 × 103, 흰 바탕, `gray-100` 1px, r16, padding 17/15, 줄 사이 2 | `ORDER_BOX_BOX_BASE_STYLE` + `bg-white inset-ring-gray-100` |
| 품목명 · 수량 | body 16 · 500 / body-bold 16 · 700, `gray-800` | `ORDER_BOX_BOX_LIST_STYLES` |
| 0인 줄 | 품목명 · 수량 모두 `gray-400` | `NO_ORDER_COLOR: gray-400`, `isNoOrder`로 켬 |
| 빈 상자 | `empty` 338 × 50, `gray-100` 바탕, `gray-300` 1px, r16, padding 17/15, 가운데 정렬 label 14 · 500 `gray-400` | `<p>`에 `bg-gray-100 inset-ring-gray-300 text-center` |

테두리는 `inset-ring`이라 자리를 차지하지 않아 Figma padding(17/15)을 그대로 씁니다. 높이 103 = 15 × 2 + 23 × 3 + 2 × 2로 Figma 테두리도 자리를 차지하지 않는 것과 맞습니다. Storybook 실측 338 × 103.6 · 338 × 50.3(줄 높이 소수점)입니다.

### 결정

- **variant 추가가 아니라 교체입니다.** 소비 앱이 가로 3열을 쓰는 화면이 더는 없어 옵션으로 남기지 않았습니다(소비 앱 plan.md DS4). 그래서 `variant` 축(`noBg` · `default` · `past` · `inverse`)이 통째로 없어졌고, DOTOLI-317의 `inverse`도 함께 정리됐습니다. 남긴 것은 아티팩트에 있는 상태(채워짐 · 하루 전체 0)뿐입니다.
- **`OrderBoxCell`을 지우고 비공개 `OrderBoxRow`로 바꿨습니다.** 세로 한 줄이라 「Cell」이 맞지 않고, 소비 앱이 import하는 곳이 0건이었습니다. 한 줄은 OrderBox 안에서만 쓰는 조각이라 같은 폴더의 비공개 컴포넌트로 뒀습니다.
- **글자 목록은 비공개 `OrderBoxList`이고 `OrderInputCard`도 이걸 씁니다(DOTOLI-354).** `OrderInputCard`의 주문내역 패널이 따로 그리던 `OrderInputCardItems`와 줄 구조(왼쪽 품목명 · 오른쪽 수량 · 줄 사이 2 · 0이면 연한 색)가 같아 하나로 합쳤습니다. `OrderBoxList`는 `<dl>`만 그리고 바탕 · 테두리 · padding은 갖지 않습니다. 감싸는 모양은 쓰는 쪽이 `className`으로 얹습니다(`OrderInputCard`는 파란 패널). 글자 크기 · 색은 `OrderBoxListStyles`(품목 · 수량 각각 타이포 + 색, 0인 줄 색)로 받고, 쓰는 쪽이 상수 레코드로 넘깁니다(`ORDER_BOX_LIST_STYLES` · `ORDER_INPUT_CARD_ITEMS_STYLES`). 배럴에서 내보내지 않고 `OrderInputCard`가 파일 경로로 import합니다. 소비 앱 진입점은 완성된 컴포넌트뿐이라는 원칙(`apps/biz-ui/CLAUDE.md` 코드 규칙 1)을 따랐습니다.
- **0인 줄은 `isNoOrder`로 표시합니다(DOTOLI-354).** `OrderBoxItem.isNoOrder`가 `true`이고 그 목록 스타일에 `NO_ORDER_COLOR`가 있으면 품목명과 수량을 그 색으로 칠합니다. 목록형(`ORDER_BOX_LIST_STYLES`)에는 `NO_ORDER_COLOR`가 없어 아무것도 바뀌지 않습니다. 아티팩트 Q1에 일부 SKU만 0인 행의 색 구분이 없어서입니다. 상자형은 `gray-400`으로 칠합니다(DOTOLI-351).
- **상자형은 `variant`로 열었습니다(DOTOLI-351).** 받는 데이터(`items` · `emptyLabel`)가 같고 감싸는 모양과 글자 묶음만 달라서 별도 컴포넌트로 나누지 않았습니다. 변형별 값은 `ORDER_BOX_VARIANT_STYLES`(상자 · 빈 상자 클래스, 목록 글자 묶음, 빈 상태 글자) 한 레코드에 모았고, `list`는 상자 클래스가 빈 문자열이라 이 변경 전과 같은 결과입니다. 이름은 DS Figma의 `default`가 아니라 `box`입니다. 기본값이 Figma `default`가 아닌 목록형이라 `default`를 값 이름으로 쓰면 헷갈려서입니다. 335 이전의 `default` 변형(`rounded-16 bg-white inset-ring inset-ring-gray-100`)과 상자 모양은 사실상 같습니다.
- **DS Figma `169:688`의 나머지 변형은 만들지 않았습니다.** `noBg`(16px 목록, padding 16/14)는 목록형 자리지만 아티팩트 Q1(14px)과 달라 그대로 뒀습니다. `noBg`는 OrderInputCard 파란 패널(`94:694`)과 바탕만 다르고 규격이 같습니다. `past`(회색 상자) · `variant5`(남색 「주문 없음」)는 쓰는 화면이 확인되지 않았습니다. 목록형을 DS 16px로 맞출지는 「디자인 확인 필요」에 남깁니다.
- **빈 상자 글자는 시안 W21의 굵기(14 · 700)가 아니라 DS `empty`의 14 · 500입니다.** 굵기 옵션은 DOTOLI-352 몫입니다.
- **`boxes`를 `quantity`로 바꿨습니다.** 값이 「5박스」에서 「5박스 · 125개」가 되어 이름이 맞지 않습니다. 소비 앱은 `getOrderBoxItems` 한 곳만 고치면 됩니다.
- **문자열은 소비 앱이 조립합니다.** 「5박스 · 125개」의 단위 · 구분자, 일부 SKU만 0인 행의 「주문 없음」(디자인에 없는 경우)은 도메인 규칙이라 DS가 만들지 않습니다. DS가 0을 알아서 표기하려면 숫자를 받아야 해서 이 원칙이 바뀝니다.

  **같은 목록을 쓰는 `OrderInputCard`와는 반대입니다.** 그쪽은 수량을 `number`로 받아 0이면 DS가 「주문 없음」 문구와 `isNoOrder`를 만들어 `OrderBoxList`에 넘깁니다(`generateOrderInputCardItems`). 그쪽은 단위가 「개」 하나로 고정된 입력 화면 요약이라 DS가 숫자에서 문구를 만들 수 있고, 여기는 「박스 · 개수」 두 단위를 소비 앱이 조립하는 표기라 0만 따로 DS가 맡으면 표기 규칙이 두 곳으로 갈립니다. 그래서 OrderBox에서는 문구와 `isNoOrder`를 둘 다 소비 앱이 넘깁니다.
- **`emptyLabel`과 기본값 `주문 없음`은 그대로입니다(DOTOLI-288).** 목록형의 빈 상태 모양만 회색 박스 가운데 정렬에서 품목명 자리의 한 줄로 바뀌었습니다. 글자는 품목명과 같아서 `ORDER_BOX_LIST_STYLES.ITEM_NAME`의 타이포 · 색을 그대로 씁니다. 품목명이 바뀌면 빈 상태도 따라갑니다. 상자형의 빈 상태는 335 이전과 같은 회색 상자 가운데 정렬입니다(DOTOLI-351). 소비 앱은 마감일(「주문이 마감된 날이에요」) · 휴일(「주문 없음」)을 `emptyLabel`로 넘깁니다.
- **마크업은 `<dl>`입니다.** 줄마다 `<div><dt>품목</dt><dd>수량</dd></div>`이고, 품목과 수량이 반복되는 라벨-값 쌍이라서입니다. [info.md](./info.md) 「InfoField」가 정리한 기준(`<dl>`은 묶음을 소유한 쪽이 둠)에 맞고, 여기서는 OrderBox가 묶음을 소유합니다. 빈 상태 한 줄은 `<dl>` 밖 단독 `<p>`입니다. `Typography`가 `dt` · `dd` · `p`를 `as`로 받습니다.
- **품목명은 줄을 바꾸고 수량은 바꾸지 않습니다.** 품목명에 `min-w-0`, 수량에 `shrink-0` `whitespace-nowrap`를 걸었습니다. 수량이 두 줄로 깨지면 「박스 · 개수」를 한눈에 읽을 수 없어서입니다.
- **`w-full`입니다.** 폭은 담는 카드가 정합니다.
- **`key`는 `itemName`입니다.** 한 날짜에 같은 품목이 두 줄로 나오는 것은 데이터 오류라 인덱스를 쓰지 않았습니다(종전과 같음).
- **카드(날짜 행 + 목록)는 DS가 만들지 않았습니다.** Q1은 날짜 행과 SKU 행을 테두리 있는 흰 카드 하나에 담는데, 소비 앱이 [OrderDateInfo](#orderdateinfo)와 OrderBox를 조립하는 지금 구조를 유지했습니다. 카드 컴포넌트는 이 티켓 범위를 넘습니다.

### API

| prop | 필수 | 기본값 | 비고 |
| --- | --- | --- | --- |
| `items` | ✅ | — | `OrderBoxItem[]`(`{ itemName, quantity, isNoOrder? }`). 빈 배열이면 `emptyLabel` 한 줄. `isNoOrder`는 `box`에서만 효과(`gray-400`) |
| `emptyLabel` | | `'주문 없음'` | 기본값은 `ORDER_BOX_EMPTY_LABEL` |
| `variant` | | `'list'` | `'list' \| 'box'`(`ORDER_BOX_VARIANTS`) |
| `className` | | — | 비어 있으면 `<p>`, 아니면 `<dl>`에 붙음 |

**DOTOLI-335는 파괴적 변경입니다.** 없어진 것은 `variant` · `ORDER_BOX_VARIANTS` · `ORDER_BOX_STYLES` · `OrderBoxVariant` · `OrderBoxVariantStyles` · `ORDER_BOX_ITEMS_STYLE` · `ORDER_BOX_EMPTY_STYLE`, `OrderBoxCell`과 그 상수 · 타입 전부(`ORDER_BOX_CELL_*` · `OrderBoxCellProps` · `OrderBoxCellTone` · `OrderBoxCellToneStyles`), `OrderBoxItem.boxes`입니다. 남은 공개 상수 중 `ORDER_BOX_BASE_STYLE`(grid → 세로 flex)과 `ORDER_BOX_EMPTY_LABEL_COLOR`(`gray-400` → `gray-900`)는 값이 바뀌었고, `ORDER_BOX_ROW_STYLE` · `ORDER_BOX_ITEM_NAME_STYLE` · `ORDER_BOX_QUANTITY_STYLE` · `ORDER_BOX_ITEM_NAME_COLOR` · `ORDER_BOX_QUANTITY_COLOR`와 `OrderBoxRowProps`가 새로 공개됐습니다. 두 상수를 소비 앱이 import하는 곳은 없습니다. 소비 앱에서 버전을 올리면 `OrderDayCard` · `FixedOrderDayItem`(`ORDER_BOX_VARIANTS` · `variant`)과 `getOrderBoxItems`(`boxes`)가 깨지고, 삭제 예정인 `OrderDelivery` · `OrderTodayUsage` · `OrderDeliveryUsageDayItem`은 BP-120 · 123이 먼저 지워야 합니다. 332~334는 이 변경 전에 따로 배포했습니다.

**DOTOLI-354는 공개 상수 · 타입을 바꿉니다.** 한 줄짜리 품목은 화면이 그대로이고, 줄바꿈이 생길 때 달라지는 점은 아래 [OrderInputCard](#orderinputcard) 「결정」에 있습니다. OrderBox에서 `ORDER_BOX_BASE_STYLE`(→ `ORDER_BOX_LIST_BASE_STYLE`) · `ORDER_BOX_ITEM_NAME_COLOR` · `ORDER_BOX_QUANTITY_COLOR` · `ORDER_BOX_EMPTY_LABEL_COLOR`(→ `ORDER_BOX_LIST_STYLES`)가 없어졌고, `OrderBoxTextStyle` · `OrderBoxListStyles` · `OrderBoxListProps`가 생겼고, `OrderBoxRowProps`에 `styles`가 붙었습니다. `OrderInputCard`에서는 `ORDER_INPUT_CARD_ITEM_STYLE` · `ORDER_INPUT_CARD_ITEM_STYLES` · `OrderInputCardItemStyles` · `OrderInputCardItemsProps`가 없어지고, `ORDER_INPUT_CARD_ITEMS_STYLES`가 생기고, `ORDER_INPUT_CARD_ITEMS_STYLE`은 패널 모양(`rounded-10 bg-blue-50 px-[16px] py-[14px]`)만 남았습니다. `OrderBoxItem.isNoOrder`는 선택값이라 소비 앱 `getOrderBoxItems`는 그대로 됩니다. 없어진 이름을 소비 앱이 import하는 곳은 0건입니다(origin/dev, 11/25).

**DOTOLI-351은 추가만 합니다.** `variant`(선택, 기본 `list`), `ORDER_BOX_VARIANTS` · `OrderBoxVariant` · `ORDER_BOX_VARIANT_STYLES` · `OrderBoxVariantStyles` · `ORDER_BOX_BOX_BASE_STYLE` · `ORDER_BOX_BOX_LIST_STYLES`가 생겼습니다. 이 중 `ORDER_BOX_VARIANTS` · `OrderBoxVariant` · `OrderBoxVariantStyles`는 DOTOLI-335에서 지운 이름을 다른 값으로 다시 쓰는 것입니다(옛 값 `noBg` · `default` · `past` · `inverse`, 지금 `list` · `box`). 335 이전 코드를 그대로 쓰는 소비 앱은 `.DEFAULT` · `.NO_BG` 키가 없어 타입 에러로 걸리므로 조용히 깨지지 않습니다. `ORDER_BOX_VARIANT_STYLES`는 새 이름입니다(옛 이름은 `ORDER_BOX_STYLES`).

### 디자인 확인 필요

| 항목 | 내용 |
| --- | --- |
| Figma 심볼 | 세로 목록 심볼은 `OrderBox`(`169:688`) 세트에 있지만 아티팩트 Q1과 규격이 다름. `noBg`는 16 · 500 / 16 · 700 `gray-800`, padding 16/14, 0인 줄 `gray-400`이고 목록형은 14px · padding 없음 · 0인 줄 색 없음. 어느 쪽이 최신인지 확인 필요(11/25). `box`는 같은 세트의 `default` · `empty`를 따름 |
| 수량 색 | `rgb(74,84,104)` → 가장 가까운 `gray-700`(`#4c566e`) |
| 수량 굵기 | 아티팩트 400 → `label` 500. 14px 타이포 토큰에 400이 없음 |
| 줄 사이 | 디자인에 값이 없어 2px |
| 일부 SKU만 0 | 디자인에 없음. 소비 앱이 수량 자리에 「주문 없음」을 넘김 |

### Storybook

`apps/storybook/src/stories/biz-ui/OrderBox.stories.tsx`, `meta.title`은 `core/biz-ui/Order/OrderBox`. 폭은 Q1 카드 안쪽과 같은 306px(화면 380 − 페이지 padding 40 − 카드 padding 32 − 테두리 2)입니다.

| 스토리 | 보는 것 |
| --- | --- |
| `Default` | 컨트롤 패널. SKU 3개 |
| `Empty` | 기본 문구 ↔ `emptyLabel` 지정 |
| `PartialZero` | 일부 SKU만 0. 수량 자리에 「주문 없음」 |
| `LongName` | 긴 품목명이 줄바꿈되고 수량은 한 줄로 남는 것 |
| `Box` | `variant="box"` 세 경우(품목 있음 · 0인 줄 회색 / 빈 상자 기본값 / 빈 상자 마감 문구). 폭은 Figma 심볼과 같은 338px |

### 이력

DOTOLI-335 전의 가로 3열 OrderBox · `OrderBoxCell` 결정입니다. 코드는 없어졌지만 다른 문서가 인용하는 것만 남깁니다. 상세는 git 이력(이 파일의 DOTOLI-334 시점)에 있습니다.

- **DOTOLI-229 · 230 (Figma 실측).** `OrderBoxCell`은 박스수 · 품목명 2행(`tone` 3종), OrderBox는 셀을 담는 컨테이너(`variant` `noBg` · `default` · `past`)였습니다. **biz-ui가 컴포넌트 안에서 `Typography`를 쓴 첫 사례**가 `OrderBoxCell`이고, 그 `inverse` tone 때문에 `COLOR_VARIANTS`에 `white`가 들어왔습니다(토큰이 아니라 variants 미러와 safelist에만). `white`는 지금도 `Badge` · `CalendarDayButton` 등이 써서 남아 있습니다.
- **DOTOLI-288.** 빈 상태 문구를 `emptyLabel`로 열었습니다. 지금도 그대로입니다.
- **DOTOLI-317.** `inverse`를 넷째 `variant`로 넣으면서 「빈 상태는 variant를 타지 않는다」를 뒤집었습니다. 그때 세운 기준이 **「디자인이 있는 조합만 값을 갖고 나머지는 기존 값을 그대로 쓴다」**입니다. `tone` 축을 따로 열면 디자인 없는 7조합을 구현이 지어내야 해서 기각한 것이고, 이 기준은 CtaButton `white` 테마([button.md](./button.md))가 인용합니다.
- **DOTOLI-319.** 셀의 `min-w` · `max-w`를 버리고 `grid-cols-3`으로 셀을 항상 1/3로 고정했습니다.

---

## OrderDateInfo

주문 목록의 날짜 행입니다. 왼쪽에 날짜, 오른쪽에 마감 문구 + 「주문 수정」 버튼이 오고, 마감이 지나면 오른쪽이 「주문마감」 배지로 바뀝니다(정책 「주문(new)」 1-9 · 2-3 「주문 목록」). DOTOLI-336에서 날짜 / 배송 정보 2행을 이 한 줄로 **교체**했고, 지난 결정은 아래 「이력」에 있습니다.

출처는 Figma가 아니라 주문 메인 개편 디자인 아티팩트(`claude.ai/artifact/BNjNgpDeuFY8x6EhkBtdUJ`)의 Q1(주문 관리 · 주문 목록)입니다(원칙은 문서 머리말). 소비처는 biz-customer-app BP-132(주문 관리 마감 표기)입니다.

### Variant 축

| 축 | 값 |
| --- | --- |
| `isDeadlinePassed` | boolean. 오른쪽을 마감 표기와 「주문마감」 배지 중 무엇으로 그릴지 |
| `isHoliday` | boolean. 날짜가 `red-600`이 되고 「· 휴일」이 붙음 |

| 상태 | 조건 | 오른쪽 |
| --- | --- | --- |
| 마감 전 | `isDeadlinePassed` 아님 | `deadlineLabel`(있으면) + `action` 버튼(있으면) |
| 마감 뒤 | `isDeadlinePassed` | 「주문마감」 배지만. `deadlineLabel` · `action`은 무시 |
| 날짜만 | 마감 전이고 `deadlineLabel` · `action`이 없음 | 없음 |

### 실측 스펙

| 요소 | 아티팩트 Q1 | 구현 |
| --- | --- | --- |
| 줄 | 양끝 정렬, gap 8, 최소 높이 32 | `flex-h-stack` `justify-between` `gap-[8px]` `min-h-[32px]` `w-full` |
| 날짜 | 17px · 700 · `rgb(26,34,51)` | Figma 값 `body-lg-semibold`(18 · 600) `gray-700`(DOTOLI-350) |
| 휴일 날짜 | `rgb(229,72,77)`, 꼬리말 없음 | Figma 값 `red-600` + 「· 휴일」(DOTOLI-350) |
| 마감 문구 | 13px · 600 · `rgb(105,115,140)` | `label-semibold`(14 · 600) `gray-600`(색이 같음) |
| 버튼 | 높이 32, padding 0 12, radius 8, `gray-100` 바탕, `gray-800` 14 · 700 | `CtaButton` `tonal` · `gray` · `sm`(radius 6만 다름) |
| 마감 뒤 | 높이 26 알약, padding 0 9, `gray-100` 바탕, `gray-600` 13 · 600 | `Badge` `tonal` · `gray`(아래 「디자인 확인 필요」) |

### 결정

- **배송 정보를 마감 표기로 바꿨습니다.** 정책 1-9가 사용자 앱의 날짜를 사용일 하나로 표기하고 배송일 · 배송 상태를 빼기로 해서, `deliveryInfo`와 「배송없음」이 없어졌습니다.
- **한 줄 구조이고 버튼 자리를 DS가 갖습니다(11/13 확인).** 아티팩트에서 마감 문구가 버튼 바로 옆에 붙어 있어, 두 줄 구조(날짜 아래 마감 문구, 버튼은 소비 앱이 행 오른쪽에)로는 배치가 맞지 않았습니다. 소비 앱의 `OrderDayCard`가 직접 그리던 버튼 · 「배송 준비중」 라벨이 이 컴포넌트로 들어옵니다.
- **버튼은 `action`(`label` · `onClick`)만 받고 모양은 DS가 정합니다.** `Toast`의 `action`(`ToastAction`)과 `ConfirmModal`의 `confirm` · `cancel`이 같은 형태입니다. `CtaButton` `tonal` · `gray` · `sm`이 아티팩트 버튼과 값이 그대로 맞습니다. 아무 노드나 받는 슬롯(`ReactNode`)으로 열면 버튼 모양을 소비 앱이 정하게 되고, biz-ui의 `ReactNode` prop(`Toast` `message` · `NotificationCard` `title`)은 문장 강조용이라 버튼 슬롯 선례도 아닙니다.
- **마감 여부는 `isDeadlinePassed`입니다.** 이름 근거는 아래 「OrderWeekStatus」 제거 기록의 상태 이름 `deadlinePassed`입니다. 이것만 boolean prop인 이유는 값 유무로 파생하면 「날짜만」(마감 전인데 문구 · 버튼이 없음)과 구분되지 않아서입니다. 마감 뒤에 같이 넘어온 `deadlineLabel` · `action`을 무시하는 것은 `Toast`의 `status='loading'` + `action`과 같은 처리입니다([toast.md](./toast.md)).
- **「주문마감」 문구는 `Order/shared`의 `ORDER_DEADLINE_PASSED_LABEL`입니다.** 함께 쓰는 곳과 근거는 위 「계열 공통 결정」에 있습니다. 소비 앱이 마감 뒤에 그리던 「배송 준비중」 자리를 이 배지가 대신합니다. 마감이 지났지만 배송 전인 날(`requiresUrgentOrder`)을 어떻게 넘길지는 BP-132에서 정합니다.
- **마감 문구는 소비 앱이 조립합니다.** 「목 18시 마감」(정책 2-3)과 「오늘 18시 마감」(아티팩트 Q1의 상대 표현) 중 무엇을 쓸지는 소비 앱 결정으로 넘겼고(11/13), DS는 완성된 문자열을 받습니다.
- **날짜 글자는 아티팩트가 아니라 Figma를 따릅니다(DOTOLI-350, 11/25 사용자 결정).** DS Figma 세트 `203:872`, 11/23 시안 파일 `1XFNe18voQAN71SyqCl4qV`의 기존 시안(① `241:23200` · `241:23218`)과 신규 시안(② W8 `241:22526` · `241:22551`)이 모두 평일 `body-lg-semibold`(18 · 600) `gray-700`, 휴일 `red-600` + 「· 휴일」로 같았습니다. 336에서 아티팩트를 따라 바꿨던 세 가지(평일 `heading-5` `gray-900`, 휴일 `red-400`, 꼬리말 없음)를 이 값으로 되돌렸습니다. 날짜 행 오른쪽(마감 문구 · 버튼 · 배지)은 아티팩트 그대로입니다.
- **휴일 빨강은 `red-600`입니다.** 18px 600은 큰 글씨 기준(18.66px 굵게)에 들지 않아 흰 바탕 대비 4.5:1이 필요합니다. 336의 `red-400`(3.41:1)과 아티팩트 원색(3.91:1)은 못 미쳤고, `red-600`은 6.15:1입니다.
- **「· 휴일」은 DS가 붙입니다.** `generateOrderDateInfoDateLabel`이 `isHoliday`일 때 `Order/shared`의 `ORDER_HOLIDAY_SUFFIX`를 붙이고, 소비 앱은 `dateLabel`에 날짜만 넘깁니다. 정책 1-6의 「N일 · 휴일」과도 맞습니다. 기존 시안의 「· 공휴일」은 옛 표기라 따르지 않았습니다. `OrderInputCard`와 달리 `dateLabel`이 필수라 날짜 없이 「휴일」만 그리는 분기는 없습니다.
- **`ORDER_DATE_INFO_STYLES`의 `DATE` · `HOLIDAY_DATE` 키는 남겼습니다.** 소비 앱 `FixedOrderDayItem`(BP-133까지)이 날짜 색을 빌려 씁니다. 336에서 진해졌던 그 화면 날짜는 350에서 원래 색(`gray-700` · `red-600`)으로 돌아갑니다.
- **날짜가 길면 줄을 바꾸고 오른쪽은 줄어들지 않습니다.** 날짜에 `min-w-0`, 오른쪽 묶음에 `shrink-0`을 걸었습니다. 배지도 이 묶음 안에 들어가 따로 클래스를 넘기지 않습니다.
- **버튼 · 배지 모양은 상수 객체로 묶지 않고 JSX에 바로 넘깁니다.** `OrderInputCard`(`CTA_BUTTON_SIZES.SM` · `BADGE_THEMES.RED`)와 같은 방식입니다. biz-ui에서 단수 `_STYLE`은 className 문자열이라, props 묶음 객체에 그 이름을 붙이지 않습니다.
- **「주문 수정」 버튼 이름이 날짜마다 같습니다.** 스크린 리더로는 어느 날짜의 버튼인지 이름만으로 구분되지 않고, `action`에 `aria-label` 통로도 없습니다. `OrderInputCard`도 같은 상태라 고친다면 계열 전체를 함께 봅니다.
- **배지는 기존 `Badge`를 그대로 씁니다(11/16).** 모양은 DS Figma Badge 세트를 따릅니다.

### API

| prop | 필수 | 기본값 | 비고 |
| --- | --- | --- | --- |
| `dateLabel` | ✅ | — | `12일(목)`. 소비 앱이 포맷 |
| `isHoliday` | | `false` | 날짜를 `red-600`으로 그리고 「· 휴일」을 붙임 |
| `deadlineLabel` | | — | `목 18시 마감` · `오늘 18시 마감`. 소비 앱이 조립 |
| `action` | | — | `OrderDateInfoAction`(`{ label, onClick }`). `CtaButton` tonal · gray · sm |
| `isDeadlinePassed` | | `false` | 「주문마감」 배지만 그림 |
| `className` | | — | |

**DOTOLI-336은 파괴적 변경입니다.** 없어진 것은 `deliveryInfo` · `ORDER_DATE_INFO_NO_DELIVERY_LABEL` · `ORDER_DATE_INFO_STYLES`의 `DELIVERY` · `NO_DELIVERY` 키입니다. `ORDER_DATE_INFO_BASE_STYLE`과 `ORDER_DATE_INFO_STYLES`의 `DATE` · `HOLIDAY_DATE` 값이 바뀌었습니다. 새로 공개된 것은 `ORDER_DATE_INFO_DATE_STYLE` · `ORDER_DATE_INFO_TRAILING_STYLE`, `ORDER_DATE_INFO_STYLES`의 `DEADLINE` 키, `OrderDateInfoAction` 타입, `Order/shared`의 `ORDER_DEADLINE_PASSED_LABEL`입니다. 소비 앱에서 버전을 올리면 `OrderDayCard`(`deliveryInfo`)가 깨지고, 오른쪽에 직접 그리던 버튼 · 라벨을 `action` · `isDeadlinePassed`로 옮겨야 합니다(BP-132). 날짜 색을 빌려 쓰는 `FixedOrderDayItem` · `OrderDeliveryUsageDayItem`은 깨지지 않고 색만 바뀝니다.

**DOTOLI-350은 API를 바꾸지 않는 시각 변경입니다.** 날짜가 연해지고(700 `gray-900` → 600 `gray-700`), 휴일은 `red-600`에 「· 휴일」이 붙습니다. 소비 앱이 `dateLabel`에 「휴일」을 직접 붙이고 있다면 두 번 나오므로 빼야 합니다. `ORDER_DATE_INFO_STYLES`의 `DATE` · `HOLIDAY_DATE` 값도 바뀌었습니다.

### 디자인 확인 필요

| 항목 | 내용 |
| --- | --- |
| Figma 심볼 | 한 줄 심볼이 없음. 기존 세트 `203:872`는 두 줄(배송 정보) 모양 |
| 날짜 글자 | 아티팩트(17 · 700 · `rgb(26,34,51)`, 휴일 `rgb(229,72,77)` · 꼬리말 없음)와 다름. DOTOLI-350에서 Figma 세 곳(DS · 기존 시안 · 신규 시안)을 따름 |
| 배지 색 · 여백 | 같은 「주문마감」을 `OrderInputCard`는 red tonal, 여기는 gray tonal로 그림(정책 2-3은 문구 통일만 말함). 좌우 여백 아티팩트 9 → `Badge` 8 |
| 버튼 모서리 | 아티팩트 8 → `CtaButton` `sm` 6 |
| 글자 크기 | 마감 문구 13 → 14(토큰 없음) |

### Storybook

`apps/storybook/src/stories/biz-ui/OrderDateInfo.stories.tsx`, `meta.title`은 `core/biz-ui/Order/OrderDateInfo`. 한 줄 스토리의 폭은 Q1 카드 안쪽과 같은 306px입니다. `InCard`의 카드는 테두리를 `inset-ring`으로 그려(CLAUDE.md 「스타일 규칙」) 테두리가 자리를 차지하지 않으므로 안쪽이 308px로, 아티팩트(CSS `border` 1px)보다 2px 넓습니다.

| 스토리 | 보는 것 |
| --- | --- |
| `Default` | 컨트롤 패널. 오늘 마감 + 버튼 |
| `States` | 마감 전 · 오늘 마감 · 주문마감 · 휴일 · 날짜만 · 긴 날짜(줄바꿈) |
| `InCard` | Q1처럼 흰 카드 안에 OrderDateInfo + [OrderBox](#orderbox)를 함께 놓은 조립. 카드는 스토리가 그리고, 소비 앱 `OrderDayCard`가 할 일을 미리 보여 줌 |

### 이력 (두 줄 시절)

DOTOLI-336 전의 두 줄 OrderDateInfo 결정입니다. 다른 문서가 인용하는 것만 남깁니다. 상세는 git 이력(이 파일의 DOTOLI-335 시점)에 있습니다.

- **DOTOLI-231 (Figma 실측, `203:872`).** 1행 날짜(`body-lg-semibold` `gray-700`, 휴일 `red-600` + 「· 휴일」), 2행 배송 정보(`body` `blue-400`, 없으면 「배송없음」 `gray-400`), 행 간격 `-mb-0.5`였습니다. **`hasDelivery`를 prop으로 열지 않고 `deliveryInfo` 유무로 파생**시킨 것이 계열의 「값 유무로 상태 파생」 선례로 여러 문서에 인용됩니다. 「· 휴일」 접미어를 DS가 붙인 것이 `Order/shared`를 연 근거 중 하나였습니다.

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

Figma: 컴포넌트 세트 `309:1965`. 심볼 10개가 있고 이름은 `orderStatus, isHoliday, date` 조합입니다.

날짜 · 상태를 왼쪽에, 액션을 오른쪽에 두는 카드입니다. `completed`만 아래에 주문내역 패널이 붙습니다. **Order 계열에서 가장 크고, `Badge`(DOTOLI-228) · `CtaButton`(DOTOLI-219)을 물어 씁니다.**

### Variant 축

| 축            | 값                                                        |
| ------------- | ---------------------------------------------------------- |
| `orderStatus` | `inputRequired` · `completed` · `noOrder` · `inputClosed`  |
| `isHoliday`   | boolean                                                    |
| 날짜 노출     | `dateLabel` 유무 (Figma `date` = `none` · `visible`)       |

**4×2×2 = 16 중 심볼은 10개뿐이라 축을 독립으로 구현했습니다.** 그려지지 않은 6조합(`noOrder`+평일 2 · `completed`+휴일 2 · `inputClosed`+날짜없음 2)도 자동으로 나옵니다.

| 축            | 담당하는 것                                    |
| ------------- | ------------------------------------------------ |
| `orderStatus` | 카드 배경 · 테두리 · 요일 뱃지 · 날짜 색 · 액션 |
| `isHoliday`   | 날짜 `· 휴일` 접미어 · `inputRequired` 뱃지 색  |
| `dateLabel`   | 날짜 문구 노출                                  |
| `statusLabel` | 날짜 아래 줄 문구 (DOTOLI-346)                  |
| `badgeLabel` · `badgeTheme` | `inputClosed` 배지 문구 · 색 (DOTOLI-346) |

### 실측 스펙

| 항목        | 값                                                    |
| ----------- | ------------------------------------------------------ |
| 카드        | `rounded-16` · `px-[20px] py-[14px]` · `inset-ring` 1px |
| 헤더 행     | `flex-h-stack items-center` · gap 5px                  |
| 요약 블록   | `flex-1 min-w-0 items-center` · gap 8px                |
| 요일 뱃지   | `size-[40px] rounded-full` · `body-bold`               |
| 날짜        | `body-semibold`                                        |
| 상태 문구   | `label` · `gray/400` 고정                              |
| 주문내역 패널 | `rounded-10` · `bg-blue-50` · `px-[16px] py-[14px]` · 카드와 gap 10px |
| 패널 행     | [OrderBoxList](#orderbox) · 품목명 `body` / 수량 `body-bold` · 행 간 gap 2px · `items-start` |

| `orderStatus`   | 카드 배경 · 테두리     | 요일 뱃지            | 날짜 색    | 액션                          |
| --------------- | ---------------------- | -------------------- | ---------- | ----------------------------- |
| `inputRequired` | `white` · `gray/100`   | `gray/50` + `gray/700` | `gray/800` | `CtaButton` primary/filled/sm — 주문입력 |
| `completed`     | `white` · `blue/300`   | `blue/50` + `blue/500` | `gray/800` | `CtaButton` primary/outlined/sm — 주문수정 |
| `noOrder`       | `gray/50` · `gray/100` | `gray/300` + `gray/50` | `gray/400` | `CtaButton` gray/outlined/sm — 주문수정 |
| `inputClosed`   | `gray/50` · `gray/100` | `gray/300` + `gray/50` | `gray/400` | `Badge` tonal — 기본 red 「주문마감」, `badgeTheme='gray'`면 gray |

`inputRequired` + 휴일일 때만 요일 뱃지가 `red/50` + `red/400`으로 바뀝니다. 패널 품목 색은 주문한 행 `gray/800`, `주문없음` 행 `blue/200`입니다.

**`CtaButton` · `Badge` 기구현이 hex까지 그대로 맞아 신규 스타일이 없습니다.**

### 결정

- **축을 독립으로 구현하고 요일 뱃지만 2축 매퍼를 씁니다.** 한 Record에 10조합을 나열하면 결손 6조합이 구멍이 됩니다. `resolveOrderInputCardDayStyle`이 `inputRequired` + 휴일일 때만 빨강을 돌려주고 나머지는 `orderStatus` 맵을 그대로 씁니다.
- **심볼에 없는 6조합은 축 조합으로 자동 처리됩니다.** `noOrder` + 평일은 `noOrder` 스타일에 평일 요일만 들어가면 되고, 나머지 넷(`completed` + 휴일 2 · `inputClosed` + 날짜없음 2)은 **실제로 발생하지 않는 조합임을 확인했습니다.** 축을 나눠 둔 덕에 별도 케이스를 만들지 않아도 렌더는 됩니다.
- **비활성 카드(`noOrder` · `inputClosed`)에서는 휴일이 뱃지 색에 반영되지 않습니다.** 이미 회색으로 죽은 카드에 빨강을 얹지 않는다는 뜻이고, 디자이너에게 확인받은 동작입니다. 날짜의 `· 휴일` 접미어는 그대로 붙습니다.
- **Figma `date` 축을 `dateLabel` 유무로 파생시켰습니다.** 계열 전체(`OrderBox`의 `items`, `OrderDateInfo`의 `deadlineLabel` · `action`(DOTOLI-336 전에는 `deliveryInfo`), `QuantityStepper`의 `errorMessage`)와 같은 판단입니다. **날짜가 없고 휴일이면 `휴일`만** 뜹니다 — `generateOrderInputCardDateLabel`이 세 경우를 다룹니다.
- **주문내역 패널은 `completed` 전용입니다.** `items`를 넘겨도 다른 `orderStatus`에서는 그리지 않습니다. 처음엔 `items` 유무만 봤다가 전 status에 패널이 붙는 것을 Storybook에서 발견해 status 조건을 되살렸습니다.
- **`inputClosed`만 버튼이 아니라 `Badge`입니다.** `ORDER_INPUT_CARD_BUTTON_STYLES`에 `inputClosed` 항목을 두지 않고, 항목이 없으면 `Badge`를 그리는 것으로 분기합니다 — 없는 값을 `null`로 채워 넣는 것보다 「이 상태엔 버튼이 없다」가 그대로 드러납니다. 정책 카드 [COM-017](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=524-14&m=dev) (`524:14`)의 「주문입력 · 주문수정 버튼 모두 미노출, 탭 액션 없음」과 맞습니다 — 그 자리가 뱃지라 눌리는 대상 자체가 없습니다. COM-017의 나머지 두 항목(「일괄 적용 날짜 칩 비활성」 · 「완료 판정 시 입력 대상 제외」)은 각각 다른 컴포넌트와 화면 로직이라 이 컴포넌트 밖입니다.
- **`orderStatus` 4종을 데이터에서 파생시키지 않고 그대로 받습니다.** COM-017이 `inputRequired`=미주문(주문 자체가 생성되지 않음) · `noOrder`=주문 수량 0(사용자가 주문없음 선택) · `completed`=수량 1 이상 · `inputClosed`=마감 경과로 정의하고, **「미주문과 주문 수량 0은 서로 다른 상태이며 서버에서도 구분되어야 한다」**고 못박았습니다. 수량만으로는 앞의 두 상태를 가를 수 없으므로 union 4종을 유지합니다.
- **액션 라벨은 DS가 고정하고, 날짜 아래 줄은 소비 앱이 덮어쓸 수 있습니다(DOTOLI-346).** 버튼 `주문 입력` · `주문 수정`은 주문 입력 카드라 이 둘로 고정입니다. 날짜 아래 줄은 기본값이 `입력 필요` · `주문 없음`이고, 11/23 주간주문 시안(`241-22108`)이 이 자리에 「목 18시 마감 · 입력 필요」 · 「주문이 마감된 날이에요」 같은 마감 문구를 넣어 `statusLabel`로 열었습니다. 마감 요일 · 시각은 서버 값이라 DS가 조립하지 않습니다. 넘기면 상태와 상관없이 그 문자열을 그리고, 기본값이 없는 상태(`completed` · `inputClosed`)는 넘기지 않으면 줄이 없습니다. 빈 문자열을 넘기면 기본값까지 끄고 줄을 그리지 않습니다.
- **`inputClosed`의 기본 보조줄 「주문마감」을 없앴습니다(DOTOLI-346).** 같은 시안의 사유 카드(주문중지 · 이용 전 · 서비스 해지)는 보조줄이 없는데 기본값이 있으면 소비 앱이 끌 방법이 없고, 배지와 같은 말이 두 번 나오던 것도 시안에서 사라졌습니다. 당시 소비 앱 사용처는 0건이었습니다.
- **입력 불가 사유는 배지 문구 · 색으로 받습니다(DOTOLI-346).** 시안이 사유 카드를 `inputClosed`와 같은 회색 카드로 그리고 배지만 바꿔서, `orderStatus`를 늘리지 않고 `badgeLabel`(기본 `주문마감`) · `badgeTheme`(`red` 기본 · `gray`)을 열었습니다. `badgeTheme`은 `BADGE_THEMES` 전체가 아니라 시안에 있는 두 색만 `ORDER_INPUT_CARD_BADGE_THEMES`로 좁혔습니다. 사유 문구는 정책이 늘릴 수 있어 union으로 묶지 않고 문자열로 받습니다. 다른 상태에서는 버튼을 그리므로 두 prop을 쓰지 않습니다.
- **기본 문구를 띄어 씁니다(DOTOLI-346).** 시안과 소비 앱 plan이 「주문 입력」 · 「주문 수정」 · 「입력 필요」 · 「주문 없음」으로 띄어 써서 맞췄습니다. 배지 「주문마감」은 시안대로 붙여 씁니다.
- **수량은 `quantity: number`이고 키를 생략할 수 없습니다.** `1` 이상이면 `{n}개` + `gray/800`, `0`이면 `주문 없음` + `blue/200`입니다. `{n}개` 조립은 `QuantityStepper`의 `unitsPerBox`와 같은 기준 — 단위 `개`가 심볼 전체에서 고정입니다.
- **표기는 `quantityLabel`로 덮어쓸 수 있습니다(DOTOLI-346).** 11/23 시안이 「4박스 (80개)」로 박스 · 개수 두 단위를 써서, `OrderBox`처럼 소비 앱이 조립한 문자열을 받습니다. `quantity`는 그대로 필수라 `0` 판정(「주문 없음」 · 연한 색)은 DS가 계속 맡고, `quantityLabel`은 `1` 이상일 때만 씁니다.
- **품목 수량에는 「미주문」이 없습니다.** 처음엔 `quantity?: number`로 뒀다가 키 생략과 `0`이 타입상 구분되지 않아 required로 바꿨고, 이어서 COM-017의 미주문/수량 0 구분을 따라 `number | null`까지 갔다가 되돌렸습니다. **COM-017의 그 구분은 `orderStatus` 대응표, 즉 카드 레벨**이고 이미 `inputRequired`/`noOrder`로 갈라져 있습니다. 이 패널은 완료된 주문의 결과만 보여주고 입력 단계에서 부분 미발주를 막으므로 품목은 `0` 아니면 `1` 이상뿐입니다 — 도달할 수 없는 `null`을 타입에 남기지 않습니다.
- **주문내역 패널은 OrderBox의 `OrderBoxList`를 씁니다(DOTOLI-354).** 예전 `OrderInputCardItems`를 지웠습니다. 패널 모양(`ORDER_INPUT_CARD_ITEMS_STYLE`)과 글자 묶음(`ORDER_INPUT_CARD_ITEMS_STYLES`)만 이쪽에 있고, `items`는 `generateOrderInputCardItems`가 `OrderBoxItem`으로 바꿔 넘깁니다. 바뀐 것은 둘입니다. 마크업이 `div`에서 `dl` · `dt` · `dd`가 됐고, 줄 정렬이 `items-center`에서 `items-start`가 됐습니다(품목명 `min-w-0`, 수량 `nowrap`). 한 줄짜리 품목은 똑같이 보이고, 품목명이 두 줄로 넘어갈 때만 수량이 위로 붙습니다.
- **`· 휴일` 접미어를 `Order/shared/`로 옮겼습니다.** `OrderDateInfo`와 같은 문자열을 쓰는 첫 사례라 계열 「공통 결정」의 조건이 충족됐습니다. 날짜가 없을 때 쓰는 `ORDER_HOLIDAY_LABEL`(`휴일`)과 접미어 형태 `ORDER_HOLIDAY_SUFFIX`(`· 휴일`)를 함께 둡니다.
- **카드가 심볼보다 2px 낮습니다** (71 vs 73). 테두리를 `inset-ring`으로 그려 레이아웃을 차지하지 않기 때문이고, `QuantityStepper` 값 박스와 같은 이유입니다.
- **루트에 폭을 선언하지 않습니다.** 심볼 340px은 문서 값이고 실제로는 fill입니다.

### API

| prop          | 필수 | 기본값  | 비고                                              |
| ------------- | ---- | ------- | ------------------------------------------------- |
| `orderStatus` | ✅   | —       | 4종                                               |
| `dayLabel`    | ✅   | —       | 요일 한 글자. `월` · `일`                         |
| `dateLabel`   |      | —       | `29일`. 없으면 날짜 줄을 그리지 않음              |
| `isHoliday`   |      | `false` | `· 휴일` 접미어 + `inputRequired` 뱃지 색         |
| `statusLabel` |      | 상태별  | 날짜 아래 줄. 기본 `inputRequired` `입력 필요` · `noOrder` `주문 없음` |
| `badgeLabel`  |      | `주문마감` | `inputClosed` 배지 문구                        |
| `badgeTheme`  |      | `red`   | `inputClosed` 배지 색. `red` · `gray`             |
| `items`       |      | —       | `completed` 전용 주문내역. `quantity`가 `0`이면 `주문 없음`, `quantityLabel`이 있으면 그 문자열 |
| `onAction`    |      | —       | 주문입력 · 주문수정 클릭. `inputClosed`는 버튼이 없어 호출되지 않음 |
| `className`   |      | —       | 담는 쪽의 폭 지정용                               |

### Storybook

### 디자인 확인 필요

| 항목 | 내용 |
| --- | --- |
| 마감 보조줄 굵기 | 11/23 시안에서 「주문이 마감된 날이에요」만 `label-bold`, 나머지 보조줄은 `label`. 문구를 소비 앱이 넘기므로 `label` 하나로 통일함 (DOTOLI-346) |
| 카드 탭 | 시안 인스턴스는 카드 전체가 `<a>` · `<button>`이지만 DS는 버튼만 눌림. 바꾸면 버튼과 카드가 중첩 인터랙티브가 되어 함께 정해야 함 |

### Storybook

`apps/storybook/src/stories/biz-ui/OrderInputCard.stories.tsx`, `meta.title`은 `core/biz-ui/Order/OrderInputCard`. 스토리 4종 (`Default` · `Matrix` · `StatusLabel` · `ClosedBadge`). `StatusLabel`은 마감 보조줄, `ClosedBadge`는 마감 지남 · 사유 배지 카드를 시안 순서대로 깝니다. `Matrix`는 `orderStatus` 4 × 휴일 2 × 날짜 유무 2 = **16조합을 전부 깔아** Figma에 없는 6조합까지 눈으로 확인합니다.

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
