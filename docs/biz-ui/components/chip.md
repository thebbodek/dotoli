# Chip 구현 기록

`apps/biz-ui/src/components/Chip` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 이 컴포넌트 고유 사실만 둡니다.

Figma: [Chip 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=75-4739&m=dev) (`75:4739`). 실제 값은 `Chip` 심볼 4개(`75:5226` · `75:5227` · `75:5229` · `75:5230`)와 `ActionChip` 심볼 2개(`884:2835` · `884:2843`)에서 실측했습니다.

## 구현 현황

| 컴포넌트     | 티켓       | 설명                                            |
| ------------ | ---------- | ----------------------------------------------- |
| `Chip`       | DOTOLI-245 | `checked × selectMode` 4조합. 선택 컨트롤        |
| `ActionChip` | DOTOLI-295 | 축 없음. **버튼** — 누르는 동안만 pressed        |

**둘은 같은 알약을 쓰고 하는 일이 다릅니다.** `Chip`은 값을 고르고, `ActionChip`은 누르면 동작이 일어납니다. 공유 조각은 `Chip/shared/`에 있습니다 (아래 「계열로 승격했습니다」).

## Variant 축

| 컴포넌트     | 축                   | Figma 이름      | 값                        |
| ------------ | -------------------- | --------------- | ------------------------- |
| `Chip`       | 선택 여부            | `isSelected`    | `false` · `true`          |
| `Chip`       | 선택 개수            | `selectMode`    | `single` · `multiple`     |
| `ActionChip` | 상호작용 상태        | `state`         | `default` · `pressed`     |

**`ActionChip`의 `state`는 prop이 아닙니다** — 아래 「결정」.

**Figma가 `useIcon`을 `selectMode`로 개명했습니다.** DOTOLI-245에서 「디자인 확인 필요」로 올려 둔 항목이고, 심볼 이름이 `isSelected=false, selectMode=multiple` 형태로 바뀌어 **구현 쪽 이름과 일치합니다.** 그 행은 닫았습니다.

4조합이 전부 심볼로 정의돼 있습니다. **`disabled` 축은 없습니다.**

**Figma 레이어는 `Chip`(`useIcon=false`)과 `ChipCheck`(`useIcon=true`) 둘로 나뉘어 있지만 컴포넌트는 하나입니다.** plan.md가 착수 전에 「축이 같으면 하나로 잡고, 실측에서 다른 축이 나오면 그때 쪼갠다」로 정해 뒀고, 실측 결과 두 세트의 축이 `isSelected × useIcon`으로 **완전히 같았습니다.** 심볼 이름도 네 개 모두 두 축을 함께 갖고 있습니다(`isSelected=true, useIcon=false` 형태).

## 실측 스펙

| 항목      | 값                                                                 |
| --------- | -------------------------------------------------------------------- |
| 높이      | 32 → `h-[32px]` 고정 (아래 「높이를 고정합니다」)                      |
| 폭        | **고정하지 않음.** 문서 심볼이 80(아이콘 O) · 64(X)인데 둘 다 `라벨` 기준 hug |
| padding   | `px-[20px] py-[6px]`                                                  |
| gap       | 4 → `gap-[4px]` (아이콘이 있을 때만 의미 있음)                        |
| radius    | 99 → `rounded-full`                                                   |
| 라벨      | `label-semibold` (14 · SemiBold · 1.45 · -0.42px)                     |
| 아이콘    | `check` 12 → `text-[12px]`. **라벨 오른쪽** (Figma 자식 순서)          |

아이콘이 오른쪽인 것은 `Filter`(왼쪽)와 갈리는 지점입니다 — Filter의 아이콘은 필터 종류를 나타내는 **장식**이고, Chip의 체크는 **선택 결과 표시**라 자리가 다릅니다.

폭은 사용처에서 라벨을 따라갑니다 — [CSC-101 자주 묻는 질문 검색](https://www.figma.com/design/LomGIAwvPAkyRbBcGbk9rs/%EA%B3%A0%EA%B0%9D-%EB%B9%84%EC%A6%88?node-id=1439-17949&m=dev)의 추천 질문 칩이 132 · 148 · 186 · 197로 제각각이고 높이만 32로 같습니다.

| 상태       | 배경         | 테두리            | 라벨         | 아이콘       |
| ---------- | ------------ | ----------------- | ------------ | ------------ |
| `default`  | `base/white` | 1px `gray/200`    | `gray/900`   | `gray/400`   |
| `selected` | `gray/900`   | **없음**          | `base/white` | `base/white` |

아이콘 색은 Figma가 내보낸 SVG의 `fill`에서 직접 읽었습니다 — `#AEB5C6`(= `gray/400`) · `white`.

### ActionChip 실측 (DOTOLI-295)

**알약 자체는 `Chip`과 완전히 같습니다** — 높이 32 · `px-[20px]` · radius 99 · `label-semibold` · stroke 1px. 심볼 폭도 64로 아이콘 없는 `Chip`(`75:5227`)과 같고, **체크 아이콘이 없습니다.**

| 상태       | 배경         | 테두리(1px)     | 라벨       |
| ---------- | ------------ | --------------- | ---------- |
| `default`  | `base/white` | `gray/200`      | `gray/900` |
| `pressed`  | `blue/100`   | `blue/300`      | `gray/900` |

**`default`는 `Chip`의 `default`와 토큰까지 같아** `CHIP_DEFAULT_CONTAINER_STYLE`을 그대로 씁니다. **pressed는 배경과 테두리 색만 바뀌고 라벨은 그대로입니다** — `Filter`의 `selected`가 `text-blue-600`으로 라벨까지 바꾸는 것과 갈리는 지점이라, 같은 `blue/100` + `blue/300` 조합이어도 그쪽 상수를 재사용하지 않았습니다.

사용처는 [CSC-101 검색-입력없음](https://www.figma.com/design/LomGIAwvPAkyRbBcGbk9rs/%EA%B3%A0%EA%B0%9D-%EB%B9%84%EC%A6%88?node-id=1217-11047&m=dev)(`1217:11047`) 「자주 찾는 질문」입니다. 칩 5개가 340 폭에 3줄로 흐르고 **가로 gap 10 · 세로 pitch 46(= gap 14)**, 폭은 186 · 132 · 197 · 132 · 148로 제각각입니다. 가로 10이라 히트 영역은 `Chip`과 같은 4px입니다(아래 「결정」의 표 그대로).

액션은 주석(`1576:20447` 「자주 찾는 질문– 선택시」)이 정의합니다 — **「칩 탭 → 해당 질문으로 검색 실행. 검색어 입력 필드에 반영된다」.**

### 테두리는 `inset-ring`입니다

**선택되면 테두리가 사라집니다.** CLAUDE.md 「스타일 규칙」이 「variant별로 있고 없든 결과는 같다」며 못박은 바로 그 경우라 `border`를 쓰면 선택할 때마다 32 ↔ 34로 튀고 줄바꿈까지 다시 계산됩니다. 칩은 여러 개가 한 줄에 흐르므로 시프트가 더 눈에 띕니다.

`Filter`가 `border`인 것과 갈리는데, 그쪽은 **두 상태 모두 1px 테두리를 갖고 색만 바뀝니다.**

### 아이콘 웨이트는 `bold`입니다

`CHIP_ICON_WEIGHT`로 명시했습니다. Figma 인셋을 역산해 [checkbox.md](./checkbox.md)가 `getBBox()`로 재 둔 값과 대조했습니다.

12px 박스 · 인셋 `23.43% 7.8% 17.18% 10.93%` → 글리프 9.7524 × 7.1268 → viewBox 256 환산 **208.05 × 152.03**.

| 웨이트    | viewBox 256 (checkbox.md 실측) | 이번 값과의 차이 |
| --------- | ------------------------------ | ---------------- |
| `regular` | 200 × 144.01                   | −8.05 · −8.02    |
| `bold`    | **208.06 × 152.03**            | **0.01 · 0**     |

`Checkbox`의 체크와 같은 웨이트입니다. **`regular` ↔ `fill`을 가를 때 쓰는 서브패스 개수법([bottom-tab.md](./bottom-tab.md))은 여기서 필요 없습니다** — `check`는 획 하나라 세 웨이트가 전부 서브패스 1개이고, 대신 굵기 차이가 바운딩에 그대로 나옵니다.

## 결정

- **`<label>` + `sr-only` 네이티브 input + 시각 pill입니다.** CLAUDE.md 「폼 컨트롤 공통」이 `Chip`을 직접 지목하므로 1(네이티브 컨트롤) · 2(상태를 JS로) · 4(제어 전용)를 그대로 따릅니다. `Filter`가 `<button aria-pressed>`인 것과 갈리는데, Filter는 Button 계열이고 Chip은 폼 컨트롤로 분류돼 있습니다.

- **`useIcon`을 그대로 옮기지 않고 `selectMode`로 이름을 바꿨습니다.** Figma 주석이 이 축을 **선택 개수**로 정의합니다 — `useIcon=true`는 「다옵션 선택 가능」, `false`는 「1개의 옵션만 선택」. 즉 이름은 아이콘 토글인데 실제로는 컨트롤의 의미를 정하는 축이고, 체크 아이콘은 그 결과로 붙는 표시입니다.

  | `selectMode` | `<input type>` | 체크 아이콘 |
  | ------------ | -------------- | ----------- |
  | `multiple`   | `checkbox`     | 있음        |
  | `single`     | `radio`        | 없음        |

  `useIcon`을 그대로 두면 **`useIcon={false}`가 radio를 만드는** 코드가 됩니다. CLAUDE.md 「컴포넌트 API」는 **컴포넌트 이름**을 Figma 심볼명에 맞추라고 하고 prop 이름은 `is`/`use`/`has` 규칙만 정하므로, 축 이름을 실제 의미에 맞춘 것이 규칙과 충돌하지 않습니다. Figma 쪽 이름도 함께 맞추는 편이 좋아 아래 「디자인 확인 필요」에 올려 둡니다.

- **기본값은 `multiple`입니다.** 잘못 썼을 때 **더 빨리 드러나는 쪽**이라서입니다.

  `single`을 쓰면서 `name`을 빠뜨리면 HTML 표준상 **radio 그룹이 아예 형성되지 않습니다** — 그룹 조건이 「둘 다 비어 있지 않은 같은 `name`」이라, `name`이 없으면 각 칩이 자기 혼자의 그룹입니다. 그런데 이 컴포넌트는 제어 전용이라 **화면은 멀쩡히 하나만 선택된 것처럼 동작합니다.** 조용히 죽는 것은 폼 전송값 · 보조기술의 set size(`1 of 1`로 읽힘) · 화살표 키 그룹 이동뿐이라, 개발 중에 알아채기 어렵습니다.

  반대로 다중을 잘못 쓰면 두 개가 동시에 선택돼 화면에서 바로 보입니다.

  **`single`일 때 `name`을 타입으로 강제하는 것**(판별 유니온 props)도 검토했지만 두 DS 모두 선례가 없는 새 패턴이라 두지 않았습니다. 필요가 확인되면 그때 엽니다.

- **prop 이름이 `isSelected`가 아니라 `checked`입니다.** 실제로 네이티브 input을 렌더하므로 `checked`가 HTML 기본 속성입니다 — `ItemCheckbox`가 같은 이유로 `checked`를 쓰고, `Filter`가 `isSelected`인 것은 그쪽이 `<button>`이라 네이티브 `selected`가 없기 때문입니다 ([checkbox.md](./checkbox.md) 「ItemCheckbox 결정」).

- **`Base` 껍데기를 만들지 않았습니다.** `CheckboxBase`는 `type='checkbox'`를 하드코딩하고 있어 radio를 못 내고, 이름도 checkbox를 가리킵니다. 그렇다고 Chip 전용 `ChipBase`를 만들 이유도 없습니다 — checkbox.md가 정의한 대로 **`Base`는 「형제들이 공유하는 바깥 껍데기」**이고 Chip에는 공유할 형제가 없습니다.

  다만 「`<label>` + 숨긴 input + children」 조립이 이제 `CheckboxBase`와 `Chip` 두 곳에 있습니다. **세 번째가 나오면**(`SelectionItem` · `Toggle`이 후보) 그때 `components/shared`로 올리는 게 맞습니다 — 지금 올리면 Checkbox 계열을 함께 고쳐야 하고, 무엇을 공통으로 둘지도 세 번째를 봐야 정해집니다.

  **그때 올릴 대상에는 타입 묶음도 포함됩니다.** `ChipProps`가 `CheckboxProps`와 같은 네이티브 통로 묶음(`className` · `id` · `name` · `value` + `Required<Pick<…, 'checked' | 'onChange'>>` + `RefAttributes`)을 다시 나열하고 있습니다. 계열이 달라 지금 `Omit<CheckboxProps, …>`로 묶으면 잘못된 결합이 되지만, 껍데기를 올릴 때는 타입도 함께 가야 합니다.

- **`selectMode` · `name`을 칩마다 받습니다 — 그룹 컴포넌트를 두지 않았습니다.** 둘 다 의미상 **그룹의 축**이고, internal-ui는 같은 문제를 `InputRadioFieldGroup` + context로 풉니다. 그래도 안 만든 것은 **쓰는 곳이 아직 없어서**입니다(checkbox.md의 `useTouchTarget` 판단과 같은 기준). 실제 소비처에서 칩마다 같은 값을 반복하는 게 부담이 되면 그때 그룹을 엽니다.

- **칩은 찌그러지지 않습니다 — `shrink-0` + `whitespace-nowrap`.** 칩이 길어지면 **그룹 안에서 다음 줄로 넘어가야지 칩 자체가 눌리면 안 됩니다.** 둘 다 없으면 좁은 컨테이너에서 라벨이 「라」/「벨」처럼 글자 단위로 쪼개지고 칩 높이가 32 → 52로 늘어납니다.

  한글이라 특히 잘 터집니다. flex 아이템의 `min-width: auto`는 **min-content 폭**으로 풀리는데, 공백 없는 한글은 어디서나 줄바꿈이 가능해 min-content가 **한 글자**입니다. 그래서 컨테이너가 조금만 좁아도 무제한으로 눌립니다.

  | 클래스 | 막는 것 |
  | ------ | ------- |
  | `whitespace-nowrap` | 라벨이 칩 **안에서** 여러 줄이 되는 것. min-content가 라벨 전체 폭이 되어 눌림 자체가 사라집니다 |
  | `shrink-0` | flex 컨테이너가 칩을 **줄이는** 것. 의도를 코드에 남깁니다 |

  `w-fit`만으로는 못 막습니다 — `fit-content`는 가용 폭에 갇히기 때문에 좁아지면 그대로 따라 줄어듭니다.

  대신 **칩 하나가 컨테이너보다 넓으면 넘칩니다.** 줄바꿈으로 해결되지 않는 유일한 경우이고, 실사용(340px · 최대 199px)에서는 나지 않습니다. 라벨 길이 정책은 아래 「디자인 확인 필요」에 있습니다.

- **높이를 고정합니다 — `h-[32px]`, `py-[6px]` 없음.** 패딩으로 쌓으면 `6 + 20.3 + 6 = 32.3`이 나옵니다. 라벨 행높이가 `label-semibold`의 `1.45 × 14 = 20.3`인데 **Figma의 텍스트 박스는 20**이라 0.3px이 남습니다.

  피할 수 있는 차이라 고정했습니다. `CtaButton`(`h-[52px]`·`h-[40px]`·`h-[32px]`) · `IconButton`(`size-[40px]`) · `BottomTab`(`h-[60px]`)이 이미 **Figma가 높이를 고정한 곳에서는 높이를 명시**하는 방식이라 계열과도 맞습니다.

  대신 **패딩이 높이를 만들지 않습니다.** 타이포가 바뀌어도 32가 유지되므로, 라벨 크기를 바꾸려면 높이도 함께 봐야 합니다. `Filter`는 아직 패딩 방식이라 34.3(Figma 33)인데, 그쪽은 이 티켓 밖입니다.

- **히트 영역은 4px입니다 — `TOUCH_TARGET_NARROW_STYLE`.** 기본값 6px이 아닙니다. **칩은 그룹으로 나열되는데 확장은 양쪽으로 퍼지므로**, 두 칩 사이에서 `확장 × 2`가 gap보다 크면 히트 영역이 겹쳐 엉뚱한 칩이 눌립니다.

  | 확장 | 두 칩 사이 | 그룹 gap 10px에서 |
  | ---- | ---------- | ----------------- |
  | 6px  | 12px       | **겹침**          |
  | 4px  | 8px        | 2px 남고 안 겹침  |

  32 + 4×2 = 40으로 `touch-target` 유틸(44px)에는 여전히 못 미치지만, `Checkbox`(28 → 40)와 같은 결과입니다. 선택 기준은 CLAUDE.md 「히트 영역 확장」에 규칙으로 올렸습니다.

- **`disabled`를 넣지 않습니다.** Figma에 축이 없어 스타일을 정의할 수 없습니다 (`ItemCheckbox`와 같은 판단).

- **접근성 이름은 `label`이 집니다.** `<label>`이 input을 감싸고 그 안에 텍스트가 있어 이름이 자동으로 붙습니다. 「폼 컨트롤 공통」 6의 반대편 사례라 `aria-label`을 열지 않았습니다.

- **`name` · `value` · `id` · `ref`를 엽니다.** 「폼 컨트롤 공통」 5의 네이티브 통로입니다. **`name`은 `single`에서 사실상 필수**입니다 — radio 그룹을 묶는 유일한 수단입니다.

### DOTOLI-295 · ActionChip

- **계열로 승격했습니다.** DOTOLI-245가 「`Chip`에는 공유할 형제가 없습니다」로 단독 폴더를 정당화했는데, **형제가 생겼습니다.**

  ```
  components/Chip/
  ├── Chip/          선택 컨트롤 (label + sr-only input)
  ├── ActionChip/    버튼
  ├── shared/        CHIP_BASE_STYLE · CHIP_DEFAULT_CONTAINER_STYLE
  └── index.ts
  ```

  **`Chip/Chip/`은 `Calendar/Calendar/` 선례입니다.** 계열명과 대표 컴포넌트명이 같을 때 쓰는 형태이고, `Chip/shared/`는 계열 안의 shared라 **공개**입니다(CLAUDE.md 「코드 규칙」 1의 표). 공개 export 이름은 하나도 바뀌지 않았고 `@/components/Chip`에서 가져다 쓰는 [`DateBottomSheetOptions`](./calendar.md)도 그대로입니다.

- **shared에 올린 것은 둘뿐입니다 — 상태 맵은 각자 듭니다.** 「같은 알약」인 부분(`CHIP_BASE_STYLE`)과 「쉬는 모습」(`CHIP_DEFAULT_CONTAINER_STYLE`)만 공통입니다.

  나머지를 못 올리는 것은 **취향이 아니라 Tailwind 제약**입니다. `Chip`의 선택 상태는 `bg-gray-900 text-white`처럼 **기본형**으로 붙고 `ActionChip`의 pressed는 `active:bg-blue-100`처럼 **variant형**으로 붙는데, variant는 완성된 리터럴이어야 스캔되므로([CLAUDE.md](../../../apps/biz-ui/CLAUDE.md) 「스타일 규칙」) **같은 문자열을 양쪽이 나눠 쓸 수 없습니다.** 색이 같았더라도 마찬가지입니다.

- **Figma의 `state` 축을 prop으로 옮기지 않았습니다.** `state=pressed`는 **순간 피드백**이라(디자이너 확인) CSS `:active`가 그리는 것이고, 소비자가 들 상태가 아닙니다. `CtaButton` · `IconButton` · `Filter`의 hover · pressed도 전부 prop이 아닌 것과 같은 자리입니다.

  **`Filter`의 `isSelected`와 갈리는 지점이기도 합니다** — 그쪽은 누른 뒤에도 남는 상태라 소비자가 들어야 하고, 여기는 손을 떼면 사라집니다. 이름이 `ActionChip`인 이유이고, **지속되는 선택이 필요하면 그건 `Chip`입니다.**

- **`transition-colors`라 배경은 페이드하고 테두리는 즉시 바뀝니다.** `CHIP_BASE_STYLE`이 이미 갖고 있던 것이고, `inset-ring`은 `box-shadow` 기반이라 전환 대상이 아닙니다 — CLAUDE.md 「스타일 규칙」이 `Input` 포커스 링에서 정해 둔 그대로라 계열을 따로 손대지 않았습니다.

- **`<button type='button'>`을 박고 `type`을 열지 않았습니다.** 검색 화면 안에 놓이는 칩이라 `<form>` 안에서 submit이 되면 안 됩니다. `Filter` · `CtaButton`만 `type`을 열어 뒀고 나머지 열 곳 남짓(`MenuItem` · `NavigationListItem` · `CalendarDayButton` · `BottomTabItem` …)은 전부 박아 두는 쪽이라 다수를 따랐습니다.

- **`onClick`이 필수입니다.** 누르면 동작이 일어나는 것이 이 컴포넌트의 존재 이유라 없으면 의미가 없습니다. `CollapseButton`의 `Required<Pick<…, 'onClick'>>` 선례를 그대로 씁니다.

- **`label`은 `Chip`에서 `Pick`하지 않고 직접 선언합니다.** 처음엔 「코드 규칙」 4(타입 중복 금지)를 들어 `Pick<ChipProps, 'label'>`로 썼는데, 계열 선례가 반대쪽이라 되돌렸습니다.

  biz-ui에서 `label`을 `Pick`으로 가져오는 네 곳(`Toast` · `BottomActionBar` · `ConfirmModal` · `Notification`)은 **전부 `CtaButtonProps`에서 가져오고 그 값을 실제로 `CtaButton`에 넘깁니다** — 합성 의존이 있어 타입이 따라가는 것이 맞는 경우입니다. `ActionChip`은 `Chip`을 렌더하지 않습니다.

  더 가까운 반례는 `Button` 계열입니다 — `CtaButton` · `Filter` · `FloatingPill`이 **한 계열 안의 형제이고 셋 다 `<button>`에 같은 성격의 라벨을 그리는데 아무도 서로를 `Pick`하지 않습니다.** 규칙 4가 막는 것은 **prop 묶음의 중복 나열**이지 원시 스칼라 하나가 아니고, 형제끼리 묶어 두면 `Chip`의 `label`이 나중에 바뀔 때 `ActionChip`의 공개 API가 조용히 따라 바뀝니다.

- **체크 아이콘이 없습니다.** 심볼에도 없고, 체크는 **선택 결과 표시**라 선택이 남지 않는 컴포넌트에는 그릴 것이 없습니다. `CHIP_ICON_*`이 `Chip/`에 남아 있는 이유입니다.

## API

| prop         | 필수 | 기본값     | 비고                                        |
| ------------ | ---- | ---------- | ------------------------------------------- |
| `label`      | ✅   | —          | 칩 텍스트. 접근성 이름도 여기서 나옴        |
| `checked`    | ✅   | —          | 제어 전용                                   |
| `onChange`   | ✅   | —          | 제어 전용                                   |
| `selectMode` |      | `multiple` | `multiple` → checkbox + 체크 아이콘         |
| `name`       |      | —          | `single`에서는 그룹을 묶으려면 반드시 필요  |
| `value` · `id` |    | —          | `<input>`으로 전달                          |
| `className`  |      | —          | `<label>`(칩 전체)에 적용                   |

`ref`는 `<input>`을 가리킵니다.

### ActionChip

| prop        | 필수 | 기본값 | 비고                                        |
| ----------- | ---- | ------ | ------------------------------------------- |
| `label`     | ✅   | —      | 칩 텍스트. 접근성 이름도 여기서 나옴        |
| `onClick`   | ✅   | —      | 누르면 일어나는 동작. 이 컴포넌트의 존재 이유 |
| `className` |      | —      | `<button>`에 적용                            |

`ref`는 `<button>`을 가리킵니다. **`state`(pressed)는 prop이 아니고, `type`은 `'button'`으로 박혀 있습니다.**

## internal-ui와 갈린 지점

**`apps/internal-ui`에도 `Chip`이 있지만 성격이 완전히 다릅니다 — 옮겨올 것이 없습니다.**

| | internal-ui `Chip` | biz-ui `Chip` |
| --- | --- | --- |
| 성격 | **삭제 가능한 태그** | **선택 컨트롤** |
| 엘리먼트 | `<button>` (누르면 제거) | `<label>` + 네이티브 input |
| 아이콘 | `x` (제거) | `check` (선택 표시) |
| 접근성 이름 | `` `${label} 제거` `` | 라벨 텍스트 |
| 높이 · radius | 24 · `rounded-in-full` | 32 · `rounded-full` |
| 그룹 | `ChipGroup`(`<ul>`) | 없음 — 소비자가 배치 |

이름만 겹치는 사례입니다. **internal-ui `Chip`에 해당하는 것은 biz-ui에서 `Tag`로 따로 나왔습니다**(DOTOLI-257). 두 구현 대조는 [tag.md](./tag.md) 「internal-ui와 갈린 지점」에 있습니다.

## 디자인 확인 필요

| 항목                 | 내용                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| 레이어 분리          | `Chip` · `ChipCheck`로 나뉘어 있지만 축이 같아 컴포넌트는 하나입니다. 한 세트로 합칠지                     |
| `Chip`의 상호작용 상태 | `ActionChip`에는 `pressed`가 생겼지만 **`Chip`에는 여전히 hover · pressed 정의가 없습니다**(디자이너 확인 — 이번 pressed는 `ActionChip` 전용). 선택 컨트롤에도 눌림 피드백이 필요한지 |
| 포커스               | 포커스 링 정의가 없습니다. 실제 컨트롤이 `sr-only`라 **키보드 포커스가 화면에 보이지 않습니다** (공통 규칙 7) |
| `disabled`           | 축이 없습니다. 선택 불가 칩을 표시할 일이 없는지                                                          |
| 라벨 길이            | 칩은 한 줄을 유지하고 그룹 안에서 다음 줄로 넘어갑니다(위 「칩은 찌그러지지 않습니다」). **칩 하나가 컨테이너보다 넓은 경우만 미정**이고 지금은 넘칩니다. internal-ui `Chip`은 `truncate` + `title`인데 말줄임이 맞는지 |
| 히트 영역            | **4px 확장했습니다**(위 「결정」). Figma 주석이 아니라 요청으로 넣은 것이라 심볼에도 지정이 필요한지                        |
| 단일 선택 해제       | radio는 네이티브로 해제가 안 됩니다. 선택한 칩을 다시 눌러 해제하는 동작이 필요한지                        |

## Storybook

`apps/storybook/src/stories/biz-ui/Chip.stories.tsx`, `meta.title`은 `core/biz-ui/Chip`. 스토리 4종입니다.

- `Default` — 컨트롤 패널용. `onChange`가 비어 있어 캔버스에서는 토글되지 않습니다
- `Matrix` — Figma 문서 프레임과 같은 배치로 `selectMode` × `checked` 4조합
- `MultipleSelect` — 추천 질문 칩 4개를 같은 `name`으로 묶어 다중 선택
- `SingleSelect` — 같은 목록을 `selectMode='single'`로. **하나만 선택되는 것과 `name` 없이는 그룹이 안 묶이는 것**을 함께 보여줍니다

`MultipleSelect` · `SingleSelect`는 사용처(CSC-101 추천 질문)와 같은 340px 폭에 `wrap`으로 깔아 **여러 줄 자동 줄바꿈**을 확인합니다.

`apps/storybook/src/stories/biz-ui/ActionChip.stories.tsx`, `meta.title`은 `core/biz-ui/ActionChip`. **`Default` 하나뿐입니다.**

**계열로 묶였지만 스토리 타이틀은 평평합니다.** `Button/Filter` · `Order/QuantityStepper`처럼 중첩하는 계열도 있지만, **계열명과 대표 컴포넌트명이 같으면 중첩할 수 없습니다** — `core/biz-ui/Chip`이 이미 리프 스토리라 `core/biz-ui/Chip/ActionChip`으로 가면 사이드바에서 「Chip」이 스토리이자 폴더가 됩니다. 같은 형태인 Calendar 계열 5종이 전부 평평한 것과 같은 이유입니다.

- **pressed 스토리를 두지 않았습니다.** `state`가 prop이 아니라 `:active`라 별도 스토리를 만들어도 `Default`와 **같은 엘리먼트**가 그려집니다. 캔버스에서 칩을 누르고 있으면 그대로 보입니다.
- **여러 개 깔아 두는 스토리도 두지 않았습니다.** 줄바꿈 · wrap · 히트 영역은 `CHIP_BASE_STYLE`이 내는 것이라 위 `MultipleSelect` · `SingleSelect`가 이미 같은 값을 확인합니다. 사용처(검색 입력 + 추천 질문)를 재현하는 것은 DS 범위 밖이라 소비 앱이 집니다.

## 검증

Storybook 렌더의 계산값으로 대조했습니다.

| 항목        | 기대                          | 실측                                                     |
| ----------- | ----------------------------- | -------------------------------------------------------- |
| 칩 높이     | 32                             | **32** — 4조합 · 실사용 4개 전부                          |
| 폭          | `라벨` 기준 80 · 64            | 77.77(아이콘 O) · 63.38(X)                                |
| padding     | 좌우 20 · 높이는 `h-[32px]`     | `0px 20px`                                                |
| radius · gap | full · 4                      | `rounded-full` · `4px`                                    |
| 라벨        | `label-semibold`               | 14px / 600                                                |
| 테두리      | `default`만 1px `gray/200`     | `inset 0 0 0 1px rgb(227,230,238)` · `selected`는 `none`  |
| 배경 · 라벨 | white/gray-900 ↔ gray-900/white | `rgb(255,255,255)`/`rgb(26,34,51)` ↔ 반대                |
| 아이콘      | 12px · `gray/400` → white      | 12px · `rgb(174,181,198)` → `rgb(255,255,255)`            |
| 단일 선택   | 같은 `name`에서 하나만          | `question` 그룹에서 1번 → 3번으로 정확히 이동             |
| 줄바꿈      | 칩은 한 줄, 그룹에서 다음 줄로  | 340px에 3줄로 배치 · 전부 32 · **넘침 없음**              |
| 히트 영역   | 이웃과 안 겹침                  | gap 10px · 확장 4px씩 → **2px 남음**                      |

Figma 문서 폭(80 · 64)과 2.2px 차이는 라벨 텍스트 렌더 폭 차이입니다.

빌드 · 린트 · `dist` 공개 API(`Chip` + `CHIP_*` 10종) 확인했습니다.

**히트 영역의 `::before`는 DOTOLI-295에서 확인됐습니다** — `getComputedStyle(chip, '::before').inset`이 `-4px`입니다. DOTOLI-245 당시에는 `before:-inset-1`이 새 클래스라 실행 중 서버 CSS에 규칙이 없어 미확인으로 남겨 뒀던 항목입니다.

### ActionChip (DOTOLI-295)

`Default` 스토리 렌더의 계산값입니다.

| 항목        | 기대                        | 실측                                       |
| ----------- | --------------------------- | ------------------------------------------ |
| 높이 · 폭   | 32 · 심볼 64                 | **32** · 63.36 (`Chip` 아이콘 X와 같은 값)  |
| padding     | 좌우 20 · 높이는 `h-[32px]`  | `0px 20px`                                  |
| radius      | 99 → full                    | `rounded-full`                              |
| 라벨        | `label-semibold` · `gray/900` | 14px / 600 · `-0.42px` · `rgb(26,34,51)`   |
| 테두리      | 1px `gray/200`               | `inset 0 0 0 1px rgb(227,230,238)`          |
| 배경        | `base/white`                 | `rgb(255,255,255)`                          |
| 줄바꿈      | 한 줄 유지                    | `nowrap`                                    |
| 히트 영역   | 4px                          | `::before` inset `-4px`                     |

**pressed는 CSS 규칙으로 확인했습니다.** `:active`는 실제 입력 중에만 계산되므로, 프로덕션 Storybook 빌드의 생성 CSS에서 규칙 자체를 읽었습니다.

```css
.active\:bg-blue-100:active         { background-color: var(--color-blue-100) }
.active\:inset-ring-blue-300:active { --tw-inset-ring-color: var(--color-blue-300) }
```

`--color-blue-100`(`#ebf3ff`) · `--color-blue-300`(`#97befa`)이 Figma 실측값과 같고, **라벨 색 규칙은 없어** `gray/900`이 그대로 유지됩니다.

> **실행 중이던 Storybook에는 `:active` 규칙이 하나도 없었습니다** — 이번 것만이 아니라 기존 컴포넌트 것까지 전부입니다. `dist`를 지웠다 다시 빌드하면 실행 중 서버의 `@source '../../dist'` 스캔이 따라오지 않기 때문이고, CLAUDE.md 「검증」의 재시작 규칙이 걸리는 자리입니다. **눌러서 눈으로 보려면 서버를 재시작해야 합니다.**
