# Button 계열 구현 기록

`apps/biz-ui/src/components/Button` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 Button 계열 고유 사실만 둡니다.

Figma: [Button 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=46-148&m=dev) (`46:148`). 섹션 안의 `294:1138`(CtaButton) · `295:946`(Filter) · `298:952`(FloatingPill) · `298:1024`(IconButton)는 전부 문서용 프레임이고, 실제 값은 각 컴포넌트 세트에서 실측했습니다.

## 구현 현황

| 컴포넌트     | 티켓       | 설명                                                                                                                    |
| ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| `CtaButton`  | DOTOLI-219 · 256 | `theme` 2 × `variant` 4 × `size` 3. 색상 32조합(theme 2 × variant 4 × state 4) 전수 실측. **아이콘 색은 라벨과 따로 정의돼 있어 DOTOLI-256에서 32칸을 다시 실측해 분리**했습니다 |
| `ButtonIcon` | DOTOLI-219 | 버튼 계열 공통 아이콘 래퍼. Phosphor는 아이콘 폰트라 글리프 크기가 `font-size`를 따르므로 크기를 따로 지정하지 않습니다 |
| `Filter`     | DOTOLI-222 | `state` 2 × 아이콘 유무. 사이즈 축 없는 단일 칩                                                                          |
| `FloatingPill` | DOTOLI-223 | `variant` 2(navigate·scrollToTop). biz-ui 첫 shadow 토큰(`--shadow-20`) 사용                                          |
| `IconButton` | DOTOLI-224 | `theme` 3 × `size` 2. theme × state 13조합 전수 실측                                                                     |
| `CollapseButton` | DOTOLI-262 | `isOpen` 1축. 접기/펼치기 토글. 라벨을 DS가 소유                                                                     |

Figma Button 섹션에 정의된 컴포넌트는 전부 구현했습니다. **`CollapseButton`만 섹션 밖(`129:521`)에 따로 있는데**, 형태가 「라벨 + caret」이라 계열 안에서 `Filter`와 가장 가깝고 `ButtonIcon`을 그대로 물어 씁니다.

## 계열 공통 결정

- **`SIZE`·`THEME`·`VARIANT`를 `shared`가 아니라 각 컴포넌트 폴더 아래에 둡니다.** `shared`에 두면 공통 모듈이 `CTA_BUTTON_THEMES`를 내보내게 되어 컴포넌트별 정의 원칙과 어긋납니다. `shared`에는 계열이 실제로 공유하는 것만 둡니다 — `ButtonIcon` · `BUTTON_ICON_POSITIONS` · `BUTTON_PENDING_ICON_KEY`. 히트 영역 상수는 DOTOLI-241에서 `components/shared`로 옮겼습니다 (아래 각주).
- **`base/white`는 별도 토큰을 만들지 않고 Tailwind 기본 `white`를 씁니다.** Figma `base/white`가 `#ffffff`로 Tailwind 기본값과 같아 토큰을 새로 정의할 이유가 없습니다. CtaButton(`text-white`)과 Filter(`bg-white`)가 같은 판단이고, FloatingPill·IconButton도 이 결정을 따릅니다.
- **아이콘 색을 라벨과 분리해야 하는 것은 `CtaButton`뿐입니다** (DOTOLI-256에서 계열 전체 확인). `Filter`는 이미 `FILTER_STYLES[state].ICON`으로 분리돼 있고, `FloatingPill`의 `scrollToTop` 캐럿은 Figma 채움이 `#333c51`로 라벨(`text-gray-800`)과 같아 분리할 것이 없으며, `IconButton`은 아이콘이 곧 버튼이라 분리 개념이 없습니다.
- **Storybook `iconOption`은 `iconKey`를 최상위로 펴서 받습니다.** 점 표기 argType(`'iconOption.iconKey'`)은 런타임은 되지만 타입이 깨져서, internal-ui Button 스토리처럼 `<Component>Args`로 펴고 render에서 다시 묶습니다.

---

## CtaButton

### Variant 축

| 축             | 값                                               |
| -------------- | ------------------------------------------------ |
| `theme`        | `primary` · `gray`                               |
| `variant`      | `filled` · `outlined` · `tonal` · `text`         |
| `size`         | `lg`(52px) · `md`(40px) · `sm`(32px)             |
| `iconPosition` | `left` · `right` (Figma 축은 `left`/`right`/`none` 3값. `none`은 `iconOption` 미전달로 표현) |
| 상태           | `hover` · `pressed` · `disabled` (+ `isPending`) |

internal-ui의 `xs` 사이즈와 `red`/`green`/`yellow` 테마는 Figma에 없어 넣지 않았습니다.

### 실측 스펙

primary / filled / default / lg 기준 (`11:4121`).

| 항목    | 값                                                             |
| ------- | -------------------------------------------------------------- |
| height  | 52px                                                           |
| padding | `px-[30px] py-[12px]`                                          |
| gap     | 4px                                                            |
| radius  | 8px → `rounded-lg` (md·sm은 6px → `rounded-md`)                |
| 배경    | `blue/500` `#3182f6` → `bg-blue-500`                           |
| 라벨    | Pretendard Bold 16px / lh 1.45 / ls -0.48px → `text-body-bold` |
| 라벨 색 | `base/white` → `text-white`                                    |
| 아이콘  | 16px                                                           |

나머지 31개 조합은 `CtaButton/constants/index.ts`의 `CTA_BUTTON_STYLES` · `CTA_BUTTON_SIZE_STYLES`가 원본입니다. 여기에 옮겨 적지 않습니다.

### 아이콘 색 (DOTOLI-256)

**아이콘은 라벨 색을 상속하지 않습니다.** Figma가 둘을 따로 정의하고 있는데 구현이 컨테이너 색을 글리프에 물려주고 있어 어긋나 있었습니다. [Notification](./notification.md)이 `text`/`sm`을 처음 실사용하면서 드러났습니다.

명세판(`294:1138`)의 **theme × variant × state 32칸을 전부 실측**했고, 결과가 세 갈래로 접힙니다.

| 조건                                | 아이콘 색                                       |
| ----------------------------------- | ------------------------------------------------- |
| `disabled`                          | `gray/300` — theme · variant 무관                  |
| `filled` (비 `disabled`)            | `base/white` — 라벨과 같음                        |
| `outlined` · `tonal` · `text` (비 `disabled`) | `primary` → `blue/500` · `gray` → `gray/500` |

**축이 32개가 아니라 8 + 1개입니다.** `hover` · `pressed`는 배경만 바꾸고 아이콘 색을 건드리지 않아 상태 축이 `default` ↔ `disabled` 둘로 접히고, `size`(`31:230` lg ↔ `31:278` sm)와 `iconPosition`(`31:206` left ↔ `31:278` right)은 아이콘 색에 영향이 없습니다. 그래서 `CTA_BUTTON_ICON_STYLES`는 theme × variant 8칸이고 `disabled`만 `CTA_BUTTON_DISABLED_ICON_STYLE`로 뺐습니다.

`filled`의 `text-white`는 라벨색과 같아 실효가 없지만, **맵에서 빠지면 「측정 안 함」과 구분되지 않아** 명시적으로 둡니다.

실측 방법은 두 가지를 섞었습니다. 아이콘 SVG를 직접 받아 `fill`을 읽은 것이 확정적이고(`primary/filled` `#ffffff` · `primary/text` `#3182f6` · `primary/text/disabled` `#ced4e0` · `gray/text` `#8a93a8` 등), 나머지는 `get_variable_defs`가 심볼별로 돌려주는 변수 집합에서 **배경 · 테두리 · 라벨로 설명되지 않는 색 하나**를 아이콘으로 특정했습니다. 두 방법의 결과가 겹치는 지점에서 서로 일치합니다.

**`CTA_BUTTON_STYLES` 안에 `ICON` 키로 넣지 않고 평행 맵으로 뒀습니다.** 계열 선례는 `Filter`(`FILTER_STYLES[state].ICON`)처럼 기존 스타일 레코드에 키를 얹는 쪽인데, 여기서는 그렇게 하면 **아이콘 색이 컨테이너 클래스로 샙니다** — `generateCtaButtonStyle`이 `CTA_BUTTON_STYLES[theme][variant]`에서 `disabled`만 떼고 `Object.values(stateStyles)`로 나머지를 통째로 펴 쓰기 때문입니다. `CtaButtonStyles`가 `Record<CtaButtonState, string>`이라 타입도 안 맞습니다. `Filter`는 `Record<FilterState, { CONTAINER, ICON }>`이라 스프레드 구조가 아니어서 그 함정이 없습니다.

두 맵을 같은 `Record<CtaButtonTheme, Record<CtaButtonVariant, …>>` 꼴로 맞춘 것은 의도적입니다 — theme이나 variant가 늘면 **양쪽이 동시에 컴파일 에러**를 내서 한쪽만 갱신되는 것을 타입이 막습니다.

**`isPending`에는 이 색을 씌우지 않습니다.** Figma에 pending 심볼이 없어 아이콘 색도 실측값이 없고(아래 「구현 결정」), `disabled` 분기에 묻어가면 스피너가 `gray/300`으로 나가 `gray/100` 배경 위에서 라벨(`gray/400`)보다도 안 보입니다. 반대로 비-disabled 색을 쓰면 `filled`에서 흰 스피너가 `gray/100` 위에 놓여 더 나쁩니다. **실측이 없는 상태는 만들지 않는다**는 원칙대로 스피너는 라벨 색을 그대로 상속합니다 (변경 전 동작과 같습니다).

### 구현 결정

- **`text` variant는 사이즈 스타일을 따로 둡니다.** 배경·높이·패딩이 없어 `CTA_BUTTON_TEXT_SIZE_STYLES`에 radius와 타이포만 정의합니다.
- **`lg`에서 `text` variant만 18px(`heading-5`)인 것은 디자이너 확인 완료(의도됨)입니다.** 버튼 상자 없이 타이포만으로 서는 버튼이라 사이즈를 키운 것입니다. filled·outlined·tonal의 `lg`는 16px(`body-bold`), `md`(16px)·`sm`(14px)은 네 variant가 같습니다. 심볼 높이로도 확인됩니다 (lh 1.45 고정) — `31:302` text/lg 26px→18px, `31:326` text/md 23px→16px, `31:350` text/sm 20px→14px.
- **gap은 `variant × size` 축입니다** — `outlined`/`sm`과 `text`/`sm`만 2px이고 나머지 10조합은 4px입니다. 명세판 48조합을 `iconPosition=none` ↔ `right` 폭 차이로 계산했고(아이콘 크기 = 그 조합의 타이포 크기), 두 테마 · 네 상태가 전부 같은 값이라 그 두 축은 접힙니다.

  `sm`에서만 variant별로 갈리는 게 어색해 보이지만 **디자이너 확인 결과 Figma 값이 맞습니다.** 사이즈 맵에 두면 `outlined`와 `filled`·`tonal`이 같은 `sm`을 공유해 표현할 수 없어, `GAP`을 `CTA_BUTTON_SIZE_STYLES`·`CTA_BUTTON_TEXT_SIZE_STYLES`에서 떼어 `CTA_BUTTON_GAP_STYLES`로 옮겼습니다 (DOTOLI-259에서 `text`/`sm`, DOTOLI-256에서 `outlined`/`sm`).
- **히트 영역은 `text`와 `sm`만 넓힙니다** (Figma 주석 `337:3538`). 대상 지정 원칙은 CLAUDE.md [히트 영역 확장] 참고.
- **`isPending`은 Figma에 심볼이 없어** internal-ui와 같은 `circle-notch` 스피너로 맞췄습니다. `aria-busy`를 함께 겁니다.

### 디자인 확인 필요

실측 중 발견한 Figma 자체의 불일치입니다. 전부 **Figma 값 그대로** 옮겼고 임의로 보정하지 않았습니다.

| 항목                 | 내용                                                                                                                     |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `hover` == `pressed` | 8개 조합 중 5개가 두 상태 색이 같습니다 (primary/tonal, gray 전 variant). 의도인지 확인 필요                              |
| `disabled` 색 불일치 | primary는 `gray-100`/`text-gray-400`, gray는 `gray-200`. gray 안에서도 filled만 `text-gray-400`, 나머지는 `text-gray-500` |

`text`/`lg` 타이포와 `sm`의 variant별 gap은 확인 완료되어 「구현 결정」으로 옮겼습니다.

**설명 ↔ 심볼 불일치** — 컴포넌트 세트(`11:4337`)의 Figma description과 실제 variant 축이 어긋납니다. description 원문은 이렇습니다.

> CTA button component set created from selected reference: properties Variant (Filled/Outlined/Tonal), State (Default/Hover/Pressed/Disabled/Pending), Size (lg/md/sm), with label and showIcon instance properties.

| 축        | description                                     | 실제 심볼 축                                  |
| --------- | ----------------------------------------------- | --------------------------------------------- |
| `variant` | `Filled` / `Outlined` / `Tonal` (3종)           | `filled` / `outlined` / `tonal` / **`text`** (4종) |
| `state`   | `Default` / `Hover` / `Pressed` / `Disabled` / **`Pending`** (5종) | `default` / `hover` / `pressed` / `disabled` (4종, pending 없음) |
| 아이콘    | `showIcon` instance property (boolean)          | `iconPosition` variant 축 = `left` / `right` / `none` |
| `theme`   | 언급 없음                                        | `primary` / `gray` 축이 실제로 있음            |
| `size`    | `lg` / `md` / `sm`                              | 동일                                           |

---

## Filter

Figma 심볼 `179:602`(Default) · `179:603`(Selected). `295:946`은 문서용 프레임입니다.

### Variant 축

| 축         | 값                                       |
| ---------- | ---------------------------------------- |
| `isSelected` | boolean (Figma `State` = Default·Selected) |
| 아이콘     | `iconOption` 전달 여부                     |

사이즈 축도 `hover` · `pressed` · `disabled` 심볼도 없고, **없는 게 맞다고 확인받았습니다** (아래 「구현 결정」).

### 실측 스펙

| 항목    | 값                                                            |
| ------- | --------------------------------------------------------------- |
| 크기    | 69 × 33 (hug). 구현 실측 69.36 × 34.3 — 아래 「구현 결정」 참고 |
| padding | `px-[13px] py-[6px]`                                            |
| gap     | 4px                                                             |
| radius  | 6px → `rounded-md`                                              |
| border  | 1px                                                             |
| 라벨    | Pretendard SemiBold 14px → `text-label-semibold`                |
| 라벨 색 | `gray/800` `#333c51` → `text-gray-800` (두 상태 공통)           |
| 아이콘  | 14px `ListStar`(`14:275`) → `list-star`, 스트로크 1.3125px = Bold |

| `state`    | 배경                       | 테두리                         | 아이콘 색                     |
| ---------- | -------------------------- | ------------------------------ | ----------------------------- |
| `default`  | `base/white` → `bg-white`  | `gray/200` → `border-gray-200` | `gray/400` → `text-gray-400`  |
| `selected` | `blue/100` → `bg-blue-100` | `blue/300` → `border-blue-300` | `blue/600` → `text-blue-600`  |

아이콘 색은 심볼 SVG에서 직접 뽑았습니다 (`#aeb5c6` / `#2372dc`). 문서 프레임에는 나오지 않습니다.

### 구현 결정

- **라벨 타이포는 `text-label-semibold` 토큰을 씁니다.** Figma는 lh 1.5 / ls -0.14px인데 토큰은 lh 1.45 / ls -0.42px입니다. 사이즈(14px)·웨이트(600)는 정확히 일치하고, **Figma 쪽 라벨이 타이포 스타일에 바인딩되지 않은 생 텍스트**라 새 스케일을 만들 근거로 보지 않았습니다. 어긋난 값은 아래 「디자인 확인 필요」에 남깁니다.
- **높이가 Figma보다 1.3px 큽니다** (34.3 vs 33). 토큰 lh가 -0.7px, CSS 보더가 +2px입니다 — Figma는 inside stroke라 테두리가 프레임 크기에 더해지지 않지만 CSS는 더합니다. 패딩으로 보정하지 않았습니다.
- **`isSelected`는 boolean prop이고 상태를 내부에 두지 않습니다.** 외부에서 제어하고 `aria-pressed`를 함께 겁니다. Figma의 `State` 축은 문서용 표현이라 `state` union prop으로 노출하지 않습니다 (CtaButton이 `disabled`·`isPending`을 다룬 방식과 동일). 스타일 맵 키로 쓰는 `FILTER_STATES`만 상수로 둡니다.
- **처음엔 `selected`로 냈다가 `isSelected`로 바꿨습니다.** 컴포넌트가 값을 읽기만 하고 클릭은 `onClick`으로 나가는 제어형이라 성격이 상태입니다. `disabled`가 접두어 없이 가는 건 HTML 기본 속성이라서인데 `<button>`에는 `selected`가 없어 그 예외에 해당하지 않습니다 (CLAUDE.md [컴포넌트 API]의 boolean 접두어 규칙). 0.0.x 대역이라 지금 바꿨습니다.
- **아이콘은 `iconOption`으로 엽니다.** Figma는 `ListStar` 고정 + boolean 축이지만, CtaButton과 API를 맞추고 라벨마다 아이콘이 달라질 수 있어 `iconKey`를 받습니다. 안 넘기면 라벨만 렌더됩니다.
- **`hover` · `pressed` · `disabled`를 넣지 않습니다 — 디자이너 확인 완료.** 필터는 탭하면 아래로 펼쳐지는 게 아니라 **바텀시트가 뜨는 형태**라 시트 등장 자체가 피드백이어서 hover·pressed가 필요 없고, 비활성 상황에서는 칩을 **아예 렌더하지 않는** 방식으로 갑니다. 따라서 `disabled` prop도 두지 않습니다.
- **`Filter`는 바텀시트 트리거입니다.** 위 확인으로 성격이 확정됐습니다 — 옵션 하나짜리 토글 칩이 아닙니다. 적용된 필터 개수를 어떻게 표기할지는 아직 미정입니다.
- **히트 영역을 넓히지 않습니다.** Figma 주석(`337:3541` · `337:3548`)이 지정한 대상은 CtaButton의 `text`·`sm`과 IconButton뿐입니다 (CLAUDE.md [히트 영역 확장]).
- **`gap-1`을 조건 없이 겁니다.** 자식이 하나면 gap이 무효라 CtaButton처럼 `hasIcon`으로 가를 이유가 없습니다.

### 디자인 확인 필요

| 항목             | 내용                                                                                               |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| 문서 라벨 뒤바뀜 | `295:946`의 설명 텍스트만 자리가 바뀌었습니다. 심볼 자체(`State=Selected`=파랑)는 정상입니다 — 아래 좌표 참고 |
| 적용 개수 표기   | 트리거로 확정됐으므로 적용된 필터 개수를 보여줄지, 보여준다면 뱃지인지 라벨 숫자인지 미정              |
| 라벨 타이포      | lh 1.5 / ls -0.14px가 `label-semibold` 토큰(1.45 / -0.42px)과 불일치. 라벨이 스타일에 바인딩돼 있지 않습니다 |
| `Fillter` 오타   | 컴포넌트 레이어명이 `Fillter`                                                                       |

**문서 라벨 근거** — 좌표로 확인됩니다. 심볼 x는 부모 프레임 `179:604`(x=74) 기준 상대값이라 절대값으로 환산했습니다.

| 요소                          | x (295:946 기준) | 색   |
| ----------------------------- | ---------------- | ---- |
| 심볼 `179:603` `State=Selected` | 95               | 파랑 |
| 텍스트 `295:965` "Default"      | 110              | —    |
| 심볼 `179:602` `State=Default`  | 268              | 흰색 |
| 텍스트 `295:966` "Selected"     | 270              | —    |

"Default" 텍스트가 `State=Selected` 심볼 위에, "Selected" 텍스트가 `State=Default` 심볼 위에 있습니다.

---

## FloatingPill

Figma 심볼 `46:185`(navigate) · `46:184`(scrollToTop). `298:952`는 문서용 프레임입니다.

### Variant 축

| 축        | 값                         |
| --------- | -------------------------- |
| `variant` | `navigate` · `scrollToTop` |

상태 축이 없고, **없는 게 맞다고 확인받았습니다** — 비활성 상황에서는 UI를 아예 렌더하지 않는 방식으로 갑니다 (Filter와 동일).

### 실측 스펙

| 항목    | 값                                                |
| ------- | ------------------------------------------------- |
| height  | 50px (두 variant 공통)                            |
| padding | `px-[26px] py-[12px]`                             |
| gap     | 4px                                               |
| radius  | `corner radius/999` → `rounded-full`              |
| 라벨    | `heading-5` (Pretendard Bold 18px / lh 1.45)      |

| `variant`     | 배경                       | 라벨 색                      | 테두리                                     |
| ------------- | -------------------------- | ---------------------------- | ------------------------------------------ |
| `navigate`    | `blue/500` → `bg-blue-500` | `base/white` → `text-white`  | 없음                                       |
| `scrollToTop` | `base/white` → `bg-white`  | `gray/800` → `text-gray-800` | `gray/100` 0.5625px (`stroke weight/0_56`) |

shadow는 두 variant가 같은 값이라 베이스 스타일에 둡니다 — `shadow/shadow-20` → `--shadow-20`.

`scrollToTop`은 라벨 뒤에 18px `caret-up` 아이콘이 붙습니다. Figma에서는 Phosphor 인스턴스가 아니라 이름 없는 벡터(`46:181`)라 모양으로 매칭했습니다 — 채움 `#333c51`, 스트로크 두께로 보아 `bold` 웨이트.

Storybook 실측 대조 (Figma → 구현): navigate 129×50 → **132.87×50**, scrollToTop 105×50 → **105.76×50**. 높이는 정확히 일치하고, 폭 차이는 `heading-5` letter-spacing이 Figma는 `-1px`, 토큰은 `-0.01em`이라 생기는 것입니다. hug 컴포넌트라 레이아웃에 영향은 없습니다.

### 구현 결정

- **shadow를 `--shadow-20` 토큰으로 둡니다.** Figma에 `shadow/shadow-20` 이펙트 스타일이 생겨서(`DROP_SHADOW · #333C5133 · offset (0,10) · radius 20 · spread 0`) 이름을 그대로 따랐습니다. biz-ui 첫 shadow 토큰입니다. 색 `#333C51`은 `gray/800`을 20%로 쓴 값인데 Figma에서도 변수 바인딩이 아니라 리터럴이라 `rgb(51 60 81 / 0.2)`로 그대로 적었습니다.
- **두 variant가 같은 shadow를 씁니다.** 둘 다 `shadow/shadow-20` 하나에 물려 있어 베이스 스타일에 넣었습니다.
- **`box-shadow`로 통일합니다.** Figma 코드젠이 `navigate`는 `drop-shadow(0 10px 10px)`(filter), `scrollToTop`은 `box-shadow(0 10px 20px)`로 뱉지만 원본 이펙트는 같은 스타일 하나입니다. filter 쪽 blur가 절반으로 나오는 건 코드젠의 변환 방식 차이라, 이펙트 시맨틱(offset·blur·spread·color)에 그대로 대응하는 box-shadow를 택했습니다.
- **`scrollToTop`의 `Button:shadow` 레이어(`46:179`)를 별도 요소로 만들지 않습니다.** 컨테이너와 높이(50px)·radius가 같은 겹친 사각형이라 테두리와 그림자만 버튼 자체로 옮기면 동일합니다.
- **테두리는 0.5625px 그대로 씁니다.** Figma에 `stroke weight/0_56` 변수로 잡혀 있어 의도된 값으로 봤습니다. biz-ui 첫 stroke-weight 사용인데 값이 하나뿐이라 토큰화는 보류합니다.
- **높이를 `h-[50px]`로 고정합니다.** hug로 두면 50.1px이고, Figma도 `scrollToTop`의 그림자 레이어를 50px로 못박아 뒀습니다.
- **아이콘을 prop으로 열지 않고 `variant`에서 파생합니다.** `scrollToTop`은 역할이 고정이라 `caret-up` 말고 다른 아이콘을 받을 이유가 없습니다. CtaButton·Filter가 `iconOption`을 여는 것과 갈리는 지점인데, 그쪽은 아이콘이 스타일 선택지고 여기는 variant의 일부입니다.
- **포지셔닝을 컴포넌트에 넣지 않습니다.** 이름은 floating이지만 심볼에 위치 정보가 없고 `fixed` · `bottom` · safe-area는 화면마다 달라 소비자 몫입니다.
- **`transition-colors`를 걸지 않습니다.** 런타임에 바뀌는 색이 없습니다 (Filter는 `isSelected` 토글이 있어 걸었습니다).

### 디자인 확인 필요

| 항목                        | 내용                                                                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| shadow 스케일               | `shadow/shadow-20` 하나뿐입니다. 다른 단계가 생기면 알려주셔야 스케일로 정리할 수 있습니다                                           |
| stroke 0.5625px             | 의도된 값인지. 변수로 잡혀 있긴 하나 이 컴포넌트에서만 쓰입니다                                                                     |

---

## IconButton

Figma 문서 프레임 `298:1024` → 심볼 스트립 `81:210`. 착수 시점에는 샘플 8개뿐이었는데 디자이너가 **theme × state 매트릭스를 채워** 13개가 됐습니다.

### Variant 축

| 축      | 값                            |
| ------- | ----------------------------- |
| `theme` | `default` · `filled` · `dark` |
| `size`  | `lg`(40px) · `sm`(24px)       |
| 상태    | `hover` · `pressed` · `disabled` (+ `isPending`) |

`theme` 값이 CtaButton(`primary` · `gray`)과 하나도 겹치지 않습니다. `dark`는 배경이 어두운 게 아니라 **어두운 면 위에 얹는** 테마입니다 — 세 상태 모두 배경이 없고 아이콘만 흰색 계열입니다.

### 실측 스펙

| 항목      | `lg`               | `sm`               |
| --------- | ------------------ | ------------------ |
| 버튼 크기 | 40 × 40            | 24 × 24            |
| 아이콘    | 24px               | 16px               |
| radius    | 6px → `rounded-md` | 6px → `rounded-md` |

theme × state 전수 (심볼 `81:202`~`81:209` · `444:1095`~`444:1116`).

| theme     | state    | 배경                             | 아이콘 색                    |
| --------- | -------- | -------------------------------- | ---------------------------- |
| `default` | default  | 없음                             | `gray/500` `#8a93a8`         |
| `default` | hover    | `gray/100` `#f0f2f7`             | `gray/500`                   |
| `default` | pressed  | `gray/100`                       | `gray/500`                   |
| `default` | disabled | 없음                             | `gray/300` `#ced4e0`         |
| `default` | loading  | 없음                             | `gray/500`                   |
| `filled`  | default  | `base/white` `#ffffff`           | `gray/500`                   |
| `filled`  | hover    | `gray/100`                       | `gray/500`                   |
| `filled`  | pressed  | `gray/100`                       | `gray/500`                   |
| `filled`  | disabled | **없음** (흰 배경이 사라집니다)  | `gray/300`                   |
| `dark`    | default  | 없음                             | `base/white` `#ffffff`       |
| `dark`    | hover    | 없음                             | `gray/200` `#e3e6ee`         |
| `dark`    | pressed  | 없음                             | `gray/200`                   |
| `dark`    | disabled | 없음                             | `gray/300`                   |

색은 심볼 SVG에서 직접 뽑았습니다. 원본은 `IconButton/constants/index.ts`의 `ICON_BUTTON_STYLES`이고 여기에 옮겨 적은 건 대조용입니다.

### 구현 결정

- **`ButtonIcon`은 손대지 않았습니다.** 착수 전에는 "라벨이 없어 아이콘 크기를 IconButton이 직접 넘겨야 한다"고 봤는데, 사이즈 클래스(`text-[24px]` · `text-[16px]`)를 **버튼에** 걸면 Phosphor 아이콘 폰트가 `font-size`를 상속받습니다. `ButtonIcon`의 "버튼이 사이즈를 물고 있으므로 아이콘 크기를 지정하지 않는다"는 전제가 그대로 성립합니다.
- **`state`를 prop으로 노출하지 않습니다.** `hover`·`pressed`는 CSS 상태, `disabled`는 HTML 속성, `loading`은 `isPending` boolean입니다. Figma의 `state` 축은 문서용 표현이라 union prop으로 열지 않았습니다 (CtaButton·Filter와 동일).
- **`aria-label`을 필수 prop으로 받습니다.** 아이콘 전용이라 접근 가능한 이름이 없습니다. `Required<Pick<ButtonHTMLAttributes, 'aria-label'>>`로 강제합니다.
- **`isPending`은 `disabled` 스타일을 탑니다.** `disabled || isPending`으로 묶어 `generateIconButtonStyle`에 넘기므로 `filled`의 pending도 흰 배경이 사라집니다. CtaButton과 같은 처리이고, Figma에 `filled`·`dark`의 loading 심볼이 없어 외삽한 부분입니다.
- **히트 영역을 전 사이즈에 넓힙니다** (Figma 주석 `337:3548`). `TOUCH_TARGET_STYLE` + `relative`로 `lg` 40→52px, `sm` 24→36px. 시각 크기는 Figma 값 그대로입니다. **상수는 DOTOLI-241에서 `Button/shared` → `components/shared`로 옮겼습니다** — `Checkbox`가 세 번째 소비처가 되면서 버튼 계열 전용이 아니게 됐고, 이름도 `BUTTON_TOUCH_TARGET_STYLE` → `TOUCH_TARGET_STYLE`입니다. 옮기면서 **공개 API에서 빠졌습니다**(`components/shared`는 루트 배럴에 없음) — 자세한 건 [checkbox.md](./checkbox.md) 「결정」.
- **아이콘 웨이트 기본값은 `bold`입니다.** 주석 `444:1136` "icon: outline - bold / fill 사용"에 맞춰 `Icon`의 기본값(`bold`)을 그대로 쓰고 `weight` prop으로 `fill`을 열어 둡니다.

### 디자인 확인 필요

| 항목                 | 내용                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| `filled` disabled    | 흰 배경이 사라져 `default`/`dark`의 disabled와 시각적으로 구분되지 않습니다. 의도인지                          |
| `hover` == `pressed` | 세 테마 모두 두 상태가 완전히 같습니다 (CtaButton도 8개 중 5개가 동일)                                        |
| `loading` 범위       | `theme=default`에만 심볼이 있습니다. `filled`·`dark`는 disabled 스타일로 외삽했습니다                          |
| `sm` 조합            | `default`/`default`만 정의돼 있습니다. 다른 theme·state의 `sm`은 `lg` 색을 그대로 씁니다                       |
| `sm` 터치 타겟       | 24px + 12px = 36px로, 확장해도 권장 44px에 미달합니다                                                          |
| 로딩 비주얼          | 스피너 심볼이 없어 `circle-notch`(internal-ui 차용)를 씁니다. 계열 공통 스피너를 정의해 주실지                 |

---

## 파일 구조

```
apps/biz-ui/src/components/Button/
├── CtaButton/
│   ├── CtaButton.tsx
│   ├── constants/index.ts              # CtaButton 고유 SIZE/THEME/VARIANT + 스타일 · gap · 아이콘 색 매퍼
│   ├── types/index.ts
│   ├── utils/                          # 배럴에서 export 하지 않음 (내부 전용)
│   │   ├── generateCtaButtonStyle.ts     # 버튼 컨테이너
│   │   └── generateCtaButtonIconStyle.ts # 아이콘 색 (DOTOLI-256)
│   └── index.ts
├── Filter/
│   ├── Filter.tsx
│   ├── constants/index.ts              # FILTER_STATES + 베이스/상태 스타일
│   ├── types/index.ts
│   └── index.ts
├── FloatingPill/
│   ├── FloatingPill.tsx
│   ├── constants/index.ts              # FLOATING_PILL_VARIANTS + 베이스/variant 스타일
│   ├── types/index.ts
│   └── index.ts
├── IconButton/
│   ├── IconButton.tsx
│   ├── constants/index.ts              # IconButton 고유 THEME/SIZE/STATE + 스타일 매퍼
│   ├── types/index.ts
│   ├── utils/generateIconButtonStyle.ts # 배럴에서 export 하지 않음 (내부 전용)
│   └── index.ts
├── shared/                             # 버튼 계열 공통만
│   ├── ButtonIcon.tsx
│   ├── constants/index.ts
│   ├── types/index.ts
│   └── index.ts
└── index.ts

apps/storybook/src/stories/biz-ui/
├── CtaButton.stories.tsx               # core/biz-ui/Button/CtaButton, 스토리 8종
├── Filter.stories.tsx                  # core/biz-ui/Button/Filter, 스토리 3종
├── FloatingPill.stories.tsx            # core/biz-ui/Button/FloatingPill, 스토리 2종
└── IconButton.stories.tsx              # core/biz-ui/Button/IconButton, 스토리 6종
```

CtaButton은 `Matrix` 스토리가 theme × variant × size 전량을 깔아 Figma 문서 프레임(`294:1138`)과 대조용으로 씁니다. Filter는 `States`, FloatingPill은 `Variants` 스토리 하나로 대조합니다.

**`IconColors`는 DOTOLI-256에서 추가했습니다.** 기존 `WithIcon`은 `iconPosition` × `variant` × `size`를 깔되 **theme이 `primary` 고정**이고 `Themes` · `Disabled`에는 아이콘이 없어서, 아이콘 색이 갈리는 축(theme × variant × `disabled`)을 볼 스토리가 없었습니다. `hover` · `pressed`는 아이콘 색을 바꾸지 않아 상태를 둘만 깝니다.

`Filter/`·`FloatingPill/`에 `utils/`를 두지 않았습니다. 축이 2개뿐이라 스타일 조합이 `clsx` 한 줄이고, CtaButton처럼 별도 생성 함수를 둘 만큼 분기가 없습니다. IconButton은 theme × state 분기가 있어 CtaButton과 같이 `utils/`를 뒀습니다.

IconButton의 `Matrix` 스토리는 theme × size에 disabled·pending을 붙여 깝니다. `hover`·`pressed`는 CSS 상태라 정적으로 못 깔고 직접 올려봐야 합니다. `dark` 테마는 흰 아이콘이라 스토리에서 어두운 판을 깔아 보여줍니다 (Figma 문서 프레임과 동일한 방식).

---

## CollapseButton

Figma: [CollapseButton 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=129-521&m=dev) (`129:521`), 심볼 `97:296`(false) · `97:300`(true).

목록을 접고 펼치는 토글 버튼입니다. 사용예시는 소비 앱의 [Component 7](https://www.figma.com/design/LomGIAwvPAkyRbBcGbk9rs/%EA%B3%A0%EA%B0%9D-%EB%B9%84%EC%A6%88?node-id=1217-10875&m=dev) (`1217:10875`)이고, 카드 안에서 `InfoField` 목록 아래에 놓입니다.

### Variant 축

| 축       | 값                |
| -------- | ----------------- |
| `isOpen` | `false` · `true`  |

**`isOpen`이 바꾸는 것은 라벨과 caret 방향 둘뿐**이고 박스 · 색 · 크기는 완전히 같습니다.

### 실측 스펙

| 항목      | 값                                                   |
| --------- | ---------------------------------------------------- |
| 높이      | 38 → `h-[38px]` 고정 (아래 「결정」)                  |
| 폭        | 심볼 320이지만 **fill** → `w-full`                    |
| padding   | 좌우 25 → `px-[25px]`. 상하 8은 높이로 대체           |
| gap       | 4 → `gap-1`                                           |
| radius    | 6 → `rounded-6`                                       |
| 배경      | `base/white` → `bg-white`                             |
| 테두리    | 1px `gray/200` → `inset-ring inset-ring-gray-200`     |
| 라벨      | `gray/800`                                            |
| caret     | `CaretDown` 14px · weight `fill` · `gray/400` · `isOpen`이면 180° 회전 |

**폭이 fill인 근거는 사용예시입니다.** 카드 폭 340에서 좌우 마진 20을 뺀 **300**으로 들어가 있어(`1217:10883`), 심볼의 320은 문서 프레임 값입니다. `MenuItem` 420 · `InfoBanner` 380과 같은 성격입니다.

바인딩된 hex가 기존 토큰과 전부 일치해 **신규 토큰이 없습니다.**

### 결정

- **caret은 아이콘을 바꾸지 않고 회전시킵니다.** Figma가 `CaretDown` 하나를 `rotate-180`으로 뒤집습니다(`97:302`가 회전 래퍼). 계열 안에 두 방식이 다 있는데 — `InputField`는 `caret-down`/`caret-up` 두 키, `HeaderBar`·`FloatingPill`은 한 방향만 — **Figma가 회전으로 그렸으므로 그대로 옮겼습니다.**

- **타이포를 `label` 토큰으로 바꿨습니다 — Figma 실측값을 그대로 옮기지 않은 유일한 항목입니다.** 이 심볼의 텍스트에는 **타이포 변수가 바인딩돼 있지 않습니다**(같은 배치의 `InfoBanner`는 `label`, `StatusAlertBanner`는 `label-bold`가 걸려 있습니다). 그래서 영문 더미가 Figma 기본 폰트로 남아 실측이 `Inter / lh 1.5 / ls -0.01em`으로 나오는데, 크기·굵기(14 / Medium)는 `label`과 같습니다.

  | | Figma 실측 | `label` 토큰 |
  | --- | --- | --- |
  | 폰트 | Inter | **Pretendard** |
  | 크기 · 굵기 | 14 / Medium | 14 / Medium |
  | line-height | 1.5 | **1.45** |
  | letter-spacing | -0.01em | **-0.03em** |

  실제 문구가 한글이고 패키지 전체 폰트가 Pretendard라 `Inter`를 옮기는 것은 무의미합니다. **디자이너 확인을 받고 `label`로 확정했습니다.**

- **라벨을 DS가 소유합니다 — `더보기` · `접기`.** Figma 심볼의 `Expand`/`Collapse`는 영문 더미이고, 사용예시(`1217:10875`)와 Calendar 섹션의 초기 버전 프레임(`90:358`, 같은 320×38에 「더보기」)이 모두 한글입니다. `isOpen`에 종속된 문구라 소비자가 매번 두 개를 넘길 이유가 없습니다 — `Divider`의 `DIVIDER_ICON_KEYS` · `BottomTab`의 `BOTTOM_TAB_ITEMS`와 같이 **DS가 텍스트까지 소유하는 쪽**입니다 ([menu-item.md](./menu-item.md) 「결정」의 갈림 기준에서 반대편).

  상수 키는 Figma 사용예시의 심볼명(`State=Collapsed` · `State=Expanded`)을 따라 `COLLAPSED` · `EXPANDED`입니다. 「누르면 일어날 일」이 아니라 **현재 상태** 기준이라 `isOpen=true` → `EXPANDED` → 「접기」입니다.

- **높이를 고정합니다 — `h-[38px]`, `py-[8px]` 없음.** 테두리를 `inset-ring`으로 그리면 레이아웃을 차지하지 않아 패딩만으로는 `8 + 20.3 + 8 = 36.3`이 되어 Figma 38과 어긋납니다. Figma의 38이 **stroke 2px를 포함한 값**이기 때문입니다. `MenuItem`(82) · `Chip`(32) · `SelectionItem`(56)과 같은 처리입니다.

- **테두리는 `inset-ring`입니다.** CLAUDE.md 「스타일 규칙」 그대로입니다. 같은 계열의 `Filter`가 `border`인 것과 갈리는데, **그쪽은 높이를 고정하지 않아 `border`가 커져도 드러나지 않습니다.** 여기는 38을 고정해서 `border`로 그리면 40이 됩니다.

- **`aria-expanded`를 붙이고 `aria-controls`를 엽니다.** disclosure 버튼이라 상태를 보조기술에 알려야 하고, `Filter`가 `aria-pressed`를 붙인 선례와 같은 자리입니다. `aria-controls`는 **접히는 영역의 id를 소비자만 알 수 있어** 통로만 열었습니다 — CLAUDE.md 「네이티브 통로는 열고, 결정은 열지 않습니다」.

- **`isOpen`·`onClick` 둘 다 필수입니다.** 상태를 못 받으면 항상 「더보기」로 굳고, 누를 수 없으면 토글이 성립하지 않습니다. `MenuItem` · `NavigationListItem` · `Tag`와 같은 형태(`Required<Pick<…, 'onClick'>>` + `type='button'` 하드코딩)입니다.

- **`transition`을 걸지 않았습니다.** 회전을 택했으니 전환 애니메이션을 붙일 자리가 생기지만, **Figma에 모션 정의가 없습니다.** CLAUDE.md 「Figma에 없는 시각은 만들지 않습니다 — 모션도 같습니다」에 따라 아래 「디자인 확인 필요」에 올렸습니다. `hover`·`pressed` 축도 없어 `transition-colors`도 없습니다(`Tag` · `MenuItem`과 같은 판단, `Filter`와 갈리는 지점).

- **caret weight를 `fill`로 명시해 넘깁니다.** `ButtonIcon`은 `weight`를 안 주면 `ICON_DEFAULT_WEIGHT`(=`bold`)로 떨어져 **라인 캐럿이 나옵니다.** 이 심볼은 Figma가 fill이라 `COLLAPSE_BUTTON_ICON_WEIGHT`로 넘깁니다 — `TAG_ICON_WEIGHT` · `CHIP_ICON_WEIGHT` · `MENU_ITEM_ICON_WEIGHT`와 같은 상수 형태입니다.

  **처음엔 이걸 빠뜨려 `bold`로 나갔습니다.** 넘기지 않아도 타입·빌드·린트가 전부 통과하고 기본값이 조용히 채워지기 때문입니다. 계열 안의 다른 caret(`NavigationListItem` · `Notification` · `InfoBanner` · `HeaderBar` · `FloatingPill`)도 전부 `weight`를 안 넘겨 `bold`로 도는데, **그중 실측 기록이 있는 것은 `Divider`(SVG 기하로 판정) · `SearchInput`(Figma variant 표기)뿐입니다.** 나머지는 확인된 적이 없습니다.

- **아이콘 크기를 지정하지 않습니다.** `ButtonIcon`이 크기를 안 걸고 버튼의 `font-size`를 따르는데, `text-label`이 14px이라 Figma의 caret 14px와 **정확히 맞습니다.** 계열 공통 래퍼가 의도대로 동작하는 자리입니다.

### internal-ui와 갈린 지점

`apps/internal-ui/src/components/Alert/AlertCollapseButton.tsx`가 같은 목적(caret + 라벨 disclosure 토글)의 기존 구현입니다. 세 지점에서 갈리는데 **전부 Figma 실측이 근거**입니다.

| 항목            | `AlertCollapseButton`                       | `CollapseButton`                         | 갈린 근거                                    |
| --------------- | ------------------------------------------- | ---------------------------------------- | -------------------------------------------- |
| caret           | `caret-down` / `caret-up` 두 키를 교체       | `caret-down` 하나를 `rotate-180`          | Figma가 회전 래퍼(`97:302`)로 그림           |
| 문구            | `펼치기` / `접기`                            | `더보기` / `접기`                         | 사용예시 `1217:10875` · 초기 프레임 `90:358` |
| `aria-expanded` | 버튼이 아니라 `AlertBox`에 부착              | **버튼에 부착**                           | 상태를 가진 컨트롤이 버튼 자신               |

**라벨을 상수로 뺀 것도 갈린 지점입니다** — internal-ui는 JSX에 삼항으로 직접 박습니다. CLAUDE.md 코드 규칙 3(「문자열 리터럴도 매직 값」)을 따라 `COLLAPSE_BUTTON_LABELS`로 묶었습니다.

`AlertCollapseButton`은 `Alert` 컨텍스트에 묶여 있어(`useAlertContext`로 상태를 직접 읽음) 단독으로 쓸 수 없는 구조라, 제어 prop을 받는 이쪽과 애초에 층이 다릅니다.

### API

| prop            | 필수 | 기본값 | 비고                                     |
| --------------- | ---- | ------ | ---------------------------------------- |
| `isOpen`        | ✅   | —      | 라벨과 caret 방향을 결정                  |
| `onClick`       | ✅   | —      | 토글 핸들러                               |
| `aria-controls` |      | —      | 접히는 영역의 id                          |
| `className`     |      | —      | 담는 쪽의 폭·여백 보정용                  |

`ref`는 `<button>`을 가리킵니다. 라벨은 prop이 아니라 `COLLAPSE_BUTTON_LABELS`가 소유합니다.

### 디자인 확인 필요

| 항목        | 내용                                                                             |
| ----------- | ---------------------------------------------------------------------------------- |
| 회전 모션   | caret을 회전으로 그렸는데 duration · easing 정의가 없습니다. 지금은 즉시 전환입니다 |
| 상호작용    | `hover` · `pressed` · `focus` · `disabled` 축이 없습니다                            |
| 타이포 바인딩 | 심볼 텍스트에 타이포 변수가 안 걸려 있습니다. `label`로 확정했으나 원본도 정리 필요 |

### Storybook

`apps/storybook/src/stories/biz-ui/CollapseButton.stories.tsx`, `meta.title`은 `core/biz-ui/Button/CollapseButton`. 데코레이터로 **사용예시의 실제 폭인 `w-[300px]`**을 겁니다(문서 프레임 320이 아니라). 스토리 3종이고, `Interactive`가 `useState`로 회전과 문구 전환을 함께 보여주는 유일한 자리입니다 (`Filter`의 같은 이름 스토리와 같은 형태).
