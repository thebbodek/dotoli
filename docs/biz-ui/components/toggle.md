# Toggle 계열 구현 기록

`apps/biz-ui/src/components/Toggle` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 계열 고유 사실만 둡니다.

Figma: [Toggle 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=129-465&m=dev) (`129:465`). 실제 값은 컴포넌트 세트 `131:482`의 심볼 `131:478` · `131:480`에서 실측했습니다.

## 구현 현황

| 컴포넌트          | 티켓       | 설명                                      |
| ----------------- | ---------- | ----------------------------------------- |
| `Toggle`          | DOTOLI-243 | `checked` 1축. 52 × 30. 라벨 없음         |
| `ToggleListItem`  | DOTOLI-244 | 미구현. 같은 섹션 프레임 `131:495`(320 × 51) |

## Variant 축

| 축        | 값               | 출처     |
| --------- | ---------------- | -------- |
| `checked` | `false` · `true` | Figma 축 |

**`disabled` 축이 없습니다 — 실측으로 확인했습니다.** plan.md가 「Checkbox와 갈리는 지점이라 실측으로 확인한다」로 남긴 항목이고, 컴포넌트 세트에 심볼이 2개뿐입니다. `Checkbox`는 `checked × disabled` 4조합인데 여기는 1축입니다.

> Figma 문서 프레임의 축 주석은 `value`라고 적혀 있지만 **심볼 이름은 `checked=false` / `checked=true`**입니다. 컴포넌트 세트의 실제 variant 속성이 `checked`라 그쪽을 따랐습니다.

## 실측 스펙

| 항목       | 값                                        |
| ---------- | ------------------------------------------- |
| 트랙       | 52 × 30 → `h-[30px] w-[52px]`               |
| 트랙 padding | 3 → `p-[3px]`                             |
| 트랙 radius | 15 = 높이의 절반 → `rounded-full`          |
| 노브       | 24 × 24 → `size-[24px]` · `rounded-full`    |
| 노브 이동  | **22** = 52 − 3 − 24 − 3 → `translate-x-[22px]` |

| 상태      | 트랙         | 노브         |
| --------- | ------------ | ------------ |
| `default` | `gray/300`   | `base/white` |
| `checked` | `blue/500`   | `base/white` |

`30 = 3 + 24 + 3`이라 노브가 트랙에 딱 맞습니다.

## 결정

- **`<label>` + `sr-only` 네이티브 `<input type="checkbox">`입니다.** CLAUDE.md 「폼 컨트롤 공통」이 `Toggle`을 직접 지목하므로 1 · 2 · 4를 그대로 따릅니다. 시각(트랙 · 노브)은 `aria-hidden`인 `<span>` 두 개입니다.

- **`role='switch'`를 붙입니다.** 네이티브 `checkbox`에 얹는 표준 조합이고, 보조기술이 「체크박스, 선택됨」이 아니라 **「스위치, 켜짐/꺼짐」**으로 읽습니다. `checked`가 `aria-checked`로 그대로 매핑되어 따로 관리할 상태가 없습니다. 시각을 만드는 것이 아니라 의미를 붙이는 것이라 「Figma에 없는 것은 만들지 않는다」(공통 규칙 7)에 걸리지 않습니다.

- **노브 이동을 `justify-*`가 아니라 `translate-x`로 겁니다.** Figma codegen은 `items-start` ↔ `flex-col items-end`로 자리를 바꾸는데, **`justify-content`·`align-items`는 애니메이션되지 않습니다.** 노브를 항상 왼쪽에 두고 `translate-x-[22px]`로 옮기면 `transition-transform`이 걸립니다. 결과 위치는 같습니다.

- **히트 영역을 6px 확장합니다 — 요청에 따른 예외입니다.** CLAUDE.md 「히트 영역 확장」은 **디자이너가 Figma 주석으로 지정한 대상만** 확장하라고 하고 Toggle에는 그 주석이 없습니다. 그럼에도 넣은 것은 요청이고, 근거는 크기입니다 — **단독으로 쓸 때 높이가 30px**이라 확장 대상으로 지정된 `CtaButton` `sm`(32px)보다 작습니다. `Checkbox`(28px)가 같은 근거로 이미 예외를 받았습니다.

  구현은 `components/shared/constants`의 `TOUCH_TARGET_STYLE`을 **그대로** 씁니다. 확장 후 64 × 42가 되어 `touch-target` 유틸(44px)에는 세로로 2px 못 미치지만 `Checkbox` · `CtaButton` `sm`과 같은 처리를 받습니다.

  **`cursor-pointer`는 트랙이 아니라 `<label>`에 둡니다** — 확장 `::before`가 트랙을 덮어 커서를 가로챕니다. 근거는 CLAUDE.md 「히트 영역 확장」에 있습니다.

  **`ToggleListItem`(DOTOLI-244)에서는 이 확장이 문제가 될 수 있습니다** — 그쪽은 카드 높이가 51px이고 선택 영역이 「글자부터 토글까지」(주석 `355:1275`)라 토글의 확장 영역이 카드 안에 들어갑니다. `ItemCheckbox`에서 같은 걱정이 실제로는 문제가 아니었던 선례가 있어([checkbox.md](./checkbox.md) 「ItemCheckbox 결정」) 그 티켓에서 확인합니다.

- **전환은 Tailwind 기본값입니다.** plan.md가 「오버레이에서 쓴 `cubic-bezier(0, 0, 0.5, 1)`을 따를지 정하라」고 남겼는데, **따르지 않았습니다.** 그 easing은 `--animate-*` **키프레임 토큰**의 값이고 transition용 토큰은 DS에 없습니다. `Filter` · `CtaButton` · `IconButton` · `Checkbox`가 전부 맨 `transition-colors`(150ms · Tailwind 기본 easing)라, Toggle만 다른 곡선을 쓰면 계열 안에서 튑니다.

  트랙은 `transition-colors`, 노브는 `transition-transform`으로 나눠 겁니다 — 바뀌는 속성이 달라서입니다. 두 전환의 duration이 같아야 자연스러운데 둘 다 기본값이라 맞습니다. **계열 전체를 한 번에 정할 사안**이라 아래 「디자인 확인 필요」에 남깁니다 (checkbox.md의 「모션」 항목과 같은 줄기).

- **`disabled`를 넣지 않습니다.** Figma에 축이 없어 스타일을 정의할 수 없습니다. `Checkbox`에는 있어 갈리는 지점이라 아래 「디자인 확인 필요」에 올렸습니다.

- **접근성 이름은 소비자가 붙입니다.** 라벨 텍스트가 없어 이름을 스스로 만들 수 없으므로 `aria-label` · `aria-labelledby`만 엽니다(공통 규칙 6). **라벨이 붙는 형태는 `ToggleListItem`입니다** — Figma가 이미 그렇게 나눠 놨고 `Checkbox` ↔ `ItemCheckbox`와 같은 구조입니다.

## API

| prop                             | 필수 | 비고                             |
| -------------------------------- | ---- | -------------------------------- |
| `checked`                        | ✅   | 제어 전용                        |
| `onChange`                       | ✅   | 제어 전용                        |
| `id` · `name` · `value`          |      | `<input>`으로 전달               |
| `aria-label` · `aria-labelledby` |      | 둘 중 하나는 소비자가 반드시 지정 |
| `className`                      |      | `<label>`에 적용                 |

`ref`는 `<input>`을 가리킵니다.

## 디자인 확인 필요

| 항목            | 내용                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------ |
| `disabled`      | 축이 없습니다. `Checkbox`에는 있어 갈리는 지점입니다 — 끌 수 없는 설정을 표시할 일이 없는지          |
| 모션            | duration · easing 정의가 없습니다. Tailwind 기본값(150ms)으로 뒀고 DS 모션 토큰(`cubic-bezier(0, 0, 0.5, 1)`)은 키프레임 전용입니다. **계열 전체를 한 번에 정할 사안**입니다 |
| 상호작용 상태   | hover · pressed 정의가 없습니다                                                                    |
| 포커스          | 포커스 링 정의가 없습니다. 실제 컨트롤이 `sr-only`라 **키보드 포커스가 화면에 보이지 않습니다** (공통 규칙 7) |
| 히트 영역       | 6px 확장을 넣었지만 Figma 주석은 없습니다. `Checkbox`와 같은 예외 처리이고, 지정이 필요한지          |

## Storybook

`apps/storybook/src/stories/biz-ui/Toggle.stories.tsx`, `meta.title`은 `core/biz-ui/Toggle`. 스토리 3종입니다 (`Checkbox`와 같은 구성).

- `Default` — 컨트롤 패널용. `onChange`가 비어 있어 캔버스에서는 토글되지 않습니다
- `Interactive` — `useState`로 실제 토글. **노브가 22px 움직이는 전환은 여기서만 보입니다**
- `States` — `checked` 2조합

**히트 영역 스토리는 두지 않습니다.** 시각 크기가 52 × 30 고정이라 확장 여부가 렌더에 드러나지 않고, 끄는 prop도 없어 비교 대상이 없습니다 (checkbox.md와 같은 판단). 검증은 `elementFromPoint`로 합니다.

## 검증

Storybook 렌더의 계산값으로 대조했습니다.

| 항목      | 기대                              | 실측                                                       |
| --------- | --------------------------------- | ---------------------------------------------------------- |
| 트랙      | 52 × 30 · `rounded-full` · pad 3  | **52 × 30** · `padding: 3px`                                |
| 노브      | 24 × 24 · `base/white`            | **24 × 24** · `rgb(255,255,255)`                            |
| 트랙 색   | `gray/300` → `blue/500`           | `rgb(206,212,224)` → `rgb(49,130,246)`                      |
| 노브 위치 | 좌우 여백이 뒤집힘 · 이동 22      | 좌 3 / 우 25 → 좌 **25** / 우 **3** · `translate: 22px`     |
| 전환      | 트랙·노브 duration 동일           | 둘 다 `0.15s` · 트랙 `cubic-bezier(0.4, 0, 0.2, 1)`         |
| 히트 영역 | 시각 박스 바깥 4px이 `<label>`    | `::before` `inset: -6px` · 4px · 6px → `<label>` · 8px → 밖 |
| 히트 영역 | 확장부 클릭으로도 토글            | 트랙 바깥 4px 클릭 → `checked` 반전                          |
| 시맨틱    | `role='switch'` · 시각은 숨김     | `input[type=checkbox][role=switch]` · 트랙 `aria-hidden="true"` |

**Tailwind v4의 `translate-x-*`는 `transform`이 아니라 `translate` 프로퍼티를 씁니다.** 그래서 `getComputedStyle(knob).transform`은 계속 `none`이고 값은 `translate`에 들어갑니다. `transition-transform`이 `transform, translate, scale, rotate`를 한꺼번에 걸어 주므로 전환은 정상입니다 — 확인할 때 `transform`만 보면 안 움직이는 것처럼 보입니다.

빌드 · 린트 · `dist` 공개 API(`Toggle` + `TOGGLE_*` 6종) 확인했습니다.
