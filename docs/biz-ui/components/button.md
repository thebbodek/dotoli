# Button 계열 구현 기록

`apps/biz-ui/src/components/Button` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 Button 계열 고유 사실만 둡니다.

Figma: [Button 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=46-148&m=dev) (`46:148`) → 컴포넌트 세트 `11:4337`. `294:1138`은 문서용 프레임입니다.

## 구현 현황

### 구현 완료

| 컴포넌트    | 티켓        | 설명                                                                                  |
| ----------- | ----------- | ------------------------------------------------------------------------------------- |
| `CtaButton` | DOTOLI-219  | `theme` 2 × `variant` 4 × `size` 3. 색상 32조합(theme 2 × variant 4 × state 4) 전수 실측 |
| `ButtonIcon`| DOTOLI-219  | 버튼 계열 공통 아이콘 래퍼. Phosphor는 아이콘 폰트라 글리프 크기가 `font-size`를 따르므로 크기를 따로 지정하지 않습니다 |

### 미구현

| 컴포넌트     | 비고                                                            |
| ------------ | ----------------------------------------------------------------- |
| `IconButton` | DOTOLI-217 기록상 Figma `theme`이 `default \| filled \| dark`로 CtaButton과 값이 안 겹칩니다. 전수 실측은 안 된 값이라 착수 시 Figma에서 다시 확인합니다 |
| `LinkButton` | Figma 심볼 미확인                                                |

## Variant 축

| 축             | 값                                               |
| -------------- | ------------------------------------------------ |
| `theme`        | `primary` · `gray`                               |
| `variant`      | `filled` · `outlined` · `tonal` · `text`         |
| `size`         | `lg`(52px) · `md`(40px) · `sm`(32px)             |
| `iconPosition` | `left` · `right`                                 |
| 상태           | `hover` · `pressed` · `disabled` (+ `isPending`) |

internal-ui의 `xs` 사이즈와 `red`/`green`/`yellow` 테마는 Figma에 없어 넣지 않았습니다.

## 실측 스펙

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

## 구현 결정

- **`SIZE`·`THEME`·`VARIANT`를 `shared`가 아니라 `CtaButton/` 아래에 둡니다.** `shared`에 두면 공통 모듈이 `CTA_BUTTON_THEMES`를 내보내게 되어 컴포넌트별 정의 원칙과 어긋납니다. `shared`에는 버튼 계열이 실제로 공유하는 것만 둡니다 — `ButtonIcon` · `BUTTON_ICON_POSITIONS` · `BUTTON_PENDING_ICON_KEY` · `BUTTON_TOUCH_TARGET_STYLE`.
- **`text` variant는 사이즈 스타일을 따로 둡니다.** 배경·높이·패딩이 없어 `CTA_BUTTON_TEXT_SIZE_STYLES`에 radius와 타이포만 정의합니다.
- **히트 영역은 `text`와 `sm`만 넓힙니다** (Figma 주석 `337:3538`). 대상 지정 원칙은 CLAUDE.md [히트 영역 확장] 참고.
- **`isPending`은 Figma에 심볼이 없어** internal-ui와 같은 `circle-notch` 스피너로 맞췄습니다. `aria-busy`를 함께 겁니다.
- **Storybook `iconOption`은 `iconKey`를 최상위로 펴서 받습니다.** 점 표기 argType(`'iconOption.iconKey'`)은 런타임은 되지만 타입이 깨져서, internal-ui Button 스토리처럼 `CtaButtonArgs`로 펴고 render에서 다시 묶습니다.

## 디자인 확인 필요

실측 중 발견한 Figma 자체의 불일치입니다. 전부 **Figma 값 그대로** 옮겼고 임의로 보정하지 않았습니다.

| 항목                | 내용                                                                                                              |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `hover` == `pressed` | 8개 조합 중 5개가 두 상태 색이 같습니다 (primary/tonal, gray 전 variant). 의도인지 확인 필요                       |
| `disabled` 색 불일치 | primary는 `gray-100`/`text-gray-400`, gray는 `gray-200`. gray 안에서도 filled만 `text-gray-400`, 나머지는 `text-gray-500` |
| `text`/`lg` 타이포   | `text` variant의 `lg`만 `heading-5`로 뜁니다. md·sm은 다른 variant와 동일(`body-semibold`/`label-bold`)            |
| variant 개수        | 컴포넌트 설명은 `Filled/Outlined/Tonal` 3종인데 실제 심볼엔 `text`가 더 있습니다                                    |
| `pending` 상태      | 설명엔 `State(...Pending)`이 있는데 실제 심볼엔 없습니다                                                            |
| 아이콘 속성명       | 설명은 `showIcon`(boolean), 실제 축은 `iconPosition`(left/right)                                                   |
| `base/white` 토큰   | `theme.css`에 white/black 베이스 토큰이 없습니다. 추가할지 Tailwind 기본 `text-white`로 갈지 결정 필요             |

## 파일 구조

```
apps/biz-ui/src/components/Button/
├── CtaButton/
│   ├── CtaButton.tsx
│   ├── constants/index.ts              # CtaButton 고유 SIZE/THEME/VARIANT + 스타일 매퍼
│   ├── types/index.ts
│   ├── utils/generateCtaButtonStyle.ts # 배럴에서 export 하지 않음 (내부 전용)
│   └── index.ts
├── shared/                             # 버튼 계열 공통만
│   ├── ButtonIcon.tsx
│   ├── constants/index.ts
│   ├── types/index.ts
│   └── index.ts
└── index.ts

apps/storybook/src/stories/biz-ui/
└── CtaButton.stories.tsx               # core/biz-ui/Button/CtaButton, 스토리 7종
```

`Matrix` 스토리가 theme × variant × size 전량을 깔아 Figma 문서 프레임(`294:1138`)과 대조용으로 씁니다.
