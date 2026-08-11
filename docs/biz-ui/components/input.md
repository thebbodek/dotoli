# Input 계열 구현 기록

`apps/biz-ui/src/components/Input` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 Input 계열 고유 사실만 둡니다.

Figma: [InputField](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=294-2349&m=dev) (`294:2349`)는 문서용 프레임이고 실제 값은 컴포넌트 세트 `51:1293`에서 실측했습니다.

## 구현 현황

| 컴포넌트       | 티켓       | 설명                                                                |
| -------------- | ---------- | ------------------------------------------------------------------- |
| `InputField`   | DOTOLI-226 | `type` 4종 × `state` 7종. 상태 7종을 「스타일 3종 × 값 유무」로 분해 |
| `InputMessage` | DOTOLI-226 | 박스 아래 슬롯. 에러 메시지와 조건 체크리스트가 한 자리를 나눠 씀   |
| `TextArea`     | DOTOLI-227 | `state` 7종. `type` 축 없음. 라벨이 안 움직이고 색만 바뀜            |

## 계열 공통 결정

- **테두리를 `border`가 아니라 `inset-ring`(box-shadow)으로 그립니다.** 두께가 상태별로 1px↔2px로 바뀌는데 `border`는 그때마다 콘텐츠를 밀어냅니다. 아래 「레이아웃 시프트」 참고. TextArea도 같은 규칙이라 `Input/shared`에 뒀습니다.
- **`readOnly`는 `disabled`와 같은 UI입니다.** 기능은 다릅니다 — `readOnly`는 포커스·텍스트 선택·폼 전송이 되고 `disabled`는 셋 다 안 됩니다. 시각만 맞추려고 `resolveInputState`가 둘을 같은 `disabled` 스타일로 접습니다.
- **`state`를 prop으로 노출하지 않습니다.** `disabled`(HTML 속성) · `errorMessage` 유무 · 포커스 · 값 유무에서 파생합니다. CtaButton · Filter · IconButton과 같은 판단입니다.
- **라벨 상태(`INPUT_LABEL_STATES`)를 두 컴포넌트가 공유합니다.** 조건은 「값 있음 또는 포커스」로 같고 표현만 다릅니다 — InputField는 라벨을 띄우고, TextArea는 색만 `gray-500`→`gray-600`으로 바꿉니다. 그래서 상태 이름을 `floating`/`collapsed`가 아니라 `active`/`idle`로 뒀습니다.
- **`Input/shared`가 담는 것** — 테두리·배경(`INPUT_BOX_STYLES`), 라벨·값 색(`INPUT_TEXT_STYLES`), 상태 해석(`resolveInputState`), 포커스 보정(`useInitialInputFocusEffect`), 하단 메시지 슬롯(`InputMessage`), `maxLength` 기본값. 착수 전 계획은 앞의 둘만 예상했는데 색 매트릭스가 완전히 같아 더 올라갔습니다.

---

## InputField

### Variant 축

| 축      | 값                                                                                 |
| ------- | ---------------------------------------------------------------------------------- |
| `type`  | `text` · `password` · `verify` · `select`                                          |
| `state` | `default` · `focus` · `typing` · `filled` · `error` · `disabled` · `filledDisabled` |

**Figma의 state 7종은 축이 2개입니다.**

| 스타일 상태 | 값 없음     | 값 있음          |
| ----------- | ----------- | ---------------- |
| 평상시      | `default`   | `filled`         |
| 포커스      | `focus`     | `typing`         |
| 에러        | (심볼 없음) | `error`          |
| 비활성      | `disabled`  | `filledDisabled` |

값이 있으면 라벨이 위로 뜨고 그 아래 값이 붙는 규칙이 세 쌍 모두 같습니다. 그래서 코드의 스타일 상태는 `default` · `error` · `disabled` 3종이고, 값 유무와 포커스는 라벨 위치만 바꿉니다.

### 실측 스펙 — 공통 박스

| 항목        | 값                                                              |
| ----------- | ----------------------------------------------------------------- |
| height      | 70px                                                            |
| width       | 문서 프레임 300px. 실제로는 부모 폭을 채움                      |
| padding     | `px-[18px] py-[12px]`                                           |
| radius      | 6px → `rounded-6`                                               |
| 테두리      | 정적 1px / 주목(`focus` · `typing` · `error`) 2px                |
| 콘텐츠 높이 | 46px (라벨 20 + 값 26). 70 − 상하 패딩 12씩                     |
| 박스 ↔ 하단 | gap 6px                                                         |

### 텍스트 3역할

| 역할         | 토큰                                | 노출 조건           |
| ------------ | ----------------------------------- | ------------------- |
| 라벨(플로팅) | `label` (Medium 14px / ls -0.42px)  | 값 있음 또는 포커스 |
| 값           | `body-lg-semibold` (SemiBold 18px)  | 값 있음             |
| 플레이스홀더 | `body-lg-semibold`                  | 값 없음             |

### 상태별 색

| 스타일 상태      | 테두리         | 배경      | 라벨       | 값 / 플레이스홀더 |
| ---------------- | -------------- | --------- | ---------- | ----------------- |
| `default`        | `gray/200` 1px | `white`   | —          | ph `gray/500`     |
| `focus`          | `blue/400` 2px | `white`   | `gray/600` | ph `gray/300`     |
| `typing`         | `blue/400` 2px | `white`   | `gray/600` | `gray/800`        |
| `filled`         | `gray/200` 1px | `white`   | `gray/600` | `gray/800`        |
| `error`          | `red/400` 2px  | `white`   | `red/500`  | `gray/800`        |
| `disabled`       | `gray/200` 1px | `gray/50` | —          | ph `gray/400`     |
| `filledDisabled` | `gray/200` 1px | `gray/50` | `gray/400` | `gray/500`        |

비활성은 평상시 색을 한 단계씩 흐리게 민 것입니다 (ph `500`→`400`, 라벨 `600`→`400`, 값 `800`→`500`).

원본은 `Input/shared/constants/index.ts`의 `INPUT_BOX_STYLES` · `INPUT_TEXT_STYLES`이고 여기 표는 대조용입니다.

### type별 트레일링

| `type`     | 요소                                        | 재사용                   |
| ---------- | ------------------------------------------- | ------------------------ |
| `text`     | `XCircle` 16px `gray/500`, 값 행 안쪽       | `IconButton` `size='sm'` |
| `password` | `EyeSlash`/`Eye` 16px `gray/500`, 박스 레벨 gap 8px | `IconButton` `size='sm'` |
| `verify`   | `확인` 48×32                                | `CtaButton` `size='sm'`  |
| `select`   | `CaretDown`(열림 시 `CaretUp`) 18px `fill` `gray/400` gap 8px | `Icon`     |

크기가 기존 컴포넌트와 정확히 맞아 새로 만든 것이 없습니다. 확인 버튼은 `bg-blue-500` + `label-bold` 14px + `h-32 px-12 py-5`로 CtaButton `primary`/`filled`/`sm`과 완전히 일치합니다.

**`text`의 클리어 버튼만 값 행 안쪽에 있습니다.** Figma가 그렇습니다 — 나머지 셋은 콘텐츠의 형제로 박스 세로 중앙에 붙는데, 클리어만 값과 같은 행에 `justify-between`으로 들어가 중앙보다 10px 아래입니다.

### 하단 메시지 슬롯

| 형태            | 구성                                                                   |
| --------------- | ---------------------------------------------------------------------- |
| 에러 메시지     | `WarningCircle` 14px `red/300` + `caption` `red/400`, gap 2px          |
| 조건 체크리스트 | `CheckCircle` 14px + `caption`, 항목 간 gap 6px / 아이콘↔텍스트 gap 2px |
| 글자 수 카운터  | `caption`. 현재 수 `gray/800` + `/최대` `gray/300`. 우측 정렬          |

카운터는 같은 행의 **오른쪽 끝**에 붙습니다 — 에러 메시지가 있으면 그 오른쪽, 없으면 단독으로 우측 정렬입니다. 색은 에러 상태에서도 바뀌지 않습니다. 현재는 TextArea만 씁니다 (Figma InputField엔 없음).

체크리스트는 **아이콘과 텍스트 색이 다릅니다** — 충족 아이콘 `blue/400` · 텍스트 `blue/600`, 미충족 아이콘 `gray/400` · 텍스트 `gray/600`. 아이콘 색은 심볼 SVG에서 직접 뽑았습니다.

### 구현 결정

- **포커스를 CSS로만 처리하려다 상태로 뺐습니다.** 계획은 조건을 뒤집어(`뜬 상태가 기본`, 값 없음 AND 미포커스일 때만 접힘) `group-[:not([data-filled]):not(:focus-within)]` 한 벌로 끝내는 것이었는데, 실측에서 포커스해도 라벨이 그대로였습니다. 셀렉터는 맞습니다 — `label.matches(...)`가 포커스 시 `false`를 돌려주는데도 computed style은 접힌 값을 유지했고 강제 재계산하니 정상 적용됐습니다. **중첩 `:is()`/`:not()` 안의 `:focus-within` 변화에 스타일 재계산이 트리거되지 않습니다.** controlled input이라 입력마다 어차피 리렌더되므로 포커스/블러 2회는 사실상 공짜입니다.
- **박스 테두리는 계속 `focus-within:`으로 둡니다.** 중첩이 없어 정상 동작하는 것을 같은 실측에서 확인했습니다 (1px `gray/200` → 2px `blue/400`).
- **인풋은 항상 하단 행에 고정하고 라벨만 절대배치로 움직입니다.** `default → focus → typing → filled` 전 구간에서 인풋·박스 좌표 변화가 **0px**입니다.
- **플레이스홀더는 별도 요소를 만들지 않습니다.** 포커스일 때만 `placeholder` 속성을 넘기고 색은 `placeholder:text-gray-300`으로 둡니다. `select`만 네이티브 placeholder가 없어 포커스일 때 `<span>`을 렌더합니다.
- **`type='select'`는 `<button>`입니다.** 값을 표시하고 탭하면 바텀시트가 뜨는 트리거로, Filter와 같은 성격입니다. 선택(`isSelected`) prop을 두지 않습니다 — 선택 여부는 `value` 유무로 나옵니다. Filter가 `isSelected`를 받은 건 값 없는 토글이라서입니다. 열림(`isOpen`)은 스타일에 안 쓰고 `aria-expanded`에만 실어 받습니다 (아래 「접근성」).
- **`select` 캐럿은 열림 상태에서 `caret-up`으로 바뀝니다.** internal-ui `SelectBaseTriggerWrapper`가 회전이 아니라 아이콘 교체를 쓰고 있어 같은 방식으로 맞췄습니다. 이미 받고 있는 `isOpen`이 `aria-expanded`와 아이콘을 함께 물립니다.
- **눈 아이콘 색은 `IconButton` 기본 테마(`gray/500`)를 씁니다.** Figma 심볼은 `gray/400`인데 어느 IconButton 테마 값과도 맞지 않아 계열 일관성을 택했습니다.
- **`ref`와 포커스 핸들러를 `HTMLInputElement | HTMLButtonElement` 유니온으로 받습니다.** `select`만 엘리먼트가 달라서입니다. 렌더 시점에는 확정되므로 두 자리에서 단언합니다.
- **확인 버튼은 `error`·`disabled`에서 비활성입니다.** Figma가 그 두 상태에서 CtaButton disabled 색(`gray/100` 배경 + `gray/400` 라벨)을 씁니다. 값이 없는 `default`에서는 활성입니다.
- **클리어 버튼은 `onClear`를 넘겨야 붙고, 값이 있으면 노출됩니다.** Figma는 `typing`·`error`에만 그려 두고 `filled`에는 없는데, 터치 기기에서 포커스가 쉽게 빠져 그대로 따르면 클리어를 못 쓰게 됩니다. 편집 중에만 노출하는 쪽으로 정해지면 그때 좁힙니다.
- **`body-lg-semibold`의 letter-spacing은 0입니다.** 토큰을 처음 넣을 때 `body-lg`(-3%)를 따라 `-0.03em`으로 뒀는데, Figma Typography 페이지에 **`body-lg-semibold`가 아예 없고** 컴포넌트에서 쓰이는 실제 스타일은 0이라 0으로 맞췄습니다.
- **비밀번호 표시 토글은 내부 상태입니다.** 소비처가 제어할 이유가 없습니다.
- **`utils/`에는 상태 해석만 둡니다.** 스타일은 조합할 분기가 아니라 상태로 조회하는 `Record`라 Filter 방식이 맞습니다. `resolveInputState`가 남은 건 3단 분기가 `no-nested-ternary`에 걸려서입니다. TextArea도 같은 함수를 써서 `shared/utils`로 올렸습니다.
- **아이콘 웨이트는 `fill`(클리어·캐럿·경고·체크)과 `bold`(눈)입니다.** 심볼 렌더 모양으로 판별했고 눈만 아웃라인입니다.
- **값이 빈 에러는 라벨을 가운데에 둔 채 빨갛게만 만듭니다.** 필수값 미입력이 이 경우인데 Figma에 심볼이 없습니다. 라벨을 띄우는 조건이 `값 있음 또는 포커스`라 자연스럽게 그렇게 동작하고, 빈 값 행이 남지 않습니다. 정의가 생기면 그때 맞춥니다. TextArea는 라벨이 안 움직여 이 갈림이 없습니다.
- **`value`가 없어도 항상 controlled로 렌더합니다** (`value={value ?? ''}`). 안 그러면 uncontrolled로 시작해 `hasValue`가 계속 false가 되고, 타이핑한 글자 위에 접힌 라벨이 겹칩니다. internal-ui `Input.tsx`도 같은 방어를 합니다.
- **`maxLength` 기본값은 200입니다.** internal-ui `INPUT_DEFAULT_MAX_LENGTH`와 같은 값입니다 (DOTOLI-128에서 input 200 / textarea 5000으로 정함). 네이티브 속성에 위임하고 JS 절단은 하지 않습니다.
- **`id`를 prop으로 열고 없으면 `useId()`를 씁니다.** 소비처가 외부 `<label>`이나 `aria-describedby`를 걸 수 있어야 합니다 (internal-ui도 `id`를 노출).

### 순차 입력 전환 대응

Figma 주석 `355:1307`의 「검증 완료 시 다음 필드 활성화 · 신규 필드 자동 포커스 · 자동 스크롤」은 필드 배열을 들고 있는 **화면 몫**입니다. 컴포넌트는 그게 가능하도록 세 가지만 열어 둡니다.

| prop        | 배선                                                                 |
| ----------- | -------------------------------------------------------------------- |
| `ref`       | 래퍼가 아니라 실제 `<input>` / `<button>`에 직접. `focus()`·`scrollIntoView()`가 그대로 먹습니다 |
| `autoFocus` | 네 type 모두. `select`의 `<button>`에도 겁니다                        |
| `tabIndex`  | 네 type 모두                                                          |

`disabled`도 HTML 속성 그대로라 「앞 단계 검증 전까지 비활성」을 소비처가 제어합니다.

- **마운트 시 포커스 상태를 DOM에서 확인합니다.** 자동 포커스는 이미 포커스된 상태로 시작해 focus 이벤트가 오지 않고, 그러면 **접힌 라벨이 안내문구를 덮습니다.** 순차 입력의 「신규 필드 자동 포커스」가 정확히 이 경로입니다.

  초기값(`useState(!!autoFocus)`)과 보정 효과(`useInitialInputFocusEffect`)를 함께 씁니다. 초기값만 쓰면 포커스를 다른 요소에 뺏긴 경우를 못 잡고, 효과만 쓰면 첫 페인트가 한 프레임 어긋납니다. 효과는 `document.activeElement?.id === fieldId`로 확인하므로 **ref 병합이 필요 없습니다** — 이미 `id`가 실제 엘리먼트에 걸려 있습니다.

  `useLayoutEffect`가 아니라 `useEffect`를 씁니다. biz-ui는 Next.js 소비처에서 SSR되므로 레이아웃 효과는 서버 경고가 납니다. 초기값이 흔한 경우를 이미 맞춰 주기 때문에 페인트 이후 보정으로 충분합니다.
- 스토리에서 `autoFocus`·`tabIndex`를 컨트롤로 노출해 이 축을 바로 눌러 볼 수 있게 했습니다.

### 접근성

- **라벨의 `pointer-events`를 죽이지 않습니다.** 인풋이 콘텐츠 46px 중 하단 26px에만 있어서 라벨 자리(상단 패딩 12 + 라벨 20 = 박스 높이의 46%)를 탭하면 아무 일도 일어나지 않았습니다. `<label htmlFor>`를 그대로 두면 브라우저가 인풋으로 포커스를 넘겨 줍니다 — JS 위임 없이 해결됩니다. 실측으로 라벨 영역 탭 → 인풋 포커스를 확인했습니다.
- **메시지를 `aria-describedby`로 연결합니다.** `aria-invalid`만으로는 「무효」라는 사실만 전달되고 이유가 안 읽힙니다. 에러 메시지와 조건 체크리스트 둘 다 같은 `id`를 쓰고, 네 type 모두(`select`의 `<button>` 포함) 연결합니다. internal-ui가 `aria-invalid` + `aria-errormessage`를 짝으로 쓰는 것과 같은 방식입니다.
- **조건 충족 여부를 색으로만 표시하지 않습니다.** 아이콘이 충족·미충족 모두 `check-circle` 한 종류라 색만 다릅니다. `sr-only` 텍스트(`충족`/`미충족`)를 덧붙여 스크린리더와 색각 이상 사용자에게 전달합니다. 시각 표현은 Figma 그대로입니다.
- **`select`에 `aria-haspopup='dialog'`와 `aria-expanded`를 겁니다.** `aria-haspopup`은 "누르면 시트가 뜬다"까지만 알리고 열림 여부는 못 알립니다. `aria-expanded`를 채우려고 `isOpen`을 받되 **스타일에는 일절 쓰지 않습니다** — `isOpen`을 뺐던 근거가 "트리거의 시각 상태가 아니다"였고 `aria-expanded`는 시각이 아니라 시맨틱이라 그 판단과 어긋나지 않습니다. 안 넘기면 속성 자체가 안 붙습니다(`aria-haspopup`만 남음).

### 레이아웃 시프트

테두리가 굵어지는 게 `error`만이 아니라 **포커스할 때마다**(1px→2px)입니다. `border`를 쓰면 포커스마다 콘텐츠가 1px 밀립니다.

| 항목                     | `border`               | `inset-ring`        |
| ------------------------ | ---------------------- | ------------------- |
| 레이아웃 영향            | 있음 (콘텐츠 1px 이동) | 없음 (페인트만)     |
| Figma inside stroke 재현 | 안 됨 (패딩 19/20px)   | 됨 (패딩 18px 고정) |
| 높이 70px 유지           | 보정 필요              | 그대로              |

Figma는 inside stroke라 안쪽 여백이 두께와 무관하게 18px인데 CSS `border`는 19px/20px이 되어 값 자체도 어긋납니다. 패딩을 상태별로 보정하는 대안(`border-2` + `px-[17px] py-[11px]`)은 상태마다 패딩을 짝지어 관리해야 해서 택하지 않았습니다.

트레이드오프는 `forced-colors` 모드에서 box-shadow가 사라진다는 것 하나입니다. 모바일 WebView 타깃이라 감수합니다. biz-ui 첫 `inset-ring` 사용이고 `--shadow-20`(FloatingPill)과는 Tailwind가 `--tw-shadow` / `--tw-inset-ring-shadow`로 나눠 합성하므로 충돌하지 않습니다.

### 구현 중 걸린 것

- **`<button>`이 `text-align: center`를 물려줍니다.** `select`의 라벨이 가운데로 몰려 `text-left`를 명시했습니다.
- **루트에 `w-full`을 넣으면 소비자 `className`을 덮어씁니다.** 블록 레벨 flex 컨테이너라 부모 폭을 이미 채우므로 뺐습니다. `w-[300px]`을 줘도 안 먹던 원인입니다.

### 디자인 확인 필요

| 항목                | 내용                                                                                                       |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| 클리어 노출 조건    | `filled`에만 없습니다. 「편집 중에만」이 의도인지, 심볼 누락인지                                             |
| `verify` 확인 버튼  | `error`에서 비활성인 게 의도인지 (에러를 고치기 전엔 재검증 불가)                                            |

---

## TextArea

Figma 심볼 세트 `455:1131`. `454:1420`은 문서용 프레임입니다.

### Variant 축

`state` 7종만 있고 `type` 축이 없습니다. 상태가 「스타일 3종 × 값 유무」로 접히는 것은 InputField와 같습니다.

### 실측 스펙

| 항목        | TextArea              | InputField (대조)     |
| ----------- | --------------------- | --------------------- |
| height      | 150px (`height`로 변경 가능) | 70px           |
| padding     | `px-[14px] py-[10px]` | `px-[18px] py-[12px]` |
| 정렬        | `items-start`         | `items-center`        |
| radius      | 6px → `rounded-6`     | 동일                  |
| 테두리      | 정적 1px / 주목 2px   | 동일                  |
| 라벨        | **상단 14px 고정**    | 플로팅                |
| 라벨 색     | 상태만 따름 (`gray/600` 고정) | 포커스·값 유무로 `gray/500`↔`gray/600` |
| 안내문구    | **항상 노출** (`disabled` 제외) | 포커스일 때만        |
| 라벨 ↔ 값   | gap 0                 | gap 0 (20+26=46 밀착) |
| 트레일링    | 없음                  | `type`별 4종          |
| 박스 ↔ 하단 | gap 6px               | 동일                  |

**색 값 자체는 InputField와 동일합니다.** 테두리·배경·라벨·값 전부 같아 `INPUT_TEXT_STYLES` / `INPUT_BOX_STYLES`를 그대로 씁니다. 다만 라벨 색을 고르는 **조건**은 다릅니다 — TextArea는 항상 `ACTIVE`입니다.

### 구현 결정

- **높이는 `height` prop으로 열고 기본값이 Figma 값(150px)입니다 — 확인 완료.** 심볼이 하나뿐이라 가변 여부를 알 수 없었는데, 디자인 값을 기본으로 두고 소비처가 덮는 방식으로 확정했습니다. `className`은 루트(박스+메시지)에 걸려 박스 높이를 못 바꾸고, `h-[${'{'}n{'}'}px]`처럼 런타임 값으로 조립한 클래스는 Tailwind가 스캔하지 못하므로 **인라인 스타일**로 겁니다.
- **`resize-none`을 겁니다.** 사용자가 크기를 바꾸면 `height`와 어긋나고 모바일에선 리사이즈 핸들이 의미가 없습니다.
- **글자 수 카운터는 포커스이거나 에러일 때만 노출합니다** (Figma `focus`·`typing`·`error`). `filled`처럼 값만 있고 포커스가 없으면 감춥니다.
- **초과 입력은 네이티브 `maxLength`가 막습니다.** JS로 자르지 않습니다 — 타이핑·붙여넣기 모두 브라우저가 처리합니다. 다만 소비처가 `value`를 `maxLength`보다 길게 넣으면 카운터가 최대를 넘겨 표시됩니다.
- **라벨↔값 gap은 0으로 통일합니다 — 디자이너 확인 완료.** Figma `error` 심볼만 `gap-[6px]`이었는데, 그대로 두면 에러가 뜨는 순간 값이 6px 내려가 **레이아웃 시프트**가 생기고 InputField의 「라벨 20 + 값 26 = 46px」 계산도 깨집니다.
- **라벨 색이 상태만 따르고 포커스·값 유무를 안 탑니다.** `default`가 바뀌면서 라벨이 `gray/500`→`gray/600`이 되어, 활성 상태에서는 언제나 `gray/600`입니다. 그래서 `INPUT_LABEL_STATES`를 쓰지 않고 항상 `ACTIVE` 색을 씁니다 — 이 축은 이제 InputField 전용입니다.
- **안내문구를 항상 노출합니다.** `default`가 바뀌기 전에는 포커스일 때만 보였습니다. `disabled`에는 Figma에 안내문구가 없어 `placeholder`를 넘기지 않습니다.
- **`maxLength` 기본값은 5000입니다** (DOTOLI-128의 textarea 값).
- **`rows`를 노출하지 않습니다.** 높이를 `height`(px)로 받으므로 행 수로 크기를 정하는 API가 겹칩니다.

---

## 토큰 (DOTOLI-227)

Figma [Shadow](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=450-1139&m=dev) · [Corner Radius](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=450-1178&m=dev) 페이지가 정리되면서 [frontend.md](../frontend.md)에 「스케일 확정 후 일괄 추가」로 미뤄 뒀던 토큰을 넣었습니다.

| 토큰         | offset-y | blur | color                  |
| ------------ | -------- | ---- | ---------------------- |
| `shadow-4`   | 1        | 4    | `#333C51` 12%          |
| `shadow-8`   | 4        | 8    | `#333C51` 12%          |
| `shadow-12`  | 6        | 12   | `#333C51` 10%          |
| `shadow-20`  | 10       | 20   | `#333C51` 20%          |
| `shadow-24`  | 8        | **20** | `#333C51` 30%        |
| `shadow-30`  | 11       | 30   | `#333C51` 30%          |

radius는 `--radius-{4,6,8,10,12,16}` 6개입니다. Figma의 `999`는 Tailwind 기본 `rounded-full`이 이미 덮습니다.

- **숫자 네이밍을 씁니다.** internal-ui가 이미 `--shadow-in-{4,8,12,20,24,30}` · `--radius-in-{4,6,8,12,16,20,24}`로 같은 방식이고 Figma 변수명도 숫자입니다. 기존 `rounded-md`/`rounded-lg` 10곳을 `rounded-6`/`rounded-8`로 옮겼습니다.
- **Tailwind 기본 radius 네임스페이스를 초기화하지 않습니다.** `--radius-*: initial`은 `rounded-md`·`rounded-lg`뿐 아니라 **`rounded`·`rounded-t`·`rounded-tr`·`rounded-tl`·`rounded-l`·`rounded-r`까지 지웁니다.** Storybook에서 공존하는 internal-ui가 그것들을 쓰고 있어 회귀가 납니다(`rounded-none`·`rounded-full`은 정적 유틸이라 무사). internal-ui도 초기화 없이 덧붙이는 방식입니다.
- **문서 텍스트와 변수가 전부 일치했습니다.** 컬러·타이포 때와 달리 어긋난 곳이 없습니다.
- **`shadow-24`만 이름의 숫자와 blur가 다릅니다**(blur 20). 다른 값들과 실제로 구분되는 단계라 Figma 이름을 그대로 씁니다.

## 파일 구조

```
apps/biz-ui/src/components/Input/
├── InputField/
│   ├── InputField.tsx
│   ├── constants/index.ts       # 타입·아이콘·박스/라벨 위치 스타일
│   ├── types/index.ts
│   └── index.ts
├── TextArea/
│   ├── TextArea.tsx
│   ├── constants/index.ts       # 박스 치수 · 라벨/필드 스타일 · maxLength 5000
│   ├── types/index.ts
│   └── index.ts
├── shared/                      # 두 컴포넌트가 실제로 같이 쓰는 것만
│   ├── InputMessage.tsx
│   ├── constants/index.ts       # INPUT_STATES · LABEL_STATES · BOX/TEXT 스타일 · 메시지
│   ├── types/index.ts
│   ├── hooks/effects/useInitialInputFocusEffect.ts
│   ├── utils/resolveInputState.ts
│   └── index.ts                 # utils · hooks는 배럴에서 export 하지 않음 (내부 전용)
└── index.ts

apps/storybook/src/stories/biz-ui/
├── InputField.stories.tsx       # core/biz-ui/Input/InputField, 스토리 5종
└── TextArea.stories.tsx         # core/biz-ui/Input/TextArea, 스토리 2종
```

InputField 스토리는 `Default`(제어형) · `Types` · `States` · `PasswordConditions` · `Matrix`, TextArea는 `Default` · `States`입니다. `focus`·`typing`은 상태라 정적으로 깔 수 없어 `Default`에서 직접 올려봅니다.

**`States`와 `Matrix`가 다른 목록을 씁니다.** `filledDisabled`는 소비처가 주는 상태가 아니라 `disabled`에 값이 있는 경우일 뿐이라, 소비처 관점인 `States`에서는 뺐습니다. 다만 **비활성일 때의 값 색(`gray/500`)이 그 조합에서만 보이므로** Figma 문서 프레임 대조용인 `Matrix`에는 남겼습니다. TextArea는 `Matrix`가 없어 아예 빠집니다.
