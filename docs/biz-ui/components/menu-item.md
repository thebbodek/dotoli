# MenuItem 구현 기록

`apps/biz-ui/src/components/MenuItem` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 이 컴포넌트 고유 사실만 둡니다.

Figma: [MenuItem 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=75-4801&m=dev) (`75:4801`). 실제 값은 심볼 2개(`179:1469` · `179:1468`)에서 실측했습니다.

## 구현 현황

| 컴포넌트   | 티켓       | 설명                                          |
| ---------- | ---------- | --------------------------------------------- |
| `MenuItem` | DOTOLI-258 | `IconCircle` 재사용. 서브 컴포넌트 없음       |

## Variant 축

| 축   | Figma 이름 | 값                |
| ---- | ---------- | ----------------- |
| 종류 | `type`     | `chat` · `phone`  |

**두 심볼의 차이는 아이콘 하나뿐입니다.** 컨테이너 · 패딩 · 색 · 타이포가 전부 같고 `ChatCenteredDots` ↔ `PhoneCall`만 바뀝니다. 그래서 `type` 유니온을 만들지 않고 `iconKey`를 열었습니다 (아래 「결정」).

## 실측 스펙

심볼 420 × 82, 자식은 `IconCircle` 인스턴스(x=19 · y=26 · 30 × 30)와 `Container` 프레임(x=61 · y=17 · 340 × 48) 둘입니다.

| 항목      | 값                                                                       |
| --------- | ------------------------------------------------------------------------ |
| 높이      | 82 → `h-[82px]` 고정 (아래 「높이를 고정합니다」)                         |
| 폭        | **고정하지 않음.** 심볼 420은 문서 프레임 폭이라 `w-full`                 |
| padding   | 좌우 19 → `px-[19px]` (아래 「좌우 패딩이 19입니다」). 상하 17은 높이로 대체 |
| gap       | 12 → `gap-[12px]` (아이콘 끝 49 → 컨테이너 시작 61)                       |
| radius    | 16 → `rounded-16`                                                         |
| 배경      | `base/white` → `bg-white`                                                 |
| 테두리    | 1px `gray/200` → `inset-ring inset-ring-gray-200`                         |
| 아이콘    | `IconCircle` 30 · radius 10 · `gray/100` 배경 · `gray/300` 글리프 · 20px  |
| 라벨      | `body-lg-semibold` (18 · SemiBold · 1.45 · 0) · `gray/800`                |
| 설명      | `body` (16 · Medium · 1.45 · -3%) · `gray/600`                            |

**`IconCircle`이 그대로 맞습니다 — 새로 만들 것이 없습니다.** `size='sm'`이 `size-[30px] rounded-10`, `theme='gray'`가 `bg-gray-100 text-gray-300`, 아이콘이 `text-[20px]`로 실측 네 값과 전부 일치합니다. `NotificationCard`가 같은 방식으로 물어 씁니다.

두 텍스트 박스는 Figma에서 **1px 겹칩니다** (라벨 0..26, 설명 25..48 → 합 48). 코드젠도 `mb-[-1px]`로 뽑는데, 폰트 메트릭 아티팩트라 음수 마진을 옮기지 않았습니다. CSS로 쌓으면 `26.1 + 23.2 = 49.3`이고 높이를 고정했으므로 카드 크기에는 영향이 없습니다.

### 아이콘 웨이트는 `fill`입니다

**한 가지 방법으로는 안 갈리고 2단으로 갈립니다.** [checkbox.md](./checkbox.md) · [tag.md](./tag.md)의 바운딩 역산이 `bold`를 떨어뜨리고, [bottom-tab.md](./bottom-tab.md) 「가르는 것은 서브패스 개수입니다」가 `regular`를 떨어뜨립니다. 둘 중 하나만 쓰면 `chat`에서 후보가 남습니다.

**1단 — 바운딩이 `bold`를 배제합니다.** Figma export는 20px 박스에서 `16.25 × 15`(chat) · `15.6249 × 15.6248`(phone), viewBox 256 환산 **208 × 192** · **200 × 200**입니다.

| 웨이트    | chat 바운딩   | 이번 값과의 차이 |
| --------- | ------------- | ---------------- |
| `regular` | 208 × 192     | 0 · 0            |
| `bold`    | 216 × 200     | **+8 · +8**      |
| `fill`    | 208 × 192     | 0 · 0            |

`regular`와 `fill`은 외곽 실루엣이 같아 여기서 갈리지 않습니다.

**2단 — 서브패스 개수가 `regular`를 배제합니다.** `fill`은 속을 채워 내부 구획선이 사라지므로 서브패스가 하나 적습니다.

| 소스                                  | `d` 안의 `M`/`m` |
| ------------------------------------- | ---------------- |
| `regular/chat-centered-dots.svg`      | 5                |
| `bold/chat-centered-dots-bold.svg`    | 4                |
| `fill/chat-centered-dots-fill.svg`    | **4**            |
| Figma export                          | **4**            |
| `regular/phone-call.svg`              | 4                |
| `bold/phone-call-bold.svg`            | 4                |
| `fill/phone-call-fill.svg`            | **3**            |
| Figma export                          | **3**            |

**`chat`은 개수만으로는 `bold`(4)와 `fill`(4)이 안 갈립니다** — 1단이 이미 떨어뜨렸기에 결론이 나옵니다. `phone`은 3이 `fill` 단독이라 2단만으로 끝납니다.

`chat`은 **시작 서브패스로도 확인됩니다.** Figma export가 말풍선 외곽선(`M15 0H1.25C…`)으로 시작하는데, `fill`이 같은 순서(`M216,40H40A16,…`)이고 `regular`(`M116,120a12,12,…`) · `bold`(`M88,120a16,16,…`)는 둘 다 점 하나로 시작합니다. 이 판별법 하나로도 `fill`만 남습니다.

`NotificationCard`도 `IconCircle`에 `ICON_WEIGHTS.FILL`을 넘깁니다. `IconCircle` 자체는 웨이트 기본값이 없어 `Icon`의 `bold`로 떨어지므로 **넘기지 않으면 다른 글리프가 나옵니다.**

## 결정

- **`type` 축을 `iconKey`로 열었습니다 — 유니온을 만들지 않았습니다.** 두 심볼의 차이가 아이콘뿐이라 `iconKey` 하나로 축이 전부 표현됩니다. 같은 DS의 `NotificationCard`가 이미 `Partial<Pick<IconCircleProps, 'iconKey'>>`로 같은 선택을 했습니다.

  닫힌 `type: 'chat' | 'phone'`으로 두면 **세 번째 메뉴가 생길 때마다 DS를 고쳐야 합니다.** 컴포넌트 이름이 「문의 수단」이 아니라 일반적인 `MenuItem`이라 문의 채널 두 개를 타입에 박을 이유가 없습니다.

  **기준은 「Figma에 축이 있는가」가 아니라 「소비자가 정할 것이 있는가」입니다.** `iconKey`는 무엇을 보여줄지라 소비자 몫이고, `weight` · `size` · `theme`는 DS의 시각 결정이라 안 엽니다. 실측 결과 축이 후자에 아무 영향을 주지 않아서 축이 사라진 것이지, Figma를 무시한 것이 아닙니다.

  **닫힌 축 + DS 소유 아이콘 맵인 반대 선례도 biz-ui 안에 있습니다** — `Divider`의 `DIVIDER_ICON_KEYS`(`Record<DividerCaretType, …>`)와 `BottomTab`의 `BOTTOM_TAB_ITEMS`입니다. 갈리는 지점은 **텍스트를 누가 갖느냐**입니다. 그 둘은 라벨까지 DS가 소유해 축이 조합 전체를 보장하지만, `MenuItem`은 `label` · `description`을 소비자가 넘깁니다. 축을 닫아도 `type='chat'` + `label='배송 문의'`가 타입상 그대로 통과해 **축이 아무것도 보장하지 못합니다.**

  대신 Figma가 정한 두 아이콘은 `MENU_ITEM_ICON_KEYS`로 남겼습니다. API를 닫지 않으면서 실측 근거를 코드에 두고, 스토리 컨트롤도 여기서 뽑습니다.

- **`ref`를 엽니다 — 버튼 계열과 맞췄습니다.** `CtaButton` · `IconButton` · `FloatingPill` · `Filter` · [`Tag`](./tag.md)가 전부 `RefAttributes<HTMLButtonElement>`를 열고, 안 여는 것은 `NavigationListItem` 하나뿐입니다. 메뉴가 목록으로 놓이면 포커스를 옮기고 싶은 소비처가 나오는데, 그건 항목 하나가 아니라 목록 전체를 아는 쪽이 풀 문제라 **소비자가 각 항목에 닿을 손잡이가 필요합니다.** 소비자가 판단할 것이 없는 네이티브 통로를 DS가 막지 않습니다.

- **접근성 이름을 따로 만들지 않았습니다.** `<button>` 안의 `label` + `description`이 그대로 이름이 되어 「채팅 문의 문의사항을 남겨주시면 꼭 답변드려요」로 읽힙니다. 두 줄 다 그 메뉴가 무엇인지 설명하는 문장이라 합쳐도 뜻이 유지됩니다.

  [tag.md](./tag.md)가 `aria-label` 기본값(`` `${label} 제거` ``)을 둔 것과 갈리는데, **태그는 버튼의 동작(제거)이 내용에 안 드러나서** 동사를 붙여야 했습니다. 여기는 「채팅 문의」가 곧 동작이라 덧붙일 것이 없어 [chip.md](./chip.md) 「접근성 이름은 `label`이 집니다」와 같은 쪽입니다.

- **좌우 패딩이 19입니다 — Figma 오토레이아웃 값 18이 아닙니다.** 실측한 자식 위치가 좌 19 · 우 19이고 가로 산술이 정확히 닫힙니다.

  ```
  19 + 30(IconCircle) + 12(gap) + 340(Container) + 19 = 420
  ```

  이 프레임은 **안쪽 스트로크를 레이아웃에 포함**해서 오토레이아웃 18 + 스트로크 1 = 19가 됩니다. 다만 19는 **자식 좌표 직접 실측값**이라, 이 설명이 틀리더라도 값 자체는 흔들리지 않습니다.

  CSS `inset-ring`은 `box-shadow`라 **레이아웃을 차지하지 않으므로**, 18을 쓰면 링과 콘텐츠 사이가 17이 되어 1px 좁아집니다. 19를 써야 링 안쪽 여백이 Figma와 같은 18이 됩니다.

  **`Chip`은 같은 상황에서 20 → 20이라 다릅니다.** 그쪽 심볼은 테두리가 있는 `isSelected=false`(`75:5227`)와 없는 `isSelected=true`(`75:5226`) 둘 다 라벨이 x=20이라, 스트로크가 콘텐츠를 밀지 않습니다. **프레임마다 설정이 달라 실측 없이는 알 수 없으므로**, 값을 옮기지 말고 자식 좌표를 직접 확인해야 합니다.

- **높이를 고정합니다 — `h-[82px]`, `py-[16px]` 없음.** 패딩으로 쌓으면 `17 + 49.3 + 17`이 나오는데 Figma 텍스트 합은 48(1px 겹침 포함)이라 82와 어긋납니다. `Chip`(32) · `SelectionItem`(56) · `CtaButton` · `IconButton` · `BottomTab`과 같은 처리입니다.

- **테두리는 `inset-ring`입니다.** CLAUDE.md 「스타일 규칙」 그대로입니다. `border`로 그리면 상하 1px씩이 높이에 더해져 **고정한 82가 84가 됩니다.** `ItemCheckbox`가 아직 `border`인데 그쪽은 이 티켓 밖입니다.

- **`<button>` + `onClick` 필수입니다.** 메뉴 항목은 눌러서 이동·실행하는 것이 존재 이유라, 누를 수 없는 MenuItem은 만들 수 없게 했습니다. `NavigationListItem` · [tag.md](./tag.md)와 같은 형태(`Required<Pick<…, 'onClick'>>` + `type='button'` 하드코딩)입니다.

  **Figma에는 상호작용 정의가 없습니다** — 아래 「디자인 확인 필요」에 올렸습니다.

- **라벨 · 설명 둘 다 `truncate`입니다.** 높이가 82로 고정이라 줄바꿈이 생기면 그대로 넘칩니다. `NavigationListItem`(`min-w-0 truncate text-left`) · `SelectionItem`이 같은 이유로 같은 처리를 하고 있어 목록 계열의 기존 정책을 따랐습니다.

  [tag.md](./tag.md)가 말줄임을 미룬 것과 갈리는데, **태그는 높이가 콘텐츠를 따라가고 그룹 안에서 줄바꿈되지만 여기는 카드 높이가 고정**이라 선택지가 없습니다.

  `text-left`가 필요한 것은 `<button>`의 기본 `text-align: center` 때문입니다.

- **`description`이 필수입니다.** 두 심볼 모두 설명을 갖고 있어 없는 형태가 정의돼 있지 않습니다. `NavigationListItem`이 `value`를 선택으로 둔 것은 Figma에 값 없는 변형이 있어서였습니다.

- **폭을 고정하지 않았습니다 — `w-full`.** 420은 문서 프레임 폭이고 모바일 WebView는 화면 폭을 따릅니다. `NavigationListItem` · `SelectionItem` · `NotificationCard`가 전부 `w-full`입니다.

- **`transition-colors`를 걸지 않았습니다.** hover · pressed 정의가 없어 전환할 색이 없습니다 ([tag.md](./tag.md)와 같은 판단).

- **`disabled`를 넣지 않습니다.** Figma에 축이 없어 스타일을 정의할 수 없습니다.

- **히트 영역을 확장하지 않았습니다.** Figma 주석 지정이 없습니다(CLAUDE.md 「히트 영역 확장」). 카드 전체가 82 높이라 세로는 이미 44를 넘습니다.

## API

| prop          | 필수 | 기본값 | 비고                                          |
| ------------- | ---- | ------ | --------------------------------------------- |
| `iconKey`     | ✅   | —      | Figma가 정한 2종은 `MENU_ITEM_ICON_KEYS`      |
| `label`       | ✅   | —      | 첫 줄. 말줄임됨                               |
| `description` | ✅   | —      | 둘째 줄. 말줄임됨                             |
| `onClick`     | ✅   | —      | 카드 전체가 버튼                              |
| `className`   |      | —      | `<button>`(카드 전체)에 적용                  |

`ref`는 `<button>`을 가리킵니다.

`weight` · `size` · `theme`는 열지 않았습니다 — 셋 다 DS의 시각 결정이라 `IconCircle`에 고정으로 넘깁니다 (위 「결정」의 기준).

**`MENU_ITEM_ICON_KEYS`는 강제가 아닙니다.** 타입을 좁히지 않으므로 `iconKey='bell'`도 그대로 컴파일됩니다. Figma가 정한 2종을 코드에 기록하고 스토리 컨트롤 소스로 쓰는 용도이고, 소비자가 다른 아이콘을 넣는 것을 막을 의도는 없습니다.

**안 좁히는 것은 값 목록이지 prop 자체가 아닙니다 — `iconKey`는 필수입니다.** `IconProps.iconKey`가 `PhosphorIcon['name']`로 `?` 없이 선언돼 있고 `Pick`이 필수 여부를 보존하므로 `Pick<IconCircleProps, 'iconKey'>`도 필수입니다. 기본값을 두지 않는 이유이고, 선택으로 만들려면 `NotificationCard`처럼 `Partial<Pick<…>>`로 감싸야 합니다.

**`label` · `description`은 이 구현이 붙인 이름입니다.** Figma 텍스트 레이어는 본문 그대로(`채팅 문의` · `문의사항을 남겨주시면 꼭 답변드려요`)이고 감싸는 프레임만 `Container`라, 가져올 이름이 없었습니다. `NotificationCard`의 `subText`는 Figma `useSubText` 축에서 온 이름이라 출처가 다릅니다.

## internal-ui와 갈린 지점

**`apps/internal-ui`에 대응하는 컴포넌트가 없습니다.** 어드민에는 아이콘 + 2행 텍스트 카드가 없어 옮겨올 것이 없습니다.

대신 **같은 조립을 하는 선례가 biz-ui 안에 있습니다** — `NotificationCard`가 `IconCircle` + `Typography` 조합이고, 거기서 가져온 것은 다음 둘입니다.

| 항목                | `NotificationCard`                     | `MenuItem`                       |
| ------------------- | -------------------------------------- | -------------------------------- |
| 아이콘 전달         | `iconKey`를 소비자가 넘김              | **같음** (필수인 점만 다름)      |
| `IconCircle` 웨이트 | `ICON_WEIGHTS.FILL` 명시               | **같음**                         |
| 색 상수             | `NOTIFICATION_CARD_COLORS` 객체        | `MENU_ITEM_COLORS` 객체          |
| 엘리먼트            | `<div>` (자체 액션 버튼을 안에 둠)     | `<button>` (카드 전체가 액션)    |

## 디자인 확인 필요

| 항목            | 내용                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 상호작용        | **카드 전체를 버튼으로 구현했습니다.** hover · pressed · focus 정의가 없습니다                                               |
| `type` 축 이름  | 축이 실제로는 아이콘 선택이라 `iconKey`로 열었습니다. Figma에 세 번째 메뉴가 생길 계획인지                                    |
| 그룹 gap        | 문서 프레임의 두 심볼 간격이 **9**입니다(`Flex`의 짝수 스케일에 없는 값). 목록 간격 스펙인지 문서 배치인지 확인 필요           |
| 폭              | 심볼이 420인데 다른 컴포넌트 문서 프레임은 340입니다. 실제 사용 화면 폭이 어느 쪽인지                                        |
| 텍스트 길이     | 라벨 · 설명 모두 말줄임 처리했습니다. 두 줄 이상이 필요한 경우가 있는지                                                      |
| `disabled`      | 축이 없습니다. 비활성 메뉴를 표시할 일이 없는지                                                                              |
| 텍스트 1px 겹침 | 두 텍스트 박스가 Figma에서 1px 겹칩니다. 의도인지 오토레이아웃 아티팩트인지                                                  |

## Storybook

`apps/storybook/src/stories/biz-ui/MenuItem.stories.tsx`, `meta.title`은 `core/biz-ui/MenuItem`. 스토리 4종이고 데코레이터로 Figma와 같은 420px 프레임을 씌웁니다.

- `Default` — 컨트롤 패널용. `iconKey` 컨트롤은 `Object.values(MENU_ITEM_ICON_KEYS)`로 2종만 노출합니다
- `Types` — Figma 심볼 2종을 실제 문구 그대로
- `Narrow` — 360px로 좁혀 **`w-full`이 텍스트만 줄이고 아이콘 · gap · 패딩은 그대로 두는지** 봅니다
- `LongText` — 높이가 고정이라 **두 줄 다 말줄임되는 것**을 보여줍니다

## 검증

Storybook 렌더의 계산값으로 대조했습니다.

| 항목      | 기대                                | 실측                                                      |
| --------- | ----------------------------------- | --------------------------------------------------------- |
| 높이      | 82                                  | **82** — 4스토리 전부 · 긴 문구에서도 유지                 |
| padding   | 좌우 19 · 높이는 `h-[82px]`         | `0px 19px`                                                 |
| gap · radius | 12 · 16                          | `12px` · `16px`                                            |
| 배경 · 테두리 | `base/white` · 1px `gray/200`    | `rgb(255,255,255)` · `rgb(227,230,238) 0 0 0 1px inset`    |
| 아이콘 원 | 30 · radius 10 · `gray/100`         | **30 × 30** · `10px` · `rgb(240,242,247)` · `shrink-0`     |
| 글리프    | 20px · `gray/300` · `fill`          | 20px · `rgb(206,212,224)` · **`ph-fill`**                  |
| 라벨      | `body-lg-semibold` · `gray/800`     | 18px / 600 · `rgb(51,60,81)` · 높이 26.09                  |
| 설명      | `body` · `gray/600`                 | 16px / 500 · `rgb(105,115,140)` · 높이 23.2                |
| 말줄임    | 두 줄 다 · `text-left`              | `LongText` 라벨 340 ← 479 · 설명 340 ← 410 · 둘 다 말줄임  |

**가로 산술이 그대로 닫힙니다** — 「좌우 패딩이 19입니다」의 근거를 렌더가 재현합니다.

| 폭  | 좌패딩 | 아이콘 | gap | 콘텐츠  | 우패딩 | 합      |
| --- | ------ | ------ | --- | ------- | ------ | ------- |
| 420 | 19     | 30     | 12  | 340     | 19     | **420** |
| 360 | 19     | 30     | 12  | **280** | 19     | **360** |

`Narrow`에서 줄어든 60이 **전부 콘텐츠에서만** 빠졌습니다. 아이콘 30 · gap 12 · 패딩 19는 그대로입니다.

텍스트 두 줄 합은 `26.09 + 23.2 = 49.29`로 Figma 48(1px 겹침 포함)과 1.29 차이인데, 높이를 82로 고정했으므로 카드에는 영향이 없습니다.

빌드 · 린트 · `dist` 공개 API(`MenuItem` + `MENU_ITEM_*` 8종) 확인했습니다.

**실행 중이던 Storybook이 신규 export를 그대로 잡았습니다** — `snapshot.managedPaths` 재시작 함정에 안 걸렸습니다 ([tag.md](./tag.md)와 같습니다).
