# BottomActionBar 구현 기록

`apps/biz-ui/src/components/BottomActionBar` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 이 컴포넌트 고유 사실만 둡니다.

Figma: [BottomSeet 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=159-1084&m=dev) (`159:1084`) 안의 `BottomActionBar` 프레임 `302:1351`, 컴포넌트 세트 `154:513`.

**같은 섹션에 BottomSheet가 함께 있지만 둘 사이에 의존이 없습니다.** BottomActionBar는 오버레이가 아니라 페이지 하단에 놓이는 바입니다.

## 구현 현황

| 컴포넌트          | 티켓       | 설명                                                       |
| ----------------- | ---------- | ---------------------------------------------------------- |
| `BottomActionBar` | DOTOLI-269 | `variant` 2종. `actions` 축을 `cancel` · `info` 유무로 파생 |

## Variant 축

| 축        | Figma 값                        | 구현                                   |
| --------- | ------------------------------- | -------------------------------------- |
| `variant` | `floating`(기본) · `solid`      | 그대로 prop                            |
| `actions` | `single` · `two` · `withInfo`   | **`cancel` · `info` 유무로 흡수**      |

심볼은 5개뿐입니다 — **`actions=withInfo, variant=solid`가 없습니다.**

| | `single` | `two` | `withInfo` |
| --- | --- | --- | --- |
| `floating` | `154:505` | `154:491` | `197:757` |
| `solid` | `154:509` | `154:498` | **없음** |

## 실측 스펙

| 항목       | 값                                                              |
| ---------- | --------------------------------------------------------------- |
| 바         | 380 × 92 → **`w-full`**. 380은 모바일 화면 폭이라 고정하지 않습니다 |
| 여백       | `px-[20px] pt-[12px] pb-[28px]` — 상하 비대칭                     |
| 정렬       | `items-center`                                                   |
| `gap`      | `two` 10 · `withInfo` 14                                         |
| 버튼       | 각 `min-w-0 flex-1`                                              |
| info 텍스트 | `body-semibold` (SemiBold 16 / lh 1.45 / ls -3%) · `blue/600` · `shrink-0` |

`92 = 12 + 52 + 28`이고 버튼 높이 52가 `CtaButton lg`입니다.

폭도 세 심볼 전부 340(= 380 - 20 × 2)으로 떨어집니다.

| 심볼        | 내부 배치                                    |
| ----------- | -------------------------------------------- |
| `single`    | 버튼 340                                     |
| `two`       | 165 + gap 10 + 165                           |
| `withInfo`  | 라벨 97(hug) + gap 14 + 버튼 229             |

### `variant`별 배경

| variant    | Figma                                                        | 구현                                                       |
| ---------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| `floating` | `linear-gradient(to top, base/white 86.184%, rgba(255,255,255,0))` | `bg-linear-to-t from-white from-[86.184%] to-white/0`      |
| `solid`    | `base/white` 단색                                             | `bg-white`                                                  |

**테두리도 그림자도 없습니다.** `solid`는 배경만 흰색이고, `BottomTab`의 `border-t border-gray-100 shadow-8`과 다릅니다.

**두 DS를 통틀어 첫 그라디언트입니다** — `apps/biz-ui` · `apps/internal-ui` 어디에도 `bg-gradient-*` / `bg-linear-*` 사용처가 0건이었습니다.

`86.184%`는 Figma 실측값 그대로입니다. 92 기준으로 79.29px이라 **페이드 구간이 12.7px ≈ 상단 여백 12**와 맞습니다. 바 높이가 콘텐츠로 정해지므로 px이 아니라 %로 둡니다.

**`to-transparent`가 아니라 `to-white/0`입니다.** CSS `transparent`는 `rgba(0,0,0,0)`이라 sRGB 보간에서 회색을 통과합니다. Figma가 지정한 값도 `rgba(255,255,255,0)`입니다.

### `CtaButton`이 그대로 맞습니다

`size='lg'`의 네 값이 Figma와 전부 일치합니다 — [`confirm-modal.md`](./confirm-modal.md)에서 확인한 것과 같은 대조라 여기서는 결론만 둡니다.

| 자리        | Figma                        | `CtaButton`                          |
| ----------- | ---------------------------- | ------------------------------------ |
| 확인 · 우측 | `blue/500` + `base/white`    | `theme='primary'` `variant='filled'` |
| 취소 · 좌측 | `gray/100` + `gray/800`      | `theme='gray'` `variant='tonal'`     |

바인딩된 hex가 기존 토큰과 전부 일치해 **신규 토큰이 없습니다.**

## 정책

섹션 안 주석 `524:17`이 **COM-005 버튼 상태 정책**을 정의합니다.

> `state=disabled`는 사용하지 않는다. 항상 `default`를 유지한다. 필수값 미입력 상태에서 CTA를 탭하면 — 화면 이동 없음 · 처리 없음 · 안내 토스트 노출 · 첫 번째 미입력 필드로 자동 스크롤 + 포커스.
>
> 의도 — 비활성 버튼은 무엇이 부족한지 알려주지 못한다. 누를 수 있게 두고 부족한 항목을 안내하는 방식이 인지 부담이 낮다.

## 결정

- **`actions` 축을 `cancel` · `info` 유무로 흡수했습니다.** `actions='two'`인데 두 번째 액션이 없으면 성립하지 않고, 액션만 주고 `actions`를 안 바꾸면 조용히 무시됩니다. 값이 항상 같이 움직여 축이 하나입니다 — [`ConfirmModal`](./confirm-modal.md)이 `btn` 축을 `cancel` 유무로 흡수한 것과 같은 기준이고, [`InfoBanner`](./info.md)의 `useAction` → `onClick`, [`StatusAlertBanner`](./status-alert-banner.md)의 `useDismiss` → `onDismiss`도 같은 계보입니다.

- **`disabled`를 열지 않았습니다.** COM-005가 `state=disabled`를 쓰지 않는다고 명시합니다. `CtaButton`은 `disabled` · `isPending`을 갖고 있지만 **바를 통해서는 도달할 수 없게 막았습니다** — 열어 두면 정책이 코드 밖 약속으로만 남습니다. 필수값 미입력 처리는 「누를 수 있게 두고 안내」라 `onClick` 안에서 소비 앱이 합니다.

- **`variant`는 흡수하지 않고 prop으로 뒀습니다.** `actions`와 달리 다른 prop에서 파생되지 않습니다 — 바가 스크롤 콘텐츠 위에 뜨는지, 콘텐츠 끝에 붙어 함께 흐르는지는 **그 화면의 레이아웃 사실**이라 DS가 알 수 없습니다.

- **`floating`에 `sticky bottom-0`을 함께 겁니다.** Figma 주석이 `floating`은 「영역 내 하단에 Sticky」, `solid`는 「scroll with parent」로 갈라 둡니다. 그라디언트는 **콘텐츠가 바 밑으로 지나갈 때만** 의미가 있어서 배경과 위치가 한 값입니다 — 따로 열면 소비자가 매번 짝을 맞춰야 합니다.

  `fixed`가 아니라 `sticky`인 것은 주석이 「**영역 내**」라고 못박아서입니다. 스크롤 컨테이너의 마지막 자식으로 두면 그대로 동작하고, 컨테이너가 없으면 문서 스크롤 기준으로 붙습니다. `z-index`는 걸지 않았습니다 — 마지막 자식이라 쌓임 순서로 이미 위입니다.

- **`pb-[28px]`을 그대로 두고 `safe-area-bottom`을 얹지 않았습니다.** [`BottomTab`](./bottom-tab.md) · `Toaster`가 그 유틸을 쓰는 것과 갈리는데, **그쪽은 Figma 하단 여백이 0**이라 더할 것이 명확했습니다. 여기는 12/28 비대칭이 이미 홈 인디케이터를 비켜 간 값으로 보이고, 두 클래스를 같이 걸면 `padding-bottom` 승자가 클래스 순서가 아니라 **CSS 소스 순서**로 정해져 예측이 안 됩니다. 아래 「디자인 확인 필요」에 올렸습니다.

- **`gap`을 조건 없이 겁니다.** `single`은 자식이 하나라 gap이 렌더에 드러나지 않습니다 — `ConfirmModal` · `FloatingPill`과 같은 판단입니다. 값만 `info` 유무로 갈립니다(10 ↔ 14).

- **`info`는 `string`이고 `whitespace-pre-line`으로 끊습니다.** Figma 마스터가 `<p>` 두 개로 명시적으로 끊어 뒀는데 문구가 소비자 값이라 끊는 위치를 DS가 정할 수 없습니다. 자연 접힘을 기본으로 두고 `\n`으로 지정할 수 있게 했습니다 — `ConfirmModal` · [`Notification`](./notification.md)의 `description`과 같은 처리입니다.

- **랜드마크를 만들지 않고 `<div>`입니다.** `<footer>`는 `<body>` 직계에서 `contentinfo`가 되는데 이 바는 문서 정보가 아니라 액션이고, `role='toolbar'`는 화살표 키 이동 기대가 따라붙습니다. [`BottomTab`](./bottom-tab.md)이 `<nav aria-label>`인 것은 그쪽이 실제로 내비게이션이라서입니다.

- **폴더는 단독입니다.** 이름이 `Bottom…`으로 겹치지만 `BottomTab`과 공유하는 조각이 없습니다 — `Badge` · `ConfirmModal` · `StatusAlertBanner` 선례입니다.

## API

| prop        | 필수 | 기본값       | 비고                                        |
| ----------- | ---- | ------------ | ------------------------------------------- |
| `confirm`   | ✅   | —            | `{ label, onClick }`. 단독 또는 **우측**    |
| `cancel`    |      | —            | 주면 **좌측**에 추가되고 `actions=two`가 됨 |
| `info`      |      | —            | 주면 **좌측**에 텍스트. `\n`으로 줄바꿈      |
| `variant`   |      | `'floating'` | `'floating'`은 `sticky` + 그라디언트         |
| `className` |      | —            | 바에 적용                                    |

```tsx
// single — 스크롤 콘텐츠 위에 뜬다
<BottomActionBar confirm={{ label: '확인', onClick: submit }} />

// two — 콘텐츠 끝에 붙어 함께 흐른다
<BottomActionBar
  cancel={{ label: '취소', onClick: back }}
  confirm={{ label: '확인', onClick: submit }}
  variant='solid'
/>

// withInfo
<BottomActionBar
  confirm={{ label: '확인', onClick: submit }}
  info={'3건, 24,000원\n선택됨'}
/>
```

## 디자인 확인 필요

| 항목                     | 내용                                                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `withInfo` × `solid`     | 심볼이 없습니다. 구현은 조합이 되는데 그라디언트 없이 흰 배경 위에 정보 + 버튼이 놓입니다. 쓰지 않을 조합인지 확인 필요        |
| 하단 safe area           | `pb-[28px]`이 iOS 홈 인디케이터(`env(safe-area-inset-bottom)` = 34)보다 작습니다. `BottomTab` · `Toaster`처럼 `safe-area-bottom`을 얹을지, 28로 충분한지 |
| `withInfo` 숨은 아이콘   | 마스터(`197:757`)에 `Leading icon / plus` 프레임이 **`hidden`으로** 들어 있습니다. 살릴 계획이 있는지                          |
| 긴 `info`                | 라벨이 `shrink-0`(Figma 그대로)이라 문구가 길면 버튼이 밀립니다. 상한을 둘지 말줄임할지                                       |
| 긴 버튼 라벨             | `two`에서 버튼 하나가 165px이고 `CtaButton lg`의 `px-[30px]`을 빼면 라벨 공간이 105px입니다. `h-[52px]` 고정이라 긴 라벨은 넘칩니다 |
| 상호작용 · 모션          | `hover` · `pressed`는 `CtaButton`이 갖고 있고, 바 자체의 등장/퇴장 모션은 정의가 없습니다                                      |

## Storybook

`apps/storybook/src/stories/biz-ui/BottomActionBar.stories.tsx`, `meta.title`은 `core/biz-ui/BottomActionBar`.

| 스토리     | 보는 것                                                          |
| ---------- | ---------------------------------------------------------------- |
| `Default`  | 컨트롤로 `variant` · `info`를 바꿔 본다                           |
| `Actions`  | `single` · `two` · `withInfo` 세로 비교                           |
| `Variants` | `floating` ↔ `solid` 배경 차이                                    |
| `Sticky`   | 스크롤 컨테이너 안에서 **그라디언트와 `sticky`가 실제로 드러나는 자리** |

`Sticky` 외에는 바가 정지 화면에 놓여 `floating`의 그라디언트가 흰 배경과 구분되지 않습니다.
