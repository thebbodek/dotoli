# @bbodek/biz-ui

뽀득 비즈파트너(모바일 WebView)용 디자인시스템입니다. `@bbodek/internal-ui`(어드민·데스크톱)와 **완전히 독립**이며 서드파티만 직접 의존합니다.

## 작성 전 절차

**코드를 쓰기 전에 아래를 순서대로 끝냅니다.** 3번까지 마치기 전에 파일을 만들지 않습니다.

1. **문서 확인** — `docs/biz-ui/plan.md`에서 해당 티켓의 범위와 결정 사항을 읽습니다. 이미 만든 컴포넌트 계열을 건드리면 `docs/biz-ui/components/<name>.md`도 함께 읽습니다. 환경·토큰·스타일 레이어 관련이면 `docs/biz-ui/frontend.md`.
2. **이 파일 전체를 읽습니다** — 컴포넌트 API 축 · 스타일 · 패키징 규칙.
3. **[코드 규칙](#코드-규칙) 4가지를 어떻게 지킬지 먼저 정합니다** — 특히 무엇을 어느 파일로 분리할지.
4. Figma에서 variant 축과 스펙을 **직접 실측**합니다. 다른 DS의 값을 추정으로 옮기지 않습니다.

biz-ui는 제품 기능이 아니라 DS 인프라라 `spec.md` · `api.md`가 없습니다. 요구사항 1차 출처는 **Figma**이고, 문서는 결정 기록입니다.

작업이 끝나면 `docs/biz-ui/components/<name>.md`에 실측 스펙 · 결정 · 디자인 확인 필요 목록을 남깁니다. 규칙을 새로 정했으면 이 파일에 씁니다 — **규칙은 한 곳에서만 정의하고**, 코드 주석·`plan.md`·커밋 메시지에서는 가리키기만 합니다.

## 코드 규칙

가장 자주 빠뜨리는 5가지입니다. 1~4는 현재 `src/`가 전부 지키고 있으니 깨뜨리지 않습니다. 5는 이후 작성분부터 적용합니다.

**1. 컴포넌트 파일에 인라인 선언 금지.** `*.tsx`에는 컴포넌트만 둡니다. 타입은 `types/`, 상수는 `constants/`, 유틸은 `utils/`로 분리하고 `@/` 절대경로로 import 합니다. DS 패키지라 컴포넌트는 서브 컴포넌트가 없어도 폴더로 만들고 배럴(`index.ts`)을 둡니다.

```
components/<Group>/<Component>/
├── <Component>.tsx     # 컴포넌트만
├── constants/index.ts
├── types/index.ts
├── utils/              # 필요할 때만
└── index.ts            # 배럴. 내부 전용 유틸은 export 하지 않음
```

계열이 생기면 `<Group>/shared/`에 **진짜 공통인 것만** 둡니다. `variant`·`theme`·`size`는 값이 컴포넌트마다 달라 여기 두지 않습니다.

**`shared`는 층에 따라 공개 범위가 다릅니다.**

| 위치                    | 성격                          | 배럴                                                  |
| ----------------------- | ----------------------------- | ----------------------------------------------------- |
| `<Group>/shared/`       | 계열 안의 공통 조각           | `<Group>/index.ts`가 내보냄 → **공개** (`ButtonIcon`)  |
| `components/shared/`    | 계열 **사이**의 내부 배선     | `components/index.ts`가 내보내지 않음 → **비공개**      |

계열 안의 것은 계열의 일부라 함께 공개하고, 최상위 `shared/`는 완성된 컴포넌트가 물어 쓰는 껍데기라 소비자에게 열지 않습니다. **소비자의 진입점은 항상 완성된 컴포넌트**이고, 새 모양이 필요하면 껍데기를 열어 주는 게 아니라 컴포넌트를 하나 더 만듭니다 — internal-ui가 `Overlay`를 비공개로 두고 `Modal`·`BottomSheet`·`FullScreenDialog`·`SideSheet`를 계속 추가한 방식입니다. 공개는 되돌리기 비대칭이라(빼면 소비 앱이 깨짐) 필요가 확인될 때 여는 순서로 갑니다.

**2. 함수 파라미터는 객체 구조 분해.** `(a, b)`가 아니라 항상 `({ a, b })`. 파라미터 타입도 `types/`로 분리합니다 (`({ a }: { a: string })` 같은 인라인 리터럴 타입 지양). 이벤트 핸들러는 예외입니다.

**3. 매직 값은 상수로.** 숫자뿐 아니라 상태·모드를 나타내는 **문자열 리터럴도 매직 값**입니다. 동일 관심사는 `as const` 객체로 묶고 `(typeof X)[keyof typeof X]`로 타입을 뽑습니다 (`CTA_BUTTON_VARIANTS` 참고). 배열 인덱스와 한 번만 쓰는 UI 텍스트는 예외입니다.

**4. 타입 중복 금지.** 같은 계열에 비슷한 타입이 있으면 재선언하지 말고 `Pick`·`Omit`·`Partial`·`extends`로 재사용합니다. HTML 속성은 직접 나열하지 말고 `Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'disabled' | …>` 형태로 가져옵니다.

**선언 형태는 internal-ui를 따릅니다** — 객체 타입은 `interface`, `type`은 `interface`로 표현할 수 없을 때만 씁니다.

```ts
// 유니온 → type (다른 방법이 없음)
export type CheckboxState = (typeof CHECKBOX_STATES)[keyof typeof CHECKBOX_STATES];

// 파생 props → interface + extends Pick (internal-ui `GenerateButtonStyleProps` 형태)
export interface ResolveCheckboxStateProps
  extends Pick<CheckboxProps, 'checked' | 'disabled'> {}
```

**`export type X = Y;` 같은 순수 별칭은 만들지 않습니다.** 이름만 하나 늘고 찾아 들어가야 할 곳이 생깁니다. 원시 타입에 도메인 이름을 붙이는 경우(`type CalendarYear = number`)만 예외입니다.

> `src/`에 아직 이 형태를 안 따르는 곳이 남아 있습니다 — `Order/*`의 `type Resolve*Props = Pick<…>` 5건과, prop을 다시 나열한 `GenerateCtaButtonStyleProps`입니다. 손대는 김에 함께 고칩니다.

**5. 주석은 최대한 지양.** 코드를 읽으면 알 수 있는 것은 쓰지 않습니다. 예외 상황 — 코드에 드러나지 않는 판단 근거, 피해 간 함정, 일부러 하지 않은 것 — 에만 답니다. 실측값·결정 기록은 주석이 아니라 `docs/biz-ui/components/<name>.md`가 맡습니다.

쓰더라도 **화면에 노출되지 않는 진짜 주석**으로 씁니다. Storybook은 스토리 위 JSDoc 블록과 `argTypes.description`을 Docs 페이지에 그대로 렌더하므로 스토리 파일에는 둘 다 쓰지 않고, 남길 게 있으면 `//`로 답니다.

## 컴포넌트 API

**Figma BIZpartner 파일의 실제 축을 직접 실측해서 판단합니다.** `@bbodek/internal-ui`(어드민·데스크톱)는 타깃이 달라 축이 겹치지 않으므로 그쪽 구현을 그대로 옮기지 않습니다.

| 항목              | internal-ui                                 | biz-ui                                                                     |
| ----------------- | ------------------------------------------- | -------------------------------------------------------------------------- |
| `size` 스케일     | `xs \| sm \| md \| lg`                      | CtaButton은 `sm \| md \| lg` — `xs` 없음                                    |
| `theme` 값        | Button은 `primary \| gray \| red \| green \| yellow` | CtaButton은 `primary \| gray` 2종                                  |
| 상호작용 상태     | `hover` 중심                                | Figma가 `hover`·`pressed` 모두 정의. 터치 기기에선 `pressed`(`:active`)가 주력 |
| `responsive` prop | `mobile / tablet / desktop`                 | 모바일 단일 타깃이라 넣지 않음                                              |
| radius 토큰       | `--radius-in-*` 스케일                      | 새로 만들지 않음. Figma 8px/6px가 `rounded-lg`/`rounded-md`와 일치          |
| Storybook 타이틀  | `core/internal-ui/…`                        | `core/biz-ui/…`                                                             |

**컴포넌트 이름은 biz-ui Figma 심볼명을 따릅니다.** internal-ui의 `Button`이 여기선 `CtaButton`인 이유입니다. 파생 방식(`Multi`·`Search` 같은 수식어 스택, 용도 접두어 + 형태 접미어)은 internal-ui와 같으니 그쪽 트리를 먼저 봅니다.

**Boolean prop은 `is`(상태) · `use`(기능 on/off) · `has`(존재) 중 하나를 붙입니다.** HTML 기본 속성만 접두어 없이 씁니다(`disabled` · `required`). 해당 요소에 없는 속성이면 기본 속성이 아닙니다 — `<button>`에 `selected`가 없으므로 Filter의 선택 상태는 `isSelected`입니다. internal-ui의 `visible` · `dimmed` · `possibleConfirm`은 이탈 사례라 따라가지 않습니다(오버레이 열림은 `isOpen`).

**`theme` union은 컴포넌트별로 정의합니다.** 값이 컴포넌트마다 달라서입니다 — CtaButton은 `primary | gray`, internal-ui IconButton은 `hover-gray | hover-white | bg-white | white | dark`. internal-ui도 같은 방식이라 biz-ui만의 차이는 아닙니다. 버튼 계열 `shared`에는 `variant`·`theme`·`size`를 두지 않습니다.

### `theme='primary'` ↔ 컬러 토큰 `blue`

이름이 다른 것은 의도된 것이고 레이어가 다릅니다. **토큰**은 Figma 변수명 그대로(`--color-blue-500`), **컴포넌트 API**는 역할(`theme='primary'`)입니다. 맞추려고 어느 한쪽을 바꾸지 않습니다.

### `hover` / `pressed`

Tailwind v4의 `hover:`는 이미 `@media (hover: hover)`로 감싸져 나오므로 **따로 래핑하지 않습니다.** 터치 기기에서는 `active:`(pressed)만 걸립니다.

### 히트 영역 확장

**디자이너가 Figma 주석으로 지정한 대상, 그리고 WCAG 2.5.8 미달인 대상을 확장합니다.** 시각 크기는 Figma 값 그대로 두고 히트 영역만 넓힙니다 — 레이아웃이 밀리면 안 되기 때문입니다. 이 둘 중 어디에도 안 걸리면 임의로 넣지 않습니다.

**WCAG 2.5.8(Target Size Minimum, AA)은 24×24 CSS px입니다.** 주석이 없어도 **실측 히트 영역이 어느 한 축이라도 24 미만이면 확장합니다.** 접근성 최소치는 디자인 판단이 아니라 지켜야 하는 선이고, 시각 크기를 안 건드리므로 Figma와 어긋나지도 않습니다. `StatusAlertBanner`가 첫 사례입니다 — 닫기 14×14 · 보기 23.38×20.3이라 둘 다 미달이었고 6px을 걸어 26×26 · 35.38×32.3으로 올렸습니다.

**넣고 나면 컴포넌트 문서의 「디자인 확인 필요」에 올립니다.** 주석 없이 DS가 판단한 것이므로 디자이너가 되돌릴 여지를 남겨 둡니다 — 되돌린다면 확장을 빼는 게 아니라 **Figma에서 대상을 키우는 쪽**입니다.

구현은 `components/shared/constants`에 있고 쓰는 쪽에서 `position: relative`를 함께 겁니다. **버튼 계열 전용이 아닙니다** — `CtaButton` · `IconButton` · `Checkbox` · `HeaderBar` · `Chip` · `Toggle` · `InfoBanner` · `StatusAlertBanner`가 함께 씁니다.

**`cursor`도 확장을 얹은 요소에 겁니다.** `::before`가 음수 `inset`으로 시각 박스를 통째로 덮으므로 **커서와 히트 판정이 전부 그 요소 것으로 잡힙니다.** 안쪽 자식에 `cursor-pointer`를 두면 확장부는 물론 **시각 박스 위에서도 기본 화살표가 나옵니다.** `Toggle`이 실제로 그랬고(트랙에 걸었다가 라벨로 옮김), `Checkbox` · `Chip` · `SelectionItem` · `ItemCheckbox`는 처음부터 라벨에 두고 있습니다.

| 상수                        | 확장  | 쓰는 곳                                             |
| --------------------------- | ----- | --------------------------------------------------- |
| `TOUCH_TARGET_STYLE`        | 6px   | 기본값. 단독으로 놓이는 컨트롤                       |
| `TOUCH_TARGET_NARROW_STYLE` | 4px   | **여러 개가 나열되는 컨트롤** — 확장분이 서로 겹칠 때 |

**나열되는 컴포넌트는 이웃과의 간격을 먼저 봅니다.** 확장은 양쪽으로 퍼지므로 두 요소 사이에서 `확장 × 2`가 간격보다 크면 히트 영역이 겹쳐 **엉뚱한 쪽이 눌립니다.** `Chip`이 그 사례입니다 — 그룹 gap이 10px이라 6px(=12px)는 겹치고 4px(=8px)는 안 겹칩니다.

`확장 × 2`가 간격과 **정확히 같으면 겹치지 않고 맞닿기만 합니다.** 판정이 뒤집히지는 않지만 경계의 dead zone이 0이라 오탭이 늘 수 있으니, 알고 고르는 값이어야 합니다. `StatusAlertBanner`가 그렇습니다 — 버튼 사이 gap이 12라 6px이 딱 맞닿습니다.

**둘이 부딪치면 WCAG가 이깁니다.** 좁은 값으로 낮췄더니 24×24를 못 넘긴다면, 미달을 감수하지 말고 **맞닿는 쪽을 택합니다.** `StatusAlertBanner`에서 `TOUCH_TARGET_NARROW_STYLE`을 쓰면 닫기가 22×22에서 멈춰 `TOUCH_TARGET_STYLE`로 올린 것이 이 경우입니다. 그래도 못 넘기면 확장으로 풀 수 있는 문제가 아니므로 Figma 쪽을 고쳐야 합니다.

### 폼 컨트롤 공통

`Checkbox` · `Toggle` · `Chip` · `SelectionItem` · `SearchInput`처럼 **사용자가 값을 바꾸는 컴포넌트**에 공통으로 적용합니다. 아래 대부분은 DOTOLI-241에서 internal-ui와 대조하며 정한 것이고, 실측 근거는 [`docs/biz-ui/components/checkbox.md`](../../docs/biz-ui/components/checkbox.md)에 있습니다.

**1. 네이티브 컨트롤을 쓰고 `sr-only`로 숨깁니다.** `hidden`(`display: none`)은 화면뿐 아니라 **접근성 트리에서도 요소를 들어내고 포커스도 막습니다.** 시각 박스는 보통 `aria-hidden`이라, 둘이 겹치면 보조기술에 컨트롤이 아예 존재하지 않게 됩니다. internal-ui `Checkbox`가 그 상태이므로 따라가지 않습니다.

**2. 상태는 CSS variant가 아니라 JS로 풉니다.** `resolve<Name>State`가 상태 키 하나를 돌려주고 `Record<State, string>`에서 클래스 한 줄을 고릅니다 (`Input/shared`의 `resolveInputState` 선례). 값이 이미 제어 prop이라 `peer-checked:` 같은 variant를 겹쳐 쌓을 이유가 없고, 「런타임 조합만 safelist에 보존」 규칙과도 결이 맞습니다.

**3. 시각 상태를 색으로만 가리지 않습니다.** 글리프를 항상 렌더해 두고 배경과 같은 색으로 숨기는 방식은, **배경색이 바뀌는 상태가 추가되는 순간 그대로 드러납니다.** internal-ui `Checkbox`의 `disabled` + `unchecked`가 실제로 그렇습니다(회색 배경 위에 흰 체크가 보임). 조건부 렌더로 없앱니다.

**4. 제어 전용입니다.** 값과 변경 핸들러를 `Required<Pick<…>>`로 묶습니다. 시각 상태를 JS로 푸는 구조라 비제어와 공존하면 표시와 실제 값이 갈립니다.

**5. 네이티브 통로는 열고, 결정은 열지 않습니다.** `ref` · `id` · `name` · `value`처럼 **소비자가 판단할 것이 없는 HTML 통로**는 `Pick`으로 그대로 엽니다. 막으면 외부 `<label for>` 연결 · 검증 실패 시 포커스 이동 · `indeterminate`(속성이 아니라 DOM 프로퍼티라 `ref` 외에는 도달 불가) 같은 것을 소비자가 **아예 할 수 없습니다.**

반대로 **소비자가 매번 기억하고 정해야 하는 스위치는 만들지 않습니다.** DOTOLI-241의 `useTouchTarget`이 그 사례입니다 — 끌 필요가 있는 쪽이 DS 내부 컴포넌트 하나뿐인데 공개 prop으로 열면 모든 소비자의 결정거리가 됩니다. DS 내부에서만 필요한 분기는 context 같은 비공개 수단으로 풉니다.

**6. 접근성 이름은 소비자가 붙입니다.** 라벨 텍스트가 없는 컨트롤은 이름을 스스로 만들 수 없으므로 `aria-label` · `aria-labelledby`만 열어 둡니다. **라벨이 붙는 형태는 별도 컴포넌트입니다** — Figma가 이미 그렇게 나눠 놨습니다(`Checkbox` ↔ `ItemCheckbox`, `Toggle` ↔ `ToggleListItem`). 그쪽이 자기 라벨의 id를 `aria-labelledby`로 내려 줍니다.

**7. Figma에 없는 시각은 만들지 않습니다 — 포커스 링도 포함입니다.** 1번 때문에 실제 컨트롤이 화면에 없어 **키보드 포커스가 아무 데도 보이지 않는 상태**인데, 지정되지 않은 시각을 임의로 채우지 않고 각 컴포넌트 문서의 「디자인 확인 필요」에 남깁니다. 모션도 같습니다.

**8. 상태 전환에 `transition-colors`를 겁니다** (`Filter` · `CtaButton` · `IconButton` 선례). `box-shadow`는 여기 포함되지 않아 `inset-ring`으로 그린 테두리는 즉시 바뀝니다 — `Input`의 포커스 링도 같으므로 맞춘 것이고, 바꾸려면 계열 전체를 함께 봅니다.

## 스타일 규칙

- **토큰에 프리픽스를 붙이지 않습니다.** `--color-blue-500` · `text-body` · `safe-area-top`. internal-ui의 `in-`은 그쪽이 다른 DS와 한 앱에서 공존하느라 붙인 것이라 따라가지 않습니다.
- **컬러·타이포 이름은 Figma 명명을 그대로** 씁니다. `blue`를 `primary`로 개명하지 않습니다.
- **`text-*`에 `/` 수식어를 쓰지 않습니다.** 컬러(`text-blue-500/50`=투명도)와 타이포(`text-body/50`=line-height)에서 뜻이 다르고, 타이포 쪽은 `font-weight`·`letter-spacing`이 사라집니다. 경고 없이 컴파일되므로 규칙으로 막습니다.
- **`Icon`의 `weight`는 `regular` · `bold` · `fill` 3종뿐입니다.** `globals.css`가 이 3종 웹폰트만 import 하므로 나머지를 넘기면 렌더되지 않습니다. `ICON_WEIGHTS`로 타입에서 막혀 있습니다.
- **테두리는 `border`가 아니라 `inset-ring`으로 그립니다** (Tailwind v4 유틸 = `box-shadow: inset 0 0 0 Npx`). Figma stroke는 안쪽으로 그려져 박스를 안 키우는데 CSS `border`는 키웁니다. **두께가 상태별로 바뀌든(Input 1px↔2px) variant별로 있고 없든(Badge `tonal`만) 결과는 같습니다** — 콘텐츠가 밀리고 Figma 실측 크기가 어긋납니다. `filled`에 투명 `border`를 넣는 흔한 우회법은 시프트만 없앨 뿐 크기는 여전히 틀리고, `box-sizing: content-box`는 내용에 맞춰 늘어나는 요소에선 아예 무효입니다. `outline`도 레이아웃 영향은 없지만 포커스 링과 용도가 겹쳐 피합니다. box-shadow 기반이라 `forced-colors` 모드에서 사라지는 것은 모바일 WebView 타깃이라 감수합니다.

  **이 규칙은 「박스를 감싸는 테두리」에만 적용됩니다.** 아래 둘은 `border-*`가 맞고, 예외가 아니라 애초에 다른 것입니다.

  | 무엇 | 어떻게 | 왜 |
  | --- | --- | --- |
  | 박스를 감싸는 테두리 | `inset-ring` | Figma stroke가 안쪽이라 박스를 안 키움 |
  | **행·구획을 가르는 선** | `border-t` · `border-b` | 자리를 차지하는 것이 맞음. `BottomTab` · `OrderNotiCollapse` · `NavigationListItem` · `FaqAccordion` · `PageBody`(8px 띠) |
  | **한 방향만 있는 선** | `shadow-[inset_0_-1px_0_0_…]` | `inset-ring`은 방향이 없어 하단 1px을 못 그림. `InfoBanner`의 `isSticky` |

  가르는 선을 `inset-ring`으로 그리면 **콘텐츠 위에 겹쳐 그 두께가 레이아웃에서 사라집니다.** `PageBody`의 `borderMiddle`이 그 사례입니다 — Figma 심볼이 `middleBody`보다 정확히 8px 큽니다.
- **safelist에 `hover:` / `focus:` / `active:`를 넣지 않습니다.** variant는 컴포넌트 소스에 리터럴로 남아 `@source '../../dist'`가 스캔합니다. 넣으면 생성 CSS가 3배가 됩니다.
- **variant가 붙은 클래스는 반드시 완성된 리터럴로 씁니다.** 위 규칙이 성립하는 전제입니다 — 스캐너는 소스를 **텍스트로** 훑기 때문에 `` `[&_strong]:${TYPOGRAPHY_STYLES_MAPPER[variant]}` ``처럼 조합하면 완성된 문자열이 어디에도 없어 **CSS가 아예 생성되지 않습니다.** 클래스는 정상적으로 붙고 화면만 안 바뀌므로 타입도 lint도 안 잡습니다. 매퍼·상수를 조합하고 싶으면 조합 결과 전체를 `Record`의 값으로 적어 둡니다 (`TOAST_HIGHLIGHT_STYLES`).
- **소비자가 넘긴 노드를 칠할 때는 `[&_<태그>]:`로 DS가 시각을 갖습니다.** `ReactNode` prop에서 강조 색이 `theme` 파생이면 그냥 열 수 없습니다 — 소비자가 `theme`별 색을 직접 골라야 하기 때문입니다. **소비자는 위치와 구조(`<strong>`)를, DS는 색·굵기를 갖습니다** (`Toast` · `NotificationCard`, internal-ui `Table`의 `[&_.cell]:` 선례).

  **굵기는 함께 박아야 합니다.** preflight의 `strong { font-weight: bolder }`가 부모 굵기를 기준으로 한 단계 올려서, 600짜리 타이틀 안의 맨몸 `<strong>`은 **900으로 튑니다.** `text-*` 타이포 토큰으로 되돌려 박고(`font-semibold` 같은 생값이 아니라 — 토큰이 바뀌면 따라가야 합니다), Figma에 없는 굵기 변화를 만들지 않습니다.

  **소비자는 맨몸 `<strong>`만 씁니다 — 다른 컴포넌트로 감싸면 안 됩니다.**

  ```tsx
  toast.show({ message: <>주문 <strong>3건</strong>이 등록되었어요</> });
  ```

  `Typography`로 감싸면 `[&_strong]:`이 안 걸려 **색도 굵기도 통째로 빠집니다.** 셀렉터가 매칭에 실패할 뿐이라 **에러도 경고도 없고 그냥 강조가 안 된 것처럼 보입니다.** 실제로 소비 앱에서 이걸로 한 번 헤맸고, `highlight`(부분 문자열 매칭)에서 `ReactNode`로 바뀐 것을 모르면 자연스럽게 빠지는 함정입니다 — DOTOLI-297.

  소비자가 색을 직접 고르는 것도 안 됩니다. 강조색은 `theme` 파생이라 직접 칠하면 테마를 안 따라갑니다. 계열별 실측과 근거는 [`components/toast.md`](../../docs/biz-ui/components/toast.md) · [`notification-card.md`](../../docs/biz-ui/components/notification-card.md) 「결정」.

## 패키징 규칙

- **`dependencies`에 패키지를 추가하면 `rollup.config.mjs`의 `external`에도 반드시 넣습니다.** `@dotoli/rollup-config`는 `peerDepsExternal()`만 쓰므로, `external`에 없으면 그대로 번들에 인라인되고 소비자는 같은 패키지를 두 벌 받습니다. `@phosphor-icons/core`를 빠뜨렸을 때 dist가 25KB → 67KB로 불었습니다.
- `external`은 **정확히 일치**할 때만 걸립니다. 서브패스(`es-toolkit/compat`)를 쓰면 따로 등록해야 합니다.
- 빌드 후 `dist/{shared,client}.es.js` 상단의 `import` 목록으로 external 처리를 확인합니다. **`index.es.js`에는 없습니다** — 재수출만 하는 껍데기라 외부 의존이 나머지 둘로 갈립니다.

### `dist`는 세 청크로 나옵니다

소비 앱이 Next App Router라 **클라이언트 경계가 패키지 안에 있어야 합니다.** 없으면 서버 컴포넌트가 배럴을 import하는 순간 깨집니다.

| 청크 | 지시어 | 담는 것 |
| --- | --- | --- |
| `index.es.js` | 없음 | 재수출만 |
| `shared.es.js` | 없음 | 상수 · 타입 · 유틸 · `variants` |
| `client.es.js` | `'use client'` | 컴포넌트 |

**경계는 `rollup.config.mjs`의 `manualChunks`가 경로 규약으로 정합니다** — `constants/` · `types/` · `utils/`와 `variants/`는 `shared`, 나머지 `components/` 아래는 `client`. 소스 파일에는 디렉티브를 붙이지 않습니다. rollup이 번들링 과정에서 모듈 단위 디렉티브를 걷어냅니다.

**그래서 파일을 규약대로 두는 것이 곧 경계를 맞추는 것입니다.** 상수를 컴포넌트 파일에 인라인 선언하면([코드 규칙 1](#코드-규칙) 위반) 그 상수가 `client`로 넘어가 **소비 앱의 서버 컴포넌트에서 읽히지 않습니다.**

**전부 한 청크에 넣으면 안 됩니다.** `'use client'`가 붙은 모듈은 컴포넌트뿐 아니라 **모든 export가 클라이언트 참조**가 됩니다. 상수는 `Object.keys()`가 빈 배열이 되고 유틸은 호출 시 던집니다. **컴포넌트는 에러를 내지만 상수는 아무 말 없이 `undefined`가 됩니다** — 빌드 통과, 콘솔 조용, 화면만 빕니다. DOTOLI-299가 실제로 그렇게 나갔고 DOTOLI-300에서 고쳤습니다.

**`@dotoli/rollup-config`의 terser `compress.directives: false`가 짝입니다.** 기본값(`true`)이면 비표준 디렉티브로 보고 지웁니다. 지워져도 빌드는 성공하고 소비 앱에서만 터집니다 — 「variant가 붙은 클래스는 완성된 리터럴로」와 같은 종류의 함정입니다.

**확인은 `scripts/verify-chunks.mjs`가 빌드 끝에 자동으로 합니다.** 넷 중 하나라도 어긋나면 빌드가 실패합니다.

1. `client.es.js` 첫 줄에 디렉티브가 있는가 — terser가 걷어내면 여기서 걸립니다
2. `index` · `shared`에는 **없는가**
3. **`shared`가 `react`를 import하지 않는가** — 훅이나 컨텍스트가 `constants/` · `types/` · `utils/` 안에 생기면 서버 청크로 새고, 그건 소비 앱에서만 터집니다
4. `shared`가 `client`를 import하지 않는가 (단방향)

3번이 규약 위반을 잡는 자리입니다. 소비 앱 쪽 카나리아는 **상수가 `client`로 새는 것**은 잡지만 **훅이 `shared`로 새는 것**은 못 잡습니다 — 그건 소비자 코드가 아니라 산출물 문제라서입니다.

**`toast`는 `client`에 있습니다.** 서버에서 부르면 브라우저에 닿을 방법이 없으니 조용히 삼키는 대신 명확히 던지게 두었습니다. 서버 컴포넌트에서 **prop으로 넘기는 것은 됩니다.** 다만 **Server Action 안에서도 같은 이유로 던지므로**, 액션은 값만 돌려주고 토스트는 클라이언트에서 띄웁니다.

결정 근거는 [`docs/biz-ui/frontend.md`](../../docs/biz-ui/frontend.md) 「특이사항」.

## 검증

```bash
pnpm --filter @bbodek/biz-ui build && pnpm --filter @bbodek/biz-ui lint
```

Storybook은 `pnpm --filter storybook dev`(6006). 컴포넌트를 추가하면 `core/biz-ui/…` 스토리로 Figma와 대조합니다. 스토리 argTypes는 값을 하드코딩하지 말고 `Object.values(<상수>)`로 뽑습니다.

`dist`는 gitignore 대상이지만 `@source '../../dist'`가 스캔하므로, 클래스가 안 먹으면 **빌드부터 다시** 합니다.

**빌드만으로는 부족합니다 — 컴포넌트를 새로 export 했으면 Storybook 개발 서버를 재시작합니다.** webpack의 `snapshot.managedPaths` 기본값이 `node_modules` 아래를 프로세스 수명 동안 불변으로 간주하는데, pnpm 워크스페이스라 `@bbodek/biz-ui`가 거기 심볼릭 링크로 들어갑니다. 그래서 `dist`를 다시 빌드해도 실행 중인 서버는 **이전 dist를 계속 씁니다.** 증상은 스토리에서 신규 export가 `undefined`로 잡히는 것이고(`Object.values(...)` → `Cannot convert undefined or null to object`), 새로고침으로는 풀리지 않습니다. 벤더 청크(`biz-ui_dist_index_es_js-*`)에 신규 상수가 있는지 grep 하면 확인됩니다.

## 문서 유지

문서마다 맡는 범위가 다르고 **같은 사실을 두 곳에 쓰지 않습니다.**

| 문서                               | 담는 것                                             | 수명                  |
| ---------------------------------- | --------------------------------------------------- | --------------------- |
| `docs/biz-ui/plan.md`              | 공통 결정 · Tasks 목록 · **미착수 티켓의 계획**      | 티켓이 끝나면 걷어냄  |
| `docs/biz-ui/components/<계열>.md` | 컴포넌트 실측 스펙 · 결정 · 디자인 확인 필요        | 영구                  |
| `docs/biz-ui/frontend.md`          | 환경 · 토큰 · 스타일 레이어 구현 현황               | 영구                  |
| 이 파일                            | 개발 규칙                                           | 영구                  |

**티켓을 끝내면 plan.md의 해당 태스크 상세를 걷어냅니다.** 착수 전 계획과 실제 구현은 반드시 갈리는데 그때 진실은 구현 기록 쪽이고, 계획을 남겨 두면 볼 때마다 어느 쪽이 맞는지 대조해야 합니다. 순서는:

1. 실측 스펙 · 결정 · 디자인 확인 필요를 `components/<계열>.md`로 옮깁니다 (환경 · 토큰이면 `frontend.md`).
2. plan.md 「완료된 티켓」 표에 한 줄 추가하고 해당 태스크 상세 섹션을 통째로 지웁니다.
3. Tasks 체크박스를 `[x]`로 바꿉니다.

계획 단계에서만 의미가 있던 것(사전 점검 표 · 생성 파일 목록 · API 초안)은 옮기지 않고 버립니다 — 실물 코드가 진실입니다.

**태스크 상세 제목에는 티켓 번호를 답니다** (`### DOTOLI-229 · OrderBoxCell 구현`). Tasks 체크리스트와 상세를 눈으로 대조할 수 있어야 3번에서 무엇을 지울지 헷갈리지 않습니다.

## 작성 후 검토

여러 파일을 바꿨거나 컴포넌트·훅을 새로 만들었으면 `frontend-rules-reviewer` 서브에이전트로 셀프 리뷰를 받습니다. "리뷰해줘" · "끝났어" 같은 신호에도 위임합니다.

검토 항목:

1. 이 파일의 [코드 규칙](#코드-규칙) 4가지
2. **`apps/internal-ui`에 같은 성격의 구현이 이미 있는지, 있다면 그 컨벤션·패턴을 따랐는지.** 같은 모노레포의 자매 DS라 배럴 구성 · 상수·타입 분리 · 스토리 `argTypes` 작성법이 이미 정립돼 있습니다. **먼저 찾아보고 없을 때 새로 설계합니다.**
3. internal-ui와 갈라진 지점이 있으면 **Figma 실측이나 모바일 제약 때문인지**. 근거가 있으면 이 파일이나 `docs/biz-ui/components/<name>.md`에 남기고, 없으면 맞춥니다.

`[P1]`은 보고 전에 해결, `[P2]`는 수정 여부를 사용자에게 확인, `[P3]`·`[Q]`는 참고로 전달합니다.

> 이 레포에는 `.frontend-rules/`가 없습니다. 리뷰 기준은 이 파일과 `apps/internal-ui` 구현입니다.
> 값을 인용할 땐 **출처가 biz-ui Figma인지 internal-ui 코드인지 명시하고, 소스를 직접 엽니다.**
> 두 DS는 값이 다른 게 정상이라 출처를 빼면 나중에 불일치로 오독됩니다.
