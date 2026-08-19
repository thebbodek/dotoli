# NavigationListItem 구현 기록

`apps/biz-ui/src/components/NavigationListItem` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 이 컴포넌트 고유 사실만 둡니다.

Figma: [NavigationListItem 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=129-658&m=dev) (`129:658`). 실제 값은 컴포넌트 세트 `118:471`의 심볼 `118:469`(withValue) · `118:470`(default)에서 실측했습니다. 정책 프레임은 `524:5`입니다.

## 구현 현황

| 컴포넌트             | 티켓       | 공개 | 설명                                         |
| -------------------- | ---------- | ---- | -------------------------------------------- |
| `NavigationListItem` | DOTOLI-248 | ✅   | 라벨 + 선택적 값 + 캐럿. 단일 `<button>` 한 줄 |

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

- **`<button>` + `onClick`입니다. `href`를 열지 않습니다.** biz-ui는 서드파티만 의존해 라우터를 물 수 없고, `as` · `renderItem` 같은 다형 prop은 CLAUDE.md 「폼 컨트롤 공통」 5번이 막습니다. `BottomTab`과 같은 판단이라 근거는 [bottom-tab.md](./bottom-tab.md) 「결정」을 함께 봅니다.

  `onClick`은 **필수**입니다. 캐럿이 항상 붙는 「눌러서 이동하는 줄」이라 이동하지 않는 상태가 없습니다. `BottomTab`의 `onChange`가 필수인 것과 같습니다.

- **라벨만 잘리고 값은 안 잘립니다.** 라벨은 `min-w-0 truncate`, 값 영역은 `shrink-0`입니다. 정책이 **「말줄임 없이 축약 표기」**를 못박아 값에 `truncate`를 걸면 규칙과 정면으로 어긋납니다. Figma도 같은 구조입니다 — `default` 심볼의 라벨 래퍼가 `flex-[1_0_0] min-w-px`(줄어듦)이고 값과 캐럿은 `shrink-0`입니다.

- **컨테이너 `gap-[6px]`은 `default` 심볼에서 가져왔습니다.** `withValue`에는 컨테이너 gap이 없지만(`justify-between`만) 라벨이 길어져 잘릴 때 값과 붙지 않도록 최소 간격이 필요합니다. `default`가 지정한 값이라 새로 만든 수치가 아니고, `withValue`에서는 여백이 충분해 렌더 결과가 바뀌지 않습니다.

- **폴더는 단독입니다.** 이름 프리픽스가 `Navigation…`인데 같은 프리픽스의 계열이 아직 없습니다. `Badge` · `Divider` · `IconCircle` · `NotificationCard` · `BottomTab`과 같은 단독 폴더 선례를 따릅니다. `BottomTab`과 묶지 않은 것은 프리픽스가 다르고 Figma 섹션도 갈려 있어서입니다.

- **`transition-colors`를 걸지 않았습니다.** 색이 바뀌는 상태 자체가 없습니다(CLAUDE.md 「폼 컨트롤 공통」 8은 상태 전환이 있을 때의 규칙입니다).

## API

| prop        | 필수 | 비고                                        |
| ----------- | ---- | ------------------------------------------- |
| `label`     | ✅   | 왼쪽 텍스트. 길면 잘립니다                  |
| `onClick`   | ✅   | 이동 처리는 소비자가 합니다                 |
| `value`     |      | 넘기면 `withValue`, 안 넘기면 `default`     |
| `className` |      | `<button>`에 적용                           |

```tsx
<Flex direction='column'>
  {items.map(({ label, value, path }) => (
    <NavigationListItem
      key={label}
      label={label}
      value={value}
      onClick={() => router.push(path)}
    />
  ))}
</Flex>
```

**항목들이 감싸는 요소의 직계 자식이어야** `last:border-b-0`이 걸립니다.

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

**정책의 「말줄임 없이」가 렌더에서 지켜지는 것을 확인했습니다** — 같은 줄에서 라벨은 `…`로 잘리는데 값 `김뽀득, 이뽀득 외 2명`은 온전히 남습니다.

> Storybook에서 확인할 때는 **개발 서버를 재시작해야 합니다** (CLAUDE.md 「검증」). 신규 export라 재시작 전에는 `undefined`로 잡힙니다.
