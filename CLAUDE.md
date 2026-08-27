# dotoli

뽀득 디자인시스템 pnpm 모노레포입니다. `apps/`(biz-ui · internal-ui · hooks · utils · storybook)와 `packages/`(eslint-config · prettier-config 등)로 구성됩니다.

**`apps/biz-ui` 작업은 [apps/biz-ui/CLAUDE.md](apps/biz-ui/CLAUDE.md)가 우선입니다** — 이 파일보다 구체적인 규칙(컴포넌트 API·스타일·패키징)이 거기 있습니다.

# 자주 어기는 핵심 룰 (작성 전 반드시 확인)

아래 4가지는 가장 빈번하게 누락되는 항목입니다. 코드를 쓰기 **전에** 이 항목들을 어떻게 지킬지 먼저 정한 뒤 작성하세요.

## 1. 파일/모듈 분리 — 컴포넌트에 인라인 금지

컴포넌트 파일(`*.tsx`) 안에 타입/상수/유틸/훅/이펙트를 직접 선언하지 않습니다. 별도 파일로 분리하고 import 해서 사용합니다.

| 항목 | 어디로 분리 |
| --- | --- |
| `interface`/`type` | 같은 폴더의 `types/index.ts` (또는 `types.ts`) |
| 리터럴 상수, `as const` 객체 | `constants/index.ts` (또는 `constants.ts`) |
| 유틸 함수 | `utils/` |
| 커스텀 훅 | `hooks/useXxx.ts` |
| `useEffect` 로직 | `hooks/effects/useXxxEffect.ts` |

서브 컴포넌트가 생기는 시점에만 폴더로 전환합니다(biz-ui는 예외 — 그쪽 CLAUDE.md 참고). 기존 컴포넌트의 폴더링 패턴(`internal-ui`의 `components/[Group]/` 구조)을 먼저 보고 따라갑니다.

## 2. 함수 파라미터는 객체 구조 분해

`(a, b, c)`가 아니라 항상 `({ a, b, c })`. 파라미터 타입도 별도 `.ts` 파일로 분리합니다 (인라인 리터럴 타입 지양). 이벤트 콜백(`(e: MouseEvent) => {}`)은 예외.

## 3. 매직 값(숫자 + 문자열 리터럴) → 상수

상태/모드 문자열 리터럴도 매직 값입니다. 동일 관심사는 `as const` 객체로 그룹핑하고 `(typeof X)[keyof typeof X]`로 타입을 뽑습니다.

```typescript
const SEARCH_STATUS = { IDLE: 'IDLE', LOADING: 'LOADING' } as const;
type SearchStatus = (typeof SEARCH_STATUS)[keyof typeof SEARCH_STATUS];
```

예외: 배열 인덱스, 명백한 toggle 값(`-1`/`0`/`1`), 한 번만 쓰이는 UI 텍스트(toast 메시지 등), 동적으로 조합되는 문자열.

## 4. 타입 중복 금지 — Utility Types 활용

같은 도메인에 비슷한 타입이 있으면 재선언하지 말고 `Pick`/`Omit`/`Partial`/`extends`로 재사용합니다. HTML 속성은 직접 나열하지 말고 `Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | ...>` 형태로 가져옵니다. 객체 타입은 `interface`, `type`은 `interface`로 표현할 수 없을 때만 씁니다 (유니온 등). 단일 extends 빈 인터페이스(`interface XProps extends YProps {}`)는 확장 포인트 관용 패턴으로 허용됩니다.

# 작성 전 절차

1. 작업 대상 패키지의 `docs/[package]/` 문서 읽기 — `frontend.md`(구현 현황), `components/*.md`(biz-ui 컴포넌트 결정 기록)
2. 인접 패키지에 같은 성격의 구현이 이미 있는지 확인 (`internal-ui` ↔ `biz-ui`는 자매 DS라 패턴이 정립되어 있음 — 먼저 찾아보고 없을 때 새로 설계)
3. 위 핵심 룰 4가지를 어떻게 지킬지 결정 후 작성

# 작성 후 검토

큰 작업(여러 파일 변경, 신규 컴포넌트/훅, 리팩터링)이 마무리되면 `frontend-rules-reviewer` 서브에이전트로 셀프 리뷰를 받습니다. 사용자가 "리뷰해줘", "끝났어" 같은 신호를 보내면 자동으로 위임합니다.

리뷰 결과의 `[P1]`은 보고 전에 반드시 해결, `[P2]`는 사용자에게 수정 여부 확인, `[P3]`·`[Q]`는 참고 정보로 전달합니다.

# Git / 커밋 규칙

- **커밋 전에 origin/main을 fetch/rebase** 합니다. `.githooks/post-commit`이 changeset을 자동 생성하는데, `git diff origin/main <commit>` 두 지점 diff로 변경 패키지를 계산하므로 브랜치가 main보다 뒤처지면 무관한 패키지가 changeset에 잘못 포함됩니다.
- 커밋 메시지는 `[티켓번호] [제목]` **단일 라인** (body·footer 없음). 티켓 커밋 예: `DOTOLI-283 utils ESLint 10 적용`. 문서만 변경 시 `docs(스코프): 제목` + `SKIP_HOOKS=true`(changeset 불필요).
- 스테이징은 명시적으로 `git add <파일>` (`git add .` 지양). 태스크별 브랜치 분기(직전 브랜치에서 stack).
- plan.md 체크박스 갱신은 해당 티켓 커밋에 amend로 포함합니다.

# 의존성 / lockfile

- pnpm 모노레포입니다. `pnpm update`·`pnpm install --filter`는 **레포 전체 의존성을 범위 내 최신으로 재해석**해 lockfile diff가 수천 줄이 될 수 있습니다. 의존성 변경은 **package.json 직접 편집 → `pnpm install --lockfile-only` → diff 확인 → `pnpm install`** 순서로 최소 변경을 유지합니다.
- `packages/eslint-config`는 ESLint 10 기준입니다 — 상세 결정·함정 목록은 [docs/eslint-config/frontend.md](docs/eslint-config/frontend.md) 참고.

# 검증

```bash
pnpm --filter <패키지명> lint
pnpm --filter <패키지명> build
```

biz-ui·internal-ui는 빌드 후 storybook(`pnpm --filter storybook dev`, 6006)으로 확인합니다. 컴포넌트를 새로 export 했으면 storybook 개발 서버를 재시작해야 합니다 (webpack `managedPaths`가 dist 재빌드를 감지하지 못함).

# 프로젝트 문서

`docs/[package]/`를 확인합니다.

- `docs/[package]/frontend.md` — 구현 현황 문서. 작업이 일단락되면 작성/업데이트 여부를 물어봅니다.
- `docs/biz-ui/components/<name>.md` — biz-ui 컴포넌트별 실측 스펙·결정 기록 (영구)
- `docs/[package]/plan.md` — 개발 계획 (티켓 완료 시 걷어내고 frontend.md로 이관)

같은 사실을 두 곳에 쓰지 않습니다 — 규칙은 한 곳에서만 정의하고 나머지는 가리키기만 합니다.
