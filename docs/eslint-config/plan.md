# eslint-config — ESLint 10 대응 및 설정 개편 개발 계획

## 개요

`@bbodek/eslint-config`를 ESLint 10에서 동작하도록 정리하고, 누락된 react-hooks·jsx-a11y 플러그인을 추가하며, base/next 2종 preset으로 분리한다. 마지막으로 dotoli 하위 패키지 5개에 일괄 적용한다. (legacy preset은 2026-08-26 결정으로 취소 — 기존 레포에도 신규 룰 전부 적용, 에러는 전체 코드 수정으로 대응)

- 대상 패키지: `packages/eslint-config`
- 적용 대상: `apps/biz-ui`, `apps/internal-ui`, `apps/storybook`, `apps/hooks`, `apps/utils`
- 의존 관계: 소비 패키지 적용(DOTOLI-283 · 291~294)은 DOTOLI-279 · 280 · 281 선행 필요

Jira: [DOTOLI-279](https://thebbodek.atlassian.net/browse/DOTOLI-279) ~ [DOTOLI-283](https://thebbodek.atlassian.net/browse/DOTOLI-283) · [DOTOLI-291](https://thebbodek.atlassian.net/browse/DOTOLI-291)~[DOTOLI-294](https://thebbodek.atlassian.net/browse/DOTOLI-294)

---

## Tasks

### eslint-config 패키지

- [x] DOTOLI-279 eslint-config ESLint 10 대응
- [x] DOTOLI-280 eslint-config react-hooks·jsx-a11y 룰 추가
- [x] DOTOLI-281 eslint-config base·next 설정 분리
- ~~DOTOLI-282 eslint-config legacy 설정 추가~~ — **취소** (2026-08-26 결정: legacy preset 없이 신규 룰 전부 적용, 기존 코드 에러는 프로젝트 전체 코드 수정으로 대응)

### 소비 패키지 적용

> 원래 DOTOLI-283 "dotoli 패키지 ESLint 10 일괄 적용" 단일 티켓이었으나, 2026-08-26 결정으로 패키지 단위 티켓·커밋으로 분리 (283은 utils 범위로 축소 수정, 나머지 4개 신규 발급)

- [x] DOTOLI-283 utils ESLint 10 적용
- [x] DOTOLI-291 hooks ESLint 10 적용
- [x] DOTOLI-292 storybook ESLint 10 적용
- [x] DOTOLI-293 biz-ui ESLint 10 적용
- [x] DOTOLI-294 internal-ui ESLint 10 적용

---

## 태스크 상세

### 1. DOTOLI-279 eslint-config ESLint 10 대응

`@bbodek/eslint-config`를 ESLint 10에서 동작하도록 의존성과 옵션을 정리한다. (실제 ESLint 10 설치 후 검증된 내용 기반)

**변경 사항** — `packages/eslint-config/package.json`, `eslint.config.js`

1. peer `eslint` `^9.26.0` → `^10` (현재 범위로는 npm이 ERESOLVE로 설치 거부)
2. `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser` `^7.0.0` → `^8`
   - v7은 ESLint 10에서 제거된 `LegacyESLint`를 참조해 크래시 (`TypeError: Class extends value undefined is not a constructor or null`)
3. `parserOptions`에서 `project: ['./tsconfig.json']` 제거
   - typescript-eslint v8이 `projectService`와 동시 지정 거부 (`Enabling "project" does nothing when "projectService" is enabled`)
4. `typescript`를 peerDependencies에 명시 (소비 측에 없으면 `Cannot find module 'typescript'`)

**변경 불필요 (확인 완료)**

- 사용 중인 룰 14개 전부 deprecated 아님
- `FlatCompat` + `compat.extends(...)` 구조는 v10에서 그대로 동작 → config 재작성 불필요

**검증**: ESLint 10 + typescript-eslint v8 조합에서 `eqeqeq`, `no-var`, `@typescript-eslint/no-explicit-any` 등 정상 검출 확인

**작업 중 추가된 변경** (ESLint 10 동작에 필수)

- `@stylistic/eslint-plugin` `^4.2.0` → `^5` — v4가 고정한 `@typescript-eslint/utils@8.32.1`이 ESLint 10에서 크래시
- `eslint-plugin-prefer-arrow-functions` `^3.6.2` → `^3.10.2` — 3.6.2가 고정한 `utils@8.19.1`이 동일 크래시
- `@eslint/js` `^9.26.0` → `^10` — 본체와 메이저를 맞춰 recommended 룰셋 드리프트 방지. v10 config에 추가된 `name` 필드를 FlatCompat(eslintrc 스키마)이 거부해 `stripName`으로 제거 후 전달

**알려진 경고**: `eslint-config-next@15`의 peer가 `eslint ^10`을 허용하지 않아 unmet peer 경고 발생 — DOTOLI-281의 optional peer 전환에서 해소 예정

---

### 2. DOTOLI-280 eslint-config react-hooks·jsx-a11y 룰 추가

공용 config에 빠져 있는 두 플러그인을 추가한다. 둘 다 프레임워크 중립이라 base에 둔다.

**react-hooks** — 현재 조건부 훅 호출이 검출되지 않음 (프로브 확인)

- `react-hooks/rules-of-hooks`: error
- `react-hooks/exhaustive-deps`: warn

**jsx-a11y** — `.frontend-rules/a11y.md`가 문서로 규정한 대체 텍스트·WAI-ARIA를 기계화

- `jsx-a11y/alt-text`, `jsx-a11y/role-supports-aria-props` 등
- RN에서는 DOM 요소 이름(`img`, `a`, `input`) 기준 발동이라 `View`/`Text`에 매칭 안 됨 → 무해
- 순수 TS 패키지에서도 무해

**참고**: `@react-native/eslint-config`는 `eslint-plugin-react-hooks@^7`을 이미 번들 → RN 쪽 중복 가능하나 무해

**적용 방식**: `react-hooks`는 두 룰만 명시적으로 등록, `jsx-a11y`는 `flatConfigs.recommended.rules` 전체 스프레드 (`.frontend-rules/a11y.md` 기계화 취지)

**알려진 경고**: `eslint-plugin-jsx-a11y@6.10.2`는 peer에 `eslint ^10` 미선언(최신이 6.x) → unmet peer 경고. 룰 전용 플러그인이라 동작에는 문제 없음을 프로브로 확인 (`alt-text` 정상 검출)

---

### 3. DOTOLI-281 eslint-config base·next 설정 분리

Next 전용 룰을 쓰지 않는 패키지(`apps/utils`, `apps/hooks`, RN)에서 `Pages directory cannot be found` 경고가 발생하므로 base/next로 분리해 export한다.

**파일 구성**

```
packages/eslint-config/
├─ base.eslint.config.js    # 프레임워크 중립 + react-hooks + jsx-a11y
├─ next.eslint.config.js    # base + @next/next 룰
├─ index.js                 # { base, next }, default = base
└─ eslint.config.js         # 이 패키지 자신을 린트
```

- default export는 base 유지 — 현재 dotoli 앱 5개가 default import를 쓰고 있어 하위 호환 필요

**함께 정리할 것**

1. `'@next/next/no-img-element': 'off'`를 next 쪽으로 이동 (현재 base에서 no-op 상태)
2. `eslint-config-next`를 optional peerDependency로 전환 (`^15 || ^16`) — Next 버전 고정 해제
3. `'no-unused-vars': 'error'` 중복 제거 — `@typescript-eslint/recommended`가 core 룰을 끄고 TS판을 켜는데 base가 core를 다시 켜서 같은 줄 중복 리포트

**주의 (리뷰에서 제기)**: `eslint-config-next@15`는 `eslint-plugin-react-hooks@5`를 번들한다. next preset이 base를 합성할 때 `react-hooks` 플러그인 키가 v7/v5로 이중 등록되면 flat config에서 "Cannot redefine plugin" 에러가 날 수 있으므로 분리 작업 시 키 충돌 처리 필요.

**작업 중 결정된 변경** (2026-08-26)

- `eslint-config-next` peer는 `^15 || ^16`이 아니라 **`^16`** — 15.x는 전 버전이 `@rushstack/eslint-patch`로 ESLint 10에서 로드 자체가 불가("Failed to patch ESLint"). 16은 flat config 네이티브 + peer `eslint >=9` + react-hooks v7 번들
- next preset은 FlatCompat 없이 `eslint-config-next/core-web-vitals` flat config를 직접 import — 단, base와 겹치는 플러그인 키(react, react-hooks, jsx-a11y, @typescript-eslint)는 `stripBasePlugins`로 next 쪽에서 제거해 이중 등록 방지
- `index.js`의 `next`는 top-level await 지연 로드 — optional peer(`eslint-config-next`) 미설치 환경(utils·hooks·RN)에서 default(base) import가 깨지지 않게 함
- base에 `settings.react.version: '19'` 고정 — `eslint-plugin-react@7.37.5`(최신)의 `detect`가 ESLint 10에서 제거된 `context.getFilename`을 호출해 크래시. React 19가 아닌 소비 패키지는 자기 config에서 `settings.react.version`을 오버라이드할 것
- (셀프 리뷰 P1) base의 `ignores`를 전역 ignores 객체로 분리 — config 객체 안에 두면 base에만 적용돼, next preset이 `next.config.mjs` 등을 린트할 때 strip된 플러그인 참조로 크래시했음 (`*.config.mjs` 전역 무시로 해소 검증 완료)
- (셀프 리뷰 P2) `index.js`의 지연 로드 catch는 `ERR_MODULE_NOT_FOUND`만 폴백, 그 외 에러는 rethrow

**검증 완료** (ESLint 10.9.1)

- base: 기존 룰 + react-hooks/jsx-a11y 검출 유지, "Pages directory" 경고 없음
- next: `@next/next` 룰 22개 로드, `no-img-element` off, 플러그인 키 충돌 없음 ("Pages directory" 경고는 Next 앱이 아닌 곳에서 돌릴 때만 발생 — 정상)
- `no-unused-vars` 중복 해소 — `@typescript-eslint/no-unused-vars` 단일 리포트 확인
- `index.js`: default === base, `{ next }` named export 정상

**소비 측**

| 패키지 | import 방식 |
| --- | --- |
| utils · hooks · RN | `import eslintConfig from '@bbodek/eslint-config'` (기존 유지) |
| biz-ui · internal-ui · storybook · Next 앱 | `import { next } from '@bbodek/eslint-config'` |

---

### 4. ~~DOTOLI-282 eslint-config legacy 설정 추가~~ (취소)

> **2026-08-26 결정으로 취소됨.** legacy 완화 preset을 만들지 않는다. 기존 레포 6개에도 신규 룰(base)을 전부 적용하고, 에러가 발생하면 해당 프로젝트 전체 코드 수정을 진행한다. 아래는 취소 전 원래 계획 (기록용).

기존 제품 레포 6개(bbodek-internal · admin · kids · kindergarten-admin · payments · bbodek-ui, ESLint 8 + 사내 룰 미적용)가 버전 마이그레이션을 룰 강화와 분리해 먼저 진행할 수 있도록 완화 preset을 추가한다.

**설계 원칙**: 완화는 `off`가 아니라 `warn` — `--max-warnings N`으로 상한을 두고 점진 감축, 0 도달 시 base 전환

**base·legacy 모두 error 유지 (버그 예방)**

- `eqeqeq`, `no-var`, `prefer-template`, `@typescript-eslint/no-explicit-any`, `react-hooks/rules-of-hooks`, `no-unused-vars`

**legacy에서 warn으로 완화 (스타일 통일)**

- `prefer-arrow-functions/prefer-arrow-functions`, `@typescript-eslint/naming-convention`(boolean prefix), `no-restricted-syntax`(3 depth 객체 접근), `@stylistic/padding-line-between-statements`, `react/jsx-sort-props`, `no-nested-ternary`, `no-console`

**함께 할 것**

- README에 한시적 preset임을 명시 (warn 0 목표 → base 전환)
- 완화한 룰마다 주석으로 이유 한 줄

**참고**: 정확한 완화 목록은 실제 레포 적용 후 위반 건수 측정으로 조정 권장

---

### 5. 소비 패키지 ESLint 10 적용 (DOTOLI-283 · 291~294)

선행: DOTOLI-279 · DOTOLI-280 · DOTOLI-281

**공통 작업**

1. 각 패키지 `eslint` devDependency `^10` 상향
2. Next 사용 패키지는 `eslint.config.mjs`에서 `import { next } from '@bbodek/eslint-config'`로 전환
3. `eslint-config-next`가 optional peer(`^16`)로 바뀌므로 Next 사용 패키지는 직접 devDependency에 추가 — 15.x는 ESLint 10에서 로드 불가하므로 반드시 `^16` (281 결정 참고)
4. 각 패키지 lint 통과 확인 + 신규 룰 위반 코드 수정

**공통 결정 (2026-08-26, 위반 측정 후)**

- `@typescript-eslint/no-empty-object-type` 123건(utils 12 · biz-ui 17 · internal-ui 94)은 코드 수정 대신 base config에 `allowInterfaces: 'with-single-extends'` 옵션 적용 — 단일 extends 빈 인터페이스는 확장 포인트 관용 패턴으로 허용 (utils 티켓에서 config 변경 수행)
- `jsx-a11y/no-autofocus`(biz-ui 4 · internal-ui 2)는 UI 라이브러리의 정당한 autoFocus 지원이므로 개별 disable 주석 + 사유
- internal-ui의 react-hooks `set-state-in-effect` 계열 6건은 동작 유지 확인하며 해당 티켓에서 수정
- warn(exhaustive-deps 등)은 lint 통과에 영향 없어 이번 범위에서 미수정

**티켓별 범위**

| 티켓 | 패키지 | preset | 측정된 에러 |
| --- | --- | --- | --- |
| DOTOLI-283 | `apps/utils` | default(base) 유지 | 13 (empty-object 12 + no-unused-expressions 1) |
| DOTOLI-291 | `apps/hooks` | default(base) 유지 | 0 (warn 6) |
| DOTOLI-292 | `apps/storybook` | `{ next }` 전환 | 측정 불가 — `eslint-plugin-storybook ^0.12` 크래시, `^10` 상향 필요 |
| DOTOLI-293 | `apps/biz-ui` | `{ next }` 전환 | 24 (empty-object 17 + jsx-a11y 7) |
| DOTOLI-294 | `apps/internal-ui` | `{ next }` 전환 | ~120 (empty-object 94 + jsx-a11y 14 + set-state-in-effect 6 등) |

**제외**: `susemi/apps` 2개(assistant · email-signature)는 별도 레포이므로 범위 제외 → 아래 6번 후속 목록에 포함

---

### 6. 후속 — 외부 FE 레포 적용 (미착수)

dotoli 밖의 제품 레포에도 `@bbodek/eslint-config` 신판(ESLint 10 + base/next preset) 적용이 필요하다. DOTOLI-282 취소 결정에 따라 **legacy 완화 없이 신규 룰 전부 적용하고, 에러 발생 시 해당 레포 전체 코드 수정**으로 진행한다.

| 레포 | 현재 eslint | 비고 |
| --- | --- | --- |
| bbodek-internal | `^8.56.0` | flat config 전환 선행 필요 |
| bbodek-admin | `^8.49.0` | flat config 전환 선행 필요 |
| bbodek-kids | `^8.56.0` | flat config 전환 선행 필요 |
| bbodek-kindergarten-admin | `^8.56.0` | flat config 전환 선행 필요 |
| bbodek-payments | `^8.56.0` | flat config 전환 선행 필요 |
| bbodek-ui | `^8.54.0` | flat config 전환 선행 필요 |
| susemi/apps (assistant · email-signature) | `^9.39.1` | 이미 flat config — 버전 상향 + preset 전환만 |

- [ ] bbodek-internal
- [ ] bbodek-admin
- [ ] bbodek-kids
- [ ] bbodek-kindergarten-admin
- [ ] bbodek-payments
- [ ] bbodek-ui
- [ ] susemi/apps — assistant
- [ ] susemi/apps — email-signature

**공통 작업** (dotoli 패키지 적용에서 검증된 절차)

1. `@bbodek/eslint-config` 최신 버전 설치 + `eslint` devDependency `^10`
2. Next 앱은 `import { next } from '@bbodek/eslint-config'` + `eslint-config-next@^16` devDependency (15.x는 ESLint 10에서 로드 불가)
3. 순수 라이브러리/비Next는 default(base) import
4. lint 실행 → 위반 측정 → 전체 코드 수정 (dotoli에서의 규모 참고: internal-ui 33건 에러)

**주의사항** (dotoli 적용에서 확인된 함정)

- ESLint 8 → 10 직행이므로 flat config 미전환 레포는 config 마이그레이션이 선행되어야 함
- 구버전 플러그인 크래시 주의: `@typescript-eslint` v7↓, `@stylistic` v4↓, `eslint-plugin-prefer-arrow-functions` 3.6↓, `eslint-plugin-storybook` 0.12↓ 전부 ESLint 10에서 크래시
- `eslint-plugin-react` 7.37.5의 `version: 'detect'` 크래시 → base가 `settings.react.version: '19'` 고정, React 19가 아닌 레포는 오버라이드 필요
