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
| `485:2344`  | 요일만 고른 줄(`CalendarDayButton` `dayOnly`). 월 · 수가 선택된 상태 |
| `485:1210`  | 요일 + 날짜 줄(`CalendarDayButton` `dayDate`)                 |
| `205:4115`  | 월 그리드 연속 스크롤(`dateOnly`)                             |
| `485:1818`  | 고정주문 변경 화면 — 단일 선택                                |
| `485:1516`  | 날짜 선택 바텀시트 — **범위 선택**(`start` · `middle` · `end`) |

## 구현 현황

| 컴포넌트            | 티켓       | 설명                                                        |
| ------------------- | ---------- | ----------------------------------------------------------- |
| `CalendarDayButton` | DOTOLI-271 | 계열의 잎. `type` 축을 `day` · `date` 유무로 파생. 48 × 48  |
| `StickyCalendar`    | DOTOLI-272 | 격자 위에 붙는 머리. 연도 이동 + 요일 헤더. `CalendarDayButton`을 **쓰지 않음** |
| `Calendar`          | DOTOLI-273 | 월 격자. `CalendarDayButton`을 깔고 **날짜 계산을 소유**. `dayjs` 도입 |

**계열 폴더 `components/Calendar/`를 DOTOLI-271이 열었고, 계열 공통 `Calendar/shared/`를 DOTOLI-273이 열었습니다.** `CalendarBottomSheet`(DOTOLI-274) · `DateBottomSheet`(DOTOLI-275)가 남아 있고, 둘은 [`BottomSheet`](./bottom-sheet.md) 위에 위 셋을 얹습니다.

`Calendar/shared/`에는 **계열 안에서 두 번 이상 쓰이는 것만** 둡니다. 지금은 연도 2자리 표기(`formatCalendarYear` — `StickyCalendar`의 `26년`과 `Calendar`의 `26년 6월`이 함께 씁니다)와 날짜 포맷 · 요일 수 상수입니다. CLAUDE.md 「코드 규칙 1」의 표대로 `<Group>/shared/`라 **공개**입니다.

## 정책

섹션 안 주석 `524:11`이 **COM-009 휴일 판정 · 날짜 표기**를 정의합니다. **계열 전체에 걸립니다.**

> **`isHoliday` 판정** — 토요일 · 일요일 · 한국 법정 공휴일. **판정 데이터는 서버에서 제공한다. 앱이 자체 판정하지 않는다.**
> 의도 — 고정주문의 공휴일 자동 생성 제외 정책이 서버 판정을 전제로 하므로, 화면 표기도 동일 데이터를 사용해야 어긋나지 않는다.
>
> **`disabled` 판정** — 과거 날짜 · 주문 마감(사용일 D-2 영업일 18:00) 경과일 · 주문 중지 기간 · 1년(365일) 초과 미래
>
> **주차 표기** — 해당 월 1일이 속한 주를 1주차로 한다. 표기는 `N월 N주`

---

## CalendarDayButton

### Variant 축

| 축             | Figma 값                                        | 구현                              |
| -------------- | ----------------------------------------------- | --------------------------------- |
| `type`         | `dayOnly` · `dayDate` · `dateOnly`              | **`day` · `date` 유무로 흡수**    |
| `selectedType` | `none` · `selected` · `start` · `middle` · `end` | 그대로 prop                       |
| `disabled`     | `false` · `true`                                 | HTML 속성 그대로                  |
| `isHoliday`    | `false` · `true`                                 | 그대로 prop                       |

세트에 심볼이 **19개**뿐이라 4축의 전체 조합(3 × 5 × 2 × 2 = 60)이 다 그려져 있지 않습니다. 빠진 것은 아래 「그려지지 않은 조합」에 정리했습니다.

### 실측 스펙

| 항목   | 값                                                        |
| ------ | --------------------------------------------------------- |
| 크기   | 48 × 48 → `size-[48px]` (전 조합 동일)                     |
| 정렬   | `flex-v-stack-center`                                      |
| 두 줄 간격 | 요일 아래 **-2** → `mb-[-2px]` (`dayDate`에서만)        |

#### 타이포 — 마지막 줄만 굵어집니다

| 조합           | 요일                | 날짜                |
| -------------- | ------------------- | ------------------- |
| `dayOnly`      | `body` (16 Medium)  | —                   |
| `dayDate`      | `label` (14 Medium) | `body` (16 Medium)  |
| `dateOnly`     | —                   | `body` (16 Medium)  |
| 선택됨          | `dayOnly`만 `body-bold` | `body-bold`     |

**`dayDate`에서 선택돼도 요일은 `label` Medium 그대로입니다** — 날짜만 Bold로 갑니다(`106:415`). 반면 `dayOnly`는 요일이 유일한 줄이라 그것이 Bold가 됩니다(`106:411`). 구현은 「**값 줄**(날짜, 없으면 요일)이 굵어진다」 한 규칙으로 둘을 함께 만족시킵니다.

#### 배경 · 모서리

| `selectedType` | 배경         | 모서리         | 비고                          |
| -------------- | ------------ | -------------- | ----------------------------- |
| `none`         | 없음         | `rounded-6`    |                               |
| `selected`     | `blue/500`   | `rounded-6`    |                               |
| `start`        | `blue/500`   | `rounded-l-6`  | 오른쪽은 각짐                 |
| `middle`       | `blue/100`   | **없음**       | 각져야 띠가 이어짐            |
| `end`          | `blue/500`   | `rounded-r-6`  | 왼쪽은 각짐                   |

`middle`이 유일하게 `rounded`를 안 받습니다. 연속된 `middle`이 끊기지 않는 하나의 띠로 보여야 하기 때문이고, 실제 조합은 사용 예시 `485:1516`에 있습니다.

#### 글자색

| 상태               | 색         | 조건                                        |
| ------------------ | ---------- | ------------------------------------------- |
| `default`          | `base/black` | 기본                                       |
| `holiday`          | `red/600`  | `isHoliday` · 미비활성                       |
| `disabled`         | `gray/400` | 비활성                                       |
| `disabledHoliday`  | `red/200`  | 비활성 + `isHoliday` — **`dateOnly`에서만**  |
| `selected`         | `base/white` | `selected` · `start` · `end`               |

바인딩된 hex가 전부 기존 토큰과 일치해 **신규 토큰이 없습니다** — `#101828` `black` · `#bd2222` `red-600` · `#aeb5c6` `gray-400` · `#f6aeae` `red-200` · `#3182f6` `blue-500` · `#ebf3ff` `blue-100` · `--radius-6`.

#### 그려지지 않은 조합

| 빠진 것                            | 어떻게 했는가                                                     |
| ---------------------------------- | ----------------------------------------------------------------- |
| `dayOnly` · `dayDate` + 비활성 + 휴일 | 디자이너가 인스턴스 `485:2366`을 옆에 놓아 **`gray/400`**로 답했습니다(주석 `485:2365`). 그대로 따랐습니다 |
| `start` · `end` + 비활성            | 비활성 날짜는 범위의 끝점이 될 수 없어 도달하지 않습니다. `middle`은 비활성이 그려져 있습니다(`205:1713` · `205:2999`) |
| `start` · `middle` · `end` + `dayOnly` · `dayDate` | 범위 선택은 `dateOnly` 화면(`485:1516`)에만 있습니다. 타입으로 막지는 않았습니다 |

### 결정

- **`type` 축을 `day` · `date` 유무로 흡수했습니다.** 세 값이 「무엇을 렌더하는가」와 정확히 1:1이라 축이 하나입니다 — `type='dayDate'`인데 `date`가 없으면 성립하지 않고, `date`를 주고 `type`을 안 바꾸면 조용히 무시됩니다. [`ConfirmModal`](./confirm-modal.md)의 `btn` → `cancel`, [`BottomActionBar`](./bottom-action-bar.md)의 `actions` → `cancel` · `info`와 같은 기준입니다.

  **`day`·`date` 중 하나는 있어야 합니다.** 「하나 이상」을 유니온 타입으로 강제해 봤다가 **되돌렸습니다** — `Meta<CalendarDayButtonProps>`가 유니온이 되면서 Storybook `render`의 인자 추론이 깨졌습니다(`ArgsStoryFn`이 유니온으로 갈라짐). DS 소비자가 `<CalendarDayButton date={5} />`처럼 쓸 때는 문제가 없지만 **props 타입 위에 제네릭을 얹는 쪽이 전부 같은 마찰을 받습니다.** CLAUDE.md의 「`type`은 `interface`로 표현할 수 없을 때만」 기준에서 값이 안 나와 단일 `interface` + 문서 계약으로 갔습니다.

- **`CalendarDayButton`은 `isHoliday`를 계산하지 않습니다.** 이 컴포넌트는 `date` 숫자만 알고 연·월을 모르므로 요일조차 알 수 없습니다. 받은 `boolean`을 그대로 그립니다. `disabled`도 같습니다 — 마감 시각 · 주문 중지 기간은 DS가 알 수 없습니다. **토·일을 요일에서 판정하는 것은 연·월을 아는 [`Calendar`](#calendar)가 맡습니다**(DOTOLI-273 「결정」).

- **`disabled`가 `isHoliday`를 이기지만 `dateOnly`만 예외입니다.** `dateOnly` 비활성 휴일은 `red/200`이라 **빨강 계열을 유지**하고, `dayOnly` · `dayDate`는 `gray/400`으로 **빨강이 사라집니다.** 같은 축 조합인데 타입에 따라 규칙이 갈리는 것이라 아래 「디자인 확인 필요」에 올렸습니다. 자매 DS `@bbodek/internal-ui`는 `HOLIDAY_DISABLED`를 **타입 구분 없이 하나**로 갖고 있어 그쪽과도 갈립니다.

- **선택 상태는 `isHoliday`를 무시합니다.** 주석 3개(`485:2364` · `485:2370` · `485:2371`)가 「Selected / start / end 는 휴일 상관없이 동일하게 ui 노출」로 명시합니다. `middle`은 여기 포함되지 않아 휴일 색이 살아 있습니다(`205:1711`).

- **상태를 CSS variant가 아니라 JS로 풉니다.** `resolveCalendarDayButtonState`가 상태 키 하나를 돌려주고 `Record<State, ColorVariants>`에서 색을 고릅니다 — CLAUDE.md 「폼 컨트롤 공통 2」의 `resolveInputState` 선례이고, 4축이 겹치는 이 컴포넌트에서 특히 값이 큽니다.

- **`role='gridcell'`을 붙이지 않고 `aria-pressed`를 씁니다.** internal-ui `CalendarDay`는 `role='gridcell'` + `aria-selected`인데, **`gridcell`은 조상에 `role='grid'` · `row`가 있어야 성립합니다.** 이 버튼은 잎이고 격자를 만드는 것은 아직 없는 `CalendarBottomSheet`라, 보장할 수 없는 조상을 전제하는 대신 **버튼 단독으로 유효한 `aria-pressed`**를 씁니다. 격자 시맨틱은 계열의 다음 티켓이 자기 층에서 얹습니다.

  `middle`도 `aria-pressed=true`입니다 — 범위 안에 들어온 날이라 선택의 일부입니다.

- **히트 영역을 확장하지 않았습니다.** 48 × 48이라 WCAG 2.5.8(24 × 24)을 크게 넘고 Figma 주석도 없습니다 — CLAUDE.md 「히트 영역 확장」의 두 조건 어디에도 안 걸립니다.

- **`transition-colors`를 겁니다.** 선택 · 해제가 색으로만 바뀌므로 CLAUDE.md 「폼 컨트롤 공통 8」을 따랐습니다.

- **크기를 `size-[48px]`로 고정했습니다.** 380 폭에서 7열이면 `48 × 7 = 336`이라 좌우 20 여백(340)에 들어맞습니다. [`StickyCalendar`](#stickycalendar)의 요일 셀도 같은 48이라 열이 맞습니다.

### API

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
// dayOnly — 요일 선택
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

### 디자인 확인 필요

| 항목                        | 내용                                                                                                                        |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 비활성 + 휴일이 타입마다 다름 | `dateOnly`는 `red/200`(빨강 유지), `dayOnly`·`dayDate`는 `gray/400`(빨강 사라짐)입니다. 의도인지 — internal-ui는 하나로 묶여 있습니다 |
| 선택 상태의 비활성          | `selected` · `start` · `end`에 비활성 심볼이 없습니다. 도달할 수 없는 조합이 맞는지                                            |
| `dayOnly`·`dayDate`의 범위  | `start` · `middle` · `end` 심볼이 `dateOnly`에만 있습니다. 요일 범위 선택이 생길 수 있는지                                     |
| 상호작용                    | `hover` · `pressed` 정의가 없습니다. 터치 타깃이라 `pressed`가 주력인데 눌린 피드백이 없습니다                                  |
| 포커스 링                   | 정의가 없습니다 — 계열 전체가 같은 상태입니다 (CLAUDE.md 「폼 컨트롤 공통 7」)                                                  |
| 오늘 날짜                   | `today` 표기가 축에 없습니다. internal-ui에는 `TODAY` variant가 있습니다                                                       |

### Storybook

`apps/storybook/src/stories/biz-ui/CalendarDayButton.stories.tsx`, `meta.title`은 `core/biz-ui/CalendarDayButton`.

| 스토리    | 보는 것                                                                 |
| --------- | ----------------------------------------------------------------------- |
| `Default` | 컨트롤로 4축을 직접 조합                                                 |
| `Types`   | `day` · `date` 유무가 만드는 세 모양 × (`none` · `selected`)             |
| `States`  | `selectedType` 5행 × (비활성 · 휴일) 4열. **비활성 + 휴일이 타입마다 갈리는 자리** |
| `Range`   | 7일을 붙여 놓고 **`start`~`end` 띠가 끊기지 않는지** — `middle`만 각진 이유 |

---

## StickyCalendar

**이름과 달리 캘린더 격자가 아니라 격자 위에 붙는 머리입니다.** 연도 이동 줄과 요일 헤더 줄로만 이루어져 있고 **`CalendarDayButton`을 쓰지 않습니다.** 날짜 격자는 `CalendarBottomSheet` 쪽이 만듭니다.

### Variant 축

| 축              | Figma 값             | 구현                                |
| --------------- | -------------------- | ----------------------------------- |
| `useDateSelect` | `true`(기본) · `false` | **`dateSelectOption` 유무로 흡수** |
| `useWeekday`    | `true`(기본) · `false` | 그대로 prop                        |

심볼이 **3개**입니다 — 둘 다 `false`인 조합은 그려져 있지 않습니다(빈 바가 됨).

| 심볼        | 조합                                | 높이 |
| ----------- | ----------------------------------- | ---- |
| `673:3071`  | `useDateSelect` · `useWeekday`      | 82   |
| `693:3198`  | `useDateSelect`만                    | 54   |
| `693:3136`  | `useWeekday`만                       | 36   |

### 실측 스펙

| 항목      | 값                                                                    |
| --------- | --------------------------------------------------------------------- |
| 바        | `w-full` · `bg-white` · `px-[20px] pt-[6px] pb-[10px]` · `gap-[8px]`  |
| 위치      | 주석 `337:3561` 「\*영역 내 상단에 Sticky」 → `sticky top-0 z-10`      |
| 연도 줄   | `w-full` · `justify-between` · `px-[10px] py-[6px]`                    |
| 요일 줄   | 셀 `w-[48px]` 7개 · **gap 없음**                                       |
| 요일 글자 | `label-bold` · 일 · 토 `red/400` · 월~금 `gray/600`                    |

**높이를 고정하지 않습니다.** 세 심볼의 82 · 54 · 36이 전부 자연 높이로 설명됩니다 — `6 + 38.1 + 8 + 20.3 + 10 = 82.4`, `6 + 38.1 + 10 = 54.1`, `6 + 20.3 + 10 = 36.3`.

요일 셀이 **48**이라 [`CalendarDayButton`](#calendardaybutton)과 열 폭이 같습니다. `48 × 7 = 336`이 좌우 20 여백(340)에 들어갑니다.

#### 세 버튼이 전부 `CtaButton` `variant='text'` `theme='gray'`입니다

| 버튼   | Figma                                                | `CtaButton`                          |
| ------ | ---------------------------------------------------- | ------------------------------------ |
| 작년   | `rounded 6` · 14 Bold `gray/800` · gap 2 · caret 14 왼쪽   | `size='sm'` `iconPosition='left'`   |
| `26년` | `rounded 8` · 18 Bold `gray/800` · gap 4 · caret 18 오른쪽 | `size='lg'` `iconPosition='right'`  |
| 내년   | `rounded 6` · 14 Bold `gray/800` · gap 2 · caret 14 오른쪽 | `size='sm'` `iconPosition='right'`  |

`CTA_BUTTON_TEXT_SIZE_STYLES`의 `sm`(`rounded-6` · `label-bold`) · `lg`(`rounded-8` · `heading-5`)와 **네 값이 전부 맞습니다.** gap도 `CTA_BUTTON_GAP_STYLES.text`의 `sm`=`gap-0.5`(2) · `lg`=`gap-1`(4)와 일치합니다.

**아이콘 크기를 지정하지 않았는데 14 · 18이 맞습니다.** `ButtonIcon`이 Phosphor 아이콘 폰트라 글리프가 `font-size`를 따르고, 버튼이 이미 사이즈별 타이포 토큰(14 · 18)을 물고 있어서입니다.

`variant='text'`는 높이 · 좌우 패딩이 없고 `TOUCH_TARGET_STYLE`(6px)이 자동으로 붙습니다 — 작년 · 내년이 확장 후 약 56 × 32로 WCAG 2.5.8을 넘습니다. `justify-between` 줄이라 이웃과 겹칠 여지도 없습니다.

### 결정

- **`useDateSelect` 축을 `dateSelectOption` 유무로 흡수했습니다.** 연도 값과 핸들러 3개가 축과 항상 같이 움직입니다 — [`HeaderBar`](./header-bar.md)의 `progressOption`이 정확히 같은 모양이고, 그쪽도 `{isNavigation && !!progressOption && <HeaderBarProgress {...progressOption} />}`로 씁니다.

- **`useWeekday`는 흡수하지 않았습니다.** **딸린 데이터가 없어서** 흡수할 대상이 없습니다 — 요일 7개는 고정 상수입니다. 이름은 Figma 축 그대로이고 CLAUDE.md의 「`use`(기능 on/off)」 규칙과도 맞습니다. 같은 컴포넌트에서 한 축은 흡수하고 한 축은 prop으로 두는 것이 비대칭으로 보이지만, **기준은 「값이 함께 움직이는가」 하나**라 갈리는 게 맞습니다.

- **`shrink-0`이 `sticky`와 한 짝입니다.** 붙는 자리가 **컬럼 flex 스크롤 컨테이너**인데(`scroll-y flex-v-stack`, [`BottomSheet`](./bottom-sheet.md)의 바디가 정확히 그 모양입니다) 콘텐츠가 컨테이너 높이를 넘기는 순간 flex가 자식들을 줄입니다. 기본값 `flex-shrink: 1`이면 **바가 82 → 16으로 찌그러진 채 상단에 붙어 있어** 붙긴 붙었는데 아무것도 안 보입니다. `position`을 고쳐도 안 풀리고 `shrink-0`이라야 풀립니다 — [`IconCircle`](./icon-circle.md)이 같은 이유로 `shrink-0`을 단 선례이고, 거기와 달리 **여기는 스크롤이 생겨야만 드러나서** 한 달치 격자만 깐 스토리에서는 보이지 않았습니다.

- **`sticky top-0`에 `z-10`을 함께 겁니다.** [`BottomActionBar`](./bottom-action-bar.md)의 `floating`은 스크롤 영역의 **마지막** 자식이라 쌓임 순서로 이미 위였는데, 이쪽은 **첫 자식**이라 뒤따르는 날짜 격자가 그냥 덮습니다. `position: sticky`만으로는 stacking context가 생기지 않아 `z-index`가 필요합니다.

- **연도를 2자리로 줄여 표기합니다.** Figma가 `26년`이고 `formatStickyCalendarYear`가 `year % 100`을 2자리로 채웁니다. **소비자가 완성된 문자열을 넘기게 하지 않았습니다** — 연도는 `onPrevYear` · `onNextYear`로 이 컴포넌트가 움직이는 값이라 표기까지 여기서 책임지는 것이 맞습니다.

- **요일 글자색이 `red/400`이라 휴일색과 다릅니다.** `CalendarDayButton`의 휴일은 `red/600`인데 여기 일 · 토는 `red/400`으로 한 단계 옅습니다. 헤더는 「이 열이 주말」이라는 표시일 뿐 실제 휴일 판정(COM-009)과 무관해서로 보이지만, 값이 갈리는 지점이라 「디자인 확인 필요」에 올렸습니다.

- **`gap`을 조건 없이 겁니다.** 줄이 하나면 gap이 렌더에 드러나지 않습니다 — `ConfirmModal` · `BottomActionBar`와 같은 판단입니다. Figma codegen은 조합마다 gap을 껐다 켜지만 결과가 같습니다.

- **요일 줄에 표 시맨틱을 넣지 않았습니다.** `<th scope='col'>`이 맞으려면 날짜 격자까지 한 `<table>` 안에 있어야 하는데 **격자를 만드는 것은 이 컴포넌트가 아닙니다.** `CalendarDayButton`에서 `role='gridcell'`을 미룬 것과 같은 이유이고, 둘을 함께 감싸는 `CalendarBottomSheet` 티켓이 판단할 자리입니다.

- **폴더는 계열 안입니다.** `components/Calendar/StickyCalendar/`. 연도 줄은 서브 컴포넌트(`StickyCalendarDateSelect`)로 갈랐습니다 — `HeaderBar`가 `HeaderBarProgress` · `HeaderBarHomeTitle`로 가른 것과 같은 층입니다.

### API

| prop               | 필수 | 기본값 | 비고                                                     |
| ------------------ | ---- | ------ | -------------------------------------------------------- |
| `dateSelectOption` |      | —      | `{ year, onPrevYear, onNextYear, onYearClick }`. 주면 연도 줄이 생김 |
| `useWeekday`       |      | `true` | 요일 헤더 줄                                              |
| `className`        |      | —      | 바에 적용                                                 |

```tsx
// 연도 이동 + 요일 헤더
<StickyCalendar
  dateSelectOption={{ year, onPrevYear, onNextYear, onYearClick: openYearSheet }}
  useWeekday
/>

// 요일 헤더만 — 연도가 필요 없는 화면
<StickyCalendar useWeekday />

// 스크롤 영역의 첫 자식으로 두면 상단에 붙습니다
<div className='scroll-y'>
  <StickyCalendar dateSelectOption={dateSelectOption} useWeekday />
  <MonthGrid />
</div>
```

### 디자인 확인 필요

| 항목             | 내용                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| 요일색 ↔ 휴일색  | 헤더 일 · 토는 `red/400`, `CalendarDayButton`의 휴일은 `red/600`입니다. 한 단계 차이가 의도인지                |
| 주 시작 요일     | 일요일 시작으로 고정했습니다. 월요일 시작이 필요한 화면이 생길 수 있는지                                      |
| 둘 다 `false`    | 심볼이 없습니다. 구현은 빈 바(높이 16)가 렌더됩니다 — 막아야 하는지                                            |
| 연도 표기 자릿수 | `26년`이라 2자리로 줄였습니다. 2100년이 `00년`이 되는데 서비스 수명상 무시해도 되는지                          |
| 연도 이동 한계   | COM-009가 「1년(365일) 초과 미래」를 비활성으로 규정하는데 **작년 · 내년 버튼에는 비활성 상태가 없습니다.** 끝에 닿으면 어떻게 보일지 |
| 상호작용         | `hover` · `pressed`는 `CtaButton`이 갖고 있고, 바 자체의 그림자 · 경계는 정의가 없습니다 (스크롤 시 격자와 맞닿음) |

### Storybook

`apps/storybook/src/stories/biz-ui/StickyCalendar.stories.tsx`, `meta.title`은 `core/biz-ui/StickyCalendar`.

| 스토리         | 보는 것                                                              |
| -------------- | -------------------------------------------------------------------- |
| `Default`      | 컨트롤로 `useWeekday`를 끄고 켠다. 작년 · 내년이 실제로 연도를 바꾼다  |
| `Combinations` | 그려져 있는 세 조합                                                   |
| `Sticky`       | 밑에 **실제 `Calendar`를 3개월치** 깔고 **바가 상단에 붙어 있는지** — `sticky` · `z-10` · `shrink-0`이 드러나는 유일한 자리. 한 달치로는 420px 컨테이너를 못 넘겨 스크롤 자체가 안 생깁니다. DOTOLI-273 전에는 손으로 그린 격자였고 273에서 실물로 바꿨습니다 |

---

## Calendar

월 격자입니다. Figma에서는 `CalendarBottomSheet`(`205:4587`) 안의 인스턴스 `205:4148`로만 등장하고 독립 프레임이 없습니다 — **컴포넌트 세트가 아니라 조립된 인스턴스**라 variant 축이 없습니다.

### 실측 스펙

| 항목          | 값                                                                |
| ------------- | ----------------------------------------------------------------- |
| 월 블록       | `pt-[8px]` · `items-start` · 블록 사이 `gap-[14px]`                |
| 월 라벨       | `heading-5` (18 Bold / ls -1%) · `gray/800`                        |
| 주 행         | `gap-[2px]`                                                        |
| 열            | `CalendarDayButton` 48 × 7 = **336** (열 간격 0)                   |
| 빈 칸         | 앞 달 · 뒷 달 날짜를 그리지 않고 **48 × 48 빈 박스**               |

`282 = 8 + 26 + 248`이고 `248 = 48 × 5 + 2 × 4`입니다(2026년 6월 = 5주). 월 블록 사이는 `296 - 282 = 14`입니다.

**주 수를 고정하지 않습니다.** internal-ui는 42칸(6주 × 7) 고정 배열에 `null`을 채우는데, Figma 6월 격자는 **5주(248)**라 6주를 그리면 빈 줄이 하나 더 생깁니다. 그 달에 필요한 만큼만 만듭니다.

### 결정

- **`dayjs`를 dependency로 추가했습니다.** 대안 세 가지를 비교했습니다.

  | 안              | 문제                                                                             |
  | --------------- | -------------------------------------------------------------------------------- |
  | `@bbodek/utils` | 그 패키지가 `@bbodek/internal-ui`를 dependency로 갖고 있어 **어드민 DS가 통째로 딸려옵니다** ([frontend.md](../frontend.md) 첫 항목) |
  | native `Date`   | 가능은 합니다 — 필요한 건 `getDay()` · 말일 둘뿐입니다. 다만 계열이 커질 때 포맷 · 비교가 손으로 쌓입니다 |
  | **`dayjs` 직접** | 선택. internal-ui도 결국 같은 라이브러리를 쓰므로 **한 겹 없이 같은 것을 뭅니다**  |

  **플러그인은 얹지 않았습니다** — `utc` · `timezone`이 필요한 것은 「오늘」 판정인데 `today` 축이 없고 `disabled` · `isHoliday`는 COM-009가 서버 판정으로 못박았습니다. `rollup.config.mjs` `external` 등록까지 마쳤고 `dist`에 인라인되지 않은 것을 확인했습니다.

- **날짜 계산은 DS가, 판정은 소비 앱이 합니다.** 격자 배치(1일의 요일 · 말일 · 주 나누기)는 순수 달력 계산이라 DS가 하고, `holidays` · `disabledDates`는 배열로 받습니다 — **internal-ui `useCalendarDays`와 같은 분업**입니다.

- **주말은 `Calendar`가 스스로 붉게 칠합니다.** COM-009가 「토요일 · 일요일 · 한국 법정 공휴일」을 휴일로 정의하는데, 그중 **토·일은 날짜에서 결정되는 사실**이라 서버 판정을 기다릴 이유가 없습니다. `CALENDAR_WEEKEND_DAYS`로 `dayjs().day()`를 보고 `isWeekend`를 셀에 실어, `isWeekend || holidays.has(...)`로 `CalendarDayButton`에 넘깁니다.

  **「앱이 자체 판정하지 않는다」에 어긋나지 않습니다.** 그 조항이 막는 것은 **법정 공휴일**을 앱이 추측하는 것이고, 그쪽은 여전히 `holidays`로만 들어옵니다. 소비자가 매달 모든 토·일을 배열에 나열하지 않아도 되고, 요일 헤더(`StickyCalendar`)가 이미 일·토를 무조건 붉게 그리고 있어 **머리와 격자의 색이 어긋나던 것도 함께 맞습니다.**

  `holidays`에는 이제 **평일 공휴일만** 넣으면 됩니다. 주말을 중복해 넣어도 결과는 같습니다.

- **`selectedType` 5종을 `selectedDates` 하나로 풉니다.** `CalendarDayButton`의 축을 소비자가 셀마다 지정하게 하면 범위의 `start` · `middle` · `end`를 매번 계산해 넣어야 합니다. `resolveCalendarSelectedType`이 대신 정합니다.

  | 입력                              | 결과                                              |
  | --------------------------------- | ------------------------------------------------- |
  | `useRange=false`                  | 배열에 든 날짜가 전부 `selected` (다중 선택 포함) |
  | `useRange=true` · 1개             | `selected`                                        |
  | `useRange=true` · 2개 이상        | 최소 = `start` · 최대 = `end` · 사이 = `middle`   |

  **정렬은 문자열 비교로 합니다.** `YYYY-MM-DD`는 사전순이 곧 시간순이라 `dayjs` 비교가 필요 없습니다.

  **`useRange`는 축이 아니라 계산 스위치입니다.** Figma에 없는 prop이고, 「고른 날짜만 칠할지 사이를 이을지」는 **화면 정책**이라 DS가 정할 수 없습니다 — 실제로 사용 예시 `485:1210`(주문 요일 다중 선택)과 `485:1516`(기간 선택)이 갈립니다.

- **`month`는 1-indexed입니다.** `dayjs`가 0-indexed지만 그것은 라이브러리 사정이고, `{ year: 2026, month: 6 }`이 6월이어야 소비자가 헷갈리지 않습니다. 변환은 `CALENDAR_MONTH_INDEX_OFFSET`이 한 곳에서 흡수합니다.

- **`months`를 소비자가 넘깁니다.** internal-ui는 `year` 하나로 12개월을 통째로 만드는데, biz-ui는 사용 예시가 전부 **몇 달치만 이어 붙인 연속 스크롤**입니다(`205:4115`는 6 · 7 · 8 · 9월). 어디부터 어디까지 보여줄지는 COM-009의 「1년 초과 미래」 같은 정책이 정하므로 소비 앱이 넘깁니다.

- **빈 칸을 `<div>`로 둡니다.** 앞뒤 달 날짜를 회색으로 그리지 않는 것이 Figma이고(6월 격자 첫 줄이 한 칸 비어 있습니다), 버튼이 아니라 자리만 차지하면 되므로 `CalendarDayButton`을 쓰지 않습니다. internal-ui도 `CalendarEmptyDay`로 갈라 뒀습니다.

- **격자 시맨틱(`role='grid'`)을 아직 넣지 않았습니다.** [`CalendarDayButton`](#calendardaybutton)에서 미룬 자리인데, **여기서도 넣지 않았습니다** — `role='grid'`는 `row` · `gridcell`과 함께 가야 하고 그러면 `CalendarDayButton`의 `aria-pressed`를 `aria-selected`로 바꿔야 합니다. 요일 헤더를 가진 [`StickyCalendar`](#stickycalendar)까지 한 격자에 들어와야 열 머리가 성립하는데 **그 셋을 함께 감싸는 것은 `CalendarBottomSheet`(DOTOLI-274)**라, 거기서 세 컴포넌트를 한 번에 보고 정합니다.

### API

| prop            | 필수 | 기본값  | 비고                                                        |
| --------------- | ---- | ------- | ----------------------------------------------------------- |
| `months`        | ✅   | —       | `[{ year, month }]`. `month`는 **1-indexed**. 배열 순서가 표시 순서 |
| `selectedDates` |      | —       | `'YYYY-MM-DD'` 배열                                          |
| `useRange`      |      | `false` | `true`면 최소~최대를 범위로 이음                             |
| `holidays`      |      | —       | `'YYYY-MM-DD'` 배열. **평일 공휴일만** — 주말은 컴포넌트가 스스로 칠함 |
| `disabledDates` |      | —       | `'YYYY-MM-DD'` 배열                                          |
| `onDateClick`   |      | —       | `({ dateString }) => void`                                   |
| `className`     |      | —       | 바깥 스택에 적용                                              |

```tsx
// 단일 선택
<Calendar
  months={[{ year: 2026, month: 6 }]}
  selectedDates={['2026-06-29']}
  holidays={holidays}
  onDateClick={({ dateString }) => setDate(dateString)}
/>

// 범위 선택 — 사이가 middle로 이어집니다
<Calendar
  months={[{ year: 2026, month: 6 }, { year: 2026, month: 7 }]}
  selectedDates={[start, end]}
  useRange
/>
```

### 디자인 확인 필요

| 항목            | 내용                                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| 격자 폭         | `48 × 7 = 336`인데 인스턴스 폭은 **340**입니다. 남는 4가 의도인지, 셀을 늘려 채워야 하는지                    |
| 빈 칸           | 앞뒤 달 날짜를 아예 안 그립니다. 회색으로 보여 주는 안이 있었는지                                            |
| 월 블록 간격    | 14인데 월 라벨 위 `pt-8`이 따로 있어 실제 시각 간격은 22입니다. 둘 중 하나로 합쳐야 하는지                      |
| 숨은 8월 블록   | 인스턴스에 `738:1868`(8월)이 **`hidden`으로** 들어 있습니다. 연속 스크롤 예시를 만들다 남긴 것으로 보이는지     |
| 범위 + 비활성   | 범위 안에 비활성 날짜가 끼면 `middle` + `disabled`가 됩니다(심볼 `205:1713`은 있음). 범위를 끊어야 하는지        |

### Storybook

`apps/storybook/src/stories/biz-ui/Calendar.stories.tsx`, `meta.title`은 `core/biz-ui/Calendar`.

| 스토리               | 보는 것                                                                |
| -------------------- | ---------------------------------------------------------------------- |
| `Default`            | 컨트롤로 `months` · `selectedDates` · `holidays` · `disabledDates`를 직접 넣어 본다 |
| `Range`              | 같은 `selectedDates`에 `useRange`만 켜고 끈다 — **띠가 이어지는 자리**   |
| `WithStickyCalendar` | `StickyCalendar` 아래 월이 이어 스크롤되고, 탭으로 다중 선택이 쌓인다     |
