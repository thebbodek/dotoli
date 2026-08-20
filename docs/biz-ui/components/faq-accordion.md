# FaqAccordion 구현 기록

`apps/biz-ui/src/components/FaqAccordion` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 이 계열 고유 사실만 둡니다.

Figma: [FaqAccordion 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=129-577&m=dev) (`129:577`), 심볼 `99:298`(isOpen=true) · `99:299`(isOpen=false).

사용예시는 소비 앱의 [CSC-001 고객센터](https://www.figma.com/design/LomGIAwvPAkyRbBcGbk9rs/%EA%B3%A0%EA%B0%9D-%EB%B9%84%EC%A6%88?node-id=1217-10970&m=dev) (`1217:10970`)이고, **두 화면이 서로 다른 개방 정책을 요구합니다.**

| 화면 | 스펙 | 근거 |
| --- | --- | --- |
| CSC-001 FAQ 목록 | 기본 접힘 · **한번에 하나만 펼침** | `1436:12308` |
| CSC-101 검색 결과 | **검색된 질문은 모두 자동으로 펼쳐진다** | `1576:20455` |

## 구현 현황

| 컴포넌트            | 티켓       | 설명                                                  |
| ------------------- | ---------- | ----------------------------------------------------- |
| `FaqAccordion`      | DOTOLI-263 | **제어 전용**. `isOpen` + `onToggle`                  |
| `FaqAccordionList`  | DOTOLI-263 | 개방 상태를 소유. `openMode` 1축                      |

폴더는 `FaqAccordion/` 하나이고 두 `.tsx`가 나란히 있습니다 — `BottomTab`(+`BottomTabItem`)과 같은 구조입니다. 다만 **`BottomTabItem`이 비공개인 것과 달리 `FaqAccordion`은 공개**입니다 (아래 「결정」).

## Variant 축

| 축       | 값                |
| -------- | ----------------- |
| `isOpen` | `false` · `true`  |

`isOpen`이 바꾸는 것은 **답변 영역의 유무와 caret 방향** 둘뿐입니다. `hover` · `pressed` · `disabled` 축은 없습니다.

## 실측 스펙

| 항목        | 값                                                          |
| ----------- | ----------------------------------------------------------- |
| 폭          | 심볼 340이지만 **fill** → `w-full`                           |
| 구분선      | 하단 1px `gray/100`                                          |
| 배경        | `base/white`                                                 |
| 질문 영역   | `p-[20px]` · 내부 `gap-[8px]`                                |
| 질문        | `body-lg` (Medium 18 / lh 1.45 / ls -3%) · `gray/800`        |
| caret       | 24px 박스 안 16px · weight `fill` · `gray/400`               |
| 답변 영역   | `px-[20px] pb-[20px]`                                        |
| 답변 박스   | `bg-gray/50` · `rounded-6` · `px-[18px] py-[16px]`           |
| 답변        | `body` (Medium 16 / lh 1.45 / ls -3%) · `gray/700`           |

**타이포가 토큰과 값까지 일치합니다** — `--text-body-lg`(18/500/1.45/−0.03em) · `--text-body`(16/500/1.45/−0.03em). 색도 `gray-50` · `gray-100` · `gray-700` · `gray-800`이 전부 있어 **신규 토큰이 없습니다.**

### 높이는 고정이 아닙니다 — 사용예시가 증명합니다

DS 심볼은 접힘 66 · 펼침 188인데, **검색 결과 화면의 인스턴스는 142**입니다(`1217:11023` · `1217:11033`). 세 값이 전부 자연 높이로 설명됩니다.

| 상태            | 계산                                   | 값  |
| --------------- | -------------------------------------- | --- |
| 접힘            | `20 + 26.1 + 20`                       | 66  |
| 펼침 · 답변 1줄 | `66 + 20 + (16 + 23.2 + 16)`           | 142 |
| 펼침 · 답변 3줄 | `66 + 20 + (16 + 69.6 + 16)`           | 188 |

**답변 줄 수가 높이를 정합니다.** 심볼 값을 고정으로 옮겼다면 검색 화면에서 어긋났을 자리입니다.

## 결정

- **caret은 아이콘 교체가 아니라 회전입니다 — Figma와 갈린 유일한 시각 항목입니다.** Figma는 `CaretUp`(`99:298`) · `CaretDown`(`99:299`) 서로 다른 인스턴스를 씁니다. 그런데 같은 파일의 [`CollapseButton`](./button.md)은 **같은 동작을 회전 래퍼(`97:302`)로** 그립니다. 디자이너가 두 방식을 섞어 쓰고 있어서 **회전으로 통일하기로 확인받았습니다.** 결과 픽셀은 같고 아이콘 키가 하나로 줄어듭니다.

- **caret weight를 `fill`로 명시해 넘깁니다.** `Icon`은 `weight`를 안 주면 `ICON_DEFAULT_WEIGHT`(=`bold`)로 떨어져 **라인 캐럿이 나옵니다.** 회전으로 통일하면서 같은 캐럿을 쓰는 [`CollapseButton`](./button.md)과 같은 값이고, 거기서도 처음에 빠뜨려 `bold`로 나갔던 항목입니다 — 넘기지 않아도 타입·빌드·린트가 전부 통과하고 기본값이 조용히 채워집니다.

- **`Notification`의 「카드 전체가 탭 영역」 패턴을 따르지 않았습니다.** Figma는 질문 행 전체를 `<button>`으로 두고 그 안에 `IconButton` 인스턴스를 넣어 **버튼이 중첩**됩니다. 같은 상황을 `Notification`이 `<div onClick>` + 핸들러 없는 `CtaButton`으로 풀었는데, **여기는 그 절충이 필요 없습니다.**

  갈리는 지점은 **안쪽 요소가 독립된 동작과 라벨을 갖는가**입니다. `Notification`의 `CtaButton`은 「바로가기」라는 자기 이름을 가진 실제 조작 대상이라 버튼으로 남겨야 키보드가 도달합니다 (근거는 [`notification.md`](./notification.md) 「카드 전체가 탭 영역입니다」). **FaqAccordion의 caret은 접기/펼치기 하나뿐인 어포던스 표시**라 장식으로 내리면 그만입니다. 그래서 질문 행만 `<button>`이고 caret은 `aria-hidden` `Icon`입니다 — 중첩도, `<div>` 핸들러도 없습니다. `InfoBanner` · `CollapseButton`과 같은 형태입니다.

- **구분선을 루트로 통일했습니다.** Figma는 접힘일 때 질문 박스(`94:293`)에, 펼침일 때 루트(`99:298`)에 `border-b`를 겁니다. 시각 결과가 같고 **접힘에서는 질문 박스가 곧 맨 아래**라 생긴 차이입니다. 루트 하나로 두면 상태와 무관하게 항상 맨 아래에 그어집니다.

- **`border-b`를 씁니다 — `inset-ring`이 아닙니다.** CLAUDE.md 「스타일 규칙」의 근거는 「테두리가 박스를 키워 실측 크기가 어긋난다」인데, **여기는 높이를 고정하지 않아 어긋날 값이 없습니다.** 용도도 테두리가 아니라 **항목 사이 구분선**이라, 같은 목적의 `NavigationListItem`(`border-b border-gray-100`)과 맞췄습니다.

- **`FaqAccordion`은 제어 전용이고 공개합니다.** `isOpen`·`onToggle`이 전부 필수입니다. 열림 여부를 스스로 들면 「한번에 하나만」을 리스트가 강제할 수 없습니다. `BottomTabItem`을 비공개로 둔 것과 갈리는데, **그쪽은 items가 DS 상수(`BOTTOM_TAB_ITEMS`)라 소비자가 직접 조립할 일이 없고** 여기는 목록에 안 맞는 화면이 나올 수 있어 진입점을 하나 더 남겼습니다.

- **`FaqAccordionList`를 만들었습니다 — Figma에 심볼이 없는데도입니다.** `NavigationList`를 만들지 않았던 것과 결론이 갈리는데, 근거가 다릅니다.

  | | `NavigationList` (안 만듦) | `FaqAccordionList` (만듦) |
  | --- | --- | --- |
  | 래퍼가 할 일 | `last:border-b-0` — **CSS 한 줄** | **열림 집합 관리** — 상태 로직 |
  | 반복 횟수 | 화면당 1회 | **화면당 5회** (분류 5종 × 카테고리 칩 1:1, `1436:12302`) + 검색 화면 |

  CLAUDE.md 「Figma에 없는 **시각**은 만들지 않습니다」는 시각 없는 동작 래퍼에는 걸리지 않습니다. items 배열을 받아 렌더를 소유하는 것은 `BottomTab` 선례입니다.

- **개방 범위는 그룹 단위입니다.** 스펙 `1436:12308`은 「한번에 하나의 아코디언만」이라고만 하고 범위를 말하지 않습니다. **리스트 인스턴스마다 자기 열림 집합을 들도록 확정**했으므로, 분류 그룹이 5개면 최대 5개가 동시에 열립니다. 화면 전체에서 하나여야 한다면 리스트 하나가 5그룹을 다 받아야 해서 구조가 달라집니다 — 「디자인 확인 필요」에 남겼습니다.

- **두 화면의 차이를 boolean 두 개가 아니라 `openMode` 한 축으로 받습니다.** 처음에는 `useSingleOpen`(토글 정책)과 `isDefaultOpen`(초기 상태)을 따로 뒀는데, **두 축이 독립이 아니라 조합 하나가 깨졌습니다.**

  `useSingleOpen`의 기본값이 `true`라 `<FaqAccordionList items={x} isDefaultOpen />` 한 줄로 도달하는데, 초기값이 전부 열린 상태라 **「한번에 하나만」이 처음부터 위반**되고 아무거나 하나 누르면 **전부 닫혔습니다**(`toggledIds`가 1개라는 전제로 쓰인 리듀서에 크기 4가 들어감). 실제로 필요한 조합은 둘뿐이라 union으로 합쳤습니다.

  | `openMode` | 초기 | 토글 | 쓰는 곳 |
  | --- | --- | --- | --- |
  | `single`(기본) | 전부 접힘 | 하나만 | CSC-001 FAQ 목록 |
  | `all` | 전부 펼침 | 여러 개 | CSC-101 검색 결과 |

- **상태를 「열린 id」가 아니라 「모드 기본값에서 뒤집힌 id」(`toggledIds`)로 듭니다.** 이 한 가지로 `items` 의존이 사라집니다.

  | `openMode` | `toggledIds`의 뜻 | 새로 들어온 항목 |
  | --- | --- | --- |
  | `single` | 열린 것 | 닫힘 (모드 기본값) |
  | `all` | **닫은 것** | **열림** (모드 기본값) |

  **그래서 `key` 리마운트가 필요 없습니다.** 열린 id를 저장하는 방식이었다면 마운트 시점의 `items`로 초기값을 채워야 해서, 검색어가 먼저 바뀌고 결과가 나중에 도착하는 비동기 흐름에서 **새 결과가 접힌 채로 나왔을 것**입니다(`key={query}`는 리마운트 시점의 직전 결과로 초기화됨). 지금은 모르는 id가 자동으로 모드 기본값을 따르므로 그 전제 자체가 없습니다.

  대신 **`openMode`는 인스턴스 수명 동안 고정으로 봅니다.** 도중에 바뀌면 이미 쌓인 `toggledIds`의 의미가 뒤집힙니다. 목록 화면과 검색 화면이 서로 다른 화면이라 실제로 닿지 않는 경로입니다.

- **개방 계산을 `utils/` 둘로 분리했습니다.** `resolveFaqAccordionToggledIds`가 다음 배열을, `resolveFaqAccordionIsOpen`이 항목별 열림 여부를 돌려줍니다. 컴포넌트에는 분기가 남지 않습니다.

  **`resolveInputState` 계열과 이름 접두어만 같고 성격은 다릅니다** — 그쪽은 `*_STATES`에서 상태 키 하나를 뽑아 `Record<State, string>`을 인덱싱하는 용도(CLAUDE.md 「폼 컨트롤 공통」 2)인데, 이 둘은 컬렉션과 boolean을 계산합니다. 「값을 따져서 돌려준다」는 뜻으로는 같은 접두어가 맞다고 봤지만, `resolve*`를 상태 키 전용으로 좁히기로 하면 함께 바뀌어야 합니다.

- **`aria-expanded`와 `aria-controls`를 컴포넌트가 직접 답니다.** 답변 영역이 컴포넌트 **안에** 있어 id를 소비자에게 물을 필요가 없습니다. `useId`로 만들어 버튼과 답변 래퍼를 잇습니다 — `ToggleListItem` · `QuantityStepper` · `SearchInput`이 이미 쓰는 훅입니다. [`CollapseButton`](./button.md)이 `aria-controls`를 통로로만 연 것과 갈리는데, **그쪽은 접히는 영역이 소비자 것**이라 id를 알 수 없었습니다.

- **답변을 항상 렌더하고 `aria-hidden`으로 끊습니다 — 언마운트하지 않습니다.** 모션을 넣으면서 뒤집힌 결정입니다. 없는 요소는 전환할 수 없어서, 접힘/펼침을 애니메이션하려면 마운트를 유지하는 것 말고 방법이 없습니다. 접근성 트리에서 빼는 것은 `aria-hidden={!isOpen}`이 맡고, 답변이 순수 텍스트라 포커스 가능한 요소가 없어 `inert`까지는 필요 없습니다. **[`answer`에 링크가 들어오게 되면](#디자인-확인-필요) 그때는 `inert`가 필요합니다.**

  **덕분에 `aria-controls`가 항상 실재하는 id를 가리킵니다.** 언마운트하던 때는 닫힌 동안 없는 id를 가리켰고 「`aria-expanded='false'`면 표준상 허용」이라는 근거로 두고 있었는데, 이제 그 예외가 필요 없어졌습니다.

- **질문에 heading을 씌우지 않았습니다.** WAI-ARIA APG accordion은 각 헤더 버튼을 `<h3>` 등으로 감싸 **제목 이동으로 목록을 훑을 수 있게** 하라고 권하고, FAQ는 그 이동이 실제로 유용한 대표 사례입니다. 그런데 **레벨은 소비자 화면의 제목 위계에 달린 값**이라 DS가 정할 수 없고, biz-ui 전체에 heading 사용처가 아직 0건입니다. 여는 형태(`headingLevel` prop)까지는 아래 「남은 API 결정」에 올렸습니다.

- **열림/닫힘과 caret 회전에 `transition`을 겁니다 — 250ms · `cubic-bezier(0, 0, 0.5, 1)`.** Figma에 모션 정의가 없어 처음에는 안 걸었는데, 자매 DS인 `@bbodek/internal-ui`의 `Alert`가 같은 접기/펼치기를 이미 애니메이션하고 있어 넣는 쪽으로 뒤집었습니다(아래 「internal-ui와 갈린 지점」).

  **값은 지어내지 않았습니다.** `--animate-fade-in` · `--animate-popup` · `--animate-bottom-sheet` 3종이 전부 `0.25s cubic-bezier(0, 0, 0.5, 1)`이고, DOTOLI-239가 **Figma 주석의 250ms를 근거로** 넣은 값입니다([frontend.md](../frontend.md)). 그 값을 그대로 씁니다.

  **다만 토큰으로는 못 씁니다.** 그 셋은 `animation` 단축 속성이라 `transition`에 재사용할 수 없고, `--ease-*` · `--duration-*` 토큰은 없습니다. 지금은 값을 인라인으로 맞춰 두고, **두 번째 소비처가 생기면 토큰으로 뺍니다** — `TOUCH_TARGET_STYLE`이 세 번째 소비처에서 `Button/shared` → `components/shared`로 옮겨진 것과 같은 순서입니다.

  `prefers-reduced-motion` 대응은 넣지 않았습니다. `Overlay`의 `--animate-*`도 안 걸고 있어 계열을 맞춘 것이고, 열려면 셋을 함께 봐야 합니다.

- **높이 전환은 `grid-template-rows: 0fr ↔ 1fr`입니다.** `height: auto`는 전환 대상이 아니라 방법을 골라야 하는데, `max-height` 추정값은 답변 줄 수가 자유라 못 쓰고 `interpolate-size: allow-keywords`는 Chrome 계열 전용이라 iOS WebView에서 안 먹습니다.

  **`overflow-hidden`을 grid 자식에 겁니다.** grid item은 `min-height: auto`라 이게 없으면 `0fr`에서도 안 줄어듭니다. 여백(`px-[20px] pb-[20px]`)은 그 안쪽 요소가 들어야 합니다 — clip 요소 자신이 padding을 가지면 접혔을 때 그만큼 남습니다. 그래서 `grid → clip → wrapper → 답변 박스` 4층입니다.

  Safari 16(2022) 이상에서 전환되고, 미만에서는 **애니메이션만 빠지고 즉시 열림/닫힘으로 degrade** 됩니다. 레포에 browserslist도 최소 iOS 선언도 없어 하한은 확인하지 못했습니다.

- **질문·답변 모두 말줄임하지 않습니다.** 높이가 자유라 길어지면 행이 늘어날 뿐입니다. 질문에는 `min-w-0 flex-1`을 걸어 caret과 겹치지 않게만 했습니다.

## internal-ui와 갈린 지점

`apps/internal-ui/src/components/Alert`의 `useCollapse`가 같은 목적(접기/펼치기 토글)의 기존 구현입니다. **「애니메이션한다」는 방향은 그쪽에서 가져왔고, 방식은 갈립니다.**

| 항목        | `Alert`                                             | `FaqAccordion`                        |
| ----------- | --------------------------------------------------- | ------------------------------------- |
| 높이 전환   | `transition-[max-height]` `150ms ease-out`           | `grid-template-rows` `250ms` DS 커브   |
| 접힘 높이   | `max-h-[3.375rem]` **상수**                          | 콘텐츠 높이 (`0fr`)                    |
| 펼침 높이   | `max-h-[100svh]` sentinel                            | 콘텐츠 높이 (`1fr`)                    |
| 내용 감추기 | `opacity-0` + `aria-hidden`                          | `0fr` + `overflow-hidden` + `aria-hidden` |
| 클리핑      | 없음 (투명하게만 만듦)                                | `overflow-hidden`                     |

`max-height` 방식을 안 가져온 이유가 셋입니다.

1. **접힘 높이를 상수로 못 박습니다.** `Alert`는 heading이 `truncate` 한 줄이라 54px 고정이 성립합니다. 여기는 질문을 말줄임하지 않아 2줄이 되면 `max-h`가 질문을 자릅니다.
2. **sentinel이 이징을 왜곡합니다.** 실제 콘텐츠가 150px 안팎인데 `100svh`까지 전환하면 펼칠 때는 움직임이 초반에 끝나고, 접을 때는 한참 멈췄다가 급히 닫힙니다.
3. **`opacity-0` 잔류가 다음 항목을 덮습니다.** `Alert`는 단독 배치라 투명한 잔여물이 가릴 게 없지만, 아코디언은 **바로 아래에 구분선과 다음 질문이 붙습니다.**

`aria-expanded` 위치도 갈립니다 — `Alert`는 내용 컨테이너(`AlertBox`)에, 여기는 **질문 버튼**에 답니다. 상태를 가진 컨트롤이 버튼 자신이라서입니다.

## API

### `FaqAccordion`

| prop        | 필수 | 기본값 | 비고                       |
| ----------- | ---- | ------ | -------------------------- |
| `question`  | ✅   | —      | 질문. 행 전체가 버튼        |
| `answer`    | ✅   | —      | 답변. 열렸을 때만 렌더      |
| `isOpen`    | ✅   | —      | 제어 전용                   |
| `onToggle`  | ✅   | —      | 질문 행 탭                  |
| `className` |      | —      | 담는 쪽의 여백 보정용       |

### `FaqAccordionList`

| prop        | 필수 | 기본값     | 비고                                              |
| ----------- | ---- | ---------- | ------------------------------------------------- |
| `items`     | ✅   | —          | `{ id, question, answer }[]`                       |
| `openMode`  |      | `'single'` | `'single'` · `'all'`. 인스턴스 수명 동안 고정 전제 |
| `className` |      | —          | 담는 쪽의 여백 보정용                              |

```tsx
// CSC-001 FAQ 목록 — 분류 그룹마다 하나씩
<FaqAccordionList items={group.items} />

// CSC-101 검색 결과 — items가 비동기로 바뀌어도 새 항목은 열린 채로 들어옵니다
<FaqAccordionList items={results} openMode='all' />
```

## 디자인 확인 필요

| 항목              | 내용                                                                                          |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| 마지막 항목 구분선 | 목록 끝에서도 선이 남습니다. `NavigationListItem`은 `last:border-b-0`으로 뺐는데, FAQ는 그룹 사이에 분류 헤더가 들어와 선이 필요해 보여 Figma 심볼대로 뒀습니다. **구현은 어느 쪽이든 한 줄**이라 답변만 오면 바로 반영됩니다 |
| 개방 범위         | 「한번에 하나만」의 범위가 그룹인지 화면 전체인지 스펙에 없습니다. **그룹 단위로 확정**했습니다  |
| 모션              | Figma에 지정이 없는데 **넣었습니다** — 250ms · `cubic-bezier(0, 0, 0.5, 1)`. DS가 이미 쓰는 `--animate-*` 값을 그대로 맞춘 것이고, internal-ui `Alert`도 같은 자리를 애니메이션합니다. duration·easing을 따로 정할지 |
| 상호작용          | `hover` · `pressed` · `focus` 축이 없습니다                                                     |
| `answer` 타입     | 현재 문자열 전용입니다. 링크 · 줄바꿈 · 목록이 답변에 들어갈 계획이 있는지 (`InfoField`의 `value`와 같은 항목) |
| caret 방식        | Figma는 아이콘 교체인데 구현은 회전입니다. **원본도 회전으로 정리가 필요합니다**                |

## 남은 API 결정

디자인이 아니라 **DS API 쪽에서 정해야 하는 항목**입니다.

| 항목            | 내용                                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| heading 위계    | 질문 버튼을 `<h3>` 등으로 감쌀지. 열면 `headingLevel` prop이 되고, 안 열면 스크린리더의 제목 이동이 없습니다 |
| `onToggle` 타입 | `() => void`입니다. 같은 disclosure인 `CollapseButton`은 `Required<Pick<ButtonHTMLAttributes, 'onClick'>>`이라 `MouseEvent`가 넘어옵니다. 이름을 바꾼 콜백은 `() => void`라는 `HeaderBar`·`NotificationCard` 쪽 규칙을 따랐는데, 둘 중 하나로 계열을 정리할 필요가 있습니다 |

## Storybook

스토리 파일이 둘입니다. 폴더명과 컴포넌트명이 같아 `core/biz-ui/FaqAccordion/FaqAccordion` 같은 중복 경로 대신 **둘 다 최상위**에 뒀습니다 (`MenuItem` · `StatusAlertBanner`와 같은 평면 구조).

`apps/storybook/src/stories/biz-ui/FaqAccordion.stories.tsx` — `core/biz-ui/FaqAccordion`

| 스토리        | 보는 것                                     |
| ------------- | ------------------------------------------- |
| `Default`     | 컨트롤 패널                                  |
| `Interactive` | `useState`로 회전과 답변 등장을 함께          |
| `States`      | 접힘 · 펼침을 붙여 놓고 구분선 이음새 확인    |
| `LongText`    | 질문·답변이 길어져 **높이가 늘어나는 것**     |

`apps/storybook/src/stories/biz-ui/FaqAccordionList.stories.tsx` — `core/biz-ui/FaqAccordionList`

| 스토리         | 보는 것                                                     |
| -------------- | ----------------------------------------------------------- |
| `Default`      | CSC-001 — 기본 접힘 + **하나를 열면 이전 것이 닫히는 것**    |
| `SearchResult` | CSC-101 — `openMode='all'`로 **전부 열린 채 시작하고 여러 개를 접었다 펼 수 있는 것** |

**`toggledIds` 전이는 스토리가 아니라 두 유틸을 직접 실행해 검증했습니다.** 두 모드의 전이 8가지와 「비동기로 새 `items`가 도착했을 때 `all` 모드에서 열린 채 나오는지」까지 9건이고, 마지막 항목은 스토리로 재현할 수 없습니다.

**`dist`로는 안 됩니다 — 배럴이 유틸을 내보내지 않습니다**(CLAUDE.md 「내부 전용 유틸은 export 하지 않음」. `CtaButton` · `Checkbox` · `Input/shared`도 같습니다). `src`의 두 파일을 그대로 떼어 실행합니다.
