# PageBody 구현 기록

`apps/biz-ui/src/components/PageBody` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 `PageBody` 고유 사실만 둡니다.

Figma: `component` 페이지의 심볼 7개입니다. 컴포넌트 세트가 아니라 **낱개 심볼이 격자로 놓여 있습니다.**

| 심볼 | node |
| --- | --- |
| `stickyTopBody`    | [`159:1060`](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=159-1060&m=dev) |
| `topBody`          | [`159:1059`](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=159-1059&m=dev) |
| `grayTopBody`      | [`159:1058`](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=159-1058&m=dev) |
| `middleBody`       | [`159:1055`](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=159-1055&m=dev) |
| `grayMiddleBody`   | [`159:1057`](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=159-1057&m=dev) |
| `bordermiddleBody` | [`159:1056`](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=159-1056&m=dev) |
| `footerBody`       | [`159:1061`](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=159-1061&m=dev) |

**심볼 안의 `content`(`146:505`)는 340 × 60 빈 프레임입니다.** 슬롯 샘플이라 스펙이 아닙니다 — [`BottomSheet`](./bottom-sheet.md)가 「200은 슬롯 샘플(`middleBody`)의 크기라 스펙이 아닙니다」로 이미 같은 판단을 했습니다.

## 구현 현황

| 컴포넌트 | 티켓 | 설명 |
| --- | --- | --- |
| `PageBody` | DOTOLI-289 | `variant` 7종. 페이지 세로 구획의 배경 · 패딩만 담는 래퍼 |

**이 계열은 페이지를 세로로 쌓는 구획입니다.** 화면 하나가 `stickyTop` → `top` → `middle`… → `footer` 순으로 이어지고, 안쪽 콘텐츠는 전부 소비 앱이 넣습니다.

## Variant 축

Figma 심볼명을 그대로 따르되 `bordermiddleBody`의 오타만 바로잡았습니다(`borderMiddle`). `OrderBoxSell` → `OrderBoxCell`, `Fillter` → `Filter`와 같은 처리입니다.

|            | default      | gray           | border          |
| ---------- | ------------ | -------------- | --------------- |
| sticky top | `stickyTop`  | —              | —               |
| top        | `top`        | `grayTop`      | —               |
| middle     | `middle`     | `grayMiddle`   | `borderMiddle`  |
| footer     | —            | `footer`       | —               |

**12조합 중 7개만 심볼이 있습니다.**

## 실측 스펙

`px`는 7종 전부 20입니다. 갈리는 것은 배경 · 위아래 패딩 · `gap` · 테두리입니다.

| variant        | 배경        | `pt` | `pb` | `gap` | 그 외                   |
| -------------- | ----------- | ---- | ---- | ----- | ----------------------- |
| `stickyTop`    | `white`     | 8    | 12   | **—** | `sticky top-0 z-10`     |
| `top`          | `white`     | 36   | 28   | 24    |                         |
| `grayTop`      | `gray/100`  | 36   | 28   | 24    |                         |
| `middle`       | `white`     | 28   | 28   | 24    |                         |
| `grayMiddle`   | `gray/100`  | 28   | 28   | 24    |                         |
| `borderMiddle` | `white`     | 28   | 28   | 24    | `border-t-8` `gray/100` |
| `footer`       | `gray/100`  | 28   | 28   | **—** |                         |

**`gap`이 비어 있는 둘은 심볼에 `content`가 하나뿐이라 정의되지 않은 것**입니다(아래 「결정」).

심볼 높이가 값을 검산해 줍니다 — `middleBody` 200 = `28 + 60 + 24 + 60 + 28`, `topBody` 208 = `36 + 60 + 24 + 60 + 28`, `stickyTopBody` 80 = `8 + 60 + 12`, `footerBody` 116 = `28 + 60 + 28`.

## 결정

- **단일 컴포넌트 + `variant` 하나로 갑니다.** 위 표처럼 「위치 × 톤」 두 축으로 쪼갤 수는 있지만, **12조합 중 5개가 심볼이 없습니다.** 두 축으로 열면 `grayFooter` · `borderTop` 같은 조합의 생김새를 구현이 지어내게 됩니다 — [`OrderBox`](./order.md)가 「variant별로 빈 상태를 따로 정의하면 심볼에 없는 조합의 생김새를 구현이 임의로 정하게 됩니다」로 같은 판단을 했고, 거기도 `noBg`·`default`·`past`를 배경 축 하나로 뒀습니다. 조합이 실제로 필요해지면 값을 하나 더합니다.

- **`sticky`를 DS가 겁니다 — [`InfoBanner`](./info.md)의 `isSticky`와 갈립니다.** 그쪽은 「모양 축이지 배치 축이 아니다」로 `position`을 걸지 않는데, 근거가 **전환 임계값이 [미확정]이라 DS가 알 수 없다**는 것이었습니다. 여기는 다릅니다 — **임계값이 필요 없습니다.** 스크롤 컨테이너 상단에 닿을 때까지 흐르다 거기서 멈추는 것이 CSS 기본 동작이라, 「언제 전환되는가」를 DS가 알 필요가 없습니다. 심볼 이름이 `stickyTopBody`라 **의도도 명시**돼 있고, 선례가 셋입니다 — [`StickyCalendar`](./calendar.md)(`sticky top-0 z-10`), [`BottomActionBar`](./bottom-action-bar.md)(`floating` **variant에** `sticky bottom-0` — 변형 축이 곧 배치라는 점에서 `PageBody`와 구조가 가장 같습니다), internal-ui `TableHead`(`sticky top-0`).

  **다만 `top-0`은 가정입니다 — 「소비 앱 정보가 하나도 필요 없다」까지는 아닙니다.** 자기 스크롤 컨테이너에서 **최상단에 pin되는 유일한 요소**일 때만 참입니다. `StickyCalendar`도 `top-0`이고 `HeaderBar`는 `w-full`로만 나가 소비 앱이 흔히 `sticky top-0`을 얹으므로, **둘 중 하나와 같은 화면에 놓이면 같은 지점에 겹칩니다.** 그 경우의 `top` 오프셋은 소비 앱 몫이고 아래 「디자인 확인 필요」에 올렸습니다.

  **`z-10`이 함께 갑니다 — 다만 「뒤 구획이 덮으니까」는 아닙니다.** sticky는 positioned 요소라 `z-index: auto`여도 **뒤따르는 비positioned 형제의 배경보다는 위에** 칠해집니다. 실제로 이기는 것은 **뒤 구획 안의 positioned 자손**이고, biz-ui는 그 상황을 스스로 만듭니다 — 히트 영역 확장이 `position: relative`를 요구하므로([CLAUDE.md](../../../apps/biz-ui/CLAUDE.md) 「히트 영역 확장」) 아래쪽 `PageBody` 안의 `Chip` · `Checkbox` 한 줄이 그대로 sticky 위로 올라옵니다.

  **스크롤 컨테이너는 소비 앱이 만듭니다.** DS는 붙는 방식만 정하고 무엇에 대해 붙는지는 페이지 구조라 관여하지 않습니다.

- **`borderMiddle`의 8px 띠는 `border-t-8`입니다.** 구획을 가르는 선이라 `inset-ring`이 아닌 쪽이고, 기준은 [CLAUDE.md](../../../apps/biz-ui/CLAUDE.md) 「스타일 규칙」의 표에 있습니다. **실측이 그 판단을 뒷받침합니다** — `bordermiddleBody` 208 vs `middleBody` 200으로 Figma 쪽이 정확히 8px 크고, `inset-ring`으로 그리면 띠가 콘텐츠 위에 겹쳐 그 8px이 사라집니다.

- **`w-full`입니다.** 심볼 380은 모바일 화면 폭이라 고정하지 않습니다 — [`BottomActionBar`](./bottom-action-bar.md) · [`OrderBox`](./order.md)와 같은 처리입니다.

- **`items-start`를 옮기지 않았습니다.** Figma 오토레이아웃이 `items-start`인데 **자식 `content`가 340(= 380 - 20 × 2)으로 이미 안쪽 폭 전체**입니다. 즉 렌더 결과는 늘어난 것과 같고, `items-start`를 그대로 옮기면 **소비자 콘텐츠가 내용 너비로 쪼그라듭니다.** flex 기본값 `stretch`가 심볼의 실제 모양을 재현합니다.

- **`overflow-clip`을 옮기지 않았습니다.** Figma 프레임의 「Clip content」에서 나온 값인데, 구획 안에 소비자가 **자기 sticky 요소를 넣으면 그 클리핑이 가둬 버립니다.** 잘라야 할 콘텐츠는 DS가 아니라 소비 앱 것이고, 필요하면 `className`으로 겁니다.

- **`gap: 24`는 심볼이 정한 5종에만 겁니다 — `stickyTop` · `footer`에는 없습니다.** 그 둘은 `content`가 하나뿐이라 **Figma가 gap을 내보내지 않았습니다.** 값이 0이라는 뜻은 아니고 **정해진 적이 없다**는 뜻이라, 없는 값을 채우지 않고 비워 뒀습니다.

  **[`BottomActionBar`](./bottom-action-bar.md)의 「`gap`을 조건 없이 겁니다」를 따라가지 않았습니다.** 그쪽은 자식 수를 **DS가 정해서**(`single`이면 버튼 하나) gap이 렌더에 드러날 수 없지만, 여기 자식은 **소비 앱이 넣습니다.** `stickyTop`에 둘을 넣으면 DS가 정한 적 없는 24가 그대로 보이고, **소비처는 그것을 확정된 스펙으로 읽습니다.** 축이 같아 보여도 「드러날 수 없는 값」과 「드러나는데 근거가 없는 값」은 다릅니다.

  덕분에 `PAGE_BODY_BASE_STYLE`에는 **7종이 전부 공유하는 것만** 남았습니다. 스토리도 심볼과 같게 두 종은 슬롯을 하나만 그립니다.

- **`shrink-0`은 7종 공통입니다.** 세로 flex 스크롤 컨테이너에서 기본값 `flex-shrink: 1`이면 콘텐츠가 넘칠 때 구획이 찌그러지는데, 이는 `stickyTop`만의 문제가 아닙니다. 지금 나머지를 지켜 주는 것은 **`overflow`를 지정하지 않아 살아 있는 flex 자동 최소 크기**(`min-height: auto`)인데, 소비자가 `className='overflow-hidden'`을 거는 순간 사라집니다. [`BottomTab`](./bottom-tab.md)도 조건 없이 답니다.

- **랜드마크를 만들지 않고 `<div>`입니다.** `<section>`은 접근성 이름이 없으면 랜드마크로서 의미가 없고, 이름은 안에 들어갈 제목에서 나와야 하는데 그건 소비 앱 것입니다. [`BottomActionBar`](./bottom-action-bar.md)가 `<footer>`·`role='toolbar'`를 피한 것과 같은 기준입니다.

## API

| prop        | 필수 | 기본값     | 비고                                      |
| ----------- | ---- | ---------- | ----------------------------------------- |
| `variant`   |      | `'middle'` | 7종                                        |
| `className` |      | —          | 컨테이너에 적용. **배치는 이 통로로 소비자가 함** |

```tsx
// 페이지 조립 — 스크롤 컨테이너는 소비 앱이 만듭니다
<div className='scroll-y flex-v-stack h-dvh'>
  <PageBody variant={PAGE_BODY_VARIANTS.STICKY_TOP}>{filter}</PageBody>
  <PageBody variant={PAGE_BODY_VARIANTS.TOP}>{summary}</PageBody>
  <PageBody variant={PAGE_BODY_VARIANTS.BORDER_MIDDLE}>{orders}</PageBody>
  <PageBody variant={PAGE_BODY_VARIANTS.FOOTER}>{notice}</PageBody>
</div>
```

## 디자인 확인 필요

| 항목 | 내용 |
| --- | --- |
| `footer` ↔ `grayMiddle` | **두 심볼의 박스 스펙이 완전히 같습니다**(`gray/100` · `py-28` · `px-20`). 이름만 다르고 구현이 한 줄도 갈리지 않습니다. `footer`가 남은 높이를 채워야 하는 것인지(그래야 페이지 끝까지 회색이 이어짐), 아니면 심볼이 중복인지 |
| `stickyTop`의 pin 지점 · `z-index` | **자기 스크롤 컨테이너의 최상단에 pin되는 유일한 요소**라고 가정했습니다(`top-0`). `StickyCalendar`나 소비 앱이 얹은 `sticky` `HeaderBar`와 같은 화면에 놓이면 겹치고, 그때 `top` 오프셋은 소비 앱이 `className`으로 정해야 합니다. `z-index`도 지정된 값이 없어 `StickyCalendar`와 같은 `z-10`을 썼습니다 |
| `stickyTop` 고정 시 하단 경계 | pin된 상태에서 스크롤 콘텐츠가 흰 구획 아래로 **아무 구분 없이** 지나갑니다. `StickyCalendar`도 그림자·선이 없어 일관되긴 하지만, 낱개 심볼로는 「붙었을 때」의 모양이 정의될 수 없는 값입니다 |
| `stickyTop` · `footer`의 gap | 두 심볼은 `content`가 하나뿐이라 **gap이 정해진 적이 없어** 비워 뒀습니다. 소비 앱이 자식을 둘 넣으면 **붙어서 렌더**됩니다. 나머지 5종처럼 24인지, 다른 값인지 확인 필요 |
| 조합 5개 | `grayFooter` · `borderTop` 등 심볼이 없는 조합이 실제로 안 쓰이는지 |
| 구획 사이 간격 | 심볼이 낱개로 놓여 있어 **구획끼리 이어 붙일 때의 간격**이 정의돼 있지 않습니다. 지금은 서로 붙습니다(`borderMiddle`만 8px 띠로 갈림) |

## Storybook

`apps/storybook/src/stories/biz-ui/PageBody.stories.tsx`, `meta.title`은 `core/biz-ui/PageBody`.

| 스토리     | 보는 것                                                        |
| ---------- | -------------------------------------------------------------- |
| `Default`  | 컨트롤로 `variant`를 바꿔 본다                                  |
| `Variants` | 7종을 나란히 — 배경 · 패딩 · `borderMiddle`의 8px 띠가 갈리는 자리 |
| `Page`     | 스크롤 컨테이너 안에서 **`stickyTop`이 실제로 상단에 붙는 자리** |

콘텐츠는 소비 앱 것이라 스토리에서만 `bg-blue-100` 슬롯으로 대신합니다. 폭은 실제로 fill이지만 스토리에서만 `w-[380px]`을 걸어 심볼과 같은 프레임으로 봅니다.
