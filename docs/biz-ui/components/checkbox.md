# Checkbox 구현 기록

`apps/biz-ui/src/components/Checkbox` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 Checkbox 고유 사실만 둡니다.

Figma: [Checkbox 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=75-4686&m=dev) (`75:4686`). 실제 값은 컴포넌트 세트 `75:4699`에서 실측했습니다.

## 구현 현황

| 컴포넌트   | 티켓       | 설명                                            |
| ---------- | ---------- | ----------------------------------------------- |
| `Checkbox` | DOTOLI-241 | `checked` × `disabled` 4조합 전수 실측. 28×28   |

같은 섹션의 `ItemCheckbox`(`75:4771`)는 DOTOLI-242입니다. **이 컴포넌트를 물어 쓰되 히트 영역 확장은 끕니다** (아래 「결정」).

## Variant 축

| 축         | 값               | 출처                            |
| ---------- | ---------------- | ------------------------------- |
| `checked`  | `false` · `true` | Figma 축                        |
| `disabled` | `false` · `true` | Figma 축                        |

4조합이 전부 심볼로 정의돼 있습니다 (`75:4700` · `75:4704` · `75:4707` · `75:4711`).

## 실측 스펙

| 항목       | 값                                  |
| ---------- | ----------------------------------- |
| 박스       | 28 × 28 → `size-[28px]`             |
| radius     | `item spacing/6` = 6 → `rounded-6`  |
| 테두리     | 4px → `inset-ring-4`                |
| 아이콘     | 16 × 16 → `text-[16px]`             |

| 상태               | 배경         | 테두리       | 아이콘     |
| ------------------ | ------------ | ------------ | ---------- |
| `default`          | `base/white` | `gray/200`   | 없음       |
| `checked`          | `blue/500`   | 없음         | `base/white` |
| `disabled`         | `gray/100`   | `gray/200`   | 없음       |
| `checkedDisabled`  | `gray/200`   | 없음         | `gray/300` |

**체크 상태에는 테두리가 없습니다.** 있고 없음이 상태별로 갈리는 전형적인 경우라 `border`가 아니라 `inset-ring`입니다 (CLAUDE.md 「스타일 규칙」).

Storybook 렌더의 계산값으로 4조합을 전수 대조했고 박스·radius·`box-shadow`(=inset ring)·배경·글자색·아이콘 `font-size`가 전부 일치합니다. 히트 영역은 `elementFromPoint`로 검증했습니다 — 시각 박스 바깥 4px 지점의 히트 대상이 `useTouchTarget=true`에서만 `<label>`입니다.

### 아이콘 웨이트는 `bold`입니다

**Figma 체크는 SVG가 아니라 Phosphor `check` 글리프이고, 웨이트는 `bold`입니다.** `Icon` 기본값과 같지만 근거가 있는 값이라 `CHECKBOX_ICON_WEIGHT`로 명시했습니다.

판정은 글리프 바운딩 대조입니다. Figma 심볼(`75:4706`)이 내보내는 SVG의 path 바운딩이 16px 기준 **13.0039 × 9.50189**이고, `@phosphor-icons/core`의 두 후보를 브라우저 `getBBox()`로 정확히 재면 이렇습니다.

| 웨이트    | viewBox 256      | 16px 환산           | Figma와의 차이   |
| --------- | ---------------- | ------------------- | ---------------- |
| `regular` | 200 × 144.01     | 12.5 × 9.0004       | −0.504 · −0.502  |
| `bold`    | **208.06 × 152.03** | **13.0039 × 9.5016** | **0 · −0.0003** |

`bold`가 소수점까지 일치합니다. **처음엔 호의 볼록한 부분을 눈대중으로 더해 `regular`로 판정했다가 뒤집었습니다** — 화면에서 체크가 얇아 보인다는 지적이 맞았고, 곡선이 섞인 path의 바운딩은 좌표 최소·최대만으로 추정하면 안 됩니다. **`getBBox()`로 재는 것이 유일하게 정확한 방법입니다.**

색은 SVG에서 직접 읽었습니다 — 활성 `fill="white"`, 비활성 `fill="#CED4E0"`(= `gray/300`). 비활성 체크가 흰색이 아닌 유일한 자리입니다.

## 결정

- **히트 영역을 6px 확장합니다. 항상, prop 없이.** CLAUDE.md 「히트 영역 확장」은 **디자이너가 Figma 주석으로 지정한 대상만** 확장하라고 하고 Checkbox에는 그 주석이 없습니다. 그럼에도 넣은 것은 **요청에 따른 예외**이고, 근거는 크기입니다 — 28px는 `CtaButton` `sm`(32px, 확장 대상으로 지정됨)보다 작은데 biz-ui에서 단독으로 누를 수 있는 가장 작은 표면입니다. 확장 후 40×40이 되어 `touch-target` 유틸(44px)에는 여전히 못 미치지만 `sm` 버튼과 같은 처리를 받습니다.
- **끄는 prop(`useTouchTarget`)을 두지 않습니다.** 착수 때는 기본 `true`인 boolean으로 열었다가 걷어냈습니다. **끌 필요가 있는 쪽은 소비 앱이 아니라 DS 안의 `ItemCheckbox` 하나뿐인데, 그것 때문에 공개 API에 스위치를 하나 얹으면 소비자가 매번 기억해야 하는 결정이 됩니다.** 「필요가 확인되면 그때 연다」는 [overlay.md](./overlay.md)의 공개 기준과도 같은 방향입니다.

  **지금 끄는 장치를 만들지도 않았습니다** — `ItemCheckbox`가 아직 없어서 무엇이 필요한지 알 수 없고, 쓰는 곳 없이 먼저 만들지 않는다는 기준을 따랐습니다. DOTOLI-242에서 실제로 겹침이 문제가 되면 **공개 prop이 아닌 방법**(내부 context · 비공개 variant)으로 풉니다. 다만 지금 예측으로는 **끌 필요 자체가 없을 가능성이 큽니다** — 카드가 340×60이고 체크박스가 세로 중앙이라 위아래 여백이 16px씩입니다. 6px 확장은 카드 안에 그대로 들어가고, 카드 전체가 탭 타깃이면 그 영역을 눌러도 결과가 같습니다.
- **`TOUCH_TARGET_STYLE`을 `components/shared/constants`로 옮겼습니다.** 원래 `Button/shared/constants`의 `BUTTON_TOUCH_TARGET_STYLE`이었는데, `Checkbox`가 세 번째 소비처가 되면서 **이름과 위치가 실제 쓰임보다 좁아졌습니다**(그 파일 주석은 「버튼 계열 공통 값만 둡니다」). CLAUDE.md도 이 상수를 「히트 영역 확장」의 구현으로 못박아 버튼 계열에 한정하지 않습니다.

  **옮기면서 공개 API에서 빠졌습니다.** `Button/index.ts` → `components/index.ts` 경로로 새어 나가 있던 것이 `components/shared`(루트 배럴에 없음)로 들어가면서 닫혔습니다. 소비자가 쓸 이유가 없는 내부 스타일 조각이라 의도한 결과이고, `Overlay`를 비공개로 둔 것과 같은 판단입니다. **클래스 리터럴은 `dist`에 그대로 남아 Tailwind 스캔에 잡힙니다** — `CtaButton` · `IconButton` · `Checkbox`가 전부 공개 컴포넌트라 상수가 트리셰이킹되지 않습니다 (빌드 후 `before:-inset-1.5` 1건 확인).
- **`<label>` + 시각적으로만 숨긴 `<input type="checkbox">` 구조입니다.** 라벨이 클릭 위임과 히트 영역을 함께 지고, 실제 상태·키보드 조작·폼 전송은 네이티브 input이 집니다. `sr-only`로 숨기는 것 · JS 상태 해석 · 제어 전용 · 접근성 이름 · `transition-colors`는 **폼 컨트롤 공통 규칙**이라 여기서 다시 정의하지 않습니다 → [CLAUDE.md 「폼 컨트롤 공통」](../../../apps/biz-ui/CLAUDE.md). 그 규칙 대부분이 이 티켓에서 나왔고, 근거가 되는 실측은 아래 「internal-ui와 갈린 지점」에 있습니다.
- **아이콘 색을 컨테이너의 `text-*`로 상속시킵니다.** Phosphor가 아이콘 폰트라 크기는 `font-size`, 색은 `color`를 따릅니다 — `IconCircle`·`ButtonIcon`과 같은 방식이라 상태 스타일 한 줄에 배경과 아이콘 색이 함께 들어갑니다.
- **`ref` · `id`를 엽니다 — internal-ui엔 둘 다 없습니다.** 지금 레포에 쓰는 곳이 없어 한 번 걷어낼지 검토했지만 유지했습니다. **막으면 소비자가 대안 없이 못 하게 되는 것들이 있어서입니다.**

  | 통로 | 막으면 못 하는 것 | 확인 |
  | ---- | ----------------- | ---- |
  | `ref` | `indeterminate`(전체선택 3-state) — **속성이 아니라 DOM 프로퍼티**라 React prop이 없고 `ref` 외에 도달 경로가 없음 | `i.indeterminate = true` → `hasAttribute('indeterminate')`는 `false` |
  | `ref` | 검증 실패 시 첫 오류 컨트롤로 포커스 이동 | `sr-only`라 `.focus()`가 실제로 걸림(`activeElement` 일치) |
  | `id` | 외부 `<label for>` · `aria-describedby` 연결 | 라벨 감싸기라 내부 동작엔 불필요하지만, 밖에서 붙이려면 반드시 필요 |

  **`useTouchTarget`을 걷어낸 것과 상충하지 않습니다.** 그쪽은 소비자가 매번 정해야 하는 **결정**이었고 이쪽은 판단할 것이 없는 **통로**입니다 — 안 주면 아무 일도 일어나지 않고, 주면 위 세 가지가 가능해집니다. 기준은 CLAUDE.md 「폼 컨트롤 공통」 5번입니다.

  다만 `indeterminate`는 **의미만 열리고 시각은 없습니다.** Figma에 3-state variant가 없어 `checked` 기준으로만 스타일을 고르므로, 프로퍼티를 켜면 보조기술은 `mixed`로 읽지만 화면에는 아무 표시가 없습니다. 전체선택 UI가 실제로 필요해지면 Figma 스펙부터 받습니다(아래 「디자인 확인 필요」).

## API

| prop              | 필수 | 기본값 | 비고                                          |
| ----------------- | ---- | ------ | --------------------------------------------- |
| `checked`         | ✅   | —      | 제어 전용                                     |
| `onChange`        | ✅   | —      | 제어 전용                                     |
| `disabled`        |      | `false` |                                              |
| `id` · `name` · `value` |  | —   | `<input>`으로 전달                            |
| `aria-label` · `aria-labelledby` | | — | 둘 중 하나는 소비자가 반드시 지정   |
| `className`       |      | —      | `<label>`에 적용                              |

`ref`는 `<input>`을 가리킵니다 — 폼 라이브러리가 잡는 대상이 라벨이 아니라 컨트롤이라서입니다.

## internal-ui와 갈린 지점

`apps/internal-ui`에도 `Checkbox`가 있어 전수 대조했습니다 (CLAUDE.md 「작성 후 검토」 2 · 3). **핵심 구조는 그대로 따랐습니다** — `<label>` + 네이티브 `<input type="checkbox">`, 제어 전용(`Required<Pick<…>>`), HTML 속성을 `Pick<InputHTMLAttributes>`로 가져오기, Phosphor `check`, 배럴·`constants`/`types` 분리.

| 항목             | internal-ui                          | biz-ui                    | 갈린 이유                     |
| ---------------- | ------------------------------------ | ------------------------- | ----------------------------- |
| radius           | `rounded-in-4` (4px)                 | `rounded-6` (6px)         | Figma 실측                    |
| 테두리           | `border-[0.125rem]`                  | `inset-ring-4`            | Figma 4px + 스타일 규칙       |
| `size` 축        | `sm` · `md`                          | 없음                      | Figma에 28px 1종              |
| `label` prop     | 있음                                 | 없음                      | Figma가 `ItemCheckbox`로 분리 |
| 서브 컴포넌트    | `CheckboxIcon` · `CheckboxLabel`     | 없음                      | 위 두 줄의 결과               |
| 아이콘 weight    | 기본값에 맡김                        | `bold` 명시               | 글리프 바운딩 실측            |
| 컨트롤 숨김      | `hidden`                             | `sr-only`                 | 접근성 (공통 규칙 1)          |
| 상태 해석        | `peer-checked:` · `peer-disabled:`   | `resolveCheckboxState`    | 공통 규칙 2                   |
| 체크 글리프      | 항상 렌더 + 흰색으로 가림            | `checked`일 때만 렌더     | 공통 규칙 3                   |
| cursor           | `has-[.checkbox:disabled]:`          | 상태 스타일에 포함        | 상태 해석 방식의 결과         |
| 접근성 이름      | 내부 `useId`로 자기 라벨 연결        | `aria-label(ledby)` 노출  | 라벨이 없음 (공통 규칙 6)     |
| `id`             | 내부 `useId()`                       | prop                      | 위 「결정」                   |
| `ref`            | 없음                                 | `<input>`으로 전달        | 위 「결정」                   |
| 히트 영역        | 없음                                 | 6px 확장                  | 요청                          |
| 전환             | 없음                                 | `transition-colors`       | biz-ui 계열 선례              |
| 스토리 `argTypes`| `description` + `generateArgTypeSummary` | 안 씀                 | CLAUDE.md 코드 규칙 5         |

### 일부러 옮기지 않은 결함 2건

둘 다 Storybook 실렌더로 확인했고, **internal-ui 쪽 수정은 이 티켓 범위 밖**이라 별도 태스크로 넘겼습니다.

1. **접근성 트리에서 사라짐.** input이 `display: none`이고 시각 박스가 `aria-hidden`이라 스크린리더에 컨트롤이 존재하지 않고 포커스도 가지 않습니다.
2. **`disabled` + `unchecked`인데 체크가 보입니다.** 글리프를 흰색으로 가리는 방식(공통 규칙 3)이 `peer-disabled:bg-in-gray-02`와 만나 깨집니다. `core/internal-ui/Checkbox` → `Disabled` 스토리(`checked: false`)에서 배경 `rgb(231,234,242)` · 아이콘 `rgb(255,255,255)`로 재현되고, **화면상 체크된 것처럼 보입니다.**

## 디자인 확인 필요

| 항목            | 내용                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------- |
| 포커스 스타일   | Figma에 focus 상태가 없습니다. 실제 컨트롤을 시각적으로 숨긴 구조라 **키보드 포커스가 아무 데도 보이지 않습니다.** 지정되지 않은 시각을 임의로 만들지 않고 남겨 둡니다 |
| 상호작용 상태   | hover · pressed도 정의가 없습니다. 다른 계열은 둘 다 있어 누락인지 의도인지 확인이 필요합니다        |
| 테두리 4px      | 28px 박스에 4px는 두꺼운 편입니다. codegen·렌더 양쪽에서 4px로 확인했지만 의도된 값인지               |
| 라벨 조합       | 라벨을 단 형태는 `ItemCheckbox`(340×60)뿐입니다. 그 사이 크기(컨트롤 + 짧은 텍스트)가 필요한 자리가 있는지 |
| 3-state (전체선택) | `indeterminate` variant가 없습니다. `ref`로 프로퍼티는 켤 수 있어 보조기술은 `mixed`로 읽지만 **화면 표시가 없습니다.** 전체선택 UI가 필요하면 스펙이 필요합니다 |
| 모션            | `transition-colors`(150ms)를 넣었지만 Figma 정의는 없습니다. easing도 DS 모션 토큰(`cubic-bezier(0, 0, 0.5, 1)`)이 아닌 Tailwind 기본값이고, `Filter`·`CtaButton`도 같은 상태라 **계열 전체를 한 번에 정할 사안**입니다 |

## Storybook

`apps/storybook/src/stories/biz-ui/Checkbox.stories.tsx`, `meta.title`은 `core/biz-ui/Checkbox`. 스토리 3종입니다.

- `Default` — 컨트롤 패널용. `onChange`가 비어 있어 캔버스에서는 토글되지 않습니다 (`Filter`의 `Default`와 같은 형태)
- `Interactive` — `useState`로 실제 토글
- `States` — Figma 문서 프레임과 같은 배치로 `checked` × `disabled` 4조합

**히트 영역 스토리는 두지 않습니다.** 시각 크기가 28px로 고정이라 확장 여부가 렌더에 드러나지 않고, 끄는 prop도 없어 비교 대상이 없습니다. 검증은 위 「실측 스펙」의 `elementFromPoint` 방식으로 합니다.

> Storybook에서 이 컴포넌트를 확인할 때는 **개발 서버를 재시작해야 합니다.** webpack `snapshot.managedPaths`가 `node_modules` 아래를 프로세스 수명 동안 불변으로 봐서, `dist`를 다시 빌드해도 실행 중인 서버는 이전 번들을 계속 씁니다 (CLAUDE.md 「검증」). 실제로 이 티켓에서 아이콘 웨이트를 `regular` → `bold`로 고친 뒤 화면이 그대로여서 한 번 헷갈렸습니다.
