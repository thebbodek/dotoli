# Order 계열 구현 기록

`apps/biz-ui/src/components/Order` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 Order 계열 고유 사실만 둡니다.

Figma: [Order 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=203-847&m=dev) (`203:847`). 섹션 안의 `302:1434`(OrderBoxCell) · `302:1451`(OrderBox) · `302:1631`(OrderDateInfo) · `302:1573`(QuantityStepper) · `302:1204`(OrderInputCard)는 전부 문서용 프레임이고, 실제 값은 각 컴포넌트 세트에서 실측합니다.

## 구현 현황

| 컴포넌트          | 티켓       | 설명                                                        |
| ----------------- | ---------- | ----------------------------------------------------------- |
| `OrderBoxCell`    | DOTOLI-229 | `tone` 3종. 박스수 + 품목명 2행                             |
| `OrderBox`        | DOTOLI-230 | `variant` 4종. `OrderBoxCell`을 담는 3열 grid 컨테이너      |
| `OrderDateInfo`   | DOTOLI-231 | 날짜 + 배송정보 2행. `isHoliday` · 배송 유무 2축            |
| `QuantityStepper` | DOTOLI-232 | 상품 + 수량 증감 + 총계. Order 계열 첫 상호작용 컴포넌트    |
| `OrderInputCard`  | DOTOLI-233 | `orderStatus` 4종 × 휴일 × 날짜 유무. 계열에서 가장 큼      |
| `OrderNotiCollapse` | DOTOLI-264 | `type` 4종 × `isOpen`. **헤더만** 그리고 접히는 내용은 소비 앱이 형제로 둠 |

`OrderNotiCollapse`만 Order 섹션 밖([`205:4063`](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=205-4063&m=dev))에 있습니다.

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
| 폭         | 없음 — 담는 쪽 트랙을 채움 (Figma 컴포넌트는 `min-w-[92px] max-w-[110px]`, 아래 「결정」) |
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
- **~~`min-w`·`max-w`를 컴포넌트가 들고 갑니다.~~ — DOTOLI-319에서 뺐습니다.** Figma와 다릅니다. 두 값은 Figma에서 인스턴스가 아니라 컴포넌트에 걸려 있고, 당시에는 폭을 늘리는 쪽(OrderBox)이 `flex-1`만 더하면 됐습니다.

  **`flex-1`과 `max-w-[110px]`이 같이 걸리면 flex가 계산한 폭을 max-width가 자릅니다.** 문서 프레임 338의 3개짜리 인스턴스는 셀이 94라 cap에 안 닿아 드러나지 않았습니다(`1239:18608` = `16 + 94 × 3 + 12 × 2 + 16 = 338`). 3개 기준으로는 컨테이너가 `16 + 110 × 3 + 12 × 2 + 16 = 386`을 넘으면 셀이 110에서 멈추고 우측에 빈 공간이 남습니다. `biz-customer-app` 주문 메인(480 프레임)에서 실제로 보였습니다. **1 · 2개는 폭과 거의 상관없이 이미 110에 걸려 있었습니다** — 1개는 컨테이너 142, 2개는 264부터입니다.

  **폭은 이제 담는 쪽 트랙이 정합니다** (아래 OrderBox 「결정」 grid 항목). `min-w`까지 뺀 것은 `minmax(0, 1fr)` 트랙에 `min-width`를 걸면 줄바꿈 대신 가로 넘침이 나기 때문입니다. **실제로 92 밑으로 내려갑니다** — 소비 앱 좌우 마진이 20이라 360 기기에서 컨테이너 320, 셀 88이 됩니다. 종전에는 이 폭에서 3개가 2개 + 1개로 줄바꿈됐고, 지금은 3열에 품목명이 접힙니다. `min-w`를 남기면 이 폭에서 가로로 넘치므로 빼는 쪽이 맞고, 화면이 바뀌는 것은 아래 OrderBox 「디자인 확인 필요」에 올렸습니다.
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

`OrderBoxCell`을 인스턴스로 담는 3열 grid 컨테이너입니다. 상태 축이 없어 `<div>`로 렌더합니다.

### Variant 축

| 축        | 값                                       |
| --------- | ---------------------------------------- |
| `variant` | `noBg` · `default` · `past` · `inverse`  |

Figma에는 `empty`가 네 번째 심볼로 있지만 **prop이 아니라 `items` 유무로 파생시켰습니다.** 다만 **빈 상태 배경은 `variant`를 탑니다** (아래 「결정」).

**`inverse`는 DOTOLI-317에서 추가했고 DS 컴포넌트 세트에 심볼이 아직 없습니다.** 실측 출처는 고객 비즈 파일의 두 화면입니다 — 채워진 상태 [`1239:18608`](https://www.figma.com/design/LomGIAwvPAkyRbBcGbk9rs/%EA%B3%A0%EA%B0%9D-%EB%B9%84%EC%A6%88?node-id=1239-18608&m=dev)과 빈 상태 [`1217:13818`](https://www.figma.com/design/LomGIAwvPAkyRbBcGbk9rs/%EA%B3%A0%EA%B0%9D-%EB%B9%84%EC%A6%88?node-id=1217-13818&m=dev). 심볼 추가는 디자이너에게 요청 대상입니다 — 아래 「디자인 확인 필요」.

**심볼명이 `rest`인데 `past`로 바꿔 달라고 디자이너에게 요청해 둔 상태입니다.** 문서 프레임 라벨(`past`)이 맞고 구현도 `past`입니다. Figma 반영 전까지 심볼 `179:624`는 `variant=rest`로 보입니다.

### 실측 스펙

| `variant` | 배경         | 테두리         | radius       | Cell `tone` | 빈 상태 배경     |
| --------- | ------------ | -------------- | ------------ | ----------- | ---------------- |
| `noBg`    | 없음         | 없음           | 없음         | `default`   | `gray/100`       |
| `default` | `base/white` | `gray/100` 1px | `rounded-16` | `default`   | `gray/100`       |
| `past`    | `gray/100`   | `gray/100` 1px | `rounded-16` | `muted`     | `gray/100`       |
| `inverse` | 없음         | 없음           | 없음         | `inverse`   | `blue/900` 80%   |

빈 상태에서 `variant`가 물고 있는 것은 **배경 하나뿐**입니다. `rounded-16` · `place-items-center`와 문구 색(`label` · `gray/400`)은 네 variant가 공유합니다.

**`inverse`의 실측 출처는 둘이고 성격이 다릅니다.** 채워진 쪽은 실제 컴포넌트 인스턴스, 빈 쪽은 디자이너가 화면에 직접 그린 맨 프레임입니다.

| 상태   | 노드          | 성격        | 실측                                          |
| ------ | ------------- | ----------- | --------------------------------------------- |
| 채워짐 | `1239:18608`  | 인스턴스    | 338×89 = padding 14 + 셀 61 + 14. 배경·stroke 없음 |
| 빔     | `1217:13818`  | 맨 프레임   | 340×44 = padding 12 + 문구 20 + 12. `rounded-16` |

**padding은 14로 통일했습니다.** 실제 인스턴스 쪽이 DS 공통값 14와 일치하고, 12는 맨 프레임 하나뿐이라 드리프트로 봤습니다.

빈 쪽 색 두 개는 토큰과 정확히 일치하지 않아 근사로 옮겼습니다.

| 항목 | Figma `1217:13818` | biz-ui       |
| ---- | ------------------ | ------------ |
| 배경 | `#031f4a` 80%      | `blue/900`(`#183868`) 80% |
| 문구 | `base/white` 50%   | `gray/400`(`#aeb5c6`)     |

radius 16은 원본 프레임 실측값이라 `ORDER_BOX_EMPTY_STYLE`의 `rounded-16`과 그대로 맞습니다.

`blue/900` 위에 알파를 얹은 값이라 **실제로 보이는 색은 뒤에 깔린 면에 따라 달라집니다.** 디자이너가 알파를 쓴 것은 의도한 것으로 보입니다 — 원본 프레임이 장식 벡터가 깔린 판 위에 있습니다(그 벡터들은 클리핑돼 렌더에 안 나와 구현 대상이 아닙니다).

**대비는 소비처가 뒤에 까는 색이 정하므로 DS가 보장할 수 없습니다.** `blue/500` 위라고 가정하면 원안 4.22:1 · 근사안 4.48:1로 근사로 옮기며 나빠지지는 않았지만, **둘 다 WCAG AA 일반 텍스트 기준 4.5:1을 넘지 못합니다**(`label`이 14px/500이라 large text 예외도 못 탑니다). 흰 판 위라면 3.12:1까지 떨어집니다. 어두운 면 위에 쓰라는 전제가 깨지면 읽기 어려워지는 값입니다.

| 항목      | 값                                                       |
| --------- | -------------------------------------------------------- |
| 레이아웃  | `grid` · gap 12px · 항목이 있으면 `grid-cols-3 content-start items-start`, 빈 상태는 `place-items-center` |
| padding   | `px-[16px] py-[14px]` — `variant` 공통 (아래 「결정」)   |
| 폭        | 문서 프레임 338px. 실제로는 fill                         |
| Cell 배치 | 트랙 3개 고정. 셀은 항상 1/3                             |

338px에서 셀 폭 94(`(338 − 32 − 24) / 3`)로 Figma와 같고, 네 번째부터 다음 행의 첫 칸으로 내려갑니다. 항목이 1개나 2개여도 셀은 1/3이고 나머지 트랙은 빕니다.

### 결정

- **`empty`를 `variant`에서 빼고 `items` 유무로 파생시켰습니다.** Figma가 `empty`를 같은 박스에 문구만 바꿔 그린 것이라 축이 아니라 상태이고, 이 레포는 CtaButton · Filter · IconButton · InputField 전부 값 유무로 파생시켜 왔습니다. 소비처 코드도 `variant={isPast ? 'past' : 'default'} items={day.items}`로 끝나 3항 중첩이 사라집니다.
- **~~빈 상태는 `variant`를 타지 않고 심볼 하나로 고정입니다.~~ — DOTOLI-317에서 뒤집었습니다.** 이제 `ORDER_BOX_STYLES`가 variant마다 `EMPTY_BACKGROUND`를 들고 있고 빈 상태 분기가 그것을 씁니다. `gray/100`을 쓰는 세 variant는 값이 그대로라 동작은 안 바뀝니다.

  당시 근거는 「Figma에 `empty` 심볼이 하나뿐」이었는데, `inverse`의 빈 상태가 두 번째 디자인으로 나오면서 전제가 사라졌습니다. 심볼이 하나일 때 그 결정이 막던 것은 **심볼에 없는 조합을 구현이 지어내는 것**이었고, 그 경계는 지금도 같습니다 — 디자인이 있는 조합만 값을 갖고 나머지는 기존 값을 그대로 씁니다.
- **`inverse`를 `variant`의 네 번째 값으로 넣고 `tone` 축을 따로 열지 않았습니다.** 축을 하나 더 열면 `variant` × `tone` = 8조합이 되는데 디자인이 있는 것은 1개뿐이라, 나머지 7개의 생김새를 구현이 정해야 합니다. 위 결정이 그어 둔 경계와 같은 이유로 기각했습니다. `tone`이 이미 `OrderBoxCell`의 축 이름이라 같은 이름이 두 층에 생기는 것도 피했습니다.

  **`variant`가 표면(`noBg` · `default` · `inverse`)과 상태(`past`)를 한 축에 섞고 있는 것은 맞습니다.** 그 혼합은 `past`를 넣을 때 이미 받아들인 것이고, 지금 `surface` × `state`로 쪼개면 소비 앱이 깨지는데 그걸 요구하는 디자인 변경이 없어 두었습니다.
- **`inverse`의 채워진 상태에는 컨테이너 배경이 없습니다.** `noBg`처럼 어두운 면 위에 셀만 올라가고, 배경이 그려지는 것은 빈 상태뿐입니다. `default`가 컨테이너(`white`)와 빈 상태(`gray/100`)를 다르게 쓰는 것과 같은 모양입니다. 실제 인스턴스 `1239:18608`이 `338×89 = 14 + 61 + 14`이라 **padding은 DS 공통값 14 그대로**입니다.
- **`inverse` 위에 붙는 상단 라인과 backdrop blur는 OrderBox가 갖지 않습니다.** Figma도 그렇게 나눠 놨습니다 — 라인(`border-t` 2px · `white` 40%)과 `backdrop-blur-[10px]`은 부모 프레임 `1239:18607`에 있고 OrderBox 인스턴스에는 stroke 오버라이드가 없습니다.

  이유가 셋입니다. **프레임이 340인데 OrderBox는 338이라** 컴포넌트가 그리면 양쪽 1px씩 짧습니다. **블러가 같은 요소에 얹혀 있는데** 블러는 박스가 아니라 박스가 놓인 면의 성질이라, 라인을 가져가면 블러도 따라오고 컴포넌트가 「어떤 면 위에 있는가」를 소유하기 시작합니다. 그리고 이건 날짜 블록과 주문 목록을 **가르는 선**이라 담는 쪽이 `border-t`로 갖는 것이 CLAUDE.md [스타일 규칙]의 기존 결정입니다.
- **`inverse`의 빈 상태와 채워진 상태는 레이아웃 트리에서 자리가 다릅니다.** 채워진 쪽은 날짜 블록과 같은 프레임(`1239:18601`) 안에 라인으로 구분돼 들어가고, 빈 쪽은 그 프레임 **밖 형제 행**(`1217:13817`)으로 빠집니다. 문구도 갈립니다 — 날짜 블록 아래가 채워진 화면은 「오늘 사용하세요 · N월N일(요일)배송」, 빈 화면은 「오늘 주문한 식기가 없습니다」이고 알약 안에 「오늘은 배송이 없습니다」가 한 번 더 들어갑니다.

  **한 컴포넌트가 스스로 자리를 옮길 수는 없으므로 이 차이는 소비 앱이 갖습니다.** 라인·블러 래퍼는 항목이 있을 때만 씌우고, `OrderBox`는 그 안에 들어가기만 합니다. 래퍼가 여러 화면에서 반복되는 것이 확인되면 껍데기를 여는 것이 아니라 **컴포넌트를 하나 더 만드는 쪽**입니다 (CLAUDE.md [코드 규칙] 1의 `Overlay` ↔ `Modal` 선례).
- **`empty` · `past`의 stroke는 구현하지 않았습니다.** Figma에서 배경과 stroke가 둘 다 `gray/100`이라 렌더 결과가 배경만 칠한 것과 동일합니다. `default`만 `white` 배경 위 `gray/100` stroke라 실제로 보입니다.
- **padding은 `variant` 공통 `px-[16px] py-[14px]`입니다.** Figma는 `noBg` 16/14 · 테두리 있는 쪽 17/15인데, 정확히 1px씩만 차이나는 것으로 보아 카드 쪽 프레임이 stroke를 레이아웃에 포함해 계산한 값입니다. `inset-ring`은 레이아웃을 차지하지 않아 되돌려 줄 1px이 없으므로 16/14 그대로 갑니다 — 링을 padding으로 보정하지 않는 것은 CLAUDE.md [스타일 규칙]을 따른 것입니다. 대신 테두리 있는 variant는 심볼보다 셀이 1px 넉넉합니다(폭 94 vs 93.33 · 빈 상태 높이 48 vs 50). 투명 `border`로 크기를 맞추는 우회법은 같은 규칙이 기각했고, 그렇게 해도 전 variant가 93.33이 되어 이번엔 `noBg` 심볼이 어긋납니다 — **두 심볼이 애초에 1px 다르므로 양쪽 다 맞는 답은 없습니다.**
- **~~Cell에는 `flex-1`만 겁니다.~~ — DOTOLI-319에서 `grid-cols-3`으로 바꿨습니다.** 항목이 1개든 3개든 **셀은 항상 1/3**입니다. `flex-1`은 있는 항목끼리 남은 공간을 나누므로 1개면 한 줄을 다 먹고, 이를 막던 것이 `max-w-[110px]`이었습니다(위 OrderBoxCell 「결정」). cap을 빼면서 트랙 3개를 고정할 수단이 필요해 grid로 옮겼고, 셀에는 아무것도 걸지 않습니다.

  **`grid-cols-3`은 BASE가 아니라 ITEMS에 둡니다.** BASE에 두면 빈 상태에서 `grid-cols-1`로 덮어야 하는데, 이 레포는 `tailwind-merge` 없이 `clsx`만 써서 두 클래스가 함께 남고 결과가 스타일시트 순서에 달립니다. BASE에서 컬럼 선언을 빼면 충돌이 생기지 않습니다.

  **`content-start`도 ITEMS에만 겁니다.** grid의 `align-content` 기본값은 높이에 여유가 있으면 행을 늘려서, 소비 앱이 높이를 고정하면 두 번째 행이 아래로 밀립니다. 종전 flex 구조에 있던 값이라 그대로 옮겼습니다. 빈 상태는 반대로 이 늘어남 덕분에 `place-items-center`로 세로 가운데가 잡히므로 걸지 않습니다.
- **`tone`을 소비처에 노출하지 않습니다.** `variant`에서 유도합니다 (`past` → `muted`, `inverse` → `inverse`, 나머지 → `default`).
- **개수를 제한하지 않습니다.** 4개부터 grid가 다음 행을 만들고, 4번째도 1/3 폭입니다.
- **~~`주문 없음`은 DS가 고정합니다.~~ — DOTOLI-288에서 열었습니다.** `emptyLabel`을 받고 안 주면 `ORDER_BOX_EMPTY_LABEL`(`주문 없음`)이 그대로 쓰입니다. **기본값은 여전히 DS 소유**라 소비처가 매번 정할 것이 늘지는 않습니다.

  당시 근거는 「Figma 텍스트가 하나로 고정」이었는데, **빈 상태에 들어갈 문구가 화면마다 갈리는 것이 확인됐습니다.** 같은 빈 박스가 「주문 없음」일 수도 「휴무일」일 수도 있고, 그 판정은 도메인 규칙이라 DS가 알 수 없습니다 — `OrderBoxCell`의 `boxes` · `itemName`을 소비처가 조립하는 것과 같은 자리입니다. 「Figma에 하나뿐」은 **그 화면에서 하나**라는 뜻이지 값이 불변이라는 뜻이 아니었습니다.

  **`InputField`의 `INPUT_FIELD_VERIFY_LABEL`(`확인`)과는 갈립니다.** 그쪽은 버튼이 하는 **동작의 이름**이라 화면이 바뀌어도 「확인」입니다. 빈 상태 문구는 동작이 아니라 **상황 설명**이라 상황마다 달라집니다.
- **기본값은 `default`입니다.** Figma 컴포넌트 세트의 기본은 첫 심볼인 `noBg`지만, `noBg`는 배경을 담는 쪽이 그린다는 전제라 단독으로 쓰이지 않습니다.
- **`key`는 `itemName`입니다.** 한 박스 안에서 같은 품목이 두 줄로 나오는 것은 데이터 오류라 인덱스를 쓰지 않았습니다.

### API

| prop        | 필수 | 기본값    | 비고                                              |
| ----------- | ---- | --------- | ------------------------------------------------- |
| `items`      | ✅   | —              | `OrderBoxItem[]`. 빈 배열이면 빈 상태             |
| `variant`    |      | `default`      | 4종                                               |
| `emptyLabel` |      | `'주문 없음'`  | 빈 상태 문구. 기본값은 `ORDER_BOX_EMPTY_LABEL`    |
| `className`  |      | —              | 담는 쪽의 폭 보정용                               |

`OrderBoxItem`은 `Pick<OrderBoxCellProps, 'boxes' | 'itemName'>`입니다.

**`ORDER_BOX_ITEM_STYLE`을 제거했습니다** (DOTOLI-319). 배럴로 나가던 값이라 파괴적 변경이지만 소비 앱(`biz-customer-app`)은 `<OrderBox>`만 쓰고 이 상수를 import하는 곳이 없습니다. 같은 티켓에서 `ORDER_BOX_BASE_STYLE` · `ORDER_BOX_ITEMS_STYLE` · `ORDER_BOX_EMPTY_STYLE` · `ORDER_BOX_CELL_BASE_STYLE`의 값도 바뀌었습니다.

**`ORDER_BOX_EMPTY_STYLE`에서 `bg-gray-100`이 빠졌습니다** (DOTOLI-317). 배경이 `ORDER_BOX_STYLES[variant].EMPTY_BACKGROUND`로 옮겨 가서입니다. 배럴로 나가는 값이지만 컴포넌트 밖에서 쓰던 곳은 없습니다.

### 디자인 확인 필요

- **`inverse` 빈 상태 심볼을 DS 컴포넌트 세트(`169:688`)에 추가해 주세요.** 채워진 쪽은 실제 인스턴스(`1239:18608`)가 있는데 빈 쪽은 제품 파일의 맨 프레임뿐이라, 둘을 한 컴포넌트의 두 상태로 대조할 심볼이 없습니다.
- **색 두 개가 토큰과 정확히 일치하지 않습니다** (위 「실측 스펙」). 토큰을 늘리지 않고 `blue/900` 80% · `gray/400`으로 근사했습니다.
- **셀이 항상 1/3이 되면서 화면이 아래처럼 바뀝니다** (DOTOLI-319). 의도와 맞는지, 맞으면 Figma `OrderBoxCell` 컴포넌트에서도 `min-w-[92px]` · `max-w-[110px]`를 빼 주세요. Figma에 남아 있으면 다음 사람이 되돌릴 수 있습니다. 기기 폭은 소비 앱 좌우 마진 20을 뺀 컨테이너 기준으로 계산했습니다.

  | 기기 | 항목 수 | 종전 | 지금 |
  | --- | --- | --- | --- |
  | 375 | 1~2개 | 셀 110 | 셀 93. 한 줄이던 품목명이 두 줄로 접힘 |
  | 360 | 3개 | 2개 + 1개 줄바꿈 | 3열 (셀 88) |
  | 480 | 4개 | 4열 한 줄 (셀 93) | 3개 + 1개 (셀 128) |
- **빈 상태 문구가 WCAG AA(4.5:1)에 못 미칩니다.** 히어로 표면 위 기준 4.48:1이고 원안(`base/white` 50%)도 4.22:1이라 근사 때문에 생긴 문제가 아닙니다. 문구 색을 한 단계 밝히면(`gray/300` 이상) 넘어갑니다.

### Storybook

`apps/storybook/src/stories/biz-ui/OrderBox.stories.tsx`, `meta.title`은 `core/biz-ui/Order/OrderBox`. 스토리 4종 (`Default` · `Variants` · `Empty` · `Wrapped`). 실제 폭은 fill이라 스토리에서만 `w-[338px]`을 걸어 문서 프레임과 같은 셀 94 + 다음 행을 봅니다.

**`inverse`는 `bg-blue-500` 데코레이터를 깔고 봅니다.** 빈 상태 배경이 알파라 뒤에 깔린 색이 비치고, 셀은 흰 글씨라 밝은 판에서 안 보입니다. `OrderBoxCell` **스토리**가 `inverse` tone에 `bg-gray-900`을 까는 것과 같은 처리입니다 — 컴포넌트가 아니라 스토리가 갖는 판입니다(`ORDER_BOX_CELL_STYLES`의 `INVERSE`는 색만 정하고 배경이 없습니다).

**판 색 `blue-500`은 스토리 전용 선택이고 제품 표면 실측값이 아닙니다.** 제품 쪽은 그라디언트가 깔린 히어로라 단색 토큰으로 떨어지지 않습니다. 알파 배경이라 실제 대비는 소비처가 뒤에 까는 색이 정하므로, 이 스토리는 「알파가 비친다」를 보여줄 뿐 대비 검증용이 아닙니다.

`Empty`는 **기본값 ↔ `emptyLabel` 지정 ↔ `variant = inverse`** 세 개를 나란히 둡니다. 빈 상태 배경이 `variant`를 타게 된 뒤로 문구 축만으로는 부족해졌습니다.

**DOTOLI-319 검증** — 스토리 렌더에서 컨테이너 폭과 항목 수를 바꿔 쟀습니다. 종전 값은 같은 DOM에 종전 flex 스타일(`flex-wrap` · 셀 `flex: 1 1 0%` · `min-width: 92px` · `max-width: 110px`)을 인라인으로 씌워 같은 자리에서 쟀습니다. 폭은 컨테이너 기준이고, 338 말고는 소비 앱 좌우 마진 20을 뺀 값입니다(320 = 360 기기, 335 = 375 기기, 440 = 480 기기). `|`는 행 바뀜입니다.

| 컨테이너 | 1개 | 2개 | 3개 | 4개 |
| --- | --- | --- | --- | --- |
| 320 | 110 → **88** | 110/110 → **88/88** | 110/110 \| 110 → **88/88/88** | 110/110 \| 110/110 → **88/88/88 \| 88** |
| 335 | 110 → **93** | 110/110 → **93/93** | 93/93/93 → 같음 | 93/93/93 \| 110 → **93/93/93 \| 93** |
| 338 | 110 → **94** | 110/110 → **94/94** | 94/94/94 → 같음 | 94/94/94 \| 110 → **94/94/94 \| 94** |
| 440 | 110 → **128** | 110/110 → **128/128** | 110/110/110 → **128/128/128** | 93/93/93/93 → **128/128/128 \| 128** |

종전과 값이 같은 것은 3개가 한 행에 들어가고 셀이 cap(110) 밑인 경우(335 · 338)뿐입니다. 338 · 3개의 94가 Figma `1239:18608`과 같습니다. `content-start`는 높이를 300으로 고정해도 4번째 셀이 y 88로 높이 auto일 때와 같은 것으로 확인했습니다.

빈 상태는 338 × 48.3이고 문구 중심이 박스 중심과 가로세로 0.00 차이입니다. `OrderBoxCell` 단독 스토리는 기본 문구의 콘텐츠 폭이 107.1이라 종전 cap(92~110) 안쪽이었고, 값을 빼도 렌더가 같아 스토리에 래퍼 폭을 걸지 않았습니다.

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
- **`배송없음`은 DS가 고정합니다 — 다만 근거였던 선례가 바뀌었습니다.** 원래 「OrderBox의 `주문 없음`과 같은 처리」였는데 그쪽이 DOTOLI-288에서 `emptyLabel`로 열렸습니다. **이번 범위가 아니라 동작은 그대로 두었습니다.** 다만 둘은 성격이 같습니다 — 동작의 이름이 아니라 **값 없음을 알리는 상황 설명**이라, 화면이 바뀌면 문구도 갈릴 수 있습니다. **배송 없는 자리에 다른 문구가 필요한 화면이 나오면** 같은 방식(`deliveryInfo`의 짝이 되는 기본값 prop)으로 열면 되고, 그 전까지는 고정으로 둡니다.
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

| state    | `value`         | 인풋 링                        | pill 배경  | pill 글자  |
| -------- | --------------- | ------------------------------ | ---------- | ---------- |
| `empty`  | `null` (미주문) | `inset-ring` 1px `gray/200`    | `gray/50`  | `gray/300` |
| `filled` | `0` ~ `max`     | `inset-ring` 1px `gray/200`    | `blue/50`  | `blue/500` |
| `error`  | `> max`         | `inset-ring-2` `red/400`       | `red/50`   | `red/500`  |

312px에서 감소 버튼 `x=0`, 값 박스 `x=46 w=220`, 증가 버튼 `x=272`입니다 (심볼은 46.33 / 219.33 / 272).

### 결정

- **값 박스의 소수점 실측치를 반올림했습니다.** 심볼은 높이 `46.668px` · 테두리 `0.667px` · 좌우 padding `18.334px`인데, 세 값 모두 ×1.5 하면 `70` · `1` · `27.5`로 떨어집니다 — 블록 하나가 2/3로 축소된 스케일 아티팩트입니다. 각각 `h-[47px]` · `inset-ring`(1px) · `px-[18px]`로 갑니다. **소수점 px는 쓰지 않습니다.** 테두리를 `inset-ring`으로 그리는 것 자체는 CLAUDE.md [스타일 규칙].
- **루트에 폭을 선언하지 않습니다.** 심볼의 312px은 문서 값이고 실제로는 fill입니다. 루트에 `w-full`을 넣었더니 소비처가 `className`으로 준 `w-[312px]`과 충돌해 폭이 240px로 줄었습니다 — 이 레포는 `clsx`만 쓰고 tailwind-merge가 없어서 두 클래스가 동시에 나오면 CSS 순서에 맡겨집니다. 안쪽 블록들만 `w-full`을 갖습니다.
- **값 박스는 `<input>`이고 정수만 받습니다.** 버튼으로도, 키보드로도 조절합니다. `type='text'` + `inputMode='numeric'`이고(모바일 숫자 키패드, `type='number'`의 스피너·`e`·`-` 허용 문제 회피) `parseQuantityInput`이 `\D`를 전부 걷어냅니다 — 소수점도 걸러지므로 **소수 입력이 불가능**합니다. 빈 문자열은 `null`로 정규화해 플레이스홀더로 돌아갑니다.

- **미주문(`null`)과 의도적 `0` 주문을 구분합니다 (DOTOLI-284).** 소비 도메인이 「주문을 등록하지 않은 상태」와 「수량을 0으로 정한 상태」를 다르게 다뤄야 해서 `value`를 `number | null`로 엽니다. `null`은 `empty`(회색 pill · 플레이스홀더), `0`은 `filled`(파란 pill · 숫자 `0`)입니다 — 둘 다 감소 버튼은 비활성이지만 pill 색과 인풋 표시로 갈립니다.

  **전에는 `0`과 미주문이 같은 것이었습니다.** `parseQuantityInput`이 빈 입력을 `0`으로 내리고 인풋을 `value > 0`일 때만 렌더해서, `0`을 치면 빈칸으로 튕겨 미주문과 구분이 불가능했습니다. 파서를 `null` 반환으로, 인풋 표시를 `value !== null`로 바꿔 `0`이 살아남게 했습니다. **`0`의 시각은 Figma에 심볼이 없어 `filled`로 정했습니다** — pill 색이 「이 행에 결정이 있다」는 신호라 미주문(회색)과 갈려야 합니다. 아래 「디자인 확인 필요」에 올렸습니다.

  **별도 `isOrdered` boolean을 두지 않았습니다.** 두 prop이면 `isOrdered=false`인데 `value=5`처럼 어긋난 상태가 생깁니다 — 값이 항상 같이 움직이므로 하나로 흡수합니다(이 계열의 축 흡수 기준과 같음).
- **입력 파서는 internal-ui `Filter/utils/parseNumericInput`의 축소판입니다.** 거기서 `isDecimal=false`일 때 하는 `\D` 제거가 필요한 전부입니다. 정수만 쓰므로 소수 분기를 두지 않았고, biz-ui는 internal-ui에 의존하지 않으므로 코드를 가져오지 않고 `QuantityStepper/utils/`에 따로 뒀습니다.
- **입력값을 상한으로 절단하지 않습니다.** `parseNumericInput`은 `max` 초과 시 `max`로 잘라내는데, 그렇게 하면 초과 상태가 만들어지지 않아 **에러 심볼(`534:1727`)이 영원히 렌더되지 않습니다.** 초과를 표현할 UI가 생겼으므로 값은 그대로 통과시키고 소비처가 `errorMessage`로 알립니다.
- **감소 버튼은 `value`가 `null`이거나 `0`일 때 비활성합니다.** 둘 다 「더 내릴 곳이 없는」 상태입니다 — `0` 아래로는 못 가고 `null`은 아직 값이 없습니다. Figma 주석 `337:3554`(「빈박스 수량이 0 일때 - 버튼 비활성화」)가 근거인데, **미주문(`null`)이 새 상태로 갈라지면서 주석 문구가 이 둘을 함께 가리키지 못하게 됐습니다** — 아래 「디자인 확인 필요」. `IconButton`의 `disabled`가 `gray/300`으로 빠지는 것이 `empty` 심볼의 흐린 `Minus`와 일치합니다(활성은 `gray/500`).
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
| `value`        | ✅   | —                 | 박스 수량 `number \| null`. `null`=미주문(empty), `0`=의도적 0 주문(filled) |
| `unitsPerBox`  | ✅   | —                 | 상자당 갯수. 총계 = `value × unitsPerBox`               |
| `onChange`     | ✅   | —                 | `(value: number \| null) => void`. 버튼·입력 모두 이걸로 올라옴. 비우면 `null` |
| `errorMessage` |      | —                 | 초과했을 때 pill 아래에 띄울 문구                       |
| `max`          |      | `100`             | 넘으면 에러 상태. 절단도 버튼 잠금도 하지 않음          |
| `placeholder`  |      | `얼마나 시킬까요` | 값이 `null`일 때 문구                                   |
| `className`    |      | —                 | 담는 쪽의 폭 지정용                                     |

### 디자인 확인 필요

| 항목 | 내용 |
| --- | --- |
| `0` 주문의 시각 | Figma에 「의도적 0 주문」 심볼이 없습니다. `filled`(파란 pill + 숫자 `0`)로 정해 미주문(`null`·회색)과 갈랐습니다 (DOTOLI-284). 별도 시각을 원하면 심볼 필요 |
| 주석 `337:3554` 문구 | 「빈박스 수량이 0 일때 - 버튼 비활성화」가 이제 `null`·`0` 두 상태를 함께 가리킵니다. 감소 버튼은 둘 다 비활성이라 동작은 맞지만 문구 갱신이 필요합니다 |

### Storybook

`apps/storybook/src/stories/biz-ui/QuantityStepper.stories.tsx`, `meta.title`은 `core/biz-ui/Order/QuantityStepper`. 스토리 3종 (`Default` · `States` · `UnitsPerBox`).

**controlled 컴포넌트라 스토리마다 상태를 들려 줍니다.** `value`를 arg로 고정해 두면 버튼과 입력이 아무 반응도 없어 컴포넌트가 고장난 것처럼 보입니다. 파일 안의 `StatefulStepper`가 `useState`로 값을 들고, `Default`는 `key={args.value}`로 remount 해서 `value` 컨트롤을 바꿨을 때 다시 seed 되게 합니다. `States`는 재고 20개(`max=20`)를 가정하고 `null`(미주문) · `0`(의도적 0) · `2` · `21`(초과)로 네 state를 나열하며 — **`null`과 `0`이 갈리는 자리** — `UnitsPerBox`는 상자당 갯수 `10` · `20` · `30`에서 총계가 각각 달라지는 것을 봅니다.

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

- **2행 겹침을 `-mb-0.5` 대신 높이 고정으로 처리한 것은 계열 안에서 갈립니다.** 같은 「2행 스택」인 `OrderBoxCell` · `OrderDateInfo`는 Figma의 2px 겹침을 `-mb-0.5`로 그대로 옮겼고, 여기는 `MenuItem` 선례를 따라 높이를 고정했습니다. **총 높이는 62로 같고 행 간격만 2.6px 넓습니다.** 계열을 손볼 때 한쪽으로 모으는 것이 맞습니다.

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
