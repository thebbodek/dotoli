# BottomTab 구현 기록

`apps/biz-ui/src/components/BottomTab` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 이 컴포넌트 고유 사실만 둡니다.

Figma: [BottomTab 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=75-4565&m=dev) (`75:4565`). 실제 값은 심볼 `75:4576` · `75:4587` · `75:4598`에서 실측했습니다. 정책 프레임은 `524:2`(COM-001)입니다.

## 구현 현황

| 컴포넌트        | 티켓       | 공개 | 설명                                                |
| --------------- | ---------- | ---- | --------------------------------------------------- |
| `BottomTab`     | DOTOLI-249 | ✅   | `<nav>` + 탭 3개. `value` 1축                       |
| `BottomTabItem` | DOTOLI-249 | ❌   | 탭 하나. `<button>` + 아이콘 + 라벨                 |

`BottomTabItem`은 배럴에 없어 공개 API가 아닙니다 — 빌드 후 `dist/index.es.js`의 export 목록에 `BottomTab` 하나만 있는 것을 확인했습니다. 소비자가 탭을 직접 조립할 일이 없어서입니다(아래 「결정」 1번).

## Variant 축

| 축      | 값                                             | 출처     |
| ------- | ---------------------------------------------- | -------- |
| `value` | `transactionHistory` · `order` · `myInfo`      | Figma 축 |

3개가 전부 심볼로 정의돼 있습니다. **상태 축(hover · pressed · disabled)이 없습니다.**

## 실측 스펙

| 항목            | 값                                                                    |
| --------------- | --------------------------------------------------------------------- |
| 바              | 380 × 61 → **`w-full`**. 380은 모바일 화면 폭이라 고정하지 않습니다     |
| 상단 테두리     | 1px `gray/100` → `border-t border-gray-100` (아래 「결정」 4번)        |
| 배경            | `base/white` → `bg-white`                                             |
| 그림자          | `shadow/shadow-8` → `shadow-8`. 토큰과 정확히 일치                     |
| 하단 여백       | `safe-area-bottom` — 이 유틸을 실제로 쓰는 첫 컴포넌트                 |
| 탭              | 126.667 × 60 → `flex-1 h-[60px]`. 380 ÷ 3                             |
| 탭 정렬         | `flex-v-stack-center`                                                 |
| 아이콘-라벨 간격 | **-1** → `-mb-px`                                                     |
| 라벨            | `caption` → `text-caption`                                            |

`61 = 상단 테두리 1 + 탭 60`입니다.

### 아이콘

| 탭       | 글리프                | 크기 | 클래스        |
| -------- | --------------------- | ---- | ------------- |
| 거래내역 | `newspaper-clipping`  | 26   | `text-[26px]` |
| 주문     | `package`             | 26   | `text-[26px]` |
| 내정보   | `user-circle`         | 28   | `text-[28px]` |

**내정보만 28입니다.** 세 개가 같은 줄에 서는데 하나만 다른 것이라 의도 확인이 필요합니다(아래 「디자인 확인 필요」). 값 자체는 codegen과 노드 메타데이터 양쪽에서 같게 나옵니다.

### 웨이트 — Figma는 `regular`, 구현은 `fill`입니다

**`BOTTOM_TAB_ICON_WEIGHT = ICON_WEIGHTS.FILL`로 Figma 실측과 다르게 갑니다.** 구현 후 디자인 검토에서 `fill`로 정해졌고, 아래 실측은 **Figma 파일이 아직 `regular`라는 기록**으로 남깁니다. 파일이 갱신되면 이 절과 상수가 함께 맞춰집니다.

크기 축(26 · 26 · 28)과 색은 그대로입니다 — 웨이트만 바뀝니다.

판정은 **Figma가 내보낸 path와 `@phosphor-icons/core` 원본 path의 좌표 대조**입니다. checkbox.md는 글리프 바운딩만 비교했는데, 여기서는 좌표가 그대로 남아 있어 더 강한 대조가 됩니다.

`package` 기준입니다. Figma export의 첫 점이 `M20.28 5.09139`이고 26px 박스 · 글리프 원점 (24, 16) · 배율 26/256을 적용하면:

| 웨이트    | 원본 첫 점        | 26px 환산                      | Figma export |
| --------- | ----------------- | ------------------------------ | ------------ |
| `regular` | `223.68,66.15`    | **20.28 · 5.0934**             | **20.28 · 5.09139** |
| `bold`    | `225.6,62.64`     | 20.4750 · 4.7369               | 불일치       |

세 아이콘 모두 글리프 폭이 **정확히 208/256 단위**(= 좌우 24 인셋)로, `regular`의 표준 인셋과 같습니다. `bold`는 획이 두꺼워져 바깥 경계가 밀립니다.

**활성 · 비활성은 웨이트가 같습니다.** 같은 아이콘의 두 상태 SVG를 받아 비교하면 `fill` 속성 한 곳만 다르고 path는 바이트 단위로 동일합니다. 화면에서 활성 아이콘이 굵어 보이는 것은 색(`base/black`) 때문입니다. **구현도 이 축을 따라 두 상태 모두 `fill`입니다** — 「비활성은 외곽선, 활성만 채움」은 흔한 바텀탭 패턴이지만 Figma에 그런 축이 없어 만들지 않았습니다.

### 상태별 색

| 상태       | 아이콘       | 라벨         |
| ---------- | ------------ | ------------ |
| `default`  | `gray/400`   | `gray/500`   |
| `selected` | `base/black` | `base/black` |

**비활성에서 아이콘과 라벨의 색이 다릅니다**(`gray/400` ↔ `gray/500`). 컨테이너에 `text-*` 하나를 걸어 상속시킬 수 없어 둘에 따로 겁니다 — 아이콘은 클래스, 라벨은 `Typography`의 `color`라 상태 스타일이 `{ ICON: string; LABEL: ColorVariants }` 형태입니다(`QuantityStepperStateStyles` 선례).

색은 Figma가 내보낸 SVG의 `fill`에서 직접 읽었습니다 — 비활성 `#AEB5C6`(= `gray/400`), 활성 `#101828`(= `base/black`).

## 결정

- **탭 3개를 DS가 들고 있습니다.** plan.md가 이 티켓에서 정하라고 남긴 사안입니다. 정책 COM-001이 **개수 · 순서 · 라벨 · 노출 조건**을 전부 못박고 Figma의 유일한 축도 `value` 하나뿐이라, 소비자가 넘길 것이 남아 있지 않습니다. 목록을 prop으로 열면 정책이 소비 앱마다 복제되고 3개 · 순서 보장이 DS 밖으로 새어 나갑니다.

  라벨 텍스트(`거래내역` · `주문` · `내정보`)와 아이콘 키는 `BOTTOM_TAB_ITEMS` 배열에 있고 **배열 순서가 곧 정책의 탭 순서**입니다. 배열 타입은 `readonly`입니다 — 배럴이 `export * from './constants'`라 이 상수도 공개 API인데, 순서 자체가 정책이라 소비자가 `sort` · `push`로 뒤집을 수 있으면 「DS가 목록을 소유한다」가 타입에서 무너집니다.

  **다만 `readonly`는 한 겹뿐이라 원소의 필드는 아직 열려 있습니다** — `BOTTOM_TAB_ITEMS[0].label = '…'`이 `tsc`를 통과합니다(`push` · `sort`는 막힙니다). 막으려면 `BottomTabItemOption`의 필드에 `readonly`를 붙이거나 `as const satisfies readonly BottomTabItemOption[]`로 선언합니다. 순서만큼 위험하지는 않아 두었고, 정책이 라벨까지 못박는 만큼 함께 잠그는 쪽이 일관됩니다.

- **아이템 데이터와 스타일을 나눠 둡니다.** `BOTTOM_TAB_ITEMS`는 `value` · `label` · `iconKey`만 갖고, 아이콘 크기 클래스는 `BOTTOM_TAB_ITEM_ICON_STYLES: Record<BottomTabValue, string>`에 있습니다. `IconCircle`의 `ICON_CIRCLE_SIZE_STYLES`, `Divider`가 `DIVIDER_ICON_KEYS`(데이터)와 `DIVIDER_ICON_STYLE`(스타일)을 가른 것과 같은 형태이고, 덕분에 공개 타입 `BottomTabItemOption`에 원시 Tailwind 클래스가 새지 않습니다.

  `iconKey`도 재선언하지 않고 `Pick<IconProps, 'iconKey'>`로 가져옵니다 (`IconCircleProps` · `NotificationCardProps` 선례). `@phosphor-icons/core`를 직접 물지 않게 되는 부수 효과가 있습니다.

- **`BOTTOM_TAB_DEFAULT_VALUE`를 내보냅니다.** COM-001의 「주문이 기본 진입 탭」을 DS가 값으로 갖되, 컴포넌트는 제어 전용이라 초기 상태는 소비자가 쥡니다. 상수만 있으면 소비 앱이 `'order'`를 다시 적어 넣지 않아도 됩니다.

- **`<button>` + `onChange`입니다. `href`를 열지 않습니다.** biz-ui는 서드파티만 의존하는 독립 패키지라 라우터(`next/link` 등)를 물 수 없고, `as` · `renderItem` 같은 다형 prop은 CLAUDE.md 「폼 컨트롤 공통」 5번이 막는 「소비자가 매번 정해야 하는 결정」에 해당합니다. 라우팅은 `onChange`를 받은 쪽이 합니다.

  **그래서 소비자가 `value`를 어디서 가져오는지가 중요해집니다** — 아래 「API」의 「`value`는 URL에서 파생시킵니다」를 함께 봅니다.

- **`role="tablist"`이 아니라 `<nav>` + `aria-current="page"`입니다.** internal-ui의 `Tab` 계열은 `role="tab"` · `aria-selected` · `aria-controls`를 쓰지만 그쪽은 **같은 화면 안에서 패널을 바꾸는 위젯**입니다. BottomTab은 화면 자체를 바꾸는 네비게이션이라 제어할 `tabpanel`이 없고, `role="tab"`을 붙이면 보조기술이 존재하지 않는 패널을 찾습니다.

  이름이 `Tab`으로 겹치는 것은 Figma 심볼명을 따른 결과이고, ARIA 역할과는 무관합니다.

- **상단 테두리는 `border-t`입니다 — `inset-ring`이 아닙니다.** CLAUDE.md 「스타일 규칙」의 근거는 「Figma stroke는 박스를 안 키우는데 CSS border는 키운다」인데, **여기서는 Figma 프레임 61px 자체가 stroke를 포함한 값**입니다(탭 60 + 테두리 1). `inset-ring`으로 그리면 60px이 되어 오히려 실측과 어긋납니다 — `ItemCheckbox`가 `border`를 쓴 것과 같은 사례입니다.

  덧붙여 `inset-ring`은 네 변에 다 그려져 한 변만 필요한 이 자리에 맞지 않고, `box-shadow` 기반이라 `shadow-8`과 자리를 다툽니다.

- **`aria-label`은 상수입니다(`주요 메뉴`). prop으로 열지 않습니다.** 라벨 텍스트가 이미 DS 소유라 네비게이션 이름만 소비자에게 넘길 이유가 없고, 앱당 하나뿐인 컴포넌트라 구분할 대상도 없습니다. 「소비자가 매번 기억하고 정해야 하는 스위치는 만들지 않습니다」(CLAUDE.md)를 따른 것입니다.

- **위치를 스스로 잡지 않습니다.** `fixed bottom-0`을 넣지 않고 `w-full`까지만 책임집니다 — `FloatingPill`도 그림자만 갖고 위치는 쓰는 쪽이 정합니다. 화면 레이아웃(스크롤 영역과의 관계 · 키보드 회피)은 소비 앱마다 갈립니다.

- **히트 영역을 확장하지 않습니다.** 탭 하나가 126 × 60이라 `touch-target`(44px) 기준을 이미 넘고, Figma에 확장 주석도 없습니다(CLAUDE.md 「히트 영역 확장」).

- **첫 탭의 `rounded-tl-[70px]`을 옮기지 않았습니다.** codegen에 세 심볼 모두 같은 값이 나오지만, 탭에는 배경이 없고(배경은 바 컨테이너에 있음) 반경이 걸릴 표면 자체가 없어 **렌더 결과에 아무 영향이 없습니다.** Figma 잔재로 보고 버렸습니다.

## API

| prop        | 필수 | 기본값 | 비고                                              |
| ----------- | ---- | ------ | ------------------------------------------------- |
| `value`     | ✅   | —      | 제어 전용. 현재 탭                                |
| `onChange`  | ✅   | —      | `(value: BottomTabValue) => void`                 |
| `className` |      | —      | `<nav>`에 적용                                    |

내보내는 상수는 `BOTTOM_TAB_VALUES` · `BOTTOM_TAB_DEFAULT_VALUE` · `BOTTOM_TAB_STATES` · `BOTTOM_TAB_ITEMS`와 스타일 상수들입니다.

**`onChange`는 눌린 탭의 `value` 하나만 받습니다.** 이벤트 객체가 아닙니다(`QuantityStepper`의 `onChange: (value: number) => void`와 같은 형태). **이미 선택된 탭을 다시 눌러도 호출됩니다** — 재탭에 「최상단 스크롤」·「스택 리셋」을 붙이는 관례가 있어 막지 않았고, 필요 없으면 소비자가 `value === next`로 걸러냅니다.

### `value`는 URL에서 파생시킵니다 — `useState`로 들지 않습니다

탭 3개가 각각 화면이라 **진짜 상태는 URL**입니다. 컴포넌트를 제어 전용으로 둔 것은 DS가 라우터를 물 수 없어서지(위 「결정」의 `<button>` 항목), 소비자가 별도 상태를 만들라는 뜻이 아닙니다.

```tsx
const pathname = usePathname();

<BottomTab
  value={resolveTabFromPath(pathname)}
  onChange={(value) => router.replace(TAB_ROUTES[value])}
/>;
```

`useState`로 들면 **화면과 탭 하이라이트가 갈립니다.**

| 상황                          | `useState`일 때                          |
| ----------------------------- | ---------------------------------------- |
| 안드로이드 물리 뒤로가기      | 화면만 돌아가고 하이라이트는 그대로 남음 |
| 딥링크 · 푸시로 특정 탭 진입  | 기본값 탭에 하이라이트가 켜져 있음       |
| 새로고침                      | 화면과 탭이 어긋남                       |

COM-007이 물리 뒤로가기를 명시적으로 다루는 앱이라 첫 번째는 실제로 납니다.

**`push`가 아니라 `replace`인 이유**는 탭 전환마다 히스토리가 쌓이면 뒤로가기가 화면이 아니라 탭을 되짚기 때문입니다. 다만 이건 소비 앱의 히스토리 정책이라 DS가 정하지 않습니다.

**`BOTTOM_TAB_DEFAULT_VALUE`는 초기 상태가 아니라 폴백입니다.** COM-001의 「주문이 기본 진입 탭」을 값으로 들고 있는 상수라, `resolveTabFromPath`가 어느 탭에도 속하지 않는 경로를 만났을 때 쓰라고 내보낸 것입니다.

> 스토리의 `Interactive`는 `useState`를 씁니다. 라우터가 없는 환경에서 전환만 보여주려는 것이고 **앱에서 따라 쓸 형태가 아닙니다.** 그때는 `useState`에 타입 인자를 반드시 줍니다 — `BOTTOM_TAB_DEFAULT_VALUE`가 `as const`에서 나와 타입이 `'order'` 리터럴이라, 생략하면 setter가 `'order'`만 받고 다른 탭을 누르는 순간 타입 에러가 납니다. **ESLint는 잡지 못합니다**(`tsc --noEmit`에서만 드러남).

## internal-ui와 갈린 지점

`apps/internal-ui`에 `Tab` 계열(`Tabs` · `TabList` · `Tab` · `TabPanel` · `TabIndicator` · `TabNumber`)이 있지만 **성격이 다릅니다** — 그쪽은 소비자가 탭을 children으로 조립하고 패널을 전환하는 compound 위젯이고, 이쪽은 목록이 고정된 네비게이션입니다. 구조를 옮길 대상이 아니라 대조만 했습니다.

| 항목            | internal-ui `Tab`                    | biz-ui `BottomTab`         | 갈린 이유              |
| --------------- | ------------------------------------ | -------------------------- | ---------------------- |
| 조립            | children (compound + context)        | DS가 목록 소유             | 정책 COM-001           |
| ARIA            | `role="tab"` · `aria-selected`       | `<nav>` · `aria-current`   | 패널이 없음            |
| 키보드          | `tabIndex` 롤링 + 방향키             | 기본 탭 순서               | 링크형 네비게이션      |
| 인디케이터      | `TabIndicator` (밑줄 애니메이션)     | 없음                       | Figma에 없음           |
| `variant`·`size`·`theme` | 있음                        | 없음                       | Figma에 축이 `value` 하나 |
| `disabled`      | 있음                                 | 없음                       | COM-001이 상시 노출 명시 |

**`disabled`를 넣지 않은 근거가 정책에 명시돼 있습니다** — 「운영중지 · 해지 상태에서도 노출을 유지한다」라서, 상태에 따라 탭을 잠그는 축이 애초에 없습니다.

## 디자인 확인 필요

| 항목                | 내용                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------ |
| 그림자 방향         | `shadow/shadow-8`은 **아래로 4px** 떨어집니다. 화면 하단에 고정되는 컴포넌트라 화면 밖으로 나가 보이지 않습니다. 위로 향하는 값이 맞는지 |
| 아이콘 26 vs 28     | 내정보(`user-circle`)만 28입니다. 같은 줄에 서는 세 아이콘 중 하나만 다른 것이 의도인지                   |
| 아이콘-라벨 -1px    | 간격이 **음수(-1)**입니다. 라벨이 아이콘 박스를 1px 파고듭니다. 0이 의도였는지                            |
| 세로 정렬           | Figma는 탭 60px 안에서 위 7.5 · 아래 9.5로 비대칭입니다. `justify-center`로 구현해 렌더는 **7.5 · 7.5**라 위쪽은 일치하고 아래만 2px 짧습니다 |
| 상호작용 상태       | hover · pressed 정의가 없습니다. `transition-colors`만 걸었고(CLAUDE.md 「폼 컨트롤 공통」 8) 눌린 시각은 없습니다 |
| 포커스              | 포커스 링 정의가 없습니다. `<button>`이라 브라우저 기본 링이 뜹니다 — 지정된 시각이 필요한지               |
| 배지 · 알림 점      | 탭에 미확인 개수를 표시하는 형태가 없습니다. 알림이 붙는 자리가 생길지                                    |

라벨 길이는 **확인 완료**입니다 — 320px 폭에서 탭이 106.66px인데 가장 긴 `내정보`가 31px이라 줄바꿈이 나지 않습니다.

## Storybook

`apps/storybook/src/stories/biz-ui/BottomTab.stories.tsx`, `meta.title`은 `core/biz-ui/BottomTab`. 스토리 3종입니다.

- `Default` — 컨트롤 패널용. 값은 컨트롤로 바꾸고, 탭을 누르면 `onChange: { action: 'change' }`로 Actions 패널에 넘어간 값이 찍힙니다. **`BOTTOM_TAB_ITEMS` 배열과 핸들러 배선이 맞는지 여기서 보입니다** — `Checkbox`처럼 빈 함수를 두지 않은 것은 페이로드가 3개 중 하나인 값이라 로그가 검증이 되기 때문이고, `QuantityStepper` · `OrderInputCard` 선례를 따랐습니다
- `Interactive` — `useState`로 실제 전환
- `States` — Figma 문서 프레임과 같은 배치로 `value` 3종

바가 `w-full`이라 스토리에서는 `DOCUMENT_FRAME_WIDTH = 'w-[380px]'`로 감쌉니다. **340(컨텐츠 폭)이 아니라 380(화면 폭)입니다** — 바는 좌우 여백 없이 화면 끝까지 갑니다.

> Storybook에서 확인할 때는 **개발 서버를 재시작해야 합니다** (CLAUDE.md 「검증」).

## 검증

Storybook 렌더의 계산값으로 대조했습니다. `States` 스토리의 바 3개 · 탭 9개 전수입니다.

| 항목               | 기대                    | 실측                                                    |
| ------------------ | ----------------------- | ------------------------------------------------------- |
| 바                 | 61px (테두리 1 + 탭 60) | 380 × 61                                                |
| 탭 폭              | 380 ÷ 3                 | 126.66 · 126.67 · 126.66                                |
| 상단 테두리        | 1px `gray/100`          | `1px rgb(240,242,247)`                                  |
| 배경 · 그림자      | `white` · `shadow-8`    | `rgb(255,255,255)` · `rgba(51,60,81,.12) 0 4px 8px`     |
| 아이콘 `font-size` | 26 · 26 · 28            | 26 · 26 · 28                                            |
| 아이콘 웨이트      | `fill`                  | `Phosphor-Fill` · 클래스 `ph-fill`                      |
| 아이콘 색          | `gray/400` → `base/black` | `rgb(174,181,198)` → `rgb(16,24,40)`                  |
| 라벨               | `caption`               | 12px / 600                                              |
| 라벨 색            | `gray/500` → `base/black` | `rgb(138,147,168)` → `rgb(16,24,40)`                  |
| 아이콘-라벨 간격   | -1                      | `margin-bottom: -1px`                                   |
| `safe-area-bottom` | env=0인 데스크톱에서 61 유지 | `padding-bottom: 0px`, 바 61px                     |
| `aria-current`     | 바마다 1개              | 바마다 정확히 1개                                       |
| 전환               | 클릭 시 이동            | `order` → 내정보 클릭 → `aria-current`가 3번 탭으로 이동 |

빌드 · 린트 · `tsc --noEmit`(스토리 포함) 통과, `dist` 공개 API는 `BottomTab` 하나입니다.

**아이콘 웨이트는 `getBBox()`로 재지 않습니다.** Phosphor는 아이콘 폰트라 글리프가 `::before`의 문자로 렌더되고 SVG 노드가 없어 `getBBox()`가 아예 없습니다. 렌더 쪽 판정은 `font-family`가 갈리는 것으로 합니다 — `regular`는 `Phosphor`, `bold`는 `Phosphor-Bold`, `fill`은 `Phosphor-Fill`입니다. 9개 아이콘 전부 `Phosphor-Fill`(클래스 `ph-fill`)로 확인했습니다.
