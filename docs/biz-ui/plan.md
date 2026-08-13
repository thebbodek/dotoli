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
- [x] DOTOLI-228 biz-ui Badge 구현

### biz-ui Order 컴포넌트

- [x] DOTOLI-229 biz-ui OrderBoxCell 구현
- [x] DOTOLI-230 biz-ui OrderBox 구현
- [x] DOTOLI-231 biz-ui OrderDateInfo 구현
- [ ] DOTOLI-232 biz-ui QuantityStepper 구현
- [ ] DOTOLI-233 biz-ui OrderInputCard 구현

Button 계열 후속 3종은 신규 베이스 컴포넌트 없이 바로 착수 가능합니다 — `Icon` · `ButtonIcon` · `BUTTON_TOUCH_TARGET_STYLE`이 이미 있습니다. 권장 순서는 Filter → FloatingPill → IconButton입니다.

DOTOLI-224로 Figma Button 섹션이 전부 끝나고 DOTOLI-226부터 Input 계열입니다. InputField는 Button 계열 산출물을 그대로 물어 씁니다 — 트레일링 아이콘은 `IconButton`(`sm`=24px), `verify`의 확인 버튼은 `CtaButton`(`sm`=32px)이 크기까지 정확히 맞습니다.

`base/white`는 Filter에서 **별도 토큰을 만들지 않고 Tailwind 기본 `white`를 쓰는 것으로 확정**했습니다 (Figma `base/white`가 `#ffffff`로 동일). FloatingPill · IconButton도 이 결정을 따릅니다 — [`components/button.md`](./components/button.md) 「계열 공통 결정」.

DOTOLI-227 다음은 Figma [Order 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=203-847&m=dev) (`203:847`)의 컴포넌트 세트 5종입니다. **Badge를 먼저 넣습니다** — Order 섹션 밖(`75:4714`)에 있지만 OrderInputCard의 `inputClosed`가 실제로 물어 씁니다. 순서는 DOTOLI-228 Badge → 229 OrderBoxCell → 230 OrderBox → 231 OrderDateInfo → 232 QuantityStepper → 233 OrderInputCard이고, 이 중 **231 · 232는 선행이 없어 병렬로 가도 됩니다.**

의존 관계는 두 갈래뿐입니다.

| 컴포넌트          | 무엇을 물어 쓰는가                                        |
| ----------------- | --------------------------------------------------------- |
| `OrderBox`        | `OrderBoxCell` (인스턴스 4개)                             |
| `QuantityStepper` | `IconButton` `lg`(40px) — 기구현                          |
| `OrderInputCard`  | `CtaButton` `sm`(32px) — 기구현 · `Badge` — **이번에 신규** |

Order 계열은 `src/components/Order/` 그룹을 새로 엽니다. Badge는 계열이 아직 없어 `src/components/Badge/`에 단독으로 둡니다.

---

## 태스크 상세

**완료된 티켓은 상세를 걷어내고 링크만 둡니다.** 착수 전 계획과 실제 구현은 반드시 갈리는데, 그때 진실은 구현 기록 쪽입니다. 계획을 그대로 두면 볼 때마다 어느 쪽이 맞는지 대조해야 하고 파일만 단조 증가합니다. 유지 규칙은 [`apps/biz-ui/CLAUDE.md`](../../apps/biz-ui/CLAUDE.md) 「문서 유지」를 따릅니다.

### 완료된 티켓

| 티켓       | 작업                                          | 기록                                                                             |
| ---------- | --------------------------------------------- | -------------------------------------------------------------------------------- |
| DOTOLI-213 | 패키지 생성 및 빌드 환경 구성                 | [frontend.md](./frontend.md)                                                     |
| DOTOLI-214 | 스타일 레이어 및 디자인 토큰 (color · typography) | [frontend.md](./frontend.md)                                                  |
| DOTOLI-215 | Storybook 연동 및 문서화                      | [frontend.md](./frontend.md)                                                     |
| DOTOLI-217 | 토큰 프리픽스 제거 및 컴포넌트 컨벤션 문서화  | [frontend.md](./frontend.md) · [CLAUDE.md](../../apps/biz-ui/CLAUDE.md)          |
| DOTOLI-218 | 기반 프리미티브 (Icon · Typography · Flex)    | [frontend.md](./frontend.md)                                                     |
| DOTOLI-219 | CtaButton (+ `ButtonIcon`)                    | [components/button.md](./components/button.md)                                   |
| DOTOLI-222 | Filter                                        | [components/button.md](./components/button.md)                                   |
| DOTOLI-223 | FloatingPill (+ `--shadow-20`)                | [components/button.md](./components/button.md)                                   |
| DOTOLI-224 | IconButton                                    | [components/button.md](./components/button.md)                                   |
| DOTOLI-226 | InputField (+ `Input/shared` · `InputMessage`) | [components/input.md](./components/input.md)                                    |
| DOTOLI-227 | TextArea (+ shadow · radius 토큰 스케일)      | [components/input.md](./components/input.md)                                     |
| DOTOLI-228 | Badge                                         | [components/badge.md](./components/badge.md)                                     |
| DOTOLI-229 | OrderBoxCell                                  | [components/order.md](./components/order.md)                                     |
| DOTOLI-230 | OrderBox                                      | [components/order.md](./components/order.md)                                     |
| DOTOLI-231 | OrderDateInfo                                 | [components/order.md](./components/order.md)                                     |

계획 단계에서만 의미가 있던 것(사전 점검 표 · 생성 파일 목록 · API 초안)은 실물 코드가 대신하므로 남기지 않았습니다.

---

### DOTOLI-232 · QuantityStepper 구현

Figma: [QuantityStepper](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=302-1573&m=dev) (`302:1573`) — 문서용 프레임. 컴포넌트 세트는 `199:823`입니다.

Order 계열에서 **처음으로 상호작용이 있는 컴포넌트**입니다. 선행은 기구현 `IconButton`뿐입니다.

**Variant 축**

| 축      | 값                   |
| ------- | -------------------- |
| `state` | `empty` · `filled`   |

**`state`를 prop으로 열지 않습니다.** 값 유무에서 파생합니다 — CtaButton · Filter · IconButton · InputField와 같은 판단입니다.

**실측 스펙** (폭 312px는 문서 값, 실제로는 fill)

| 영역            | 값                                                            |
| --------------- | ------------------------------------------------------------- |
| 상품 이미지     | `h-[80px]` · `w-full` · `rounded-8` · `object-contain`        |
| 이미지 ↔ 상품명 | gap 2px                                                       |
| 상품명          | `body-semibold` `gray/800` · 가운데 정렬                      |
| 상품 블록 ↔ 스테퍼 | gap 12px                                                   |
| 스테퍼 행       | gap 6px                                                       |
| 감소 · 증가 버튼 | `IconButton` `lg`(40px) + `Minus` · `Plus` 아이콘 24px        |
| 값 박스         | `flex-1` · `h-[46.67px]` · `bg-gray-50` · 테두리 1px `gray/200` · `rounded-6` · `px-[18px]` |
| 값 텍스트       | `heading-5` — 값 있음 `gray/900` / 플레이스홀더 `gray/300`    |
| 스테퍼 ↔ 총계   | gap 11px                                                      |
| 총계 pill       | `rounded-full` · `px-[12px] py-[2px]` · `label-semibold`      |
| 총계 색         | 값 있음 `bg-blue-50` `text-blue-500` / 없음 `bg-gray-50` `text-gray-300` |

**Figma와 다르게 가는 지점 2개** — 둘 다 디자이너 확인 완료입니다.

| 항목          | Figma                                          | 구현 (채택)                              |
| ------------- | ---------------------------------------------- | ---------------------------------------- |
| 값 텍스트     | `body/18_b` (Bold 18px / lh 1.5 / ls -0.18px) — 미등록 스타일 | `heading-5` (Bold 18px / lh 1.45 / ls -1px) |
| 값 박스 테두리 | 0.667px                                        | 1px                                      |

`body/18_b`는 biz-ui 타이포 토큰 18종 어디에도 없는 값이었습니다. 0.667px은 FloatingPill의 0.5625px과 같은 소수점 stroke 사례입니다.

**비활성 규칙** — Figma 주석 `337:3554`.

> 빈박스 수량이 0 일때 - 버튼 비활성화

값이 0이면 감소 버튼을 `disabled`로 둡니다. `IconButton`이 `disabled`에서 `text-gray-300`으로 빠지는 게 `empty` 심볼의 흐린 `Minus`와 맞습니다.

**API 초안**

| prop          | 비고                                                    |
| ------------- | ------------------------------------------------------- |
| `value`       | 수량. 0이면 플레이스홀더 노출 + 감소 버튼 비활성        |
| `onChange`    | 증감 결과를 숫자로 올려보냄                             |
| `imageUrl` · `name` | 상품 이미지 · 상품명                              |
| `placeholder` | 기본값 `얼마나 시킬까요`                                |
| `total`       | 총계 pill 숫자. `총 {total}개` 형식은 컴포넌트가 조립   |
| `max`         | 상한. 도달 시 증가 버튼 비활성                          |

**주의사항**

규칙은 여기서 정의하지 않습니다. biz-ui 공통 규칙은 [`apps/biz-ui/CLAUDE.md`](../../apps/biz-ui/CLAUDE.md)를 따릅니다.

- 이미지는 `<img>`로 직접 그립니다. biz-ui에 이미지 프리미티브가 없고 이 컴포넌트만 쓰므로 새로 만들지 않습니다.
- `IconButton`은 `aria-label`이 필수입니다. 감소·증가에 각각 넣습니다.
- 값 박스 높이 46.67px은 Figma 실측값 그대로입니다. 소수점이 거슬리면 47px 반올림 여부를 디자이너에게 확인합니다.

**디자인 확인 필요**

| 항목            | 내용                                                                       |
| --------------- | -------------------------------------------------------------------------- |
| 직접 입력       | 값 박스가 플레이스홀더를 가진 인풋 형태입니다. 키보드로 직접 입력할 수 있는지, 버튼으로만 조절하는지 |
| 상한            | 증가 버튼의 비활성 조건이 정의되어 있지 않습니다                            |
| 총계 문구       | `총 {n}개` 형식이 고정인지 (단위가 품목마다 다를 수 있는지)                |

**Storybook**

`apps/storybook/src/stories/biz-ui/QuantityStepper.stories.tsx`, `meta.title`은 `core/biz-ui/Order/QuantityStepper`. 스토리 3종 (`Default` · `Interactive` · `States`).

---

### DOTOLI-233 · OrderInputCard 구현

Figma: [OrderInputCard](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=302-1204&m=dev) (`302:1204`) — 문서용 프레임. 컴포넌트 세트는 `309:1965`입니다.

Order 섹션에서 가장 큰 컴포넌트이고 **DOTOLI-228(Badge)이 선행**입니다.

**Variant 축**

| 축            | 값                                                          |
| ------------- | ----------------------------------------------------------- |
| `orderStatus` | `inputRequired` · `noOrder` · `completed` · `inputClosed`    |
| `isHoliday`   | boolean                                                     |
| 날짜 노출     | boolean (Figma `date` = `none` · `visible`)                 |

**심볼 10개는 조합 예시입니다. 축 3개를 독립으로 구현합니다.**

4×2×2 = 16 중 10개만 그려져 있습니다 (누락: `noOrder`+평일 2종, `completed`+휴일 2종, `inputClosed`+날짜없음 2종). 결손 조합을 별도 케이스로 만들지 않고 **각 축이 자기 몫의 스타일만 담당**하게 해서 소비처가 자유롭게 조합하도록 합니다. 실측 결과 축끼리 실제로 독립이라 이렇게 하면 그려지지 않은 6조합도 자동으로 나옵니다.

| 축            | 담당하는 것                                                  |
| ------------- | ------------------------------------------------------------ |
| `orderStatus` | 카드 배경 · 테두리 · 우측 액션 · 요일 뱃지 색 계열           |
| `isHoliday`   | 날짜 문구 `· 휴일` 접미어 · `inputRequired`일 때 요일 뱃지 색 |
| 날짜 값 유무  | 날짜 문구 노출                                               |

**실측 스펙 — 카드** (폭 340px는 문서 값, 실제로는 fill)

| 항목    | 값                                    |
| ------- | ------------------------------------- |
| radius  | 16px → `rounded-16`                   |
| padding | `px-[20px] py-[14px]`                 |
| 테두리  | 1px                                   |

| `orderStatus`   | 배경      | 테두리       | 우측 액션                                    |
| --------------- | --------- | ------------ | -------------------------------------------- |
| `inputRequired` | `white`   | `gray/100`   | `CtaButton` `primary`/`filled`/`sm` — 주문입력  |
| `completed`     | `white`   | **`blue/300`** | `CtaButton` `primary`/`outlined`/`sm` — 주문수정 |
| `noOrder`       | `gray/50` | `gray/100`   | `CtaButton` `gray`/`outlined`/`sm` — 주문수정   |
| `inputClosed`   | `gray/50` | `gray/100`   | `Badge` `red`/`tonal` — 주문마감              |

**CtaButton 3종이 기구현 스타일과 hex까지 일치합니다.** `primary`/`filled` = `bg-blue-500 text-white`, `primary`/`outlined` = `border-blue-400 bg-white text-blue-600`, `gray`/`outlined` = `border-gray-200 bg-white text-gray-800`. `sm`(`h-[32px] px-[12px] py-[5px] rounded-6 text-label-bold`)도 Figma 실측과 같습니다. 새로 만들 것이 없습니다.

**요일 뱃지** — 40px `rounded-full`, `body-bold` 16px

| 조건                      | 배경        | 글자        |
| ------------------------- | ----------- | ----------- |
| `completed`               | `blue/50`   | `blue/500`  |
| `inputRequired` + 평일    | `gray/50`   | `gray/700`  |
| `inputRequired` + 휴일    | `red/50`    | `red/400`   |
| `noOrder` · `inputClosed` | `gray/300`  | `gray/50`   |

**비활성 상태(`noOrder`·`inputClosed`)에서는 `isHoliday`가 뱃지 색에 반영되지 않습니다.** 휴일 강조는 `inputRequired`에서만 걸립니다 — 이미 회색으로 죽은 카드에 빨강을 얹지 않는다는 뜻이고, **의도된 동작임을 확인받았습니다.** 축 독립 구현이지만 요일 뱃지 색만 `(orderStatus, isHoliday)` 2축 매퍼로 두는 이유입니다.

**날짜 · 상태 문구**

| 역할      | 토큰              | 색                                                   |
| --------- | ----------------- | ---------------------------------------------------- |
| 날짜      | `body-semibold`   | 활성 `gray/800` / 비활성(`noOrder`·`inputClosed`) `gray/400` |
| 상태 문구 | `label`           | `gray/400`                                           |

- 날짜 값이 있으면 `1일` · `29일`, 휴일이면 `5일 · 휴일`. **날짜 값이 없고 휴일이면 `휴일`만** 뜹니다.
- 상태 문구는 `orderStatus`에서 나옵니다 — `입력필요` · `주문없음` · `주문마감`. `completed`는 상태 문구 없이 날짜만 가로로 붙습니다(gap 8px).

**`completed` 전용 — 주문내역 패널**

| 항목      | 값                                                  |
| --------- | --------------------------------------------------- |
| 배경      | `bg-blue-50`                                        |
| radius    | 10px → `rounded-10`                                 |
| padding   | `px-[16px] py-[14px]`                               |
| 카드와 gap | 10px · `w-full`                                    |
| 행        | 품목명 `body` + 수량 `body-bold` · `justify-between` |
| 행 간 gap | 2px                                                 |
| 색        | 주문한 품목 `gray/800` / **주문없음 품목 `blue/200`** |

**API 초안**

| prop          | 비고                                                            |
| ------------- | --------------------------------------------------------------- |
| `orderStatus` | 4종                                                             |
| `isHoliday`   | boolean                                                         |
| `dayLabel`    | 요일 1글자 (`월` · `일`)                                        |
| `dateLabel`   | `29일`. **넘기지 않으면 날짜 문구가 나오지 않음**               |
| `items`       | `completed` 전용 주문내역 `{ name, quantity }[]`. 수량 없으면 `주문없음` |
| `onAction`    | 주문입력 · 주문수정 클릭. `inputClosed`는 버튼이 없어 호출되지 않음 |

Figma의 `date` 축을 union prop이 아니라 **`dateLabel` 유무로 파생**시킵니다. InputField가 `state` 7종을 값 유무로 접은 것과 같은 판단입니다.

**주의사항**

규칙은 여기서 정의하지 않습니다. biz-ui 공통 규칙은 [`apps/biz-ui/CLAUDE.md`](../../apps/biz-ui/CLAUDE.md)를 따릅니다.

- **스타일 매퍼를 축별로 나눠 둡니다.** `orderStatus`→카드/액션, (`orderStatus`, `isHoliday`)→요일 뱃지, `orderStatus`→문구 색. 한 Record에 10조합을 나열하면 결손 6조합이 그대로 구멍이 됩니다.
- `completed`만 세로 배치(`flex-col gap-[10px]`)이고 나머지는 가로 1행입니다. 주문내역 패널이 붙는 쪽만 축이 바뀝니다.
- Badge를 쓰는 자리는 `inputClosed` 하나뿐입니다. DOTOLI-228이 끝나야 착수할 수 있습니다.

**디자인 확인 필요**

| 항목                       | 내용                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------- |
| `completed` + 휴일         | 심볼이 없습니다. 축 독립 구현이면 요일 뱃지가 `blue`를 유지하고 날짜에 `· 휴일`만 붙는데 이게 맞는지 |
| `inputClosed` + 날짜 없음  | 심볼이 없습니다. 상태 문구 `주문마감`만 남는 형태로 갑니다                              |
| `noOrder` + 평일           | 심볼이 없습니다. 요일 뱃지가 `gray/300`으로 동일한지                                    |
| 액션 버튼 라벨             | `주문입력` · `주문수정`이 고정인지 소비처가 바꿀 수 있는지                              |

**Storybook**

`apps/storybook/src/stories/biz-ui/OrderInputCard.stories.tsx`, `meta.title`은 `core/biz-ui/Order/OrderInputCard`. `orderStatus` × `isHoliday` × 날짜 유무 매트릭스로 문서 프레임(`302:1204`)과 대조하고, **Figma에 없는 6조합도 함께 깔아** 축 독립성을 눈으로 확인합니다.

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
