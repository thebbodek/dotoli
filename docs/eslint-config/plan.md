# eslint-config — ESLint 10 대응 및 설정 개편 개발 계획

## 개요

`@bbodek/eslint-config`를 ESLint 10에서 동작하도록 정리하고, 누락된 react-hooks·jsx-a11y 플러그인을 추가하며, base/next/legacy 3종 preset으로 분리한다. 마지막으로 dotoli 하위 패키지 5개에 일괄 적용한다.

- 대상 패키지: `packages/eslint-config`
- 적용 대상: `apps/biz-ui`, `apps/internal-ui`, `apps/storybook`, `apps/hooks`, `apps/utils`
- 의존 관계: DOTOLI-283은 DOTOLI-279 · 280 · 281 선행 필요

Jira: [DOTOLI-279](https://thebbodek.atlassian.net/browse/DOTOLI-279) ~ [DOTOLI-283](https://thebbodek.atlassian.net/browse/DOTOLI-283)

---

## Tasks

### eslint-config 패키지

- [x] DOTOLI-279 eslint-config ESLint 10 대응
- [ ] DOTOLI-280 eslint-config react-hooks·jsx-a11y 룰 추가
- [ ] DOTOLI-281 eslint-config base·next 설정 분리
- [ ] DOTOLI-282 eslint-config legacy 설정 추가

### 소비 패키지 적용

- [ ] DOTOLI-283 dotoli 패키지 ESLint 10 일괄 적용

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

**소비 측**

| 패키지 | import 방식 |
| --- | --- |
| utils · hooks · RN | `import eslintConfig from '@bbodek/eslint-config'` (기존 유지) |
| biz-ui · internal-ui · storybook · Next 앱 | `import { next } from '@bbodek/eslint-config'` |

---

### 4. DOTOLI-282 eslint-config legacy 설정 추가

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

### 5. DOTOLI-283 dotoli 패키지 ESLint 10 일괄 적용

선행: DOTOLI-279 · DOTOLI-280 · DOTOLI-281

**대상**

| 패키지 | 현재 | 적용 |
| --- | --- | --- |
| `apps/biz-ui` | `eslint ^9.26.0` | `^10` + `{ next }` import |
| `apps/internal-ui` | `eslint ^9.26.0` | `^10` + `{ next }` import |
| `apps/storybook` | `eslint ^9.26.0` | `^10` + `{ next }` import |
| `apps/hooks` | `eslint ^9.26.0` | `^10` + default(base) 유지 |
| `apps/utils` | `eslint ^9.26.0` | `^10` + default(base) 유지 |

**작업 내용**

1. 각 패키지 `eslint` devDependency `^10` 상향
2. Next 사용 패키지는 `eslint.config.mjs`에서 `import { next } from '@bbodek/eslint-config'`로 전환
3. `eslint-config-next`가 optional peer로 바뀌므로 Next 사용 패키지는 직접 devDependency에 추가
4. 각 패키지 lint 통과 확인

**제외**: `susemi/apps` 2개(assistant · email-signature)는 별도 레포이므로 범위 제외
