# Order 계열 구현 기록

`apps/biz-ui/src/components/Order` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 Order 계열 고유 사실만 둡니다.

Figma: [Order 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=203-847&m=dev) (`203:847`). 섹션 안의 `302:1434`(OrderBoxCell) · `302:1451`(OrderBox) · `302:1631`(OrderDateInfo) · `302:1573`(QuantityStepper) · `302:1204`(OrderInputCard)는 전부 문서용 프레임이고, 실제 값은 각 컴포넌트 세트에서 실측합니다.

## 구현 현황

| 컴포넌트          | 티켓       | 설명                                                        |
| ----------------- | ---------- | ----------------------------------------------------------- |
| `OrderBoxCell`    | DOTOLI-229 | `tone` 3종. 박스수 + 품목명 2행                             |
| `OrderBox`        | DOTOLI-230 | 미구현                                                      |
| `OrderDateInfo`   | DOTOLI-231 | 미구현                                                      |
| `QuantityStepper` | DOTOLI-232 | 미구현                                                      |
| `OrderInputCard`  | DOTOLI-233 | 미구현                                                      |

## 계열 공통 결정

- **`shared/`를 아직 열지 않았습니다.** Button 계열은 `ButtonIcon`이, Input 계열은 테두리·메시지 슬롯이 착수 시점에 이미 공유가 확정돼 있었는데 Order는 그렇지 않습니다. OrderBox가 `OrderBoxCell`을 **인스턴스로** 쓰는 관계라 공통 조각이 아니라 조합이고, 나머지 셋은 서로 겹치는 조각이 없습니다. 실제로 겹치는 것이 나오면 그때 엽니다 (CLAUDE.md [코드 규칙] 1).

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

### 디자인 확인 필요

| 항목               | 내용                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| `inverse` 사용처   | 어두운 배경 위에서 쓴다는 것만 확인했고 [고객 비즈 파일](https://www.figma.com/design/LomGIAwvPAkyRbBcGbk9rs/%EA%B3%A0%EA%B0%9D-%EB%B9%84%EC%A6%88?node-id=1239-18608&m=dev) (`1239:18608`)은 실측하지 못했습니다. 배경색과 대비를 확인해야 합니다 |
| 폭 92 / 110        | `min-w` 92px · `max-w` 110px의 근거가 문서에 없습니다. OrderBox 338px에서 3열이 되는 값이긴 합니다 |
| `inverse` 2행 색   | 1행과 2행이 모두 `base/white`라 `default`·`muted`처럼 위계가 없습니다. 의도인지 확인 필요          |

### Storybook

`apps/storybook/src/stories/biz-ui/OrderBoxCell.stories.tsx`, `meta.title`은 `core/biz-ui/Order/OrderBoxCell`. 스토리 2종 (`Default` · `Tones`). `inverse`는 `bg-gray-900` 데코레이터를 깔고 봅니다 — `Default`에서 컨트롤로 `inverse`를 골라도 배경이 따라붙습니다.
