# Toast 구현 기록

`apps/biz-ui/src/components/Toast` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 이 컴포넌트 고유 사실만 둡니다.

Figma: [Toast 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=75-4643&m=dev) (`75:4643`), 컴포넌트 세트 `116:478`.

같은 섹션 아래쪽의 **`FeedbackToast`(`587:1806`)는 DOTOLI-267 범위**입니다. `type`이 `success` · `info` · `warning` · `error` 4종으로 축부터 다릅니다.

## 구현 현황

| 컴포넌트 | 티켓       | 설명                                                          |
| -------- | ---------- | ------------------------------------------------------------- |
| `Toast`  | DOTOLI-266 | `status` 2종. `useDismiss` · `useAction`은 prop 유무로 흡수. 단독 폴더 |

**시각 표면만 담당합니다.** 화면 하단 배치 · 자동 소멸 타이머 · 동시 노출 우선순위는 넣지 않았고, 근거와 판단 기준은 아래 「후속 판단 기준」에 있습니다.

## Variant 축

| Figma 축     | 값                  | 구현                        |
| ------------ | ------------------- | --------------------------- |
| `status`     | `info` · `loading`  | `status` 그대로             |
| `useDismiss` | `true` · `false`    | **`onDismiss` 유무로 흡수** |
| `useAction`  | `true` · `false`    | **`action` 유무로 흡수**    |

세트에 심볼 5개가 있고, `status=loading`은 `useDismiss=false` · `useAction=false` 조합에만 그려져 있습니다 (`352:1172`).

## 실측 스펙

| 항목        | 값                                                              |
| ----------- | ---------------------------------------------------------------- |
| 컨테이너    | `bg-gray-900` · `rounded-16` · `p-[12px]` · `gap-[10px]`          |
| 테두리      | 1px `gray/800` → `inset-ring inset-ring-gray-800`                 |
| 그림자      | `shadow/shadow-8` → `shadow-8`                                    |
| 폭          | 문서 프레임 380. **글자수에 따라 유동** (주석 `587:1813`) → `w-fit max-w-full` |
| 높이        | 54 (버튼 없음) · 56 (액션 버튼 있음). 고정하지 않음               |
| 아이콘      | `IconCircle` `size='sm'`(30px) — `info`는 `theme='black'`, `loading`은 `theme='primary'` |
| 메시지      | `body` (Medium 16 / lh 1.45 / ls -3%) · `base/white` · `flex-1`   |
| 액션 버튼   | `blue/500` · h32 · `px-[12px] py-[5px]` · radius 6 · `label-bold` |
| 닫기 버튼   | 24px · X 아이콘 16px · `gray/500`                                 |

높이는 padding으로 설명됩니다 — `12 + 30 + 12 = 54`(아이콘 높이 기준), `12 + 32 + 12 = 56`(액션 버튼 높이 기준). 메시지가 2줄이 되면 그만큼 늘어납니다.

### 기구현 컴포넌트가 그대로 맞습니다

세 자리 모두 새로 그릴 것이 없습니다.

| 자리      | Figma                                       | 구현                                                    |
| --------- | ------------------------------------------- | ------------------------------------------------------- |
| 아이콘    | 30px · radius 10 · `base/black` + `blue/400` | `IconCircle` `size='sm'` `theme='black'`                |
| 로딩 아이콘 | 30px · radius 10 · `blue/100` + `blue/300` · CircleNotch | `IconCircle` `size='sm'` `theme='primary'`     |
| 액션 버튼 | h32 · 12/5 · radius 6 · `blue/500` · `label-bold` | `CtaButton` `size='sm'` `variant='filled'` `theme='primary'` |
| 닫기 버튼 | 24px · 아이콘 16px · `gray/500`             | `IconButton` `size='sm'` `theme='default'`              |

`IconButton`의 `theme='default'`가 `text-gray-500`이라 기본 상태가 정확히 일치합니다. **`pressed`만 어긋나고 그대로 뒀습니다** — 아래 「결정」.

### 모션

| 항목        | 값                                                      |
| ----------- | ------------------------------------------------------- |
| 등장        | 200ms (주석 `337:3984`) → `--animate-toast`             |
| 자동 소멸   | 5000ms 후 페이드 아웃 (주석 `337:4087`) — **구현 안 함** |
| 로딩 아이콘 | 360도 회전 (주석 `355:1202`) → `animate-spin`           |

`--animate-toast`는 기존 `fade-in` 키프레임을 duration만 0.2s로 바꿔 씁니다. `--animate-fade-in`은 바텀시트 250ms에 맞춰져 있어 그대로 쓰면 50ms가 어긋납니다.

## 정책

섹션 안 주석이 소멸 규칙과 동시 노출 우선순위를 정의합니다. **컴포넌트가 아니라 컨테이너의 몫이라 코드로 옮기지 않았고**, 여기 옮겨 적어 후속 티켓이 참조할 수 있게 둡니다.

| 케이스 | 조건                        | 소멸                          |
| ------ | --------------------------- | ----------------------------- |
| A      | 버튼 없음                   | 5000ms 후 자동 (`337:4099`)   |
| D      | `action` · `onDismiss` 하나 이상 | 사용자 조작 시에만 (`337:4105`) |
| 예외   | 주문 마감 경과 안내         | 해당 주차 주문 등록 시 (`542:68`) |

- **동시 노출 우선순위** (`337:4118`) — A 중 새 A는 이전 것 제거 후 최신만, A 중 D는 A 즉시 제거 후 D, D 중 새 D는 큐에 순차 적재.
- **배치** (`337:4105` · `587:1813`) — 화면 아래 가운데. D는 영역 내 하단이고 **CTA가 있으면 CTA 상단**입니다.
- **문구** (`337:4118`) — 줄 수 제한 없음, 말줄임표 미사용, 최대 2줄 20자 이내 **권장**(기획 규칙이고 개발에서 강제하지 않음). 필수값 미입력 안내는 전체 나열이 우선이라 20자 제한 대상이 아닙니다.
- **용례** (`352:1145`) — `status='loading'`은 비즈파트너 특수 로딩 안내이고, 필수값 미입력은 `FeedbackToast`(DOTOLI-267)가 맡습니다.

## 결정

- **`useDismiss` · `useAction` 축을 prop 유무로 흡수했습니다.** [`StatusAlertBanner`](./status-alert-banner.md)의 `useDismiss` → `onDismiss`, [`InfoBanner`](./info.md)의 `useAction` → `onClick`, [`ConfirmModal`](./confirm-modal.md)의 `btn` → `cancel`과 같은 기준입니다 — 축과 핸들러가 항상 같이 움직여서 둘로 두면 「축은 켰는데 핸들러가 없는」 조합이 조용히 통과합니다.

- **`action`은 `{ label, onClick }` 객체입니다.** 라벨이 가변이라 `StatusAlertBanner`처럼 상수로 고정할 수 없고, `ConfirmModal`의 `confirm` · `cancel`과 같은 모양을 씁니다(`Required<Pick<CtaButtonProps, 'label' | 'onClick'>>`).

- **`status='loading'`은 아이콘을 컴포넌트가 고정합니다.** `iconKey`를 받아도 `circle-notch`로 덮고 `IconCircle` 테마도 `primary`로 고정합니다. `IconButton`의 `isPending`이 같은 방식입니다(넘긴 `iconKey`를 무시하고 펜딩 아이콘을 렌더). 로딩 표시는 소비자가 고를 값이 아닙니다.

- **`IconCircle`에 `iconClassName`을 더했습니다.** 회전은 **글리프에만** 걸려야 합니다 — `IconCircle`은 radius 10의 라운드 사각형이라 컨테이너째 돌리면 배경 모서리가 같이 돕니다. 기존 `className`은 컨테이너용이라 도달할 수 없었고, [`Overlay`](./overlay.md)의 `contentClassName`과 같은 성격(내부 노드로 가는 className 통로)이라 같은 이름 규칙(`<대상>ClassName`)으로 열었습니다. 판단이 필요한 스위치가 아니라 통로라서 「소비자의 결정거리를 늘리지 않는다」는 규칙과 충돌하지 않습니다.

- **`IconCircle`의 `theme`은 열지 않았습니다.** 주석 `337:4105`에 「IconCircle 모두 사용가능」이 있지만, 아이콘 글리프를 고르라는 말인지 테마까지 열라는 말인지 갈립니다. `status`가 테마를 고정하고(`info`→`black` · `loading`→`primary`) `iconKey` · `weight`만 엽니다. **이대로 유지하기로 확정했습니다** — 지금 열어야 할 소비처가 없고, 공개는 되돌리기 비대칭이라 나중에 여는 쪽이 쌉니다.

- **`iconKey`는 선택입니다.** Figma 심볼 5개 모두 아이콘이 있지만 [`NotificationCard`](./notification-card.md)와 같이 `Partial<Pick<IconCircleProps, …>>`로 두고 없으면 `IconCircle`을 렌더하지 않습니다. 아이콘 없는 토스트를 금지할 근거가 주석에 없습니다.

- **gap을 10px로 통일했습니다.** 버튼이 있는 심볼 2종은 10인데 **버튼이 없는 2종(`116:457` · `352:1172`)만 11**입니다(아이콘 오른쪽 끝 42, 텍스트 시작 53). 컨테이너 바깥 gap도 10이고 두 값이 갈릴 이유가 없어 **Figma 슬립으로 보고 10으로 확정했습니다.**

- **`w-fit max-w-full`입니다.** 심볼 폭 380은 문서 프레임 폭(420 - 좌우 20)이고, 주석 `587:1813`이 「글자수에 따라 유동적으로 넓이 지정」이라고 단정합니다. 말줄임은 넣지 않았습니다 — 정책이 말줄임표 미사용이라 `StatusAlertBanner`의 `truncate`와 반대입니다.

- **자동 소멸 타이머를 컴포넌트에 두지 않았습니다.** 「버튼이 없으면 5000ms」로 단순화할 수 없습니다 — **주문 마감 경과 예외(`542:68`)가 버튼도 없고 자동 소멸도 하지 않습니다.** 컴포넌트가 타이머를 들면 이 케이스를 위해 다시 끄는 스위치가 필요해지고, 그 스위치는 소비자가 매번 판단해야 하는 값이 됩니다. 소멸 시점은 노출을 관리하는 쪽(컨테이너)이 아는 사실입니다.

- **등장 모션만 넣고 소멸 모션은 넣지 않았습니다.** 마운트되면 `animate-toast`로 200ms 페이드 인합니다. 소멸은 종료 상태를 들고 있어야 하는데 그것을 드는 주체가 아직 없습니다 — [`Overlay`](./overlay.md)의 「닫힘 애니메이션은 없습니다」와 같은 이유입니다. internal-ui `Toast`는 `visible` prop으로 in/out 클래스를 바꾸는데, 그 prop을 넣어 주는 것이 `react-hot-toast`입니다.

- **등장 모션의 종류는 페이드로 봤습니다.** 주석에 명시된 것은 소멸 쪽 「페이드 아웃」과 duration 200ms뿐이고 등장은 프로토타입 플로우로만 있습니다(키프레임 데이터 없음). 짝을 맞춰 페이드로 뒀고 「디자인 확인 필요」에 올렸습니다.

- **`role='status'`가 기본값입니다.** 토스트는 포커스 이동 없이 뜨므로 라이브 리전이 없으면 보조기술에 **아무것도 전해지지 않습니다.** `status`는 암묵적으로 `aria-live='polite'` · `aria-atomic='true'`라 진행 중인 읽기를 끊지 않습니다. 오류처럼 즉시 알려야 하면 소비자가 `role='alert'`로 덮습니다 — `@bbodek/utils`의 컨테이너는 반대로 전부 `role='alert'` · `aria-live='assertive'`로 고정합니다.

- **`status='loading'`에 `action` · `onDismiss`를 막지 않았습니다.** Figma에 그 조합이 없지만 금지할 근거도 없고, 막으려면 union으로 쪼개야 해서 API가 무거워집니다.

- **닫기 버튼의 `pressed`가 어울리지 않지만 `IconButton`을 그대로 씁니다.** `theme='default'`의 눌림 배경이 `gray-100`이라 어두운 토스트 위에서 밝은 사각형이 뜹니다. Figma는 토스트 안에 `state=default` 인스턴스만 올려 둬 눌림 정의가 없고, **디자인대로 두기로 확정했습니다.** 다크 표면용 theme을 새로 만들지 않은 이유는 기존 `theme='dark'`가 아이콘을 흰색으로 바꿔 Figma의 `gray/500`과 갈리기 때문입니다 — 색을 맞추려면 Button 계열에 값을 하나 더 만들어야 하는데 그건 이 티켓이 판단할 것이 아닙니다. 기본 상태가 정확히 일치하므로 그대로 두고, 눌림이 실제로 문제가 되면 그때 Button 계열에서 함께 봅니다.

- **닫기 버튼에 히트 영역 확장을 넣지 않았습니다.** `IconButton size='sm'`이 24×24라 WCAG 2.5.8(24×24)을 정확히 만족합니다. `StatusAlertBanner`는 14×14라 확장이 필요했던 것이고, 기준을 넘기면 임의로 넣지 않습니다 (CLAUDE.md 「히트 영역 확장」).

- **폴더는 단독입니다.** `FeedbackToast`가 뒤에 오지만 프리픽스가 다릅니다 — `Checkbox` ↔ `ItemCheckbox`, `Toggle` ↔ `ToggleListItem`처럼 각자 최상위 폴더를 갖습니다. 문서는 계열 단위라 DOTOLI-267도 이 파일에 씁니다.

## API

| prop        | 필수 | 기본값     | 비고                                              |
| ----------- | ---- | ---------- | ------------------------------------------------- |
| `message`   | ✅   | —          | `<p>`로 렌더. 줄 수 제한 없음                      |
| `status`    |      | `'info'`   | `loading`이면 아이콘·테마를 고정하고 회전시킴      |
| `iconKey`   |      | —          | `IconCircle` 글리프. 없으면 아이콘을 렌더하지 않음 |
| `weight`    |      | `bold`     | `Icon` 기본값. `fill`도 사용 가능                  |
| `action`    |      | —          | `{ label, onClick }` → `CtaButton` `sm`            |
| `onDismiss` |      | —          | 있으면 닫기 `IconButton` 렌더                      |
| `role`      |      | `'status'` | 오류 알림이면 `'alert'`                            |
| `aria-live` |      | —          | `role`을 덮을 때만                                 |
| `className` |      | —          | 컨테이너에 적용. **배치는 이 통로로 소비자가 함**  |

```tsx
// A — 버튼 없음. 소멸은 노출하는 쪽이 정합니다
<Toast iconKey='check-circle' message='주문이 등록되었어요' />

// D — 액션 + 닫기
<Toast
  action={{ label: '보기', onClick: goOrder }}
  iconKey='arrows-clockwise'
  message='주문이 등록되었어요'
  onDismiss={close}
/>

// 로딩 — iconKey를 넘겨도 circle-notch로 덮입니다
<Toast message='잠시만 기다려주세요' status={TOAST_STATUSES.LOADING} />
```

## 후속 판단 기준 — 컨테이너를 무엇으로 만들 것인가

자동 소멸 · 큐 · 화면 하단 배치를 담을 자리가 아직 없습니다. **자매 DS는 이 층이 DS 밖에 있습니다.**

| 층        | internal-ui                                | biz-ui                     |
| --------- | ------------------------------------------ | -------------------------- |
| 시각      | `Toast` (`visible` prop으로 in/out 클래스만 바꿈) | `Toast` — 이번 티켓    |
| 노출 관리 | `@bbodek/utils`의 `toast` + `Toaster` (`react-hot-toast`) | **없음**    |

`@bbodek/utils`의 실측입니다 — `react-hot-toast`가 peerDependency(`^2.6.0`), `position: 'top-center'`, 기본 `duration: 2000`, `ariaProps`는 `role: 'alert'` · `aria-live: 'assertive'` 고정입니다.

**biz-ui는 `@bbodek/utils`를 물 수 없습니다.** `utils` → `internal-ui` 의존 체인이 있어 DS 전체가 딸려옵니다 ([frontend.md](../frontend.md) 「특이사항」). 선택지는 셋입니다.

1. **`react-hot-toast`를 biz-ui peerDependency로 추가** — 따라오는 것은 [overlay.md](./overlay.md) 「넣기로 했을 때 따라오는 것」과 같습니다(`external` 등록 · README 안내 · 버전 범위 · 뺄 때 소비 앱이 깨짐).
2. **자체 컨테이너** — Figma 정책의 A/D 우선순위는 라이브러리 기본 동작이 아닙니다. `react-hot-toast`로도 「A 노출 중 D 발생 시 A 즉시 제거」는 직접 짜야 하고, 마감 경과 예외는 무한 duration으로 따로 다뤄야 합니다.
3. **소비 앱 책임** — 배치가 「CTA가 있으면 CTA 상단」이라 **레이아웃을 아는 쪽이 앱**이라는 점은 이 안을 지지합니다.

셋 중 무엇이든 이 컴포넌트는 그대로 씁니다. 컨테이너가 생기면 함께 볼 것은 두 가지입니다 — 소멸 모션을 위한 `isOpen` 계열 prop(internal-ui의 `visible` 자리)과, 큐에 쌓인 토스트의 `role` 기본값입니다.

## 디자인 확인 필요

| 항목             | 내용                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------ |
| 등장 모션        | 명시된 것은 소멸 「페이드 아웃」과 200ms뿐입니다. 등장도 페이드로 뒀습니다                     |
| 회전 속도        | 「360도 회전」만 있고 duration이 없습니다. Tailwind 기본값(1s linear)을 씁니다                |
| 아이콘 없는 토스트 | 심볼 5개 모두 아이콘이 있습니다. 아이콘 없이 쓰는 것이 허용되는지                           |
| 2줄 이상         | 정책은 줄 수 제한이 없는데 심볼은 1줄뿐입니다. 3줄 이상에서 버튼 정렬(현재 세로 가운데)이 맞는지 |

**gap 11px · `IconCircle` 테마 개방 · 닫기 `pressed` 3건은 DOTOLI-266에서 확정돼 위 표에서 내렸습니다.** 판단 근거는 「결정」에 있습니다.

## Storybook

`apps/storybook/src/stories/biz-ui/Toast.stories.tsx`, `meta.title`은 `core/biz-ui/Toast`.

| 스토리         | 보는 것                                                        |
| -------------- | -------------------------------------------------------------- |
| `Default`      | 기본형 + 컨트롤                                                 |
| `Combinations` | Figma 세트와 같은 배치 — `onDismiss` × `action` 4조합            |
| `Loading`      | `status='loading'` — 아이콘 고정과 회전                          |
| `LongMessage`  | 380 폭에서 2줄로 접히는 것 (말줄임이 아닌 것)                     |

`iconKey` · `weight` argType은 `Icon.stories`에서 가져와 `description`만 걷어냅니다 — `IconCircle` · `NotificationCard`와 같은 방식입니다.
