# DatePicker 주말 선택 옵션 (useWeekend 노출) — 개발 계획

## 개요

`@bbodek/internal-ui`의 `DatePicker`는 내부적으로 `Calendar`를 감싸 사용한다. `Calendar`에는 주말(토·일) 선택을 허용하는 `useWeekend` 옵션이 이미 존재하지만(기본 `false` → 주말 비활성), **DatePicker가 이 옵션을 받지도, Calendar로 전달하지도 않는다.** 그 결과 DatePicker를 통해서는 주말이 항상 막혀 있다.

이 작업은 `useWeekend`를 DatePicker props로 노출해, 사용처에서 주말 선택 가능 여부를 제어할 수 있게 한다. Calendar 쪽 로직은 이미 완성되어 있어 신규 구현은 없고 **전달 배선(wiring)만** 연결하면 된다.

### 공휴일은 이번 범위 밖 (확인 결과)

공휴일(`holidays`)로 넘긴 날짜는 현재도 **선택 가능**하다. `getDayVariant`에서 `HOLIDAY_ENABLE` variant가 되며, 이는 비활성 목록(`CALENDAR_DAY_DISABLED_VARIANTS`)에 포함되지 않아 빨간 라벨 표시만 될 뿐 클릭은 된다. 공휴일이 막히는 경우는 그 날짜가 `disabledDays` 또는 `minDate`/`maxDate` 범위로 함께 제한될 때뿐이다. 따라서 공휴일을 선택 가능하게 하려면 라이브러리 수정이 아니라 **해당 사용처의 `disabledDays`(또는 min/max)에서 공휴일을 제외**하면 된다.

### 제약

- 기본값 `false` 유지 → 하위 호환(기존 화면 동작 불변)
- 관련 패키지: `@bbodek/internal-ui` (changeset 기반 배포)

Figma: (해당 없음 — 기존 컴포넌트 옵션 확장)

---

## Tasks

### DatePicker

- [ ] DOTOLI-199 DatePicker useWeekend 옵션 노출 (주말 선택 가능)

---

## 태스크 상세

### 1. DatePicker useWeekend 옵션 노출 (주말 선택 가능)

DatePicker가 `useWeekend`를 받아 내부 `Calendar`로 전달하도록 배선을 연결한다.

**수정 파일**

| 파일 | 변경 |
|---|---|
| `apps/internal-ui/src/components/DatePicker/types/index.ts` | `DatePickerProps`의 `Pick<CalendarProps, ...>`(31–34행)에 `'useWeekend'` 추가 |
| `apps/internal-ui/src/components/DatePicker/DatePicker.tsx` | props에서 `useWeekend` 구조분해(14–34행) 후 `<Calendar useWeekend={useWeekend} />`로 전달(66–75행) |
| `apps/storybook/src/stories/internal-ui/DatePicker.stories.tsx` | `useWeekend` boolean 컨트롤 및 예시 추가 |
| `.changeset/*.md` | `@bbodek/internal-ui` **patch** changeset 추가 (레포 컨벤션: 신규 기능도 patch, 0.0.x caret 함정 회피) |

**동작 정의**

| useWeekend | 토·일 |
|---|---|
| `false` (기본) | 비활성 — `SATURDAY_DISABLED` / `SUNDAY_DISABLED` (기존 동작) |
| `true` | 선택 가능 — `SATURDAY_ENABLE` / `SUNDAY_ENABLE` |

**주의사항**

- 기본값은 반드시 `false`로 두어 기존 사용처 동작을 유지한다(하위 호환).
- 공휴일이 주말과 겹치는 경우, `getDayVariant`에서 공휴일 분기(52–56행)가 주말 분기(58–68행)보다 먼저 평가되므로 `HOLIDAY_ENABLE`로 선택 가능 상태가 유지된다 — 별도 처리 불필요.
- 이 패키지는 changeset 기반 배포이므로 changeset을 누락하면 배포 파이프라인에 반영되지 않는다.

**참고 위치**

- 주말 variant 결정: `apps/internal-ui/src/components/Calendar/utils/getDayVariant.ts:58-68`
- 비활성 variant 목록: `apps/internal-ui/src/components/Calendar/constants/index.ts:164-170`
- `useWeekend` 정의: `apps/internal-ui/src/components/Calendar/types/index.ts:131`
