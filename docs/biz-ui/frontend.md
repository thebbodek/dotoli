# biz-ui 디자인시스템 환경 세팅 - 프론트엔드 구현 문서

## 개요

뽀득 비즈파트너용 신규 디자인시스템 `@bbodek/biz-ui`를 dotoli 모노레포에 추가한 작업입니다. 컴포넌트 구현 이전 단계인 **패키지 스캐폴딩 · 스타일 레이어 · 디자인 토큰 · Storybook 연동**까지를 범위로 합니다.

이 문서는 **환경 세팅 범위(DOTOLI-213~218)** 까지만 다룹니다. 이후 컴포넌트 계열은 [`components/`](./components) 아래 계열별 문서에 기록합니다.

| 문서                                                 | 성격                  |
| ---------------------------------------------------- | --------------------- |
| [apps/biz-ui/CLAUDE.md](../../apps/biz-ui/CLAUDE.md) | biz-ui 개발 규칙      |
| [components/button.md](./components/button.md)       | Button 계열 구현 기록 |
| [components/input.md](./components/input.md)         | Input 계열 구현 기록  |
| [components/badge.md](./components/badge.md)         | Badge 구현 기록       |
| [components/order.md](./components/order.md)         | Order 계열 구현 기록  |
| [components/icon-circle.md](./components/icon-circle.md) | IconCircle 구현 기록 |
| [components/divider.md](./components/divider.md)     | Divider 구현 기록     |
| [components/info.md](./components/info.md)           | Info 계열 구현 기록   |
| [components/notification-card.md](./components/notification-card.md) | NotificationCard 구현 기록 |
| [components/overlay.md](./components/overlay.md)     | Overlay · Portal 구현 기록 |
| [components/checkbox.md](./components/checkbox.md)   | Checkbox 구현 기록    |
| frontend.md (이 문서)                                | 환경 세팅 기록        |
| [plan.md](./plan.md)                                 | 티켓 계획 (미착수분)  |

이 도메인은 제품 기능이 아닌 인프라 작업이라 `spec.md` / `api.md`는 두지 않습니다.

비즈파트너는 모바일 웹 기반이며 화면이 WebView 안에서 렌더링됩니다. safe-area · dvh · 터치 타겟 등 모바일 웹 제약을 스타일 베이스에 처음부터 반영했습니다.

다음 영역으로 구성됩니다.

- 패키지 스캐폴딩 및 빌드 파이프라인 (DOTOLI-213)
- 스타일 레이어 및 디자인 토큰 (DOTOLI-214)
- Storybook 연동 및 문서화 (DOTOLI-215)
- 토큰 프리픽스 제거 및 컴포넌트 컨벤션 문서화 (DOTOLI-217)
- 기반 프리미티브 컴포넌트 Icon · Typography · Flex (DOTOLI-218)

## 구현 현황

### 구현 완료

| 기능              | 설명                                                                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 패키지 스캐폴딩   | `apps/biz-ui`에 `@bbodek/biz-ui` 생성. `internal-ui` 파일 세트를 복제하되 `@bbodek/*` 워크스페이스 의존을 모두 제거해 독립 패키지로 구성                  |
| 빌드 파이프라인   | `@dotoli/rollup-config`의 `createRollupConfig` + `tsc` + `tsc-alias`. `dist/index.es.js` · `index.d.ts` 산출                                              |
| RSC 경계          | `dist` 청크 3분할 (DOTOLI-299 → 300). `client.es.js`만 `'use client'`를 갖고, 상수 · 유틸 · `variants`는 `shared.es.js`에 남아 서버 컴포넌트에서 읽힘. 경계는 `manualChunks`가 경로 규약으로 결정 |
| 루트 스크립트     | 루트 `package.json`에 `biz` 필터 스크립트 추가 (`in` / `ut` / `hooks` 컨벤션)                                                                             |
| 스타일 레이어     | `globals.css`가 폰트 import + `base` / `theme` / `safelist` / `utilities` 4개 레이어를 묶고 `@source '../../dist'`로 컴포넌트를 스캔                      |
| 컬러 토큰         | Figma Color 페이지 기준 `--color-{blue,red,yellow,green,gray}-{50…900}` 50개 + `--color-black` (DOTOLI-234)                                            |
| 타이포그래피 토큰 | Figma Typography 페이지 기준 `--text-*` 18개. 각 토큰이 `font-size` · `font-weight` · `line-height` · `letter-spacing`을 함께 실어 클래스 하나로 완성 |
| variants TS 미러  | `COLOR_VARIANTS` · `COLOR_STYLES_MAPPER` · `TYPOGRAPHY_VARIANTS` · `TYPOGRAPHY_STYLES_MAPPER`. `internal-ui`의 명시적 매퍼 패턴을 따름                    |
| 모바일 유틸리티   | `safe-area-*`, `screen-h`(dvh), `touch-target`(44px), `scroll-{x,y}`, `flex-{v,h}-stack`                                              |
| safelist          | 런타임 조합 클래스 267개 보존. `hover:` / `focus:` / `active:` variant는 제외                                                                             |
| Storybook 연동    | `apps/storybook`에 `@bbodek/biz-ui` 워크스페이스 의존 추가, `globals.css`에 `@import '@bbodek/biz-ui/styles'` 한 줄 추가                                  |
| 컬러 스와치 문서  | `core/biz-ui/Colors` (`Colors.mdx`). `internal-ui`와 동일한 평면 구조                                                                                     |
| npm 소비자 문서   | `apps/biz-ui/README.md`. 설치 · Tailwind 연결 · WebView viewport · 토큰/유틸 목록                                                                         |
| `Icon`            | Phosphor 웹폰트 클래스 조합(`ph-{key}` + `ph-{weight}`). 웨이트는 `ICON_WEIGHTS`로 `regular` · `bold` · `fill` 3종만 노출. 기본값 `bold`                  |
| `Typography`      | `as`로 태그 교체(26종), `variant`로 타이포 토큰 18종, `color`로 컬러 토큰 50종. `color` 미지정 시 `text-inherit`                                          |
| `Flex`            | `direction` · `align` · `justify` · `gap` · `wrap` · `basis` · `shrink` · `grow` · `flex` · `order`. `gap`은 단일 값 또는 `{ column, row }` 객체         |
| 프리미티브 스토리 | `core/biz-ui/{Icon,Typography,Flex}`. Icon `Weights` · Typography `Variants`로 토큰 전량을 시각 확인                                                      |

### 미구현 또는 확인 필요

| 항목                                       | 비고                                                                                                                                    |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| App Router 실환경 검증                     | **완료** — `biz-ui-playground`(Next 15 App Router)에서 확인했습니다. 서버 컴포넌트에서 상수 23/23 · 유틸 호출 · `useState` 컴포넌트 렌더 모두 통과하고, 하이드레이션(`QuantityStepper` 5→6→5)과 `next build` 정적 프리렌더도 통과합니다. **배너 버전에서는 상수가 0/23이었습니다** |
| 워크어라운드 제거                          | **완료** — 배너 때문에 플레이그라운드 5개 섹션(Typography · Color · Icon · Badge · Info)에 도로 붙였던 `'use client'`를 전부 걷었습니다. 지금 지시어가 남은 것은 훅을 직접 쓰는 3개 섹션뿐이고, **소비 앱에서 목표로 하던 모양입니다** |
| `sideEffects` 필드                         | 없습니다. 트리셰이킹이 실제로 어떻게 되는지 재보지 않았습니다 |
| `--breakpoint-*` · `--container-*`         | 모바일 기준 재설계 필요. 디바이스 매트릭스 확정 대기                                                                                    |
| `--animate-*`                              | **완료** — DOTOLI-239에서 `fade-in` · `popup` · `bottom-sheet` 3종 추가 (Figma 주석의 250ms 기준) → [components/overlay.md](./components/overlay.md). DOTOLI-266에서 `toast` 추가 — 등장 200ms라 `fade-in` 키프레임을 duration만 바꿔 재사용. DOTOLI-268에서 `toast-out` + `fade-out` 키프레임 추가(`forwards`) → [components/toast.md](./components/toast.md) |
| `--color-dim`                              | **완료** — DOTOLI-239에서 추가. 팔레트가 아닌 역할 토큰이라 `COLOR_VARIANTS`에는 넣지 않음 → [components/overlay.md](./components/overlay.md) |
| `--radius-*` · `--shadow-*`                | **완료** — DOTOLI-227에서 Figma 스케일 확정분을 일괄 추가 (radius 6단계 + `rounded-full`, shadow 6단계) → [components/input.md](./components/input.md) |
| `variants/{radius,shadow,container}`       | 컴포넌트가 prop으로 노출하지 않아 디렉토리 미생성. `--shadow-20`도 클래스로만 씀 (`variants/`는 prop union이 필요할 때만 만듦)          |
| Typography 스토리                          | `internal-ui`와 동일하게 `Typography` 컴포넌트가 생기는 시점에 컴포넌트 스토리로 추가. 별도 Foundations 페이지는 두지 않음              |
| `CtaButton`                                | DOTOLI-219로 구현 완료. 이 문서 범위 밖입니다 → [components/button.md](./components/button.md)                                          |
| `Portal`                                   | **완료** — DOTOLI-239. `Overlay`가 쓰는 시점에 생성. 루트 배럴로 **공개** → [components/overlay.md](./components/overlay.md)            |
| `components/shared/`                       | **완료** — DOTOLI-239에서 `Overlay`를 담으며 생성. **배럴에서 내보내지 않는 비공개 배선**이고, 계열 안의 `<Group>/shared`(공개)와 성격이 다릅니다 → [CLAUDE.md](../../apps/biz-ui/CLAUDE.md) 「코드 규칙 1」 |
| Figma 문서 텍스트 오기 2건                 | `label` 3종 letter-spacing · `caption` weight. 디자이너 확인 필요 (아래 특이사항 ①②). 셋째였던 Heading 단계 수는 해소됐습니다          |
| `heading-1` 크기                           | **완료** — 36px → 34px로 정정 (2026-08-14, 아래 특이사항)                                                                                |

### 특이사항

- **`internal-ui`와 완전 독립입니다.** `@bbodek/hooks` → `@bbodek/utils` → `@bbodek/internal-ui` 의존 체인이 있어 hooks 하나만 물려도 internal-ui 전체가 딸려옵니다. biz-ui는 서드파티만 직접 의존합니다.
- **`dayjs`를 dependency로 추가했습니다 (DOTOLI-273).** 캘린더 격자가 「그 달 1일의 요일」과 「말일」을 알아야 하는데, 같은 계산을 하는 `@bbodek/utils`의 date 래퍼를 물면 바로 위 항목의 체인이 그대로 딸려옵니다. **`internal-ui`도 결국 `dayjs`를 쓰므로**(`@bbodek/utils`가 `utc` · `timezone` 플러그인을 얹어 `Asia/Seoul`로 고정) 같은 라이브러리를 한 겹 없이 직접 무는 쪽을 택했습니다. 근거와 대안 비교는 [components/calendar.md](./components/calendar.md) 「결정」에 있습니다.

  **플러그인은 얹지 않았습니다.** `utc` · `timezone`이 필요한 것은 「오늘」 판정인데, biz-ui `CalendarDayButton`에는 `today` 축이 없고 `disabled` · `isHoliday`는 정책 COM-009가 **서버 판정**으로 못박아 DS가 현재 시각을 알 필요가 없습니다. 격자 계산 자체는 로컬 날짜 부품만 쓰므로 타임존과 무관합니다. `today`가 생기면 그때 플러그인을 함께 검토합니다.

  **`rollup.config.mjs`의 `external`에도 넣었습니다** — 「패키징 규칙」대로입니다. 빌드 후 `dist/index.es.js`에 `import d from "dayjs"` 1건만 남고 인라인되지 않은 것을 확인했습니다(dist 91KB).
- **클라이언트 경계를 패키지가 들고 있습니다 — 청크 세 개로 (DOTOLI-299 → 300).** 소비 앱이 Next App Router인데 그쪽은 컴포넌트 기본값이 서버라, 경계가 패키지 안에 없으면 **서버 컴포넌트가 배럴을 import하는 순간 깨집니다.** 실제로 걸리는 자리는 소비 앱의 폼팩터별 레이아웃 셸입니다 — `layout.tsx`가 서버 컴포넌트인데 그 셸을 이루는 것이 `BottomTab` · `HeaderBar`입니다.

  **소스에는 디렉티브를 붙이지 않았습니다.** rollup이 번들링 과정에서 모듈 단위 디렉티브를 걷어냅니다 — 같은 빌드에서 `react-loading-skeleton`의 `'use client'`에 대해 rollup이 정확히 그 경고를 냅니다(`Module level directives cause errors when bundled`). 출력 레벨에서 청크를 갈라 얹습니다. 구성과 확인 절차는 [CLAUDE.md](../../apps/biz-ui/CLAUDE.md) 「패키징 규칙」.

  **terser가 실제로 디렉티브를 지웠습니다.** `banner`만 넣은 첫 빌드에서 0건이었고 `compress.directives: false`를 함께 준 뒤 1건으로 남았습니다. 빌드는 양쪽 다 성공합니다.

- **DOTOLI-299는 배너 한 줄로 나갔다가 회귀를 냈습니다.** 남겨 두는 이유는 같은 실수를 다시 하지 않기 위해서입니다.

  단일 번들 최상단에 `'use client'`를 박았더니 컴포넌트뿐 아니라 **모든 export가 클라이언트 참조**가 됐습니다. `TYPOGRAPHY_VARIANTS`는 서버에서 `typeof`가 `"function"`(프록시)이고 `Object.keys()`가 `[]`, `formatCalendarYear()`는 호출 시 던집니다.

  **컴포넌트는 에러를 내지만 상수는 아무 말이 없습니다.** 빌드 통과, 콘솔 조용, 화면만 빕니다. `biz-ui-playground`를 App Router로 전환하고 나서야 잡혔고, 그것도 「섹션이 다 보인다」가 아니라 **섹션별 innerText 길이를 정상 상태와 대조**해서 드러났습니다(Typography 534 → 77).

  가장 나쁜 사례가 `Icon`입니다. `weight`를 타입으로 막아 놔서 소비자가 `ICON_WEIGHTS.FILL`을 **쓸 수밖에 없는데**, 서버 컴포넌트에서 그게 `undefined`이고 기본값으로 폴백돼 화면은 멀쩡해 보입니다. **DS가 강제한 사용법이 DS 때문에 조용히 깨지는** 형태였습니다.

- **경계는 손으로 가르지 않고 경로 규약으로 갈랐습니다.** `manualChunks`가 `constants/` · `types/` · `utils/`와 `variants/`를 `shared`로, 나머지 `components/` 아래를 `client`로 보냅니다. 배럴 52개를 두 목록으로 나누는 안도 있었지만, **「새 export를 올바른 배럴에 넣는다」는 규율은 틀렸을 때 조용히 깨지는 종류**라 — 바로 위 회귀가 그 실패 모드입니다 — 이미 [코드 규칙 1](../../apps/biz-ui/CLAUDE.md#코드-규칙)이 강제하는 파일 배치를 그대로 경계로 삼았습니다.

  **`.tsx`만 `client`로 지정하면 안 됩니다.** 처음에 그렇게 했더니 rollup이 **상수까지 `client` 청크로 끌고 들어가고** `index`를 2줄짜리 재수출 껍데기로 만들었습니다. 상수를 실제로 import하는 것이 컴포넌트뿐이라 그쪽으로 딸려간 것입니다. 서버 안전 모듈도 `shared`로 **명시 지정**해야 갈립니다.

- **파일별로 쪼개는 방식(`preserveModules`)은 택하지 않았습니다.** 청크 분리로 상수·유틸 문제가 풀린 뒤 남는 차이는 **`Typography` · `Flex` · `Icon` 같은 컴포넌트를 서버에 남길 수 있느냐** 하나입니다. 세 가지 이유로 안 남기는 쪽을 택했습니다.

  1. **되돌릴 수 있습니다.** 소비자 API는 어느 쪽이든 `import { CtaButton } from '@bbodek/biz-ui'`로 같고 내부 출력 구조만 다릅니다. 갇히지 않으므로 싼 쪽부터 갑니다.
  2. **이 앱에서는 이득이 크지 않습니다.** 서버 컴포넌트로 남길 수 있어야 이득인데, 소비 앱은 스택 결정 단계에서 이미 「화면 대부분이 무거운 클라이언트 인터랙션이라 `'use client'` 경계가 트리 최상단 가까이 올라가고 번들 감소는 크지 않다」고 판단해 두었습니다. `Divider`가 클라이언트 트리 안에서 쓰이면 어느 쪽이든 번들에 들어갑니다.

     **잃는 것이 무엇인지는 실측했습니다.** React 19의 react-server 빌드는 `use` · `useId` · `useMemo` · `useCallback`은 내보내고 `useState` · `useEffect` · `useRef` · `useSyncExternalStore`와 react-dom의 `createPortal`만 빠져 있습니다. 그래서 지시어가 없던 0.0.46에서도 **`Typography` · `Flex` · `Icon`은 서버 컴포넌트에서 정상 렌더됐습니다.** 지금은 셋 다 `client` 청크에 있습니다.

     **그런데 그걸 되찾아도 번들이 줄지 않습니다.** 플레이그라운드에서 버전을 고정하고 경계 위치만 바꿔 잰 값입니다 — 경계를 트리 최상단에 두면 First Load JS 131 kB, leaf까지 내리면 **143 kB로 오히려 늘었습니다.** 청킹 방식이 바뀐 효과일 수 있어 단정할 수는 없지만, 최소한 **「경계를 내리면 번들이 준다」는 기대가 이 앱에서는 실측으로 안 나타납니다.**
  3. **작업 범위가 설정 몇 줄에서 소스 66개로 늘어납니다.** 어느 컴포넌트가 클라이언트인지는 rollup이 알 수 없어 인터랙티브한 파일마다 직접 써야 하는데, **소스 디렉티브는 합치는 순간 걷히므로 「소스에 붙이기」와 「출력 쪼개기」는 한 세트입니다** — 따로 떼면 앞은 무효고, 뒤만 하면 표시가 하나도 없어 그대로 깨집니다(디렉티브 보존 설정도 별도로 필요합니다).

  **`preserveModules`의 남는 우위는 하나였습니다 — 규약에 기대지 않는다는 것.** 지금 구조는 「파일을 규약대로 둔다」에 의존하고 어기면 조용히 깨집니다. 그래서 **양쪽 방향을 각각 가드로 덮었습니다.**

  | 새는 방향 | 잡는 곳 |
  | --- | --- |
  | 상수가 `client`로 | 플레이그라운드 `/rsc` 카나리아 — 공개 상수를 서버에서 전수 검사 |
  | 훅이 `shared`로 | `scripts/verify-chunks.mjs` — `shared`가 `react`를 import하면 **빌드 실패** |

  둘은 서로 못 잡습니다. 앞은 소비자 코드에서만 드러나고 뒤는 산출물에서만 드러납니다. 가드가 실제로 실패하는지는 `/hooks/`를 일부러 서버 안전 목록에 넣어 확인했습니다.

  **갈아탈 신호는 둘입니다.** ① 소비 앱이 `Typography` · `Flex` · `Icon`을 서버 컴포넌트에 남기고 싶어질 때 ② 가드가 계속 걸릴 때 — 규약 의존이 실제로 감당이 안 된다는 뜻이므로 구조가 강제하는 쪽으로 넘어갑니다.

- **토큰에 프리픽스를 붙이지 않습니다.** 처음엔 internal-ui를 따라 `biz-`를 붙였다가 걷어냈습니다. internal-ui의 `in-`은 그쪽이 **다른 디자인시스템과 한 앱에서 공존**하느라 구분용으로 붙인 것이고, biz-ui는 그런 제약이 없습니다. 지금은 `--color-blue-500` · `text-body` · `safe-area-top`처럼 Tailwind 기본 토큰을 그대로 덮어쓰는 형태입니다. Storybook에서 internal-ui와 같이 로드돼도 **그쪽 토큰과는** 충돌하지 않습니다 — internal-ui는 자기 값을 전부 `in-`으로 갖습니다. 다만 internal-ui가 Tailwind 기본 토큰을 직접 쓰는 자리는 예외이고, DOTOLI-234의 `--color-black`이 실제로 그 사례입니다 (아래 참고).
- **`COLOR_VARIANTS`에만 `white`가 있고 `--color-white` 토큰은 없습니다.** Figma `base/white`가 `#ffffff`라 Tailwind 기본값을 그대로 쓰고 토큰을 만들지 않는다는 결정은 유지합니다. 다만 `Typography`의 `color` prop이 `ColorVariants`만 받아서, `OrderBoxCell`의 `inverse`(흰 글자)를 표현하려면 variants 미러에 항목이 필요했습니다. DOTOLI-229에서 `COLOR_VARIANTS.WHITE`와 safelist(`{bg,text,fill,placeholder,border}-white`)만 추가했습니다. internal-ui도 `COLOR_VARIANTS`에 `WHITE`를 갖고 있습니다.
- **`base/black`은 토큰을 만들었고 `base/white`는 만들지 않았습니다.** 갈린 이유는 Tailwind 기본값과 같은지 하나뿐입니다 — Figma `base/white`는 `#ffffff`라 기본값 그대로면 되지만, `base/black`은 `#101828`이라 Tailwind `black`(`#000000`)과 다릅니다. DOTOLI-234에서 `--color-black`으로 **Tailwind 기본 토큰을 덮어썼습니다** (다른 컬러 스케일과 같은 방식). 부작용은 Storybook 하나입니다 — biz-ui 스타일을 로드하는 앱이 Storybook뿐이고, 거기서 internal-ui의 `FileThumbnailHoverOverlay`가 쓰는 `bg-black/40`이 `rgba(0,0,0,.4)` → `rgba(16,24,40,.4)`로 바뀝니다. 40% 반투명 오버레이라 눈에 띄지 않고, 실제 소비 앱에는 biz-ui 스타일이 들어가지 않아 영향이 없습니다. 이름을 `base-black` 식으로 피하면 충돌은 사라지지만 「컬러 이름은 Figma 명명 그대로」 규칙과 `white`의 처리에서 어긋납니다. **internal-ui는 같은 `#101828`을 `--color-in-black`으로 갖고 있습니다**(`apps/internal-ui/src/styles/theme.css:2`) — 같은 값을 프리픽스로 피해 간 셈인데, 그건 그쪽이 다른 DS와 한 앱에서 공존하느라 전 토큰에 `in-`을 붙인 결과지 이 문제를 따로 판단한 게 아닙니다. 덮어쓰기를 재검토하게 되면 이 선례부터 봅니다.
- **`COLOR_VARIANTS.BLACK`은 소비처보다 먼저 넣었습니다.** `IconCircle`은 `'bg-black text-blue-400'` 리터럴을 쓰고 미러를 거치지 않으므로, 이 항목과 safelist의 `-black` 5종이 없어도 렌더에는 지장이 없습니다. 그래도 넣은 이유는 **토큰만 있고 미러가 없으면 `Typography`의 `color`로 도달할 수 없는 색이 생기기 때문**입니다 — `--color-black`은 CSS에 존재하는데 DS의 타입 API로는 못 쓰는 상태가 됩니다. `WHITE`(DOTOLI-229)는 반대 순서였습니다(소비처가 먼저 필요해서 추가). safelist 비용은 5개라 267개 대비 무시할 수준입니다.
- **컬러/타이포 이름은 Figma 명명을 그대로 씁니다.** `blue`가 메인 컬러지만 `primary`로 개명하지 않았고, 타이포는 `body-16-m` 식이 아닌 `heading-1` / `body-lg` 같은 시맨틱 이름입니다. 디자인 문서와 코드가 어긋나는 비용이 더 큽니다.
- **Figma 페이지 설명 텍스트와 바인딩된 변수가 어긋나는 곳이 있습니다.** 전부 변수/렌더 결과를 따랐습니다. ① `label` 3종은 설명이 `-2%`지만 실제 `-0.03em` ② `caption`은 설명이 Medium이지만 실제 `font-weight: 600` ③ Heading 섹션 설명이 4단계라고 했지만 실제 5단계 — **③은 해소됐습니다.** 지금 설명(`78:14`)은 5단계라고 적고 있습니다.
- **타이포 토큰 18종을 Typography 페이지와 전수 재대조하고 `heading-1`을 36px → 34px로 고쳤습니다 (2026-08-14, DOTOLI-236 중).** `heading-4`의 letter-spacing을 확인하려고 페이지 메타데이터를 받은 김에 전부 맞춰 봤고, 어긋난 것은 `heading-1` 크기 하나였습니다. **바인딩 변수가 `fontSize/34`**입니다(샘플 텍스트 `146:558` · `146:564`) — 설명 텍스트가 낡은 게 아니라 **토큰이 뒤처진 것**이었고, 디자이너가 페이지를 2026-08-11경 편집한 것과 맞아떨어집니다. heading 2~5도 변수 레벨로 재확인해 전부 일치합니다(`fontSize/{28,24,20,18}`). body 계열 5종 · body-lg 2종도 일치하고, `label` 3종과 `caption`은 위 ①②로 이미 정리된 건입니다.
- **`heading-1` 정정에 회귀 위험이 없었던 이유는 biz-ui 안에 쓰는 컴포넌트가 없어서입니다.** 토큰 · TS 미러 · safelist에만 있었습니다. **다만 `text-heading-1` 클래스는 npm으로 공개돼 있어, 소비 앱이 직접 쓰고 있었다면 36 → 34px로 바뀝니다.** 값 자체가 원래 틀렸던 것이라 되돌리지 않습니다.
- **Figma 타이포 변수의 letter-spacing 숫자는 px가 아니라 %입니다.** heading 전 계열이 `letterSpacing/neg1`(= `-1`)을 물고 있고 토큰은 `-0.01em`이며, 렌더값이 폰트 크기의 정확히 1%입니다(34px → `-0.34px`, 20px → `-0.2px`). **Figma codegen이 이 숫자를 px로 잘못 찍어 내보내는 경우가 있으니**(`heading-4`를 쓰는 노드에서 `tracking-[-1px]` → [components/info.md](./components/info.md)) codegen 출력만 보고 토큰을 고치지 않습니다.
- **`Blue 50`만 Figma 변수로 바인딩되어 있지 않습니다.** 스와치 렌더값 `#f1f6ff`를 넣었습니다. 디자이너에게 변수 바인딩 요청 필요.
- **`text-*`에 `/` 수식어를 쓰지 않습니다.** 컬러(`text-blue-500/50` = 투명도)와 타이포(`text-body/50` = line-height)에서 뜻이 다르고, 타이포 쪽은 `font-weight`·`letter-spacing`이 사라집니다. 경고 없이 컴파일되므로 규칙으로 막습니다.
- **safelist에 `hover:` / `focus:` / `active:` variant를 넣지 않습니다.** variant는 컴포넌트 소스에 리터럴로 남아 `@source '../../dist'`가 스캔합니다 (`internal-ui`도 런타임 조합 사례 0건). 넣으면 생성 CSS가 minified 27.5KB → 97KB로 3.5배가 됩니다.
- **`@layer base`에 `input { font-size: 1rem }`을 두지 않습니다.** iOS 포커스 줌 방지용으로 넣었다가, Storybook에서 `internal-ui`와 공존할 때 `InputSearch`(14px)를 16px로 밀어올리는 회귀가 확인됐습니다. biz-ui 인풋은 `text-body`(=1rem)를 명시해 토큰으로 막습니다.
- **`Icon`의 `weight`를 타입으로 막았습니다.** `internal-ui`는 `weight?: \`${IconStyle}\``로 Phosphor 전체 웨이트를 허용하는데, biz-ui는 웹폰트를 3종만 import 하므로 나머지를 넘기면 아이콘이 렌더되지 않습니다. `ICON_WEIGHTS` 상수로 좁혀 컴파일 단계에서 걸리게 했습니다.
- **`Flex`는 `internal-ui` API를 그대로 포팅했습니다.** plan.md 태스크 상세엔 "`flex-{v,h}-stack` 유틸 기반"이라고 적었지만, 실제로는 `direction`·`align`·`justify`·`gap`·`wrap`·`basis`·`shrink`·`grow`·`flex`·`order` 전체를 옮겼습니다. 이미 검증된 API를 두고 축소판을 새로 설계하면 두 DS의 `Flex`가 다르게 동작해 혼란이 커집니다. `flex-{v,h}-stack` 유틸은 컴포넌트 내부 정렬용으로 계속 씁니다(`Icon`이 사용).
- **Phosphor 웨이트를 3개만 가져옵니다.** Figma 아이콘 페이지(`41:156`)가 Phosphor 그 자체이고 정의된 웨이트가 `Regular` · `Bold` · `Fill` 뿐입니다. `internal-ui`를 복사하면서 따라온 `duotone` · `light` · `thin` 은 뺐습니다 — 디자인에 없는데 웨이트당 woff 500KB 안팎에 svg 폴백이 3MB 가까이 됩니다. 모바일 WebView 타깃에서 그냥 낭비입니다.
- **`internal-ui`의 safe-area 오타를 옮기지 않았습니다.** 원본에 `constant(in-safe-area-inset-top)` · `env(afe-area-inset-top)` 오타가 있습니다 (`apps/internal-ui/src/styles/utilities.css:17-25`). biz-ui는 WebView에서 동작하므로 실제로 깨지는 부분이라 바로잡아 작성했습니다.
- **`@config`는 하나만 둡니다.** Tailwind v4에서 `@config`는 레거시 JS config 로더이고 복수 선언이 안전하지 않습니다. biz-ui의 content 스캔은 `globals.css`의 `@source`가 담당하므로 storybook `globals.css`에는 `internal-ui`의 `@config`만 남깁니다.

## 파일 구조

```
docs/
└── biz-ui/
    ├── plan.md               # 미착수 티켓의 계획. 끝난 티켓은 걷어냄
    ├── frontend.md           # 환경 세팅 기록 (이 문서)
    └── components/
        ├── button.md         # Button 계열 구현 기록
        ├── input.md          # Input 계열 구현 기록
        ├── badge.md          # Badge 구현 기록
        └── order.md          # Order 계열 구현 기록

apps/
├── biz-ui/
│   ├── CLAUDE.md              # biz-ui 개발 규칙 · 문서 지도
│   ├── README.md
│   ├── package.json
│   ├── rollup.config.mjs
│   ├── tailwind.config.js
│   └── src/
│       ├── index.ts
│       ├── components/
│       │   ├── index.ts            # 디렉토리별 명시적 배럴
│       │   ├── Icon/               # Icon.tsx · constants/ · types/
│       │   ├── Typography/         # Typography.tsx · constants/ · types/
│       │   └── Flex/               # Flex.tsx · constants/ · types/
│       ├── styles/
│       │   ├── globals.css         # exports "./styles" 진입점
│       │   ├── base.css            # @layer base 리셋 + 모바일 대응
│       │   ├── theme.css           # @theme 토큰 (color 50 / typography 18)
│       │   ├── safelist.css        # @source inline
│       │   └── utilities.css       # @utility *
│       └── variants/
│           ├── index.ts
│           ├── color/
│           │   ├── variant.ts
│           │   ├── types/
│           │   └── index.ts
│           └── typography/
│               ├── variant.ts
│               ├── types/
│               └── index.ts
└── storybook/
    └── src/
        ├── styles/
        │   └── globals.css         # @import '@bbodek/biz-ui/styles' 추가
        └── stories/
            └── biz-ui/
                ├── Colors.mdx      # core/biz-ui/Colors
                ├── Icon.stories.tsx
                ├── Typography.stories.tsx
                └── Flex.stories.tsx
```

위 `apps/` 트리는 **환경 세팅 범위(DOTOLI-213~218)** 시점의 것입니다. 이후 추가된 컴포넌트 계열은 각 계열 문서를 봅니다.
