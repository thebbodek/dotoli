# Button 계열 구현 기록

`apps/biz-ui/src/components/Button` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 Button 계열 고유 사실만 둡니다.

Figma: [Button 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=46-148&m=dev) (`46:148`). 섹션 안의 `294:1138`(CtaButton) · `295:946`(Filter) · `298:952`(FloatingPill) · `298:1024`(IconButton)는 전부 문서용 프레임이고, 실제 값은 각 컴포넌트 세트에서 실측했습니다.

## 구현 현황

### 구현 완료

| 컴포넌트     | 티켓       | 설명                                                                                                                    |
| ------------ | ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| `CtaButton`  | DOTOLI-219 | `theme` 2 × `variant` 4 × `size` 3. 색상 32조합(theme 2 × variant 4 × state 4) 전수 실측                                  |
| `ButtonIcon` | DOTOLI-219 | 버튼 계열 공통 아이콘 래퍼. Phosphor는 아이콘 폰트라 글리프 크기가 `font-size`를 따르므로 크기를 따로 지정하지 않습니다 |
| `Filter`     | DOTOLI-222 | `state` 2 × 아이콘 유무. 사이즈 축 없는 단일 칩                                                                          |

### 미구현

| 컴포넌트       | 티켓       | 비고                                                                                                                                                                    |
| -------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FloatingPill` | DOTOLI-223 | `variant`(navigate·scrollToTop). biz-ui 첫 shadow 사용. Figma `298:952`                                                                                                   |
| `IconButton`   | DOTOLI-224 | `theme`(default·filled·dark) × `state` 5 × `size`(lg·sm). CtaButton과 `theme` 값이 안 겹칩니다. 전수 실측은 안 된 값이라 착수 시 Figma에서 다시 확인합니다. Figma `298:1024` |
| `LinkButton`   | —          | Figma 심볼 미확인                                                                                                                                                        |

두 티켓의 실측 스펙·주의사항·디자인 확인 필요 목록은 [`plan.md`](../plan.md)의 태스크 상세 8~9번에 있습니다. 구현 후 결과는 이 파일로 옮깁니다.

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

사이즈 축이 없고 `hover` · `pressed` · `disabled` 심볼도 없어 해당 축을 넣지 않았습니다.

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
- **`disabled`를 노출하지 않습니다.** Figma에 disabled 심볼이 없어 시각 정의가 없습니다. 지금 넣으면 눌리지 않는데 활성처럼 보입니다. 나중에 추가하는 건 비파괴 변경이라 디자인 확정 후로 미룹니다.
- **히트 영역을 넓히지 않습니다.** Figma 주석(`337:3541` · `337:3548`)이 지정한 대상은 CtaButton의 `text`·`sm`과 IconButton뿐입니다 (CLAUDE.md [히트 영역 확장]).
- **`gap-1`을 조건 없이 겁니다.** 자식이 하나면 gap이 무효라 CtaButton처럼 `hasIcon`으로 가를 이유가 없습니다.

### 디자인 확인 필요

| 항목             | 내용                                                                                               |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| 문서 라벨 뒤바뀜 | `295:946`의 설명 텍스트만 자리가 바뀌었습니다. 심볼 자체(`State=Selected`=파랑)는 정상입니다 — 아래 좌표 참고 |
| 상호작용 상태    | `hover` · `pressed` · `disabled` 심볼이 없습니다. 터치 시 피드백이 없어 `pressed`만이라도 필요합니다 |
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
├── shared/                             # 버튼 계열 공통만
│   ├── ButtonIcon.tsx
│   ├── constants/index.ts
│   ├── types/index.ts
│   └── index.ts
└── index.ts

apps/storybook/src/stories/biz-ui/
├── CtaButton.stories.tsx               # core/biz-ui/Button/CtaButton, 스토리 7종
└── Filter.stories.tsx                  # core/biz-ui/Button/Filter, 스토리 3종
```

CtaButton은 `Matrix` 스토리가 theme × variant × size 전량을 깔아 Figma 문서 프레임(`294:1138`)과 대조용으로 씁니다. Filter는 축이 작아 `States` 스토리 하나로 대조합니다.

`Filter/`에 `utils/`를 두지 않았습니다. 상태가 2개뿐이라 스타일 조합이 `clsx` 한 줄이고, CtaButton처럼 별도 생성 함수를 둘 만큼 분기가 없습니다.
