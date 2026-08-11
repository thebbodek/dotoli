# biz-ui 디자인시스템 환경 세팅 - 프론트엔드 구현 문서

## 개요

뽀득 비즈파트너용 신규 디자인시스템 `@bbodek/biz-ui`를 dotoli 모노레포에 추가한 작업입니다. 컴포넌트 구현 이전 단계인 **패키지 스캐폴딩 · 스타일 레이어 · 디자인 토큰 · Storybook 연동**까지를 범위로 합니다.

이 문서는 **환경 세팅 범위(DOTOLI-213~218)** 까지만 다룹니다. 이후 컴포넌트 계열은 [`components/`](./components) 아래 계열별 문서에 기록합니다.

| 문서                                                 | 성격                  |
| ---------------------------------------------------- | --------------------- |
| [apps/biz-ui/CLAUDE.md](../../apps/biz-ui/CLAUDE.md) | biz-ui 개발 규칙      |
| [components/button.md](./components/button.md)       | Button 계열 구현 기록 |
| [components/input.md](./components/input.md)         | Input 계열 구현 기록  |
| frontend.md (이 문서)                                | 환경 세팅 기록        |
| [plan.md](./plan.md)                                 | 티켓 계획             |

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
| 루트 스크립트     | 루트 `package.json`에 `biz` 필터 스크립트 추가 (`in` / `ut` / `hooks` 컨벤션)                                                                             |
| 스타일 레이어     | `globals.css`가 폰트 import + `base` / `theme` / `safelist` / `utilities` 4개 레이어를 묶고 `@source '../../dist'`로 컴포넌트를 스캔                      |
| 컬러 토큰         | Figma Color 페이지 기준 `--color-{blue,red,yellow,green,gray}-{50…900}` 50개                                                                          |
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
| `--breakpoint-*` · `--container-*`         | 모바일 기준 재설계 필요. 디바이스 매트릭스 확정 대기                                                                                    |
| `--animate-*`                              | Figma 모션 정의 대기                                                                                                                    |
| `--radius-*` · `--shadow-*`                | **완료** — DOTOLI-227에서 Figma 스케일 확정분을 일괄 추가 (radius 6단계 + `rounded-full`, shadow 6단계) → [components/input.md](./components/input.md) |
| `variants/{radius,shadow,container}`       | 컴포넌트가 prop으로 노출하지 않아 디렉토리 미생성. `--shadow-20`도 클래스로만 씀 (`variants/`는 prop union이 필요할 때만 만듦)          |
| Typography 스토리                          | `internal-ui`와 동일하게 `Typography` 컴포넌트가 생기는 시점에 컴포넌트 스토리로 추가. 별도 Foundations 페이지는 두지 않음              |
| `CtaButton`                                | DOTOLI-219로 구현 완료. 이 문서 범위 밖입니다 → [components/button.md](./components/button.md)                                          |
| `Portal` · `components/shared/`            | 오버레이(BottomSheet · Modal · Toast) 작업 시점에 생성. 쓰는 곳 없이 먼저 만들지 않음                                                   |
| Figma 문서 텍스트 오기 3건                 | 디자이너 확인 필요 (아래 특이사항 참고)                                                                                                 |

### 특이사항

- **`internal-ui`와 완전 독립입니다.** `@bbodek/hooks` → `@bbodek/utils` → `@bbodek/internal-ui` 의존 체인이 있어 hooks 하나만 물려도 internal-ui 전체가 딸려옵니다. biz-ui는 서드파티만 직접 의존합니다.
- **토큰에 프리픽스를 붙이지 않습니다.** 처음엔 internal-ui를 따라 `biz-`를 붙였다가 걷어냈습니다. internal-ui의 `in-`은 그쪽이 **다른 디자인시스템과 한 앱에서 공존**하느라 구분용으로 붙인 것이고, biz-ui는 그런 제약이 없습니다. 지금은 `--color-blue-500` · `text-body` · `safe-area-top`처럼 Tailwind 기본 토큰을 그대로 덮어쓰는 형태입니다. Storybook에서 internal-ui와 같이 로드돼도 그쪽은 `in-` 프리픽스라 충돌하지 않습니다.
- **컬러/타이포 이름은 Figma 명명을 그대로 씁니다.** `blue`가 메인 컬러지만 `primary`로 개명하지 않았고, 타이포는 `body-16-m` 식이 아닌 `heading-1` / `body-lg` 같은 시맨틱 이름입니다. 디자인 문서와 코드가 어긋나는 비용이 더 큽니다.
- **Figma 페이지 설명 텍스트와 바인딩된 변수가 3곳 어긋납니다.** 셋 다 변수/렌더 결과를 따랐습니다. ① `label` 3종은 설명이 `-2%`지만 실제 `-0.03em` ② `caption`은 설명이 Medium이지만 실제 `font-weight: 600` ③ Heading 섹션 설명은 4단계라고 하지만 실제 heading-1(36px)~heading-5(18px) 5단계.
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
    ├── plan.md
    ├── frontend.md            # 환경 세팅 기록 (이 문서)
    └── components/
        └── button.md          # Button 계열 구현 기록

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
