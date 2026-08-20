# ConfirmModal 구현 기록

`apps/biz-ui/src/components/ConfirmModal` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 이 컴포넌트 고유 사실만 둡니다.

Figma: [ConfirmModal 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=75-4784&m=dev) (`75:4784`), 심볼 `337:3611`(btn=one) · `337:3612`(btn=two).

**비공개 껍데기 [`Overlay`](./overlay.md)의 첫 실물입니다.** DOTOLI-239가 딤 · 위치 · 스크롤 잠금까지 만들어 두고 소비자 진입점을 남겨 두지 않았는데, 그 진입점이 이번에 생겼습니다.

## 구현 현황

| 컴포넌트       | 티켓       | 설명                                        |
| -------------- | ---------- | ------------------------------------------- |
| `ConfirmModal` | DOTOLI-265 | `btn` 축을 `cancel` 유무로 파생. 단독 폴더  |

## Variant 축

| 축    | Figma 값        | 구현                    |
| ----- | --------------- | ----------------------- |
| `btn` | `one` · `two`   | **`cancel` 유무로 흡수** |

## 실측 스펙

| 항목      | 값                                                      |
| --------- | ------------------------------------------------------- |
| 카드      | `bg-white` · `rounded-16` · `w-[320px]` · `pt-[13px]`    |
| 텍스트 영역 | `px-[20px] pt-[24px] pb-[10px]` · `gap-[8px]` · 가운데 정렬 |
| 제목      | `heading-3-bold` (Bold 24 / lh 1.4 / ls -1%) · `gray/900`. 요소는 기본 `<p>` |
| 설명      | `body` (Medium 16 / lh 1.45 / ls -3%) · `gray/700`       |
| 버튼 영역 | `px-[20px] pt-[12px] pb-[18px]` · `gap-[8px]`             |
| 버튼      | 각 `flex-1 min-w-0`                                      |

**높이를 고정하지 않습니다.** 심볼은 227.98인데 같은 섹션의 다른 인스턴스(`337:3623`)는 **193.98**이고, 차이 34가 제목 한 행(24 × 1.4 = 33.6)과 맞습니다. 문구 길이가 높이를 정합니다.

`13 + (24 + 67.2 + 8 + 23.2 + 10) + (12 + 52 + 18) = 227.4`로 심볼 값이 자연 높이로 설명됩니다.

### `CtaButton`이 그대로 맞습니다 — 새로 그릴 것이 없습니다

`size='lg'`의 네 값이 Figma와 **전부 일치**합니다.

| 항목    | Figma            | `CTA_BUTTON_SIZE_STYLES.lg` |
| ------- | ---------------- | --------------------------- |
| 높이    | 52               | `h-[52px]`                  |
| padding | 30 / 12          | `px-[30px] py-[12px]`       |
| radius  | 8                | `rounded-8`                 |
| 타이포  | `body-bold`      | `text-body-bold`            |

| 자리        | Figma                        | `CtaButton`                          |
| ----------- | ---------------------------- | ------------------------------------ |
| 단일 · 우측 | `blue/500` + `base/white`    | `theme='primary'` `variant='filled'` |
| 좌측        | `gray/100` + `gray/800`      | `theme='gray'` `variant='tonal'`     |

바인딩된 hex가 기존 토큰과 전부 일치해 **신규 토큰이 없습니다.** [`StatusAlertBanner`](./status-alert-banner.md)가 크기 불일치로 맨 버튼을 그려야 했던 것과 갈리는 지점입니다.

## 결정

- **`btn` 축을 `cancel` 유무로 흡수했습니다.** `btn='two'`인데 두 번째 액션이 없으면 성립하지 않고, 액션만 주고 `btn`을 안 바꾸면 조용히 무시됩니다. 두 값이 항상 같이 움직여 축이 하나입니다 — [`InfoBanner`](./info.md)의 `useAction` → `onClick`, [`StatusAlertBanner`](./status-alert-banner.md)의 `useDismiss` → `onDismiss`와 같은 기준입니다.

- **`overlay-kit`을 peerDependency로 넣지 않았습니다.** [overlay.md](./overlay.md) 「후속 티켓 판단 기준」의 첫 번째 기준이 「biz-ui 컴포넌트가 **자기 안에서** 다른 오버레이를 여는가」인데, **ConfirmModal은 열지 않습니다.** 자기가 열림 상태를 들지도 않고 `isOpen`을 제어로 받습니다. 두 번째 기준(`await` 필요 여부)도 따라서 성립하지 않습니다. 「반반이면 안 넣는 쪽이 되돌리기 싸다」는 같은 문서의 판단을 따랐습니다.

- **ESC는 요구된 적이 없습니다 — 구현 판단으로 넣었습니다.** 출처를 분명히 해 둡니다.

  | 출처 | ESC |
  | --- | --- |
  | 정책 COM-008 | 「뒤로 · 물리 뒤로가기 · 닫기 · 배경 탭」 **4개뿐. ESC 없음** (모바일 WebView 타깃) |
  | Figma 주석 | 없음 |
  | `@bbodek/internal-ui` | 오버레이 계열에 **ESC 처리 0건** (`Overlay`가 스크롤 잠금만 씀) |

  즉 COM-008이 시킨 게 아니라, **그 「동일하게 처리」 원칙을 ESC까지 확장 적용**한 것입니다. 근거는 외장 키보드·데스크톱 접근에서 ESC가 다이얼로그의 표준 기대 동작이라는 것이고, 반대로 **모바일 WebView 단일 타깃에서는 거의 안 쓰이는 경로**라는 것도 같이 적어 둡니다. 빼기로 하면 `useEscapeCloseEffect`와 `data-overlay` 속성이 함께 사라집니다.

  **넣을 자리는 `ConfirmModal`이 아니라 `Overlay`입니다.** BottomSheet도 같은 동작이 필요하고, 배경 탭과 같은 `onClose`로 흘러야 COM-008의 「동일 처리」와 결이 맞습니다. 스크롤 잠금이 이미 `Overlay`에 있는 것과 같은 층입니다.

  **중첩 규칙은 ESC 위에 얹은 것이고, 이것도 요구된 적이 없습니다.** 다만 **ESC를 넣는 이상 선택지가 아닙니다** — 안 다루면 「바텀시트 위 이탈 ConfirmModal」에서 ESC 한 번에 둘 다 닫힙니다. 그 시나리오 자체는 COM-008의 이탈 모달 요구에서 나온 실제 경로입니다.

  **최상단 판정은 DOM 순서로 합니다.** 자세한 근거는 [overlay.md](./overlay.md)에 있습니다 — 요약하면 모듈 스코프 스택은 순서가 「연 순서」가 아니라 **effect flush 순서**여서 두 오버레이가 한 커밋에 같이 열리면 뒤집힙니다. `data-overlay`가 달린 열린 `<dialog>` 중 **마지막 것**일 때만 닫습니다.

  **초기 포커스도 함께 넣었습니다.** non-modal `<dialog>`라 UA가 포커스를 옮겨 주지 않아, 그대로 두면 스크린리더가 모달이 열린 사실을 통지받지 못합니다. 이것도 BottomSheet가 함께 쓰므로 `Overlay`에 뒀습니다.

- **Android 물리 뒤로가기는 구현하지 않았습니다.** `history.pushState`로 항목을 쌓고 `popstate`를 듣는 방식뿐인데, **라우팅 히스토리를 DS가 건드리는 것**이라 소비 앱의 뒤로가기 흐름과 충돌합니다. biz-ui는 `next`가 optional peerDependency라 라우터를 알 수도 없습니다. 「디자인 확인 필요」가 아니라 **소비 앱 책임**으로 둡니다.

- **`onClose`는 선택입니다.** 있으면 배경 탭과 ESC가 그것을 부르고, 없으면 배경이 `<div aria-hidden>`이 되어 탭으로 닫히지 않습니다 — `Overlay`의 계약 그대로입니다. **확인 모달은 배경 탭으로 닫는 것이 항상 옳지는 않아서**(어느 액션을 고른 것인지 모호) 기본값을 두지 않고 소비자가 정하게 했습니다.

- **접근성 이름을 제목에서 만듭니다.** `useId`로 제목에 id를 붙이고 `Overlay`의 `aria-labelledby`로 넘깁니다. overlay.md가 「이름은 ConfirmModal이 가진 제목에서 나와야 하므로 Overlay가 정하지 않는다」고 남겨 둔 자리입니다.

- **제목의 기본 요소는 heading이 아니라 `<p>`이고, `titleAs`로 엽니다.** 처음에 `<h2>` 고정으로 썼다가 바꾼 결정입니다.

  **이 `Overlay`가 non-modal이라 배경 아웃라인이 살아 있습니다.** [overlay.md](./overlay.md)가 적어 둔 대로 top layer도 `inert`도 없어서, 안에 heading을 넣으면 **소비 앱의 heading 목록에 그대로 섞입니다.** APG가 다이얼로그 제목에 `<h2>`를 쓰는 예시는 포커스 트랩 + inert 배경이 있는 진짜 모달 기준이라 조건이 다릅니다.

  **확인 모달에서 heading이 벌어 주는 것도 거의 없습니다.** 제목 한 줄 + 설명 한 줄이라 heading 탐색으로 건너뛸 것이 없고, 접근성 이름은 `aria-labelledby`가 이미 만듭니다.

  **internal-ui에는 따라갈 선례가 없습니다** — 컴포넌트 전체에서 `<h1>`~`<h6>` 사용처가 **0건**이고, `Modal` · `Dialog` · `BottomSheet`가 공유하는 `OverlayTitle`이 `as='strong'`입니다. 오버레이 중 유일하게 `aria-labelledby`를 쓰는 `Preview`도 id를 `<strong>`에 붙입니다 — **heading이 아니어도 이름이 성립한다**는 실증입니다. (다만 internal-ui `ConfirmModal`은 `aria-labelledby`를 아예 안 넘겨 이름이 없습니다. 그쪽은 따라가지 않습니다.)

  `<strong>`이 아니라 `<p>`인 것은 제목이 「중요도 강조」가 아니라서입니다. **위계가 필요한 화면은 소비 앱이 `titleAs`로 정합니다** — 레벨은 그 화면의 제목 구조에 달린 값이라 DS가 알 수 없습니다.

- **COM-011(버튼 라벨 규칙)을 코드로 강제하지 않습니다.** 섹션 안 정책(`524:10`)이 「좌측 — 파괴적 액션 / 우측 — 유지 액션」을 요구하는데, **DS는 어느 쪽이 파괴적인지 알 수 없습니다.** 라벨과 핸들러를 소비자가 넘기고 스타일은 자리로 고정(좌 tonal gray · 우 filled primary)합니다. 정책 준수는 소비 앱 몫이고, 아래에 어긋난 지점을 남겼습니다.

- **`description`이 필수입니다.** 두 심볼과 다른 인스턴스 전부 설명을 갖고 있고, 짧은 인스턴스도 설명이 빠진 것이 아니라 **제목이 1행**이었습니다(위 실측).

- **줄바꿈은 자연 접힘이 기본이고, 소비자가 `\n`으로 끊을 수 있습니다.** Figma 마스터는 제목을 `<p>` 두 개로 **명시적으로 끊어** 뒀는데, 문구가 소비자 값이라 끊는 위치를 DS가 정할 수 없습니다. 그래서 280 폭(320 - 좌우 20)에서 접히는 것을 기본으로 두되, **텍스트 영역에 `whitespace-pre-line`을 걸어** 의도한 위치가 있으면 `\n`으로 넣을 수 있게 했습니다.

  `white-space`가 상속되므로 제목·설명이 함께 받습니다 — `text-center`가 이미 같은 자리에 있습니다. 같은 처리를 [`Notification`](./notification.md)의 `description`이 먼저 쓰고 있습니다.

- **`gap`을 조건 없이 겁니다.** `cancel`이 없으면 버튼이 하나라 gap이 렌더에 드러나지 않습니다 — `FloatingPill`의 「자식이 하나면 gap이 무효라 `hasIcon`으로 가를 이유가 없다」와 같은 판단입니다.

- **폴더는 단독입니다.** 이름 프리픽스가 `Confirm…`인데 같은 프리픽스 계열이 없습니다 — `Badge` · `NotificationCard` · `StatusAlertBanner` 선례입니다. `Overlay`는 `components/shared/`에 그대로 비공개로 둡니다.

## API

| prop          | 필수 | 기본값     | 비고                                          |
| ------------- | ---- | ---------- | --------------------------------------------- |
| `isOpen`      | ✅   | —          | `false`면 언마운트                             |
| `title`       | ✅   | —          | 접근성 이름. 요소는 `titleAs`, `\n`으로 줄바꿈 |
| `titleAs`     |      | `'p'`      | `'p'` · `'h1'`~`'h6'`. 위계가 필요할 때만       |
| `description` | ✅   | —          | 설명 문구. `\n`으로 줄바꿈 가능                 |
| `confirm`     | ✅   | —          | `{ label, onClick }`. 단일 또는 **우측**       |
| `cancel`      |      | —          | 주면 **좌측**에 추가되고 `btn=two`가 됨        |
| `onClose`     |      | —          | 배경 탭 · ESC. 없으면 배경 탭으로 안 닫힘      |
| `target`      |      | `'portal'` | `Portal`로 전달                                |
| `className`   |      | —          | 카드에 적용                                    |

```tsx
// 단일 버튼
<ConfirmModal
  isOpen={isOpen}
  title='주문이 접수되었어요'
  description='배송 전날 다시 알려드릴게요'
  confirm={{ label: '확인', onClick: close }}
/>

// 두 버튼 — COM-011은 소비 앱이 지킵니다 (좌측이 파괴적)
<ConfirmModal
  isOpen={isOpen}
  title='주문을 멈추고 이전으로 돌아갈까요?'
  description='입력한 주문이 모두 삭제됩니다'
  cancel={{ label: '삭제', onClick: discard }}
  confirm={{ label: '계속 주문', onClick: close }}
  onClose={close}
/>
```

## 디자인 확인 필요

| 항목            | 내용                                                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| COM-011 ↔ 심볼  | 정책은 「좌측 — 파괴적」인데 `btn=two` 심볼은 **좌 「아니요」(유지) · 우 「네」(파괴적)** 로 반대입니다. 정책의 예외 예시도 「네 / 아니오」 순서라 심볼과 어긋납니다 |
| 제목 줄바꿈     | 마스터가 2행으로 명시적으로 끊었습니다. 자연 줄바꿈으로 충분한지, 소비자가 끊을 수단이 필요한지                     |
| 상호작용        | `hover` · `pressed`는 `CtaButton`이 갖고 있고, 모달 자체의 **닫힘 모션**은 정의가 없습니다 (열림만 `animate-popup`) |
| 배경 탭         | 확인 모달을 배경 탭으로 닫아도 되는지. 구현은 `onClose`를 준 경우에만 닫습니다                                     |
| 카드 최소 폭    | `w-[320px]` 고정이라 **320px 뷰포트에서 좌우 여백이 0**이 됩니다. 하한(`max-w-[calc(100%-40px)]` 등)이 필요한지     |
| 긴 버튼 라벨    | `two`에서 버튼 하나가 136px이고 `CtaButton lg`의 `px-[30px]`을 빼면 라벨 공간이 76px입니다. 높이가 `h-[52px]` 고정이라 긴 라벨은 넘칩니다 — 말줄임할지 라벨 길이를 제한할지. **보여주던 `LongText` 스토리는 걷어냈으니 확인할 땐 라벨을 직접 늘려 봐야 합니다** |

## 검증

**overlay.md가 예고한 것이 그대로 풀렸습니다.** 「비공개인 동안 Overlay의 클래스는 CSS에 생성되지 않습니다 — BottomSheet · ConfirmModal이 Overlay를 import 하면 저절로 풀립니다」라고 남아 있었는데, 이번 빌드에서 `dist/index.es.js`에 5개가 전부 복귀했습니다.

| 클래스                  | 이전 | 지금 |
| ----------------------- | ---- | ---- |
| `bg-dim`                | 0건  | 복귀 |
| `animate-fade-in`       | 0건  | 복귀 |
| `animate-popup`         | 0건  | 복귀 |
| `animate-bottom-sheet`  | 0건  | 복귀 |
| `z-[1000]`              | 0건  | 복귀 |

`animate-bottom-sheet`까지 함께 돌아온 것은 `OVERLAY_CONTENT_STYLES`가 두 variant를 한 객체에 들고 있어서입니다 — BottomSheet가 아직 없어도 리터럴이 살아납니다.

## Storybook

`apps/storybook/src/stories/biz-ui/ConfirmModal.stories.tsx`, `meta.title`은 `core/biz-ui/ConfirmModal`.

**세 스토리 모두 트리거 버튼으로 엽니다.** `apps/storybook/.storybook/preview.tsx`가 `tags: ['autodocs']`를 전역으로 걸어 Docs 페이지가 **모든 스토리를 한 번에 마운트**하는데, 열린 채로 두면 `fixed inset-0 z-[1000]` 모달이 문서를 덮고 스크롤 잠금까지 겹칩니다. internal-ui 오버레이 스토리가 전부 같은 이유로 트리거 방식입니다.

| 스토리        | 보는 것                                                       |
| ------------- | ------------------------------------------------------------- |
| `Default`     | `btn=one` — 단일 `확인`                                        |
| `TwoActions`  | `btn=two` — 좌 tonal gray · 우 filled primary. COM-011대로 좌측이 파괴적 |
| `Nested`      | 모달 두 개를 겹쳐 열고 **ESC 한 번에 위만 닫히는 것** — 이번 티켓 신규 로직의 유일한 검증 자리 |

**모달이 스토리 프레임이 아니라 캔버스 전체를 덮습니다.** `Overlay`가 `fixed inset-0 z-[1000]`이고 `Portal`이 `#portal`을 못 찾으면 `document.body`로 폴백하기 때문입니다 — 실제 동작 그대로라 프레임 안에 가두지 않았습니다. 뒤에 깔린 `380 × 520` 판은 딤이 어떻게 보이는지 확인하는 배경입니다.
