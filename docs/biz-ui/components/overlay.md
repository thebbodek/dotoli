# Overlay 구현 기록

`apps/biz-ui/src/components/shared/Overlay` · `apps/biz-ui/src/components/Portal` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 Overlay 고유 사실만 둡니다.

Figma에는 `Overlay`라는 심볼이 없습니다. **딤 · 위치 · 스크롤 잠금은 BottomSheet와 ConfirmModal 두 섹션에 각각 그려져 있고, 그중 겹치는 부분만 뽑아낸 것이 이 컴포넌트입니다.**

- [BottomSeet 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=159-1084&m=dev) (`159:1084`) — 딤 사각형 `334:3390`, `dimmed` 축 `598:1861` / `598:1862`
- [ConfirmModal 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=75-4784&m=dev) (`75:4784`) — 딤 사각형 `337:3580` · `337:3633`

## 구현 현황

| 컴포넌트  | 티켓       | 위치                          | 공개    | 설명                                                          |
| --------- | ---------- | ----------------------------- | ------- | ------------------------------------------------------------- |
| `Portal`  | DOTOLI-239 | `components/Portal/`          | ✅ 공개 | `#portal` 컨테이너로 보내는 래퍼. 없으면 `document.body` 폴백 |
| `Overlay` | DOTOLI-239 | `components/shared/Overlay/`  | ❌ 비공개 | 딤 · 위치 · 스크롤 잠금 · 배경 탭 · **ESC** · **초기 포커스**(DOTOLI-265) |

BottomSheet · ConfirmModal 실물은 이 티켓 범위가 아니었습니다. 여기서는 **둘이 공유하는 껍데기만** 만들었습니다.

**DOTOLI-265에서 [`ConfirmModal`](./confirm-modal.md)이 첫 실물로 나왔고, 그때 ESC 처리(`useEscapeCloseEffect`)가 이 폴더에 추가됐습니다** — BottomSheet도 같은 동작이 필요해 실물이 아니라 껍데기에 뒀습니다. BottomSheet는 아직 없습니다.

## Variant 축

| 축         | 값                          | 출처                              |
| ---------- | --------------------------- | --------------------------------- |
| `variant`  | `modal` · `bottom-sheet`    | **Figma 축이 아님** — 내부 배선   |
| `isDimmed` | `true`(기본) · `false`      | BottomSheet 세트의 `dimmed` 축     |

`modal`에는 `dimmed` 축이 없습니다 — ConfirmModal 섹션 주석 `337:3663`이 「\*팝업시 dimmed」로 단정합니다. 축이 있는 쪽은 바텀시트뿐이라 **prop 기본값을 `true`로 두고 바텀시트만 내려서 씁니다.**

**`variant`는 Figma에 없는 축이고 위치 · 애니메이션 클래스 4개를 담는 사적 배선입니다.** 공개 API가 아니라 정당화 부담이 없지만, **위치와 애니메이션이라는 독립적인 두 관심사를 한 union에 묶고 있어** 조합이 표현되지 않습니다(「가운데인데 다른 모션」 불가). internal-ui에서도 같은 축이 반쯤 비어 있습니다 — `OVERLAY_CONTENT_SIZE`가 3개 중 2개가 빈 문자열입니다.

없애는 것도 가능합니다. `<dialog>`를 그냥 `flex`로 두고 콘텐츠가 auto margin으로 자리를 잡으면 동일합니다 — Storybook 렌더로 실측했고 `m-auto`는 정확히 중앙(x·y), `mt-auto w-full`은 bottom 고정 + 전체 폭이 나옵니다. **BottomSheet 실물을 만들 때 `contentClassName`만으로 충분한지 보고 그때 정리합니다.**

## 실측 스펙

### 딤

| 항목      | Figma                    | 구현                       |
| --------- | ------------------------ | -------------------------- |
| 색        | `gray/700` (`#4c566e`)   | `--color-dim`              |
| 레이어 투명도 | 60%                  | 위 토큰에 합쳐 넣음        |
| 블렌드    | `multiply`               | **옮기지 않음** (아래 결정) |

`334:3390`(바텀시트) · `337:3580` · `337:3633`(모달) 세 사각형이 전부 같은 값입니다. Storybook 렌더의 계산값은 `color(srgb 0.298039 0.337255 0.431373 / 0.6)` = `#4c566e` 60%로 일치합니다.

### 모션

| 항목            | 값                                    |
| --------------- | ------------------------------------- |
| BottomSheet duration | 250ms (Figma 주석 `337:3980`)    |
| easing          | `cubic-bezier(0, 0, 0.5, 1)` — internal-ui 값 차용 |

`--animate-fade-in`(딤) · `--animate-bottom-sheet`(아래에서 위) · `--animate-popup`(모달)을 추가했습니다. 키프레임은 internal-ui와 같고 **duration만 0.2s → 0.25s로 Figma 실측에 맞췄습니다.** `popup`에는 internal-ui에 없는 `opacity` 트랙을 더했습니다 — 모달은 이동 거리가 1rem뿐이라 페이드가 없으면 등장이 눈에 띄지 않습니다.

## 결정

- **`mix-blend-multiply`를 옮기지 않았습니다.** Figma 딤 레이어는 multiply지만, 이 오버레이는 포털 + `z-index: 1000`이라 **자기 자신이 stacking context**입니다. 그 안에서 `mix-blend-mode`는 아래 페이지가 아니라 그룹 내부의 투명 배경과 섞여, 결과가 `rgba` 한 겹과 같아집니다. 섞을 대상까지 끌어오려면 z-index를 포기해야 하는데 오버레이에서는 불가능합니다. **흰/`gray-50` 배경 위에서는 multiply와 결과가 동일하므로**(multiply(x, #fff) = x) 모바일 페이지 기준으로 시각 차이가 없습니다. 짙은 배경 화면이 생기면 이 결정부터 다시 봅니다.
- **`--color-dim`을 새 토큰으로 만들었습니다.** Figma에 `dim`이라는 컬러 변수는 없고 `gray/700` + 투명도 60%의 조합입니다. `bg-gray-700/60`을 그냥 쓰면 60%가 컴포넌트마다 흩어지므로, **역할 토큰 하나로 묶되 값은 `gray-700`에서 파생**시켰습니다 — `color-mix(in srgb, var(--color-gray-700) 60%, transparent)`. hex를 다시 적지 않아 팔레트가 바뀌면 딤도 따라갑니다. 「컬러 이름은 Figma 명명 그대로」 규칙의 예외가 아닙니다 — `blue`를 `primary`로 개명하는 것과 달리 **기존 색의 개명이 아니라 없던 역할의 신설**입니다.
- **`--color-dim`은 `COLOR_VARIANTS`에 넣지 않았습니다.** 팔레트 색이 아니라 역할 토큰이고, `Typography`의 `color`로 글자에 쓸 일이 없습니다. `Colors` 스토리도 팔레트만 훑습니다.
- **딤이 없어도 배경 레이어는 항상 깔립니다.** `isDimmed=false`일 때 색만 빠지고 `absolute inset-0`은 남습니다. 뒤 페이지와의 상호작용을 막아야 하는 건 딤 여부와 무관하고, **배경 탭으로 닫는 동작도 `dimmed=false`인 짧은 바텀시트에 똑같이 필요**하기 때문입니다 (Figma 정책 `524:28` COM-008).
- **배경 탭은 `onClose`만 부르고 무엇을 할지는 정하지 않습니다.** 주석 `526:1725`는 「dimmed 영역 탭도 닫기와 동일하게 진행한다」지만, COM-008은 **입력값이 하나라도 있으면 닫는 대신 이탈 모달을 띄우라**고 합니다. 두 판정 축(딤 = 화면 점유율, 이탈 모달 = 입력값 유무)이 분리돼 있어 **Overlay가 닫기를 직접 수행하면 이탈 방지를 구현할 수 없습니다.** 콜백만 넘기고 판단은 BottomSheet/ConfirmModal 쪽에 둡니다.
- **배경 레이어는 `onClose`가 있을 때만 `<button>`입니다.** 없으면 `<div aria-hidden>`입니다. 항상 버튼으로 두면 아무 동작도 없는 「닫기」 버튼이 스크린리더에 읽힙니다.
- **`<dialog>`를 씁니다 — internal-ui와 같습니다.** `open` 속성만 준 non-modal이라 top layer · 포커스 트랩이 없고(**ESC도 UA가 주지 않아 DOTOLI-265에서 직접 답니다**), 얻는 건 암묵 `role="dialog"`뿐입니다. 대신 UA 기본 스타일을 전부 되돌려야 해서 `m-0 max-h-none max-w-none bg-transparent p-0`이 붙습니다 (`base.css`가 v3 호환으로 `dialog { margin: auto }`를 되살려 둔 것도 포함). 자매 DS와 마크업이 갈리는 비용이 이 클래스 5개보다 크다고 봤습니다.
- **`aria-modal`을 붙이지 않습니다.** 전면 배경 레이어가 뒤를 막는 건 **포인터 입력뿐**입니다 — non-modal `<dialog>`라 top layer도 `inert`도 없어서 **Tab 포커스는 배경 페이지로 그대로 빠져나갑니다.** 여기에 `aria-modal`을 붙이면 보조기술이 바깥을 읽기 대상에서 제외하므로 「포커스는 가 있는데 읽히지는 않는 요소」가 생깁니다. ARIA는 `aria-modal` 사용 시 바깥을 실제로 inert로 만들 것을 요구하므로, **포커스 트랩이 생기기 전까지는 붙이지 않는 쪽이 맞습니다.** internal-ui도 오버레이 계열 전체에 `aria-modal`이 없습니다.
- **접근성 이름은 소비자가 붙입니다.** `<dialog>`가 암묵 `role="dialog"`를 갖는데 이름이 없으면 스크린리더가 "dialog"만 읽습니다. 이름은 BottomSheet · ConfirmModal이 가진 제목에서 나와야 하므로 Overlay가 정하지 않고, `aria-label` · `aria-labelledby`만 `Pick`으로 열어 `<dialog>`에 그대로 넘깁니다. internal-ui는 `...rest` 전체를 스프레드해서 같은 통로가 열려 있지만 **실제로 쓰는 곳이 한 군데도 없습니다** — biz-ui는 두 속성으로 좁혀 무엇을 넘기라는 건지 타입에서 보이게 했습니다.
- **children을 `cloneElement`로 건드리지 않습니다.** internal-ui `Overlay`는 자식의 `className`에 variant 스타일을 주입하는데, 자식이 반드시 단일 엘리먼트여야 하고 주입 사실이 호출부에서 안 보입니다. biz-ui는 **콘텐츠 래퍼 `<div>`를 Overlay가 직접 렌더**하고 필요하면 `contentClassName`으로 엽니다. internal-ui의 같은 자리 이름은 `wrapperClassName`인데, 그쪽은 **주입 대상이 호출부가 넘긴 자식**이라 "감싸는 것"이라는 뜻이 맞습니다. 여기서는 Overlay가 만든 래퍼 자신이라 `content` 쪽이 정확합니다.
- **`Overlay`는 `components/shared/`에 두고 공개하지 않습니다.** 소비자의 진입점은 BottomSheet · ConfirmModal이고 껍데기는 그 둘이 물어 씁니다. 근거는 어드민 소비 앱(`bbodek-internal`) 실측입니다 — internal-ui 오버레이 컴포넌트를 **57번**(`FormDialog` 25 · `StepDialog` 9 · `ConfirmModal` 7 · `InfoDialog` 5 · `SideSheet` 4 · 나머지 7) 쓰면서도 **껍데기 `Overlay`를 직접 만진 적은 0번**이고, **DS를 우회해 오버레이를 직접 만든 적도 0번**입니다(`createPortal` 0 · `<dialog` 0 · 자체 딤 0). 필요한 모양은 DS가 컴포넌트를 추가하는 쪽으로 전부 해결됐습니다. 공개는 되돌리기 비대칭이라 필요가 확인되면 그때 엽니다 — 규칙은 [CLAUDE.md](../../../apps/biz-ui/CLAUDE.md) 「코드 규칙 1」의 `shared` 표입니다.
- **`Portal`은 반대로 공개합니다.** internal-ui도 루트 배럴에서 `Portal`을 내보내고 스토리도 갖고 있습니다. 소비 앱이 오버레이 밖에서도 포털이 필요할 수 있고, `Overlay`와 달리 **DS의 시각 표면을 열지 않습니다.**
- **`Portal`은 타깃이 없으면 `document.body`로 폴백합니다.** internal-ui는 `null`을 반환해, 소비 앱이 `<div id="portal">`을 빠뜨리면 **오버레이가 조용히 안 뜹니다.** 원인을 찾기 어려운 실패라 폴백을 뒀습니다. 같은 이유로 **`typeof document === 'undefined'` 가드도 더했습니다** — internal-ui에는 없지만 biz-ui는 `next`가 peerDependency라 서버에서 한 번 평가될 수 있고, 가드가 없으면 렌더 중 `document` 접근으로 터집니다.
- **스크롤 잠금 훅을 Overlay 안에 뒀습니다.** `@bbodek/hooks`의 `useScrollLockEffect`가 같은 일을 하지만, 그걸 물면 `@bbodek/utils` → `@bbodek/internal-ui` 체인이 통째로 딸려옵니다 ([frontend.md](../frontend.md) 「특이사항」). 옮기면서 두 가지를 고쳤습니다.
  - **원래 `overflow` 값을 저장했다 복원합니다.** 원본은 해제 시 `'auto'`를 하드코딩해서, 잠그기 전 값이 그게 아니었으면 되돌아가지 않습니다.
  - **모듈 스코프 카운터로 중첩을 셉니다.** 인스턴스마다 값을 따로 들면 오버레이 두 개가 겹쳤을 때 **먼저 닫힌 쪽이 아직 열려 있는 쪽의 잠금까지 풉니다.** biz-ui는 COM-008 때문에 「바텀시트 위 이탈 ConfirmModal」이 설계상 기본 경로라 반드시 닿습니다. internal-ui도 같은 중첩(`StepDialog` + `StepDialogConfirmModal`, `StepFullScreenDialog` + `ConfirmBottomSheet`)이 있고 **거기서는 이 버그가 살아 있습니다** — 데스크톱이라 뒤 페이지가 조금 밀리는 정도지만, WebView에서는 러버밴드까지 겹쳐 체감이 큽니다.
- **닫힘 애니메이션은 없습니다.** `isOpen=false`면 즉시 언마운트합니다. internal-ui도 같고, 넣으려면 종료 상태를 들고 있어야 해서 이 티켓 범위 밖입니다.

## API

### `Overlay`

| prop               | 필수 | 기본값     | 비고                                            |
| ------------------ | ---- | ---------- | ----------------------------------------------- |
| `variant`          | ✅   | —          | `modal` · `bottom-sheet`                        |
| `isOpen`           | ✅   | —          | `false`면 언마운트                              |
| `isDimmed`         |      | `true`     | `false`여도 배경 레이어는 남음                  |
| `target`           |      | `'portal'` | `Portal`로 전달                                 |
| `onClose`          |      | —          | **배경 탭 · ESC**. 없으면 배경이 `<div aria-hidden>` |
| `aria-label`       |      | —          | `<dialog>`로 전달. 제목이 있으면 `aria-labelledby` 쪽 |
| `aria-labelledby`  |      | —          | `<dialog>`로 전달                               |
| `className`        |      | —          | `<dialog>`에 적용                               |
| `contentClassName` |      | —          | 콘텐츠 래퍼에 적용                              |

### `Portal`

| prop     | 필수 | 기본값     | 비고                                    |
| -------- | ---- | ---------- | --------------------------------------- |
| `target` |      | `'portal'` | 못 찾으면 `document.body`               |

## 디자인 확인 필요

| 항목              | 내용                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------ |
| 모달 모션         | duration · easing이 Figma에 없습니다. 바텀시트 250ms를 그대로 썼습니다                       |
| 모션 easing       | 250ms만 주석으로 있고 커브는 없습니다. internal-ui의 `cubic-bezier(0, 0, 0.5, 1)`을 썼습니다  |
| 닫힘 모션         | 여는 모션만 정의돼 있습니다                                                                 |
| 딤 위 짙은 배경   | multiply를 못 옮긴 건이 문제가 되는 화면(짙은 배경)이 있는지                                |

## 후속 티켓 판단 기준 — `overlay-kit`을 peerDependency로 넣을지

biz-ui는 `overlay-kit`에 의존하지 않습니다. **DOTOLI-265에서 「넣지 않는다」로 결정됐습니다** — 아래 기준 1번(「biz-ui 컴포넌트가 자기 안에서 다른 오버레이를 여는가」)에 `ConfirmModal`이 해당하지 않고, 따라서 기준 2번도 성립하지 않습니다. BottomSheet에서 다시 볼 수 있으므로 기준은 그대로 둡니다.

### 「많이 쓰인다」는 근거가 되지 않습니다

소비 앱이 오버레이를 많이 여는 것과 DS가 의존을 선언하는 것은 **층이 다릅니다.** 어드민 소비 앱(`bbodek-internal`)을 실측한 결과입니다.

| 항목                         | 실측                                                                 |
| ---------------------------- | -------------------------------------------------------------------- |
| `overlay.open*` 호출         | **115군데 / 110개 파일**                                             |
| 앱의 `overlay-kit` 출처      | 앱 **자기 `dependencies`**(`^1.7.0`, 설치 1.9.0). internal-ui peerDep에 얹힌 게 아님 |
| `OverlayProvider`            | 앱의 `src/pages/_app.tsx`                                            |
| `overlay.open`이 여는 대상   | 전부 **앱 컴포넌트**. internal-ui export를 직접 여는 곳 **0건**       |
| `OverlayAsyncProps`          | 앱이 **자체 정의**(`@/core/types`). internal-ui 것을 안 가져감        |

**internal-ui가 그 훅 2개를 지우고 의존을 떼도 115군데는 하나도 안 깨집니다.** internal-ui가 peerDependency를 선언한 이유는 자기 코드가 직접 import 하기 때문이고, 그 지점은 [`useStepDialogConfirmModal`](../../../apps/internal-ui/src/components/Dialog/StepDialog/StepDialogConfirmModal/hooks/useStepDialogConfirmModal.tsx)과 `useStepFullScreenDialogConfirmBottomSheet` 2건뿐이며 **둘 다 export 되지 않습니다.**

### 기준은 둘

1. **biz-ui 컴포넌트가 자기 안에서 다른 오버레이를 여는가.** 곧 「COM-008 이탈 모달을 BottomSheet가 스스로 띄우는가, 소비 앱이 띄우는가」입니다. 소비 앱이 진다면 여기서 끝이고 의존은 필요 없습니다 — 지금 Overlay가 `onClose` 콜백만 넘기는 구조라 기본값이 이쪽입니다.
2. **연다면, 결과를 `await` 해야 하는가.** `overlay-kit`이 `useState` + 조건부 렌더를 이기는 지점은 `openAsync`의 `Promise` 반환 **하나**뿐입니다. 콜백으로 되면 `useState`가 더 쌉니다. 같은 앱에서 `open` **104** vs `openAsync` **11**이라 대부분은 `useState` 영역입니다.

### 넣기로 했을 때 따라오는 것

- `optional: true`로 둘 수 없습니다 — 코드가 실제로 import 하므로 없으면 런타임에 터집니다 (`next`와 다릅니다).
- `rollup.config.mjs`의 `external`에 함께 넣어야 합니다 (CLAUDE.md 「패키징 규칙」). internal-ui도 `external: ['overlay-kit']`입니다.
- README 「Peer Dependencies」에 `OverlayProvider` 래핑 안내가 필요합니다. **internal-ui README에는 이 안내가 없어** 소비 앱이 알아서 알아낸 상태입니다.
- 소비 앱이 이미 관리하던 라이브러리의 **버전 범위를 DS가 추가로 묶습니다.** 실제로 internal-ui는 `^1.8.6`인데 앱은 `^1.7.0`이라, 1.9.0으로 해소돼 조용할 뿐 어긋나 있는 선언입니다.
- **넣었다 빼면 소비 앱이 깨집니다.** 나중에 추가하는 건 쉽습니다. 반반이면 안 넣는 쪽이 되돌리기 쌉니다 — `Portal`의 `document.body` 폴백과 같은 방향입니다.

### DX 근거(「래퍼 반복이 귀찮다」)를 검토한다면

DS가 `openConfirm(...) => Promise<boolean>` 같은 걸 제공하는 안은 별개로 타당하지만, 같은 앱에서 **DS가 대신 열어 줄 수 있는 Confirm 형태는 5종 5회**뿐입니다. 나머지는 `dynamic()` + 도메인 컴포넌트라 **무엇을 열지를 DS가 알 수 없습니다.**

## 확인 필요 (구현)

- **~~비공개인 동안 Overlay의 클래스는 CSS에 생성되지 않습니다~~ — DOTOLI-265에서 해소됐습니다.** `ConfirmModal`이 `Overlay`를 import 하면서 `bg-dim` · `animate-fade-in` · `animate-popup` · `animate-bottom-sheet` · `z-[1000]` 5개가 전부 `dist`로 복귀한 것을 확인했습니다([confirm-modal.md](./confirm-modal.md) 「검증」). 아래는 당시 기록입니다.

  **비공개인 동안 Overlay의 클래스는 CSS에 생성되지 않습니다 — 정상이고 고치지 않습니다.** 배럴에서 빠지면 런타임 코드가 `dist/index.es.js`에서 트리셰이킹되고, `@source '../../dist'`가 스캔할 리터럴도 함께 사라집니다. Storybook CSSOM으로 확인한 결과 `.bg-dim` · `.animate-fade-in` · `.animate-popup` · `.animate-bottom-sheet` · `.z-[1000]` **전부 0건**입니다. `--color-dim` 토큰과 키프레임 3종은 `theme.css`에서 나오므로 그대로 있습니다.

  **BottomSheet · ConfirmModal이 Overlay를 import 하면 저절로 풀립니다.** 임시로 `components/shared`를 배럴에 넣고 재빌드해 4개 리터럴이 전부 `index.es.js`로 복귀하는 것을 확인했습니다.

  못 쓰는 컴포넌트의 스타일이 없는 것이라 **상태가 어긋난 게 아닙니다.** safelist로 막지 않습니다 — 「런타임에 조합되는 클래스만 보존」 규칙에 어긋나고, npm 소비 앱이 쓸 수 없는 CSS를 받게 됩니다.

  `.d.ts`에는 일부 리터럴이 타입으로 남지만(`OVERLAY_DIM_STYLE`처럼 타입 주석 없는 `const`) **Tailwind가 그것으로 유틸리티를 만들지는 않습니다.** 위 0건이 그 증거입니다.
- **포커스 트랩이 없습니다.** 배경 레이어가 포인터만 막고 Tab은 뒤 페이지로 빠집니다. 그래서 `aria-modal`을 붙이지 않았고(위 「결정」), 트랩을 넣게 되면 `aria-modal`도 같이 붙입니다. internal-ui도 같은 상태입니다.

  **초기 포커스는 DOTOLI-265에서 넣었습니다.** `<dialog>`에 `tabIndex={-1}`을 주고 열릴 때 포커스를 옮기며, 닫히면 직전 요소로 되돌립니다. non-modal이라 UA가 해 주지 않는데, **그대로 두면 스크린리더가 다이얼로그가 열린 사실을 통지받지 못한 채** 배경을 계속 읽습니다. 배경을 inert로 만드는 주장이 아니라서 `aria-modal` 미부착 결정과 충돌하지 않습니다.
- **iOS WebView 스크롤 잠금.** `body { overflow: hidden }` 방식이라 iOS Safari 계열에서 완전히 막히지 않을 수 있습니다. `base.css`의 `overscroll-behavior: none`과 함께 실기기에서 확인이 필요하고, 새면 `position: fixed` + 스크롤 위치 복원으로 바꿉니다.
- **ESC는 DOTOLI-265에서 처리했습니다 — 요구가 아니라 구현 판단입니다.** COM-008이 나열한 것은 「뒤로 · 물리 뒤로가기 · 닫기 · 배경 탭」 **4개뿐이고 ESC는 없습니다**(모바일 WebView 타깃). Figma 주석에도 없고, `@bbodek/internal-ui`도 오버레이 계열에 **ESC 처리가 0건**입니다. 그 「동일하게 처리」 원칙을 ESC까지 **확장 적용**한 것이고, 판단 근거와 빼는 비용은 [confirm-modal.md](./confirm-modal.md) 「결정」에 있습니다.

  non-modal `<dialog>`라 UA가 ESC를 주지 않으므로 `document`에 리스너를 답니다(`useEscapeCloseEffect`). 배경 탭과 같은 `onClose`로 흘려 「동일 처리」와 결을 맞췄습니다.

  **중첩에서는 최상단만 닫힙니다 — 판정 기준은 DOM 순서입니다.** 열린 `<dialog>`에 `data-overlay`를 달고, keydown 때 `document.querySelectorAll('dialog[data-overlay]')`의 **마지막 요소가 자기일 때만** `onClose`를 부릅니다. 그렇게 하지 않으면 「바텀시트 위 이탈 ConfirmModal」에서 ESC 한 번에 둘 다 닫힙니다.

  **모듈 스코프 스택으로 짰다가 버렸습니다.** 토큰을 `useEffect`에서 push 하면 순서가 「연 순서」가 아니라 **effect flush 순서**가 되는데, React는 자식 effect를 부모보다 먼저 실행하므로 두 오버레이가 **한 커밋에서 같이 열리면** 스택이 뒤집혀 아래쪽이 닫힙니다. 딥링크 복원처럼 두 `isOpen`이 한 번에 켜지는 경로가 실제로 있습니다. **DOM 순서는 z-index가 같을 때 실제로 위에 그려지는 순서와 일치**하므로 「시각적 최상단」과 판정이 어긋나지 않습니다.

  `onClose`는 ref로 들어 effect 의존성에서 뺐습니다 — 인라인 화살표를 받으면 렌더마다 identity가 바뀌어 리스너가 매번 재등록됩니다. **`onClose`가 없어도 리스너는 등록합니다.** 닫히면 안 되는 오버레이가 위에 있을 때 ESC가 아래쪽으로 새지 않게 하려는 것이고, 이 경우 최상단 판정만 통과하고 아무 일도 일어나지 않습니다.

  **IME 조합 중에는 무시합니다**(`event.isComposing`). 한글 입력 중 ESC는 조합 취소가 기대 동작인데 그대로 잡으면 오버레이가 닫힙니다.

- **Android 물리 뒤로가기는 여전히 없고, DS가 하지 않기로 했습니다.** `history.pushState` + `popstate` 외에 방법이 없는데 **라우팅 히스토리를 DS가 건드리는 것**이라 소비 앱의 뒤로가기 흐름과 충돌합니다. 근거는 [confirm-modal.md](./confirm-modal.md) 「결정」에 있습니다.

## Storybook

**`Overlay` · `Portal` 모두 스토리를 두지 않습니다.** 기준은 공개 여부가 아니라 **시각 표면이 있는가**입니다.

- `Overlay`는 비공개 껍데기라 BottomSheet · ConfirmModal 스토리가 시각 검증을 대신합니다.
- `Portal`은 공개지만 **볼 것이 없습니다.** 「DOM 위치가 바뀐다」는 스크린샷이 아니라 DOM 검사로 확인되는 사실이라 스토리로 만들면 오히려 헷갈립니다 — 실제로 `#portal`이 스토리보다 먼저 렌더돼서 옮겨진 상자가 트리거 **위에** 떴습니다. internal-ui에는 `Portal` 스토리가 있지만 **소비 앱이 `Portal`을 임포트한 곳은 0건**이라 따라갈 근거가 못 됩니다.

착수 시점에는 Overlay 스토리 3종(`Default` · `Variants` · `Dimmed`)을 만들었다가 비공개 결정과 함께 걷어냈습니다. **두 컴포넌트가 없어 콘텐츠를 스토리 로컬 스타일(`rounded-t-16 shadow-30` 등)로 흉내 내고 있었는데, 실물이 생기면 값이 갈려 스토리가 거짓말을 하게 됩니다.** 껍데기를 다시 시각화할 일이 생기면 가짜 콘텐츠 대신 실물을 children으로 넣습니다.

Portal 동작은 Storybook 렌더로 직접 확인했습니다 — 콘텐츠가 원래 위치를 떠나 `#portal` 아래로 옮겨지고, 없는 id를 주면 `document.body`로 폴백해 그대로 렌더됩니다(internal-ui는 `null` 반환).
