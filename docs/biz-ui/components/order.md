# Order 계열 구현 기록

`apps/biz-ui/src/components/Order` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 Order 계열 고유 사실만 둡니다.

Figma: [Order 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=203-847&m=dev) (`203:847`). 섹션 안의 `302:1434`(OrderBoxCell) · `302:1451`(OrderBox) · `302:1631`(OrderDateInfo) · `302:1573`(QuantityStepper) · `302:1204`(OrderInputCard)는 전부 문서용 프레임이고, 실제 값은 각 컴포넌트 세트에서 실측합니다.

## 구현 현황

| 컴포넌트          | 티켓       | 설명                                                        |
| ----------------- | ---------- | ----------------------------------------------------------- |
| `OrderBoxCell`    | DOTOLI-229 | `tone` 3종. 박스수 + 품목명 2행                             |
| `OrderBox`        | DOTOLI-230 | `variant` 3종. `OrderBoxCell`을 담는 wrap 컨테이너          |
| `OrderDateInfo`   | DOTOLI-231 | 날짜 + 배송정보 2행. `isHoliday` · 배송 유무 2축            |
| `QuantityStepper` | DOTOLI-232 | 상품 + 수량 증감 + 총계. Order 계열 첫 상호작용 컴포넌트    |
| `OrderInputCard`  | DOTOLI-233 | `orderStatus` 4종 × 휴일 × 날짜 유무. 계열에서 가장 큼      |

## 계열 공통 결정

- **`shared/`에는 휴일 문구만 있습니다.** 착수 시점에는 열지 않았습니다 — OrderBox가 `OrderBoxCell`을 **인스턴스로** 쓰는 관계라 공통 조각이 아니라 조합이었고, 나머지도 겹치는 것이 없었습니다. DOTOLI-233에서 `OrderDateInfo`와 `OrderInputCard`가 **둘 다 `· 휴일`을 붙이는 것**이 확인돼 그때 열었습니다(`ORDER_HOLIDAY_LABEL` · `ORDER_HOLIDAY_SUFFIX`). 디자이너가 이 표기를 바꾸면 두 컴포넌트가 같이 움직여야 하므로 실제 결합입니다 (CLAUDE.md [코드 규칙] 1).

---

## OrderBoxCell

Figma: 컴포넌트 세트 `169:530`. 심볼은 `169:529`(default) · `169:618`(inverse) · `179:640`(muted)입니다.

### Variant 축

| 축     | 값                              |
| ------ | ------------------------------- |
| `tone` | `default` · `inverse` · `muted` |

상태 축(hover · pressed · disabled)이 없습니다. 표시 전용이라 `<div>` + `<span>` 2개로 렌더합니다.

### 실측 스펙

| 항목       | 값                              |
| ---------- | ------------------------------- |
| 폭         | `min-w-[92px] max-w-[110px]`    |
| 레이아웃   | `flex-v-stack`                  |
| 1행 박스수 | `body-semibold` (SemiBold 16px) |
| 2행 품목명 | `label` (Medium 14px)           |
| 행 간격    | `-mb-0.5` (= -2px)              |

| `tone`    | 박스수       | 품목명       |
| --------- | ------------ | ------------ |
| `default` | `gray/900`   | `gray/600`   |
| `inverse` | `base/white` | `base/white` |
| `muted`   | `gray/600`   | `gray/400`   |

바인딩된 변수 hex가 기존 컬러 토큰과 전부 일치해 신규 토큰이 없습니다 (`gray/900` `#1a2233` · `gray/600` `#69738c` · `gray/400` `#aeb5c6`).

### 결정

- **행 간격이 음수인 것은 Figma 실측 그대로입니다.** 심볼 `169:529`에서 1행이 `y=0 h=23`, 2행이 `y=21`로 2px 겹칩니다. `body-semibold`(16px × lh 1.45 = 23.2px)와 `label`의 line-height 여백이 겹쳐 보이는 것을 디자이너가 -2px로 당겨 둔 값이고, 합계가 심볼 높이 61px과 맞습니다(23 + 40 - 2).
- **`min-w`·`max-w`를 컴포넌트가 들고 갑니다.** Figma에서 두 값이 인스턴스가 아니라 컴포넌트에 걸려 있습니다. 폭을 늘리는 쪽(OrderBox)은 `flex-1`만 더하면 됩니다.
- **`inverse`는 배경을 그리지 않고 글자색만 바꿉니다.** 어두운 배경은 이 셀을 담는 쪽의 몫입니다 — 셀이 자기 배경을 칠하면 담는 쪽 배경과 이중으로 겹칩니다.
- **두 행을 `Typography`로 그립니다.** internal-ui가 콘텐츠 텍스트에 일관되게 쓰는 방식입니다 — 인터랙티브 컨트롤 라벨(`Chip`·`Filter`·`Tab`)만 raw 텍스트이고, 표시 텍스트(`Alert`·`Toast`·`FileInfo`·`BadgeLabel` 등)는 `Typography`를 거칩니다. OrderBoxCell은 후자라 `variant`(`body-semibold`·`label`)와 `color`를 prop으로 넘기고, `ORDER_BOX_CELL_STYLES`는 클래스 문자열이 아니라 `ColorVariants` 값을 담습니다. **biz-ui가 컴포넌트 안에서 `Typography`를 쓴 첫 사례입니다** — 그전까지 만든 것이 전부 버튼 계열(컨트롤 라벨)과 인풋(네이티브 `<input>`이라 감쌀 수 없음)이었습니다.
- **`inverse` 때문에 `COLOR_VARIANTS`에 `white`를 추가했습니다.** `Typography`의 `color`는 `ColorVariants`만 받는데 biz-ui엔 `white` 항목이 없었습니다(internal-ui엔 있습니다). 토큰(`--color-white`)을 새로 만든 것이 아니라 **variants 미러와 safelist에만 추가**한 것이라 「`base/white`는 Tailwind 기본을 쓴다」는 기존 결정과 충돌하지 않습니다 — [button.md](./button.md) 「계열 공통 결정」.
- **`tone` 값은 `Order/OrderBoxCell/` 아래 정의합니다.** CtaButton `theme`(`primary`·`gray`) · IconButton `theme`(`default`·`filled`·`dark`)과 값이 겹치지 않습니다 (CLAUDE.md [컴포넌트 API]).
- **라벨 문자열은 소비처가 조립합니다.** `4박스` · `4찬식판 A형 (20개)`의 단위·괄호 포맷이 도메인 규칙이라 DS가 만들지 않고 `boxes` · `itemName`을 문자열로 받아 그리기만 합니다. prop 이름은 Figma 레이어명을 따랐습니다.
- **높이를 고정하지 않습니다.** 두 행 모두 `w-full`이라 폭이 좁으면 품목명이 줄바꿈됩니다. 문서 프레임(92px)에서도 실제로 2줄로 접힙니다.
- **컴포넌트명은 `OrderBoxCell`입니다.** Figma 레이어명이 `OrderBoxSell`(Cell 오타)인데 Filter의 `Fillter`와 같은 처리로 바로잡았습니다.

### API

| prop        | 필수 | 기본값    | 비고                          |
| ----------- | ---- | --------- | ----------------------------- |
| `boxes`     | ✅   | —         | 1행. `4박스`                  |
| `itemName`  | ✅   | —         | 2행. `4찬식판 A형 (20개)`     |
| `tone`      |      | `default` | 3종                           |
| `className` |      | —         | 담는 쪽의 폭·정렬 보정용      |

### Storybook

`apps/storybook/src/stories/biz-ui/OrderBoxCell.stories.tsx`, `meta.title`은 `core/biz-ui/Order/OrderBoxCell`. 스토리 2종 (`Default` · `Tones`). `inverse`는 `bg-gray-900` 데코레이터를 깔고 봅니다 — `Default`에서 컨트롤로 `inverse`를 골라도 배경이 따라붙습니다.

---

## OrderBox

Figma: 컴포넌트 세트 `169:688`. 심볼은 `169:686`(noBg) · `169:687`(default) · `179:577`(empty) · `179:624`(past)입니다.

`OrderBoxCell`을 인스턴스로 담는 wrap 컨테이너입니다. 상태 축이 없어 `<div>`로 렌더합니다.

### Variant 축

| 축        | 값                              |
| --------- | ------------------------------- |
| `variant` | `noBg` · `default` · `past`     |

Figma에는 `empty`가 네 번째 심볼로 있지만 **prop이 아니라 `items` 유무로 파생시켰고, `variant`를 타지 않습니다** (아래 「결정」).

**심볼명이 `rest`인데 `past`로 바꿔 달라고 디자이너에게 요청해 둔 상태입니다.** 문서 프레임 라벨(`past`)이 맞고 구현도 `past`입니다. Figma 반영 전까지 심볼 `179:624`는 `variant=rest`로 보입니다.

### 실측 스펙

| `variant` | 배경         | 테두리         | radius       | Cell `tone` |
| --------- | ------------ | -------------- | ------------ | ----------- |
| `noBg`    | 없음         | 없음           | 없음         | `default`   |
| `default` | `base/white` | `gray/100` 1px | `rounded-16` | `default`   |
| `past`    | `gray/100`   | `gray/100` 1px | `rounded-16` | `muted`     |

빈 상태는 `variant`와 무관하게 하나입니다 — `gray/100` 배경 · `rounded-16` · `items-center justify-center`, 문구는 `주문 없음`(`label` · `gray/400`).

| 항목      | 값                                                       |
| --------- | -------------------------------------------------------- |
| 레이아웃  | `flex flex-wrap` · gap 12px · `content-start items-start` |
| padding   | `px-[16px] py-[14px]` — `variant` 공통 (아래 「결정」)   |
| 폭        | 문서 프레임 338px. 실제로는 fill                         |
| Cell 배치 | `flex-1` (폭 제약은 `OrderBoxCell`이 들고 있음)          |

338px에서 3열(셀 폭 94)로 떨어지고 네 번째부터 줄바꿈됩니다.

### 결정

- **`empty`를 `variant`에서 빼고 `items` 유무로 파생시켰습니다.** Figma가 `empty`를 같은 박스에 문구만 바꿔 그린 것이라 축이 아니라 상태이고, 이 레포는 CtaButton · Filter · IconButton · InputField 전부 값 유무로 파생시켜 왔습니다. 소비처 코드도 `variant={isPast ? 'past' : 'default'} items={day.items}`로 끝나 3항 중첩이 사라집니다.
- **빈 상태는 `variant`를 타지 않고 심볼 하나로 고정입니다.** 항목이 없으면 `variant`가 무엇이든 `gray/100` 배경 + `gray/400` 문구입니다. Figma에 `empty` 심볼이 하나뿐이라 그 이상을 만들지 않습니다 — variant별로 빈 상태를 따로 정의하면 심볼에 없는 조합(`noBg` + 항목 없음 등)의 생김새를 구현이 임의로 정하게 됩니다. 코드에서도 `variant`가 물고 있는 것은 `CONTAINER` 하나뿐이고 빈 상태 분기는 그것을 아예 쓰지 않습니다.
- **`empty` · `past`의 stroke는 구현하지 않았습니다.** Figma에서 배경과 stroke가 둘 다 `gray/100`이라 렌더 결과가 배경만 칠한 것과 동일합니다. `default`만 `white` 배경 위 `gray/100` stroke라 실제로 보입니다.
- **padding은 `variant` 공통 `px-[16px] py-[14px]`입니다.** Figma는 `noBg` 16/14 · 테두리 있는 쪽 17/15인데, 정확히 1px씩만 차이나는 것으로 보아 카드 쪽 프레임이 stroke를 레이아웃에 포함해 계산한 값입니다. `inset-ring`은 레이아웃을 차지하지 않아 되돌려 줄 1px이 없으므로 16/14 그대로 갑니다 — 링을 padding으로 보정하지 않는 것은 CLAUDE.md [스타일 규칙]을 따른 것입니다. 대신 테두리 있는 variant는 심볼보다 셀이 1px 넉넉합니다(폭 94 vs 93.33 · 빈 상태 높이 48 vs 50). 투명 `border`로 크기를 맞추는 우회법은 같은 규칙이 기각했고, 그렇게 해도 전 variant가 93.33이 되어 이번엔 `noBg` 심볼이 어긋납니다 — **두 심볼이 애초에 1px 다르므로 양쪽 다 맞는 답은 없습니다.**
- **Cell에는 `flex-1`만 겁니다.** `min-w-[92px]` · `max-w-[110px]`는 `OrderBoxCell`이 컴포넌트 레벨에서 들고 있습니다(위 OrderBoxCell 「결정」). Figma 인스턴스는 `flex: 1 0 0`이지만 `min-w`가 축소를 막고 있어 `flex-1`(`1 1 0`)과 결과가 같고, Tailwind 기본 유틸 쪽을 골랐습니다.
- **`tone`을 소비처에 노출하지 않습니다.** `variant`에서 유도합니다 (`past` → `muted`, 나머지 → `default`).
- **개수를 제한하지 않습니다.** 4개를 넘으면 `flex-wrap`으로 다음 줄에 떨어집니다.
- **`주문 없음`은 DS가 고정합니다.** Figma 텍스트가 하나로 고정이고, `InputField`의 `INPUT_FIELD_VERIFY_LABEL`(`확인`)과 같은 처리입니다.
- **기본값은 `default`입니다.** Figma 컴포넌트 세트의 기본은 첫 심볼인 `noBg`지만, `noBg`는 배경을 담는 쪽이 그린다는 전제라 단독으로 쓰이지 않습니다.
- **`key`는 `itemName`입니다.** 한 박스 안에서 같은 품목이 두 줄로 나오는 것은 데이터 오류라 인덱스를 쓰지 않았습니다.

### API

| prop        | 필수 | 기본값    | 비고                                              |
| ----------- | ---- | --------- | ------------------------------------------------- |
| `items`     | ✅   | —         | `OrderBoxItem[]`. 빈 배열이면 `주문 없음`         |
| `variant`   |      | `default` | 3종                                               |
| `className` |      | —         | 담는 쪽의 폭 보정용                               |

`OrderBoxItem`은 `Pick<OrderBoxCellProps, 'boxes' | 'itemName'>`입니다.

### Storybook

`apps/storybook/src/stories/biz-ui/OrderBox.stories.tsx`, `meta.title`은 `core/biz-ui/Order/OrderBox`. 스토리 4종 (`Default` · `Variants` · `Empty` · `Wrapped`). `Empty`는 `variant`를 타지 않아 하나만 둡니다. 실제 폭은 fill이라 스토리에서만 `w-[338px]`을 걸어 문서 프레임과 같은 3열 + 줄바꿈을 봅니다.

---

## OrderDateInfo

Figma: 컴포넌트 세트 `203:872`. 심볼은 `203:871`(평일·배송) · `203:870`(휴일·배송) · `203:868`(평일·무배송) · `203:869`(휴일·무배송)입니다.

날짜와 배송정보 2행을 그리는 표시 전용 컴포넌트입니다. 상태 축이 없어 `<div>` + `Typography` 2개로 렌더합니다.

### Variant 축

| 축            | 값      |
| ------------- | ------- |
| `isHoliday`   | boolean |
| `hasDelivery` | boolean |

2×2 네 조합이 모두 심볼로 있습니다. `hasDelivery`는 prop이 아니라 `deliveryInfo` 유무로 파생시켰습니다 (아래 「결정」).

### 실측 스펙

| 행            | 타이포                              | 조건      | 색         |
| ------------- | ----------------------------------- | --------- | ---------- |
| 1행 날짜      | `body-lg-semibold` (SemiBold 18px)  | 평일      | `gray/700` |
|               |                                     | 휴일      | `red/600`  |
| 2행 배송정보  | `body` (Medium 16px)                | 배송 있음 | `blue/400` |
|               |                                     | 배송 없음 | `gray/400` |

| `isHoliday` | `hasDelivery` | 1행              | 2행                |
| ----------- | ------------- | ---------------- | ------------------ |
| false       | true          | `3일(수)`        | `2일(화) 배송시작` |
| true        | true          | `3일(일) · 휴일` | `2일(화) 배송시작` |
| false       | false         | `3일(수)`        | `배송없음`         |
| true        | false         | `3일(일) · 휴일` | `배송없음`         |

| 항목     | 값                                       |
| -------- | ---------------------------------------- |
| 레이아웃 | `flex-v-stack items-start`               |
| 행 간격  | `-mb-0.5` (= -2px)                       |
| 높이     | 심볼 47px (= 26.1 + 23.2 − 2)            |
| 폭       | 고정 없음. 심볼이 104 / 56 / 101px로 제각각 |

바인딩된 hex가 기존 토큰과 전부 일치해 신규 토큰이 없습니다 (`gray/700` `#4c566e` · `red/600` `#bd2222` · `blue/400` `#558ee1` · `gray/400` `#aeb5c6`).

### 결정

- **`hasDelivery`를 prop으로 열지 않고 `deliveryInfo` 유무로 파생시켰습니다.** 배송이 없을 때 문구가 `배송없음` 하나로 고정이라 축을 따로 열 이유가 없습니다. OrderBox가 `items` 유무로 빈 상태를 파생시킨 것과 같은 처리입니다.
- **두 축이 서로를 참조하지 않습니다.** 1행은 `isHoliday`만, 2행은 `deliveryInfo` 유무만 봅니다. 네 심볼을 2×2 맵으로 펼치면 같은 값이 두 번씩 들어가므로 `ORDER_DATE_INFO_STYLES`에 색 4개만 두고 각 행에서 삼항으로 고릅니다.
- **`· 휴일` 접미어는 컴포넌트가 붙입니다.** 네 심볼 전부 같은 형태이고 날짜 색과 함께 바뀌는 표현이라 소비처에 맡기면 어긋납니다. 반대로 `3일(수)` 같은 날짜 포맷은 도메인 규칙이라 받아서 그리기만 합니다 — `OrderBoxCell`의 `boxes` · `itemName`과 같은 기준입니다.
- **`배송없음`은 DS가 고정합니다.** OrderBox의 `주문 없음`과 같은 처리입니다.
- **행 간격이 음수인 것은 `OrderBoxCell`과 같은 이유입니다.** 심볼 높이 47px이 `26.1 + 23.2 - 2`로 맞습니다.
- **폭을 고정하지 않습니다.** 심볼 폭이 내용에 따라 104 / 56 / 101px로 달라 hug입니다.
- **OrderInputCard의 「날짜 + 상태 문구」 2행과 묶지 않습니다.** 겉모양은 닮았지만 심볼 `309:1957`의 그 블록(`94:758`)은 이 컴포넌트의 인스턴스가 아니라 별도 프레임이고, 1행 `body-semibold`(16px) `gray/800` · 2행 `label`(14px) `gray/400`로 토큰이 전부 다르며 행 간격 음수도 없습니다.

### API

| prop           | 필수 | 기본값  | 비고                                          |
| -------------- | ---- | ------- | --------------------------------------------- |
| `dateLabel`    | ✅   | —       | 1행. `3일(수)` — 소비처가 포맷                |
| `deliveryInfo` |      | —       | 2행. 없으면 `배송없음`                        |
| `isHoliday`    |      | `false` | 날짜를 `red/600`으로 바꾸고 `· 휴일`을 붙임   |
| `className`    |      | —       | 담는 쪽의 정렬 보정용                         |

### Storybook

`apps/storybook/src/stories/biz-ui/OrderDateInfo.stories.tsx`, `meta.title`은 `core/biz-ui/Order/OrderDateInfo`. 스토리 2종 (`Default` · `Matrix`). `Matrix`는 2×2 네 조합을 나열합니다.

---

## QuantityStepper

Figma: 컴포넌트 세트 `199:823`. 심볼은 `199:822`(empty) · `199:821`(filled)입니다.

상품 이미지 · 상품명 · 수량 증감 행 · 총계 pill로 이뤄집니다. **Order 계열에서 처음으로 상호작용이 있는 컴포넌트**이고, 선행은 기구현 `IconButton`뿐입니다.

### Variant 축

| 축      | 값                          |
| ------- | --------------------------- |
| `state` | `empty` · `filled` · `error` |

Figma 심볼은 `199:822`(empty) · `199:821`(filled) · `534:1727`(error, 이름은 `state3`)입니다.

**`state`를 prop으로 열지 않습니다.** `error`는 `value > max`, `filled`는 `value > 0`에서 파생합니다. 우선순위는 `error` > `filled` > `empty`이고, 판정은 `resolveQuantityStepperState`가 합니다 — `Input/shared`의 `resolveInputState`와 같은 형태입니다.

### 실측 스펙

| 영역             | 값                                                                       |
| ---------------- | ------------------------------------------------------------------------ |
| 루트             | `flex-v-stack` · gap 12px. 폭은 선언하지 않음 (문서 프레임 312px, 실제 fill) |
| 상품 블록        | `flex-v-stack items-center` · gap 2px · `w-full`                         |
| 상품 이미지      | `h-[80px] w-full rounded-8 object-contain`                               |
| 상품명           | `body-semibold` · `gray/800` · 가운데 정렬                               |
| 컨트롤 블록      | `flex-v-stack items-center` · gap 11px · `w-full`                        |
| 증감 행          | `flex-h-stack items-center` · gap 6px · `w-full`                         |
| 감소 · 증가 버튼 | `IconButton` 기본값(`lg` 40px · `default`) + `minus` · `plus` 아이콘 24px |
| 값 인풋          | `flex-1` · `h-[47px]` · `bg-gray-50` · `rounded-6` · `px-[18px]` · 가운데 정렬 |
| 값 텍스트        | `heading-5` — 값 `gray/900` / 플레이스홀더 `gray/300`                    |
| 총계 pill        | `rounded-full` · `px-[12px] py-[2px]` · `label-semibold` · `총 {value × unitsPerBox}개` |
| 에러 메시지      | `caption` · `red/400` · pill 아래 같은 컬럼(gap 11px)                     |

| state    | 인풋 링                        | pill 배경  | pill 글자  |
| -------- | ------------------------------ | ---------- | ---------- |
| `empty`  | `inset-ring` 1px `gray/200`    | `gray/50`  | `gray/300` |
| `filled` | `inset-ring` 1px `gray/200`    | `blue/50`  | `blue/500` |
| `error`  | `inset-ring-2` `red/400`       | `red/50`   | `red/500`  |

312px에서 감소 버튼 `x=0`, 값 박스 `x=46 w=220`, 증가 버튼 `x=272`입니다 (심볼은 46.33 / 219.33 / 272).

### 결정

- **값 박스의 소수점 실측치를 반올림했습니다.** 심볼은 높이 `46.668px` · 테두리 `0.667px` · 좌우 padding `18.334px`인데, 세 값 모두 ×1.5 하면 `70` · `1` · `27.5`로 떨어집니다 — 블록 하나가 2/3로 축소된 스케일 아티팩트입니다. 각각 `h-[47px]` · `inset-ring`(1px) · `px-[18px]`로 갑니다. **소수점 px는 쓰지 않습니다.** 테두리를 `inset-ring`으로 그리는 것 자체는 CLAUDE.md [스타일 규칙].
- **루트에 폭을 선언하지 않습니다.** 심볼의 312px은 문서 값이고 실제로는 fill입니다. 루트에 `w-full`을 넣었더니 소비처가 `className`으로 준 `w-[312px]`과 충돌해 폭이 240px로 줄었습니다 — 이 레포는 `clsx`만 쓰고 tailwind-merge가 없어서 두 클래스가 동시에 나오면 CSS 순서에 맡겨집니다. 안쪽 블록들만 `w-full`을 갖습니다.
- **값 박스는 `<input>`이고 정수만 받습니다.** 버튼으로도, 키보드로도 조절합니다. `type='text'` + `inputMode='numeric'`이고(모바일 숫자 키패드, `type='number'`의 스피너·`e`·`-` 허용 문제 회피) `parseQuantityInput`이 `\D`를 전부 걷어냅니다 — 소수점도 걸러지므로 **소수 입력이 불가능**합니다. 빈 문자열은 `0`으로 정규화해 플레이스홀더로 돌아갑니다.
- **입력 파서는 internal-ui `Filter/utils/parseNumericInput`의 축소판입니다.** 거기서 `isDecimal=false`일 때 하는 `\D` 제거가 필요한 전부입니다. 정수만 쓰므로 소수 분기를 두지 않았고, biz-ui는 internal-ui에 의존하지 않으므로 코드를 가져오지 않고 `QuantityStepper/utils/`에 따로 뒀습니다.
- **입력값을 상한으로 절단하지 않습니다.** `parseNumericInput`은 `max` 초과 시 `max`로 잘라내는데, 그렇게 하면 초과 상태가 만들어지지 않아 **에러 심볼(`534:1727`)이 영원히 렌더되지 않습니다.** 초과를 표현할 UI가 생겼으므로 값은 그대로 통과시키고 소비처가 `errorMessage`로 알립니다.
- **`0`일 때 감소 버튼을 비활성합니다.** Figma 주석 `337:3554`(「빈박스 수량이 0 일때 - 버튼 비활성화」) 그대로이고, `IconButton`의 `disabled`가 `gray/300`으로 빠지는 것이 `empty` 심볼의 흐린 `Minus`와 일치합니다(활성은 `gray/500`).
- **에러 링을 `inset-ring-2`로 그려서 높이가 안 변합니다.** Figma는 정상 1px / 에러 2px인데 심볼 높이가 47 → 46으로 어긋납니다(stroke가 레이아웃에 포함된 값). `inset-ring`은 레이아웃을 차지하지 않아 두 상태 모두 47px로 유지되고, 에러가 떴다 사라져도 행이 튀지 않습니다 — CLAUDE.md [스타일 규칙]이 `Input` 1px↔2px 사례로 든 바로 그 상황입니다.
- **에러 메시지 문구는 소비처가 넘깁니다.** Figma 텍스트가 `에러 메시지가 표시됩니다`라는 자리표시자이고, 실제 문구는 재고·마감 등 도메인 사유마다 달라집니다. `aria-invalid`와 `aria-describedby`도 함께 겁니다 (`InputField`와 같은 처리).
- **`max`는 「몇 개부터 에러인지」를 정합니다.** 기본값 `100`. `value > max`면 에러 상태가 되고, 절단하거나 버튼을 막지 않습니다. 상한 장치를 `max`와 `errorMessage` 둘로 나누면 판정 기준이 두 군데로 흩어지므로 **기준은 `max` 하나, 문구만 `errorMessage`**로 갈랐습니다.
- **증가 버튼은 비활성하지 않습니다.** 에러 심볼 `534:1727`은 이미 초과 상태인데도 `Plus`가 활성(`gray/500`)이고, 주석 `337:3554`도 감소 버튼만 언급합니다. 버튼으로도 상한을 넘길 수 있고 넘기면 에러로 알립니다.
- **총계는 `unitsPerBox`를 받아 컴포넌트가 곱합니다.** 상자당 갯수는 상품명과 무관하게 API로 따로 내려옵니다 — 이름의 `10입` · `20개`는 표시용 문자열일 뿐이라 파싱 대상이 아닙니다. `총 {value × unitsPerBox}개` 조립까지 DS가 하는 이유는 곱셈이 포맷이 아니라 계산이고, 단위 `개`가 심볼 3종에서 모두 고정이기 때문입니다 — `OrderBoxCell`의 `boxes`처럼 단위가 도메인마다 달라지는 경우와 다릅니다.
- **인풋 라벨은 `aria-labelledby`로 상품명을 가리킵니다.** 보이는 라벨이 없고, 한 화면에 스테퍼가 여러 개 놓이면 `aria-label='수량'`으로는 어느 상품인지 구분되지 않습니다. `useId`로 상품명에 id를 붙여 연결합니다.
- **이미지는 `<img>`로 직접 그립니다.** biz-ui에 이미지 프리미티브가 없고 이 컴포넌트만 쓰므로 새로 만들지 않았습니다. `alt`은 `name`입니다.
- **상품명에 `whitespace-nowrap`을 넣지 않았습니다.** 심볼 CSS에는 있지만 Figma의 hug 표현이고, 품목명이 길면 312px를 넘칩니다. 가운데 정렬한 채 줄바꿈되게 뒀습니다.

### API

| prop           | 필수 | 기본값            | 비고                                                    |
| -------------- | ---- | ----------------- | ------------------------------------------------------- |
| `name`         | ✅   | —                 | 상품명 · 이미지 `alt`. `10입` 같은 표기는 표시용         |
| `imageUrl`     | ✅   | —                 | 상품 이미지                                             |
| `value`        | ✅   | —                 | 박스 수량. `0`이면 플레이스홀더 + 감소 비활성           |
| `unitsPerBox`  | ✅   | —                 | 상자당 갯수. 총계 = `value × unitsPerBox`               |
| `onChange`     | ✅   | —                 | `(value: number) => void`. 버튼·입력 모두 이걸로 올라옴 |
| `errorMessage` |      | —                 | 초과했을 때 pill 아래에 띄울 문구                       |
| `max`          |      | `100`             | 넘으면 에러 상태. 절단도 버튼 잠금도 하지 않음          |
| `placeholder`  |      | `얼마나 시킬까요` | 값이 `0`일 때 문구                                      |
| `className`    |      | —                 | 담는 쪽의 폭 지정용                                     |

### Storybook

`apps/storybook/src/stories/biz-ui/QuantityStepper.stories.tsx`, `meta.title`은 `core/biz-ui/Order/QuantityStepper`. 스토리 3종 (`Default` · `States` · `UnitsPerBox`).

**controlled 컴포넌트라 스토리마다 상태를 들려 줍니다.** `value`를 arg로 고정해 두면 버튼과 입력이 아무 반응도 없어 컴포넌트가 고장난 것처럼 보입니다. 파일 안의 `StatefulStepper`가 `useState`로 값을 들고, `Default`는 `key={args.value}`로 remount 해서 `value` 컨트롤을 바꿨을 때 다시 seed 되게 합니다. `States`는 재고 20개(`max=20`)를 가정하고 `0` · `2` · `21`로 세 state를 나열하며, `UnitsPerBox`는 상자당 갯수 `10` · `20` · `30`에서 총계가 각각 달라지는 것을 봅니다.

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
| 패널 행     | `justify-between` · 품목명 `body` / 수량 `body-bold` · 행 간 gap 2px |

| `orderStatus`   | 카드 배경 · 테두리     | 요일 뱃지            | 날짜 색    | 액션                          |
| --------------- | ---------------------- | -------------------- | ---------- | ----------------------------- |
| `inputRequired` | `white` · `gray/100`   | `gray/50` + `gray/700` | `gray/800` | `CtaButton` primary/filled/sm — 주문입력 |
| `completed`     | `white` · `blue/300`   | `blue/50` + `blue/500` | `gray/800` | `CtaButton` primary/outlined/sm — 주문수정 |
| `noOrder`       | `gray/50` · `gray/100` | `gray/300` + `gray/50` | `gray/400` | `CtaButton` gray/outlined/sm — 주문수정 |
| `inputClosed`   | `gray/50` · `gray/100` | `gray/300` + `gray/50` | `gray/400` | `Badge` red/tonal — 주문마감  |

`inputRequired` + 휴일일 때만 요일 뱃지가 `red/50` + `red/400`으로 바뀝니다. 패널 품목 색은 주문한 행 `gray/800`, `주문없음` 행 `blue/200`입니다.

**`CtaButton` · `Badge` 기구현이 hex까지 그대로 맞아 신규 스타일이 없습니다.**

### 결정

- **축을 독립으로 구현하고 요일 뱃지만 2축 매퍼를 씁니다.** 한 Record에 10조합을 나열하면 결손 6조합이 구멍이 됩니다. `resolveOrderInputCardDayStyle`이 `inputRequired` + 휴일일 때만 빨강을 돌려주고 나머지는 `orderStatus` 맵을 그대로 씁니다.
- **심볼에 없는 6조합은 축 조합으로 자동 처리됩니다.** `noOrder` + 평일은 `noOrder` 스타일에 평일 요일만 들어가면 되고, 나머지 넷(`completed` + 휴일 2 · `inputClosed` + 날짜없음 2)은 **실제로 발생하지 않는 조합임을 확인했습니다.** 축을 나눠 둔 덕에 별도 케이스를 만들지 않아도 렌더는 됩니다.
- **비활성 카드(`noOrder` · `inputClosed`)에서는 휴일이 뱃지 색에 반영되지 않습니다.** 이미 회색으로 죽은 카드에 빨강을 얹지 않는다는 뜻이고, 디자이너에게 확인받은 동작입니다. 날짜의 `· 휴일` 접미어는 그대로 붙습니다.
- **Figma `date` 축을 `dateLabel` 유무로 파생시켰습니다.** 계열 전체(`OrderBox`의 `items`, `OrderDateInfo`의 `deliveryInfo`, `QuantityStepper`의 `errorMessage`)와 같은 판단입니다. **날짜가 없고 휴일이면 `휴일`만** 뜹니다 — `generateOrderInputCardDateLabel`이 세 경우를 다룹니다.
- **주문내역 패널은 `completed` 전용입니다.** `items`를 넘겨도 다른 `orderStatus`에서는 그리지 않습니다. 처음엔 `items` 유무만 봤다가 전 status에 패널이 붙는 것을 Storybook에서 발견해 status 조건을 되살렸습니다.
- **`inputClosed`만 버튼이 아니라 `Badge`입니다.** `ORDER_INPUT_CARD_BUTTON_STYLES`에 `inputClosed` 항목을 두지 않고, 항목이 없으면 `Badge`를 그리는 것으로 분기합니다 — 없는 값을 `null`로 채워 넣는 것보다 「이 상태엔 버튼이 없다」가 그대로 드러납니다. 정책 카드 [COM-017](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=524-14&m=dev) (`524:14`)의 「주문입력 · 주문수정 버튼 모두 미노출, 탭 액션 없음」과 맞습니다 — 그 자리가 뱃지라 눌리는 대상 자체가 없습니다. COM-017의 나머지 두 항목(「일괄 적용 날짜 칩 비활성」 · 「완료 판정 시 입력 대상 제외」)은 각각 다른 컴포넌트와 화면 로직이라 이 컴포넌트 밖입니다.
- **`orderStatus` 4종을 데이터에서 파생시키지 않고 그대로 받습니다.** COM-017이 `inputRequired`=미주문(주문 자체가 생성되지 않음) · `noOrder`=주문 수량 0(사용자가 주문없음 선택) · `completed`=수량 1 이상 · `inputClosed`=마감 경과로 정의하고, **「미주문과 주문 수량 0은 서로 다른 상태이며 서버에서도 구분되어야 한다」**고 못박았습니다. 수량만으로는 앞의 두 상태를 가를 수 없으므로 union 4종을 유지합니다.
- **상태 문구와 액션 라벨은 DS가 고정합니다.** `입력필요` · `주문없음` · `주문마감` / `주문입력` · `주문수정`이 `orderStatus`에서 1:1로 나옵니다. 애초에 주문 입력 카드라 액션이 이 둘로 고정이고 소비처가 바꿀 일이 없습니다. `completed`만 상태 문구가 없어 `ORDER_INPUT_CARD_STATUS_LABELS`를 `Partial`로 두고 값이 없으면 줄을 그리지 않습니다.
- **수량은 `quantity: number`이고 키를 생략할 수 없습니다.** `1` 이상이면 `{n}개` + `gray/800`, `0`이면 `주문없음` + `blue/200`입니다. `{n}개` 조립은 `QuantityStepper`의 `unitsPerBox`와 같은 기준 — 단위 `개`가 심볼 전체에서 고정입니다.
- **품목 수량에는 「미주문」이 없습니다.** 처음엔 `quantity?: number`로 뒀다가 키 생략과 `0`이 타입상 구분되지 않아 required로 바꿨고, 이어서 COM-017의 미주문/수량 0 구분을 따라 `number | null`까지 갔다가 되돌렸습니다. **COM-017의 그 구분은 `orderStatus` 대응표, 즉 카드 레벨**이고 이미 `inputRequired`/`noOrder`로 갈라져 있습니다. 이 패널은 완료된 주문의 결과만 보여주고 입력 단계에서 부분 미발주를 막으므로 품목은 `0` 아니면 `1` 이상뿐입니다 — 도달할 수 없는 `null`을 타입에 남기지 않습니다.
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
| `items`       |      | —       | `completed` 전용 주문내역. `quantity`가 `0`이면 `주문없음` |
| `onAction`    |      | —       | 주문입력 · 주문수정 클릭. `inputClosed`는 버튼이 없어 호출되지 않음 |
| `className`   |      | —       | 담는 쪽의 폭 지정용                               |

### Storybook

`apps/storybook/src/stories/biz-ui/OrderInputCard.stories.tsx`, `meta.title`은 `core/biz-ui/Order/OrderInputCard`. 스토리 2종 (`Default` · `Matrix`). `Matrix`는 `orderStatus` 4 × 휴일 2 × 날짜 유무 2 = **16조합을 전부 깔아** Figma에 없는 6조합까지 눈으로 확인합니다.
