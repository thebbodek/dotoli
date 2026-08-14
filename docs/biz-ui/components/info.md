# Info 계열 구현 기록

`apps/biz-ui/src/components/Info` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 Info 계열 고유 사실만 둡니다.

Figma: [Info 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=177-520&m=dev) (`177:520`).

**섹션 이름은 Info지만 계열 폴더에는 이름이 `Info`로 시작하는 것만 넣습니다.** 같은 섹션의 `IconCircle` · `Divider` · `NotificationCard`는 Info 전용이 아니라 범용이라 단독 폴더입니다 — [icon-circle.md](./icon-circle.md) · [divider.md](./divider.md).

## 구현 현황

| 컴포넌트    | 티켓       | 설명                                          |
| ----------- | ---------- | --------------------------------------------- |
| `InfoField` | DOTOLI-236 | `layout` 2종. 라벨 + 값 2요소. 상태 축 없음  |

## 계열 공통 결정

- **`shared/`를 열지 않았습니다.** `InfoField`(라벨+값)와 `InfoItem`(아이콘+안내문구)은 겹치는 조각이 없습니다. Order 계열이 DOTOLI-233에서 실제 중복이 생긴 뒤에야 열었던 것과 같은 기준입니다.

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

  | 값 | 없음 | `min-w-0` | `min-w-0 break-all` | `min-w-0 break-words` |
  | --- | --- | --- | --- | --- |
  | horizontal | 101.8px 넘침 | 0 | 0 | 0 |
  | vertical | 204.5px 넘침 | 204.5px 넘침 | 0 | 204.5px 넘침 |

  **vertical에서는 `break-words`가 듣지 않습니다.** `overflow-wrap: break-word`는 min-content 계산에 영향을 주지 않아서, `items-start`로 hug된 자식의 fit-content가 여전히 전체 문자열 폭입니다. `word-break: break-all`이라야 min-content가 1글자로 떨어져 접힙니다. 그래서 두 레이아웃에 모두 듣는 `break-all`로 갔고, 영어 단어가 중간에 잘리는 것은 감수합니다 — 값이 ID·번호·주소 같은 데이터라 산문이 아닙니다. internal-ui도 `InputFeedback`·`SelectBaseFeedback`에서 `break-all`을 씁니다.

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
