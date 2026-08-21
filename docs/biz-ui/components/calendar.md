# Calendar 계열 구현 기록

`apps/biz-ui/src/components/Calendar` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 계열 고유 사실만 둡니다.

Figma: [CalendarDayButton 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=94-844&m=dev) (`94:844`). 한 섹션 안에 계열 4종이 함께 들어 있습니다.

| 프레임      | 이름                  | 노드       |
| ----------- | --------------------- | ---------- |
| 날짜 버튼   | `CalendarDayButton`   | `302:1168` (세트 `106:419`) |
| 고정 캘린더 | `StickyCalendar`      | `302:1676` (세트 `673:3072`) |
| 캘린더 바텀시트 | `CalendarBottomSheet` | `302:1712` (심볼 `205:4587`) |
| 연도 바텀시트 | `DateBottomSheet`   | `302:1997` (세트 `687:2505`) |

사용 예시(디자이너 제공):

| 노드        | 무엇                                                         |
| ----------- | ------------------------------------------------------------ |
| `485:2344`  | StickyCalendar — 요일만(`dayOnly`). 월 · 수가 선택된 상태     |
| `485:1210`  | StickyCalendar — 요일 + 날짜(`dayDate`)                       |
| `205:4115`  | 월 그리드 연속 스크롤(`dateOnly`)                             |
| `485:1818`  | 고정주문 변경 화면 — 단일 선택                                |
| `485:1516`  | 날짜 선택 바텀시트 — **범위 선택**(`start` · `middle` · `end`) |

## 구현 현황

| 컴포넌트            | 티켓       | 설명                                                        |
| ------------------- | ---------- | ----------------------------------------------------------- |
| `CalendarDayButton` | DOTOLI-271 | 계열의 잎. `type` 축을 `day` · `date` 유무로 파생. 48 × 48  |

**계열 폴더 `components/Calendar/`를 이 티켓이 엽니다.** 나머지 3종이 뒤따라 들어옵니다 — 셋 다 이 버튼을 물어 씁니다.

## Variant 축

| 축             | Figma 값                                        | 구현                              |
| -------------- | ----------------------------------------------- | --------------------------------- |
| `type`         | `dayOnly` · `dayDate` · `dateOnly`              | **`day` · `date` 유무로 흡수**    |
| `selectedType` | `none` · `selected` · `start` · `middle` · `end` | 그대로 prop                       |
| `disabled`     | `false` · `true`                                 | HTML 속성 그대로                  |
| `isHoliday`    | `false` · `true`                                 | 그대로 prop                       |

세트에 심볼이 **19개**뿐이라 4축의 전체 조합(3 × 5 × 2 × 2 = 60)이 다 그려져 있지 않습니다. 빠진 것은 아래 「그려지지 않은 조합」에 정리했습니다.

## 실측 스펙

| 항목   | 값                                                        |
| ------ | --------------------------------------------------------- |
| 크기   | 48 × 48 → `size-[48px]` (전 조합 동일)                     |
| 정렬   | `flex-v-stack-center`                                      |
| 두 줄 간격 | 요일 아래 **-2** → `mb-[-2px]` (`dayDate`에서만)        |

### 타이포 — 마지막 줄만 굵어집니다

| 조합           | 요일                | 날짜                |
| -------------- | ------------------- | ------------------- |
| `dayOnly`      | `body` (16 Medium)  | —                   |
| `dayDate`      | `label` (14 Medium) | `body` (16 Medium)  |
| `dateOnly`     | —                   | `body` (16 Medium)  |
| 선택됨          | `dayOnly`만 `body-bold` | `body-bold`     |

**`dayDate`에서 선택돼도 요일은 `label` Medium 그대로입니다** — 날짜만 Bold로 갑니다(`106:415`). 반면 `dayOnly`는 요일이 유일한 줄이라 그것이 Bold가 됩니다(`106:411`). 구현은 「**값 줄**(날짜, 없으면 요일)이 굵어진다」 한 규칙으로 둘을 함께 만족시킵니다.

### 배경 · 모서리

| `selectedType` | 배경         | 모서리         | 비고                          |
| -------------- | ------------ | -------------- | ----------------------------- |
| `none`         | 없음         | `rounded-6`    |                               |
| `selected`     | `blue/500`   | `rounded-6`    |                               |
| `start`        | `blue/500`   | `rounded-l-6`  | 오른쪽은 각짐                 |
| `middle`       | `blue/100`   | **없음**       | 각져야 띠가 이어짐            |
| `end`          | `blue/500`   | `rounded-r-6`  | 왼쪽은 각짐                   |

`middle`이 유일하게 `rounded`를 안 받습니다. 연속된 `middle`이 끊기지 않는 하나의 띠로 보여야 하기 때문이고, 실제 조합은 사용 예시 `485:1516`에 있습니다.

### 글자색

| 상태               | 색         | 조건                                        |
| ------------------ | ---------- | ------------------------------------------- |
| `default`          | `base/black` | 기본                                       |
| `holiday`          | `red/600`  | `isHoliday` · 미비활성                       |
| `disabled`         | `gray/400` | 비활성                                       |
| `disabledHoliday`  | `red/200`  | 비활성 + `isHoliday` — **`dateOnly`에서만**  |
| `selected`         | `base/white` | `selected` · `start` · `end`               |

바인딩된 hex가 전부 기존 토큰과 일치해 **신규 토큰이 없습니다** — `#101828` `black` · `#bd2222` `red-600` · `#aeb5c6` `gray-400` · `#f6aeae` `red-200` · `#3182f6` `blue-500` · `#ebf3ff` `blue-100` · `--radius-6`.

### 그려지지 않은 조합

| 빠진 것                            | 어떻게 했는가                                                     |
| ---------------------------------- | ----------------------------------------------------------------- |
| `dayOnly` · `dayDate` + 비활성 + 휴일 | 디자이너가 인스턴스 `485:2366`을 옆에 놓아 **`gray/400`**로 답했습니다(주석 `485:2365`). 그대로 따랐습니다 |
| `start` · `end` + 비활성            | 비활성 날짜는 범위의 끝점이 될 수 없어 도달하지 않습니다. `middle`은 비활성이 그려져 있습니다(`205:1713` · `205:2999`) |
| `start` · `middle` · `end` + `dayOnly` · `dayDate` | 범위 선택은 `dateOnly` 화면(`485:1516`)에만 있습니다. 타입으로 막지는 않았습니다 |

## 정책

섹션 안 주석 `524:11`이 **COM-009 휴일 판정 · 날짜 표기**를 정의합니다.

> **`isHoliday` 판정** — 토요일 · 일요일 · 한국 법정 공휴일. **판정 데이터는 서버에서 제공한다. 앱이 자체 판정하지 않는다.**
> 의도 — 고정주문의 공휴일 자동 생성 제외 정책이 서버 판정을 전제로 하므로, 화면 표기도 동일 데이터를 사용해야 어긋나지 않는다.
>
> **`disabled` 판정** — 과거 날짜 · 주문 마감(사용일 D-2 영업일 18:00) 경과일 · 주문 중지 기간 · 1년(365일) 초과 미래
>
> **주차 표기** — 해당 월 1일이 속한 주를 1주차로 한다. 표기는 `N월 N주`

## 결정

- **`type` 축을 `day` · `date` 유무로 흡수했습니다.** 세 값이 「무엇을 렌더하는가」와 정확히 1:1이라 축이 하나입니다 — `type='dayDate'`인데 `date`가 없으면 성립하지 않고, `date`를 주고 `type`을 안 바꾸면 조용히 무시됩니다. [`ConfirmModal`](./confirm-modal.md)의 `btn` → `cancel`, [`BottomActionBar`](./bottom-action-bar.md)의 `actions` → `cancel` · `info`와 같은 기준입니다.

  **`day`·`date` 중 하나는 있어야 합니다.** 「정확히 하나 이상」을 유니온 타입으로 강제해 봤다가 **되돌렸습니다** — `Meta<CalendarDayButtonProps>`가 유니온이 되면서 Storybook `render`의 인자 추론이 깨졌습니다(`ArgsStoryFn`이 유니온으로 갈라짐). DS 소비자가 `<CalendarDayButton date={5} />`처럼 쓸 때는 문제가 없지만 **props 타입 위에 제네릭을 얹는 쪽이 전부 같은 마찰을 받습니다.** CLAUDE.md의 「`type`은 `interface`로 표현할 수 없을 때만」 기준에서 값이 안 나와 단일 `interface` + 문서 계약으로 갔습니다.

- **`isHoliday`를 DS가 계산하지 않습니다.** COM-009가 「앱이 자체 판정하지 않는다」로 못박았고, 요일에서 토·일을 유추하는 것도 **법정 공휴일을 놓치므로 반쪽짜리**입니다. 서버 판정 결과를 그대로 받는 `boolean` prop 하나로 둡니다. `disabled`도 같습니다 — 마감 시각 · 주문 중지 기간은 DS가 알 수 없습니다.

- **`disabled`가 `isHoliday`를 이기지만 `dateOnly`만 예외입니다.** `dateOnly` 비활성 휴일은 `red/200`이라 **빨강 계열을 유지**하고, `dayOnly` · `dayDate`는 `gray/400`으로 **빨강이 사라집니다.** 같은 축 조합인데 타입에 따라 규칙이 갈리는 것이라 아래 「디자인 확인 필요」에 올렸습니다. 자매 DS `@bbodek/internal-ui`는 `HOLIDAY_DISABLED`를 **타입 구분 없이 하나**로 갖고 있어 그쪽과도 갈립니다.

- **선택 상태는 `isHoliday`를 무시합니다.** 주석 3개(`485:2364` · `485:2370` · `485:2371`)가 「Selected / start / end 는 휴일 상관없이 동일하게 ui 노출」로 명시합니다. `middle`은 여기 포함되지 않아 휴일 색이 살아 있습니다(`205:1711`).

- **상태를 CSS variant가 아니라 JS로 풉니다.** `resolveCalendarDayButtonState`가 상태 키 하나를 돌려주고 `Record<State, ColorVariants>`에서 색을 고릅니다 — CLAUDE.md 「폼 컨트롤 공통 2」의 `resolveInputState` 선례이고, 4축이 겹치는 이 컴포넌트에서 특히 값이 큽니다.

- **`role='gridcell'`을 붙이지 않고 `aria-pressed`를 씁니다.** internal-ui `CalendarDay`는 `role='gridcell'` + `aria-selected`인데, **`gridcell`은 조상에 `role='grid'` · `row`가 있어야 성립합니다.** 이 버튼은 잎이고 격자를 만드는 것은 아직 없는 StickyCalendar · CalendarBottomSheet라, 보장할 수 없는 조상을 전제하는 대신 **버튼 단독으로 유효한 `aria-pressed`**를 씁니다. 격자 시맨틱은 계열의 다음 티켓이 자기 층에서 얹습니다.

  `middle`도 `aria-pressed=true`입니다 — 범위 안에 들어온 날이라 선택의 일부입니다.

- **히트 영역을 확장하지 않았습니다.** 48 × 48이라 WCAG 2.5.8(24 × 24)을 크게 넘고 Figma 주석도 없습니다 — CLAUDE.md 「히트 영역 확장」의 두 조건 어디에도 안 걸립니다.

- **`transition-colors`를 겁니다.** 선택 · 해제가 색으로만 바뀌므로 CLAUDE.md 「폼 컨트롤 공통 8」을 따랐습니다.

- **크기를 `size-[48px]`로 고정했습니다.** 380 폭에서 7열이면 `48 × 7 = 336`이라 좌우 20 여백(340)에 들어맞습니다. 열을 늘려야 하는 화면이 나오면 `className`으로 덮습니다 — 계열의 다음 티켓이 판단할 자리입니다.

## API

| prop           | 필수 | 기본값     | 비고                                                    |
| -------------- | ---- | ---------- | ------------------------------------------------------- |
| `day`          | △    | —          | 요일 문자열. `date`와 **둘 중 하나는 필수**              |
| `date`         | △    | —          | 날짜 숫자. `day`와 함께 주면 두 줄(`dayDate`)            |
| `selectedType` |      | `'none'`   | `'none'` · `'selected'` · `'start'` · `'middle'` · `'end'` |
| `isHoliday`    |      | `false`    | **서버 판정 결과**를 그대로 받습니다 (COM-009)          |
| `disabled`     |      | `false`    | 마감 · 중지 기간 등. 판정은 소비 앱                      |
| `onClick`      |      | —          |                                                          |
| `className`    |      | —          | 버튼에 적용                                              |

```tsx
// dayOnly — 요일 선택 (StickyCalendar)
<CalendarDayButton day='월' selectedType='selected' onClick={select} />

// dayDate — 요일 + 날짜
<CalendarDayButton day='화' date={30} onClick={select} />

// dateOnly — 월 그리드
<CalendarDayButton date={3} isHoliday onClick={select} />

// 범위 — start · middle · end를 붙여 놓으면 띠가 이어집니다
<CalendarDayButton date={13} selectedType='start' onClick={select} />
<CalendarDayButton date={14} selectedType='middle' onClick={select} />
<CalendarDayButton date={15} selectedType='end' onClick={select} />
```

## 디자인 확인 필요

| 항목                        | 내용                                                                                                                        |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 비활성 + 휴일이 타입마다 다름 | `dateOnly`는 `red/200`(빨강 유지), `dayOnly`·`dayDate`는 `gray/400`(빨강 사라짐)입니다. 의도인지 — internal-ui는 하나로 묶여 있습니다 |
| 선택 상태의 비활성          | `selected` · `start` · `end`에 비활성 심볼이 없습니다. 도달할 수 없는 조합이 맞는지                                            |
| `dayOnly`·`dayDate`의 범위  | `start` · `middle` · `end` 심볼이 `dateOnly`에만 있습니다. 요일 범위 선택이 생길 수 있는지                                     |
| 상호작용                    | `hover` · `pressed` 정의가 없습니다. 터치 타깃이라 `pressed`가 주력인데 눌린 피드백이 없습니다                                  |
| 포커스 링                   | 정의가 없습니다 — 계열 전체가 같은 상태입니다 (CLAUDE.md 「폼 컨트롤 공통 7」)                                                  |
| 오늘 날짜                   | `today` 표기가 축에 없습니다. internal-ui에는 `TODAY` variant가 있습니다                                                       |

## Storybook

`apps/storybook/src/stories/biz-ui/CalendarDayButton.stories.tsx`, `meta.title`은 `core/biz-ui/CalendarDayButton`.

| 스토리    | 보는 것                                                                 |
| --------- | ----------------------------------------------------------------------- |
| `Default` | 컨트롤로 4축을 직접 조합                                                 |
| `Types`   | `day` · `date` 유무가 만드는 세 모양 × (`none` · `selected`)             |
| `States`  | `selectedType` 5행 × (비활성 · 휴일) 4열. **비활성 + 휴일이 타입마다 갈리는 자리** |
| `Range`   | 7일을 붙여 놓고 **`start`~`end` 띠가 끊기지 않는지** — `middle`만 각진 이유 |
