# NavigationListItem 구현 기록

`apps/biz-ui/src/components/NavigationListItem` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 이 컴포넌트 고유 사실만 둡니다.

Figma: [NavigationListItem 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=129-658&m=dev) (`129:658`). 실제 값은 컴포넌트 세트 `118:471`의 심볼 `118:469`(withValue) · `118:470`(default)에서 실측했습니다. 정책 프레임은 `524:5`입니다.

## 구현 현황

| 컴포넌트                     | 티켓       | 공개 | 설명                                          |
| ---------------------------- | ---------- | ---- | --------------------------------------------- |
| `NavigationListItem`         | DOTOLI-248 | ✅   | 라벨 + 선택적 값 + 캐럿. `<button>` 한 줄     |
| `LinkNavigationListItem`     | DOTOLI-306 | ✅   | 같은 줄의 링크판. `next/link`                 |
| `NavigationListItemContent`  | DOTOLI-306 | ❌   | 라벨 · 값 · 캐럿. 둘이 공유하는 계열 조각      |

**DOTOLI-306에서 단독 폴더를 계열로 승격했습니다** — `Chip`이 `ActionChip`을 맞으면서 한 것(DOTOLI-295)과 같은 형태입니다. 시각은 `shared`가 통째로 갖고 두 컴포넌트는 **감싸는 요소만 다릅니다.**

## Variant 축

| 축     | 값                    | 출처     |
| ------ | --------------------- | -------- |
| `type` | `default` · `withValue` | Figma 축 |

두 심볼이 전부이고 **상태 축(hover · pressed · disabled)이 없습니다.**

## 실측 스펙

| 항목        | 값                                                              |
| ----------- | ---------------------------------------------------------------- |
| 크기        | 340 × 52 → **`w-full`**. 340은 콘텐츠 폭이라 고정하지 않습니다     |
| padding     | `px-[13px] py-[14px]`                                             |
| 배경        | `base/white` → `bg-white`                                        |
| 하단 테두리 | 1px `gray/100` → `border-b border-gray-100`                       |
| 라벨        | `body`(Medium 16px) `gray/600`                                    |
| 값          | `body-semiBold`(SemiBold 16px) `gray/700`                         |
| 값-캐럿 간격 | 2px → `gap-[2px]`                                                |
| 라벨-캐럿 간격 | 6px → 컨테이너 `gap-[6px]` (아래 「결정」)                       |
| 캐럿        | Phosphor `CaretRight` 16px `gray/400`                             |

`52 = 패딩 14 + 라벨 23.2(16px × lh 1.45) + 패딩 14 + 테두리 1`이라 높이를 따로 지정하지 않고 hug으로 둡니다.

### 캐럿 웨이트는 `bold`입니다 — `Icon` 기본값과 같습니다

**Figma가 내보낸 path와 `@phosphor-icons/core` 원본의 좌표 대조**입니다. Figma export의 첫 점이 `M6.28255 6.28255`이고, 16px 박스 · 글리프 원점 (5.248, 2.248) · 배율 256/16을 적용하면 **184.49 · 136.49**입니다.

| 웨이트    | 원본 첫 점       | 판정   |
| --------- | ---------------- | ------ |
| `regular` | `181.66,133.66`  | 불일치 |
| `bold`    | **`184.49,136.49`** | **일치** |

기본값과 같은 값이라 상수로 명시하지 않고 `Icon`의 기본 웨이트를 그대로 씁니다 — 근거가 있는 값만 상수로 뽑는다는 `CHECKBOX_ICON_WEIGHT` · `BOTTOM_TAB_ICON_WEIGHT`의 반대편 사례입니다.

색은 내보낸 SVG의 `fill`에서 직접 읽었습니다 — `#AEB5C6`(= `gray/400`).

## 정책 · 값 표기 규칙 (`524:5`)

`type=withValue`의 값 영역에 적용됩니다. **구현이 아니라 소비 앱이 지킬 규칙**이라 컴포넌트는 받은 문자열을 그대로 그립니다.

- **값이 길어지면 말줄임 없이 축약 표기를 사용합니다.** `외 {n}` 형식입니다.

| 경우      | 표기                    |
| --------- | ----------------------- |
| 인원 수   | `N명`                   |
| 다수 목록 | `이름, 이름 외 N명`     |
| 값 없음   | `-` (하이픈)            |

**「값 없음」은 `value` 미전달이 아니라 하이픈 문자열입니다.** `value`를 넘기지 않으면 `type=default`(값 영역 자체가 없는 형태)가 되고, 값 영역은 있는데 담을 값이 없는 경우가 `-`입니다. 둘은 다른 상태입니다.

## 결정

- **`type` 축은 `value` 미전달로 표현합니다.** Figma의 `default`는 값 영역이 통째로 빠진 형태라 별도 prop 없이 값의 유무로 갈립니다. CtaButton이 `iconPosition=none`을 `iconOption` 미전달로, HeaderBar가 `useProgress`를 `progressOption` 미전달로 표현한 것과 같은 선례입니다.

- **마지막 항목의 구분선은 `last:border-b-0`으로 뺍니다.** Figma 심볼에는 항목마다 `border-b`가 있지만 목록 끝에서는 빠져야 합니다. **목록 컴포넌트(`NavigationList`)를 만들지 않았습니다** — Figma에 그런 심볼이 없고(CLAUDE.md 「Figma에 없는 시각은 만들지 않습니다」), 껍데기 하나를 더 여는 것보다 CSS 한 줄이 싼 문제입니다. `hasDivider` 같은 prop도 두지 않았습니다. 소비자가 매번 마지막인지 기억해야 하는 결정이 되기 때문입니다.

  **대신 형제로 나열해야 걸립니다.** `:last-child` 기준이라 각 항목을 `<div>`로 감싸면 전부 마지막 자식이 되어 구분선이 전부 사라집니다. 목록을 감싸는 요소의 **직계 자식**으로 두면 됩니다.

- **버튼판은 `<button>` + `onClick`입니다.** 당초 근거는 「biz-ui가 서드파티만 의존해 라우터를 물 수 없다」였는데, **DOTOLI-303이 `next`를 필수 peerDependency로 들이면서 그 전제가 사라졌습니다.** 같은 판단을 공유하던 `BottomTab`은 DOTOLI-304에서 `next/link`로 전환했습니다 — 경위는 [bottom-tab.md](./bottom-tab.md) 「결정」.

  **다만 `BottomTab`처럼 전환하지 않았습니다 — 링크판을 따로 세웠습니다 (DOTOLI-306).** BottomTab을 통째로 바꿀 수 있었던 것은 탭 3개가 전부 화면이고 COM-001이 개수·순서까지 못박아 **라우팅 아닌 경우가 존재할 수 없어서**입니다. 이쪽은 소비자가 목록을 조립하고 행마다 목적지를 정하는데, **라우트 이동과 바텀시트 트리거로 둘 다 쓰입니다.** 전환했다면 시트 트리거 행을 표현할 수단이 사라집니다.

  그래서 `LinkNavigationListItem`을 옆에 세우고 이 버튼판은 시트 트리거로 남깁니다. CLAUDE.md 「새 모양이 필요하면 껍데기를 열어 주는 게 아니라 컴포넌트를 하나 더 만듭니다」이고, `CtaButton` ↔ [`LinkCtaButton`](./button.md)이 같은 형태입니다. `as` · `renderItem` 같은 다형 prop을 열지 않는다는 판단도 그대로입니다.

- **`isDisabled`를 넣지 않았습니다 — [`LinkCtaButton`](./button.md)과 갈리는 지점입니다.** 그쪽은 Figma에 `disabled` 시각이 있어 세 겹 가드(`aria-disabled` · `tabIndex={-1}` · `preventDefault`)가 필요했지만, **여기는 상태 축이 아예 없습니다**(위 「Variant 축」). 없는 시각을 만들지 않는다는 규칙대로 가드도 클릭 핸들러 유틸도 두지 않았고, 그래서 링크판이 `<Link>` 한 겹으로 끝납니다.

- **`onClick`이 필수가 아닙니다.** 버튼판은 눌러도 아무 일이 없으면 안 되니 `Required<Pick<…>>`인데, 링크판은 이동을 `<Link>`가 하므로 강제할 이유가 없습니다. `LinkProps`가 앵커용 `onClick`을 들고 들어와서 분석 로깅 같은 부수효과에는 그대로 쓸 수 있습니다. `BottomTab`이 `onChange`를 선택으로 내린 것과 같은 자리인데, **여기는 이름이 겹치지 않아 개명이 필요 없습니다** — 버튼판의 `onClick`은 「이동을 일으키는 것」이고 링크판의 `onClick`은 「이동과 별개의 부수효과」라 뜻이 갈리지만, 앵커의 `onClick`은 원래 그 의미라 오해할 여지가 없습니다.

- **시각을 `shared`가 통째로 갖습니다.** 스타일 상수 4종과 내용 조각(`NavigationListItemContent`)이 `shared`에 있고 두 컴포넌트는 감싸는 요소(`<button>` ↔ `<Link>`)와 그 요소의 prop만 다릅니다. Storybook 실측에서 **class 문자열이 한 글자도 다르지 않습니다**(아래 「검증」). `LinkCtaButton`이 생성기를 형제 폴더에서 가져다 쓴 것과 결과는 같고, 여기는 계열로 승격했으니 `shared`가 정식 자리입니다.

  **`NavigationListItemContent`는 배럴에서 내보내지 않습니다 — `<Group>/shared`는 공개가 기본인데 여기만 예외입니다.** `ButtonIcon`(`<Icon>` 하나) · `InputMessage`(`<div>` 하나)는 **어디에 놓아도 자기 모양이 나오는** 조각이라 열어도 잃을 게 없지만, 이것은 **Fragment로 형제 둘을 뱉습니다.** `flex` · `justify-between`을 문 부모 안에서만 배치가 맞고, 소비자가 아무 `<div>`에 넣으면 **에러 없이 레이아웃만 어긋납니다.** 「공개는 되돌리기 비대칭이라 필요가 확인될 때 여는 순서로 갑니다」에 따라 닫아 두고, 두 컴포넌트는 전체 경로로 직접 import 합니다.

- **라벨만 잘리고 값은 안 잘립니다.** 라벨은 `min-w-0 truncate`, 값 영역은 `shrink-0`입니다. 정책이 **「말줄임 없이 축약 표기」**를 못박아 값에 `truncate`를 걸면 규칙과 정면으로 어긋납니다. Figma도 같은 구조입니다 — `default` 심볼의 라벨 래퍼가 `flex-[1_0_0] min-w-px`(줄어듦)이고 값과 캐럿은 `shrink-0`입니다.

- **컨테이너 `gap-[6px]`은 `default` 심볼에서 가져왔습니다.** `withValue`에는 컨테이너 gap이 없지만(`justify-between`만) 라벨이 길어져 잘릴 때 값과 붙지 않도록 최소 간격이 필요합니다. `default`가 지정한 값이라 새로 만든 수치가 아니고, `withValue`에서는 여백이 충분해 렌더 결과가 바뀌지 않습니다.

- **DOTOLI-248에서는 단독 폴더였고 DOTOLI-306에서 계열이 됐습니다.** 착수 시점에는 같은 프리픽스의 형제가 없어 `Badge` · `Divider` · `IconCircle` · `NotificationCard`와 같은 단독 폴더로 뒀고, `LinkNavigationListItem`이 생기면서 `Chip`이 `ActionChip`을 맞았을 때와 같은 이유로 승격했습니다. `BottomTab`과 묶지 않은 것은 그때나 지금이나 같습니다 — 프리픽스가 다르고 Figma 섹션도 갈려 있습니다.

- **`transition-colors`를 걸지 않았습니다.** 색이 바뀌는 상태 자체가 없습니다(CLAUDE.md 「폼 컨트롤 공통」 8은 상태 전환이 있을 때의 규칙입니다).

## API

**둘이 공유하는 것** — `label`(필수, 왼쪽 텍스트. 길면 잘림) · `value`(선택, 넘기면 `withValue`) · `className`(선택, 감싸는 요소에 적용).

**갈리는 것은 둘뿐입니다.**

| prop      | `NavigationListItem` | `LinkNavigationListItem`                  |
| --------- | -------------------- | ----------------------------------------- |
| `onClick` | **필수** — 이동을 일으키는 자리 | 선택 — `LinkProps`의 앵커용. 부수효과 전용 |
| `href`    | 없음                 | **필수** — `LinkProps`                     |

링크판은 `LinkProps` 전체(`prefetch` · `replace` · `scroll` · `as` …)와 `target` · `rel` · `ref`를 통과시킵니다 — [`LinkCtaButton`](./button.md)과 같은 형태입니다. **앵커 하나를 소비자가 통째로 소유하므로 스프레드가 성립합니다**(`BottomTab`이 앵커 셋이라 하나씩 열었던 것과 갈리는 지점).

> **`LinkProps` + `rel`·`target` + `RefAttributes<HTMLAnchorElement>` 세 줄이 `Button/shared`의 `LinkButtonPrimitiveProps`와 같습니다.** 지금은 두 벌이라 두었는데, 바로 `extends` 할 수 없는 이유가 둘 있습니다 — 그쪽에는 **의도적으로 뺀** `isDisabled`가 붙어 있어 `Omit`으로 걷어내면 의도가 흐려지고, 계열 사이 import는 CLAUDE.md의 경계를 넘습니다. 규칙대로면 `components/shared/types/`(계열 **사이**의 비공개 배선)에 `isDisabled` 없는 공통 타입을 두고 양쪽이 좁히는 형태입니다. **세 번째 `Link*` 컴포넌트가 생기는 시점이 그걸 만들 자리입니다.**

```tsx
<Flex direction='column'>
  <LinkNavigationListItem href='/managers' label='매니저 계정' value='김뽀득 외 2명' />
  <LinkNavigationListItem href='/notifications' label='알림' />
  {/* 이동이 아니라 시트를 여는 줄은 버튼판 */}
  <NavigationListItem label='업체 전환' value={company} onClick={openCompanySheet} />
</Flex>
```

**항목들이 감싸는 요소의 직계 자식이어야** `last:border-b-0`이 걸립니다. **버튼판과 링크판을 섞어도 됩니다** — `:last-child`는 태그를 가리지 않아 마지막 줄에만 걸리는 것을 실측했습니다(아래 「검증」).

## 디자인 확인 필요

| 항목            | 내용                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------- |
| 상호작용 상태   | hover · pressed 정의가 없습니다. 줄 전체가 탭 타깃이라 눌린 시각이 없으면 반응이 없어 보입니다 |
| 포커스          | 포커스 링 정의가 없습니다. `<button>`이라 브라우저 기본 링이 뜹니다                        |
| 마지막 구분선   | 심볼에는 항목마다 `border-b`가 있고 「마지막은 뺀다」는 별도 지정이 아니라 사용 예시에서 확인했습니다. 심볼에도 반영이 필요한지 |
| 좌우 여백 13px  | 다른 컴포넌트의 좌우 여백(`ItemCheckbox` 20 · `HeaderBar` 20)과 다릅니다. 같은 화면에서 나란히 놓일 때 좌측 정렬이 어긋나지 않는지 |
| 값 없음 표기    | `-`(하이픈)이 `type=withValue`로 들어가는 게 맞는지, `default`로 내리는 자리도 있는지        |

## Storybook

`apps/storybook/src/stories/biz-ui/NavigationListItem.stories.tsx`, `meta.title`은 `core/biz-ui/NavigationListItem`. 스토리 5종입니다.

- `Default` — 컨트롤 패널용
- `Types` — `value` 전달 / 미전달
- `List` — 사용 예시(계정 관리 화면) 재현. **마지막 항목의 구분선이 빠지는지 여기서 봅니다**
- `ValueRules` — 정책 `524:5`의 세 가지 표기(`N명` · `이름, 이름 외 N명` · `-`)
- `LongLabel` — 라벨이 잘리고 값은 안 잘리는지

바가 `w-full`이라 스토리에서는 `DOCUMENT_FRAME_WIDTH = 'w-[340px]'`로 감쌉니다.

`LinkNavigationListItem.stories.tsx`가 따로 있고 `meta.title`은 `core/biz-ui/LinkNavigationListItem`입니다. **소스는 계열로 중첩됐지만 스토리 타이틀은 평평합니다** — 계열명과 대표 컴포넌트명이 같아서이고, 근거는 [chip.md](./chip.md) 「Storybook」에 있습니다(`Chip` · Calendar 계열 5종과 같은 자리). 스토리 3종입니다.

- `Default` — 컨트롤 패널용
- `List` — 링크 4줄
- `Mixed` — **링크 2 + 버튼 1.** 태그가 섞여도 `last:border-b-0`이 마지막 줄에만 걸리는지 보는 자리이고, 실제 사용 형태(이동 줄 + 시트 트리거 줄)이기도 합니다

## 검증

Storybook 렌더의 계산값으로 대조했습니다. `List` 스토리의 5줄 · `LongLabel` 스토리의 2줄 전수입니다.

| 항목        | 기대                          | 실측                                                     |
| ----------- | ----------------------------- | -------------------------------------------------------- |
| 줄 높이     | 52 (14 + 23.2 + 14 + 테두리 1) | 52.2 — 마지막 줄만 51.2(테두리 없음)                     |
| padding     | `13px` / `14px`               | `14px 13px`                                              |
| gap         | 6px                           | `6px`                                                    |
| 하단 테두리 | 1px `gray/100`                | `1px rgb(240,242,247)` — **마지막 항목만 `0px`**          |
| 라벨        | `body` `gray/600`             | 16px / 500 · `rgb(105,115,140)`                          |
| 값          | `body-semiBold` `gray/700`    | 16px / 600 · `rgb(76,86,110)`                            |
| 캐럿        | `caret-right` bold 16 `gray/400` | 16px · `rgb(174,181,198)` · `font-family: Phosphor-Bold` |
| 긴 라벨     | 라벨만 잘림                    | 라벨 `ellipsis`(scrollW 315 > clientW 161), **값은 잘리지 않음**(131 = 131) |

빌드 · 린트 · `tsc --noEmit`(스토리 포함) 통과.

### DOTOLI-306 링크판 재실측

**시각은 하나도 바뀌지 않았습니다.** 계열로 쪼개면서 스타일이 `shared`로 옮겨졌을 뿐입니다.

| 항목 | 실측 |
| ---- | ----- |
| class 문자열 | `NavigationListItem`과 **완전 일치** — `flex-h-stack w-full cursor-pointer items-center justify-between gap-[6px] border-b border-gray-100 bg-white px-[13px] py-[14px] last:border-b-0` |
| 요소 | `A` ↔ `BUTTON`. 그 외 차이 없음 |
| 크기 · 패딩 | 340 × 51.1953 · `14px 13px` — 양쪽 동일 |
| `href` | `hrefs` 없이 행마다 직접 받음 — `/managers` · `/notifications` |
| `List`(링크 4줄) | 하단 테두리 `1px · 1px · 1px · 0px`, 높이 `52.1953 × 3 · 51.1953` |
| **`Mixed`(링크 2 + 버튼 1)** | `1px(A) · 1px(A) · 0px(BUTTON)` — **태그가 갈려도 마지막 줄에만 걸립니다** |

**정책의 「말줄임 없이」가 렌더에서 지켜지는 것을 확인했습니다** — 같은 줄에서 라벨은 `…`로 잘리는데 값 `김뽀득, 이뽀득 외 2명`은 온전히 남습니다.

> Storybook에서 확인할 때는 **개발 서버를 재시작해야 합니다** (CLAUDE.md 「검증」). 신규 export라 재시작 전에는 `undefined`로 잡힙니다.
