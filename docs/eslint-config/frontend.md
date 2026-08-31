# eslint-config ESLint 10 마이그레이션 - 프론트엔드 구현 문서

## 개요

`@bbodek/eslint-config`를 ESLint 10 기반으로 재구성하고(base·next 2종 preset), dotoli 하위 패키지 5개와 외부 FE 레포 8건(FE-49)에 일괄 적용한 작업의 구현 현황입니다. legacy 완화 preset은 만들지 않기로 결정되어(DOTOLI-282 취소) 신규 룰을 전부 적용하고 위반 코드는 각 레포에서 직접 수정했습니다.

Jira: DOTOLI-279 · 280 · 281 · 283 · 291~294 (dotoli), [FE-49](https://thebbodek.atlassian.net/browse/FE-49) (외부 레포 일괄)

다음 영역으로 구성됩니다.

- `packages/eslint-config` — ESLint 10 대응 + base/next preset 분리
- dotoli 소비 패키지 5개 적용 (utils · hooks · storybook · biz-ui · internal-ui)
- 외부 FE 레포 8건 적용 (FE-49, 각 레포 워크트리 `<repo>-worktrees/FE-49-eslint10`)

## 구현 현황

### 구현 완료

| 기능 | 설명 |
| --- | --- |
| ESLint 10 대응 (DOTOLI-279) | peer `eslint ^10`·`typescript ^5`, typescript-eslint `^8.68`, `@eslint/js ^10`(FlatCompat용 `stripName` 처리), `@stylistic ^5`·`prefer-arrow-functions ^3.10.2`(구버전 utils 크래시 해소), `projectService` 단독 사용 |
| react-hooks·jsx-a11y 룰 (DOTOLI-280) | `react-hooks/rules-of-hooks: error`·`exhaustive-deps: warn` 명시 등록, `jsx-a11y`는 `flatConfigs.recommended.rules` 전체 스프레드 |
| base·next preset 분리 (DOTOLI-281) | `base.eslint.config.js`(프레임워크 중립) / `next.eslint.config.js`(`eslint-config-next@16` flat 합성 + 중복 플러그인 키 strip) / `index.js`(`export { base, next }`, default=base, next는 top-level await 지연 로드로 optional peer 미설치 보호). 전역 ignores에 `*.config.{js,mjs,cjs,ts}` |
| no-empty-object-type 옵션 | `allowInterfaces: 'with-single-extends'` — 단일 extends 빈 인터페이스는 확장 포인트 관용 패턴으로 허용 (모노레포 123건 해소 결정) |
| dotoli 패키지 적용 (DOTOLI-283·291~294) | utils(13→0) · hooks(0) · storybook(180→0, `eslint-plugin-storybook ^10` 상향) · biz-ui(24→0) · internal-ui(33→0). Next 계열은 `{ next }` named import + `eslint-config-next ^16` devDep |
| 외부 레포 적용 (FE-49) | 8건 전부 lint 에러 0·tsc·build·dev 스모크 통과. internal 5,179 / admin 3,860 / kids 2,674 / kindergarten-admin 2,297 / bbodek-ui 824 / payments 205 / susemi 26 → 전부 0. legacy `.eslintrc.json`→flat 전환, `next lint`→`eslint` CLI 전환 포함 |

### 미구현 또는 확인 필요

| 항목 | 비고 |
| --- | --- |
| `@bbodek/eslint-config` 신판 publish | dotoli DOTOLI-279~294 브랜치 머지 + 배포 선행 필요. 외부 레포 8건은 현재 `file:` 로컬 의존이라 **publish 전 push 금지** |
| FE-49 워크트리 최종화 | publish 후 각 레포 `file:` → 정식 버전 교체 + install 재실행 + amend. yarn 레포는 셸에 `DOCS_SYNC_AUTH_TOKEN` 필요 |
| ~~stage 재기준~~ (완료) | bbodek-* 5개 레포 전부 origin/stage 직상으로 재기준 완료 (2026-08-27). internal `039f3c0e7`(stage 초기 8,918→0) · admin `e4f25ff` · kindergarten-admin `f42c29cf` · payments `a17bc14`(원래 stage 기반이었음) · kids `80c68ff`(stage==main). 4개 레포 lint 0·tsc·build·dev 스모크 재검증 통과, main 기준 백업은 각 레포 `FE-49-main-backup` 브랜치 |
| bbodek-ui·susemi 기준 브랜치 | stage 없음(main·dev) — 기준 브랜치 확인 필요, 현재 main 기준 |
| FE-49 눈 검증 | 각 레포 `TODO(FE-49)` disable 항목과 rename(`canSubmit` 계열)·a11y 변경부 화면 확인 |
| warn 잔여 | `exhaustive-deps`·`no-console` 계열은 방침상 미수정 (lint 통과에 영향 없음) |

### 특이사항

- **jsx-a11y 중 "수정 = 동작 추가"인 룰 8종은 warn** 입니다 (2026-08-28 FE-49 결정): `click-events-have-key-events` · `no-static-element-interactions` · `interactive-supports-focus` · `no-autofocus` · `label-has-associated-control` · `no-noninteractive-element-interactions` · `no-noninteractive-element-to-interactive-role` · `role-supports-aria-props`. 기존 코드의 관련 disable 주석은 전부 롤백되어 경고로 노출되며, 접근성 보강은 lint가 아닌 별도 작업으로 다룹니다.
- **SCREAMING_CASE 모듈 boolean 상수 허용** (2026-08-28 FE-49 결정): naming-convention에 `^[A-Z0-9_]+$` filter 항목을 추가해 `DEFAULT_HOLIDAY_FIXED_ORDER_ENABLED` 같은 상수 표기를 허용합니다. camelCase `is*` 상수도 기존 규칙대로 계속 허용됩니다.

- **`eslint-config-next`는 optional peer `^16`** 입니다. 15.x는 전 버전이 `@rushstack/eslint-patch`로 ESLint 10에서 로드 자체가 불가합니다. Next 소비 패키지는 직접 devDependency로 `^16`을 추가해야 합니다.
- **base에 `settings.react.version: '19'` 고정** — `eslint-plugin-react@7.37.5`의 `detect`가 ESLint 10에서 제거된 `context.getFilename`을 호출해 크래시하기 때문입니다. React 19가 아닌 소비처는 자기 config에서 오버라이드해야 합니다.
- **`ignores`는 전역 객체로 분리**되어 있습니다. config 객체 안에 두면 base만 비적용되고 next 쪽 config가 `*.config.*` 파일에 적용되어 strip된 플러그인 참조로 크래시합니다.
- **next preset은 base와 겹치는 플러그인 키(react·react-hooks·jsx-a11y·@typescript-eslint)를 next 쪽에서 제거**합니다 — flat config의 "Cannot redefine plugin" 방지. 해당 룰은 base에 등록된 신판 플러그인으로 해석됩니다.
- `eslint-plugin-jsx-a11y@6.10.2`는 peer에 eslint 10 미선언(무해)이라 unmet peer 경고가 남습니다.
- **제품 레포(bbodek-*)의 작업 분기 기준은 `origin/stage`** 입니다. main은 stage와 크게 갈라져 있을 수 있습니다(bbodek-internal은 +861 커밋).
- FE-49에서 발견된 후속 과제: `LottieAnimation` 동일 컴포넌트가 5개 레포에 복제(전부 같은 set-state-in-effect 이슈 — DS 공통화 후보), admin·kindergarten-admin의 validation stub 18개(검증 로직 미구현), 각 레포 `TODO(FE-49)` 주석.

## 파일 구조

```
docs/
└── eslint-config/
    └── frontend.md

packages/
└── eslint-config/
    ├── base.eslint.config.js    ← 프레임워크 중립 preset (react-hooks·jsx-a11y 포함)
    ├── next.eslint.config.js    ← base + eslint-config-next@16 합성
    ├── index.js                 ← { base, next } export, default = base
    ├── eslint.config.js         ← 자기 린트용 (base 재export)
    └── package.json             ← exports "." → index.js, optional peer eslint-config-next ^16

apps/
├── utils/eslint.config.mjs         ← default(base)
├── hooks/eslint.config.mjs         ← default(base)
├── storybook/eslint.config.mjs     ← { next } + eslint-plugin-storybook + no-renderer-packages off(SB8)
├── biz-ui/eslint.config.mjs        ← { next } + no-html-link-for-pages off(라이브러리)
└── internal-ui/eslint.config.mjs   ← { next } + no-html-link-for-pages off(라이브러리)
```
