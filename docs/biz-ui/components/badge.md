# Badge 구현 기록

`apps/biz-ui/src/components/Badge` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 Badge 고유 사실만 둡니다.

Figma: [Badge](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=75-4714&m=dev) (`75:4714`) — 섹션. 실제 값은 컴포넌트 세트 `75:4728`에서 실측했습니다.

## 구현 현황

| 컴포넌트 | 티켓       | 설명                                                     |
| -------- | ---------- | -------------------------------------------------------- |
| `Badge`  | DOTOLI-228 | `theme` 5 × `variant` 2. 10조합 전수 실측. 상태 축 없음 |

Order 섹션(DOTOLI-229~233)보다 먼저 넣었습니다. OrderInputCard(DOTOLI-233)의 `inputClosed`가 `red`/`tonal` Badge를 인스턴스로 물고 있어서입니다.

## Variant 축

| 축        | 값                                                |
| --------- | ------------------------------------------------- |
| `theme`   | `primary` · `yellow` · `red` · `green` · `gray`   |
| `variant` | `tonal` · `filled`                                |

기본값은 Figma 세트의 첫 심볼(`218:947`)을 따라 `theme='primary'` · `variant='tonal'`입니다.

## 실측 스펙

| 항목    | 값                                              |
| ------- | ----------------------------------------------- |
| 크기    | 58 × 24 (내용에 따라 가변)                      |
| padding | `px-[8px] py-[3px]`                             |
| radius  | 6px → `rounded-6`                               |
| 라벨    | `caption` (SemiBold 12px / lh 1.5 / ls -0.12px) |
| 테두리  | `tonal`만 1px. `filled`는 없음                  |

`caption` 토큰은 `--text-caption: 0.75rem` / lh 1.5 / fw 600 / ls `-0.01em`이라 12px 기준 `-0.12px`으로 Figma와 정확히 맞습니다.

### 색 매트릭스

| `theme`   | tonal 배경  | tonal 테두리 | tonal 라벨   | filled 배경  | filled 라벨 |
| --------- | ----------- | ------------ | ------------ | ------------ | ----------- |
| `primary` | `blue/100`  | `blue/200`   | `blue/700`   | `blue/600`   | `white`     |
| `yellow`  | `yellow/50` | `yellow/100` | `yellow/800` | `yellow/600` | `white`     |
| `red`     | `red/50`    | `red/100`    | `red/700`    | `red/500`    | `white`     |
| `green`   | `green/50`  | `green/100`  | `green/700`  | `green/600`  | `white`     |
| `gray`    | `gray/100`  | `gray/200`   | `gray/800`   | `gray/600`   | `white`     |

**신규 토큰이 없습니다.** 10조합에 쓰인 색이 전부 기존 컬러 스케일과 hex까지 일치했습니다.

## 결정

- **스케일 단이 theme마다 달라 규칙으로 유도하지 않고 Record에 전부 박았습니다.** tonal 배경이 `primary`·`gray`만 `100`이고 나머지는 `50`, filled 배경이 `red`만 `500`이고 나머지는 `600`, tonal 라벨이 `yellow`·`gray`만 `800`입니다. "tonal은 배경 50 / 라벨 700" 같은 규칙을 만들면 세 군데가 어긋납니다.
- **`BADGE_STYLES`를 `variant` → `theme` 순으로 중첩했습니다.** CtaButton은 `theme` → `variant` 순인데 여기서만 뒤집은 이유는 두 가지입니다 — `variant`가 테두리 유무 자체를 가르고(`filled`는 테두리 클래스가 없음), internal-ui의 `BADGE_THEME_STYLES`도 같은 순서입니다.
- **`CONTAINER`/`LABEL`로 쪼개지 않고 조합당 문자열 하나로 뒀습니다.** 서브 컴포넌트가 없어 라벨 색을 루트에 걸면 그대로 상속됩니다. internal-ui는 `BadgeLabel`이 따로 있어 쪼갠 것이라 따라가지 않았습니다. CtaButton의 `'bg-blue-500 text-white'` 방식과 같습니다.
- **`<span>` + `inline-flex`입니다.** 상호작용 요소가 아니라 `hover`·`pressed`·`disabled`를 두지 않았습니다(Figma에도 상태 축이 없습니다). `flex-h-stack-center` 유틸은 `display: flex`라 블록 레벨이 되어 쓰지 않았습니다 — 뱃지는 텍스트 흐름 안에 놓일 수 있어야 합니다.
- **테두리를 `border`가 아니라 `inset-ring`으로 그립니다.** 처음엔 "두께가 상태별로 안 바뀌니 `border`로 충분하다"고 판단했는데 틀렸습니다. 문제는 두께 변화가 아니라 **`tonal`에만 테두리가 있다는 것**입니다 — `border`를 쓰면 `tonal`이 사방 1px씩 커져 24px이어야 할 높이가 26px이 되고, Storybook에서 `variant`를 토글할 때 레이아웃이 튑니다. Figma는 inside stroke라 두 variant가 모두 58×24입니다.

  | 방법                        | 레이아웃 시프트 | Figma 24px 재현 |
  | --------------------------- | --------------- | --------------- |
  | `border`                    | 있음            | ❌ tonal 26px   |
  | `filled`에 투명 `border`    | 없음            | ❌ 둘 다 26px   |
  | `box-sizing: content-box`   | 있음            | ❌              |
  | `inset-ring` (채택)         | 없음            | ✅              |

  `content-box`는 이 경우 무효입니다 — `box-sizing`은 `width`/`height`가 명시됐을 때만 의미가 있고, Badge처럼 내용에 맞춰 늘어나는 요소는 어느 쪽이든 바깥 크기가 `내용 + 패딩 + 테두리`로 같습니다. 범용 웹에서는 「투명 보더」가 가장 흔한 해법이지만, 그건 Figma 값(24px)을 못 맞춥니다.
- **`Badge/` 아래 폴더 승격 없이 평면 구조입니다.** 서브 컴포넌트도 계열도 없어 `Icon`·`Typography`·`Flex`와 같은 배치입니다. internal-ui는 `Badge/Badge` · `Badge/InfoBadge` · `Badge/shared`로 나뉘어 있지만 그건 뱃지가 2종이라서고, biz-ui Figma에는 1종뿐입니다.

## API

| prop      | 필수 | 기본값    | 비고                     |
| --------- | ---- | --------- | ------------------------ |
| `label`   | ✅   | —         | 표시 문구                |
| `theme`   |      | `primary` | 5종                      |
| `variant` |      | `tonal`   | 2종                      |
| `className` |    | —         | 소비처 레이아웃 보정용   |

## 디자인 확인 필요

| 항목             | 내용                                                                          |
| ---------------- | ----------------------------------------------------------------------------- |
| 아이콘 슬롯      | Figma에 라벨만 있습니다. internal-ui Badge는 아이콘을 받는데 biz-ui도 필요한지 |
| 최대 폭 / 말줄임 | 라벨이 길어질 때 규칙이 정의되어 있지 않습니다. 현재는 내용만큼 늘어납니다     |

## Storybook

`apps/storybook/src/stories/biz-ui/Badge.stories.tsx`, `meta.title`은 `core/biz-ui/Badge`. 스토리 2종 (`Default` · `Matrix`). `Matrix`는 Figma 문서 프레임과 같은 배치(행 = `variant`, 열 = `theme`)로 깔아 대조합니다.
