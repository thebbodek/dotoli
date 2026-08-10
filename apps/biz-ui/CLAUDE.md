# @bbodek/biz-ui

뽀득 비즈파트너(모바일 WebView)용 디자인시스템입니다. `@bbodek/internal-ui`(어드민·데스크톱)와 **완전히 독립**이며 서드파티만 직접 의존합니다.

## 작성 전 절차

**코드를 쓰기 전에 아래를 순서대로 끝냅니다.** 3번까지 마치기 전에 파일을 만들지 않습니다.

1. **문서 확인** — `docs/biz-ui/plan.md`에서 해당 티켓의 범위와 결정 사항을 읽습니다. 이미 만든 컴포넌트 계열을 건드리면 `docs/biz-ui/components/<name>.md`도 함께 읽습니다. 환경·토큰·스타일 레이어 관련이면 `docs/biz-ui/frontend.md`.
2. **이 파일 전체를 읽습니다** — 컴포넌트 API 축 · 스타일 · 패키징 규칙.
3. **[코드 규칙](#코드-규칙) 4가지를 어떻게 지킬지 먼저 정합니다** — 특히 무엇을 어느 파일로 분리할지.
4. Figma에서 variant 축과 스펙을 **직접 실측**합니다. 다른 DS의 값을 추정으로 옮기지 않습니다.

biz-ui는 제품 기능이 아니라 DS 인프라라 `spec.md` · `api.md`가 없습니다. 요구사항 1차 출처는 **Figma**이고, 문서는 결정 기록입니다.

작업이 끝나면 `docs/biz-ui/components/<name>.md`에 실측 스펙 · 결정 · 디자인 확인 필요 목록을 남깁니다. 규칙을 새로 정했으면 이 파일에 씁니다 — **규칙은 한 곳에서만 정의하고**, 코드 주석·`plan.md`·커밋 메시지에서는 가리키기만 합니다.

## 코드 규칙

가장 자주 빠뜨리는 5가지입니다. 1~4는 현재 `src/`가 전부 지키고 있으니 깨뜨리지 않습니다. 5는 이후 작성분부터 적용합니다.

**1. 컴포넌트 파일에 인라인 선언 금지.** `*.tsx`에는 컴포넌트만 둡니다. 타입은 `types/`, 상수는 `constants/`, 유틸은 `utils/`로 분리하고 `@/` 절대경로로 import 합니다. DS 패키지라 컴포넌트는 서브 컴포넌트가 없어도 폴더로 만들고 배럴(`index.ts`)을 둡니다.

```
components/<Group>/<Component>/
├── <Component>.tsx     # 컴포넌트만
├── constants/index.ts
├── types/index.ts
├── utils/              # 필요할 때만
└── index.ts            # 배럴. 내부 전용 유틸은 export 하지 않음
```

계열이 생기면 `<Group>/shared/`에 **진짜 공통인 것만** 둡니다. `variant`·`theme`·`size`는 값이 컴포넌트마다 달라 여기 두지 않습니다.

**2. 함수 파라미터는 객체 구조 분해.** `(a, b)`가 아니라 항상 `({ a, b })`. 파라미터 타입도 `types/`로 분리합니다 (`({ a }: { a: string })` 같은 인라인 리터럴 타입 지양). 이벤트 핸들러는 예외입니다.

**3. 매직 값은 상수로.** 숫자뿐 아니라 상태·모드를 나타내는 **문자열 리터럴도 매직 값**입니다. 동일 관심사는 `as const` 객체로 묶고 `(typeof X)[keyof typeof X]`로 타입을 뽑습니다 (`CTA_BUTTON_VARIANTS` 참고). 배열 인덱스와 한 번만 쓰는 UI 텍스트는 예외입니다.

**4. 타입 중복 금지.** 같은 계열에 비슷한 타입이 있으면 재선언하지 말고 `Pick`·`Omit`·`Partial`·`extends`로 재사용합니다. HTML 속성은 직접 나열하지 말고 `Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'disabled' | …>` 형태로 가져옵니다.

**5. 주석은 최대한 지양.** 코드를 읽으면 알 수 있는 것은 쓰지 않습니다. 예외 상황 — 코드에 드러나지 않는 판단 근거, 피해 간 함정, 일부러 하지 않은 것 — 에만 답니다. 실측값·결정 기록은 주석이 아니라 `docs/biz-ui/components/<name>.md`가 맡습니다.

쓰더라도 **화면에 노출되지 않는 진짜 주석**으로 씁니다. Storybook은 스토리 위 JSDoc 블록과 `argTypes.description`을 Docs 페이지에 그대로 렌더하므로 스토리 파일에는 둘 다 쓰지 않고, 남길 게 있으면 `//`로 답니다.

## 컴포넌트 API

**Figma BIZpartner 파일의 실제 축을 직접 실측해서 판단합니다.** `@bbodek/internal-ui`(어드민·데스크톱)는 타깃이 달라 축이 겹치지 않으므로 그쪽 구현을 그대로 옮기지 않습니다.

| 항목              | internal-ui                                 | biz-ui                                                                     |
| ----------------- | ------------------------------------------- | -------------------------------------------------------------------------- |
| `size` 스케일     | `xs \| sm \| md \| lg`                      | CtaButton은 `sm \| md \| lg` — `xs` 없음                                    |
| `theme` 값        | Button은 `primary \| gray \| red \| green \| yellow` | CtaButton은 `primary \| gray` 2종                                  |
| 상호작용 상태     | `hover` 중심                                | Figma가 `hover`·`pressed` 모두 정의. 터치 기기에선 `pressed`(`:active`)가 주력 |
| `responsive` prop | `mobile / tablet / desktop`                 | 모바일 단일 타깃이라 넣지 않음                                              |
| radius 토큰       | `--radius-in-*` 스케일                      | 새로 만들지 않음. Figma 8px/6px가 `rounded-lg`/`rounded-md`와 일치          |
| Storybook 타이틀  | `core/internal-ui/…`                        | `core/biz-ui/…`                                                             |

**`theme` union은 컴포넌트별로 정의합니다.** 값이 컴포넌트마다 달라서입니다 — CtaButton은 `primary | gray`, internal-ui IconButton은 `hover-gray | hover-white | bg-white | white | dark`. internal-ui도 같은 방식이라 biz-ui만의 차이는 아닙니다. 버튼 계열 `shared`에는 `variant`·`theme`·`size`를 두지 않습니다.

### `theme='primary'` ↔ 컬러 토큰 `blue`

이름이 다른 것은 의도된 것이고 레이어가 다릅니다. **토큰**은 Figma 변수명 그대로(`--color-blue-500`), **컴포넌트 API**는 역할(`theme='primary'`)입니다. 맞추려고 어느 한쪽을 바꾸지 않습니다.

### `hover` / `pressed`

Tailwind v4의 `hover:`는 이미 `@media (hover: hover)`로 감싸져 나오므로 **따로 래핑하지 않습니다.** 터치 기기에서는 `active:`(pressed)만 걸립니다.

### 히트 영역 확장

**디자이너가 Figma 주석으로 지정한 대상만 확장합니다.** 시각 크기는 Figma 값 그대로 두고 히트 영역만 넓힙니다 — 레이아웃이 밀리면 안 되기 때문입니다. 지정되지 않은 컴포넌트·사이즈에 임의로 넣지 않습니다.

구현은 `BUTTON_TOUCH_TARGET_STYLE`(`::before`를 `inset: -6px`로 확장)이고 쓰는 쪽에서 `position: relative`를 함께 겁니다.

## 스타일 규칙

- **토큰에 프리픽스를 붙이지 않습니다.** `--color-blue-500` · `text-body` · `safe-area-top`. internal-ui의 `in-`은 그쪽이 다른 DS와 한 앱에서 공존하느라 붙인 것이라 따라가지 않습니다.
- **컬러·타이포 이름은 Figma 명명을 그대로** 씁니다. `blue`를 `primary`로 개명하지 않습니다.
- **`text-*`에 `/` 수식어를 쓰지 않습니다.** 컬러(`text-blue-500/50`=투명도)와 타이포(`text-body/50`=line-height)에서 뜻이 다르고, 타이포 쪽은 `font-weight`·`letter-spacing`이 사라집니다. 경고 없이 컴파일되므로 규칙으로 막습니다.
- **`Icon`의 `weight`는 `regular` · `bold` · `fill` 3종뿐입니다.** `globals.css`가 이 3종 웹폰트만 import 하므로 나머지를 넘기면 렌더되지 않습니다. `ICON_WEIGHTS`로 타입에서 막혀 있습니다.
- **safelist에 `hover:` / `focus:` / `active:`를 넣지 않습니다.** variant는 컴포넌트 소스에 리터럴로 남아 `@source '../../dist'`가 스캔합니다. 넣으면 생성 CSS가 3배가 됩니다.

## 패키징 규칙

- **`dependencies`에 패키지를 추가하면 `rollup.config.mjs`의 `external`에도 반드시 넣습니다.** `@dotoli/rollup-config`는 `peerDepsExternal()`만 쓰므로, `external`에 없으면 그대로 번들에 인라인되고 소비자는 같은 패키지를 두 벌 받습니다. `@phosphor-icons/core`를 빠뜨렸을 때 dist가 25KB → 67KB로 불었습니다.
- `external`은 **정확히 일치**할 때만 걸립니다. 서브패스(`es-toolkit/compat`)를 쓰면 따로 등록해야 합니다.
- 빌드 후 `dist/index.es.js` 상단의 `import` 목록으로 external 처리를 확인할 수 있습니다.

## 검증

```bash
pnpm --filter @bbodek/biz-ui build && pnpm --filter @bbodek/biz-ui lint
```

Storybook은 `pnpm --filter storybook dev`(6006). 컴포넌트를 추가하면 `core/biz-ui/…` 스토리로 Figma와 대조합니다. 스토리 argTypes는 값을 하드코딩하지 말고 `Object.values(<상수>)`로 뽑습니다.

`dist`는 gitignore 대상이지만 `@source '../../dist'`가 스캔하므로, 클래스가 안 먹으면 **빌드부터 다시** 합니다.

## 작성 후 검토

여러 파일을 바꿨거나 컴포넌트·훅을 새로 만들었으면 `frontend-rules-reviewer` 서브에이전트로 셀프 리뷰를 받습니다. "리뷰해줘" · "끝났어" 같은 신호에도 위임합니다.

검토 항목:

1. 이 파일의 [코드 규칙](#코드-규칙) 4가지
2. **`apps/internal-ui`에 같은 성격의 구현이 이미 있는지, 있다면 그 컨벤션·패턴을 따랐는지.** 같은 모노레포의 자매 DS라 배럴 구성 · 상수·타입 분리 · 스토리 `argTypes` 작성법이 이미 정립돼 있습니다. **먼저 찾아보고 없을 때 새로 설계합니다.**
3. internal-ui와 갈라진 지점이 있으면 **Figma 실측이나 모바일 제약 때문인지**. 근거가 있으면 이 파일이나 `docs/biz-ui/components/<name>.md`에 남기고, 없으면 맞춥니다.

`[P1]`은 보고 전에 해결, `[P2]`는 수정 여부를 사용자에게 확인, `[P3]`·`[Q]`는 참고로 전달합니다.

> 이 레포에는 `.frontend-rules/`가 없습니다. 리뷰 기준은 이 파일과 `apps/internal-ui` 구현입니다.
> 값을 인용할 땐 **출처가 biz-ui Figma인지 internal-ui 코드인지 명시하고, 소스를 직접 엽니다.**
> 두 DS는 값이 다른 게 정상이라 출처를 빼면 나중에 불일치로 오독됩니다.
