# HeaderBar 구현 기록

`apps/biz-ui/src/components/HeaderBar` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 HeaderBar 고유 사실만 둡니다.

Figma: [HeaderBar 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=75-4551&m=dev) (`75:4551`). 실제 값은 컴포넌트 세트 `108:475`의 심볼 5개에서 실측했습니다.

## 구현 현황

| 컴포넌트                      | 티켓       | 공개 | 설명                                                        |
| ----------------------------- | ---------- | ---- | ----------------------------------------------------------- |
| `HeaderBar`                   | DOTOLI-250 | ✅   | `type` 3 × `theme` 2 × 진행 바. 높이 54px 고정              |
| `HeaderBarHomeTitle`          | DOTOLI-250 | ❌   | `type=home` 타이틀. 화살표 노출 시 `titleAs` 안에 `<button>` |
| `HeaderBarNotificationLink`   | DOTOLI-250 · 312 | ❌ | 40×40 알림 벨 + 미읽음 점. `next/link`                  |
| `HeaderBarNavigationButton`   | DOTOLI-250 | ❌   | 뒤로 · 닫기 텍스트 버튼                                     |
| `HeaderBarProgress`           | DOTOLI-250 | ❌   | 3px 진행 바                                                 |

조각 4개는 `HeaderBar/` 아래 형제 파일로 두고 배럴에서 내보내지 않습니다 — `Checkbox/CheckboxBase` · `CheckboxIcon` 선례와 같습니다. 소비자의 진입점은 `HeaderBar` 하나입니다.

## Variant 축

| 축            | 값                                     | 출처     |
| ------------- | -------------------------------------- | -------- |
| `type`        | `home` · `navigation` · `bottomSheet`   | Figma 축 |
| `theme`       | `light` · `dark`                        | Figma 축 |
| `useProgress` | `false` · `true`                        | Figma 축 |

**축은 3개지만 심볼은 5개뿐입니다.** 조합 12개 중 정의된 것만 있습니다.

| 심볼      | `type`        | `theme` | `useProgress` |
| --------- | ------------- | ------- | ------------- |
| `108:472` | `home`        | `light` | `false`       |
| `108:473` | `home`        | `dark`  | `false`       |
| `108:471` | `navigation`  | `light` | `false`       |
| `108:474` | `navigation`  | `light` | `true`        |
| `146:638` | `bottomSheet` | `light` | `false`       |

즉 **`dark`는 `home`에만, 진행 바는 `navigation`에만** 정의돼 있습니다.

## 실측 스펙

### 컨테이너

| 항목    | 값                                                      |
| ------- | ------------------------------------------------------- |
| 높이    | 54px → `h-[54px]`. **진행 바가 있어도 54px**             |
| 좌우 여백 | 20px → `px-[20px]`                                      |
| 정렬    | `items-center` · `justify-between`                       |
| 배경    | `base/white` → `bg-white` (`dark`는 배경 없음)           |
| radius  | `bottomSheet`만 상단 16px → `rounded-t-16`               |

`bottomSheet` 심볼에는 `py-[16px]`도 있지만 높이가 54px로 고정이라 결과가 같아 넣지 않았습니다.

### type=home

| 항목       | 값                                                                  |
| ---------- | ------------------------------------------------------------------- |
| 타이틀     | `body-bold` 16px                                                     |
| 타이틀 gap | 4px → `gap-1`                                                        |
| 화살표     | Phosphor `CaretDown` **13px** `fill` → `text-[13px]`                 |
| 알림 벨    | 40 × 40 → `size-[40px]`                                              |
| 알림 아이콘 | Phosphor `Bell` 28px **`regular`** → `text-[28px]`                   |
| 미읽음 점  | 6px 원 `blue/600` + 흰 테 2px. 링크(`<a>`) 기준 `top-[10px] left-[26px]` |

색은 테마별로 갈립니다.

| 대상        | `light`      | `dark`       |
| ----------- | ------------ | ------------ |
| 배경        | `base/white` | 없음(투명)   |
| 타이틀      | `gray/800`   | `gray/100`   |
| 화살표      | `gray/400`   | `gray/200`   |
| 알림 아이콘 | `gray/800`   | `base/white` |

### type=navigation · bottomSheet

| 항목            | 값                                                    |
| --------------- | ------------------------------------------------------ |
| 타이틀          | `body-bold` 16px `gray/800`                            |
| 좌우 버튼 라벨  | `label-bold` 14px `gray/800`                           |
| 좌우 버튼 아이콘 | 14px `gray/400`. `CaretLeft`(뒤로) · `X`(닫기)         |
| 좌우 버튼 gap   | 2px → `gap-[2px]`                                       |
| 좌우 버튼 radius | 6px → `rounded-6`                                      |
| 진행 바         | 높이 3px. 트랙 `gray/200` · 값 `blue/500`               |

`navigation`은 뒤로(좌) · 타이틀(중앙) · 닫기(우), `bottomSheet`는 타이틀(좌) · 닫기(우)입니다. 진행 바는 54px 행의 **하단 경계에 얹힙니다** — flow 밖이라 헤더 상자를 키우지 않습니다 (아래 「구현 결정」).

### 아이콘 웨이트는 `Bell`이 `regular` · `CaretDown`이 `fill`입니다

Figma가 내보내는 SVG path를 `@phosphor-icons/core`의 원본과 좌표째로 대조했습니다. 좌표는 심볼의 `%` 인셋으로 뷰박스 안 바운딩을 256 기준으로 환산해 맞춥니다.

| 아이콘      | 판정      | 근거                                                          |
| ----------- | --------- | ------------------------------------------------------------- |
| `Bell`      | `regular` | path 문자열이 `bell.svg`와 **완전 일치** (`M221.8,175.94C216.25,166.38,208,139.33,208,104…`) |
| `CaretDown` | `fill`    | 닫힌 삼각형 1개이고 **윗변이 직선**입니다(`H208` · y=88). 셰브론(`regular` · `bold`)에는 윗변이 없습니다. 꼭짓점도 `fill/caret-down.svg`와 일치합니다 (`48,88` · `208,88` · `42.34,101.66` · `213.66,101.66` · 꼭지 `128,184.01`) |
| `CaretLeft` | `bold`    | 렌더 바운딩 67.97–172.02 × 35.99–220.03. `bold`의 12px radius 아크 끝점과 소수점까지 일치 |
| `X`         | `bold`    | 렌더 바운딩 43.98–212.02 × 43.96–212.03. 위와 같음             |

**바운딩만으로는 `fill`과 `regular`를 가를 수 없습니다.** 둘은 외곽 실루엣이 같아 bbox가 256분의 0.005(13px에서 0.00025px)밖에 안 벌어집니다. 캐럿 웨이트는 bbox가 아니라 **path 모양**으로 판정합니다.

**`bold`는 바운딩으로 갈리지만, 끝점 좌표로 읽으면 안 됩니다.** 캐럿의 끝점 아크는 바깥으로 불룩해서 끝점(39.49–216.49)과 실제 렌더 bbox(**35.97–220.03**)가 다릅니다. 처음에 `CaretDown`을 `bold`로 판정한 것이 이 차이 때문이었습니다. `CaretLeft` · `X`는 아크가 반원이라 끝점이 곧 극점이어서 두 방식의 결과가 같습니다.

DS 기본값(`bold`)과 다른 둘은 상수로 명시했습니다. `HEADER_BAR_NOTIFICATION_ICON_WEIGHT` · `HEADER_BAR_CARET_ICON_WEIGHT`가 그것입니다.

**weight는 모양뿐 아니라 크기도 바꿉니다.** 같은 13px에서 `bold`는 9.34 × 5.28px, `fill`은 8.94 × 4.88px입니다. Figma 실측(`514:1721` 8.938 × 4.875)과 맞는 쪽은 `fill`이고, `bold`로 두면 캐럿이 Figma보다 0.4px 크게 나갑니다.

## 구현 결정

- **값을 넘긴 요소만 렌더합니다.** `onTitleClick`(화살표) · `notificationHref`(알림 벨) · `onBack`(뒤로) · `onClose`(닫기) 넷 다 같은 규칙입니다. Figma 축을 boolean prop으로 옮기면 `hasSelector` + `onTitleClick`처럼 **항상 짝으로 맞춰야 하는 값이 두 개**가 되고 어긋나면 조용히 깨집니다. CtaButton이 Figma의 `iconPosition=none`을 `iconOption` 미전달로 표현한 것과 같은 선례입니다. **알림 벨만 트리거가 핸들러가 아니라 `href`입니다** (DOTOLI-312, 아래 「알림 벨은 버튼이 아니라 링크입니다」) — 규칙이 말하는 「하나의 값」이라는 성질은 그대로입니다.
- **화살표가 없으면 링크도 버튼도 아닌 순수 텍스트입니다.** 업체 전환 드롭다운(COM-002)은 마스터 권한 + 소속 업체 2개 이상일 때만 열리고, 나머지 계정은 업체가 1개로 고정이라 **탭 자체가 비활성**입니다. `<button disabled>`가 아니라 **텍스트 요소**(기본 `<span>` — `titleAs`가 바꿉니다)로 내려 보조기술에도 조작 대상으로 잡히지 않게 했습니다. 화살표가 있을 때만 `<button>`이고, 눌렀을 때 열리는 것은 업체 선택 바텀시트입니다.
- **화살표가 있는 타이틀 버튼에 `aria-haspopup='dialog'`와 `aria-expanded`를 겁니다** (DOTOLI-310). 둘을 나눠 받는 근거는 `InputField` `type='select'`와 같습니다 — [input.md](./input.md) 「`select`에 `aria-haspopup='dialog'`와 `aria-expanded`를 겁니다」. 여기 고유한 것은 **목적지가 위 「화살표가 없으면…」에서 업체 선택 바텀시트로 고정**이라 `aria-haspopup` 값을 DS가 이미 안다는 점이고, 그래서 상수(`HEADER_BAR_TITLE_POPUP_ROLE`)로 박고 상태인 `aria-expanded`만 `isTitleExpanded`로 받습니다. 안 넘기면 속성 자체가 안 붙습니다.

  **위 「값을 넘긴 요소만 렌더합니다」와 충돌하지 않습니다.** 그 규칙이 막는 것은 `hasSelector` + `onTitleClick`처럼 **렌더 축이 둘로 갈려 어긋나면 조용히 깨지는** 경우입니다. `isTitleExpanded`는 화살표 노출을 바꾸지 않고(그건 여전히 `onTitleClick` 유무), 어긋나 봐야 속성 하나가 빠질 뿐입니다.

  **선례와 갈리는 지점이 하나 있습니다** — `InputField`는 같은 `isOpen`으로 캐럿을 `caret-down` ↔ `caret-up`으로 뒤집는데([input.md](./input.md) 「`select` 캐럿은 열림 상태에서 `caret-up`으로 바뀝니다」), 여기 캐럿은 `caret-down` 고정입니다. Figma HeaderBar에 열림 심볼이 없어 「Figma에 없는 시각은 만들지 않습니다」를 따랐고, 아래 「디자인 확인 필요」에 올려 뒀습니다.

  **`aria-controls`는 걸지 않았습니다.** `Overlay` · `BottomSheet` 어느 쪽도 `id`를 밖으로 내주지 않아(`OverlayProps`의 `Pick`에 `id`가 없습니다) 지금 가리킬 대상이 없습니다. 아래 「타이틀 요소는 `titleAs`로…」가 유보해 둔 `id` 통로와 같은 자리입니다.
- **`useProgress` 축은 `progressOption` 미전달로 표현합니다.** 진행 바는 켜고 끄는 것만으로는 그릴 수 없고 **현재 단계 · 전체 단계가 반드시 함께** 필요합니다. boolean과 값을 따로 받으면 `useProgress=true`인데 값이 없는 상태가 타입으로 허용됩니다. 위 「값을 넘긴 요소만 렌더합니다」와 같은 규칙입니다.
- **진행률은 `currentStep / totalSteps`로 계산합니다.** Figma 목업은 240/380(63%)이지만 이건 폭을 눈대중으로 그린 값이고, 정책이 말하는 것은 「여러 단계로 진행되는 플로우」의 단계입니다. `calculateHeaderBarProgressRate`가 0~100으로 clamp 하고 `totalSteps <= 0`이면 0을 돌려줍니다.
- **뒤로 · 닫기는 `CtaButton`을 재사용하지 않습니다.** Figma 레이어 이름은 `CtaButton`이고 라벨(`label-bold` `gray/800`) · radius(6px) · 아이콘 크기(14px)까지 `text`/`gray`/`sm`과 같지만 **아이콘 색이 `gray/400`으로 라벨과 다릅니다.** `CtaButton`은 아이콘이 `currentColor`를 상속하는 구조(`ButtonIcon`)라 라벨과 아이콘 색을 가를 수 없습니다. gap도 2px로 `CtaButton`의 4px과 다릅니다. 아이콘 래퍼(`ButtonIcon`)와 아이콘 위치 상수(`BUTTON_ICON_POSITIONS`)는 그대로 물어 씁니다.
- **뒤로 · 닫기에 `TOUCH_TARGET_STYLE`을 겁니다.** 히트 영역 확장은 디자이너가 지정한 대상만 하는 것이 원칙인데(CLAUDE.md 「히트 영역 확장」), 지정 주석(`337:3538`)이 가리키는 대상이 `CtaButton`의 `text`와 `sm`이고 이 두 버튼이 정확히 그 스펙입니다. 새로 정한 게 아니라 이미 있는 지정을 따른 것입니다.
- **타이틀 버튼에는 `TOUCH_TARGET_NARROW_STYLE`을 겁니다.** 위 두 버튼과 달리 지정 주석이 없고, `body-bold` 16px × line-height 1.45 = **23.2px**로 WCAG 2.5.8 미달이라 CLAUDE.md 「히트 영역 확장」의 24px 조항을 따른 것입니다.

  **좁은 값을 고른 이유는 이웃이 아니라 겹치는 폭입니다.** 행에 gap이 없어(`flex-h-stack` = `flex flex-row`) 긴 업체명이면 타이틀 상자가 알림 벨 40×40에 그대로 맞닿습니다. 알림 벨은 확장이 없어 CLAUDE.md의 `확장 × 2 > 간격` 공식(`Chip` 사례)이 그대로 적용되지 않고, **간격이 0이라 어떤 값을 써도 겹칩니다.** 없앨 수 없으니 폭을 줄였고, 4px이어도 세로는 31.2px로 24를 넘깁니다. 겹치는 구간은 DOM에서 뒤인 벨이 이기므로(둘 다 `position: relative` · `z-index: auto`) 증상은 벨이 좁아지는 것이 아니라 **타이틀 확장분 오른쪽 4px이 무효가 되는 것**입니다. WCAG가 걸린 축은 세로라 판정에는 영향이 없습니다.

- **알림 벨은 버튼이 아니라 링크입니다** (DOTOLI-312). 하는 일이 알림함(MYP-501 · `1439:17915`)으로의 이동 하나뿐인데 `<button>` + `onNotificationClick`이라, 소비 앱이 `router.push`를 직접 부르고 보조기술에는 「버튼」으로 읽혔습니다. `next/link`의 `<Link>`로 **통째로 바꿨습니다.**

  **형제를 세우지 않고 전환한 근거는 [navigation-list-item.md](./navigation-list-item.md)의 기준입니다** — 「라우팅 아닌 경우가 존재할 수 있는가」. `BottomTab`(DOTOLI-304)은 탭 3개가 전부 화면이라 통째로 바꿨고, `NavigationListItem`(DOTOLI-306)은 같은 줄이 바텀시트 트리거로도 쓰여 링크판을 옆에 세웠습니다. 알림 벨은 `type=home`에만 뜨고 목적지가 하나이며, 아래 「접근성 이름은 DS가 붙입니다」가 이미 **뜻이 하나로 고정된 것을 전제로 `aria-label`을 상수로 박아** 뒀습니다. 라우팅 아닌 경우를 DS가 애초에 배제한 상태라 `BottomTab` 쪽입니다. `as` · `renderItem` 같은 다형 prop을 열지 않는다는 판단도 그대로입니다.

  **`onNotificationClick`은 남기지 않았습니다.** 이동을 `<Link>`가 가져가면 그 prop의 뜻이 「이동 유발」에서 「이동과 별개의 부수효과」로 바뀌는데, 필요가 확인되지 않았습니다(전환 시점 소비 앱 핸들러가 빈 스텁이었습니다). CLAUDE.md 「공개는 되돌리기 비대칭이라 필요가 확인될 때 여는 순서」를 따랐고, 로깅·읽음처리 요구가 생기면 그때 엽니다.

  **통짜 전환 선례인 `BottomTab`은 반대로 `onTabSelect`를 남겼습니다** ([bottom-tab.md](./bottom-tab.md) 「`onTabSelect`는 남기되 선택입니다」). 갈리는 것은 원칙이 아니라 **근거의 유무**입니다 — 그쪽은 스택 리셋 · 분석 로깅처럼 이동과 별개로 걸 것이 실제로 있고 전환 시점에 `onChange`를 쓰던 소비처도 있었습니다. 알림 벨은 목적지가 하나이고 소비처 핸들러가 비어 있어 「이동과 별개로 걸 것」의 실물이 없습니다. `LinkNavigationListItem`이 앵커용 `onClick`을 남긴 것은 또 다른 자리로, 그쪽은 **`LinkProps`를 통째로 상속해 공짜로 딸려온 것**이라 여는 결정 자체가 없었습니다.

  **`href`가 아니라 `notificationHref`입니다.** CLAUDE.md 「서드파티가 정한 prop 이름은 그대로 통과시킵니다」는 `BottomTab`의 `replace`처럼 **그 컴포넌트에 자리가 하나뿐일 때** 성립합니다. `HeaderBar`는 자기가 링크가 아니라 안에 링크 슬롯 하나를 갖는 컴포넌트라, 맨몸 `href`면 헤더 자체의 목적지로 읽힙니다. `BottomTab`이 `href` → `hrefs`로 간 것과 같은 자리입니다.

  **`LinkProps` 전체가 아니라 `href` 하나만 엽니다.** 앵커를 소비자가 통째로 소유하는 `LinkNavigationListItem`과 달리 **여기 앵커는 `HeaderBar`가 내부에서 조립**하므로 스프레드가 성립하지 않습니다 — `BottomTab`이 `hrefs` · `replace`를 하나씩 열었던 것과 같은 자리입니다. `prefetch` · `replace` · `scroll`은 필요가 확인될 때 엽니다.

  **`aria-current`는 걸지 않습니다.** `BottomTabItem`은 현재 탭에 `aria-current='page'`를 거는데, 알림함은 자체 `navigation` 헤더(뒤로 · 알림 · 닫기)를 쓰는 별도 화면이라 **벨이 자기 목적지 위에 뜨지 않습니다.** 항상 `undefined`가 될 속성입니다.

  **파괴적 변경이고 공개 표면에서 사라진 이름이 셋입니다** — `HeaderBarProps.onNotificationClick`, 그리고 배럴(`export * from './constants'` · `'./types'`)을 타고 나가던 `HEADER_BAR_NOTIFICATION_BUTTON_STYLE`(→ `..._LINK_STYLE`) · `HeaderBarNotificationButtonProps`(→ `HeaderBarNotificationLinkProps`). 조각 자체는 계속 비공개지만 그 조각의 스타일 상수와 props 타입은 공개였습니다. 전환 시점 소비 앱(`biz-customer-app`)에서 고쳐야 하는 곳은 `AppHeader.tsx` · `AppHeader/types.ts` · `MainHeader.tsx` 셋이고, 셋 다 `onNotificationClick`만 씁니다.
- **알림 벨은 `LinkIconButton`이 아닙니다.** 컨테이너 40px는 `IconButton` 계열 `lg`와 같지만 **아이콘이 28px**입니다(`lg`는 24px). 웨이트도 `regular`로 다르고 미읽음 점이라는 고유 요소가 붙습니다. 계열에 사이즈·슬롯을 더하면 이 한 곳 때문에 버튼 계열 전체의 축이 늘어나므로 별도 조각으로 뒀습니다. **링크가 된 뒤에도 그대로입니다** — 비교 대상만 `IconButton`에서 `LinkIconButton`으로 옮겨갔고 어긋나는 값은 같습니다.
- **접근성 이름은 DS가 붙입니다.** 알림 벨은 텍스트가 없어 이름을 스스로 만들 수 없는데, 폼 컨트롤과 달리 **소비자가 이 요소에 직접 도달할 수 없습니다**(`HeaderBar`가 내부에서 조립). 뜻이 하나로 고정돼 있어 `aria-label='알림'`을 상수로 박았습니다. 뒤로 · 닫기 라벨도 같은 이유로 고정입니다.
- **알림 벨의 이름은 미읽음 여부로 갈립니다** (DOTOLI-310). 바로 위 규칙의 연장입니다 — 이름을 DS가 쥐고 있으니 **상태도 DS가 이름에 싣습니다.** `hasUnreadNotification`으로 `HEADER_BAR_NOTIFICATION_LABEL` ↔ `HEADER_BAR_NOTIFICATION_UNREAD_LABEL`을 가르고 **미읽음 점의 `aria-hidden`은 그대로 둡니다.** 점을 드러내거나 안쪽에 `sr-only`를 더하는 방식이 왜 무효인지는 [CLAUDE.md](../../../apps/biz-ui/CLAUDE.md) 「장식 요소와 상태 요소」에 있습니다. 상태별로 이름을 가르는 선례는 internal-ui `InputPassword`(`비밀번호 보기` ↔ `비밀번호 숨기기`)인데, **거기와 갈려 기본 이름을 접두로 유지합니다** (`알림` → `알림, 읽지 않음`). `InputPassword`는 버튼의 **목적 자체가 뒤집히는** 토글이라 이름을 통째로 가는 게 맞지만, 알림 벨은 목적이 「알림 열기」로 고정이고 상태만 얹힙니다. 이름이 통째로 갈리면 접근성 이름이 상태마다 흔들려 **음성 제어로 「알림」을 부를 때 타깃이 흐려집니다.**
- **타이틀 요소는 `titleAs`로 열되 기본값은 `span`입니다** (DOTOLI-307). 같은 컴포넌트가 화면 헤더(`home` · `navigation`)와 바텀시트 헤더(`bottomSheet`)를 겸해 적정 레벨이 서로 다르고(`h1` ↔ `h2`), DOTOLI-250에서는 그걸 이유로 아예 열지 않았습니다. 그 결과 소비 앱이 페이지 제목을 만들 수 없어 셸이 `<h1 className='sr-only'>`를 따로 그렸고, **같은 문자열이 접근성 트리에 두 번**(`<header>`의 텍스트 + `<main>`의 h1) 올라갔습니다. **기본값을 두면 「매번 정해야 하는 스위치」가 아닙니다** — 같은 패키지의 `ConfirmModal`과 같은 모양(`HEADER_BAR_TITLE_ELEMENTS` · `HEADER_BAR_DEFAULT_TITLE_ELEMENT` · `titleAs`)으로 열었고 기본값이 지금 동작과 같은 `span`이라 기존 소비처는 그대로입니다. 바깥은 계속 `<header>` 랜드마크로 잡습니다. 바텀시트가 `aria-labelledby`로 물어야 할 때는 그 티켓에서 `id` 통로를 엽니다.
- **`type=home`에 화살표가 있으면 `titleAs`가 버튼을 감쌉니다** — `<h1><button>…</button></h1>`. 반대 방향(`<button><h1>`)은 두 겹으로 막힙니다. `<button>`의 콘텐츠 모델이 phrasing content라 `<h1>`~`<h6>`이 **안에 들어갈 수 없고**, `role=button`은 children presentational이라 넣어도 **heading이 접근성 트리에서 사라집니다.** 뒤집은 쪽은 heading의 콘텐츠 모델이 phrasing content이고 `<button>`이 거기 해당해 유효하며 heading · button이 **둘 다** 트리에 남습니다 — ARIA APG의 accordion header(`<h3><button aria-expanded>`)와 같은 형태입니다.

  **래퍼는 `flex-h-stack min-w-0`이어야 합니다**(`HEADER_BAR_HOME_TITLE_WRAPPER_STYLE`). `min-w-0`만 주면 **긴 업체명이 안 잘리고 알림 벨을 덮습니다** — `<button>`은 `display: flex`를 줘도 내용 폭으로 커져서(380px 프레임에서 래퍼 300px · 버튼 364px 실측) 안쪽 `truncate`가 발동할 여지가 없습니다. 래퍼를 flex로 만들면 버튼이 다시 flex item이 되어 `min-w-0`으로 줄어들고, 이건 **DOTOLI-307 이전에 버튼이 행의 flex item이던 것과 같은 계산**입니다. gap · cursor · truncate는 그대로 버튼과 그 안 텍스트가 갖습니다.

  기본값(`span`)일 때도 래퍼는 렌더됩니다 — 조합마다 DOM 모양이 갈리면 한쪽에서만 나는 버그가 생깁니다.

  **색 · 타이포는 래퍼가 갖고 안쪽 텍스트는 `text-inherit`으로 받습니다.** 아래 「`Typography`에는 색·타이포를 prop으로」가 막는 것은 색을 `className`으로 넘기는 것이고, 여기는 안쪽에 색을 **아예 주지 않아** `text-inherit`이 이겨도 결과가 같습니다. 다만 상속 경로에 `<button>`이 끼어 있어 **preflight의 `button { font: inherit; color: inherit }`가 전제**입니다 — 소비 앱이 `@import 'tailwindcss'`를 넣지 않으면 버튼이 UA 기본 글꼴·색으로 끊습니다.

- **대안으로 검토한 `sr-only` 사본은 쓰지 않습니다.** 「보이는 건 지금대로 두고 선택된 태그를 숨겨서 하나 더」는 두 갈래 다 손해입니다. 보이는 쪽을 `aria-hidden`으로 가리면 **모바일 터치 탐색에서 제목을 짚어도 아무것도 안 읽히고**(sr-only 사본은 화면 상자가 1×1px), 화살표가 있는 `home`은 **버튼이 포커스 가능해 애초에 `aria-hidden`을 걸 수 없습니다**(걸어도 포커스는 들어갑니다 — 실측). 안 가리면 같은 문자열이 트리에 두 번 올라가 원래 문제로 돌아갑니다. sr-only는 **보이는 것이 의미를 못 담을 때**(아이콘 단독 · 축약어 · 읽을 내용이 보이는 것과 다를 때) 쓰는 도구이고, 여기는 보이는 문자열이 곧 제목이라 사본이 정보를 더하지 않습니다.
- **`BottomSheet`는 `titleAs`를 통과시키지 않습니다.** 시트의 접근성 이름은 `Overlay`의 `aria-label={title}`이 이미 붙여 줍니다. 시트 안에서 heading이 필요해지면 그때 통로를 엽니다.
- **타이틀에 `truncate`를 겁니다.** Figma는 `whitespace-nowrap`이라 긴 업체명이 좌우 버튼을 밀어냅니다. 실제 데이터가 들어오는 자리라 잘라내는 쪽으로 갔습니다.
- **`Typography`에는 색·타이포를 `className`이 아니라 `color` · `variant` prop으로 넘깁니다.** `Typography`는 `color`가 없으면 `text-inherit`을 **클래스 목록 뒤쪽에** 붙이는데, 둘 다 `color` 속성이라 생성 CSS 순서에서 `text-inherit`이 이깁니다. `className='text-gray-800'`으로 넘기면 두 클래스가 모두 붙은 채 **글자가 검정으로 렌더됩니다.** 그래서 `HEADER_BAR_THEME_STYLES`의 `TITLE`만 클래스 문자열이 아니라 `ColorVariants`입니다 — `CARET`은 `Icon`에, `NOTIFICATION_ICON`은 알림 링크(`<Link>`)에 붙고 그쪽엔 폴백이 없어 클래스 그대로입니다. `variant`도 같은 `clsx` 자리라 함께 prop으로 올렸고, `HEADER_BAR_TITLE_STYLE`에는 레이아웃(`min-w-0 truncate`)만 남겼습니다. Storybook 계산값으로 확인했습니다(`rgb(51, 60, 81)` = `gray/800`).
- **진행 바는 헤더 높이에 포함되지 않습니다** (DOTOLI-307). 처음에는 트랙을 54px 행 **다음 형제**로 흘려보내 헤더가 57px이 됐는데, Figma는 54px입니다 — 제품 화면 `ORD-101`(`1484:13795`)에서 `HeaderBar` 인스턴스(`1484:13811`)가 y=34 · height **54**이고 본문 `grayTopBody`가 y=88(=34+54)에서 시작합니다. 인스턴스 안 진행 바(`Frame 397`)는 **로컬 y=54 · height 0**인 LINE 2개(트랙 380 · 값 240)라 경계에 얹혀 있을 뿐 상자를 키우지 않습니다. 그래서 트랙을 `absolute inset-x-0 bottom-0`으로 빼고 **행(`HEADER_BAR_ROW_STYLE`)에 `relative`를** 붙였습니다. **3px은 행 안쪽 아래 끝을 덮습니다** — 바깥으로 내면(`-bottom-[3px]`) 소비 앱 본문 첫 3px과 겹쳐 배경을 칠하는 쪽이 이깁니다.
- **`relative`는 루트(`<header>`)가 아니라 행이 답니다.** 루트에 붙이면 **소비자의 `className='fixed …'`가 죽습니다.** 둘 다 단일 클래스라 specificity가 같고 `clsx` 인자 순서는 캐스케이드와 무관한데, Tailwind 생성 CSS가 `.absolute` → `.fixed` → `.relative` → `.static` → `.sticky` 순이라 **`.relative`가 `.fixed` · `.absolute`를 이깁니다** (Storybook 계산값으로 확인 — `fixed relative` → `relative`, `sticky relative` → `sticky`). `sticky`만 살아남아 증상이 반쪽으로 보이는 것도 함정입니다. 위 「`Typography`에 색·타이포를 `className`이 아니라 prop으로」와 같은 종류입니다. 행에 붙이면 소비자 `className`이 닿지 않는 자리라 `fixed` · `sticky` · `absolute` 전부 소비자 것이 이깁니다. abspos 자식의 기준 상자는 조상의 **padding box**라 `inset-x-0`이 `px-[20px]`까지 덮고, 행 높이가 곧 헤더 높이라 기하도 같습니다.
- **진행 바에 전환 모션을 넣지 않았습니다.** Figma에 모션 정의가 없습니다 (CLAUDE.md 「폼 컨트롤 공통」 7).

## 정책

Figma 주석에 적힌 것을 그대로 옮깁니다. **구현이 아니라 소비 앱이 지킬 규칙**이라 컴포넌트는 이 판단을 하지 않고 prop으로만 받습니다.

### COM-002 · 업체 전환 드롭다운 (화살표 노출 조건)

화살표(`CaretDown`)는 **마스터 권한 + 소속 업체 2개 이상**일 때만 노출합니다.

| 계정        | 뜻                                          | 화살표                     |
| ----------- | ------------------------------------------- | -------------------------- |
| 마스터      | 그룹사의 대표계정. 그룹사 내 모든 업체 확인·관리 가능 | 업체 2개 이상일 때만 노출 |
| 관리자      | 단일업체의 관리 계정                          | 미노출 · 탭 비활성         |
| 매니저      | 업체의 하위 관리 계정. 관리자에게 권한이 상속  | 미노출 · 탭 비활성         |

### COM-007 · 네비게이션

`type=navigation`의 좌우 버튼은 **동작이 다릅니다.**

- **뒤로** — 직전 화면으로 복귀(스택 pop). Android 물리 뒤로가기와 완전히 동일합니다.
- **닫기** — 현재 플로우 전체를 이탈하고 진입 이전 화면으로 복귀합니다.

예시 — 주간주문 등록 → 일자 입력 → 주문 확인에서, 주문 확인의 **뒤로는 일자 입력으로**, **닫기는 주문 메인으로** 이동합니다.

`type=home`은 뒤로 · 닫기를 제공하지 않습니다. 탭 메인은 이탈 대상이 아니기 때문입니다.

입력값이 있는 상태에서 뒤로 · 닫기 · 물리 뒤로가기를 누르면 **COM-008 이탈 모달**이 노출됩니다. 모달은 오버레이 계열 티켓이 맡고 HeaderBar는 콜백만 넘깁니다 — Overlay가 배경 탭에서 `onClose`만 넘기는 것과 같은 분담입니다.

### 미읽음 알림

**점(dot)만 찍고 개수는 표기하지 않습니다.** 미읽음 1건 이상일 때 노출합니다 (`hasUnreadNotification`).

### useProgress 적용 대상

여러 단계로 진행되는 플로우에서 사용합니다.

- 주간주문 등록
- 고정주문 수량 변경
- 주문 방식 전환 (주간 ↔ 고정)
- 매니저 · 관리자 계정 추가
- 담당자 · 수신자 추가

**단일 화면이거나 단계 구분이 없으면 넣지 않습니다** (`progressOption` 미전달).

## 디자인 확인 필요

실측 중 발견한 Figma 자체의 불일치와 미정의 항목입니다. 전부 **Figma 값 그대로** 옮겼고 임의로 보정하지 않았습니다.

| 항목                    | 내용                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 화살표 크기 12 ↔ 13px   | `light`는 13px, `dark`는 12px입니다. 문서 프레임의 참고 인스턴스(`514:1721`)도 13px이라 **13px로 통일**했습니다            |
| `dark`가 `home`에만 있음 | `navigation` · `bottomSheet`의 `dark` 심볼이 없어 좌우 버튼 색이 미정의입니다. 이 조합은 쓰지 않는 것으로 두고 값을 채우지 않았습니다 |
| 미읽음 점의 흰 테        | `light` · `dark`가 같은 에셋이라 `dark`에서도 흰 테 2px입니다. 밝은 배경을 도려내는 용도로 보이는데 어두운 배경에서는 흰 테가 드러납니다 |
| 열림 상태의 캐럿         | `isTitleExpanded=true`여도 캐럿이 `caret-down` 고정입니다 (DOTOLI-310). 열림 심볼이 없어 만들지 않았는데, 같은 성격인 `InputField` `select`는 `caret-up`으로 뒤집습니다 |
| 미읽음 알림 문구         | 미읽음일 때 접근성 이름에 상태가 붙습니다 — `알림` → `알림, 읽지 않음` (DOTOLI-310). 스크린리더만 읽는 문구라 화면에는 안 드러나고, 기획·디자인 확인 전 잠정값입니다 |
| 좌우 버튼 gap 2 ↔ 4px    | Figma 인스턴스는 2px인데 원본 `CtaButton`(`11:4337`)의 `sm`은 4px입니다. 인스턴스 쪽 값을 따랐습니다                      |
| `hover` · `pressed` 미정의 | 어느 심볼에도 상호작용 상태가 없어 `transition-colors`도 걸지 않았습니다. 모바일 타깃이라 최소한 `pressed`는 필요해 보입니다 |
| 포커스 링 미정의         | 포커스 가능한 요소 3종(뒤로 · 닫기 버튼, **알림 링크**) 전부 포커스 시각이 없습니다 (CLAUDE.md 「폼 컨트롤 공통」 7과 같은 상황) |
| safe-area 미정의         | 화면 최상단에 붙는 컴포넌트인데 노치 여백 처리가 심볼에 없습니다. `safe-area-top`을 넣지 않았고, 필요하면 소비 앱이 `className`으로 겁니다 |
| 타이틀 버튼 히트 영역     | 23.2px로 WCAG 2.5.8 미달이라 주석 없이 DS가 4px을 얹었습니다 (위 「구현 결정」)                                            |
| 진행 바 3px의 위치       | Figma는 y=54 · height 0인 LINE이라 stroke가 경계에 **걸칩니다**(52.5~55.5). 헤더를 54px로 유지하려면 안쪽·바깥 중 하나여야 해서 **안쪽(51~54)**으로 넣었습니다 — 바깥은 소비 앱 본문 첫 3px과 겹칩니다. 주석 없이 DS가 정한 값입니다 |
