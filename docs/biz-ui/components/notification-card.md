# NotificationCard 구현 기록

`apps/biz-ui/src/components/NotificationCard` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 NotificationCard 고유 사실만 둡니다.

Figma: [조건 정의 프레임](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=606-2300&m=dev) (`606:2300`). **이 프레임이 유일한 기준입니다** — Info 섹션의 옛 심볼(`132:470`)은 조건 정의 전 스케치라 구성이 다릅니다(아래 「결정」).

## 구현 현황

| 컴포넌트           | 티켓       | 설명                                              |
| ------------------ | ---------- | ------------------------------------------------- |
| `NotificationCard` | DOTOLI-238 | 요소 6종 on/off. variant 축 없음. `IconCircle` · `CtaButton` 사용 |

## 요소

Figma 「속성 정의」(`590:2`)가 요소별 on/off로 정의합니다.

| 속성         | 요소                                             | Figma 기본값 |
| ------------ | ------------------------------------------------ | ------------ |
| `useIcon`    | 아이콘 (`IconCircle`)                            | true         |
| `useTitle`   | 타이틀                                           | true         |
| `useSubText` | 보조 텍스트                                      | true         |
| `useHistory` | 등록 이력. 포맷 `MM.DD HH:MM \| 등록자`          | false        |
| `usePeriod`  | 기간 표기가 필요한 경우                          | false        |
| `useAction`  | 사용자가 취할 행동. 문의하기 · 주문 보기 등      | false        |

**boolean prop을 만들지 않고 값 유무로 파생시켰습니다** (아래 「결정」). 컴포넌트 세트 `607:3159`의 심볼 16개는 뒤 4종의 2⁴ 조합이고, `useIcon` · `useTitle`은 거기서 항상 true로 고정돼 있습니다.

## 실측 스펙

| 영역        | 값                                                          |
| ----------- | ----------------------------------------------------------- |
| 루트        | `flex-v-stack items-center` · gap 12px · 문서 프레임 340px  |
| 헤더 블록   | `flex-v-stack items-center` · gap 10px                      |
| 텍스트 블록 | `flex-v-stack items-center` · gap 2px · 가운데 정렬          |
| 아이콘      | `IconCircle` `md`(48px) · weight `fill`                     |
| 타이틀      | `heading-4` · `gray/800`, 강조부는 `theme`이 정함 (아래)     |
| 보조 텍스트 | `body` · `gray/600`                                         |
| 이력 행     | `flex-h-stack-center` · gap 5px                             |
| 이력 시각   | `label` · `gray/500`                                        |
| 이력 구분선 | 1×12px · `gray/500`                                         |
| 이력 등록자 | `label` · `gray/700`                                        |
| 기간        | `label` · `blue/400`                                        |
| 액션        | `CtaButton` `sm` / `gray` / `outlined`                      |

전부 채운 심볼(`607:3148`)이 340×210입니다. 바인딩된 hex가 기존 토큰과 전부 일치해 신규 토큰이 없습니다.

### `theme` → 강조색

`theme`은 `IconCircle` 색과 **타이틀 강조색을 함께** 정합니다. `IconCircle`의 6종 중 `black`을 뺀 5종입니다.

| `theme`   | `IconCircle` 아이콘 | 타이틀 강조색           |
| --------- | ------------------- | ----------------------- |
| `primary` | `blue/300`          | `blue/600`              |
| `red`     | `red/200`           | `red/600`               |
| `yellow`  | `yellow/200`        | **`yellow/700`**        |
| `green`   | `green/200`         | `green/600`             |
| `gray`    | `gray/300`          | `gray/800` (= 타이틀색) |

**`yellow`만 700입니다.** **`gray`는 강조색이 타이틀색과 같아** 강조를 넣어도 시각적으로 나뉘지 않습니다 — 넣지 않아도 되고, 넣어도 결과가 같습니다.

## 결정

- **요소 6종을 boolean prop이 아니라 값 유무로 파생시켰습니다.** Figma가 `useIcon` · `useSubText` 식으로 정의했지만, 그대로 옮기면 `useSubText`와 `subText`를 짝으로 넘겨야 하고 둘이 어긋나는 상태(`useSubText: true` + `subText: undefined`)가 타입상 가능해집니다. 계열 전체가 같은 판단입니다 — `OrderBox`의 `items`, `OrderDateInfo`의 `deliveryInfo`, `OrderInputCard`의 `dateLabel`, `Divider`의 `label`. **Figma 기본값(`useIcon`·`useTitle`·`useSubText`가 true)은 넘어오지 않습니다** — 값을 안 주면 안 그립니다.
- **타이틀 강조는 `highlight` + `title` 두 prop입니다.** 심볼은 `<p>` 하나 안에 span 두 개(`고정주문` = 강조색, ` 시작` = 상속 `gray/800`)입니다. **나뉘지 않는 케이스가 있다고 확인받아서**(디자이너) `highlight`를 안 넘기면 `title` 한 색으로만 그립니다. 두 요소를 flex로 나란히 두지 않고 **한 `Typography` 안에 span으로 넣은 이유**는 강조부와 나머지가 같은 텍스트 흐름에서 함께 줄바꿈돼야 하기 때문입니다 — 분리하면 강조부만 다른 줄로 떨어집니다. `ReactNode`로 열지 않은 것은 색 결정이 소비처로 새어나가고 biz-ui에 ReactNode prop 선례가 없어서입니다.
- **사유 union을 두지 않고 `iconKey` · `theme`를 소비처가 넘깁니다.** 처음엔 Figma 「아이콘 매핑」(주문 중지 → `Pause` 등 5종)을 `reason` union으로 DS가 들었는데, **사유가 계속 늘어나서 그때마다 DS 배포가 필요한 구조**라 디자이너 확인 후 열었습니다. 그 매핑표는 이제 소비처가 참고하는 자료이지 DS 코드가 아닙니다.
- **강조색은 prop으로 열지 않고 `theme`에서 유도합니다.** 아이콘 색과 강조색이 따로 놀면 카드 하나에서 색이 두 갈래가 되는데, 실제로는 항상 같은 톤입니다. `theme` 하나가 둘을 다 정하므로 소비처가 어긋나게 조합할 방법이 없습니다 — `OrderBox`가 `tone`을 노출하지 않고 `variant`에서 유도한 것과 같은 처리입니다. `black`을 뺀 이유는 어두운 배경 전용이라 카드 위 강조색으로 쓸 수 없어서입니다.
- **기간이 액션 버튼보다 위입니다.** 옛 심볼(`132:470`)은 버튼 → 기간 순서였는데 조건 정의 프레임에서 뒤집혔습니다. `607:3148`에서 기간 `y=146`, 버튼 `y=178`입니다.
- **옛 심볼 하단의 회색 바(`173:703` 「Rectangle 679」)는 사라졌습니다.** DOTOLI-238 착수 전 「정체 확인 필요」로 올려 뒀던 항목인데, 16개 심볼 어디에도 없어 **조건 정의 과정에서 빠진 것**으로 봅니다. 구현하지 않았습니다.
- **아이콘 weight를 `fill`로 명시해 넘깁니다.** `IconCircle`은 `weight`를 넘기지 않으면 `Icon` 기본값 `bold`로 그리는데, **처음에 그걸 그대로 두고 실측하지 않았다가 디자이너 지적으로 바로잡았습니다.** Figma 심볼의 경로와 Phosphor 웨이트별 아트워크 종횡비를 비교하면 Figma 1.021 · `fill` 1.005 · `bold` 1.162 · `regular` 0.947로 `fill`에 붙습니다. `InfoItem`도 같은 이유로 명시해서 넘깁니다 — [info.md](./info.md).
- **이력 구분선은 `gray/500`입니다.** Figma가 회전된 선(`609:2111`)으로 그려 codegen이 `<img>`로 내보내는데, SVG의 `stroke="#8A93A8"`을 직접 읽어 확인했습니다. `1×12px` div로 그립니다 — `Divider`와 같은 이유로 `border`가 아니라 크기 있는 요소입니다.
- **텍스트 블록에 `text-center`를 겁니다.** `items-center`는 박스를 가운데로 밀 뿐이라, 문구가 접히면 줄들이 왼쪽 정렬로 남습니다.
- **폭을 선언하지 않고 `w-full`입니다.** 340px은 문서 값입니다.

## API

| prop          | 필수 | 기본값    | 비고                                           |
| ------------- | ---- | --------- | ---------------------------------------------- |
| `iconKey`     |      | —         | Phosphor 아이콘 키. 없으면 아이콘을 그리지 않음 |
| `theme`       |      | `primary` | 5종. 아이콘 색 + 타이틀 강조색                 |
| `highlight`   |      | —         | 타이틀 강조부. 색은 `theme`이 정함             |
| `title`       |      | —         | 타이틀 나머지. `gray/800`                      |
| `subText`     |      | —      | 보조 텍스트                                       |
| `history`     |      | —      | `{ registeredAt, registrant }`. 구분선은 DS가 그림 |
| `period`      |      | —      | 기간 문구. 포맷은 소비처가 만듦                   |
| `actionLabel` |      | —      | 있으면 버튼을 그림                                |
| `onAction`    |      | —      | 버튼 클릭                                         |
| `className`   |      | —      | 담는 쪽의 폭 지정용                               |

## 디자인 확인 필요

| 항목                  | 내용                                                                                                            |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 강조부 위치           | 예시가 전부 앞쪽 강조(`고정주문` + `시작`)입니다. 뒤나 가운데를 강조하는 케이스가 나오면 API를 다시 봐야 합니다. **[`Toast`](./toast.md)가 DOTOLI-285에서 같은 구조의 `highlight`를 갖게 돼 제약을 공유합니다 — 넓힐 때 고를 방향은 그쪽 「결정」에 있습니다** |
| 이력 포맷             | `MM.DD HH:MM \| 등록자` 조립을 DS가 아니라 소비처가 합니다. 포맷이 고정이면 DS로 옮기는 것이 맞습니다             |

## Storybook

`apps/storybook/src/stories/biz-ui/NotificationCard.stories.tsx`, `meta.title`은 `core/biz-ui/NotificationCard`. 스토리 4종 (`Default` · `Themes` · `Combinations` · `TitleVariants`). 데코레이터로 문서 프레임과 같은 `w-[340px]`을 겁니다. `Themes`는 5종을 세로로 쌓아 **아이콘 색과 강조색이 같은 톤으로 함께 바뀌는 것**과 `gray`에서 강조가 사라지는 것을 봅니다.

`Combinations`만 **4×4 그리드**입니다. 세로로 쌓으면 문서 높이가 3천 px을 넘어 한눈에 안 들어옵니다. **행/열 구성을 Figma `606:2300`과 똑같이 맞춰서**(행 = 보조텍스트·이력, 열 = 기간·액션) `#N` 번호가 Figma와 1:1로 대응합니다 — 대조할 때 눈으로 짝을 찾지 않아도 됩니다. 조합은 `ROW_PARTS` × `COLUMN_PARTS`로 만들어 16개를 손으로 나열하지 않습니다.

**카드 폭은 4열에서도 340px 그대로입니다.** 열을 `grid-cols-[repeat(4,340px)]`로 고정하고 넘치는 만큼(4×340 + gap = 1420px) **컨테이너가 가로로 스크롤**합니다. 열 폭을 캔버스에 맞춰 나누면 카드가 297px로 줄어 Figma 심볼과 다른 폭이 되고, 그러면 이 스토리로는 줄바꿈·간격을 대조할 수 없습니다. 페이지 전체가 아니라 그리드를 감싼 `overflow-x-auto` 안에서만 스크롤합니다.

`w-[340px]` 데코레이터는 meta가 아니라 `Default` · `Themes` · `TitleVariants`에만 붙어 있습니다 — meta에 두면 story 데코레이터가 안쪽에서 실행돼 `Combinations`에서 폭 제한을 되돌릴 수 없습니다.

`TitleVariants`는 디자이너가 말한 「나뉘지 않는 케이스」를 나란히 놓고 봅니다.
