# HeaderBar 구현 기록

`apps/biz-ui/src/components/HeaderBar` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 HeaderBar 고유 사실만 둡니다.

Figma: [HeaderBar 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=75-4551&m=dev) (`75:4551`). 실제 값은 컴포넌트 세트 `108:475`의 심볼 5개에서 실측했습니다.

## 구현 현황

| 컴포넌트                      | 티켓       | 공개 | 설명                                                        |
| ----------------------------- | ---------- | ---- | ----------------------------------------------------------- |
| `HeaderBar`                   | DOTOLI-250 | ✅   | `type` 3 × `theme` 2 × 진행 바. 높이 54px 고정              |
| `HeaderBarHomeTitle`          | DOTOLI-250 | ❌   | `type=home` 타이틀. 화살표 노출 시 `<button>`, 아니면 텍스트 |
| `HeaderBarNotificationButton` | DOTOLI-250 | ❌   | 40×40 알림 벨 + 미읽음 점                                   |
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
| 높이    | 54px → `h-[54px]`                                        |
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
| 화살표     | Phosphor `CaretDown` **13px** → `text-[13px]`                        |
| 알림 버튼  | 40 × 40 → `size-[40px]`                                              |
| 알림 아이콘 | Phosphor `Bell` 28px **`regular`** → `text-[28px]`                   |
| 미읽음 점  | 6px 원 `blue/600` + 흰 테 2px. 버튼 기준 `top-[10px] left-[26px]`   |

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

`navigation`은 뒤로(좌) · 타이틀(중앙) · 닫기(우), `bottomSheet`는 타이틀(좌) · 닫기(우)입니다. 진행 바는 54px 행 **아래**에 붙습니다.

### 아이콘 웨이트는 Bell만 `regular`입니다

Figma가 내보내는 SVG path를 `@phosphor-icons/core`의 원본과 좌표째로 대조했습니다. 심볼의 `%` 인셋으로 뷰박스 안 바운딩을 256 기준으로 환산해 맞춥니다.

| 아이콘      | 256 기준 바운딩       | 판정      | 근거                                                          |
| ----------- | --------------------- | --------- | ------------------------------------------------------------- |
| `Bell`      | —                     | `regular` | path 문자열이 `bell.svg`와 **완전 일치** (`M221.8,175.94C216.25,166.38,208,139.33,208,104…`) |
| `CaretDown` | 40–216 × 88–184       | `bold`    | `bold` 39.49–216.49 × 87.48–184.49 (`regular`는 42.34–213.66)  |
| `CaretLeft` | 67.97–172.02 × 35.99–220.03 | `bold` | `bold`의 12px radius 아크 끝점과 소수점까지 일치                |
| `X`         | 43.98–212.02 × 43.96–212.03 | `bold` | 위와 같음                                                      |

`Bell`만 DS 기본값(`bold`)과 달라 `HEADER_BAR_NOTIFICATION_ICON_WEIGHT`로 명시했습니다.

## 구현 결정

- **핸들러를 넘긴 요소만 렌더합니다.** `onTitleClick`(화살표) · `onNotificationClick`(알림 벨) · `onBack`(뒤로) · `onClose`(닫기) 넷 다 같은 규칙입니다. Figma 축을 boolean prop으로 옮기면 `hasSelector` + `onTitleClick`처럼 **항상 짝으로 맞춰야 하는 값이 두 개**가 되고 어긋나면 조용히 깨집니다. CtaButton이 Figma의 `iconPosition=none`을 `iconOption` 미전달로 표현한 것과 같은 선례입니다.
- **화살표가 없으면 링크도 버튼도 아닌 순수 텍스트입니다.** 업체 전환 드롭다운(COM-002)은 마스터 권한 + 소속 업체 2개 이상일 때만 열리고, 나머지 계정은 업체가 1개로 고정이라 **탭 자체가 비활성**입니다. `<button disabled>`가 아니라 `<span>`으로 내려 보조기술에도 조작 대상으로 잡히지 않게 했습니다. 화살표가 있을 때만 `<button>`이고, 눌렀을 때 열리는 것은 업체 선택 바텀시트입니다.
- **`useProgress` 축은 `progressOption` 미전달로 표현합니다.** 진행 바는 켜고 끄는 것만으로는 그릴 수 없고 **현재 단계 · 전체 단계가 반드시 함께** 필요합니다. boolean과 값을 따로 받으면 `useProgress=true`인데 값이 없는 상태가 타입으로 허용됩니다. 위 「핸들러를 넘긴 요소만 렌더합니다」와 같은 규칙입니다.
- **진행률은 `currentStep / totalSteps`로 계산합니다.** Figma 목업은 240/380(63%)이지만 이건 폭을 눈대중으로 그린 값이고, 정책이 말하는 것은 「여러 단계로 진행되는 플로우」의 단계입니다. `calculateHeaderBarProgressRate`가 0~100으로 clamp 하고 `totalSteps <= 0`이면 0을 돌려줍니다.
- **뒤로 · 닫기는 `CtaButton`을 재사용하지 않습니다.** Figma 레이어 이름은 `CtaButton`이고 라벨(`label-bold` `gray/800`) · radius(6px) · 아이콘 크기(14px)까지 `text`/`gray`/`sm`과 같지만 **아이콘 색이 `gray/400`으로 라벨과 다릅니다.** `CtaButton`은 아이콘이 `currentColor`를 상속하는 구조(`ButtonIcon`)라 라벨과 아이콘 색을 가를 수 없습니다. gap도 2px로 `CtaButton`의 4px과 다릅니다. 아이콘 래퍼(`ButtonIcon`)와 아이콘 위치 상수(`BUTTON_ICON_POSITIONS`)는 그대로 물어 씁니다.
- **뒤로 · 닫기에 `TOUCH_TARGET_STYLE`을 겁니다.** 히트 영역 확장은 디자이너가 지정한 대상만 하는 것이 원칙인데(CLAUDE.md 「히트 영역 확장」), 지정 주석(`337:3538`)이 가리키는 대상이 `CtaButton`의 `text`와 `sm`이고 이 두 버튼이 정확히 그 스펙입니다. 새로 정한 게 아니라 이미 있는 지정을 따른 것입니다.
- **알림 버튼은 `IconButton`이 아닙니다.** 컨테이너 40px는 `IconButton` `lg`와 같지만 **아이콘이 28px**입니다(`lg`는 24px). 웨이트도 `regular`로 다르고 미읽음 점이라는 고유 요소가 붙습니다. `IconButton`에 사이즈·슬롯을 더하면 이 한 곳 때문에 버튼 계열 전체의 축이 늘어나므로 별도 조각으로 뒀습니다.
- **접근성 이름은 DS가 붙입니다.** 알림 버튼은 텍스트가 없어 이름을 스스로 만들 수 없는데, 폼 컨트롤과 달리 **소비자가 이 버튼에 직접 도달할 수 없습니다**(`HeaderBar`가 내부에서 조립). 뜻이 하나로 고정돼 있어 `aria-label='알림'`을 상수로 박았습니다. 뒤로 · 닫기 라벨도 같은 이유로 고정입니다.
- **타이틀은 heading이 아니라 `span`입니다.** 같은 컴포넌트가 화면 헤더(`home` · `navigation`)와 바텀시트 헤더(`bottomSheet`)를 겸하는데 적정 레벨이 서로 다릅니다(`h1` ↔ `h2`). 소비자가 매번 정해야 하는 스위치를 만들지 않는다는 원칙에 따라 열지 않았고, 바깥은 `<header>` 랜드마크로 잡습니다. 바텀시트가 `aria-labelledby`로 물어야 할 때는 그 티켓에서 `id` 통로를 엽니다.
- **타이틀에 `truncate`를 겁니다.** Figma는 `whitespace-nowrap`이라 긴 업체명이 좌우 버튼을 밀어냅니다. 실제 데이터가 들어오는 자리라 잘라내는 쪽으로 갔습니다.
- **`Typography`에는 색·타이포를 `className`이 아니라 `color` · `variant` prop으로 넘깁니다.** `Typography`는 `color`가 없으면 `text-inherit`을 **클래스 목록 뒤쪽에** 붙이는데, 둘 다 `color` 속성이라 생성 CSS 순서에서 `text-inherit`이 이깁니다. `className='text-gray-800'`으로 넘기면 두 클래스가 모두 붙은 채 **글자가 검정으로 렌더됩니다.** 그래서 `HEADER_BAR_THEME_STYLES`의 `TITLE`만 클래스 문자열이 아니라 `ColorVariants`입니다 — `CARET`·`NOTIFICATION_ICON`은 `Icon`·`<button>`에 붙고 그쪽엔 폴백이 없어 클래스 그대로입니다. `variant`도 같은 `clsx` 자리라 함께 prop으로 올렸고, `HEADER_BAR_TITLE_STYLE`에는 레이아웃(`min-w-0 truncate`)만 남겼습니다. Storybook 계산값으로 확인했습니다(`rgb(51, 60, 81)` = `gray/800`).
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
| 좌우 버튼 gap 2 ↔ 4px    | Figma 인스턴스는 2px인데 원본 `CtaButton`(`11:4337`)의 `sm`은 4px입니다. 인스턴스 쪽 값을 따랐습니다                      |
| `hover` · `pressed` 미정의 | 어느 심볼에도 상호작용 상태가 없어 `transition-colors`도 걸지 않았습니다. 모바일 타깃이라 최소한 `pressed`는 필요해 보입니다 |
| 포커스 링 미정의         | 버튼 3종 전부 포커스 시각이 없습니다 (CLAUDE.md 「폼 컨트롤 공통」 7과 같은 상황)                                          |
| safe-area 미정의         | 화면 최상단에 붙는 컴포넌트인데 노치 여백 처리가 심볼에 없습니다. `safe-area-top`을 넣지 않았고, 필요하면 소비 앱이 `className`으로 겁니다 |
