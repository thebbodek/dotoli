# Button 계열 구현 기록

`apps/biz-ui/src/components/Button` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 Button 계열 고유 사실만 둡니다.

Figma: [Button 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=46-148&m=dev) (`46:148`). 섹션 안의 `294:1138`(CtaButton) · `295:946`(Filter) · `298:952`(FloatingPill) · `298:1024`(IconButton)는 전부 문서용 프레임이고, 실제 값은 각 컴포넌트 세트에서 실측했습니다.

## 구현 현황

| 컴포넌트     | 티켓       | 설명                                                                                                                    |
| ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| `CtaButton`  | DOTOLI-219 | `theme` 2 × `variant` 4 × `size` 3. 색상 32조합(theme 2 × variant 4 × state 4) 전수 실측                                  |
| `ButtonIcon` | DOTOLI-219 | 버튼 계열 공통 아이콘 래퍼. Phosphor는 아이콘 폰트라 글리프 크기가 `font-size`를 따르므로 크기를 따로 지정하지 않습니다 |
| `Filter`     | DOTOLI-222 | `state` 2 × 아이콘 유무. 사이즈 축 없는 단일 칩                                                                          |
| `FloatingPill` | DOTOLI-223 | `variant` 2(navigate·scrollToTop). biz-ui 첫 shadow 토큰(`--shadow-20`) 사용                                          |
| `IconButton` | DOTOLI-224 | `theme` 3 × `size` 2. theme × state 13조합 전수 실측                                                                     |

Figma Button 섹션에 정의된 컴포넌트는 전부 구현했습니다.

## 계열 공통 결정

- **`SIZE`·`THEME`·`VARIANT`를 `shared`가 아니라 각 컴포넌트 폴더 아래에 둡니다.** `shared`에 두면 공통 모듈이 `CTA_BUTTON_THEMES`를 내보내게 되어 컴포넌트별 정의 원칙과 어긋납니다. `shared`에는 계열이 실제로 공유하는 것만 둡니다 — `ButtonIcon` · `BUTTON_ICON_POSITIONS` · `BUTTON_PENDING_ICON_KEY` · `BUTTON_TOUCH_TARGET_STYLE`.
- **`base/white`는 별도 토큰을 만들지 않고 Tailwind 기본 `white`를 씁니다.** Figma `base/white`가 `#ffffff`로 Tailwind 기본값과 같아 토큰을 새로 정의할 이유가 없습니다. CtaButton(`text-white`)과 Filter(`bg-white`)가 같은 판단이고, FloatingPill·IconButton도 이 결정을 따릅니다.
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

### 구현 결정

- **`text` variant는 사이즈 스타일을 따로 둡니다.** 배경·높이·패딩이 없어 `CTA_BUTTON_TEXT_SIZE_STYLES`에 radius와 타이포만 정의합니다.
- **`lg`에서 `text` variant만 18px(`heading-5`)인 것은 디자이너 확인 완료(의도됨)입니다.** 버튼 상자 없이 타이포만으로 서는 버튼이라 사이즈를 키운 것입니다. filled·outlined·tonal의 `lg`는 16px(`body-bold`), `md`(16px)·`sm`(14px)은 네 variant가 같습니다. 심볼 높이로도 확인됩니다 (lh 1.45 고정) — `31:302` text/lg 26px→18px, `31:326` text/md 23px→16px, `31:350` text/sm 20px→14px.
- **히트 영역은 `text`와 `sm`만 넓힙니다** (Figma 주석 `337:3538`). 대상 지정 원칙은 CLAUDE.md [히트 영역 확장] 참고.
- **`isPending`은 Figma에 심볼이 없어** internal-ui와 같은 `circle-notch` 스피너로 맞췄습니다. `aria-busy`를 함께 겁니다.

### 디자인 확인 필요

실측 중 발견한 Figma 자체의 불일치입니다. 전부 **Figma 값 그대로** 옮겼고 임의로 보정하지 않았습니다.

| 항목                 | 내용                                                                                                                     |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `hover` == `pressed` | 8개 조합 중 5개가 두 상태 색이 같습니다 (primary/tonal, gray 전 variant). 의도인지 확인 필요                              |
| `disabled` 색 불일치 | primary는 `gray-100`/`text-gray-400`, gray는 `gray-200`. gray 안에서도 filled만 `text-gray-400`, 나머지는 `text-gray-500` |

`text`/`lg` 타이포는 확인 완료되어 「구현 결정」으로 옮겼습니다.

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
| `selected` | boolean (Figma `State` = Default·Selected) |
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
- **`selected`는 boolean prop이고 상태를 내부에 두지 않습니다.** 외부에서 제어하고 `aria-pressed`를 함께 겁니다. Figma의 `State` 축은 문서용 표현이라 `state` union prop으로 노출하지 않습니다 (CtaButton이 `disabled`·`isPending`을 다룬 방식과 동일). 스타일 맵 키로 쓰는 `FILTER_STATES`만 상수로 둡니다.
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
- **`transition-colors`를 걸지 않습니다.** 런타임에 바뀌는 색이 없습니다 (Filter는 `selected` 토글이 있어 걸었습니다).

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
- **히트 영역을 전 사이즈에 넓힙니다** (Figma 주석 `337:3548`). `BUTTON_TOUCH_TARGET_STYLE` + `relative`로 `lg` 40→52px, `sm` 24→36px. 시각 크기는 Figma 값 그대로입니다.
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
│   ├── constants/index.ts              # CtaButton 고유 SIZE/THEME/VARIANT + 스타일 매퍼
│   ├── types/index.ts
│   ├── utils/generateCtaButtonStyle.ts # 배럴에서 export 하지 않음 (내부 전용)
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
├── CtaButton.stories.tsx               # core/biz-ui/Button/CtaButton, 스토리 7종
├── Filter.stories.tsx                  # core/biz-ui/Button/Filter, 스토리 3종
├── FloatingPill.stories.tsx            # core/biz-ui/Button/FloatingPill, 스토리 2종
└── IconButton.stories.tsx              # core/biz-ui/Button/IconButton, 스토리 6종
```

CtaButton은 `Matrix` 스토리가 theme × variant × size 전량을 깔아 Figma 문서 프레임(`294:1138`)과 대조용으로 씁니다. Filter는 `States`, FloatingPill은 `Variants` 스토리 하나로 대조합니다.

`Filter/`·`FloatingPill/`에 `utils/`를 두지 않았습니다. 축이 2개뿐이라 스타일 조합이 `clsx` 한 줄이고, CtaButton처럼 별도 생성 함수를 둘 만큼 분기가 없습니다. IconButton은 theme × state 분기가 있어 CtaButton과 같이 `utils/`를 뒀습니다.

IconButton의 `Matrix` 스토리는 theme × size에 disabled·pending을 붙여 깝니다. `hover`·`pressed`는 CSS 상태라 정적으로 못 깔고 직접 올려봐야 합니다. `dark` 테마는 흰 아이콘이라 스토리에서 어두운 판을 깔아 보여줍니다 (Figma 문서 프레임과 동일한 방식).
