# biz-ui (뽀득 비즈파트너) 디자인시스템 환경 세팅 — 개발 계획

## 개요

뽀득 비즈파트너용 신규 디자인시스템 `@bbodek/biz-ui`를 dotoli 모노레포에 추가하기 위한 환경 세팅 계획입니다. 컴포넌트 구현 이전의 **패키지 스캐폴딩 · 스타일 레이어 · 디렉토리 구조 · Storybook 연동**까지를 범위로 합니다.

비즈파트너는 모바일 웹 기반 앱이며, React Native는 푸시알림 등 네이티브 기능에만 부분적으로 사용됩니다. RN 셸은 별도 레포에서 관리하므로 dotoli에는 **웹 전용 DS**만 추가하되, 화면이 WebView 안에서 렌더링되는 점을 고려해 safe-area · dvh · 터치 타겟 등 모바일 웹 제약을 스타일 베이스에 처음부터 반영합니다.

기존 `@bbodek/internal-ui`는 어드민(데스크톱) 타깃이라 톤앤매너와 디바이스 가정이 다릅니다. 결합 시 서로 제약이 되므로 **완전 독립 패키지**로 갑니다.

Figma:

- [Color](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=2-397&m=dev) (`2:397`)
- [Typography](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=78-2&m=dev) (`78:2`)

환경 세팅 시점 기준으로 Radius · Shadow · Breakpoint · Container는 Figma에 정의되어 있지 않았습니다 (당시 파일 내 페이지가 `Color/Typography` 하나뿐).

이후 컴포넌트 페이지가 추가되면서 [Button](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=46-148&m=dev) (`46:148`) 섹션이 생겼고, 여기서 `corner radius/999` 변수가 확인됩니다. 다만 radius **스케일** 전체가 정의된 것은 아니라 토큰화는 스케일 확정 후로 미룹니다.

### 확정 사항

| 항목             | 결정                                              |
| ---------------- | ------------------------------------------------- |
| 위치 / 패키지명  | `apps/biz-ui` / `@bbodek/biz-ui` (npm 배포)       |
| internal-ui 관계 | 완전 독립. `@bbodek/*` 워크스페이스 의존 없음     |
| RN               | 별도 레포. dotoli는 웹 DS만                       |
| Storybook        | 기존 `apps/storybook`에 `core/biz-ui/*` 트리 추가 |
| 디자인 토큰      | Figma에서 신규 정의                               |
| 토큰 prefix      | 없음. `--color-blue-500` / `text-body` 형태       |

### 제약

- `@bbodek/hooks` → `@bbodek/utils` → `@bbodek/internal-ui` 의존 체인이 존재합니다(`apps/utils/package.json`의 `"@bbodek/internal-ui": "^0.0.115"`). hooks 하나만 물려도 internal-ui 전체가 딸려옵니다. 독립성을 실제로 지키기 위해 biz-ui는 서드파티(`clsx`, `es-toolkit`, `@phosphor-icons/*`, `pretendard`, `dayjs`)만 직접 의존합니다. `dayjs`는 DOTOLI-273에서 추가됐습니다 — [`components/calendar.md`](./components/calendar.md) 「결정」.
- `^0.0.115`는 0.0.x 대역에서 정확히 `0.0.115`만 매칭됩니다. 이 캐럿 함정이 릴리즈 데드락의 원인이므로 biz-ui는 이 체인에 들어가지 않습니다.
- `.githooks/post-commit`이 `apps/*` 변경마다 patch changeset을 자동 생성하고, main 머지 즉시 `changeset publish`가 실행됩니다. 스캐폴딩 커밋 하나만으로도 실제 npm publish가 시도되므로 **패키지명·토큰 권한을 사전에 확보**해야 합니다.

---

## 디렉토리 구조

```
apps/biz-ui/
├── .gitignore
├── .npmignore
├── LICENSE
├── README.md               # 설치 · Tailwind 연결 · peerDeps 안내 (npm 소비자용)
├── eslint.config.mjs       # @bbodek/eslint-config 래퍼
├── next.config.ts
├── package.json
├── rollup.config.mjs       # @dotoli/rollup-config의 createRollupConfig
├── tailwind.config.js      # content 글롭 shim
├── tsconfig.json           # @dotoli/typescript-config + paths "@/*"
├── tsconfig.build.json
└── src/
    ├── index.ts                    # export * from '@/components'; export * from '@/variants';
    ├── components/
    │   ├── index.ts                # 디렉토리별 명시적 배럴
    │   └── shared/                 # 컴포넌트 간 공용 조각
    ├── variants/                   # 토큰의 TS 미러
    │   ├── color/ container/ radius/ shadow/ typography/
    │   └── index.ts
    └── styles/
        ├── globals.css             # exports "./styles" 진입점
        ├── base.css                # @layer base 리셋
        ├── theme.css               # @theme { --color-*, --text-*, ... }
        ├── safelist.css            # @source inline(...) 동적 클래스 보존
        └── utilities.css           # @utility *
```

컴포넌트 단위 구조 (internal-ui + `.frontend-rules` 컨벤션):

```
src/components/Button/
├── Button.tsx              # 화살표 함수 const + export default
├── index.ts                # export { default as Button } from './Button'; export * from './types';
├── types/index.ts
├── constants/index.ts      # 필요 시에만
├── hooks/[group]/          # 필요 시에만. useEffect는 effects/useXxxEffect.ts
└── utils/                  # 필요 시에만
```

- 서브 컴포넌트가 **생기는 시점에만** 폴더로 승격합니다. 처음부터 폴더로 만들지 않습니다.
- `.tsx` 안에 타입/상수/유틸/훅을 직접 선언하지 않고 분리 후 import 합니다.
- 내부 import는 상대경로 대신 `@/` 절대경로 풀패스를 사용합니다.

Storybook:

```
apps/storybook/src/stories/biz-ui/
├── Colors.mdx                  # meta.title: 'core/biz-ui/Colors'
└── <Component>.stories.tsx     # meta.title: 'core/biz-ui/<Name>'
```

타이포그래피는 별도 페이지를 두지 않습니다. internal-ui도 컴포넌트 스토리(`Typography.stories.tsx`)로만 다루며, biz-ui는 Typography 컴포넌트가 생길 때 같은 방식으로 붙입니다.

---

## Tasks

### biz-ui 환경 세팅

- [x] DOTOLI-213 biz-ui 패키지 생성 및 빌드 환경 구성
- [x] DOTOLI-214 biz-ui 스타일 레이어 및 디자인 토큰 구성 (color · typography까지. radius/breakpoint/container는 Figma 정의 대기. shadow는 DOTOLI-223에서 `--shadow-20` 추가)
- [x] DOTOLI-215 biz-ui Storybook 연동 및 문서화

### biz-ui 컴포넌트

- [x] DOTOLI-217 biz-ui 토큰 프리픽스 제거 및 컴포넌트 컨벤션 문서화
- [x] DOTOLI-218 biz-ui 기반 프리미티브 컴포넌트 구현 (Icon · Typography · Flex)
- [x] DOTOLI-219 biz-ui CtaButton 구현
- [x] DOTOLI-222 biz-ui Filter 구현
- [x] DOTOLI-223 biz-ui FloatingPill 구현
- [x] DOTOLI-224 biz-ui IconButton 구현
- [x] DOTOLI-226 biz-ui InputField 구현
- [x] DOTOLI-227 biz-ui TextArea 구현 (+ shadow · radius 토큰 스케일)
- [x] DOTOLI-228 biz-ui Badge 구현

### biz-ui Order 컴포넌트

- [x] DOTOLI-229 biz-ui OrderBoxCell 구현
- [x] DOTOLI-230 biz-ui OrderBox 구현
- [x] DOTOLI-231 biz-ui OrderDateInfo 구현
- [x] DOTOLI-232 biz-ui QuantityStepper 구현
- [x] DOTOLI-233 biz-ui OrderInputCard 구현

### biz-ui Info 컴포넌트

- [x] DOTOLI-234 biz-ui IconCircle 구현 (+ `--color-black` 토큰)
- [x] DOTOLI-235 biz-ui Divider 구현
- [x] DOTOLI-236 biz-ui InfoField 구현
- [x] DOTOLI-237 biz-ui InfoItem 구현
- [x] DOTOLI-238 biz-ui NotificationCard 구현

### biz-ui 오버레이 계열

- [x] DOTOLI-239 biz-ui 공통 Overlay 구현 (+ `Portal` · `--color-dim` · `--animate-*`)
- [x] DOTOLI-265 biz-ui ConfirmModal 구현 (+ `Overlay`에 ESC · 초기 포커스 추가)
- [x] DOTOLI-270 biz-ui BottomSheet 구현 (`Overlay`에 더한 것 없음 · `overlay-kit` 미도입 확정)

### biz-ui 폼 컨트롤

- [x] DOTOLI-241 biz-ui Checkbox 구현
- [x] DOTOLI-242 biz-ui ItemCheckbox 구현 (+ `CheckboxBase` · `CheckboxIcon` 분리)
- [x] DOTOLI-243 biz-ui Toggle 구현
- [x] DOTOLI-244 biz-ui ToggleListItem 구현 (+ `ToggleBase` · `ToggleTrack` 분리)
- [x] DOTOLI-245 biz-ui Chip 구현
- [x] DOTOLI-246 biz-ui SelectionItem 구현
- [x] DOTOLI-247 biz-ui SearchInput 구현

### biz-ui 리스트 · 네비게이션

- [x] DOTOLI-248 biz-ui NavigationListItem 구현
- [x] DOTOLI-249 biz-ui BottomTab 구현
- [x] DOTOLI-250 biz-ui HeaderBar 구현

### biz-ui 태그 · 메뉴

- [x] DOTOLI-257 biz-ui Tag 구현
- [x] DOTOLI-258 biz-ui MenuItem 구현

### biz-ui 알림

- [x] DOTOLI-259 biz-ui Notification 구현 (+ `CtaButton` `text`/`sm` gap 2px 수정)

### biz-ui 배너

- [x] DOTOLI-260 biz-ui InfoBanner 구현
- [x] DOTOLI-261 biz-ui StatusAlertBanner 구현

### biz-ui 접기

- [x] DOTOLI-262 biz-ui CollapseButton 구현
- [x] DOTOLI-263 biz-ui FaqAccordion 구현 (+ `FaqAccordionList`)
- [x] DOTOLI-264 biz-ui OrderNotiCollapse 구현

### biz-ui 토스트

- [x] DOTOLI-266 biz-ui Toast 구현 (+ `IconCircle` `iconClassName` · `--animate-toast`)
- [x] DOTOLI-267 biz-ui FeedbackToast 구현
- [x] DOTOLI-268 biz-ui toast 유틸 구현 (+ `Toaster` · `--animate-toast-out`)

### biz-ui 하단 액션

- [x] DOTOLI-269 biz-ui BottomActionBar 구현 (두 DS 통틀어 첫 그라디언트)

### biz-ui 캘린더

- [x] DOTOLI-271 biz-ui CalendarDayButton 구현 (계열 `Calendar/` 그룹 신규)
- [x] DOTOLI-272 biz-ui StickyCalendar 구현 (격자가 아니라 격자 위 머리 — 연도 이동 · 요일 헤더)
- [x] DOTOLI-273 biz-ui Calendar 구현 (+ `Calendar/shared/` · **`dayjs` 의존성 추가**)
- [x] DOTOLI-274 biz-ui CalendarBottomSheet 구현 (`BottomSheet` + `StickyCalendar` + `Calendar` 조립)
- [x] DOTOLI-275 biz-ui DateBottomSheet 구현 (`type` 2종 · `Chip` 단일 선택 · 제어 전용 + DOTOLI-271 `aria-label` 후속)

### biz-ui 후속 수정

- [x] DOTOLI-256 biz-ui CtaButton 아이콘 색 분리
- [x] DOTOLI-277 biz-ui BottomActionBar text CTA 개방 (`variant`·`theme`·`size`·아이콘 + `confirm`·`cancel` → `action`·`subAction`, 시트 `actionOption` → `actionBarOption` 개명)
- [x] DOTOLI-284 biz-ui QuantityStepper `value` `number | null` — 미주문(`null`)과 의도적 0 주문(`0`) 구분. 스토리북 테스트 인프라 제거 동반
- [x] DOTOLI-285 biz-ui Toast 개방 — `message` 줄바꿈 · `theme` 6종 · `theme` 연동 `highlight`
- [x] DOTOLI-286 biz-ui DateBottomSheet `Linked` 스토리 재진입 깜빡임 제거 (시트 하나를 유지한 채 뷰 교체 · 스토리 전용)
- [x] DOTOLI-287 biz-ui BottomActionBar `isPending` 개방 (`disabled`는 COM-005대로 계속 막음) + `Variants`·`Sticky` 스토리 중복 정리
- [ ] DOTOLI-288 biz-ui OrderBox 빈 상태 개방 — `emptyLabel` 개방 완료 · **`inverse` tone은 스타일 미수령으로 보류**
- [x] DOTOLI-289 biz-ui PageBody 구현 (`variant` 7종 · 페이지 세로 구획 · `stickyTop`은 DS가 `sticky` 부착)
- [x] DOTOLI-296 biz-ui InfoBanner `title` 추가 + `label` → `description` 개명 (굵은 첫 줄 · 색 동일 · `\n` 줄바꿈)
- [x] DOTOLI-297 biz-ui Toast · NotificationCard 강조부를 `ReactNode`로 (`message`·`title` 개방 · **`highlight` 제거** · `[&_strong]:`로 색은 DS 소유)
- [x] DOTOLI-295 biz-ui ActionChip 구현 + Chip 계열 승격 (`Chip/shared`로 알약 공유 · `state`는 prop이 아니라 `:active`)

Button 계열 후속 3종은 신규 베이스 컴포넌트 없이 바로 착수 가능합니다 — `Icon` · `ButtonIcon` · `TOUCH_TARGET_STYLE`(당시 이름 `BUTTON_TOUCH_TARGET_STYLE`)이 이미 있습니다. 권장 순서는 Filter → FloatingPill → IconButton입니다.

DOTOLI-224로 Figma Button 섹션이 전부 끝나고 DOTOLI-226부터 Input 계열입니다. InputField는 Button 계열 산출물을 그대로 물어 씁니다 — 트레일링 아이콘은 `IconButton`(`sm`=24px), `verify`의 확인 버튼은 `CtaButton`(`sm`=32px)이 크기까지 정확히 맞습니다.

`base/white`는 Filter에서 **별도 토큰을 만들지 않고 Tailwind 기본 `white`를 쓰는 것으로 확정**했습니다 (Figma `base/white`가 `#ffffff`로 동일). FloatingPill · IconButton도 이 결정을 따릅니다 — [`components/button.md`](./components/button.md) 「계열 공통 결정」.

DOTOLI-227 다음은 Figma [Order 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=203-847&m=dev) (`203:847`)의 컴포넌트 세트 5종입니다. **Badge를 먼저 넣습니다** — Order 섹션 밖(`75:4714`)에 있지만 OrderInputCard의 `inputClosed`가 실제로 물어 씁니다. 순서는 DOTOLI-228 Badge → 229 OrderBoxCell → 230 OrderBox → 231 OrderDateInfo → 232 QuantityStepper → 233 OrderInputCard이고, 이 중 **231 · 232는 선행이 없어 병렬로 가도 됩니다.**

의존 관계는 두 갈래뿐입니다.

| 컴포넌트          | 무엇을 물어 쓰는가                                          |
| ----------------- | ----------------------------------------------------------- |
| `OrderBox`        | `OrderBoxCell` (인스턴스 4개)                               |
| `QuantityStepper` | `IconButton` `lg`(40px) — 기구현                            |
| `OrderInputCard`  | `CtaButton` `sm`(32px) — 기구현 · `Badge` — **이번에 신규** |

Order 계열은 `src/components/Order/` 그룹을 새로 엽니다. Badge는 계열이 아직 없어 `src/components/Badge/`에 단독으로 둡니다.

DOTOLI-233 다음은 Figma [Info 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=177-520&m=dev) (`177:520`)의 5종입니다. 의존은 한 갈래뿐이라 **IconCircle이 NotificationCard보다 먼저**고, `Divider` · `InfoField` · `InfoItem`은 선행이 없어 병렬로 가도 됩니다.

| 컴포넌트           | 무엇을 물어 쓰는가                                                     |
| ------------------ | ---------------------------------------------------------------------- |
| `NotificationCard` | `IconCircle` `md`(48px) — DOTOLI-234 · `CtaButton` `sm`(32px) — 기구현 |

DOTOLI-238 다음은 오버레이 계열입니다. 껍데기는 DOTOLI-239가 끝냈고([`components/overlay.md`](./components/overlay.md)) **다음은 BottomSheet · ConfirmModal 실물 2종**이었고, **ConfirmModal이 DOTOLI-265 · BottomSheet가 DOTOLI-270으로 나갔습니다**(ESC · 초기 포커스는 265에서 `Overlay`로 들어갔고, 270은 `Overlay`에 아무것도 더하지 않았습니다). 둘 사이에 의존이 없어 병렬로 갔습니다. `Overlay`는 **비공개**(`components/shared/`)라 소비자의 진입점이 이 둘뿐이고, 그래서 두 티켓이 시각 검증(스토리)까지 함께 집니다. Overlay는 배경 탭에서 `onClose` 콜백만 넘기므로 **정책 COM-008(이탈 방지) · 물리 뒤로가기 · ESC 처리는 각 컴포넌트 티켓이 맡습니다.** 그 티켓에서 `overlay-kit`을 peerDependency로 넣을지도 함께 올라왔고, **실물 2종이 모두 기준에 해당하지 않아 DOTOLI-270에서 미도입으로 확정했습니다** — 판단 기준과 실측 근거는 [`components/overlay.md`](./components/overlay.md) 「후속 티켓 판단 기준」에 있습니다.

**BottomSheet · ConfirmModal은 당시 티켓이 없었고, 먼저 나간 것이 DOTOLI-241~250입니다**(ConfirmModal은 이후 DOTOLI-265로 나갔습니다). Figma `component` 페이지에서 미구현 섹션 20개 중 **오버레이에 의존하지 않는 8개 섹션을 뽑았고**, 나머지 10개(BottomSheet · ConfirmModal · Toast · CollapseButton · FaqAccordion · OrderNotiCollapse · InfoBanner · StatusAlertBanner · Notification · Calendar 계열 5종)는 다음 배치입니다. **Tag · MenuItem · Notification · InfoBanner · StatusAlertBanner · CollapseButton · FaqAccordion · OrderNotiCollapse가 여기서 먼저 빠져나가 DOTOLI-257~264로 끝났고, Toast는 DOTOLI-266~268로 끝났습니다.** 남은 8개 전부 **DOTOLI-239와 병렬로 가도 됐고**, 새로 만들 베이스 컴포넌트도 없었습니다. **BottomSheet가 DOTOLI-270으로 끝나 이 배치에서 남은 것은 Calendar 계열 5종뿐이었고, 그중 잎에 해당하는 `CalendarDayButton`이 DOTOLI-271로 나갔습니다.**

의존은 두 갈래뿐이고 나머지 6개는 선행이 없습니다.

| 컴포넌트         | 무엇을 물어 쓰는가                                                           |
| ---------------- | ---------------------------------------------------------------------------- |
| `ItemCheckbox`   | `Checkbox`의 `CheckboxBase` · `CheckboxIcon` — DOTOLI-241 · 242              |
| `ToggleListItem` | `Toggle` — DOTOLI-243                                                        |
| `SearchInput`    | `Input/shared`(`resolveInputState` · `InputMessage`) · `IconButton` — 기구현 |

**Figma 심볼명이 그대로 컴포넌트명이 아닌 곳이 한 군데 있습니다.** Chip 섹션의 레이어는 `Chip`(`useIcon=false`) · `ChipCheck`(`useIcon=true`) 둘로 나뉘어 있지만 **variant 축이 `isSelected × useIcon`으로 동일**합니다. DOTOLI-245를 하나로 잡은 이유이고, 실측에서 두 세트의 다른 축이 나오면 그때 쪼갭니다.

**폴더는 Figma 섹션이 아니라 이름 프리픽스를 따릅니다.** `Info/InfoField` · `Info/InfoItem`만 그룹으로 묶고 `Divider` · `IconCircle` · `NotificationCard`는 단독 폴더입니다. `Button/CtaButton` · `Input/InputField` · `Order/OrderBox`가 전부 「프리픽스 = 그룹명」이었고, 뒤의 3종은 Info 전용이 아니라 범용이라 섹션명을 따라가면 다른 계열에서 쓸 때 위치가 어색해집니다. 단독 폴더는 Badge 선례입니다.

### biz-ui 패키징

- [x] DOTOLI-299 biz-ui App Router(RSC) 대응 — 번들 최상단 `'use client'` (+ terser `compress.directives: false`가 짝)
- [x] DOTOLI-300 biz-ui 상수·유틸을 클라이언트 경계 밖으로 — `dist` 청크 3분할 (**299의 회귀 수정.** 배너 한 장이 상수까지 클라이언트 참조로 만들었고, 컴포넌트와 달리 **에러 없이 조용히** 깨졌습니다)

소비 앱(`biz-customer-app`의 `apps/web`)이 Next 15 **App Router**로 확정되면서 나온 유일한 biz-ui 측 과제입니다. Figma 축·실측과 무관한 패키징 층이라 컴포넌트 그룹과 섞지 않고 따로 둡니다.

---

## 태스크 상세

**완료된 티켓은 상세를 걷어내고 링크만 둡니다.** 착수 전 계획과 실제 구현은 반드시 갈리는데, 그때 진실은 구현 기록 쪽입니다. 계획을 그대로 두면 볼 때마다 어느 쪽이 맞는지 대조해야 하고 파일만 단조 증가합니다. 유지 규칙은 [`apps/biz-ui/CLAUDE.md`](../../apps/biz-ui/CLAUDE.md) 「문서 유지」를 따릅니다.

아래 값은 **출처를 따로 적지 않았으면 문서 프레임에서 눈으로 읽은 것**이라 착수 시 심볼에서 다시 실측합니다 (CLAUDE.md 「작성 전 절차」 4).

### 완료된 티켓

| 티켓       | 작업                                                           | 기록                                                                                    |
| ---------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| DOTOLI-213 | 패키지 생성 및 빌드 환경 구성                                  | [frontend.md](./frontend.md)                                                            |
| DOTOLI-214 | 스타일 레이어 및 디자인 토큰 (color · typography)              | [frontend.md](./frontend.md)                                                            |
| DOTOLI-215 | Storybook 연동 및 문서화                                       | [frontend.md](./frontend.md)                                                            |
| DOTOLI-217 | 토큰 프리픽스 제거 및 컴포넌트 컨벤션 문서화                   | [frontend.md](./frontend.md) · [CLAUDE.md](../../apps/biz-ui/CLAUDE.md)                 |
| DOTOLI-218 | 기반 프리미티브 (Icon · Typography · Flex)                     | [frontend.md](./frontend.md)                                                            |
| DOTOLI-219 | CtaButton (+ `ButtonIcon`)                                     | [components/button.md](./components/button.md)                                          |
| DOTOLI-222 | Filter                                                         | [components/button.md](./components/button.md)                                          |
| DOTOLI-223 | FloatingPill (+ `--shadow-20`)                                 | [components/button.md](./components/button.md)                                          |
| DOTOLI-224 | IconButton                                                     | [components/button.md](./components/button.md)                                          |
| DOTOLI-226 | InputField (+ `Input/shared` · `InputMessage`)                 | [components/input.md](./components/input.md)                                            |
| DOTOLI-227 | TextArea (+ shadow · radius 토큰 스케일)                       | [components/input.md](./components/input.md)                                            |
| DOTOLI-228 | Badge                                                          | [components/badge.md](./components/badge.md)                                            |
| DOTOLI-229 | OrderBoxCell                                                   | [components/order.md](./components/order.md)                                            |
| DOTOLI-230 | OrderBox                                                       | [components/order.md](./components/order.md)                                            |
| DOTOLI-231 | OrderDateInfo                                                  | [components/order.md](./components/order.md)                                            |
| DOTOLI-232 | QuantityStepper                                                | [components/order.md](./components/order.md)                                            |
| DOTOLI-233 | OrderInputCard (+ `Order/shared`)                              | [components/order.md](./components/order.md)                                            |
| DOTOLI-234 | IconCircle (+ `--color-black` 토큰)                            | [components/icon-circle.md](./components/icon-circle.md) · [frontend.md](./frontend.md) |
| DOTOLI-235 | Divider                                                        | [components/divider.md](./components/divider.md)                                        |
| DOTOLI-236 | InfoField (+ `Info/` 그룹)                                     | [components/info.md](./components/info.md)                                              |
| DOTOLI-237 | InfoItem                                                       | [components/info.md](./components/info.md)                                              |
| DOTOLI-238 | NotificationCard                                               | [components/notification-card.md](./components/notification-card.md)                    |
| DOTOLI-239 | Overlay (+ `Portal` · `--color-dim` · `--animate-*`)           | [components/overlay.md](./components/overlay.md) · [frontend.md](./frontend.md)         |
| DOTOLI-241 | Checkbox (+ `TOUCH_TARGET_STYLE`을 `components/shared`로 이동) | [components/checkbox.md](./components/checkbox.md)                                      |
| DOTOLI-242 | ItemCheckbox (+ `CheckboxBase` · `CheckboxIcon` 분리)          | [components/checkbox.md](./components/checkbox.md)                                      |
| DOTOLI-243 | Toggle                                                         | [components/toggle.md](./components/toggle.md)                                          |
| DOTOLI-244 | ToggleListItem (+ `ToggleBase` · `ToggleTrack` 분리)           | [components/toggle.md](./components/toggle.md)                                          |
| DOTOLI-245 | Chip                                                           | [components/chip.md](./components/chip.md)                                              |
| DOTOLI-246 | SelectionItem                                                  | [components/selection-item.md](./components/selection-item.md)                          |
| DOTOLI-247 | SearchInput (+ `resolveSearchInputState`)                       | [components/input.md](./components/input.md)                                            |
| DOTOLI-248 | NavigationListItem                                             | [components/navigation-list-item.md](./components/navigation-list-item.md)              |
| DOTOLI-249 | BottomTab (+ `BottomTabItem` · `safe-area-bottom` 첫 사용)     | [components/bottom-tab.md](./components/bottom-tab.md)                                  |
| DOTOLI-250 | HeaderBar (+ 비공개 조각 4종)                                  | [components/header-bar.md](./components/header-bar.md)                                  |
| DOTOLI-257 | Tag                                                            | [components/tag.md](./components/tag.md)                                                |
| DOTOLI-258 | MenuItem (`IconCircle` 재사용)                                 | [components/menu-item.md](./components/menu-item.md)                                    |
| DOTOLI-259 | Notification (+ `CtaButton` `text`/`sm` gap 2px 수정)          | [components/notification.md](./components/notification.md)                              |
| DOTOLI-260 | InfoBanner (`theme` 5종 · `isSticky`)                          | [components/info.md](./components/info.md)                                              |
| DOTOLI-261 | StatusAlertBanner (`theme` 4종 · 꼬리 clip-path)               | [components/status-alert-banner.md](./components/status-alert-banner.md)                |
| DOTOLI-262 | CollapseButton (라벨 DS 소유 · caret 회전)                     | [components/button.md](./components/button.md)                                          |
| DOTOLI-263 | FaqAccordion (+ `FaqAccordionList` · 열림 집합 소유)           | [components/faq-accordion.md](./components/faq-accordion.md)                            |
| DOTOLI-264 | OrderNotiCollapse (헤더 전용 · `type` 4종)                     | [components/order.md](./components/order.md)                                            |
| DOTOLI-265 | ConfirmModal (`Overlay` 첫 실물 · ESC · 초기 포커스)           | [components/confirm-modal.md](./components/confirm-modal.md) · [overlay.md](./components/overlay.md) |
| DOTOLI-266 | Toast (`status` 2종 · `IconCircle` `iconClassName` 개방)       | [components/toast.md](./components/toast.md) · [icon-circle.md](./components/icon-circle.md) |
| DOTOLI-267 | FeedbackToast (`type` 4종 · 단독 폴더)                          | [components/toast.md](./components/toast.md)                                            |
| DOTOLI-268 | toast 유틸 (`Toaster` · 단일 슬롯 큐 · 서드파티 없음)          | [components/toast.md](./components/toast.md) · [frontend.md](./frontend.md)             |
| DOTOLI-269 | BottomActionBar (`variant` 2종 · `actions` 축을 prop 유무로 흡수) | [components/bottom-action-bar.md](./components/bottom-action-bar.md)                  |
| DOTOLI-270 | BottomSheet (`Overlay` 두 번째 실물 · `overlay-kit` 미도입 확정)  | [components/bottom-sheet.md](./components/bottom-sheet.md) · [overlay.md](./components/overlay.md) |
| DOTOLI-271 | CalendarDayButton (`Calendar/` 그룹 · `selectedType` 5종)       | [components/calendar.md](./components/calendar.md)                                      |
| DOTOLI-272 | StickyCalendar (연도 이동 · 요일 헤더 · `sticky top-0 z-10`)    | [components/calendar.md](./components/calendar.md)                                      |
| DOTOLI-273 | Calendar (월 격자 · `Calendar/shared/` · `dayjs` 도입)          | [components/calendar.md](./components/calendar.md) · [frontend.md](./frontend.md)        |
| DOTOLI-274 | CalendarBottomSheet (조립 전용 · 축 없음)                       | [components/calendar.md](./components/calendar.md) · [bottom-sheet.md](./components/bottom-sheet.md) |
| DOTOLI-275 | DateBottomSheet (`type` 2종 · 제어 전용 · `basis-0 grow` 4열) + `CalendarDayButton` `aria-label` 후속 | [components/calendar.md](./components/calendar.md)                                      |
| DOTOLI-256 | CtaButton 아이콘 색 분리 (+ gap을 `variant × size`로)          | [components/button.md](./components/button.md)                                          |
| DOTOLI-277 | BottomActionBar text CTA 개방 (폭 배분 파생 · **`action`·`subAction`·`actionBarOption` 개명**) + 스토리 `argTypes` 필수 표시 보완(BottomActionBar · Calendar · CalendarBottomSheet) | [components/bottom-action-bar.md](./components/bottom-action-bar.md) · [bottom-sheet.md](./components/bottom-sheet.md) |
| DOTOLI-286 | DateBottomSheet `Linked` 재진입 깜빡임 제거 (시트 하나 유지 · 뷰 교체 · 스토리 전용) | [components/calendar.md](./components/calendar.md) · [overlay.md](./components/overlay.md) |
| DOTOLI-287 | BottomActionBar `isPending` 개방 (`Pick` 한 항목 · `disabled`는 계속 막음) + `Variants`·`Sticky` 스토리 합침 | [components/bottom-action-bar.md](./components/bottom-action-bar.md)                    |
| DOTOLI-285 | Toast `message` 줄바꿈 · `theme` 6종 개방 · `theme` 연동 `highlight` (`toast.show`까지 통과) | [components/toast.md](./components/toast.md)                                            |
| DOTOLI-289 | PageBody (`variant` 7종 · 페이지 세로 구획 · `stickyTop` 부착) + CLAUDE.md 테두리 규칙 표로 정리 | [components/page-body.md](./components/page-body.md) · [CLAUDE.md](../../apps/biz-ui/CLAUDE.md) |
| DOTOLI-296 | InfoBanner `title` 추가 + **`label` → `description` 개명**(`label`은 계열에서 주 텍스트) | [components/info.md](./components/info.md)                                              |
| DOTOLI-297 | Toast `message` · NotificationCard `title`을 `ReactNode`로 + **`highlight` 제거**(문장 중간 강조 · `[&_strong]:`로 색은 DS 소유 · biz-ui 첫 임의 변형 셀렉터) | [components/toast.md](./components/toast.md) · [notification-card.md](./components/notification-card.md) |
| DOTOLI-295 | ActionChip(버튼 역할 칩 · `pressed`는 `:active`) + **`Chip` 단독 폴더 → 계열 승격**(`Chip/Chip` · `Chip/ActionChip` · `Chip/shared`) | [components/chip.md](./components/chip.md)                                              |
| DOTOLI-299 | App Router(RSC) 대응 — `'use client'` + terser `compress.directives: false`. **상수까지 클라이언트 참조가 되는 회귀를 냄** | [frontend.md](./frontend.md) · [CLAUDE.md](../../apps/biz-ui/CLAUDE.md) |
| DOTOLI-300 | `dist` 청크 3분할(`index` · `shared` · `client`) — 299 회귀 수정. 경계는 `manualChunks`가 경로 규약으로 결정, 소스 무수정 | [frontend.md](./frontend.md) · [CLAUDE.md](../../apps/biz-ui/CLAUDE.md) |

계획 단계에서만 의미가 있던 것(사전 점검 표 · 생성 파일 목록 · API 초안)은 실물 코드가 대신하므로 남기지 않았습니다.

---

## 전체 검증

```bash
pnpm install && pnpm biz build && pnpm biz lint && pnpm build && pnpm sb build
```

1. `apps/biz-ui/dist/`에 `index.es.js`, `index.d.ts` 생성
2. `pnpm sb dev` → `core/biz-ui/Foundations/Colors`에서 `` 토큰이 적용된 색상 확인
3. 같은 Storybook에서 `core/internal-ui/*` 기존 스토리 무변화 확인
4. 모바일 뷰포트(375px)에서 safe-area / dvh 유틸 동작 확인
5. main 머지 전 npm 이름·토큰 권한 확인 완료

---

## 범위 외

- React Native 셸 및 웹↔네이티브 브릿지 — 별도 레포
- 개별 컴포넌트 구현 — 세팅 완료 후 별도 계획
- 테스트 인프라 — 레포 전체에 `test` 태스크가 없어 biz-ui만 도입하면 정합성이 깨짐. 도입 시 별도 안건
