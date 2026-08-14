# Info 계열 구현 기록

`apps/biz-ui/src/components/Info` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 Info 계열 고유 사실만 둡니다.

Figma: [Info 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=177-520&m=dev) (`177:520`).

**섹션 이름은 Info지만 계열 폴더에는 이름이 `Info`로 시작하는 것만 넣습니다.** 같은 섹션의 `IconCircle` · `Divider` · `NotificationCard`는 Info 전용이 아니라 범용이라 단독 폴더입니다 — [icon-circle.md](./icon-circle.md) · [divider.md](./divider.md).

## 구현 현황

| 컴포넌트    | 티켓       | 설명                                          |
| ----------- | ---------- | --------------------------------------------- |
| `InfoField` | DOTOLI-236 | `layout` 2종. 라벨 + 값 2요소. 상태 축 없음  |
| `InfoItem`  | DOTOLI-237 | `theme` 2종. 인포 아이콘 + 안내 문구         |

## 계열 공통 결정

- **`shared/`를 열지 않았습니다.** 둘 다 구현한 지금도 겹치는 조각이 없습니다 — `InfoField`는 라벨+값, `InfoItem`은 아이콘+안내문구이고, 공통이라곤 `body` 타이포와 `w-full`뿐이라 결합이 아닙니다. Order 계열이 DOTOLI-233에서 실제 중복(`· 휴일` 접미어)이 생긴 뒤에야 열었던 것과 같은 기준입니다.

---

## InfoField

Figma: 컴포넌트 세트 `132:471`. 심볼은 `132:468`(horizontal, 304×27) · `132:469`(vertical, 292×54)입니다.

라벨과 값 2요소를 그리는 표시 전용 컴포넌트입니다. 상태 축이 없어 `<div>` + `Typography` 2개로 렌더합니다.

### Variant 축

| 축       | 값                        |
| -------- | ------------------------- |
| `layout` | `horizontal` · `vertical` |

기본값은 Figma 세트의 첫 심볼을 따라 `horizontal`입니다.

### 실측 스펙

| 항목      | `horizontal`                  | `vertical`                 |
| --------- | ----------------------------- | -------------------------- |
| 레이아웃  | `flex-h-stack` · `justify-between` | `flex-v-stack` · gap 2px |
| padding   | `py-[2px]`                    | 없음                       |
| 라벨      | `body` · `gray/600`           | `body` · `gray/600`        |
| 값        | `body-semibold` · `gray/700`  | **`heading-4`** · `gray/700` |
| 높이      | 27.2 (2 + 23.2 + 2)           | 54.2 (23.2 + 2 + 29)       |

**두 레이아웃의 실질적인 차이는 값의 타이포입니다** — 라벨은 양쪽 다 `body`/`gray/600`으로 같고, 값만 16px SemiBold(`body-semibold`)에서 20px SemiBold(`heading-4`)로 커집니다.

폭은 문서 프레임이 304 / 292px인데 실제로는 fill입니다.

바인딩된 hex가 기존 토큰과 전부 일치해 신규 토큰이 없습니다 (`gray/600` `#69738c` · `gray/700` `#4c566e`).

Storybook 렌더의 계산값으로 두 레이아웃을 대조했고 박스·padding·gap·타이포·색이 전부 일치합니다.

### 결정

- **`heading-4`의 letter-spacing은 토큰 값(`-0.01em`)이 맞습니다.** Figma codegen이 이 심볼에서 `tracking-[-1px]`을 내보내는데, 변수 원값 `-1`을 %가 아니라 px로 찍은 것입니다. **바인딩 변수로 확인했습니다** — heading 전 계열이 `letterSpacing/neg1`(= `-1`)을 공유하고, 렌더값이 폰트 크기의 정확히 1%입니다(20px → `-0.2px`). 이 레포는 설명 텍스트가 아니라 **변수/렌더를 따르는 것이 원칙**인데(→ [frontend.md](../frontend.md) 「특이사항」), 변수 쪽이 토큰과 같으므로 원칙대로 토큰을 건드리지 않았습니다. 같은 확인 과정에서 `heading-1`은 반대로 **변수가 34px이라 토큰(36px)을 고쳤습니다** — 근거가 페이지 설명이 아니라 변수라서 방향이 갈린 것입니다.
- **`layout`을 union 2종으로 받습니다.** 값 유무로 파생시킬 수 없습니다 — 라벨·값이 양쪽 레이아웃에 똑같이 있고 배치만 다릅니다. `Divider`의 `type`과 같은 이유입니다.
- **Figma의 중간 래퍼 2개를 생략했습니다.** horizontal 라벨을 감싼 `94:325`와 vertical 값을 감싼 `94:876`은 레이아웃에 아무것도 더하지 않습니다(각각 hug 래퍼, `w-full` 래퍼). 값 텍스트의 `flex-[1_0_0]`도 그 래퍼가 있어야 의미가 있어 같이 걷어냈습니다. **같이 딸려 있던 `min-w-px`는 래퍼와 무관한 축소 가드라 걷어내면 안 되는 것이었고, 아래 항목에서 되살렸습니다.**
- **`whitespace-nowrap`·`truncate`를 넣지 않고 줄바꿈되게 뒀습니다.** Figma 심볼에는 nowrap이 있지만 hug 표현입니다. **높이가 고정이 아니라서** 문구가 길면 행이 늘어날 뿐 무너지지 않습니다. `Divider`의 `text`를 말줄임으로 막은 것과 갈리는데, 거기는 `h-[20px]` 고정이라 줄바꿈이 곧 레이아웃 붕괴였습니다. `QuantityStepper` 상품명과 같은 판단입니다.
- **값에 `min-w-0 break-all`을 겁니다** (`INFO_FIELD_VALUE_STYLE`). 줄바꿈에 맡기는 것만으로는 **끊길 곳이 없는 문자열**(이메일 · URL · 공백도 하이픈도 없는 주문번호)에서 컨테이너를 벗어납니다. 폭 304px에 그런 45자 문자열을 넣어 실측한 값입니다.

  | 값 | 없음 | `min-w-0` | `min-w-0 break-all` |
  | --- | --- | --- | --- |
  | horizontal | 101.8px 넘침 | 0 | 0 |
  | vertical | 204.5px 넘침 | 204.5px 넘침 | 0 |

  **vertical에서는 `min-w-0`만으로 부족합니다.** 열 플렉스라 `min-width`가 제약 축이 아니고, `items-start`로 hug된 자식의 fit-content가 전체 문자열 폭 그대로입니다. `word-break: break-all`이 min-content를 1글자로 떨어뜨려야 접힙니다. 영어 단어가 중간에 잘리는 것은 감수합니다 — 값이 ID·번호·주소 같은 데이터라 산문이 아닙니다. internal-ui도 `InputFeedback`·`SelectBaseFeedback`에서 `break-all`을 씁니다.

  **`break-words`(`overflow-wrap: break-word`)는 후보에서 빠집니다 — 이 빌드에 클래스 자체가 없습니다.** 소스 어디에서도 쓰지 않아 Tailwind가 생성하지 않았고, 런타임에 붙여도 `overflow-wrap: normal`입니다(DOTOLI-237에서 확인). 쓰려면 소스에 리터럴로 넣어 생성시켜야 합니다.

  `min-w-0`은 horizontal에서만 필요합니다(행 플렉스라 `min-width: auto`가 축소를 막음). vertical에는 영향이 없지만 두 레이아웃이 같은 값 스타일을 쓰도록 한 문자열로 둡니다.
- **`label`·`value` 둘 다 required입니다.** 라벨-값 쌍이라 한쪽만 있으면 컴포넌트가 성립하지 않습니다. `Badge`의 `label`, `OrderBoxCell`의 `boxes`·`itemName`과 같은 처리입니다.
- **`<dl>`/`<dt>`/`<dd>`를 쓰지 않고 `<div>` + `Typography`로 갑니다.** internal-ui는 라벨-값 쌍을 description list로 그리고(`Select/Multi/shared/MultiSelectBaseResultPanel.tsx:11` · `Filter/FilterTrigger.tsx:58`), biz-ui `Typography`도 `as='dt'`·`as='dd'`를 이미 받습니다(`TYPOGRAPHY_ELEMENTS`). 그래도 따라가지 않은 이유는 **`<dl>`이 쌍 하나를 감싸는 태그가 아니라 여러 쌍을 담는 "목록" 태그**이기 때문입니다.

  | 구조 | 결과 |
  | --- | --- |
  | 소비처가 `<dl>` 하나에 필드 3개 | 목록 1개 · 항목 3개 — 「셋이 한 묶음」이 전달됨 |
  | **InfoField가 자기 `<dl>`을 렌더** | **1개짜리 목록 3개** — 묶음 정보가 사라지고 필드마다 「목록, 항목 1개」가 반복됨 |

  internal-ui의 두 사례는 필터 선택 개수 · 셀렉트 결과 개수라 **애초에 반복되지 않는 단일 쌍**이라 이 문제가 없습니다. InfoField는 카드에 여러 개 쌓일 가능성이 커서 조건이 다릅니다. **아직 쓰는 화면이 없어 단일인지 반복인지 모르는 상태**라, 되돌리기 쉬운 쪽을 골랐습니다.

  **소비처가 생기면 다시 봅니다.** 그때 답은 `<dl>`을 InfoField 안으로 넣는 것이 아니라, InfoField가 `<div><dt>…<dd>…</div>`만 그리고(HTML5가 허용하는 형태) **묶는 `<dl>`은 소비처가 두는 것**입니다 — 묶음이 정확해지는 대신 InfoField 단독으로는 무효 HTML이 되므로, 실제 사용 형태를 보고 정합니다.

  계열 선례(`OrderBoxCell` · `OrderDateInfo`)가 `div`+`span`인 것은 근거가 되지 않습니다 — 그 둘은 「박스수/품목명」 · 「날짜/배송정보」라 라벨-값 관계가 아닙니다.
- **폭을 선언하지 않고 `w-full`입니다.** 304 / 292px은 문서 값입니다. `horizontal`의 `justify-between`이 동작하려면 폭이 필요해서 `w-full`은 컴포넌트가 들고 갑니다.
- **`shrink-0`을 넣지 않았습니다.** `Divider`·`IconCircle`과 달리 내용이 있어 `min-height: auto`가 눌림을 막습니다. 근거 없이 방어 클래스를 늘리지 않습니다.

### API

| prop        | 필수 | 기본값       | 비고                      |
| ----------- | ---- | ------------ | ------------------------- |
| `label`     | ✅   | —            | 라벨                      |
| `value`     | ✅   | —            | 값                        |
| `layout`    |      | `horizontal` | 2종                       |
| `className` |      | —            | 담는 쪽의 폭·여백 보정용  |

### 디자인 확인 필요

| 항목                | 내용                                                                                               |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| 긴 문구 우선순위    | `horizontal`에서 라벨·값이 둘 다 길면 양쪽 다 줄바꿈됩니다. 어느 쪽을 줄이고 어느 쪽을 지킬지 미정 |
| `value`의 타입      | 현재 문자열 전용입니다. 뱃지·링크 같은 요소가 값 자리에 들어갈 계획이 있는지                       |

### Storybook

`apps/storybook/src/stories/biz-ui/InfoField.stories.tsx`, `meta.title`은 `core/biz-ui/Info/InfoField`. 스토리 3종 (`Default` · `Layouts` · `LongText`). 실제 폭이 fill이라 데코레이터로 문서 프레임과 같은 `w-[304px]`을 걸어 `horizontal`의 `justify-between` 배치를 봅니다. `LongText`는 긴 값이 행 높이로 흡수되는 것을 확인하는 용도이고 한글 문구만 깝니다. **끊길 곳 없는 문자열(이메일 · URL)은 스토리에 두지 않습니다** — 그 방어는 `break-all`이 맡고 위 「결정」에 실측이 남아 있는데, 스토리에 넣으려면 이메일 형태의 더미 값을 화면에 노출해야 해서 뺐습니다. **한글은 글자마다 줄바꿈 기회가 있어 가드가 있으나 없으나 통과하므로, 이 스토리로는 `break-all`이 검증되지 않는다는 점만 유의합니다.**

---

## InfoItem

Figma: 컴포넌트 세트 `199:841`. 심볼은 `199:840`(gray) · `199:839`(primary)입니다.

인포 아이콘과 안내 문구 한 줄을 그리는 표시 전용 컴포넌트입니다. 상태 축이 없어 `<p>` + `Icon` + `Typography`로 렌더합니다.

### Variant 축

| 축      | 값                  |
| ------- | ------------------- |
| `theme` | `gray` · `primary`  |

기본값은 **Figma 세트의 기본 variant**를 따라 `gray`입니다 — 노드 ID는 `199:839`(primary)가 `199:840`(gray)보다 앞이라 「첫 심볼」로는 설명되지 않고, 세트 기본값이 gray인 것은 codegen이 `theme = "gray"`로 내보내는 것으로 확인했습니다. biz-ui의 다른 `theme` 축(`Badge` · `IconCircle`)이 `primary` 기본인 것과 갈리는 유일한 사례입니다.

### 실측 스펙

| 항목     | 값                                            |
| -------- | --------------------------------------------- |
| 루트     | `flex-h-stack` · gap 4px · 심볼 275×23        |
| 아이콘   | `info` · weight `fill` · 16px                 |
| 문구     | `body` (Medium 16px / lh 1.45 / ls -0.48px)   |

| `theme`   | 아이콘     | 문구       |
| --------- | ---------- | ---------- |
| `gray`    | `gray/300` | `gray/600` |
| `primary` | `blue/200` | `blue/600` |

**아이콘과 문구의 색이 다릅니다.** 그래서 컨테이너의 `text-*`를 상속시키는 방식(`IconCircle` · `Divider`)을 쓸 수 없고 `INFO_ITEM_STYLES`가 `ICON`(클래스)과 `LABEL`(`ColorVariants`)을 따로 들고 갑니다 — `Badge`의 `CONTAINER`/`LABEL`과 같은 형태입니다.

바인딩된 hex가 기존 토큰과 전부 일치해 신규 토큰이 없습니다.

### 결정

- **아이콘 weight는 `fill`입니다.** Figma가 SVG로 내보내 표기가 없어 **경로 구조로 판정했습니다** — 서브패스가 3개(바깥 원 · 「i」의 점 · 「i」의 몸통)인데, Phosphor `regular`였다면 두 번째가 점이 아니라 동심원 링(`Zm0,192a88,88`)이어야 합니다. 렌더에서도 폰트가 `Phosphor-Fill`로 잡히는 것을 확인했습니다. `Icon` 기본값이 `bold`라 **이 컴포넌트는 `weight`를 명시해서 넘깁니다.**
- **Figma의 `h-[23px]` 아이콘 래퍼를 별도 요소로 만들지 않고 `Icon`에 직접 걸었습니다.** 래퍼(`199:845`)는 16px 아이콘을 23px 행에 세로 중앙 정렬하려고 둔 것이고, `Icon`이 이미 `flex-h-stack-center`라 `h-[23px] w-[16px]`만 주면 같은 결과입니다. **`23px`은 Figma 심볼 높이인 동시에 `body` 토큰의 행높이(`1rem × 1.45 = 23.2`)에서 나온 종속값입니다** — `--text-body`가 바뀌면 이 값도 같이 바뀌어야 하는데 어긋나도 경고 없이 아이콘만 반 픽셀씩 밀립니다. `Divider`의 `h-[20px]`은 컨테이너 실측치라 이 종속이 없습니다.
- **루트를 `items-center`가 아니라 `items-start`로 했습니다.** Figma는 `items-center`인데 **심볼 문구가 nowrap 단일 행이라 두 값의 차이가 드러나지 않습니다.** 단일 행에서는 결과가 같고(아이콘 세로중심 11.5 vs 문구 첫 줄 중심 11.6), 문구가 접히면 `items-center`는 아이콘을 전체 블록 한가운데로 띄우는 반면 `items-start`는 첫 줄에 붙여 둡니다. 모바일 WebView라 안내 문구가 접히는 것이 기본값에 가까워 후자를 골랐습니다. 위의 `h-[23px]`이 실제로 일하는 것도 이 조합에서입니다.
- **아이콘을 prop으로 열지 않습니다.** 두 심볼 모두 `info`로 고정입니다(`INFO_ITEM_ICON_KEY`). 다른 아이콘이 필요해지면 그때 엽니다.
- **`aria-hidden`이고 의미는 문구가 집니다.** `IconCircle`과 같은 전제입니다 — [icon-circle.md](./icon-circle.md) 「결정」.
- **아이콘에 `shrink-0`을 겁니다.** 문구가 길면 행 플렉스에서 16px 아이콘이 찌그러집니다. `IconCircle` · `Divider`와 같은 이유입니다.
- **문구에 `min-w-0 break-all`을 겁니다** (`INFO_ITEM_LABEL_STYLE`). 아이콘이 `shrink-0`이라 문구가 유일하게 줄어드는 아이템인데, 기본 `min-width: auto`(= min-content) 때문에 **끊길 곳 없는 토큰이 섞이면 축소되지 않습니다.** 폭 275px에서 실측한 값입니다.

  | 문구 | 없음 | `min-w-0` | `min-w-0 break-all` |
  | --- | --- | --- | --- |
  | 순수 한글 | 0 | 0 | 0 |
  | URL 섞임 (`/`·`.`로 끊김) | 박스 4.3px 넘침 | 글자 4px 넘침 | 0 |
  | 안 끊기는 40자 토큰 | 박스 108px 넘침 | 글자 108px 넘침 | 0 |

  **`min-w-0`만으로는 박스만 줄고 글자는 그대로 넘칩니다** — 박스 폭만 재면 0으로 보여서 놓치기 쉽고, `scrollWidth`로 잉크를 재야 드러납니다. `label`이 산문이라 `break-all`이 영어 단어를 중간에 자르는 것은 감수합니다. 대안인 `break-words`는 이 빌드에 클래스가 없어 후보가 아닙니다(위 InfoField 「결정」).
- **루트가 `<div>`가 아니라 `<p>`입니다.** 같은 패키지의 `InputMessage`가 「아이콘 + 안내 문구」 한 줄을 `<p>`로 감싸는 선례를 그대로 따랐습니다(`Input/shared/InputMessage.tsx`). `label`이 값이 아니라 문장이라 문단이 맞고, 자식이 인라인 span 둘뿐이라 `<p>` 안에 들어가도 유효합니다. `InfoField`가 `<div>`인 것과 갈리는데, 그쪽은 라벨-값 **쌍**이라 문단이 아닙니다.
- **폭을 선언하지 않고 `w-full`입니다.** 심볼 275px은 문구 길이에 따른 hug 값이라 그대로 쓸 수 없습니다. `w-full`을 컴포넌트가 들고 가는 이유는 **부모가 행 플렉스일 때도 문구 폭이 hug로 줄지 않게** 하기 위해서입니다 — 부모가 블록이면 있으나 없으나 같습니다.

### API

| prop        | 필수 | 기본값 | 비고                     |
| ----------- | ---- | ------ | ------------------------ |
| `label`     | ✅   | —      | 안내 문구                |
| `theme`     |      | `gray` | 2종                      |
| `className` |      | —      | 담는 쪽의 폭·여백 보정용 |

### 디자인 확인 필요

| 항목             | 내용                                                                                          |
| ---------------- | --------------------------------------------------------------------------------------------- |
| 접혔을 때 정렬   | 심볼이 단일 행이라 정의가 없습니다. 구현은 아이콘을 첫 줄에 고정했습니다 (위 「결정」)         |
| 아이콘 고정 여부 | 지금은 `info` 하나입니다. 경고·완료 같은 다른 아이콘이 필요한 자리가 생길지                   |

### Storybook

`apps/storybook/src/stories/biz-ui/InfoItem.stories.tsx`, `meta.title`은 `core/biz-ui/Info/InfoItem`. 스토리 3종 (`Default` · `Themes` · `LongText`). 데코레이터로 문서 프레임과 같은 `w-[275px]`을 겁니다. `LongText`는 **문구가 3줄로 접혀도 아이콘이 첫 줄에 남는지**를 봅니다 — 위 `items-start` 결정이 눈으로 확인되는 유일한 자리입니다.

**`break-all`은 이 스토리로 검증되지 않습니다.** 문구가 한글이라 가드가 있으나 없으나 접힙니다. InfoField와 같은 이유로 끊길 곳 없는 더미 문자열을 스토리에 두지 않았고, 실측은 위 「결정」의 표에 남겼습니다.
