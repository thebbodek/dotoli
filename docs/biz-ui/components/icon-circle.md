# IconCircle 구현 기록

`apps/biz-ui/src/components/IconCircle` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 IconCircle 고유 사실만 둡니다.

Figma: [Info 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=177-520&m=dev) (`177:520`). 실제 값은 컴포넌트 세트 `179:555`에서 실측했습니다.

## 구현 현황

| 컴포넌트     | 티켓       | 설명                                                    |
| ------------ | ---------- | ------------------------------------------------------- |
| `IconCircle` | DOTOLI-234 | `size` 2 × `theme` 6. 12조합 전수 실측. 상태 축 없음   |

Info 섹션에서 **가장 먼저 넣었습니다.** `NotificationCard`(DOTOLI-238)가 인스턴스 `179:605`로 물고 있어서입니다.

## Variant 축

| 축      | 값                                                          |
| ------- | ----------------------------------------------------------- |
| `size`  | `md` · `sm`                                                 |
| `theme` | `primary` · `red` · `yellow` · `green` · `gray` · `black`   |

기본값은 Figma 세트의 첫 심볼(`179:554`)을 따라 `size='md'` · `theme='primary'`입니다.

## 실측 스펙

| 항목        | `md`         | `sm`         |
| ----------- | ------------ | ------------ |
| 박스        | `size-[48px]` | `size-[30px]` |
| radius      | 16 → `rounded-16` | 10 → `rounded-10` |
| 아이콘      | `text-[28px]` | `text-[20px]` |

| `theme`   | 배경         | 아이콘     |
| --------- | ------------ | ---------- |
| `primary` | `blue/100`   | `blue/300` |
| `red`     | `red/50`     | `red/200`  |
| `yellow`  | `yellow/50`  | `yellow/200` |
| `green`   | `green/50`   | `green/200` |
| `gray`    | `gray/100`   | `gray/300` |
| `black`   | `base/black` | `blue/400` |

`black`을 뺀 11조합은 기존 컬러 스케일과 hex까지 일치합니다. **`base/black`만 신규 토큰입니다** — [frontend.md](../frontend.md) 「특이사항」.

Storybook 렌더의 계산값으로 12조합을 전수 대조했고 박스·radius·font-size·배경·글자색이 전부 일치합니다.

## 결정

- **`base/black`은 토큰을 새로 만들었습니다.** `base/white`는 Figma 값이 `#ffffff`라 Tailwind 기본값을 그대로 썼지만(→ [button.md](./button.md) 「계열 공통 결정」), `base/black`은 `#101828`이라 Tailwind 기본 `black`(`#000000`)과 **다릅니다.** 같은 처리를 할 수 없어 `--color-black`으로 덮어썼습니다. 이름을 `base-black` 같은 것으로 피하지 않은 이유는 「컬러 이름은 Figma 명명 그대로」라는 기존 규칙 때문이고, `white`가 `COLOR_VARIANTS.WHITE = 'white'`인 것과도 짝이 맞습니다.
- **아이콘 크기를 `font-size`로 줍니다.** Phosphor가 아이콘 폰트라 글리프 크기가 `font-size`를 따릅니다 — `ButtonIcon`과 같은 방식이고, 그래서 `ICON_CIRCLE_SIZE_STYLES`가 `CONTAINER`와 `ICON`을 나눠 갖습니다. 색도 같은 원리로 컨테이너의 `text-*`가 아이콘에 상속됩니다.
- **아이콘을 prop으로 받고 색은 받지 않습니다.** Figma 주석 `355:1203`이 「색-고정 / 아이콘- bold, filled 로 모두 사용 가능」입니다. `iconKey`·`weight`는 `Pick<IconProps, …>`로 그대로 열고, 색은 `theme`이 고정합니다.
- **표시 전용이라 `<div>`입니다.** Figma에 상태 축(hover·pressed·disabled)이 없습니다. 누르는 자리는 `IconButton`이 이미 맡고 있어 여기서 상호작용을 열지 않았습니다.
- **`shrink-0`은 Figma에 없고 제가 더한 유일한 클래스입니다.** 심볼 컨테이너에는 없지만, 고정 48px 박스가 flex row의 자식이 되면 기본값 `shrink: 1`로 찌그러져 **실측 크기가 오히려 깨집니다.** 계열 선례도 같습니다 — `OrderInputCard`의 요일 뱃지(`size-[40px] shrink-0`) · `INPUT_MESSAGE_ICON_STYLE` · `INPUT_FIELD_CARET_STYLE`이 전부 `shrink-0`입니다.
- **아이콘에 `aria-hidden`을 고정하고 `title`을 열지 않았습니다.** 이 컴포넌트는 **접근성 이름을 가질 수 없습니다** — 의미는 옆 텍스트가 집니다. biz-ui에서 `Icon`을 직접 쓰는 자리가 전부 이 전제입니다(`InputMessage` · `InputField`의 리딩 아이콘은 버튼이 아닌데도 `aria-hidden`입니다). 첫 소비처인 `NotificationCard`도 아이콘 아래 타이틀·본문이 있어 맞습니다. **아이콘이 유일한 의미 전달자인 자리가 나오면 그때 `title`을 여는 게 아니라 이 결정부터 다시 봅니다.**
- **`iconClassName`은 DOTOLI-266에서 열었습니다.** [`Toast`](./toast.md)의 `status='loading'`이 **글리프만 360도 회전**시켜야 하는데, radius 10의 라운드 사각형이라 컨테이너째 돌리면 배경 모서리가 같이 돕니다. 기존 `className`은 컨테이너용이라 `Icon`에 도달할 수단이 없었습니다. 내부 노드로 가는 className 통로라 [`Overlay`](./overlay.md)의 `contentClassName`과 같은 성격이고 이름 규칙(`<대상>ClassName`)도 그쪽을 따랐습니다.
- **`theme` 값을 `IconCircle/` 아래 따로 정의합니다.** `IconButton`의 `theme`(`default`·`filled`·`dark`)과 값이 전혀 겹치지 않고, `Badge`의 5종과는 겹치되 `black`이 추가로 있습니다 (CLAUDE.md 「컴포넌트 API」).
- **이름은 `IconCircle`이지만 원이 아닙니다.** radius가 16/10이라 실제로는 라운드 사각형입니다. Figma 심볼명을 따르는 규칙대로 그대로 뒀습니다 — `OrderBoxCell`(Figma 오타 `OrderBoxSell`)처럼 **오기가 아니라 디자이너가 의도한 이름**이라 바로잡을 대상이 아닙니다.

## API

| prop        | 필수 | 기본값    | 비고                                    |
| ----------- | ---- | --------- | --------------------------------------- |
| `iconKey`   | ✅   | —         | Phosphor 아이콘 키                      |
| `weight`    |      | `bold`    | `Icon` 기본값. `fill`도 사용 가능       |
| `size`      |      | `md`      | 2종                                     |
| `theme`     |      | `primary` | 6종                                     |
| `className` |      | —         | 담는 쪽의 레이아웃 보정용               |
| `iconClassName` |  | —         | 글리프에만 거는 클래스 (DOTOLI-266)     |

## 디자인 확인 필요

| 항목            | 내용                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------- |
| `base/white-85` | Color 페이지 base 그룹에 `#ffffffd9`가 같이 추가됐지만 쓰는 컴포넌트가 없어 토큰을 만들지 않았습니다 |
| `black` 아이콘 색 | 6종 중 `black`만 아이콘이 배경과 다른 계열(`blue/400`)입니다. 의도된 것인지                |

## Storybook

`apps/storybook/src/stories/biz-ui/IconCircle.stories.tsx`, `meta.title`은 `core/biz-ui/IconCircle`. 스토리 3종 (`Default` · `Matrix` · `Weights`). `Matrix`는 Figma 문서 프레임과 같은 배치(행 = `size`, 열 = `theme`)로 12조합을 깔고, `Weights`는 주석 `355:1203`이 말하는 `bold`·`fill` 둘 다 렌더되는지 봅니다.
