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
- [x] DOTOLI-214 biz-ui 스타일 레이어 및 디자인 토큰 구성 (color · typography까지. radius/shadow/breakpoint/container는 Figma 정의 대기)
- [x] DOTOLI-215 biz-ui Storybook 연동 및 문서화

### biz-ui 컴포넌트

- [x] DOTOLI-217 biz-ui 토큰 프리픽스 제거 및 컴포넌트 컨벤션 문서화
- [x] DOTOLI-218 biz-ui 기반 프리미티브 컴포넌트 구현 (Icon · Typography · Flex)
- [x] DOTOLI-219 biz-ui CtaButton 구현

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
| Typography | `--text-*` (+ `--line-height` / `--font-weight` / `--letter-spacing` 서브프롭) | 17   |

타이포그래피 이름은 internal-ui의 `body-16-m` 식이 아니라 Figma가 정의한 시맨틱 이름을 그대로 씁니다 — `heading-1`~`heading-4` (+ `-bold`), `heading-5`, `body-lg`, `body` / `body-semibold` / `body-bold`, `label` / `label-semibold` / `label-bold`, `caption`.

컬러 스케일 이름도 Figma의 `--blue-*` / `--gray-*` 규약을 따릅니다. Blue가 메인 컬러이지만 `primary`로 개명하지 않습니다.

`--radius-*`, `--shadow-*`, `--breakpoint-*`, `--container-*`, `--animate-*`는 Figma 정의를 기다립니다.

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

Typography 스토리가 생기면서 타이포 토큰 17종이 시각적으로 확인 가능해집니다 (별도 Foundations 페이지는 두지 않는다는 기존 결정 유지).

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
