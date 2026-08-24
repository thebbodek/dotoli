# BottomActionBar 구현 기록

`apps/biz-ui/src/components/BottomActionBar` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 이 컴포넌트 고유 사실만 둡니다.

Figma: [BottomSeet 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=159-1084&m=dev) (`159:1084`) 안의 `BottomActionBar` 프레임 `302:1351`, 컴포넌트 세트 `154:513`.

**같은 섹션에 BottomSheet가 함께 있지만 둘 사이에 의존이 없습니다.** BottomActionBar는 오버레이가 아니라 페이지 하단에 놓이는 바입니다.

## 구현 현황

| 컴포넌트          | 티켓       | 설명                                                       |
| ----------------- | ---------- | ---------------------------------------------------------- |
| `BottomActionBar` | DOTOLI-269 | `variant` 2종. `actions` 축을 `subAction` · `info` 유무로 파생 |

## Variant 축

| 축        | Figma 값                        | 구현                                   |
| --------- | ------------------------------- | -------------------------------------- |
| `variant` | `floating`(기본) · `solid`      | 그대로 prop                            |
| `actions` | `single` · `two` · `withInfo`   | **`subAction` · `info` 유무로 흡수**      |
| 버튼 모양 | 심볼마다 인스턴스로 갈아 끼움    | DOTOLI-277에서 `variant`·`theme`·`size`·아이콘을 `action`·`subAction`에 엶 |

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

- **`actions` 축을 `subAction` · `info` 유무로 흡수했습니다.**(DOTOLI-269 당시 이름은 `cancel`, DOTOLI-277에서 개명) `actions='two'`인데 두 번째 액션이 없으면 성립하지 않고, 액션만 주고 `actions`를 안 바꾸면 조용히 무시됩니다. 값이 항상 같이 움직여 축이 하나입니다 — [`ConfirmModal`](./confirm-modal.md)이 `btn` 축을 `cancel` 유무로 흡수한 것과 같은 기준이고, [`InfoBanner`](./info.md)의 `useAction` → `onClick`, [`StatusAlertBanner`](./status-alert-banner.md)의 `useDismiss` → `onDismiss`도 같은 계보입니다.

- **`subAction`과 `info`는 둘 중 하나만 넘깁니다 — 타입으로 막지 않고 계약으로 둡니다.** 왼쪽 자리 하나를 두 prop이 나눠 쓰는데, `actions` 축이 `single | two | withInfo` 배타라 **둘을 함께 준 상태는 Figma에 없습니다.** 구현은 둘 다 렌더합니다.

  강제하려면 `BottomActionBarProps`를 유니온으로 갈라야 하는데, [`CalendarDayButton`](./calendar.md)에서 「하나 이상」을 유니온으로 강제했다가 **`Meta<…Props>`가 유니온이 되면서 Storybook `render` 인자 추론이 깨져 되돌린 기록**이 있고 여기도 `satisfies Meta<BottomActionBarProps>`라 같은 자리에서 같은 방식으로 깨집니다. 런타임에서 한쪽만 그리는 방법은 위 「`actions` 축 흡수」가 근거로 든 **「조용히 무시된다」를 스스로 만드는 것**이라 택하지 않았습니다.

- **`disabled`를 열지 않았습니다.** COM-005가 `state=disabled`를 쓰지 않는다고 명시합니다. `CtaButton`은 `disabled` · `isPending`을 갖고 있지만 **바를 통해서는 도달할 수 없게 막았습니다** — 열어 두면 정책이 코드 밖 약속으로만 남습니다. 필수값 미입력 처리는 「누를 수 있게 두고 안내」라 `onClick` 안에서 소비 앱이 합니다.

- **`variant`는 흡수하지 않고 prop으로 뒀습니다.** `actions`와 달리 다른 prop에서 파생되지 않습니다 — 바가 스크롤 콘텐츠 위에 뜨는지, 콘텐츠 끝에 붙어 함께 흐르는지는 **그 화면의 레이아웃 사실**이라 DS가 알 수 없습니다.

- **`floating`에 `sticky bottom-0`을 함께 겁니다.** Figma 주석이 `floating`은 「영역 내 하단에 Sticky」, `solid`는 「scroll with parent」로 갈라 둡니다. 그라디언트는 **콘텐츠가 바 밑으로 지나갈 때만** 의미가 있어서 배경과 위치가 한 값입니다 — 따로 열면 소비자가 매번 짝을 맞춰야 합니다.

  `fixed`가 아니라 `sticky`인 것은 주석이 「**영역 내**」라고 못박아서입니다. 스크롤 컨테이너의 마지막 자식으로 두면 그대로 동작하고, 컨테이너가 없으면 문서 스크롤 기준으로 붙습니다. `z-index`는 걸지 않았습니다 — 마지막 자식이라 쌓임 순서로 이미 위입니다.

- **`pb-[28px]`을 그대로 두고 `safe-area-bottom`을 얹지 않았습니다.** [`BottomTab`](./bottom-tab.md) · `Toaster`가 그 유틸을 쓰는 것과 갈리는데, **그쪽은 Figma 하단 여백이 0**이라 더할 것이 명확했습니다. 여기는 12/28 비대칭이 이미 홈 인디케이터를 비켜 간 값으로 보이고, 두 클래스를 같이 걸면 `padding-bottom` 승자가 클래스 순서가 아니라 **CSS 소스 순서**로 정해져 예측이 안 됩니다.

  iOS 홈 인디케이터(`env(safe-area-inset-bottom)` = 34)보다 6 작지만 **디자이너가 지정한 것이 없어 「디자인 확인 필요」로 올리지 않습니다** (DOTOLI-275에서 확인). 실기기에서 문제가 드러나면 그때 맞춥니다.

- **`gap`을 조건 없이 겁니다.** `single`은 자식이 하나라 gap이 렌더에 드러나지 않습니다 — `ConfirmModal` · `FloatingPill`과 같은 판단입니다. 값만 `info` 유무로 갈립니다(10 ↔ 14).

- **`info`는 `string`이고 `whitespace-pre-line`으로 끊습니다.** Figma 마스터가 `<p>` 두 개로 명시적으로 끊어 뒀는데 문구가 소비자 값이라 끊는 위치를 DS가 정할 수 없습니다. 자연 접힘을 기본으로 두고 `\n`으로 지정할 수 있게 했습니다 — `ConfirmModal` · [`Notification`](./notification.md)의 `description`과 같은 처리입니다.

- **랜드마크를 만들지 않고 `<div>`입니다.** `<footer>`는 `<body>` 직계에서 `contentinfo`가 되는데 이 바는 문서 정보가 아니라 액션이고, `role='toolbar'`는 화살표 키 이동 기대가 따라붙습니다. [`BottomTab`](./bottom-tab.md)이 `<nav aria-label>`인 것은 그쪽이 실제로 내비게이션이라서입니다.

- **폴더는 단독입니다.** 이름이 `Bottom…`으로 겹치지만 `BottomTab`과 공유하는 조각이 없습니다 — `Badge` · `ConfirmModal` · `StatusAlertBanner` 선례입니다.

- **text 버튼 높이는 `CtaButton`이 정합니다.** 월 시트 인스턴스(`774:637`)의 박스가 52인데 구현은 글자 높이(20)입니다. **Figma 오토레이아웃이 늘린 값이고 그 자리에 별도 의도가 없다는 것을 확인받았습니다** — 같은 `CtaButton` text가 다른 곳에서도 그대로 쓰이므로 여기만 다른 높이를 둘 이유가 없습니다. 바 높이 92는 어느 쪽이든 같습니다.

### DOTOLI-277 · 버튼 모양을 소비자에게 엽니다

- **`BottomActionBarAction`에 `variant` · `theme` · `size` · `iconOption` · `iconPosition`을 더했습니다.** 계기는 [`DateBottomSheet`](./calendar.md)의 월 시트인데, **거기 하단이 별도 컴포넌트가 아니라 이 바의 인스턴스**(`687:2475`)이고 왼쪽에 아이콘 달린 text CTA(`전체 거래명세서 보기`)가 들어갑니다. 디자이너가 같은 컴포넌트로 그려 놨으므로 바를 하나 더 만들지 않고 슬롯을 열었습니다.

  **기존 소비자는 그대로입니다.** 안 넘기면 `action`은 `filled`/`primary`, `subAction`은 `tonal`/`gray`, 둘 다 `lg` — 값이 `BOTTOM_ACTION_BAR_ACTION_DEFAULTS`로 옮겨졌을 뿐 동작이 같습니다.

- **폭 배분은 `variant`에서 파생합니다 — 별도 스위치를 만들지 않았습니다.** Figma가 두 배치를 갖습니다.

  | 심볼 | 왼쪽 | 오른쪽 |
  | --- | --- | --- |
  | `actions=two` (`154:491`) | 165 | 165 — 균등 |
  | 월 시트 (`687:2475`) | **128** | **202** — hug + fill |

  배경이 있는 버튼(`filled` · `tonal` · `outlined`)은 판이 보이므로 균등해야 하고, `text`는 판이 없어 반쪽을 차지할 이유가 없습니다. **축과 값이 같이 움직이므로** `variant === 'text'`면 `shrink-0`, 아니면 `min-w-0 flex-1`로 `resolveBottomActionBarAction`이 한 곳에서 정합니다. 소비자가 폭을 따로 기억할 것이 없습니다.

  380 폭에서 재보니 `sm` text + `lg` filled 조합이 **127 / 203**으로 Figma(128 / 202)와 1px 안에서 맞습니다. 바 높이도 92 그대로입니다.

- **`info`는 건드리지 않았습니다.** `blue/600` 라벨은 **라벨용**이고 이 버튼과 무관하다는 것이 확정된 판단입니다. 링크성 버튼은 `subAction` 슬롯으로 들어갑니다.

- **`confirm` · `cancel`을 `action` · `subAction`으로 개명했습니다 — 파괴적 변경입니다.** 두 이름은 [`ConfirmModal`](./confirm-modal.md)에서 그대로 가져온 것인데, 페이지 액션 바에서는 왼쪽이 취소가 아닌 경우가 실제로 셋입니다 — 링크(`전체 거래명세서 보기`) · 뒤로(`이전`) · filled 두 개. 오른쪽이 늘 확인인 것도 아닙니다(`이전 / 다음`).

  **실제로 불변인 것은 「오른쪽이 주 액션, 왼쪽이 그 외」**라 그대로 이름에 담았습니다. `primary`/`secondary`는 이 DS에 `theme='primary'`가 따로 있어 **같은 단어가 두 층에서 다른 뜻**이 되므로 피했습니다(CLAUDE.md 「`theme='primary'` ↔ 컬러 토큰 `blue`」와 같은 이유). `sub` 접두어는 [`NotificationCard`](./notification-card.md)의 `subText` 선례를 따릅니다.

  **[`ConfirmModal`](./confirm-modal.md)은 같은 이름을 그대로 둡니다 — 거기에는 자리의 역할을 고정하는 정책이 있기 때문입니다.** COM-011이 「좌측 — 파괴적 액션 / 우측 — 유지 액션」으로 못 박아서, 라벨이 무엇이든 좌측은 **버리는 쪽** 우측은 **지키는 쪽**으로 매핑이 불변입니다(`cancel={{ label: '삭제' }}` · `confirm={{ label: '계속 주문' }}`이 그 예시입니다 — **라벨이 아니라 역할로 읽습니다**). 「디자인 확인 필요」의 정책 ↔ 심볼 충돌이 심볼 쪽으로 결론 나도 `confirm`이 파괴적 쪽으로 바뀔 뿐 **한쪽으로 고정되는 것은 같습니다.**

  **액션 바에는 그런 정책이 없습니다.** 왼쪽에 무엇이 오는지가 화면마다 갈리므로 불변인 것이 위계뿐이고, 그래서 같은 이름이 한쪽에서는 서고 한쪽에서는 무너집니다. 두 컴포넌트가 갈리는 지점은 「모달이냐 바냐」가 아니라 **자리의 역할을 고정하는 정책이 있느냐**입니다.

  **`internal-ui`와 갈라진 지점입니다.** 그쪽 `OverlayFooter` · `DialogOverlay`는 `confirmOption` · `cancelOption`을 쓰는데, **전부 다이얼로그 푸터**라 위 기준으로 보면 `ConfirmModal`과 같은 쪽입니다. 이름이 갈리는 것은 DS가 달라서가 아니라 컴포넌트의 성격이 달라서입니다.

  **지금 바꾼 이유는 비용입니다.** 배포 중인 패키지(0.0.x)지만 레포 안에서 이 필드를 직접 쓰는 곳이 스토리 3곳뿐이었고, [`BottomSheet`](./bottom-sheet.md) · `CalendarBottomSheet`는 `BottomActionBarProps`를 **타입으로만** 통과시켜 필드명을 안 씁니다. 비즈파트너 앱이 쓰기 시작하면 이 비용이 급격히 올라갑니다. 같은 이유로 시트 쪽 `actionOption`도 이번에 `actionBarOption`으로 함께 옮겼습니다([bottom-sheet.md](./bottom-sheet.md) 「결정」).

- **기본값은 `BOTTOM_ACTION_BAR_ACTION_DEFAULTS` 한 곳에만 둡니다.** `variant` · `theme` · `size` 셋 다입니다. `resolveBottomActionBarAction`이 소비자 값과 합쳐 **`CtaButton` prop 묶음을 통째로** 돌려주고 컴포넌트는 스프레드만 합니다. 처음엔 `size`만 `.tsx`에서 `?? 'lg'`로 풀었는데, 그러면 기본값 정책이 두 파일로 갈리고 **슬롯을 하나 더 열 때마다 `.tsx`의 나열도 같이 고쳐야 합니다.**

## API

| prop        | 필수 | 기본값       | 비고                                        |
| ----------- | ---- | ------------ | ------------------------------------------- |
| `action`     | ✅   | —            | `{ label, onClick }` + 모양 선택값. 단독 또는 **우측**. 기본 `filled`/`primary`/`lg` |
| `subAction`  |      | —            | 주면 **좌측**에 추가되고 `actions=two`가 됨. 기본 `tonal`/`gray`/`lg`. `info`와 **배타** |
| `info`      |      | —            | 주면 **좌측**에 텍스트. `\n`으로 줄바꿈. `subAction`과 **배타** |
| `variant`   |      | `'floating'` | `'floating'`은 `sticky` + 그라디언트         |
| `className` |      | —            | 바에 적용                                    |

```tsx
// single — 스크롤 콘텐츠 위에 뜬다
<BottomActionBar action={{ label: '확인', onClick: submit }} />

// two — 콘텐츠 끝에 붙어 함께 흐른다
<BottomActionBar
  subAction={{ label: '취소', onClick: back }}
  action={{ label: '확인', onClick: submit }}
  variant='solid'
/>

// withInfo
<BottomActionBar
  action={{ label: '확인', onClick: submit }}
  info={'3건, 24,000원\n선택됨'}
/>
```

## 디자인 확인 필요

| 항목                     | 내용                                                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `withInfo` × `solid`     | 심볼이 없습니다. 구현은 조합이 되는데 그라디언트 없이 흰 배경 위에 정보 + 버튼이 놓입니다. 쓰지 않을 조합인지 확인 필요        |
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
| `TextAction` | 월 시트 하단(`687:2475`) 재현 — **text CTA가 hug, filled가 나머지**를 먹는 것 |
| `Variants` | `floating` ↔ `solid` 배경 차이                                    |
| `Sticky`   | 스크롤 컨테이너 안에서 **그라디언트와 `sticky`가 실제로 드러나는 자리** |

`Sticky` 외에는 바가 정지 화면에 놓여 `floating`의 그라디언트가 흰 배경과 구분되지 않습니다.
