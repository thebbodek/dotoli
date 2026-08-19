# Toggle 계열 구현 기록

`apps/biz-ui/src/components/Toggle` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 계열 고유 사실만 둡니다.

Figma: [Toggle 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=129-465&m=dev) (`129:465`). 실제 값은 컴포넌트 세트 `131:482`의 심볼 `131:478` · `131:480`에서 실측했습니다.

## 구현 현황

| 컴포넌트         | 티켓       | 공개 | 설명                                          |
| ---------------- | ---------- | ---- | --------------------------------------------- |
| `Toggle`         | DOTOLI-243 | ✅   | `checked` 1축. 52 × 30. 라벨 없음             |
| `ToggleListItem` | DOTOLI-244 | ✅   | 제목 + 설명 + 토글. 51 높이. 행 전체가 선택 영역 |
| `ToggleBase`     | DOTOLI-244 | ❌   | `<label>` + 숨긴 `<input>` + `children` 껍데기 |
| `ToggleTrack`    | DOTOLI-244 | ❌   | 시각 트랙 + 노브                              |

비공개 둘은 배럴에 없어 공개 API가 아닙니다 — 빌드 후 `dist/index.es.js`의 export 목록에 `Toggle` · `ToggleListItem`만 있는 것을 확인했습니다.

**쪼갠 시점과 기준이 `Checkbox` 계열과 같습니다.** `CheckboxBase` · `CheckboxIcon`도 `Checkbox` 티켓이 아니라 `ItemCheckbox` 티켓(DOTOLI-242)에서 분리됐습니다 — 형제가 생기기 전에는 공유할 대상이 없어서입니다. 이유도 같습니다: **`<label>` 중첩을 피해야 합니다.** `Toggle`을 `ToggleListItem` 안에 그대로 넣으면 `<label>`이 두 겹이 되는데 HTML `<label>`의 콘텐츠 모델이 「no descendant label elements」로 금지합니다.

| `Checkbox` 계열 | 뜻                                    | `Toggle` 계열  |
| --------------- | ------------------------------------- | -------------- |
| `CheckboxBase`  | `<label>` + 숨긴 `<input>` + children | `ToggleBase`   |
| `CheckboxIcon`  | 시각 조각                             | `ToggleTrack`  |

**폴더는 `Checkbox` ↔ `ItemCheckbox`처럼 최상위 형제로 뒀습니다.** CLAUDE.md 「폴더는 이름 프리픽스를 따릅니다」대로면 `Toggle` 그룹이 후보인데, 그러면 `Toggle/Toggle/Toggle.tsx`가 됩니다 — 기존 그룹(`Button/CtaButton` · `Input/InputField` · `Order/OrderBox`)은 **그룹명과 같은 이름의 컴포넌트가 없어** 생기지 않던 모양입니다. 같은 짝(기본 컨트롤 ↔ 라벨 붙은 형태)인 `Checkbox` · `ItemCheckbox`가 이미 형제로 있어 그쪽을 따랐습니다.

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

- **`select-none`을 `ToggleBase`에 겁니다.** 라벨이 텍스트를 품은 채로 탭 영역이라, **토글하려고 누른 채 손가락이 조금만 밀려도 텍스트가 드래그 선택됩니다.** 모바일에서는 선택 핸들과 복사 팝업까지 떠서 토글 자체가 묻힙니다. `ToggleListItem`에서 실제로 나온 현상이고, 껍데기에 걸어 자식 텍스트까지 상속시킵니다.

  잃는 것은 **라벨 텍스트 복사**뿐입니다. 설정 행의 이름이라 읽을 대상이지 가져갈 대상이 아니고, 접근성 트리는 `user-select`와 무관해 보조기술은 그대로 읽습니다(실측으로 `aria-labelledby` · `aria-describedby` 연결 유지 확인). `Toggle` 단독에는 텍스트가 없어 무해합니다.

  **같은 구조인 `Chip` · `SelectionItem` · `ItemCheckbox`에는 아직 없습니다** — 셋 다 라벨 안에 텍스트를 두고 탭 영역으로 쓰므로 같은 현상이 납니다. 계열을 한 번에 정리할 때 함께 봅니다.

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
| `aria-describedby`               |      | 보조 설명이 화면에 따로 있을 때   |
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

---

## ToggleListItem

Figma 컴포넌트 세트는 같은 섹션의 `131:495`(320 × 51)이고, 사용 예시는 「고객 비즈」 파일의 [MYP-502 알람 관리](https://www.figma.com/design/LomGIAwvPAkyRbBcGbk9rs/%EA%B3%A0%EA%B0%9D-%EB%B9%84%EC%A6%88?node-id=1439-18041&m=dev) (`1439:18041`)입니다. 실측은 사용처 인스턴스(`1217:10701`)의 codegen에서 읽었고, 심볼 내부 노드 id(`131:484` · `131:485` · `131:486`)가 그대로 찍혀 나와 같은 컴포넌트임이 확인됩니다.

### 실측 스펙

| 항목      | 값                                                        |
| --------- | ----------------------------------------------------------- |
| 행        | 340 × 51 → **`h-[51px]` · `w-full`**. 340은 모바일 컨텐츠 폭 (심볼은 320) |
| 행 gap    | 2 → `gap-[2px]`                                             |
| 텍스트 gap | 2 → `gap-[2px]`                                            |
| 제목      | `heading-5` (18 · Bold · 1.45 · -0.01em) · **`base/black`**  |
| 설명      | `body` (16 · Medium · 1.45 · -0.03em) · `gray/700`           |
| 토글      | `Toggle`과 동일. 52 × 30                                    |

배경 · 테두리 · radius가 없습니다. 토글(30)은 행보다 낮아 세로 중앙에 놓입니다.

### 결정

- **행 전체가 선택 영역입니다.** 주석 `355:1275`가 「선택영역 글자부터 토글까지」라고 지정합니다. `ToggleBase`의 `<label>`이 행 전체를 감싸므로 제목·설명 어디를 눌러도 토글됩니다.

- **높이를 고정합니다 — `h-[51px]`.** 텍스트에 맡기면 `26.1(18 × 1.45) + 2 + 23.2(16 × 1.45) = 51.3`이 나오는데 Figma는 51입니다. `Chip`(32.3) · `SelectionItem`(56.1)과 **같은 0.3px 상황**이라 같은 답을 씁니다 — 위 「높이를 고정합니다」 · [chip.md](./chip.md).

  다만 여기는 **내용이 상자보다 0.3px 큰 첫 사례**입니다. 앞의 둘은 내용이 높이보다 작아 여백만 줄었는데, 이 행은 텍스트 블록 51.3이 51 안에 들어갑니다. `items-center`라 위아래로 0.15px씩 넘치고 `overflow`는 `visible`이라 잘리지 않습니다 — 실측에서도 눈에 띄는 차이가 없었습니다. 텍스트 크기를 바꾸면 이 여유가 사라지므로 높이도 함께 봐야 합니다.

- **히트 영역 확장이 붙지 않습니다.** `TOUCH_TARGET_STYLE`은 `Toggle`이 **자기 껍데기에만** 얹는 스타일이라 `ToggleBase`에는 없습니다. 행이 이미 340 × 51이라 필요하지도 않습니다 — `ItemCheckbox`에서 같은 걱정이 실제로는 문제가 아니었던 것과 같은 결론입니다([checkbox.md](./checkbox.md) 「ItemCheckbox 결정」). DOTOLI-243에서 남긴 숙제가 여기서 풀렸습니다.

- **접근성 이름을 `aria-labelledby`로 내려 줍니다 — `ItemCheckbox`와 갈리는 지점입니다.** 텍스트가 **두 개**라 `<label>` 감싸기에만 맡기면 이름이 「정산 안내 한 달 이용료 최종 확정시 알림」으로 이어 붙습니다. 제목을 `aria-labelledby`, 설명을 `aria-describedby`로 나누면 보조기술이 **「정산 안내, 스위치, 꺼짐」**으로 읽고 설명은 뒤따라 읽습니다.

  CLAUDE.md 「폼 컨트롤 공통」 6이 「라벨이 붙는 형태는 자기 라벨의 id를 `aria-labelledby`로 내려 준다」고 정한 그대로입니다. `ItemCheckbox`는 텍스트가 한 줄뿐이라 감싸기만으로 충분해 안 썼습니다.

- **`description`이 필수입니다.** Figma 심볼이 두 텍스트를 항상 갖고 있어 없는 형태가 정의돼 있지 않습니다. 설명 없는 행이 필요해지면 새 축입니다.

- **넘침 처리(`min-w-0` + `truncate`)는 Figma에 없는 추가입니다.** 심볼의 텍스트가 `whitespace-nowrap`이라 길어지면 토글을 밀어냅니다. 340 폭에 알림명이 들어가는 자리라 실제로 일어납니다. `SelectionItem`과 같은 처리이고 아래 「디자인 확인 필요」에 올려 둡니다.

### API

| prop                    | 필수 | 비고                             |
| ----------------------- | ---- | -------------------------------- |
| `label`                 | ✅   | 제목. 접근성 이름                |
| `description`           | ✅   | 설명. `aria-describedby`로 연결  |
| `checked`               | ✅   | 제어 전용                        |
| `onChange`              | ✅   | 제어 전용                        |
| `id` · `name` · `value` |      | `<input>`으로 전달               |
| `className`             |      | `<label>`(행 전체)에 적용        |

`ToggleProps`에서 `aria-label` · `aria-labelledby` · `aria-describedby`를 `Omit`한 것 외에는 같은 타입을 그대로 씁니다 — 세 개 모두 컴포넌트가 직접 채우므로 소비자가 덮으면 연결이 끊깁니다.

### 사용 예시에서 나온 것

[MYP-502 알람 관리](https://www.figma.com/design/LomGIAwvPAkyRbBcGbk9rs/%EA%B3%A0%EA%B0%9D-%EB%B9%84%EC%A6%88?node-id=1439-18041&m=dev)의 디스크립션(`1571:13081`)입니다.

- **「별도 저장 버튼 없이 즉시 반영」** — 제어 전용 구조 그대로입니다. 소비자가 `onChange`에서 바로 서버에 씁니다.
- **「주문 마감 독촉 알림은 비활성화 불가」** — **DS에 이 상태가 없습니다.** `Toggle`에 `disabled` 축이 없어서(위 「Variant 축」) 「항상 켜짐 + 끌 수 없음」을 표현할 방법이 지금은 없습니다. 아래 「디자인 확인 필요」의 `disabled` 항목이 가리키던 필요가 **실제 요구사항으로 확인된 것**이라 우선순위가 올라갑니다.
- 미확정으로 남은 것 — 알림 항목 전체 목록(시안엔 1건), 설정이 계정 단위인지 업체 단위인지, OS 알림 권한이 꺼져 있을 때의 안내. 전부 소비 앱 몫이라 DS 범위 밖입니다.

### 디자인 확인 필요

| 항목        | 내용                                                                                       |
| ----------- | -------------------------------------------------------------------------------------------- |
| 끌 수 없는 항목 | 「주문 마감 독촉 알림은 비활성화 불가」가 요구사항인데 `Toggle`에 `disabled` 축이 없습니다. 시각 정의가 필요합니다 |
| 텍스트 넘침 | 제목·설명이 `whitespace-nowrap`이라 길어지면 토글을 밀어냅니다. 구현은 `truncate`로 뒀는데 말줄임이 맞는지, 줄바꿈이면 행 높이가 늘어도 되는지 |
| 항목 간격   | 심볼에 목록 배치가 없습니다. 사용처는 1건뿐이라 항목 사이 간격이 정의되지 않았습니다            |
| 구분선      | 목록 형태인데 항목 사이 구분선 정의가 없습니다                                                |

### Storybook

`apps/storybook/src/stories/biz-ui/ToggleListItem.stories.tsx`, `meta.title`은 `core/biz-ui/ToggleListItem`. 스토리 4종입니다.

- `Default` — 컨트롤 패널용
- `States` — `checked` 2조합
- `AlarmList` — 사용처(MYP-502)와 같은 배치로 3건. 저장 버튼 없이 즉시 반영되는 흐름
- `LongText` — 제목·설명이 길 때의 `truncate` 동작

행이 `w-full`이라 `DOCUMENT_FRAME_WIDTH = 'w-[340px]'`로 감쌉니다.

## 검증

### Toggle

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

빌드 · 린트 · `dist` 공개 API를 확인했습니다.

### ToggleListItem

| 항목           | 기대                                    | 실측                                                            |
| -------------- | --------------------------------------- | --------------------------------------------------------------- |
| 행             | 340 × 51                                | **340 × 51** — 4스토리 전부                                      |
| `<label>` 중첩 | 행 안에 `<label>` 1개 · `<input>` 1개   | 자손 `<label>` **0개** · `<input>` 1개                            |
| 접근성 이름    | 제목만. 설명은 따로                     | `aria-labelledby` → 「정산 안내」 · `aria-describedby` → 설명     |
| 선택 영역      | 제목·설명 어디를 눌러도 토글            | 제목 · 설명 · 트랙 클릭 전부 반전 (`AlarmList`)                  |
| 히트 영역      | 6px 확장이 **없어야** 함                | `::before` **없음** (`Toggle` 단독은 `-6px` 유지)                |
| 커서           | 행 전체가 `pointer`                     | `pointer`                                                        |
| 제목 · 설명    | `heading-5`/`black` · `body`/`gray-700` | 18px/700 `rgb(16,24,40)` · 16px/500 `rgb(76,86,110)`             |
| 넘침           | 텍스트만 말줄임 · 토글 유지             | 설명 286 ← 420 말줄임 · 트랙 52 유지 (286 + 2 + 52 = 340)        |
| 텍스트 블록    | 51.3이 51 안에                          | **51.289** · 오버행 0.289 · `overflow: visible`이라 안 잘림       |
| 드래그 선택    | 텍스트가 안 잡힘                        | `user-select` · `-webkit-user-select` 모두 `none` · 자식까지 상속 |

**트랙은 `shrink-0` 없이도 안 눌립니다.** 텍스트가 `min-w-0` + `truncate`라 먼저 양보하기 때문입니다 — 행 폭을 60px까지 좁혀도 트랙은 52 × 30을 유지했습니다.
