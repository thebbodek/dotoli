# StatusAlertBanner 구현 기록

`apps/biz-ui/src/components/StatusAlertBanner` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 이 컴포넌트 고유 사실만 둡니다.

Figma: [StatusAlertBanner 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=269-973&m=dev) (`269:973`), 컴포넌트 세트 `269:1060`.

**위를 가리키는 꼬리가 달린 짙은 배너**입니다. 같은 배치의 `InfoBanner`와 이름이 비슷하지만 구조가 반대입니다 — 그쪽은 폭을 채우고 배너 전체가 탭 대상이 될 수 있는 반면, 여기는 콘텐츠만큼만 차지하고 **안에 버튼을 최대 2개 담습니다.**

## 구현 현황

| 컴포넌트            | 티켓       | 설명                                            |
| ------------------- | ---------- | ----------------------------------------------- |
| `StatusAlertBanner` | DOTOLI-261 | `theme` 4종 × 액션·닫기 조합. 단독 폴더         |

폴더는 계열 없이 단독입니다 — 이름 프리픽스가 `Info`도 `Button`도 아니고, `Badge` · `NotificationCard` · `Tag` 선례를 따릅니다.

## Variant 축

Figma 심볼은 **12개**입니다. `theme` 4 × 조합 3이고 **2×2가 아닙니다.**

| `useAction` | `useDismiss` | 심볼 폭 |
| ----------- | ------------ | ------- |
| `true`      | `true`       | 285     |
| `false`     | `true`       | 249     |
| `false`     | `false`      | 223     |

**`useAction=true` + `useDismiss=false` 조합이 없습니다.** 아래 「결정」에서 다룹니다.

`theme`은 `primary` · `yellow` · `red` · `green` 4종이고 **`InfoBanner`와 달리 `gray`가 없습니다.** `hover` · `pressed` · `disabled` 축도 없습니다.

## 실측 스펙

| 항목        | 값                                                            |
| ----------- | ------------------------------------------------------------- |
| 배경        | `base/black` → `bg-black` (`#101828`)                          |
| radius      | 6 → `rounded-6`                                                |
| padding     | `px-[13px] py-[8px]`                                           |
| gap         | 루트 12 · 아이콘/문구 그룹 4                                    |
| 높이        | 36 — 고정값이 아니라 `8 + 20.3 + 8`의 자연 높이                 |
| 폭          | 285 / 249 / 223 — **hug** → `w-fit`                            |
| 아이콘      | 16px · weight `fill` · 테마별 색                                |
| 문구        | `label-bold` (Bold 14 / lh 1.45 / ls -3%) · `base/white` · 한 줄 |
| 액션        | 「보기」 · `label-bold` · `blue/600` · 24×20 hug                 |
| 닫기        | `x` 14px                                                        |
| 꼬리        | 16×10 · `left: 14` · `top: -6`                                  |

테마가 바꾸는 것은 **아이콘 하나뿐**입니다. 배경 · 문구 색 · 액션 색은 4종 모두 같습니다.

| `theme`   | 아이콘          | 색            |
| --------- | --------------- | ------------- |
| `primary` | `info`          | `blue/300`    |
| `yellow`  | `warning-octagon` | `yellow/200`  |
| `red`     | `warning-octagon` | `red/200`     |
| `green`   | `check-circle`  | `green/200`   |

**색 스케일이 비대칭입니다** — `primary`만 300이고 나머지 셋은 200입니다. 아래 「디자인 확인 필요」에 올렸습니다.

바인딩된 hex가 기존 토큰과 전부 일치해 **신규 토큰이 없습니다.**

### 아이콘은 레이어명이 아니라 렌더로 판정했습니다

Figma 인스턴스 레이어명이 셋 다 `WarningOctagon`인데 **실제 글리프는 갈립니다.** 인스턴스를 교체하면서 이름이 따라오지 않은 것으로 보입니다.

| `theme`   | 레이어명          | 렌더 확대     | 확정            |
| --------- | ----------------- | ------------- | --------------- |
| `primary` | `Info`            | ⓘ             | `info`          |
| `yellow`  | `WarningOctagon`  | 팔각형 + !    | `warning-octagon` |
| `red`     | `WarningOctagon`  | 원형처럼 보임 | **`warning-octagon`** — 디자이너 확정 |
| `green`   | `WarningOctagon`  | 원형 + 체크   | **`check-circle`** — 디자이너 확정 |

`red` · `green`은 16px 렌더만으로는 단정할 수 없어 디자이너에게 확인받은 값입니다. `red`는 제가 원형(`warning-circle`)으로 읽었으나 **팔각형이 맞다고 확정**됐습니다.

키 3종 모두 `IconProps['iconKey']`(= `PhosphorIcon['name']`) 타입을 통과하므로 존재하는 아이콘입니다.

## 결정

- **`useAction` · `useDismiss` 축을 콜백 유무로 흡수했습니다.** `onAction` · `onDismiss`가 있으면 해당 버튼을 렌더합니다. 스위치와 핸들러가 항상 같이 움직여 축이 하나이고, 같은 배치의 [`InfoBanner`](./info.md)와 `Overlay`([overlay.md](./overlay.md))가 이미 이 형태입니다.

- **Figma에 없는 「액션만 있고 닫기 없음」을 타입으로 막지 않았습니다.** 판별 유니온으로 계단을 강제할 수는 있지만, **조합이 없는 것이 규칙인지 그리지 않은 것뿐인지 알 수 없습니다.** 의미상 성립하는 형태(닫을 수 없는 안내 + 보기 링크)라 막을 근거가 약하고, 나중에 풀어 주는 쪽이 조이는 쪽보다 소비자를 안 깨뜨립니다. 아래 「디자인 확인 필요」에 올렸습니다.

- **`CtaButton`을 쓰지 않고 맨 `<button>`으로 그렸습니다.** Figma 액션은 `CtaButton` 인스턴스지만 **24×20 hug에 패딩이 없어** 기구현 `CtaButton`의 최소 사이즈(`sm` = `h-[32px] px-[12px]`)와 맞지 않습니다. 색은 `variant='text'` + `theme='primary'`의 `text-blue-600`과 **정확히 같아서**, 크기만 어긋납니다. 사이즈를 새로 열면 계열 전체에 영향이 가므로 이번엔 문구 버튼으로 두고 확인 항목에 올렸습니다.

- **꼬리는 SVG가 아니라 `clip-path` 삼각형입니다.** Figma는 `Polygon 1`(16×10)을 절대배치로 얹습니다. `[clip-path:polygon(50%_0%,100%_100%,0%_100%)]`로 그리면 에셋이 늘지 않습니다. `aria-hidden`입니다.

  **색은 `bg-black`을 다시 적지 않고 `bg-inherit`으로 물려받습니다.** 두 곳에 같은 값을 적으면 소비자가 `className`으로 배경을 덮어썼을 때 **꼬리만 원래 색으로 남습니다.** 지금은 배경이 테마 불변이라 드러나지 않지만, 한 단어로 막을 수 있는 어긋남이라 미리 맞췄습니다.

- **꼬리 위치를 `left-[14px]`로 고정했습니다.** Figma 값 그대로입니다. 툴팁처럼 무언가를 가리키는 형태라 대상에 맞춰 움직여야 할 가능성이 큰데, **사용예시가 없어 판단할 수 없습니다.** 필요해지면 prop으로 여는 쪽이지 지금 추측으로 열지 않습니다.

- **폭을 채우지 않고 hug입니다 — `w-fit`.** Figma 심볼이 문구 길이를 따라 285 / 249 / 223으로 갈리고 문구에 nowrap이 걸려 있습니다. **`InfoBanner`(`w-full` + 줄바꿈)와 정반대**입니다.

  **다만 `max-w-full` + `truncate`로 안전망을 뒀습니다 — Figma를 그대로 옮기지 않은 유일한 항목입니다.** hug + nowrap만 두면 긴 문구가 뷰포트를 넘어가고, 모바일 WebView 단일 타깃이라 그대로 `body` 가로 스크롤이 됩니다. `Tag`도 `w-fit` + nowrap이지만 **그쪽은 wrap 컨테이너 안에 여러 개 놓이는 형태라 넘쳐도 그룹 안에서 끝나고**, 이쪽은 꼬리로 대상을 가리키는 단독 배치라 조건이 다릅니다.

  안전망은 **짧은 문구에서 아무 일도 하지 않습니다** — `w-fit`이 그대로 hug하고 `max-w-full`은 부모 폭에서만 걸립니다. 길 때만 말줄임으로 degrade 하므로 Figma 동작을 깨지 않습니다. 계열 안의 같은 처리는 `HeaderBar`의 `min-w-0 truncate`입니다. 실제 문구 길이 가이드는 「디자인 확인 필요」에 남겼고, `LongMessage` 스토리가 이 동작을 보여줍니다.

- **`role` · `aria-live`를 통로로 엽니다.** 이름이 「StatusAlert」이고 조건부로 나타나는데 맨 `<div>`라 보조기술에 아무것도 announce되지 않습니다. **`status`(공손)냐 `alert`(단호)냐는 쓰는 맥락이 정할 일**이라 DS가 하드코딩하지 않고 통로만 엽니다 — CLAUDE.md 「네이티브 통로는 열고, 결정은 열지 않습니다」. `Typography`가 같은 두 속성을 `Pick`으로 여는 선례입니다.

- **액션 라벨 「보기」를 DS가 소유합니다.** Figma 심볼 4종이 전부 「보기」 하나뿐이라 소비자가 정할 것이 없습니다. `HeaderBar`의 `HEADER_BAR_BACK_LABEL` · `HEADER_BAR_CLOSE_LABEL`과 같은 쪽이고, `NotificationCard`(`actionLabel` prop) · internal-ui `Toast`(`actionOption.label`)와는 갈립니다. **문구가 여러 개로 늘어나면 그때 엽니다** — 지금 열면 `onAction` 유무가 렌더를 결정하는 구조에 축이 하나 더 붙습니다.

- **아이콘 박스를 `size-*`로 함께 고정했습니다 — 아이콘 폰트가 로드되는 동안의 레이아웃 시프트를 막는 용도입니다.** Phosphor 글리프의 advance는 **1em이라 로드가 끝나면 `text-[16px]`만으로도 박스가 정확히 16**이 됩니다(SVG 폰트의 `horiz-adv-x`가 공백 글리프 하나를 빼고 전부 1024 = 1em). 문제는 그 전입니다 — `@phosphor-icons/web`이 `font-display: block`이라 스왑 전에는 **폴백(Pretendard)의 advance가 박스**가 되고, 실측하면 `text-[16px]`가 **13.84**로 잡혀 문구가 2px 왼쪽에서 시작했다가 스왑 순간 제자리로 튑니다. `size-*`를 걸면 로드 전후가 둘 다 16 · 14로 같습니다.

  **그래서 최종 렌더는 `size-*` 유무와 무관하게 동일합니다.** `InfoBanner`의 「글리프 advance(13)가 박스가 된다」 주석도 같은 현상을 가리키는데, 원인이 Phosphor advance가 아니라 **폴백 폰트**라 문구가 정확하지 않습니다.

- **높이를 고정하지 않았습니다.** 36은 `py-[8px]` + `label-bold` 행높이(20.3)의 자연 높이입니다. 테두리가 없어 `MenuItem` · `CollapseButton`처럼 stroke를 보정할 일도 없습니다.

- **루트 gap을 12로 통일했습니다.** Figma는 「액션·닫기 둘 다 없음」일 때만 8인데, **그 경우 루트의 플렉스 자식이 하나뿐이라 gap이 렌더에 드러나지 않습니다**(꼬리는 `absolute`라 플렉스 흐름 밖). 값을 나눠 들 이유가 없어 하나로 뒀습니다.

- **배너 자체는 버튼이 아닙니다.** [`InfoBanner`](./info.md)는 「선택영역 배너 전체」 주석 때문에 전체가 `<button>`이 될 수 있는데, 여기는 안에 버튼이 둘이라 그럴 수 없습니다. 중첩 버튼이 애초에 불가능한 구조입니다.

- **닫기 버튼에 `aria-label='닫기'`를 답니다.** 아이콘만 있어 이름을 스스로 만들 수 없습니다. [`Tag`](./tag.md)가 `` `${label} 제거` ``로 같은 처리를 하고, `Overlay` 배경도 `aria-label='닫기'`입니다. 액션 버튼은 「보기」 텍스트가 곧 이름이라 따로 붙이지 않았습니다.

- **버튼 둘에 `TOUCH_TARGET_STYLE`(6px)을 걸었습니다.** 판단 기준은 CLAUDE.md 「히트 영역 확장」이고, 여기 남기는 것은 실측값입니다. 시각 크기가 곧 히트 영역이면 보기 23.38×20.3 · 닫기 14×14로 **둘 다 WCAG 2.5.8 미달**이라 확장 대상이 됐고, `TOUCH_TARGET_NARROW_STYLE`(4px)로는 닫기가 22×22에서 멈춰 6px을 택했습니다 — 보기 35.38×32.3 · 닫기 26×26이 됩니다.

  버튼 사이 gap이 12라 두 확장이 **정확히 맞닿는** 쪽을 감수한 사례입니다. 배너 안쪽으로는 위아래 2px · 오른쪽 7px이 남아 넘치지 않고, 문구와는 6px 떨어져 문구 위를 덮지 않습니다(`elementFromPoint`로 확인).

  **`relative`는 버튼에 겁니다.** 배너 루트가 꼬리 때문에 이미 `relative`라, 안 걸면 `::before`가 배너 전체를 덮어 **배너 아무 데나 눌러도 버튼이 눌립니다.**

- **`transition`을 걸지 않았습니다.** 상태 축도 모션 정의도 없습니다 ([tag.md](./tag.md) · [menu-item.md](./menu-item.md)와 같은 판단).

- **`ref`를 열지 않았습니다.** 루트가 `<div>`라 버튼 계열의 `RefAttributes<HTMLButtonElement>` 관례가 적용되지 않고, 내부 버튼 둘 중 어느 것을 가리킬지도 정할 수 없습니다. 필요가 확인되면 그때 엽니다.

## API

| prop        | 필수 | 기본값    | 비고                                              |
| ----------- | ---- | --------- | ------------------------------------------------- |
| `message`   | ✅   | —         | 한 줄 안내 문구. 길면 말줄임                       |
| `theme`     |      | `primary` | 4종. 아이콘만 바뀜                                 |
| `onAction`  |      | —         | 주면 「보기」 버튼 노출. 라벨은 DS 소유             |
| `onDismiss` |      | —         | 주면 닫기(`x`) 버튼 노출                           |
| `role`      |      | —         | `status` · `alert` 등. 쓰는 쪽이 정함              |
| `aria-live` |      | —         | `role`과 함께 쓰는 통로                            |
| `className` |      | —         | 여백 보정용. **배치는 래퍼로** (아래)              |

**`className`으로 위치를 잡을 수 없습니다.** 꼬리 때문에 베이스에 `relative`가 박혀 있고, Tailwind는 position 유틸을 `static → fixed → absolute → relative → sticky` 순으로 출력하므로 **클래스 순서와 무관하게 `relative`가 이깁니다.** 띄워서 배치해야 하면 담는 쪽에 래퍼를 두고 래퍼를 `absolute`로 잡습니다.

## 디자인 확인 필요

| 항목               | 내용                                                                                        |
| ------------------ | --------------------------------------------------------------------------------------------- |
| 꼬리 위치          | `left: 14` 고정입니다. 가리킬 대상에 맞춰 움직여야 하는지                                      |
| 사용예시           | 아직 못 봤습니다. 문구 길이 · 배치 · 꼬리 대상이 전부 여기서 정해집니다                        |
| 문구 길이          | hug이라 길면 화면 폭에서 멈추고 말줄임됩니다. 최대 길이 가이드가 있는지, 말줄임이 맞는지        |
| 히트 영역 확장     | Figma 주석이 없는데 **넣었습니다**(6px). 시각 크기대로면 보기 23.38×20.3 · 닫기 14×14로 둘 다 WCAG 2.5.8 미달이라서입니다. 확장을 원치 않으면 알려 주세요 — 다만 그 경우 Figma에서 두 버튼을 키워야 합니다 |
| 액션 버튼 크기     | Figma가 `CtaButton` 인스턴스인데 24×20 hug이라 기구현 `sm`(32px)과 안 맞습니다                 |
| 테마 색 스케일     | `primary`만 `blue/300`이고 나머지는 `*/200`입니다. 의도인지 (`InfoBanner`도 유사한 비대칭)      |
| 조합               | 「액션만 있고 닫기 없음」이 세트에 없습니다. 금지인지 안 그린 것인지                            |
| 상호작용           | `hover` · `pressed` · `disabled` · 모션 정의가 없습니다                                        |
| Figma 변수 중복    | 같은 `primary` 아이콘이 심볼에 따라 `blue/300`(`#97befa`)과 `Blue/Blue 300`(`#8CB8FF`)로 갈립니다. 후자는 다른 라이브러리 변수로 보여 토큰(`blue-300`)을 따랐습니다 |

## Storybook

`apps/storybook/src/stories/biz-ui/StatusAlertBanner.stories.tsx`, `meta.title`은 `core/biz-ui/StatusAlertBanner`. 꼬리가 박스 위로 6px 나오므로 데코레이터로 `pt-[10px]`을 깔아 잘리지 않게 합니다.

| 스토리         | 보는 것                                                        |
| -------------- | -------------------------------------------------------------- |
| `Default`      | 컨트롤 패널. Figma 기본 variant와 같이 액션·닫기 둘 다 노출     |
| `Themes`       | 4종 아이콘과 색                                                 |
| `Combinations` | Figma에 있는 조합 3개를 그대로                                  |
| `LongMessage`  | 380px 안에서 **배너가 화면 폭에서 멈추고 말줄임되는 것** — `max-w-full` + `truncate` 안전망의 실물 |
