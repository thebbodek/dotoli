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

- `@bbodek/hooks` → `@bbodek/utils` → `@bbodek/internal-ui` 의존 체인이 존재합니다(`apps/utils/package.json`의 `"@bbodek/internal-ui": "^0.0.115"`). hooks 하나만 물려도 internal-ui 전체가 딸려옵니다. 독립성을 실제로 지키기 위해 biz-ui는 서드파티(`clsx`, `es-toolkit`, `@floating-ui/react`, `@phosphor-icons/*`, `pretendard`)만 직접 의존합니다.
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

Button 계열 후속 3종은 신규 베이스 컴포넌트 없이 바로 착수 가능합니다 — `Icon` · `ButtonIcon` · `BUTTON_TOUCH_TARGET_STYLE`이 이미 있습니다. 권장 순서는 Filter → FloatingPill → IconButton입니다.

DOTOLI-224로 Figma Button 섹션이 전부 끝나고 DOTOLI-226부터 Input 계열입니다. InputField는 Button 계열 산출물을 그대로 물어 씁니다 — 트레일링 아이콘은 `IconButton`(`sm`=24px), `verify`의 확인 버튼은 `CtaButton`(`sm`=32px)이 크기까지 정확히 맞습니다.

`base/white`는 Filter에서 **별도 토큰을 만들지 않고 Tailwind 기본 `white`를 쓰는 것으로 확정**했습니다 (Figma `base/white`가 `#ffffff`로 동일). FloatingPill · IconButton도 이 결정을 따릅니다 — [`components/button.md`](./components/button.md) 「계열 공통 결정」.

---

## 태스크 상세

### 1. 패키지 생성 및 빌드 환경 구성

`apps/internal-ui`의 파일 세트를 복제하되 `@bbodek/*` 의존을 걷어냅니다.

**사전 점검 (작업 시작 전)**

| 항목                                                    | 확인 방법                                              | 상태                |
| ------------------------------------------------------- | ------------------------------------------------------ | ------------------- |
| `@bbodek/biz-ui` 이름 미점유                            | `npm view @bbodek/biz-ui` → 404                        | ✅ 확인 완료 (404)  |
| NPM_TOKEN이 `@bbodek` 스코프에 신규 패키지 publish 가능 | npm org 권한 (Automation 토큰 + write)                 | ✅ 확인 완료 (`0.0.1` 배포됨) |
| 신규 스코프 패키지 public 배포                          | `.changeset/config.json`의 `"access": "public"`이 커버 | ✅ 별도 설정 불필요 |

**생성 파일**

| 파일                                                                | 내용                                                                                                               |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `apps/biz-ui/package.json`                                          | 아래 스펙                                                                                                          |
| `apps/biz-ui/tsconfig.json`                                         | `apps/internal-ui/tsconfig.json` 동일                                                                              |
| `apps/biz-ui/tsconfig.build.json`                                   | `apps/internal-ui/tsconfig.build.json` 동일                                                                        |
| `apps/biz-ui/eslint.config.mjs`                                     | `apps/internal-ui/eslint.config.mjs` 동일                                                                          |
| `apps/biz-ui/rollup.config.mjs`                                     | `createRollupConfig({ plugins: [postcss({extract:true,minimize:true,modules:false}), image(), json()], srcPath })` |
| `apps/biz-ui/next.config.ts`, `.gitignore`, `.npmignore`, `LICENSE` | internal-ui 복사                                                                                                   |
| `apps/biz-ui/tailwind.config.js`                                    | content 글롭을 `@bbodek/biz-ui/dist`로                                                                             |
| `apps/biz-ui/src/index.ts`                                          | `export * from '@/components'; export * from '@/variants';`                                                        |
| `apps/biz-ui/src/components/index.ts`, `src/variants/index.ts`      | 빈 배럴로 시작                                                                                                     |

**package.json 스펙**

- `name: "@bbodek/biz-ui"`, `version: "0.0.0"`, `type: "module"`, `license: "MIT"`
- `files: ["dist", "tailwind.config.js", "src/styles"]`
- `exports`: `"."` → `dist/index.es.js` + `dist/index.d.ts`, `"./styles"` → `src/styles/globals.css`, `"./tailwind-config"` → `tailwind.config.js`
- `scripts`: internal-ui와 동일 (`dev` / `build` / `lint`)
- `dependencies`: `clsx`, `es-toolkit`, `@floating-ui/react`, `@phosphor-icons/core`, `@phosphor-icons/web`, `pretendard`
- `peerDependencies`: `react ^19.2.1`, `react-dom ^19.2.1`, `tailwindcss ^4`
- `devDependencies`: `@bbodek/eslint-config`, `@dotoli/rollup-config`, `@dotoli/typescript-config` (`workspace:*`) 외 internal-ui와 동일
- `prettier: "@bbodek/prettier-config"`

**수정 파일**

| 파일                  | 변경                                                                                |
| --------------------- | ----------------------------------------------------------------------------------- |
| `package.json` (루트) | `scripts`에 `"biz": "pnpm --filter=@bbodek/biz-ui"` 추가 (`in`/`ut`/`hooks` 컨벤션) |

**주의사항**

- `main`/`module` 필드는 두지 않습니다. ESM 전용 `exports`만 쓰는 것이 이 레포 컨벤션입니다.
- `publishConfig`는 라이브러리 패키지에 없습니다. 추가하지 않습니다.
- eslint config가 `parserOptions.project: ['./tsconfig.json']`을 요구하므로 패키지 루트 `tsconfig.json`은 필수입니다.
- `turbo.json`은 수정 불필요합니다 — `build`/`lint`/`dev` 태스크가 이미 범용입니다.
- 루트 `build`, `release:build`의 `--filter=!...` 체인도 수정 불필요합니다 (배포 대상이므로).
- `.changeset/config.json`의 `ignore`, `.githooks/scripts/changeset.js`의 `IGNORE_DIRS` 모두 **수정하지 않습니다** (배포 대상이므로 기본 동작이 맞습니다).
- 첫 버전은 `0.0.0`으로 두어 첫 릴리즈에서 `0.0.1`이 되게 합니다.

**검증**

```bash
pnpm install && pnpm biz build && pnpm biz lint
```

`apps/biz-ui/dist/index.es.js` + `index.d.ts` 생성, 커밋 후 `.changeset/`에 `@bbodek/biz-ui: patch` 항목 자동 생성 확인.

**참고 위치**

- 자동 changeset 생성: `.githooks/scripts/changeset.js:5-6`
- 릴리즈 워크플로: `.github/workflows/release.yml`
- 패키지 템플릿: `apps/internal-ui/package.json`

---

### 2. 스타일 레이어 및 디자인 토큰 구성

internal-ui와 동일하게 Tailwind v4 CSS-first 방식입니다. `@theme` 블록에 토큰을 정의하되 **프리픽스는 붙이지 않습니다.** internal-ui의 `in-`은 그쪽이 다른 디자인시스템과 공존하느라 구분용으로 붙인 것이라 biz-ui에는 해당하지 않습니다.

**생성 파일**

| 파일                               | 내용                                                                                                                               |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `src/styles/globals.css`           | pretendard·phosphor 폰트 import + `./base.css`, `./theme.css`, `./safelist.css`, `./utilities.css` import + `@source '../../dist'` |
| `src/styles/base.css`              | `@layer base` 리셋 (internal-ui 기준 + 모바일 항목 추가)                                                                           |
| `src/styles/theme.css`             | `@theme { }` — 골격 먼저, 값은 Figma 확정 후                                                                                       |
| `src/styles/safelist.css`          | `@source inline(...)` — prefix를 `{biz}`로                                                                                         |
| `src/styles/utilities.css`         | `@utility *`                                                                                                                   |
| `src/variants/{color,typography}/` | 각 디렉토리에 `variant.ts` + `types/index.ts` + `index.ts`                                                                         |

`radius` / `shadow` / `container` variants는 Figma에 해당 토큰이 없어 생성하지 않았습니다.

**모바일 / WebView 대응**

| 항목          | 처리                                                                                                                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| safe-area     | `@utility safe-area-{top,bottom,y,left,right}` — `env(safe-area-inset-*)`                                                                                                                                      |
| 뷰포트 높이   | `100vh` 금지, `100dvh` 기준 유틸 제공                                                                                                                                                                              |
| 바운스 스크롤 | 루트 `overscroll-behavior: none`                                                                                                                                                                                   |
| 탭 하이라이트 | `-webkit-tap-highlight-color: transparent`                                                                                                                                                                         |
| 터치 타겟     | 인터랙티브 요소 최소 44px 규칙을 컴포넌트 사이즈 토큰에 반영                                                                                                                                                       |
| 텍스트 확대   | `-webkit-text-size-adjust: 100%`                                                                                                                                                                                   |
| iOS 포커스 줌 | `@layer base`의 `input { font-size: 1rem }` 은 **쓰지 않습니다.** Storybook에서 internal-ui와 공존할 때 `InputSearch`(14px)를 16px로 밀어올립니다. biz-ui 인풋은 `text-body`(=1rem)를 명시해 토큰으로 막습니다 |
| breakpoint    | mobile-first. `--breakpoint-*` 를 모바일 기준으로 재설계                                                                                                                                                       |

**토큰 스케일** (Figma 확정분)

| 그룹       | 토큰                                                                               | 개수 |
| ---------- | ---------------------------------------------------------------------------------- | ---- |
| Color      | `--color-{blue,red,yellow,green,gray}-{50,100,…,900}`                          | 50   |
| Typography | `--text-*` (+ `--line-height` / `--font-weight` / `--letter-spacing` 서브프롭) | 18   |

타이포그래피 이름은 internal-ui의 `body-16-m` 식이 아니라 Figma가 정의한 시맨틱 이름을 그대로 씁니다 — `heading-1`~`heading-4` (+ `-bold`), `heading-5`, `body-lg` / `body-lg-semibold`, `body` / `body-semibold` / `body-bold`, `label` / `label-semibold` / `label-bold`, `caption`.

`body-lg-semibold`는 DOTOLI-223 이후 디자이너 요청으로 추가했습니다 (`body-lg`에서 웨이트만 600). 그때 body 계열 letter-spacing을 -3%로 일괄 확인했고 전부 이미 -3%였습니다.

컬러 스케일 이름도 Figma의 `--blue-*` / `--gray-*` 규약을 따릅니다. Blue가 메인 컬러이지만 `primary`로 개명하지 않습니다.

`--radius-*`, `--breakpoint-*`, `--container-*`, `--animate-*`는 Figma 정의를 기다립니다. `--shadow-*`는 이후 Figma에 `shadow/shadow-20`이 생겨 DOTOLI-223에서 `--shadow-20` 하나를 추가했습니다.

`variants/`는 토큰의 TS 미러입니다. internal-ui의 `COLOR_VARIANTS`, `TYPOGRAPHY_VARIANTS` + `TYPOGRAPHY_PREFIX` / `TYPOGRAPHY_STYLES_MAPPER` 패턴을 그대로 따릅니다 (prefix는 `text-`).

**Figma 문서 텍스트와 실제 변수 값이 어긋나는 지점** — 셋 다 바인딩된 변수/렌더 결과를 따랐습니다.

| 토큰                                      | 문서 텍스트                           | 실제 변수 (채택)                           |
| ----------------------------------------- | ------------------------------------- | ------------------------------------------ |
| `label` · `label-semibold` · `label-bold` | Letter -2%                            | `-0.03em` (14px에서 `tracking: -0.42px`)   |
| `caption`                                 | Pretendard Medium                     | `font-weight: 600` (SemiBold)              |
| Heading 섹션 설명                         | heading-1(28px)~heading-4(18px) 4단계 | 실제 heading-1(36px)~heading-5(18px) 5단계 |

**주의사항**

- internal-ui의 `in-safe-area-top` / `in-safe-area-bottom`에 오타가 있습니다 (`constant(in-safe-area-inset-top)`, `env(afe-area-inset-top)` — `apps/internal-ui/src/styles/utilities.css:21-31`). 복사 시 그대로 옮기지 않습니다. biz-ui는 WebView 안에서 동작하므로 이 부분이 실제로 깨집니다.
- `@source '../../dist'` 상대경로는 배포 시 `node_modules/@bbodek/biz-ui/src/styles` → `../../dist`로 맞아떨어집니다. 경로를 그대로 유지합니다.
- 토큰에 프리픽스를 붙이지 않습니다. biz-ui 토큰은 Tailwind 기본 팔레트를 덮어씁니다(`--color-blue-500` 등). Storybook에서 internal-ui와 공존해도 그쪽은 `in-` 프리픽스라 충돌하지 않습니다.
- 상수는 UPPER_SNAKE + `as const`. 매퍼는 `_MAPPER`, 스타일 묶음은 `_STYLES` 접미사를 씁니다.
- 타입은 `variant.ts`에서 파생시킵니다 (`typeof X[keyof typeof X]`). 중복 선언하지 않습니다.
- **Figma 미확정 시** 스타일 파일 골격까지만 진행하고 토큰 값 채우기는 뒤로 미룹니다. 파일이 분리되어 있어 이 단계만 지연 가능합니다.
- `--text-*`가 폰트 사이즈 토큰과 컬러 유틸(`text-blue-500`)을 함께 쓰지만, 타이포 이름(`body`, `heading-1`…)과 컬러 이름(`blue-500`…)이 겹치지 않아 충돌하지 않습니다. 앞으로 토큰을 추가할 때 이 불변식을 깨지 않아야 합니다.
- 단, `/` 수식어는 두 쪽에서 의미가 다릅니다. `text-blue-500/50`은 투명도지만 `text-body/50`은 **line-height 12.5rem**이 되고, `text-body-bold/6`은 `font-weight`·`letter-spacing`을 통째로 버립니다. 경고 없이 컴파일되므로 타이포 클래스에는 `/`를 쓰지 않습니다.
- safelist에 `{hover:,focus:,active:,}` variant를 넣지 않습니다. variant는 컴포넌트 소스에 리터럴로 남아 `@source '../../dist'`가 스캔합니다 (internal-ui도 런타임 조합 사례가 0건). 넣으면 생성 CSS가 minified 27.5KB → 97KB로 3.5배가 됩니다.

**참고 위치**

- 토큰 정의 예시: `apps/internal-ui/src/styles/theme.css`
- variants 구조: `apps/internal-ui/src/variants`

---

### 3. Storybook 연동 및 문서화

**수정 파일**

| 파일                                    | 변경                                                                    |
| --------------------------------------- | ----------------------------------------------------------------------- |
| `apps/storybook/package.json`           | `dependencies`에 `"@bbodek/biz-ui": "workspace:*"` 추가                 |
| `apps/storybook/src/styles/globals.css` | `@import '@bbodek/biz-ui/styles';` 를 internal-ui import 다음 줄에 추가 |

globals.css 최종 형태:

```css
@import 'tailwindcss';
@import '@bbodek/internal-ui/styles';
@import '@bbodek/biz-ui/styles';
@config '@bbodek/internal-ui/tailwind-config';
```

**생성 파일**

| 파일                                           | 내용                                                                                                                     |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `apps/storybook/src/stories/biz-ui/Colors.mdx` | 컬러 토큰 확인용. `Foundations/` 하위 폴더 없이 internal-ui와 같은 평면 구조                                             |
| `apps/biz-ui/README.md`                        | npm 소비자용. 설치, peerDependencies, Tailwind 연결(standalone / monorepo), WebView 사용 시 viewport meta·safe-area 안내 |
| `docs/biz-ui/frontend.md`                      | 세팅 완료 후 구현 현황 정리                                                                                              |

**주의사항**

- **`@config`는 하나만 둡니다.** Tailwind v4에서 `@config`는 레거시 JS config 로더이고 복수 선언이 안전하지 않습니다. biz-ui의 content 스캔은 `globals.css`의 `@source '../../dist'`가 담당하므로 두 번째 `@config`는 불필요합니다. biz-ui의 `tailwind.config.js`는 standalone 소비자용으로만 export 해 둡니다.
- 두 패키지가 pretendard/phosphor를 각자 `@import` 하지만 동일 specifier라 postcss-import가 dedupe 합니다. 빌드 후 CSS에 중복이 생기는지 실제로 확인합니다.
- `base.css`의 `@layer base` 리셋이 양쪽에서 중복 적용됩니다. 동일 선언이면 무해하나, biz-ui가 모바일용으로 다르게 잡은 항목(`overscroll-behavior` 등)은 **나중에 import 되는 biz-ui가 이깁니다.** 의도한 결과인지 확인합니다.
- 스토리 `meta.title`은 `core/biz-ui/<Name>` 형식입니다 (`.frontend-rules/storybook.md`).
- `apps/internal-ui/README.md`의 Tailwind 연결 섹션을 기준으로 하되, biz-ui는 `@config` 없이 `@import '@bbodek/biz-ui/styles'` 한 줄이면 되도록 안내합니다.

**검증**

```bash
pnpm build && pnpm sb build
```

기존 `core/internal-ui/*` 스토리가 시각적으로 변하지 않는지(테마 공존 회귀), `core/biz-ui/Foundations`가 정상 렌더되는지 확인합니다.

---

### 4. 토큰 프리픽스 제거 및 컴포넌트 컨벤션 문서화

환경 세팅 때 internal-ui를 참고하면서 토큰에 `biz-` 프리픽스를 붙였는데, internal-ui의 `in-`은 **그쪽이 다른 디자인시스템과 한 앱에서 공존**하느라 구분용으로 붙인 것이라 biz-ui엔 해당하지 않습니다. 전량 제거합니다.

**수정 파일**

| 파일                                     | 변경                                                                                     |
| ---------------------------------------- | ---------------------------------------------------------------------------------------- |
| `src/styles/theme.css`                   | `--color-biz-*` → `--color-*`, `--text-biz-*` → `--text-*`                               |
| `src/styles/utilities.css`               | `@utility biz-*` → `@utility *`                                                          |
| `src/styles/safelist.css`                | `{biz}` 그룹 제거. `{biz-{...}}` 중첩 그룹은 평면 그룹으로 재작성                        |
| `src/styles/base.css`                    | `var(--color-biz-gray-400)` → `var(--color-gray-400)`                                    |
| `src/variants/color/variant.ts`          | `COLOR_TYPE_PREFIXES` 5종에서 `-biz` 제거                                                |
| `src/variants/typography/variant.ts`     | `TYPOGRAPHY_PREFIX`를 `text-`로                                                          |
| `README.md`                              | 유틸/클래스 예시 갱신                                                                    |
| `docs/biz-ui/plan.md`, `frontend.md`     | 프리픽스 결정 뒤집기 반영. NPM_TOKEN 권한 "미확인" → 확인 완료(`0.0.1` 배포됨)           |

**생성 파일**

| 파일                        | 내용                                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------ |
| `apps/biz-ui/CLAUDE.md` | biz-ui 개발 규칙. 컴포넌트 API 축 · 스타일 · 패키징 규칙을 여기 한 곳에서 정의합니다 |

**주의사항**

- `biz-ui`(패키지명 · `core/biz-ui/*` 스토리 경로 · `apps/biz-ui` 경로)는 **건드리지 않습니다.** 프리픽스 `biz-`만 제거합니다. 일괄 치환 시 `biz-(?!ui)` 형태로 막습니다.
- 문서 산문에 백틱으로 감싼 `` `biz-` `` 표기가 있어 일괄 치환이 문장을 망가뜨립니다. 결정 사항을 서술하는 문장은 먼저 손으로 고친 뒤 나머지를 치환합니다.
- 프리픽스를 떼면 biz-ui 토큰이 **Tailwind 기본 팔레트를 덮어씁니다**(`--color-blue-500` 등). 의도된 동작입니다. internal-ui는 `in-` 프리픽스라 Storybook 공존 시에도 충돌하지 않습니다.
- `apps/storybook/src/stories/hooks/useForm.stories.tsx:60,68`이 생 Tailwind 클래스(`text-red-400`·`border-gray-600`)를 써서 이제 biz-ui 팔레트로 렌더됩니다. 훅 데모라 무해하지만 인지는 하고 갑니다.

**검증**

```bash
pnpm biz build && pnpm biz lint && pnpm build
```

Storybook에서 `--color-blue-500`이 `#3182f6`, `--color-biz-blue-500`이 미정의, `text-body`가 16px/700, `touch-target`이 44px로 나오는지 확인합니다. `.biz-*` 셀렉터가 0건인지, internal-ui의 `in-flex-v-stack` · `--text-in-body-16-m`이 그대로인지도 함께 봅니다.

---

### 5. 기반 프리미티브 컴포넌트 구현 (Icon · Typography · Flex)

`src/components/index.ts`가 빈 배럴입니다. 뒤따라오는 모든 컴포넌트가 쓰는 프리미티브 3종을 먼저 세웁니다.

**생성 파일**

| 컴포넌트     | 구성                                                                | 비고                                                                              |
| ------------ | ------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `Icon`       | `Icon.tsx` · `index.ts` · `types/index.ts`                          | Phosphor 웹폰트 클래스 조합(`ph-{key}` + `ph-{weight}`). 웨이트는 `regular`·`bold`·`fill` 3종만 |
| `Typography` | `Typography.tsx` · `index.ts` · `types/index.ts`                    | `TYPOGRAPHY_STYLES_MAPPER`를 감싸고 `as` prop으로 태그 교체                        |
| `Flex`       | `Flex.tsx` · `index.ts` · `types/index.ts`                          | `flex-{v,h}-stack` 유틸 기반 레이아웃 프리미티브                                   |

**주의사항**

- `apps/internal-ui/src/components/{Icon,Typography,Flex}`를 기준으로 삼되 `in-` 클래스는 프리픽스 없는 것으로 바꿉니다.
- `Icon`은 `@phosphor-icons/core`의 `IconStyle` · `PhosphorIcon` 타입을 씁니다. 기본 웨이트는 internal-ui와 동일하게 `BOLD`.
- `globals.css`가 이미 `@phosphor-icons/web`의 `bold` · `fill` · `regular` 3종만 import 합니다. `duotone`/`light`/`thin`을 쓰는 API를 노출하지 않습니다.
- 서브 컴포넌트가 없으므로 **폴더 승격 없이** 파일 3개로 시작합니다.
- 타입/상수는 `.tsx` 안에 직접 선언하지 않고 `types/`·`constants/`로 분리 후 `@/` 절대경로로 import 합니다.

**Storybook**

`apps/storybook/src/stories/biz-ui/`에 `Icon.stories.tsx` · `Typography.stories.tsx` · `Flex.stories.tsx`. `meta.title`은 `core/biz-ui/<Name>`.

Typography 스토리가 생기면서 타이포 토큰 전량이 시각적으로 확인 가능해집니다 (별도 Foundations 페이지는 두지 않는다는 기존 결정 유지).

---

### 6. CtaButton 구현

Figma: [Button 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=46-148&m=dev) (`46:148`) → 컴포넌트 세트 `11:4337`. `294:1138`은 문서용 프레임입니다.

**Variant 축**

| 축             | 값                                          |
| -------------- | ------------------------------------------- |
| `theme`        | `primary` · `gray`                          |
| `variant`      | `filled` · `outlined` · `tonal` · `text`    |
| `size`         | `lg`(52px) · `md`(40px) · `sm`(32px)        |
| `iconPosition` | `left` · `right`                            |
| 상태           | `hover` · `pressed` · `disabled` (+ `isPending`) |

**실측 스펙** (primary / filled / default / lg 기준, `11:4121`)

| 항목      | 값                                                  |
| --------- | ----------------------------------------------------- |
| height    | 52px                                                  |
| padding   | `px-[30px] py-[12px]`                                 |
| gap       | 4px                                                   |
| radius    | 8px → `rounded-lg` (md·sm은 6px → `rounded-md`)       |
| 배경      | `blue/500` `#3182f6` → `bg-blue-500`                  |
| 라벨      | Pretendard Bold 16px / lh 1.45 / ls -0.48px → `text-body-bold` |
| 라벨 색   | `base/white` → `text-white`                           |
| 아이콘    | 16px                                                  |

**구현 구조** (internal-ui `components/Button` 패턴)

```
src/components/Button/
├── CtaButton/
│   ├── CtaButton.tsx
│   ├── constants/index.ts        # CtaButton 고유 SIZE/THEME/VARIANT + 스타일 매퍼
│   ├── types/index.ts
│   ├── utils/generateCtaButtonStyle.ts
│   └── index.ts
├── shared/                       # 버튼 계열 공통만 (iconPosition · pending 아이콘 · 히트 영역)
│   ├── ButtonIcon.tsx
│   ├── constants/index.ts
│   ├── types/index.ts
│   └── index.ts
└── index.ts
```

`SIZE`·`THEME`·`VARIANT`는 `shared`가 아니라 `CtaButton/` 아래에 둡니다. `shared`에 두면 `CTA_BUTTON_THEMES`를 공통 모듈이 내보내게 되어 컴포넌트별 정의 원칙과 어긋납니다.

**주의사항**

규칙은 여기서 정의하지 않습니다. biz-ui 공통 규칙은 [`apps/biz-ui/CLAUDE.md`](../../apps/biz-ui/CLAUDE.md)를 따릅니다.

구현 결과와 결정 기록은 [`components/button.md`](./components/button.md)로 옮겼습니다.

**디자이너 확인 필요**

Button 관련 항목은 [`components/button.md`](./components/button.md)의 「디자인 확인 필요」로 옮겼습니다. 나머지:

| 항목           | 내용                                       |
| -------------- | ------------------------------------------ |
| `Fillter` 오타 | Filter 컴포넌트 레이어명이 `Fillter`       |

**Storybook**

`apps/storybook/src/stories/biz-ui/CtaButton.stories.tsx`, `meta.title`은 `core/biz-ui/Button/CtaButton`. theme × variant × size 매트릭스와 disabled · pending 스토리를 포함합니다.

---

### 7. Filter 구현

Figma: [Filter](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=295-946&m=dev) (`295:946`) — 문서용 프레임. 실제 심볼은 `179:602`(Default) · `179:603`(Selected).

아이콘 + 라벨로 된 단일 사이즈 칩입니다. 사이즈 축도, hover/pressed/disabled 심볼도 없습니다.

**Variant 축**

| 축      | 값                     |
| ------- | ---------------------- |
| `state` | `default` · `selected` |
| 아이콘  | 노출 여부 (boolean)    |

**실측 스펙**

| 항목    | 값                                                             |
| ------- | -------------------------------------------------------------- |
| 크기    | 69 × 33 (내용에 따라 가변)                                     |
| padding | `px-[13px] py-[6px]`                                           |
| gap     | 4px                                                            |
| radius  | 6px → `rounded-md`                                             |
| border  | 1px solid                                                      |
| 라벨    | Pretendard SemiBold 14px / lh 1.5 / ls -0.14px → `text-gray-800` |
| 아이콘  | 14px (`ListStar` `14:275`)                                     |

| `state`    | 배경                  | 테두리                      |
| ---------- | --------------------- | --------------------------- |
| `default`  | `base/white` → `bg-white` | `gray/200` → `border-gray-200` |
| `selected` | `blue/100` → `bg-blue-100` | `blue/300` → `border-blue-300` |

바인딩된 변수에 `blue/600` · `gray/400`이 함께 잡힙니다. 아이콘 색이 상태별로 갈리는 것으로 보이므로 (`selected` → `blue-600`, `default` → `gray-400`) 착수 시 심볼에서 확인합니다.

**구현 구조**

```
src/components/Button/Filter/
├── Filter.tsx
├── constants/index.ts        # FILTER_STATES + 상태별 스타일 매퍼
├── types/index.ts
└── index.ts
```

`state`는 값이 CtaButton과 겹치지 않으므로 `shared`가 아니라 `Filter/` 아래에 둡니다 (CLAUDE.md [컴포넌트 API]).

**주의사항**

규칙은 여기서 정의하지 않습니다. biz-ui 공통 규칙은 [`apps/biz-ui/CLAUDE.md`](../../apps/biz-ui/CLAUDE.md)를 따릅니다.

구현 결과와 결정 기록(라벨 타이포 토큰 채택 근거 · `base/white` 확정 · `isSelected` boolean API · `disabled` 미노출 · 높이 1.3px 차이)은 [`components/button.md`](./components/button.md)의 「Filter」로 옮겼습니다.

**디자인 확인 필요**

[`components/button.md`](./components/button.md)의 「Filter > 디자인 확인 필요」로 옮겼습니다 — 문서 라벨 뒤바뀜 · 상호작용 상태 부재 · 라벨 타이포 불일치 · `Fillter` 오타.

**Storybook**

`apps/storybook/src/stories/biz-ui/Filter.stories.tsx`, `meta.title`은 `core/biz-ui/Button/Filter`. 스토리 3종 (`Default` · `Interactive` · `States`).

---

### 8. FloatingPill 구현

Figma: [FloatingPill](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=298-952&m=dev) (`298:952`) — 문서용 프레임. 실제 심볼은 `46:185`(navigate) · `46:184`(scrollToTop).

**Variant 축**

| 축        | 값                          |
| --------- | --------------------------- |
| `variant` | `navigate` · `scrollToTop`  |

상태 축은 없습니다.

**실측 스펙**

| 항목    | 값                                                              |
| ------- | ----------------------------------------------------------------- |
| height  | 50px (두 variant 공통)                                            |
| padding | `px-[26px] py-[12px]`                                             |
| radius  | `corner radius/999` → `rounded-full`                              |
| 라벨    | `heading-5` (Pretendard Bold 18px / lh 1.45 / ls **-1px**)        |

| `variant`     | 배경                        | 라벨 색                       | 그 외                                                                    |
| ------------- | --------------------------- | ----------------------------- | ------------------------------------------------------------------------ |
| `navigate`    | `blue/500` → `bg-blue-500`  | `base/white` → `text-white`   | `shadow/shadow-20`                                                       |
| `scrollToTop` | `base/white` → `bg-white`   | `gray/800` → `text-gray-800`  | `gray/100` 테두리(stroke 0.5625px) · `shadow/shadow-20` · gap 4px · 18px 아이콘 |

**구현 구조**

```
src/components/Button/FloatingPill/
├── FloatingPill.tsx
├── constants/index.ts        # FLOATING_PILL_VARIANTS + variant별 스타일 매퍼
├── types/index.ts
└── index.ts
```

**주의사항**

규칙은 여기서 정의하지 않습니다. biz-ui 공통 규칙은 [`apps/biz-ui/CLAUDE.md`](../../apps/biz-ui/CLAUDE.md)를 따릅니다.

구현 결과와 결정 기록(`--shadow-20` 토큰 추가 · box-shadow 통일 · 0.5625px 테두리 · 아이콘을 variant에서 파생 · 포지셔닝 제외)은 [`components/button.md`](./components/button.md)의 「FloatingPill」로 옮겼습니다.

**디자인 확인 필요**

[`components/button.md`](./components/button.md)의 「FloatingPill > 디자인 확인 필요」로 옮겼습니다 — shadow 스케일이 `shadow-20` 하나뿐 · stroke 0.5625px. 상호작용 상태는 확인 완료(비활성 시 UI를 렌더하지 않음)라 제외했습니다.

**Storybook**

`apps/storybook/src/stories/biz-ui/FloatingPill.stories.tsx`, `meta.title`은 `core/biz-ui/Button/FloatingPill`. 스토리 2종 (`Default` · `Variants`).

---

### 9. IconButton 구현

Figma: [IconButton](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=298-1024&m=dev) (`298:1024`) — 문서용 프레임. 심볼 `81:202`~`81:209`는 매트릭스 **샘플 8개**일 뿐이라 30조합은 컴포넌트 세트에서 직접 실측합니다.

**Variant 축**

| 축      | 값                                                        |
| ------- | --------------------------------------------------------- |
| `theme` | `default` · `filled` · `dark`                             |
| `size`  | `lg`(40px) · `sm`(24px)                                   |
| 상태    | `hover` · `pressed` · `disabled` · `loading`              |

`theme` 값이 CtaButton(`primary` · `gray`)과 하나도 겹치지 않습니다. CtaButton 값을 옮기지 않습니다.

**실측 스펙**

| 항목      | `lg`                | `sm`                |
| --------- | ------------------- | ------------------- |
| 버튼 크기 | 40 × 40             | 24 × 24             |
| 아이콘    | 24px                | 16px                |
| radius    | 6px → `rounded-md`  | 6px → `rounded-md`  |

`theme='filled'`는 `base/white` 배경입니다. 나머지 theme × state 배경·아이콘 색은 컴포넌트 세트에서 전수 실측해 `ICON_BUTTON_STYLES`에 넣습니다.

**터치 영역 확장**

Figma 주석 `337:3548` — "레이아웃 변동 없이 `::before` 가상 요소를 사용해 사방 6px 터치 영역 확장 / `position: relative` 기준 `::before`에 상하좌우 -6px 마진(inset) 처리".

기존 `BUTTON_TOUCH_TARGET_STYLE`(`before:absolute before:-inset-1.5 before:content-['']`)이 그대로 맞습니다. 쓰는 쪽에서 `relative`를 함께 겁니다.

**구현 구조**

```
src/components/Button/IconButton/
├── IconButton.tsx
├── constants/index.ts                  # ICON_BUTTON_THEMES/SIZES/STATES + 스타일 매퍼
├── types/index.ts
├── utils/generateIconButtonStyle.ts    # 배럴에서 export 하지 않음
└── index.ts
```

**주의사항**

규칙은 여기서 정의하지 않습니다. biz-ui 공통 규칙은 [`apps/biz-ui/CLAUDE.md`](../../apps/biz-ui/CLAUDE.md)를 따릅니다.

착수 후 디자이너가 theme × state 매트릭스를 채워 주셔서(심볼 8개 → 13개) 전수 실측이 가능해졌습니다. 실측 표와 결정 기록(`ButtonIcon` 유지 · `state` 미노출 · `aria-label` 필수 · `isPending`이 disabled 스타일 · 히트 영역 전 사이즈)은 [`components/button.md`](./components/button.md)의 「IconButton」으로 옮겼습니다.

**디자인 확인 필요**

[`components/button.md`](./components/button.md)의 「IconButton > 디자인 확인 필요」로 옮겼습니다 — `filled` disabled가 흰 배경을 잃음 · hover == pressed · `loading`이 default 테마에만 정의됨 · `sm` 조합 부족 · `sm` 터치 타겟 36px · 로딩 스피너 비주얼 미정의.

**Storybook**

`apps/storybook/src/stories/biz-ui/IconButton.stories.tsx`, `meta.title`은 `core/biz-ui/Button/IconButton`. 스토리 6종 (`Default` · `Themes` · `Sizes` · `Disabled` · `Pending` · `Matrix`).

---

### 10. InputField 구현

Figma: [InputField](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=294-2349&m=dev) (`294:2349`) — 문서용 프레임. 실제 컴포넌트 세트는 `51:1293`입니다.

Button 계열이 아니라 **Input 계열 첫 컴포넌트**입니다. `src/components/Input/` 그룹을 새로 엽니다.

**Variant 축**

| 축      | 값                                                                           |
| ------- | ---------------------------------------------------------------------------- |
| `type`  | `text` · `password` · `verify` · `select`                                    |
| `state` | `default` · `focus` · `typing` · `filled` · `error` · `disabled` · `filledDisabled` |

**Figma `state` 7종은 축이 2개입니다.** 「스타일 상태 4종 × 값 유무」로 분해됩니다.

| 스타일 상태 | 값 없음    | 값 있음                     |
| ----------- | ---------- | --------------------------- |
| 평상시      | `default`  | `filled`                    |
| 포커스      | `focus`    | `typing`                    |
| 에러        | (심볼 없음) | `error`                     |
| 비활성      | `disabled` | `filledDisabled`            |

값이 있으면 라벨이 상단으로 떠오르고(플로팅 라벨) 그 아래에 값이 붙습니다 — 세 쌍 모두 같은 규칙입니다. 따라서 `state`를 union prop으로 열지 않고 `disabled`(HTML 속성) · `errorMessage` 유무 · `:focus-within` · 값 유무로 파생시킵니다 (CtaButton · Filter · IconButton이 `state`를 노출하지 않은 것과 같은 판단).

**실측 스펙 — 공통 박스**

| 항목        | 값                                                    |
| ----------- | ----------------------------------------------------- |
| height      | 70px                                                  |
| width       | 문서 프레임은 300px. 실제로는 fill                    |
| padding     | `px-[18px] py-[12px]`                                 |
| radius      | 6px → `rounded-md`                                    |
| 테두리      | 정적 상태 1px / 주목 상태(`focus` · `typing` · `error`) **2px** |
| 박스 ↔ 하단 | gap 6px                                               |

**텍스트 3역할** — 기존 컴포넌트에 없던 구조입니다.

| 역할          | 토큰                                            | 노출 조건            |
| ------------- | ----------------------------------------------- | -------------------- |
| 라벨(플로팅)  | `label` (Medium 14px / ls -0.42px)              | 값 있음 또는 포커스  |
| 값            | `body-lg-semibold` (SemiBold 18px)              | 값 있음              |
| 플레이스홀더  | `body-lg-semibold`                              | 값 없음              |

`default`는 라벨이 플레이스홀더 자리(세로 중앙)에 있다가, 포커스되면 위로 올라가고 그 아래에 안내문구가 뜹니다.

**상태별 색**

| 스타일 상태      | 테두리              | 배경      | 라벨       | 값 / 플레이스홀더    |
| ---------------- | ------------------- | --------- | ---------- | -------------------- |
| `default`        | `gray/200` 1px      | `white`   | —          | ph `gray/500`        |
| `focus`          | `blue/400` **2px**  | `white`   | `gray/600` | ph `gray/300`        |
| `typing`         | `blue/400` **2px**  | `white`   | `gray/600` | `gray/800`           |
| `filled`         | `gray/200` 1px      | `white`   | `gray/600` | `gray/800`           |
| `error`          | `red/400` **2px**   | `white`   | `red/500`  | `gray/800`           |
| `disabled`       | `gray/200` 1px      | `gray/50` | —          | ph `gray/400`        |
| `filledDisabled` | `gray/200` 1px      | `gray/50` | `gray/400` | `gray/500`           |

비활성은 평상시 색을 한 단계씩 흐리게 민 것입니다 (ph `gray/500`→`400`, 라벨 `600`→`400`, 값 `800`→`500`).

테두리가 굵어지는 건 `error`만이 아니라 **포커스할 때마다**입니다. 아래 「테두리 — 레이아웃 시프트」 참고.

**type별 트레일링 요소**

| `type`     | 요소                                      | 재사용                          |
| ---------- | ----------------------------------------- | ------------------------------- |
| `text`     | 클리어 버튼 24px (`XCircle` 16px `gray/500`) | `IconButton` `size='sm'`        |
| `password` | 눈 토글 24px                              | `IconButton` `size='sm'`        |
| `verify`   | 확인 버튼 48×32                           | `CtaButton` `size='sm'`         |
| `select`   | `CaretDown` 18px `fill` `gray/400`, 콘텐츠와 gap 8px | `Icon`                |

크기가 기존 컴포넌트와 정확히 맞아떨어져 새로 만들 것이 없습니다. `verify`의 확인 버튼은 `bg-blue-500` + `label-bold` 14px + `h-32 px-12 py-5`로 **CtaButton `primary`/`filled`/`sm`과 완전히 일치**합니다.

트레일링은 상태를 타지 않습니다 — 클리어는 `error`에서도 `gray/500`, 눈·캐럿은 전 상태 같은 에셋(`gray/400`)입니다. 예외는 확인 버튼으로, **`error`와 `disabled`에서 비활성**(`gray/100` 배경 + `gray/400` 라벨 = CtaButton disabled)이 됩니다.

**하단 메시지 슬롯** — 박스 아래 6px 자리를 두 형태가 나눠 씁니다.

| 형태            | 구성                                                                    |
| --------------- | ------------------------------------------------------------------------ |
| 에러 메시지     | `WarningCircle` 14px `red/300` + `caption` `red/400`, gap 2px            |
| 조건 체크리스트 | `CheckCircle` 14px + `caption`, 항목 간 gap 6px / 아이콘↔텍스트 gap 2px  |

체크리스트는 **아이콘과 텍스트 색이 다릅니다** — 충족 아이콘 `blue/400` / 텍스트 `blue/600`, 미충족 아이콘 `gray/400` / 텍스트 `gray/600`. Figma는 `password`/`typing`에만 6개를 깔아 뒀지만 **문구·개수는 소비처가 정합니다** — 저런 UI로 나열 가능하다는 예시일 뿐이라 `type`에 묶지 않고 범용 슬롯으로 둡니다. 항목이 길어지면 자연스럽게 줄바꿈되어야 하므로 `flex-wrap`을 겁니다.

둘 다 오면 **에러 메시지가 이깁니다** — 조건 미충족보다 앞선 신호입니다.

**플로팅 라벨 구현**

라벨이 인풋 자리를 덮고 있다가 포커스되면 작아지면서 위로 올라가고 그 자리에 플레이스홀더가 뜨는 동작입니다.

**라벨만 절대배치로 움직이고 인풋은 하단 행에 고정합니다.** 인풋이 레이아웃상 제자리에 있으니 라벨이 움직여도 커서·값이 튀지 않습니다.

**포커스는 상태로 뺐습니다 — CSS만으로는 동작하지 않았습니다.** 착수 시점 계획은 「뜬 상태가 기본, 값 없음 AND 미포커스일 때만 가운데로 내림」으로 조건을 뒤집어 `group-[:not([data-filled]):not(:focus-within)]` 한 벌로 끝내는 것이었는데, 구현 후 실측에서 **포커스해도 라벨이 그대로**였습니다.

원인은 셀렉터가 아니라 **브라우저의 스타일 무효화**입니다. `label.matches(...)`는 포커스 시 `false`(= 규칙 미적용이 맞음)를 돌려주는데 computed style은 접힌 값(`top: 23px` / 18px)을 유지했고, 강제 재계산을 걸자 `top: 0px`으로 바뀌었습니다. **중첩 `:is()`/`:not()` 안의 `:focus-within` 변화에 스타일 재계산이 트리거되지 않습니다.** 박스 테두리의 `focus-within:inset-ring-2`는 중첩이 없어 정상 동작합니다(같은 실측에서 1px→2px 확인).

그래서 포커스만 `useState`로 빼고 나머지는 그대로 뒀습니다. controlled input이라 입력마다 어차피 리렌더되므로 포커스/블러 2회가 추가로 드는 비용은 사실상 없습니다.

```
// 라벨 위치·타이포는 상태로 고른다
FLOATING:  'top-0 text-label'
COLLAPSED: 'top-1/2 -translate-y-1/2 text-body-lg-semibold'
```

- **인풋은 항상 하단 행에 고정**하고 라벨만 절대배치로 움직입니다. 실측 결과 `default → focus → typing → filled` 전 구간에서 인풋·박스 좌표 변화가 **0px**입니다.
- 라벨에 `pointer-events-none`을 걸어 탭이 인풋으로 통과하게 합니다.
- **플레이스홀더는 별도 요소를 만들지 않습니다.** 포커스일 때만 `placeholder` 속성을 넘기고 색은 `placeholder:text-gray-300`으로 둡니다. `select`는 네이티브 placeholder가 없어 포커스일 때만 `<span>`을 렌더합니다.

**테두리 — 레이아웃 시프트**

테두리가 굵어지는 게 `error`만이 아니라 **포커스할 때마다**(1px→2px)라, `border`를 쓰면 포커스마다 콘텐츠가 1px 밀립니다. Figma는 inside stroke여서 안쪽 여백이 두께와 무관하게 18px 고정인데 CSS `border`는 19px/20px이 되어 값 자체도 어긋납니다.

**`border` 대신 `inset-ring`을 씁니다** (Tailwind v4 유틸 = `box-shadow: inset 0 0 0 Npx`).

| 항목                    | `border`              | `inset-ring`        |
| ----------------------- | --------------------- | ------------------- |
| 레이아웃 영향           | 있음 (콘텐츠 1px 이동) | 없음 (페인트만)     |
| Figma inside stroke 재현 | 안 됨 (패딩 19/20px)  | 됨 (패딩 18px 고정) |
| 높이 70px 유지          | 보정 필요             | 그대로              |

```
inset-ring inset-ring-gray-200
focus-within:inset-ring-2 focus-within:inset-ring-blue-400
```

- 패딩으로 보정하는 대안(`border-2` + `px-[17px] py-[11px]`)은 상태마다 패딩 클래스를 같이 관리해야 해서 틀리기 쉽습니다. 채택하지 않습니다.
- `outline`도 레이아웃에 영향이 없지만 포커스 링과 용도가 겹쳐 피합니다.
- box-shadow 기반이라 `forced-colors` 모드에서 사라집니다. 모바일 WebView 타깃이라 감수하되 기록해 둡니다.
- biz-ui 첫 `inset-ring` 사용입니다. `--shadow-20`(FloatingPill)과는 Tailwind가 `--tw-shadow` / `--tw-inset-ring-shadow`로 나눠 합성하므로 충돌하지 않습니다.

위 클래스는 이 레포의 Tailwind 4.1.6에서 전부 컴파일되는 것을 확인했습니다.

**API 초안**

| prop                    | 비고                                                          |
| ----------------------- | ------------------------------------------------------------- |
| `type`                  | `text` · `password` · `verify` · `select`                     |
| `label`                 | 플로팅 라벨. 필수                                             |
| `placeholder`           | 포커스 시 노출되는 안내문구                                   |
| `errorMessage`          | 있으면 에러 스타일. 별도 `isError`를 두지 않음                |
| `conditions`            | `{ label, isSatisfied }[]`. 체크리스트 슬롯                   |
| `onClear`               | `text` 전용. 넘겨야 클리어 버튼이 붙음                       |
| `onVerify` · `verifyLabel` | `verify` 전용. 라벨 기본값 `확인`                          |
| `onClick`               | `select` 전용. 바텀시트 열기                                 |
| HTML 위임               | `value` · `onChange` · `onFocus` · `onBlur` · `disabled` · `readOnly` · `required` · `name` · `id` · `ref` · `autoFocus` · `autoComplete` · `tabIndex` · `inputMode` · `maxLength`(기본 200) |

Boolean prop 접두어 규칙(`is`/`use`/`has`)은 CLAUDE.md [컴포넌트 API]를 따릅니다. `disabled` · `readOnly` · `autoFocus` · `tabIndex`는 HTML 기본 속성이라 접두어 없이 갑니다.

**`select`에 선택 상태 prop을 두지 않습니다.** 선택 여부는 `value` 유무로 이미 나옵니다. Filter가 `isSelected`를 받은 건 값 없이 켜고 끄기만 하는 토글이라서고 `select`은 값을 갖습니다 — 다른 세 type의 「값 유무」 규칙을 그대로 씁니다.

**시트 열림(`isOpen`)은 받되 스타일에 쓰지 않습니다.** 트리거의 시각 상태는 값 유무로 갈리고, 열림 여부는 `aria-expanded`로만 나갑니다. `aria-haspopup='dialog'`는 "누르면 시트가 뜬다"까지만 알려서 열림 상태를 못 전달합니다.

**`ref`와 포커스 핸들러는 유니온으로 받습니다** (`HTMLInputElement | HTMLButtonElement`). `select`만 `<button>`을 렌더하기 때문입니다. 렌더 시점에는 어느 쪽인지 확정되므로 두 자리에서 단언합니다.

**비밀번호 표시 토글은 내부 상태입니다.** 소비처가 제어할 이유가 없습니다.

**순차 입력 전환 정책** — Figma 주석 `355:1307`.

> 적용 범위: 순차 입력이 필요한 모든 화면 (비밀번호 변경, 연락처 인증 등) / 앞 단계 검증이 완료되면 다음 입력 필드가 활성화된다 / 검증 완료된 필드는 하단으로 내려가고 신규 입력 필드가 상단으로 올라간다 / 신규 필드에 자동 포커스 / 화면이 신규 필드 위치로 자동 스크롤

**화면 몫이고 DS 몫이 아닙니다.** 필드 배열의 순서·활성화·스크롤은 필드를 들고 있는 쪽이 정합니다. 컴포넌트는 그게 가능하도록 `ref`를 실제 `<input>`까지 내려보내고 `autoFocus` · `tabIndex` · `disabled`를 열어 두는 것까지만 합니다.

**구현 구조**

```
src/components/Input/
├── InputField/
│   ├── InputField.tsx
│   ├── constants/index.ts                  # INPUT_FIELD_TYPES/LABEL_STATES + 상태별 스타일 매퍼
│   ├── types/index.ts
│   ├── hooks/effects/                      # 마운트 시 포커스 상태 보정
│   ├── utils/resolveInputFieldState.ts     # disabled·errorMessage → 스타일 상태
│   └── index.ts
├── shared/                                 # TextArea와 실제로 공유하는 것만
│   ├── InputMessage.tsx                    # 에러 메시지 · 조건 체크리스트 슬롯
│   ├── constants/index.ts                  # INPUT_STATES + INPUT_BOX_STYLES(inset-ring)
│   ├── types/index.ts
│   └── index.ts
└── index.ts
```

`utils/`에 스타일 생성 함수(`generateInputFieldStyle`)를 두려던 계획을 바꿔 상태 해석만 남겼습니다. 스타일은 CtaButton·IconButton처럼 조합할 분기가 아니라 상태로 조회하는 `Record`라 Filter와 같은 방식이 맞습니다. `utils/`가 남은 건 `no-nested-ternary`에 걸리는 3단 분기를 빼내기 위해서입니다.

TextArea가 바로 뒤따르는 게 확정돼 `shared/`를 226에서 함께 엽니다 (Button 계열도 `ButtonIcon`을 CtaButton 티켓에서 같이 만들었습니다). 단 **두 컴포넌트가 실제로 같이 쓰는 것만** 넣습니다 — 테두리 스타일과 하단 메시지 슬롯 둘입니다. 박스 치수 · 플로팅 라벨 · 트레일링 요소는 InputField 고유라 넣지 않습니다 (CLAUDE.md [코드 규칙] 1).

internal-ui는 `Input/InputField` · `Input/InputPassword`를 **별도 컴포넌트로** 쪼갰지만 biz-ui Figma는 `type`을 variant 축으로 갖습니다. CLAUDE.md [컴포넌트 API]에 따라 Figma 실제 축을 따르고 internal-ui 구조를 옮기지 않습니다.

**주의사항**

규칙은 여기서 정의하지 않습니다. biz-ui 공통 규칙은 [`apps/biz-ui/CLAUDE.md`](../../apps/biz-ui/CLAUDE.md)를 따릅니다.

- **`type='select'`는 `<input>`이 아니라 `<button>`입니다.** Filter와 같은 성격 — 값을 표시하고 탭하면 바텀시트가 뜨는 트리거입니다. Figma의 `select`/`focus`·`typing`은 매트릭스를 기계적으로 채운 것이라 그대로 옮기지 않습니다 (위 「API 초안」).
- **`<button>`이 `text-align: center`를 물려줍니다.** 라벨을 `<span>`으로 넣으면 가운데로 몰려 `text-left`를 명시해야 합니다. 구현 중 실제로 걸렸습니다.
- **루트에 `w-full`을 넣지 않습니다.** 블록 레벨 flex 컨테이너라 부모 폭을 그대로 채우는데, `w-full`을 넣으면 소비자가 `className`으로 주는 폭(`w-[300px]`)을 덮어씁니다. 이것도 구현 중 실제로 걸렸습니다.
- **`@layer base`에 `input { font-size: 1rem }`을 두지 않는다는 기존 결정이 여기서 실물로 걸립니다.** 값 타이포가 `body-lg-semibold`(18px)라 iOS 포커스 줌 기준(16px)을 넘겨 안전하지만, 토큰을 명시하는 방식은 그대로 유지합니다 ([frontend.md](./frontend.md) 특이사항).
- 트레일링 `IconButton`은 히트 영역이 자동으로 넓어집니다(`sm` 24→36px). 박스 안쪽이라 레이아웃에 영향이 없는지 확인합니다.

**디자인 확인 필요**

| 항목                 | 내용                                                                                          |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| `verify` 확인 버튼   | `theme`·`variant`와 상태별(미검증/검증완료/비활성) 색을 컴포넌트 세트에서 전수 실측 필요        |
| `select` 열림 표시   | `aria-expanded`는 받기로 확정. 시트가 열렸을 때 `CaretDown`을 뒤집는 등 **시각 표현**도 넣을지는 미정 |
| 체크리스트 줄바꿈    | 항목이 여러 줄이 될 때 박스와의 간격(6px) 유지 여부                                             |
| `readOnly` 비주얼    | 「비활성」과 「값은 남기고 수정만 막음」은 성격이 다른데 Figma엔 회색 하나뿐입니다. 둘을 구분해 보여줄지 |

`red` 3종(`300`/`400`/`500`)과 `disabled`/`filledDisabled` 구분은 확인 완료라 여기서 뺐습니다 — 전자는 아이콘/테두리/텍스트에 자리가 각각 있고(`typing`이 `blue/400` 테두리 + `blue/600` 조건 텍스트로 갈리는 것과 같은 구조), 후자는 값 유무 파생이라 별도 상태로 구현하지 않습니다.

**Storybook**

`apps/storybook/src/stories/biz-ui/InputField.stories.tsx`, `meta.title`은 `core/biz-ui/Input/InputField`. `type` × `state` 매트릭스로 문서 프레임(`294:2349`)과 대조합니다. `focus`·`typing`은 CSS 상태라 정적으로 깔 수 없어 직접 올려봅니다.

---

### 11. TextArea 구현 · shadow · radius 토큰

Figma: [TextArea](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=454-1420&m=dev) (`454:1420`) — 문서용 프레임. 실제 컴포넌트 세트는 `455:1131`입니다. InputField 착수 후에 Figma에 추가됐습니다.

**InputField와 별도 티켓입니다** (DOTOLI-227). 별도 컴포넌트 세트이고, 이 레포는 세트 하나당 티켓 하나입니다.

착수해 보니 **겹치는 범위가 계획보다 넓었습니다.** 색 매트릭스가 InputField와 완전히 동일해서 테두리·메시지 슬롯 외에 라벨·값 색, 상태 해석, 포커스 보정 훅까지 `Input/shared/`로 올렸습니다 — 계획이 "실제로 겹치는 것이 더 나오면 그때 올린다"고 했던 그대로입니다.

Figma에 shadow·radius 스케일이 정리되면서 [frontend.md](./frontend.md)의 「미구현」에 있던 토큰도 이 티켓에서 함께 넣었습니다.

**Variant 축**

| 축      | 값                                                                           |
| ------- | ---------------------------------------------------------------------------- |
| `state` | `default` · `focus` · `typing` · `filled` · `error` · `disabled` · `filledDisabled` |

`type` 축이 없습니다. 상태 7종이 「스타일 4종 × 값 유무」로 접히는 것은 InputField와 같습니다.

**InputField와의 차이**

| 항목        | InputField                        | TextArea                     |
| ----------- | --------------------------------- | ---------------------------- |
| 크기        | 300×70                            | 300×150                      |
| padding     | `px-[18px] py-[12px]`             | `px-[14px] py-[10px]`        |
| 정렬        | `items-center`                    | `items-start`                |
| 라벨        | 플로팅 (18px 중앙 ↔ 14px 상단)    | **항상 상단 14px 고정**      |
| 라벨 색     | ph `gray/500` → 활성 `gray/600`   | `gray/500` → 활성 `gray/600` |
| 트레일링    | `type`별 4종                      | 없음                         |
| 테두리      | 정적 1px / 주목 2px               | **동일**                     |
| 하단 메시지 | 6px gap + 18px (70→94)            | **동일** (150→174)           |

**플로팅 라벨이 없습니다.** 라벨이 상단 14px에 고정이고 색만 바뀝니다 — InputField에서 가장 복잡한 부분(절대배치 + 조건 반전 + `data-filled`)이 여기엔 필요 없습니다. 값 유무는 라벨 위치가 아니라 값 노출 여부에만 관여합니다.

**재사용**

| `Input/shared/`에서 가져오는 것                          | TextArea가 새로 만드는 것        |
| -------------------------------------------------------- | -------------------------------- |
| 테두리·배경 (`INPUT_BOX_STYLES`, `inset-ring`)           | 박스 치수 · 패딩 · `items-start` |
| 라벨·값 색 (`INPUT_TEXT_STYLES`)                          | 라벨 위치(상단 고정)             |
| 상태 해석 (`resolveInputState`)                           | 다중 행 값 영역 (`textarea`)     |
| 포커스 보정 (`useInitialInputFocusEffect`)                | `maxLength` 기본 5000            |
| 하단 메시지 슬롯 (`InputMessage` · 글자 수 카운터)         |                                  |

**라벨 상태가 같습니다.** TextArea는 라벨이 안 움직이지만 색은 「값 있음 또는 포커스」에서 `gray-500`→`gray-600`으로 바뀝니다 — InputField가 라벨을 띄우는 조건과 동일합니다. 그래서 `INPUT_LABEL_STATES`(`active`/`idle`)를 공유하고 표현만 각자 정합니다.

**토큰 (Figma [Shadow](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=450-1139&m=dev) · [Corner Radius](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=450-1178&m=dev))**

| 그룹   | 토큰                                              | 비고                                        |
| ------ | ------------------------------------------------- | ------------------------------------------- |
| shadow | `--shadow-{4,8,12,20,24,30}`                      | 전부 `#333C51` 기반. `20`은 기존 값과 동일 |
| radius | `--radius-{4,6,8,10,12,16}`                       | `999`는 Tailwind 기본 `rounded-full`로 커버 |

문서 텍스트와 바인딩된 변수가 이번엔 **전부 일치**했습니다.

**숫자 네이밍을 씁니다** — internal-ui가 이미 `--shadow-in-{4,8,12,20,24,30}` · `--radius-in-{4,6,8,12,16,20,24}`로 같은 방식이고, Figma 변수명도 숫자입니다. 기존 `rounded-md`/`rounded-lg` 10곳을 `rounded-6`/`rounded-8`로 옮겼습니다.

**Tailwind 기본 radius 네임스페이스는 초기화하지 않습니다.** `--radius-*: initial`을 걸면 `rounded-md`·`rounded-lg`뿐 아니라 **`rounded`·`rounded-t`·`rounded-tr`·`rounded-tl`·`rounded-l`·`rounded-r`까지 사라집니다.** Storybook에서 공존하는 internal-ui가 그 유틸을 쓰고 있어 회귀가 납니다(`rounded-none`·`rounded-full`은 정적 유틸이라 무사). internal-ui도 초기화 없이 덧붙이는 방식입니다.

**구현 구조**

```
src/components/Input/TextArea/
├── TextArea.tsx
├── constants/index.ts
├── types/index.ts
└── index.ts
```

**주의사항**

규칙은 여기서 정의하지 않습니다. biz-ui 공통 규칙은 [`apps/biz-ui/CLAUDE.md`](../../apps/biz-ui/CLAUDE.md)를 따릅니다.

- radius가 `var(--6,6px)` 변수로 잡혀 있던 게 실제로 스케일 정리의 신호였습니다. 이 티켓에서 토큰화했습니다.
- 높이는 `height` prop으로 열고 기본값을 Figma 값(150px)으로 둡니다 — 가변 여부 확인 완료. 런타임 값이라 Tailwind 클래스로는 못 만들어 인라인 스타일로 겁니다.

**디자인 확인 필요**

| 항목            | 내용                                                                   |
| --------------- | ---------------------------------------------------------------------- |

**Storybook**

`apps/storybook/src/stories/biz-ui/TextArea.stories.tsx`, `meta.title`은 `core/biz-ui/Input/TextArea`. 스토리 2종 (`Default` · `States`).

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
