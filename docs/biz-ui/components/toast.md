# Toast 구현 기록

`apps/biz-ui/src/components/Toast` · `apps/biz-ui/src/components/FeedbackToast` · `apps/biz-ui/src/components/Toaster` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 토스트 계열 고유 사실만 둡니다.

Figma: [Toast 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=75-4643&m=dev) (`75:4643`), 컴포넌트 세트 `116:478`(Toast) · `587:1806`(FeedbackToast).

## 구현 현황

| 컴포넌트         | 티켓       | 설명                                                          |
| ---------------- | ---------- | ------------------------------------------------------------- |
| `Toast`          | DOTOLI-266 | `status` 2종. `useDismiss` · `useAction`은 prop 유무로 흡수. 단독 폴더 |
| `FeedbackToast`  | DOTOLI-267 | `type` 4종. 아이콘·색을 `type`이 정함. 버튼 없음. 단독 폴더    |
| `Toaster` · `toast` | DOTOLI-268 | 노출 관리(단일 슬롯 큐 · 자동 소멸 · 하단 배치). 서드파티 없음 |

**`Toast` · `FeedbackToast`는 시각 표면만 담당합니다.** 화면 하단 배치 · 자동 소멸 타이머 · 동시 노출 우선순위는 두 컴포넌트에 넣지 않았고 DOTOLI-268의 「toast 유틸」이 맡습니다. 왜 컴포넌트가 아닌지는 아래 「결정」에 있습니다.

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
| 폭          | **담는 영역을 꽉 채움** (fill) → `w-full`. 세트 380(프레임 420) · 인터렉션 340(프레임 380) 전부 「프레임 − 좌우 20」 |
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
| 자동 소멸   | 5000ms 후 페이드 아웃 (주석 `337:4087`) → DOTOLI-268 `Toaster` · `--animate-toast-out` |
| 로딩 아이콘 | 360도 회전 (주석 `355:1202`) → `animate-spin`           |

`--animate-toast`는 기존 `fade-in` 키프레임을 duration만 0.2s로 바꿔 씁니다. `--animate-fade-in`은 바텀시트 250ms에 맞춰져 있어 그대로 쓰면 50ms가 어긋납니다.

## 정책

섹션 안 주석이 소멸 규칙과 동시 노출 우선순위를 정의합니다. **컴포넌트가 아니라 컨테이너의 몫이라 DOTOLI-266 · 267에서는 코드로 옮기지 않았고**, DOTOLI-268이 이 표를 그대로 물려받았습니다. 규칙별 구현 대조는 아래 「정책을 코드로 옮긴 방식」에 있습니다.

주석 `337:4097` · `337:4101`이 「토스트 공통」이라 **두 컴포넌트에 함께 걸립니다.** `FeedbackToast`는 버튼이 없어 언제나 A입니다.

| 케이스 | 조건                        | 소멸                          |
| ------ | --------------------------- | ----------------------------- |
| A      | 버튼 없음                   | 5000ms 후 자동 (`337:4099`)   |
| D      | `action` · `onDismiss` 하나 이상 | 사용자 조작 시에만 (`337:4105`) |
| 예외   | 주문 마감 경과 안내         | 해당 주차 주문 등록 시 (`542:68`) |

- **동시 노출 우선순위** (`337:4118`) — A 중 새 A는 이전 것 제거 후 최신만, A 중 D는 A 즉시 제거 후 D, D 중 새 D는 큐에 순차 적재.
- **배치** (`337:4105` · `587:1813`) — 화면 아래 가운데. D는 영역 내 하단이고 **CTA가 있으면 CTA 상단**입니다.
- **문구** (`337:4118`) — 줄 수 제한 없음, 말줄임표 미사용, 최대 2줄 20자 이내 **권장**(기획 규칙이고 개발에서 강제하지 않음). 필수값 미입력 안내는 전체 나열이 우선이라 20자 제한 대상이 아닙니다.
- **용례** (`352:1145`) — `status='loading'`은 비즈파트너 특수 로딩 안내이고, 필수값 미입력은 `FeedbackToast`가 맡습니다(「{필수값}을 입력해주세요」 = `type='info'` 심볼의 문구).

## 결정

- **`useDismiss` · `useAction` 축을 prop 유무로 흡수했습니다.** [`StatusAlertBanner`](./status-alert-banner.md)의 `useDismiss` → `onDismiss`, [`InfoBanner`](./info.md)의 `useAction` → `onClick`, [`ConfirmModal`](./confirm-modal.md)의 `btn` → `cancel`과 같은 기준입니다 — 축과 핸들러가 항상 같이 움직여서 둘로 두면 「축은 켰는데 핸들러가 없는」 조합이 조용히 통과합니다.

- **`action`은 `{ label, onClick }` 객체입니다.** 라벨이 가변이라 `StatusAlertBanner`처럼 상수로 고정할 수 없고, `ConfirmModal`의 `confirm` · `cancel`과 같은 모양을 씁니다(`Required<Pick<CtaButtonProps, 'label' | 'onClick'>>`).

- **`status='loading'`은 아이콘을 컴포넌트가 고정합니다.** `iconKey`를 받아도 `circle-notch`로 덮고 `IconCircle` 테마도 `primary`로 고정합니다. `IconButton`의 `isPending`이 같은 방식입니다(넘긴 `iconKey`를 무시하고 펜딩 아이콘을 렌더). 로딩 표시는 소비자가 고를 값이 아닙니다.

- **`IconCircle`에 `iconClassName`을 더했습니다.** 회전은 **글리프에만** 걸려야 합니다 — `IconCircle`은 radius 10의 라운드 사각형이라 컨테이너째 돌리면 배경 모서리가 같이 돕니다. 기존 `className`은 컨테이너용이라 도달할 수 없었고, [`Overlay`](./overlay.md)의 `contentClassName`과 같은 성격(내부 노드로 가는 className 통로)이라 같은 이름 규칙(`<대상>ClassName`)으로 열었습니다. 판단이 필요한 스위치가 아니라 통로라서 「소비자의 결정거리를 늘리지 않는다」는 규칙과 충돌하지 않습니다.

- **~~`IconCircle`의 `theme`은 열지 않았습니다.~~ — DOTOLI-285에서 열었습니다.** 주석 `337:4105`의 「IconCircle 모두 사용가능」이 **아이콘 글리프만인지 테마까지인지 갈렸던 것**이 「테마까지」로 확정됐습니다. 상세는 아래 「DOTOLI-285」에 있습니다.

- **`iconKey`는 선택입니다.** Figma 심볼 5개 모두 아이콘이 있지만 [`NotificationCard`](./notification-card.md)와 같이 `Partial<Pick<IconCircleProps, …>>`로 두고 없으면 `IconCircle`을 렌더하지 않습니다. 아이콘 없는 토스트를 금지할 근거가 주석에 없습니다.

- **gap을 10px로 통일했습니다.** 버튼이 있는 심볼 2종은 10인데 **버튼이 없는 2종(`116:457` · `352:1172`)만 11**입니다(아이콘 오른쪽 끝 42, 텍스트 시작 53). 컨테이너 바깥 gap도 10이고 두 값이 갈릴 이유가 없어 **Figma 슬립으로 보고 10으로 확정했습니다.**

- **`w-full`입니다 — 담는 영역을 꽉 채웁니다.** 처음에는 주석 `587:1813`(「글자수에 따라 유동적으로 넓이 지정」)을 근거로 `w-fit max-w-full`로 뒀는데, **그 주석은 `FeedbackToast` 밴드(`587:1806`, y 790~871)에 붙은 것**이라 `Toast`에 걸 근거가 아니었습니다. `Toast`의 폭은 문구가 아니라 **담는 영역**을 따릅니다 — 같은 심볼이 세트에서 380(프레임 420) · 인터렉션 프레임에서 340(프레임 380)으로 달라지고 둘 다 「프레임 − 좌우 20」입니다. 심볼 그림에서도 문구가 짧은데 액션·닫기 버튼이 오른쪽 끝에 붙어 있습니다. `w-fit`이면 그 여백이 사라져 `flex-1` 메시지가 밀어낼 것이 없고 버튼이 글자 옆에 붙습니다. 말줄임은 넣지 않았습니다 — 정책이 말줄임표 미사용이라 `StatusAlertBanner`의 `truncate`와 반대입니다.

- **자동 소멸 타이머를 컴포넌트에 두지 않았습니다.** 「버튼이 없으면 5000ms」로 단순화할 수 없습니다 — **주문 마감 경과 예외(`542:68`)가 버튼도 없고 자동 소멸도 하지 않습니다.** 컴포넌트가 타이머를 들면 이 케이스를 위해 다시 끄는 스위치가 필요해지고, 그 스위치는 소비자가 매번 판단해야 하는 값이 됩니다. 소멸 시점은 노출을 관리하는 쪽(컨테이너)이 아는 사실입니다.

- **컴포넌트에는 등장 모션만 넣었습니다.** 마운트되면 `animate-toast`로 200ms 페이드 인합니다. 소멸은 종료 상태를 들고 있어야 하는데 컴포넌트에는 그것을 드는 주체가 없습니다 — [`Overlay`](./overlay.md)의 「닫힘 애니메이션은 없습니다」와 같은 이유입니다. internal-ui `Toast`는 `visible` prop으로 in/out 클래스를 바꾸는데, 그 prop을 넣어 주는 것이 `react-hot-toast`입니다. **상태를 드는 주체가 DOTOLI-268의 스토어라 소멸 모션도 거기서 붙었습니다** — 컴포넌트가 아니라 감싸는 래퍼에 거는 이유는 아래 「toast 유틸」 「결정」에 있습니다.

- **등장 모션의 종류는 페이드로 봤습니다.** 주석에 명시된 것은 소멸 쪽 「페이드 아웃」과 duration 200ms뿐이고 등장은 프로토타입 플로우로만 있습니다(키프레임 데이터 없음). 짝을 맞춰 페이드로 뒀고 「디자인 확인 필요」에 올렸습니다.

- **`role='status'`가 기본값입니다.** 토스트는 포커스 이동 없이 뜨므로 라이브 리전이 없으면 보조기술에 **아무것도 전해지지 않습니다.** `status`는 암묵적으로 `aria-live='polite'` · `aria-atomic='true'`라 진행 중인 읽기를 끊지 않습니다. 오류처럼 즉시 알려야 하면 소비자가 `role='alert'`로 덮습니다 — `@bbodek/utils`의 컨테이너는 반대로 전부 `role='alert'` · `aria-live='assertive'`로 고정합니다.

- **`status='loading'`에 `action` · `onDismiss`를 막지 않았습니다.** Figma에 그 조합이 없지만 금지할 근거도 없고, 막으려면 union으로 쪼개야 해서 API가 무거워집니다.

- **닫기 버튼의 `pressed`가 어울리지 않지만 `IconButton`을 그대로 씁니다.** `theme='default'`의 눌림 배경이 `gray-100`이라 어두운 토스트 위에서 밝은 사각형이 뜹니다. Figma는 토스트 안에 `state=default` 인스턴스만 올려 둬 눌림 정의가 없고, **디자인대로 두기로 확정했습니다.** 다크 표면용 theme을 새로 만들지 않은 이유는 기존 `theme='dark'`가 아이콘을 흰색으로 바꿔 Figma의 `gray/500`과 갈리기 때문입니다 — 색을 맞추려면 Button 계열에 값을 하나 더 만들어야 하는데 그건 이 티켓이 판단할 것이 아닙니다. 기본 상태가 정확히 일치하므로 그대로 두고, 눌림이 실제로 문제가 되면 그때 Button 계열에서 함께 봅니다.

- **닫기 버튼에 히트 영역 확장을 넣지 않았습니다.** `IconButton size='sm'`이 24×24라 WCAG 2.5.8(24×24)을 정확히 만족합니다. `StatusAlertBanner`는 14×14라 확장이 필요했던 것이고, 기준을 넘기면 임의로 넣지 않습니다 (CLAUDE.md 「히트 영역 확장」).

- **폴더는 단독입니다.** `FeedbackToast`와 각자 최상위 폴더를 갖습니다 — 근거는 아래 「FeedbackToast」 「결정」에 있습니다. 문서만 계열 단위로 묶어 DOTOLI-267도 이 파일에 씁니다.

### DOTOLI-285 · 줄바꿈 · `theme` · `highlight`

- **`message`에 `\n` 줄바꿈을 허용합니다.** `TOAST_MESSAGE_STYLE`에 `whitespace-pre-line`을 더했습니다. 자동 접힘은 그대로이고 **끊는 위치를 소비자가 지정할 수 있는 것**만 늘었습니다. `BottomActionBar`의 `info` · [`ConfirmModal`](./confirm-modal.md) · [`Notification`](./notification.md)의 `description`이 이미 같은 처리라 계열이 맞습니다.

- **`theme`은 `IconCircleTheme` 6종을 그대로 받습니다.** 별도 union을 만들지 않았습니다 — 값을 걸러낼 근거가 주석에 없고, [`NotificationCard`](./notification-card.md)가 `black`을 뺀 5종으로 좁힌 것은 **흰 카드 위에 검정 원이 어울리지 않아서**였는데 토스트는 배경이 `gray/900`이라 그 이유가 성립하지 않습니다.

- **`status='loading'`은 여전히 테마를 덮습니다.** `theme`을 넘겨도 `primary`가 됩니다 — 위 「`status='loading'`은 아이콘을 컴포넌트가 고정합니다」와 같은 이유이고, 로딩 표시는 소비자가 고를 값이 아닙니다. 덮는 대상이 아이콘 하나에서 아이콘 + 테마로 늘어난 것이 아니라 **원래 둘 다였고** `theme`이 열리면서 드러난 것입니다.

- **`highlight`는 `message` 앞에 붙는 강조 조각입니다.** [`NotificationCard`](./notification-card.md)의 같은 이름 prop과 구조가 같습니다 — 같은 `Typography` 안의 `<span>`으로 렌더하고 색을 `theme`에서 가져옵니다. **다른 점은 굵기를 직접 얹는다는 것**입니다. NotificationCard는 제목이 `heading-4`라 이미 굵어서 색만 바꾸면 되는데, 토스트 본문은 `body`(500)라 강조가 서려면 `text-body-bold`(700)가 필요합니다. 두 토큰은 크기 · 행간 · 자간이 같아 **굵기만 갈립니다.**

- **강조색은 `300`대이고 `gray`만 굵기로 구분합니다.** [`NotificationCard`](./notification-card.md)가 쓰는 `600`~`800`대는 `gray/900` 배경에서 묻힙니다. **`300`은 지어낸 값이 아니라 같은 계열의 기존 결정을 승계한 것**입니다 — 아래 [`FeedbackToast`](#feedbacktoast)가 **같은 `bg-gray-900` 위에서** 이미 `green-300` · `blue-300` · `yellow-300` · `red-300`을 쓰고 있습니다.

  **`black`은 `blue-300`입니다.** 팔레트에 `black` 스케일이 없어 처음엔 `gray`와 함께 굵기만 뒀는데, **`black`이 `info`의 기본 테마라 강조 없는 기본 토스트가 전부 흰 볼드**가 됩니다. `IconCircle`의 `black`이 `bg-black text-blue-400`으로 **이미 파랑 계열**이라 강조도 같은 계열로 맞췄습니다.

  **`gray`만 색을 넣지 않습니다.** `gray-300`은 흰 본문 옆에서 강조가 아니라 오히려 흐려 보입니다 — [`NotificationCard`](./notification-card.md)에서 `gray`의 강조색이 타이틀색과 같아 시각적으로 나뉘지 않는 것과 같은 자리이고, 굵기만으로 이미 구분됩니다. `TOAST_HIGHLIGHT_COLOR_STYLES`를 `Partial<Record<…>>`로 두고 **`gray`는 키를 아예 두지 않았습니다**(빈 문자열을 채우면 「색을 정했는데 비어 있다」로 읽힙니다).

- **강조부는 `message` 앞쪽 고정입니다 — 넓힐 때는 `message`를 union으로 엽니다.** 중간 · 뒤쪽을 강조하는 케이스가 아직 없어 `highlight` + `message` 두 조각을 순서 고정으로 잇습니다. [`NotificationCard`](./notification-card.md)의 「강조부 위치」와 같은 제약이고, **같은 이름 · 같은 구조라 두 컴포넌트가 함께 움직입니다.**

  필요해지면 **`message: string | ToastMessagePart[]`로 넓힙니다.** `string`이 union에 남아 **기존 호출부가 컴파일도 동작도 그대로**라 파괴적이지 않고, `highlight`는 앞쪽 강조의 짧은 형태로 남깁니다. 배열과 `highlight`를 함께 준 경우는 타입으로 막기 어려워 **계약으로 둡니다** — [`BottomActionBar`](./bottom-action-bar.md)의 `subAction` · `info` 배타와 같은 자리입니다.

  **부분 문자열 매칭은 고르지 않습니다** — `highlight`가 `message` 안에 있고 그 자리를 칠하는 방식입니다. 호출부가 가장 자연스러워 보여 **나중에 무심코 택하기 쉬운데**, 지금 `highlight`는 **`message`에 없는 별도 조각**이라 의미가 정면으로 충돌합니다. 바꾸는 순간 기존 호출은 타입을 그대로 통과하면서 **강조만 조용히 사라집니다.** 같은 문자열이 두 번 나올 때 어디를 칠할지도 정해지지 않습니다.

### DOTOLI-297 · `message`를 `ReactNode`로 · `highlight` 제거

계기는 「**하이라이트되는 부분이 문장 중간에 올 수 없냐**」는 질문입니다. 위 285의 답이 「앞쪽 고정」이었고, 그때 적어 둔 확장 경로(`string | ToastMessagePart[]`)를 실제로 여는 티켓입니다. **[`NotificationCard`](./notification-card.md)와 함께 나갔습니다** — 285가 「같은 이름 · 같은 구조라 두 컴포넌트가 함께 움직입니다」로 묶어 둔 그대로입니다.

- **`message: string` → `ReactNode`입니다.** `string`이 `ReactNode`의 부분집합이라 **기존 호출부가 컴파일도 동작도 그대로**입니다. 285가 예고한 union(`string | ToastMessagePart[]`)이 아니라 `ReactNode`를 고른 것은, 배열이 결국 「조각 + 강조 여부」를 자체 타입으로 다시 정의하는 것인데 **JSX가 이미 그 표현입니다.** 자매 DS `@bbodek/internal-ui`의 `Alert`도 `title` · `content`를 `ReactNode`로 열어 뒀습니다.

- **`highlight`를 걷어냈습니다 — 파괴적 변경입니다.** 285는 「`highlight`는 앞쪽 강조의 짧은 형태로 남깁니다」였고 **둘을 함께 준 경우를 타입으로 막을 수 없어 계약으로 두려 했는데**, 남기면 그 막을 수 없는 계약이 실제로 생깁니다. `message` 안에서 위치를 정할 수 있게 된 이상 `highlight`는 **같은 일을 하는 두 번째 길**일 뿐입니다.

  **지금 걷어낸 이유는 비용입니다.** 소비 앱 사용처가 아직 0곳이라 [`InfoBanner`](./info.md)가 DOTOLI-296에서 `label` → `description`을 개명한 것과 같은 자리입니다 — 쓰기 시작하면 이 비용이 급격히 올라갑니다.

- **위치는 소비자가, 색·굵기는 DS가 갖습니다.** 소비자는 `<strong>`만 쓰고 칠하는 것은 DS입니다.

  ```tsx
  toast.show({ message: <>주문 <strong>3건</strong>이 등록되었어요</> });
  ```

  285가 든 **근거 ①(색 결정이 소비처로 새어나감)이 여전히 유효**하기 때문입니다. internal-ui `Alert`는 강조가 **굵기만** 바꾸고 색은 상속이라 그냥 열어도 안전한데, 여기는 강조색이 `theme` 파생이라 그대로 열면 소비자가 `theme`별 색을 직접 골라야 합니다. `TOAST_HIGHLIGHT_STYLES[theme]`를 문구 `<p>`에 걸어 **`[&_strong]:`로 후손을 칠합니다.**

  **대가는 둘입니다.** biz-ui 첫 임의 변형 셀렉터이고(선례는 internal-ui `Table`의 `[&_.cell]:`), 소비자가 굳이 인라인 색을 덮으면 막을 수 없습니다.

- **`TOAST_HIGHLIGHT_COLORS`가 `TOAST_HIGHLIGHT_STYLES`로 바뀌며 `Partial`이 풀렸습니다.** 285는 `gray`에 키를 두지 않는 것으로 「색 없음」을 표현했는데, 이제 값이 색이 아니라 클래스 묶음이라 **`gray`도 `[&_strong]:text-body-bold` 한 줄을 갖습니다.** 굵기는 6종 전부에 필요하고 색만 `gray`에서 빠지는 것이라 `Record` 전체가 채워집니다. **보이는 결과는 285와 같습니다** — `gray`의 강조는 흰색 그대로 굵기만 갑니다.

- **클래스는 완성된 리터럴로 적었습니다.** 매퍼로 조합하면 스캐너가 못 찾아 CSS가 통째로 빠지는데 타입도 lint도 안 잡습니다 — 규칙과 이유는 [CLAUDE.md](../../../apps/biz-ui/CLAUDE.md) 「스타일 규칙」에 있습니다. **리터럴 11개가 minify 후 `dist/index.es.js`에 그대로 남아 스캔되는 것을 확인했습니다.**

- **부분 문자열 매칭 경고는 이 전환으로 닫혔습니다.** 285가 「무심코 택하기 쉽다」고 막아 둔 안인데, `highlight`가 사라져 **칠할 대상 자체가 없어졌습니다.**

- **Storybook 컨트롤은 그대로 씁니다.** `control: 'text'`가 `ReactNode` prop에서 못 쓰게 될 것 같지만, **컨트롤이 넘기는 `string`이 유효한 `ReactNode`라 그대로 동작합니다.** `type`만 internal-ui `Alert` 스토리를 따라 `{ name: 'other', value: 'ReactNode', required: true }`로 바꿨습니다. `<strong>`이 들어간 예시는 컨트롤로 만들 수 없으므로 별도 스토리가 집니다.

## API

| prop        | 필수 | 기본값     | 비고                                              |
| ----------- | ---- | ---------- | ------------------------------------------------- |
| `message`   | ✅   | —          | `ReactNode`. `<p>`로 렌더. 줄 수 제한 없음. **`\n`으로 줄바꿈** · **`<strong>`으로 강조** |
| `status`    |      | `'info'`   | `loading`이면 아이콘·테마를 고정하고 회전시킴      |
| `iconKey`   |      | —          | `IconCircle` 글리프. 없으면 아이콘을 렌더하지 않음 |
| `theme`     |      | `status`에서 파생 | `IconCircle` 6종. `loading`이면 무시됨      |
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

## FeedbackToast

같은 섹션의 두 번째 세트(`587:1806`)입니다. **`Toast`와 겹치는 것은 표면 4값(배경 · 테두리 · 그림자 · 흰 글자)뿐이고 나머지는 전부 다릅니다** — 알약 모양이고 버튼이 없으며 아이콘이 `IconCircle`이 아니라 맨 `Icon`입니다.

### Variant 축

| Figma 축 | 값                                          | 구현          |
| -------- | ------------------------------------------- | ------------- |
| `type`   | `success` · `info` · `warning` · `error`    | `type` 그대로 |

`Toast`의 `status`와 값이 겹치지 않습니다(`info`만 이름이 같고 아이콘·색이 다릅니다). 축을 합치지 않은 이유입니다.

### 실측 스펙

| 항목      | 값                                                          |
| --------- | ------------------------------------------------------------ |
| 컨테이너  | `bg-gray-900` · radius 999 → `rounded-full` · `px-[14px] py-[8px]` · `gap-[6px]` |
| 테두리    | 1px `gray/800` → `inset-ring inset-ring-gray-800`             |
| 그림자    | `Toast`와 같은 값 → `shadow-8`                                |
| 폭        | 심볼마다 다름(80 · 190 · 201 · 221). **문구가 정함** (주석 `587:1813`) → `w-fit max-w-full` |
| 높이      | 39 = `8 + 23.2 + 8`                                           |
| 아이콘    | 18px · `fill` → `text-[18px]`                                 |
| 메시지    | `body-semibold` (SemiBold 16 / lh 1.45 / ls -3%) · `base/white` |

| `type`    | 아이콘           | 색           |
| --------- | ---------------- | ------------ |
| `success` | `check-circle`   | `green/300`  |
| `info`    | `info`           | `blue/300`   |
| `warning` | `warning-circle` | `yellow/300` |
| `error`   | `x-circle`       | `red/300`    |

네 색 전부 기존 스케일과 hex가 일치해 신규 토큰이 없습니다. **`Toast`와 달리 타이포가 `body`가 아니라 `body-semibold`입니다.**

### 결정

- **폴더를 `Toast`와 나눴습니다.** 프리픽스가 다르고(`Feedback…`) 공유하는 것은 표면 4값뿐입니다. `Toast/shared`를 만들면 두 컴포넌트가 서로의 변경에 묶이는데, 지금 공유할 것은 클래스 문자열 몇 개라 묶을 값이 못 됩니다 — `Checkbox` ↔ `ItemCheckbox`와 같은 판단입니다.

- **`type` 기본값은 `success`입니다.** Figma 세트의 첫 심볼(`587:1805`)을 따랐습니다 — [`IconCircle`](./icon-circle.md)이 같은 기준으로 기본값을 정했습니다.

- **아이콘과 색을 열지 않았습니다.** `type` 하나가 둘을 함께 정합니다(`Record<FeedbackToastType, { ICON_KEY, ICON }>`). [`StatusAlertBanner`](./status-alert-banner.md)와 같은 구조이고, `Toast`가 `iconKey`를 여는 것과 갈리는 이유는 **이쪽은 Figma가 type마다 아이콘을 못 박아 뒀기 때문**입니다.

- **`whitespace-nowrap`을 옮기지 않았습니다.** Figma 텍스트가 auto-width라 코드젠에 붙어 나온 값입니다. 문구 규격(`337:4118`)이 **줄 수 제한 없음**이고 필수값 미입력 안내는 전체 나열이 우선이라 한 줄을 넘기는 것이 정상 경로인데, nowrap이면 알약이 화면 밖으로 나갑니다. `w-fit max-w-full`로 두고 접히게 했습니다.

- **버튼이 없어 항상 A 케이스입니다.** 「토스트 공통」 주석(`337:4097` · `337:4101`)이 소멸 규칙과 200ms 모션을 두 컴포넌트에 함께 겁니다. `animate-toast`를 그대로 쓰고 5000ms 자동 소멸은 컨테이너 몫입니다.

- **`role='status'`가 기본값입니다.** `error` · `warning`도 마찬가지입니다. **type별로 role을 갈라 두지 않은 이유**는 같은 문구를 얼마나 급하게 읽어야 하는지는 화면 맥락이 정하지 색이 정하지 않기 때문입니다. 즉시 알려야 하면 소비자가 `role='alert'`로 덮습니다.

- **`FeedbackToastTypeStyles`를 `StatusAlertBanner`와 공유하지 않았습니다.** 필드 2개가 우연히 같을 뿐 계열이 다르고, 공유하려면 최상위 `shared`에 타입을 올려야 하는데 그러면 서로 무관한 두 컴포넌트가 한 타입에 묶입니다. 「타입 중복 금지」는 **같은 계열** 안의 규칙입니다.

### API

| prop        | 필수 | 기본값      | 비고                                        |
| ----------- | ---- | ----------- | ------------------------------------------- |
| `message`   | ✅   | —           | `<p>`로 렌더. 길면 접힘                      |
| `type`      |      | `'success'` | 아이콘과 색을 함께 정함                      |
| `role`      |      | `'status'`  | 즉시 알려야 하면 `'alert'`                   |
| `aria-live` |      | —           | `role`을 덮을 때만                           |
| `className` |      | —           | 컨테이너에 적용. **배치는 이 통로로 소비자가 함** |

```tsx
<FeedbackToast message='6월 5주 - 7월 1주 주문 완료' />

<FeedbackToast
  message='상호명, 사업자등록번호를 입력해주세요'
  type={FEEDBACK_TOAST_TYPES.INFO}
/>
```

## toast 유틸 (DOTOLI-268)

`Toast` · `FeedbackToast`는 시각만 담당하고, **언제 뜨고 언제 사라지는지는 이 층이 정합니다.** 서드파티 없이 모듈 스코프 스토어 하나로 만들었습니다 — 근거는 아래 「react-hot-toast를 쓰지 않기로 한 근거」.

```
components/Toaster/
├── Toaster.tsx       # 컨테이너. 현재 토스트 하나를 Portal로 렌더
├── toast.ts          # 공개 명령형 API
├── store/            # 큐 · 타이머 · 우선순위. 배럴에서 내보내지 않음
├── constants/ · types/ · utils/
└── index.ts          # 배럴. store는 내보내지 않음
```

### 정책을 코드로 옮긴 방식

**판정 축을 「버튼 유무」가 아니라 `duration`으로 잡았습니다.** 정책은 A(버튼 없음) · D(버튼 있음)로 말하지만, **마감 경과 예외가 「버튼 없는데 안 사라지는」 A라서** 버튼으로 판정하면 새 A가 예외 토스트를 밀어냅니다. `duration`이 숫자면 교체 가능, `null`이면 유지로 보면 네 규칙이 전부 한 축으로 떨어집니다.

| 정책 (`337:4118` · `542:68`)      | 구현                                                    |
| --------------------------------- | -------------------------------------------------------- |
| A 노출 중 새 A → 최신만           | 현재가 `duration ≠ null` → 즉시 버리고 새 것을 앞에 넣음   |
| A 노출 중 D → A 즉시 제거          | 위와 같은 분기 (새 것이 D여도 동일)                        |
| D 노출 중 새 D → 큐에 순차 적재    | 현재가 `duration === null` → 큐 뒤에 붙임                  |
| 예외(마감 경과) → 유지             | `duration: null`을 직접 넘김. 버튼이 없어도 안 밀림        |
| A는 5000ms 후 자동 소멸            | 버튼이 없으면 `duration` 기본값이 `5000`                   |
| D는 조작해야 소멸                  | `action` · `useDismiss`가 있으면 기본값이 `null`           |

**정책에 없어서 정한 것 3가지입니다.**

- **D 노출 중 A 발생** — 규칙에 없습니다. **큐에 넣습니다**(버리지 않음). D가 사용자 조작을 기다리는 중이라 A가 밀어낼 수 없고, 「확인 전까지 제거되지 않음」과 결이 같습니다.
- **큐에 A가 둘 이상 쌓였을 때** — 「A 중 새 A는 최신만」은 **노출 중인** A에만 걸립니다. 큐 안에서는 서로 밀어내지 않고 **넣은 순서대로 전부 뜹니다.** 위에서 「버리지 않음」으로 정해 놓고 큐 안에서만 버리면 규칙이 갈리기 때문입니다. D를 오래 열어 두면 뒤에 쌓인 A가 순서대로 5초씩 지나가므로 「디자인 확인 필요」에 올렸습니다.
- **`toast.loading()`의 기본 소멸** — A 규칙대로면 5초 뒤 사라지는데 **로딩은 작업이 끝나야 끝납니다.** 기본 `duration`을 `null`로 두고 호출부가 `toast.dismiss({ id })`로 끝냅니다.

### API

| 메서드                                  | 렌더            | 기본 `duration`                     |
| --------------------------------------- | --------------- | ----------------------------------- |
| `toast.show({ message, iconKey, weight, theme, action, useDismiss, duration })` | `Toast` `info` | 버튼 있으면 `null`, 없으면 `5000`   |
| `toast.loading({ message, duration })`  | `Toast` `loading` | `null`                            |
| `toast.success` · `info` · `warning` · `error` `({ message, duration })` | `FeedbackToast` | `5000`      |
| `toast.dismiss({ id })`                 | —               | `id` 없으면 현재 것. 큐에 있는 id면 큐에서만 제거 |
| `toast.dismissAll()`                    | —               | 큐를 비우고 현재 것을 닫음           |

전부 **id 문자열을 돌려줍니다.** 로딩처럼 나중에 닫아야 하는 것은 이 값을 들고 있어야 합니다.

```tsx
// 앱 루트에 한 번
<Toaster />

// A — 5초 후 자동
toast.success({ message: '6월 5주 주문 완료' });

// D — 조작해야 사라짐. 액션을 누르면 콜백 실행 후 닫힘
toast.show({
  action: { label: '보기', onClick: goOrder },
  iconKey: 'check-circle',
  message: '주문이 등록되었어요',
  useDismiss: true,
});

// 예외 — 버튼 없이 유지
toast.show({ duration: null, iconKey: 'warning-circle', message: '이번 주 주문 마감이 지났어요' });

// 로딩 — 끝나면 직접 닫음
const id = toast.loading({ message: '잠시만 기다려주세요' });
await submit();
toast.dismiss({ id });
```

### 결정

- **`useDismiss`가 유틸 층에서 되살아납니다.** 컴포넌트는 Figma 축을 `onDismiss` 핸들러로 흡수했지만, **유틸에서는 닫는 주체가 스토어라서** 소비자가 넘길 것이 핸들러가 아니라 스위치입니다. 「기능 on/off는 `use`」 규칙 그대로입니다.

- **액션을 누르면 토스트도 닫힙니다.** D의 정의가 「사용자 본인 조작 전까지 유지」라 조작이 일어나면 유지할 이유가 없습니다. `onClick`을 먼저 부르고 닫습니다.

- **라이브 리전은 컨테이너가 집니다.** 컨테이너가 `role='status'`(= `aria-live='polite'` · `aria-atomic='true'`)를 들고 토스트가 없어도 언마운트하지 않습니다. **리전이 변화 전에 이미 DOM에 있어야** 보조기술이 안에 들어온 것을 읽기 때문입니다 — `role='status'`를 단 엘리먼트를 통째로 새로 꽂는 방식은 낭독이 보장되지 않고, 타깃이 iOS WebView(VoiceOver)라 특히 그렇습니다. `react-hot-toast`가 토스트마다 role을 다는 쪽인데 따라가지 않았습니다.

- **컨테이너 안의 토스트는 `role='none'`으로 내립니다.** `Toast` · `FeedbackToast`의 기본값이 `'status'`라 그대로 두면 **리전이 겹쳐** 보조기술에 따라 두 번 읽힙니다. 두 컴포넌트를 단독으로 쓸 때는 스스로 리전이어야 하므로 기본값은 그대로 두고, **`Toaster`가 쓰는 자리에서만** `TOASTER_ITEM_ROLE`로 덮습니다. `role='none'`은 `<div>`의 암묵 role이 없어 사실상 기본값 취소만 합니다.

- **소멸 모션은 래퍼가 겁니다.** 컴포넌트 자신이 `animate-toast`(등장)를 들고 있어서 같은 엘리먼트에 `animate-toast-out`을 얹으면 `animation` 선언이 부딪힙니다. 컨테이너가 감싸는 `<div>`에 걸면 서로 다른 엘리먼트라 충돌이 없고, 래퍼의 `opacity`가 서브트리 전체에 적용됩니다.

- **`key={id}`로 재마운트합니다.** 토스트가 교체될 때 엘리먼트 타입이 같으면 React가 DOM 노드를 재사용해 **등장 애니메이션이 다시 돌지 않습니다.** 「A 중 새 A」가 정확히 그 경로입니다.

- **`TOAST_EXIT_MS`(200)와 `--animate-toast-out`의 duration이 짝입니다.** 스토어가 이 시간만큼 기다렸다가 다음 것을 꺼냅니다. 한쪽만 바꾸면 모션이 잘리거나 빈 화면이 그만큼 늘어납니다.

- **래퍼가 폭을 정하고 컴포넌트가 그 안에서 채우거나 뭉칩니다.** 래퍼는 `w-full` + `justify-center`라 화면 폭에서 좌우 20을 뺀 만큼입니다. `Toast`는 `w-full`이라 그대로 꽉 차고(Figma의 「프레임 − 좌우 20」), `FeedbackToast`는 `w-fit`이라 가운데 정렬됩니다(주석 `587:1813`의 「화면의 아래 가운데」). **두 폭 규칙이 다른 근거는 각 「실측 스펙」에 있습니다.**

- **배치는 `--toast-offset` 하나로 엽니다.** 컨테이너는 `fixed inset-x-0 bottom-0` + `safe-area-bottom`이고, 화면 하단에서 `20px + var(--toast-offset, 0px)`만큼 띄웁니다. **CTA가 있는 화면이 `:root`에 이 값을 세팅**하면 CTA 위로 올라갑니다. 포털을 타고 나가므로 화면 안쪽 엘리먼트에 걸어서는 닿지 않습니다. 컨테이너 자체를 다른 곳에 붙여야 하면 `target`(→ `Portal`)이 열려 있습니다.

- **`z-[1100]`입니다.** `Overlay`가 `z-[1000]`이라 **바텀시트·모달 위에** 뜹니다. 오버레이 안에서 한 조작의 결과를 알리는 경우가 정상 경로라 가려지면 안 됩니다.

- **스토어 구독 함수만 위치 인자입니다.** `useSyncExternalStore(subscribe, ...)`가 `subscribe(listener)` 형태로 호출하는 계약이라 객체 구조 분해를 쓸 수 없습니다. 나머지(`enqueueToast` · `dismissToast`)는 규칙대로 객체를 받습니다.

- **스토어는 배럴에서 내보내지 않습니다.** 소비자의 진입점은 `toast`와 `<Toaster />` 둘뿐입니다 — `components/shared`를 비공개로 두는 것과 같은 기준입니다.

### 검증

**스토어만 따로 번들해서 정책을 헤드리스로 돌렸습니다** (`esbuild` → node). React 없이 순수 로직만 도는 파일이라 가능합니다.

| 확인한 것 | 결과 |
| --------- | ---- |
| A 중 새 A는 최신만 · A 중 D는 A를 밀어냄 | 통과 |
| D 중 새 D는 큐에 적재 · D 중 A도 밀어내지 못함 | 통과 |
| 닫는 동안 `isClosing`으로 남아 있다 200ms 뒤 다음 것 | 통과 |
| 큐에 있는 id를 지우면 그 항목만 사라짐 | 통과 |
| 현재 것도 큐에도 없는 id로 `dismiss` 하면 아무것도 안 닫힘 | 통과 |
| `duration` 뒤 자동 소멸 · `duration: null`은 유지 | 통과 |
| 예외 토스트는 새 A에 밀리지 않음 | 통과 |
| 소멸 진행 중에 들어온 것은 교체가 아니라 큐 | 통과 |
| 큐에 쌓인 A 둘은 서로 밀어내지 않고 넣은 순서대로 | 통과 |

## `react-hot-toast`를 쓰지 않기로 한 근거 (DOTOLI-268)

노출 관리 층(자동 소멸 · 큐 · 하단 배치)을 **자체 구현**했습니다. 자매 DS를 따라 `react-hot-toast`(이하 rht)를 무는 안을 먼저 검토했고, 아래가 그때 실측한 것입니다.

### 자매 DS는 rht를 「고른」 적이 없습니다

| 시점       | 일                                                                            |
| ---------- | ------------------------------------------------------------------------------- |
| 2024-01-07 | `bbodek-internal` 저장소 생성                                                    |
| 2024-01-24 | `(#0) added react-hot-toast on email & sms template page` — **한 페이지 때문에 앱에 추가** |
| 2025-07-15 | `DOTOLO-88 Toast Component` — internal-ui `Toast` + `@bbodek/utils` `toast`·`Toaster`가 한 커밋에서 생김 |

**rht가 DS 토스트보다 1년 반 먼저 앱에 있었습니다.** utils 래퍼는 이미 깔려 있고 이미 마운트된 라이브러리를 감싼 것이지 요구사항을 보고 고른 것이 아닙니다. 그리고 **`internal-ui` 자신은 rht에 의존하지 않습니다** — 라이브러리는 끝까지 앱 층에 있었습니다. 「internal-ui처럼」을 따르면 **DS는 토스트 라이브러리를 물지 않는 쪽**입니다.

### 소비 앱 실측 (`bbodek-internal`)

| 항목                          | 실측                                                        |
| ----------------------------- | ------------------------------------------------------------ |
| `@bbodek/utils`의 toast 사용  | **76개 파일**                                                |
| `react-hot-toast` 직접 import | **63개 파일** — `toast.success('케어존 등록 성공')` 형태      |
| 호출 분포                     | `success` 127 · `error` 116 · `info` 5 · `dismiss` 4 · `dismissAll` 3 · `warning` 1 |
| 옵션 사용                     | `duration` 1곳 · `toast.promise` · `toast.custom` · `id` **0곳** |
| DS `Toast`의 `useClose` · `actionOption` | **0곳** — 2년 동안 호출부가 한 번도 안 씀           |
| `toasterId`                   | 6곳. 카카오맵 모달 안에 **두 번째 `<Toaster>`**를 `position: absolute`로 띄움 |

직접 import 하는 63개 파일은 **rht 기본 토스트 UI가 그대로 뜹니다.** DS 컴포넌트를 안 거칩니다.

### 그래서 넣지 않았습니다

1. **peerDep은 우회 경로를 같이 깝니다.** 앱 `node_modules`에 rht가 들어가는 순간 `import toast from 'react-hot-toast'`가 열리고, 자매 앱에서 그게 63개 파일로 실현됐습니다. DS 토스트와 라이브러리 기본 토스트가 한 앱에 공존합니다.
2. **정책이 rht 모델이 아닙니다.** 비즈는 단일 슬롯 + 우선순위 큐인데 rht는 동시 노출 리스트입니다. `toastLimit`은 스토어 기본값 20으로 박혀 있고 `ToasterProps`에 없으며(2.6.0 실측), 줄여도 초과분을 **큐잉이 아니라 `slice`로 버립니다**(`store.ts:69`). 「D 노출 중 새 D는 순차 적재」가 그대로 깨집니다.
3. **어드민에는 지킬 정책이 없었습니다.** mutation 성공/실패 알림 250여 곳이라 동시 노출·우선순위 요구가 없어서 라이브러리 기본 동작으로 충분했습니다. 비즈는 반대입니다.
4. **rht가 실제로 주는 것 중 비즈에 남는 게 적습니다.** 타이머는 20줄이고 **hover 일시정지는 터치 WebView에서 의미가 없습니다.** 마운트 컨테이너는 [`Portal`](./overlay.md)이 이미 있고, `t.visible` lifecycle은 스토어를 우리가 가지면 우리 상태입니다. `ToastBar`·기본 아이콘·기본 애니메이션은 `toast.custom`만 쓸 거라 전부 미사용입니다.
5. 넣었을 때 따라오는 것은 [overlay.md](./overlay.md) 「넣기로 했을 때 따라오는 것」과 같습니다 — `external` 등록 · README 안내 · 버전 범위 잠금 · **뺄 때 소비 앱이 깨짐**. 「반반이면 안 넣는 쪽이 되돌리기 쌉니다」도 같은 문서의 판단입니다.

### 대신 배워 온 것

어드민이 결국 `toasterId` + `absolute` 컨테이너로 **두 번째 Toaster**를 띄운 것이 유일하게 라이브러리가 이겼던 지점입니다. 비즈도 「영역 내 하단 · CTA 상단」이 있어 같은 문제를 만납니다. 그래서 `Toaster`가 처음부터 **오프셋(`--toast-offset`)과 `Portal` 타깃을 받는 형태**로 열려 있습니다 — 나중에 컨테이너를 하나 더 띄우는 우회를 하지 않으려는 것입니다.

**뒤집힐 조건** — 소비 앱(비즈파트너)이 이미 rht를 쓰고 있다면 peerDep 비용이 사실상 사라집니다. 그 경우에도 **유틸이 biz-ui가 아니라 앱에 있는 쪽**(어드민의 실제 구조)이 자연스럽습니다. 그 레포는 확인하지 못했습니다.

## 디자인 확인 필요

| 항목             | 내용                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------ |
| 등장 모션        | 명시된 것은 소멸 「페이드 아웃」과 200ms뿐입니다. 등장도 페이드로 뒀습니다                     |
| 회전 속도        | 「360도 회전」만 있고 duration이 없습니다. Tailwind 기본값(1s linear)을 씁니다                |
| 아이콘 없는 토스트 | 심볼 5개 모두 아이콘이 있습니다. 아이콘 없이 쓰는 것이 허용되는지                           |
| 여러 줄 버튼 정렬 | 문구가 3줄 이상일 때 `action` · 닫기 버튼이 지금처럼 **세로 가운데**가 맞는지. 줄 수 자체는 정책이 제한하지 않습니다 |
| 하단 여백        | 화면 아래에서 `20px`(+ safe area) 띄웠습니다. Figma에 수치가 없어 **화면 좌우 여백과 같은 값**을 썼습니다 |
| 로딩 소멸        | A 규칙대로면 5초 뒤 사라지는데 로딩은 작업이 끝나야 끝납니다. `dismiss` 호출 전까지 유지로 뒀습니다 |
| D 중 A 발생      | 정책에 없습니다. 버리지 않고 큐에 넣어 D를 닫은 뒤 뜨게 했습니다 |
| 큐에 쌓인 A 여러 개 | 위와 이어집니다. 큐 안에서는 서로 밀어내지 않아 D를 닫으면 **전부 순서대로** 지나갑니다. 최신 하나만 남기는 편이 나은지 |
| 강조 겹침        | `message`가 `ReactNode`라 `<strong>`을 **여러 군데**에 둘 수 있습니다. Figma 예시는 전부 한 군데인데, 문구 하나에 강조가 둘 이상 와도 되는지 |

**gap 11px · `IconCircle` 테마 개방 · 닫기 `pressed` 3건은 DOTOLI-266에서 확정돼 위 표에서 내렸습니다.** **강조부 위치 1건은 DOTOLI-297에서 닫혔습니다** — `message`가 `ReactNode`가 돼 위치를 소비자가 정합니다. 판단 근거는 「결정」에 있습니다.

## Storybook

`apps/storybook/src/stories/biz-ui/Toast.stories.tsx`, `meta.title`은 `core/biz-ui/Toast`.

| 스토리         | 보는 것                                                        |
| -------------- | -------------------------------------------------------------- |
| `Default`      | 기본형 + 컨트롤                                                 |
| `Combinations` | Figma 세트와 같은 배치 — `onDismiss` × `action` 4조합            |
| `Loading`      | `status='loading'` — 아이콘 고정과 회전                          |
| `LongMessage`  | 380 폭에서 2줄로 접히는 것 (말줄임이 아닌 것)                     |
| `MultilineMessage` | `\n`으로 **소비자가 끊는 자리** — 위 자동 접힘과 갈리는 지점   |
| `Themes`       | `IconCircle` 6종을 그대로 받는 것                                 |
| `Highlight`    | 없음 · 앞쪽 · **문장 중간** — `<strong>` 위치를 소비자가 정하는 것 |

`apps/storybook/src/stories/biz-ui/FeedbackToast.stories.tsx`, `meta.title`은 `core/biz-ui/FeedbackToast`.

| 스토리        | 보는 것                                                       |
| ------------- | ------------------------------------------------------------- |
| `Default`     | 기본형 + 컨트롤                                                |
| `Types`       | 4종을 문서 프레임과 같은 순서로. **문구도 심볼에 적힌 것을 그대로** 씁니다 |
| `LongMessage` | 필수값 전체 나열로 길어져 알약이 접히는 것                       |

`apps/storybook/src/stories/biz-ui/Toaster.stories.tsx`, `meta.title`은 `core/biz-ui/Toaster`. **전부 버튼을 눌러서 띄웁니다** — 자동으로 뜨면 Docs 페이지에서 스토리들이 서로의 토스트를 덮습니다([`ConfirmModal`](./confirm-modal.md)과 같은 이유).

| 스토리      | 보는 것                                                               |
| ----------- | ----------------------------------------------------------------------- |
| `Default`   | A · D · 로딩 · 예외(마감 경과) · 전부 닫기                              |
| `Highlight` | `toast.show` 경로에서도 `<strong>`이 통과하는 것 — 앞쪽 · 문장 중간      |
| `Feedback`  | `FeedbackToast` 4종                                                     |
| `Priority`  | A 중 새 A · A 중 D · D 세 번 연속 — **정책 우선순위가 눈에 보이는 자리** |
| `CtaOffset` | `:root`에 `--toast-offset`을 걸었을 때 CTA 위로 올라가는 것              |

**토스트는 스토리 프레임이 아니라 캔버스 하단에 뜹니다.** 컨테이너가 `fixed`고 `Portal`이 `#portal`을 못 찾으면 `document.body`로 폴백하기 때문이며, 실제 동작 그대로라 프레임 안에 가두지 않았습니다.

**Docs 페이지에서는 `Toaster`가 스토리 수만큼(5개) 마운트됩니다.** 데코레이터가 스토리마다 하나씩 렌더하고 `preview.tsx`가 `tags: ['autodocs']`라 다섯 스토리가 동시에 삽니다. 스토어는 모듈 스코프 하나라 **같은 토스트가 같은 자리에 다섯 겹으로 그려집니다** — 테두리·그림자가 진해 보이고 보조기술은 다섯 번 읽습니다. **정책 확인은 Canvas 탭에서 합니다.** 겹침을 없애려면 스토리마다 iframe(`docs.story.inline: false`)을 쓰거나 `Toaster`를 싱글턴으로 만들어야 하는데, 앞은 Docs 로딩이 네 배가 되고 뒤는 「앱 루트에 한 번」이라는 전제를 코드로 방어하는 것이라 **이 티켓에서는 넣지 않았습니다.**

`iconKey` · `weight` argType은 `Icon.stories`에서 가져와 `description`만 걷어냅니다 — `IconCircle` · `NotificationCard`와 같은 방식입니다.
