# Divider 구현 기록

`apps/biz-ui/src/components/Divider` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 Divider 고유 사실만 둡니다.

Figma: [Info 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=177-520&m=dev) (`177:520`). 실제 값은 컴포넌트 세트 `179:1226`에서 실측했습니다.

## 구현 현황

| 컴포넌트  | 티켓       | 설명                                              |
| --------- | ---------- | ------------------------------------------------- |
| `Divider` | DOTOLI-235 | `type` 4종. 상태 축 없음. 선행·후속 의존 없음    |

## Variant 축

| 축     | 값                                |
| ------ | --------------------------------- |
| `type` | `up` · `down` · `text` · `line`   |

심볼은 `179:1227`(up) · `179:1231`(down) · `179:1235`(text) · `474:1168`(line)입니다. 기본값은 Figma 세트의 첫 심볼을 따라 `up`입니다.

## 실측 스펙

| 항목      | 값                                            |
| --------- | --------------------------------------------- |
| 컨테이너  | `flex-h-stack-center` · `h-[20px]` · gap 6px  |
| 선        | 1px (`h-px`)                                  |
| 캐럿      | 16px · `caret-double-up` / `caret-double-down` · weight `bold` |
| 텍스트    | `label` (Medium 14px / lh 1.45 / ls -0.42px)  |
| 폭        | 문서 프레임 340px. 실제로는 fill              |

| `type`  | 가운데       | 선 색      |
| ------- | ------------ | ---------- |
| `up`    | 캐럿 ↑       | `gray/300` |
| `down`  | 캐럿 ↓       | `gray/300` |
| `text`  | 문구         | `gray/300` |
| `line`  | 없음         | `gray/100` |

캐럿과 문구도 `gray/300`이라 `line`을 뺀 3종은 전부 한 가지 색입니다. 340px에서 `up`·`down`은 선이 156px씩(156 + 6 + 16 + 6 + 156 = 340), `text`는 문구 폭만큼 줄어 109.5px씩입니다.

Storybook 렌더의 계산값으로 4종을 대조했고 박스·gap·선 색·타이포가 전부 일치합니다. `up`·`down`은 선 156px · 캐럿 16×16으로 정확히 맞고, `text`만 선이 실측 109.5 대 렌더 109.77로 0.27px씩 어긋나는데 가운데 문구 폭이 Figma 108 대 브라우저 108.47로 다른 폰트 메트릭 차이가 양쪽에 반씩 나뉜 것입니다.

**캐럿 weight는 `bold`입니다.** Figma 심볼에 표기가 없어 내보낸 SVG의 기하로 판정했습니다 — 경로의 라운드 캡 반지름이 아트워크 폭 대비 `0.7513 / 11.5039`인데, Phosphor Regular를 같은 방식으로 정규화하면 `0.523 / 11.5039`, Bold는 `0.750 / 11.5039`입니다. `Icon`의 기본값이 `bold`라 넘기지 않아도 맞지만, **기본값에 기대고 있다는 사실 자체가 실측 결과**라 여기 적어 둡니다.

## 결정

- **`line`만 선 색이 다른 것은 Figma 실측 그대로입니다.** `gray/100`(`#f0f2f7`)이고 나머지 3종은 `gray/300`(`#ced4e0`)입니다. SVG 에셋의 `stroke` 값으로 직접 확인했습니다. 의도는 확인이 필요하지만(아래 「디자인 확인 필요」), 값이 명확해서 그대로 옮겼습니다.
- **`type`을 union 4종으로 받고 값 유무로 파생시키지 않았습니다.** 계열 선례는 값 유무 파생이지만(`OrderBox`의 `items` · `OrderDateInfo`의 `deliveryInfo` · `OrderInputCard`의 `dateLabel`), **`up`과 `down`은 어떤 값으로도 구분되지 않습니다.** 방향 축이 이미 prop을 요구하므로 거기에 `text`·`line`만 파생 규칙으로 끼워 넣으면 한 컴포넌트 안에 판정 방식이 두 개가 됩니다. `OrderInputCard`가 `orderStatus` 4종을 그대로 받은 것과 같은 판단입니다.
- **`label`은 `type='text'`일 때만 읽습니다.** 다른 `type`에 넘겨도 그리지 않습니다 — `OrderInputCard`의 `items`가 `completed` 전용인 것과 같은 처리입니다. 반대로 `type='text'`인데 `label`이 없으면 선 두 개와 6px 간격만 남습니다. **타입으로 막지 않은 것은 biz-ui `Badge`의 선례를 따른 것입니다** — internal-ui `Badge`는 `BadgeProps<T> = T extends BadgeStatusVariant ? … : … & Partial<Pick<IconProps,'iconKey'>>`로 조건부 props를 쓰는데, 그 대가로 컴포넌트 안에서 `props as BadgeFilledIconKeyProps` 캐스팅을 합니다. biz-ui Badge는 이걸 걷어내고 플랫 props로 갔고 여기도 같습니다. 빈 결과는 화면에서 바로 보입니다.
- **긴 `label`은 줄바꿈이 아니라 말줄임입니다.** `min-w-0 truncate`를 겁니다. `h-[20px]` 고정이라 줄바꿈되면 문구가 박스 밖으로 흘러나오고 양옆 선이 무너집니다. `INPUT_FIELD_LABEL`(`min-w-0 truncate`) · `TEXTAREA_LABEL_STYLE`(`block truncate`)과 같은 처리입니다. 실제로 340px에서 넘치는 문구를 넣으면 **행은 340×20을 유지한 채 말줄임**되고, 극단적으로 길면 `flex-1` 선이 0으로 밀립니다 — 선이 사라지는 쪽이 행이 무너지는 쪽보다 낫다고 봤습니다. `QuantityStepper` 상품명을 줄바꿈되게 둔 것과 갈리는데, 거기는 가운데 정렬된 2줄이 허용되는 자리고 여기는 높이가 20px로 고정입니다.
- **루트에 `shrink-0`을 겁니다.** Divider는 `flex-v-stack` 카드 안에 놓이는 게 기본 용법인데, 내용 없는 `h-px` 박스는 컬럼 플렉스에서 `flex-shrink: 1` 때문에 **선이 통째로 사라질 수 있습니다.** `DialogOverlayFormDivider`(internal-ui)가 정확히 `h-0.5 w-full shrink-0`으로 이걸 막고 있고, `IconCircle`도 같은 이유로 `shrink-0`을 답니다. 가운데 두 선(`DIVIDER_SEGMENT_LINE_STYLE`)은 행 플렉스의 교차축이라 필요 없습니다.
- **캐럿 아이콘 박스를 `size-[16px]`로 고정합니다.** `Icon`은 글리프를 `::before`로 그려서 span 폭이 **웹폰트 로드 상태를 탑니다** — 폰트가 자리잡은 뒤에는 16px(1em)이라 이 클래스가 없어도 결과가 같지만, 로드 중에 13.84px로 잡히는 것을 실측했고 그동안 양옆 선이 156 → 157.08px로 늘어납니다. `IconButton`·`IconCircle`은 컨테이너가 크기를 따로 들고 있어 드러나지 않는데, **여기서는 아이콘 박스가 곧 선 길이를 정해서** 로딩 중 선이 출렁입니다. 모바일 WebView 타깃이라 고정해 둡니다.
- **`line`은 컨테이너 없이 선 하나만 렌더합니다.** 심볼 `474:1168`이 높이 0이라 20px 컨테이너에 담으면 Figma에 없는 위아래 여백이 생깁니다. 그래서 `type='line'`만 별도 분기로 빠져 `h-px w-full`을 직접 그리고, 나머지 3종만 `DIVIDER_CONTAINER_STYLE`을 씁니다.
- **선을 `border`가 아니라 `h-px` + `bg-*`로 그립니다.** CLAUDE.md [스타일 규칙]의 `inset-ring`은 **요소를 둘러싸는 테두리**가 박스를 키우는 문제를 다루는 것이고, 여기 선은 테두리가 아니라 그 자체가 요소입니다. internal-ui의 `DialogOverlayFormDivider`도 `<div className='bg-in-gray-01 h-0.5 w-full shrink-0' />`로 같은 방식입니다.
- **`role='separator'`를 붙이지 않았습니다.** 처음엔 `line`에만 달았다가 걷어냈습니다. `line`은 순수 장식이라 아무 role이 없는 `<div>`가 이미 보조기기에서 무시되는 올바른 결과이고, `text`는 반대로 **가운데 문구가 실제 콘텐츠**라 `separator`로 감싸면 그 텍스트가 죽습니다. 한쪽에만 붙이면 같은 컴포넌트가 `type`에 따라 시맨틱이 갈립니다. internal-ui도 구분선에 role을 두지 않습니다.
- **캐럿은 비인터랙티브입니다.** Figma에 상태 축(hover·pressed)이 없고 버튼 심볼도 아닙니다. 접기/펴기 트리거로 쓰려면 담는 쪽이 감쌉니다 — 확인 대상으로 남겼습니다.
- **폭을 선언하지 않고 `w-full`입니다.** 340px은 문서 값입니다 — `QuantityStepper` · `OrderInputCard`와 같습니다.

## API

| prop        | 필수 | 기본값 | 비고                                        |
| ----------- | ---- | ------ | ------------------------------------------- |
| `type`      |      | `up`   | 4종                                         |
| `label`     |      | —      | `type='text'`일 때만 읽음                   |
| `className` |      | —      | 담는 쪽의 폭·여백 보정용                    |

## 디자인 확인 필요

| 항목                | 내용                                                                                                       |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| `line`의 색         | 혼자 `gray/100`이라 3종보다 옅습니다. 주석 `474:1105`의 「\*일괄 순수 구분선」이 이 차이를 뜻하는지          |
| `line`이 같은 세트인지 | `474:1168`은 ID 대역이 크게 떨어져 있고 · 높이 0 · 혼자 다른 색 · 컨테이너도 없습니다. 세트 밖 별도 컴포넌트라면 `type`의 4번째 값이 아니라 별도 export가 맞습니다 |
| `up` · `down`의 역할 | 접기/펴기 트리거인지. 그렇다면 hover·pressed 상태 정의가 필요합니다                                        |
| 기본값              | Figma 세트 기본이 `up`이라 따랐지만, 단독 호출 `<Divider />`는 `line`이 자연스러울 수 있습니다              |

## Storybook

`apps/storybook/src/stories/biz-ui/Divider.stories.tsx`, `meta.title`은 `core/biz-ui/Divider`. 스토리 2종 (`Default` · `Types`). 실제 폭이 fill이라 데코레이터로 문서 프레임과 같은 `w-[340px]`을 걸어 선 길이를 대조합니다. `Types`는 4종을 세로로 쌓아 `line`의 옅은 색이 나머지와 나란히 보이게 합니다.

`label` 컨트롤에는 `if: { arg: 'type', eq: 'text' }`를 걸어 다른 `type`에서는 감춥니다 — 만져도 아무 반응이 없으면 고장으로 읽히기 때문입니다. **`if`는 컨트롤만 감추는 게 아니라 조건이 어긋나면 arg를 통째로 지웁니다.** `type`을 전부 도는 `Types`는 `type` arg가 없어 조건이 항상 거짓이 되므로 문구가 사라졌고, 그래서 `Types`만 arg 대신 파일 안의 `SAMPLE_LABEL`을 직접 넘깁니다(`controls`를 이미 끈 스토리라 잃는 것이 없습니다).
