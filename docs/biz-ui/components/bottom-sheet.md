# BottomSheet 구현 기록

`apps/biz-ui/src/components/BottomSheet` 구현 기록입니다. 공통 개발 규칙은 [`apps/biz-ui/CLAUDE.md`](../../../apps/biz-ui/CLAUDE.md)를 따르고, 여기에는 이 컴포넌트 고유 사실만 둡니다.

Figma: [BottomSeet 섹션](https://www.figma.com/design/IGi6n6Cz0bB54WWlhivIOH/-Design-system--BIZpartner?node-id=159-1084&m=dev) (`159:1084`) 안의 `Set` 프레임 `302:1390`, 컴포넌트 세트 `598:1863`, 심볼 `598:1862`(dimmed=false) · `598:1861`(dimmed=true).

**비공개 껍데기 [`Overlay`](./overlay.md)의 두 번째 실물입니다.** [`ConfirmModal`](./confirm-modal.md)이 DOTOLI-265로 먼저 나가면서 ESC · 초기 포커스 · 스크롤 잠금이 이미 `Overlay`에 들어가 있어, 이번 티켓은 **껍데기에 아무것도 더하지 않았습니다.**

## 구현 현황

| 컴포넌트      | 티켓       | 설명                                                    |
| ------------- | ---------- | ------------------------------------------------------- |
| `BottomSheet` | DOTOLI-270 | `dimmed` 축 그대로. 헤더 고정 + 바디 스크롤. 단독 폴더  |

## Variant 축

| 축       | Figma 값          | 구현                          |
| -------- | ----------------- | ----------------------------- |
| `dimmed` | `false`(기본) · `true` | `isDimmed` — `Overlay`로 전달 |

축이 하나뿐이고 파생시킬 것도 없습니다. **`dimmed`는 화면 점유율로 정해지는 값**이라 다른 prop에서 나오지 않습니다.

| `dimmed` | 주석(`504:1724` · `504:1725`)                        |
| -------- | ---------------------------------------------------- |
| `false`  | 화면의 절반 **이하**를 차지하는 짧은 바텀시트         |
| `true`   | 화면의 절반 **이상**을 차지하거나 세로 스크롤이 필요한 바텀시트 |

## 실측 스펙

| 항목       | 값                                                                    |
| ---------- | --------------------------------------------------------------------- |
| 시트       | `w-full` · `rounded-t-16` · `bg-white`                                 |
| 그림자     | `0 11px 30px rgb(51 60 81 / 0.3)` → **`shadow-30`**                     |
| 헤더       | `HeaderBar` `type='bottomSheet'` — 54px · `px-[20px]` · `rounded-t-16` |
| 제목       | `body-bold` · `gray/800`                                               |
| 닫기       | `label-bold`(14) · `gray/800` + `X` 14 `gray/400` · gap 2 · `rounded-6` |
| 딤         | `gray/700` 60% → **`bg-dim`** (`--color-dim`과 정확히 일치)            |
| 모션       | 250ms (섹션 주석 `337:3980`) → `animate-bottom-sheet` (0.25s)          |

`dimmed=false` 심볼 380 × 346이 `54 + 200 + 92`로 떨어집니다 — 헤더 54 · 바디 200 · `BottomActionBar` 92입니다. 200은 슬롯 샘플(`middleBody`)의 크기라 스펙이 아닙니다.

### 기존 것으로 전부 덮였습니다 — 신규 토큰·신규 베이스가 없습니다

| 필요한 것        | 이미 있는 것                                        | 출처                      |
| ---------------- | --------------------------------------------------- | ------------------------- |
| 하단 정렬 · 딤   | `Overlay` `variant='bottom-sheet'`                   | DOTOLI-239                |
| 등장 모션 250ms  | `--animate-bottom-sheet: 0.25s cubic-bezier(0,0,.5,1)` | DOTOLI-239             |
| 딤 색            | `--color-dim` = `gray-700` 60%                       | DOTOLI-239                |
| 헤더             | `HeaderBar` `type='bottomSheet'` + `onClose`         | DOTOLI-250                |
| 그림자           | `--shadow-30`                                        | 기존 토큰                 |
| 스크롤           | `scroll-y` 유틸                                      | 기존 유틸                 |

**`Overlay`의 `animate-bottom-sheet`가 이번에 처음 실제로 쓰입니다.** [`confirm-modal.md`](./confirm-modal.md)가 「`OVERLAY_CONTENT_STYLES`가 두 variant를 한 객체에 들고 있어 BottomSheet가 없어도 리터럴이 살아난다」고 적어 둔 클래스입니다.

### 그림자는 `drop-shadow` 표기를 되돌려 판정했습니다

codegen이 `drop-shadow-[0px_11px_15px_rgba(51,60,81,0.3)]`로 뽑는데, CSS `filter: drop-shadow()`는 **표준편차를 쓰므로 Figma blur의 절반**입니다. 되돌리면 blur 30이고 offset·색이 `--shadow-30`(`0 11px 30px rgb(51 60 81 / 0.3)`)과 정확히 같습니다. 토큰 이름의 30도 blur입니다.

`@bbodek/internal-ui`의 `BottomSheet`도 `shadow-in-30`이라 **두 DS가 같은 단계를 씁니다** (그쪽 근거는 그쪽 Figma이므로 값 일치는 확인용으로만 봅니다).

## 정책

섹션 안 주석 `524:26`이 **COM-008 이탈 방지**를 정의합니다.

> `dimmed` 값과 이탈 모달은 **서로 다른 축으로 판정한다.**
> - `dimmed` — 화면 점유율로 결정
> - 이탈 모달 — **입력값 존재 여부**로 결정
>
> 배경 탭 시 — 입력값 없음: 바텀시트 닫힘 / 입력값 1개 이상: 이탈 모달 노출 (`dimmed` 유무와 무관)
>
> 대상 트리거 — 뒤로 · Android 물리 뒤로가기 · 닫기 · 배경 탭 **모두 동일하게 처리한다.**

주석 `526:1725`도 같은 말을 합니다 — 「dimmed 영역 탭도 닫기와 동일하게 진행한다」.

## 결정

- **COM-008의 「동일 처리」를 `onClose` 하나로 모았습니다.** 헤더 닫기 · 배경 탭 · ESC가 전부 같은 콜백으로 흐릅니다. 배경 탭과 ESC는 `Overlay`가 이미 그렇게 하고 있었고, 헤더 닫기를 같은 자리에 붙인 것이 이번 몫입니다.

  **이탈 모달을 띄우는 것은 소비 앱입니다.** 「입력값 1개 이상」을 DS가 알 수 없습니다 — 바디가 통째로 `children`이라 그 안에 무엇이 들었는지 모릅니다. `onClose` 안에서 소비 앱이 판정해 [`ConfirmModal`](./confirm-modal.md)을 띄웁니다. `ConfirmModal`이 COM-011을 코드로 강제하지 않은 것과 같은 선입니다.

- **`overlay-kit`을 넣지 않는 것으로 확정했습니다.** [overlay.md](./overlay.md) 「후속 티켓 판단 기준」이 「BottomSheet에서 다시 볼 수 있으므로 기준은 그대로 둔다」고 남겨 둔 자리입니다. 기준 1(「biz-ui 컴포넌트가 **자기 안에서** 다른 오버레이를 여는가」)에 **BottomSheet도 해당하지 않습니다** — 바로 위 결정대로 이탈 모달을 소비 앱이 띄우기 때문입니다. 기준 2(`await` 필요 여부)도 따라서 성립하지 않습니다.

  **오버레이 실물 2종이 모두 「아니오」로 끝났으므로 기준을 다시 볼 티켓이 남아 있지 않습니다.**

- **Android 물리 뒤로가기는 구현하지 않았습니다.** `ConfirmModal`과 같은 이유입니다 — `history.pushState` + `popstate`뿐인데 라우팅 히스토리를 DS가 건드리게 되고, biz-ui는 `next`가 optional peerDependency라 라우터를 알 수도 없습니다. COM-008이 트리거로 명시했지만 **소비 앱 책임**으로 둡니다.

- **`isDimmed` 기본값은 `true`입니다.** Figma는 **기본 variant를 지정하지 않았고** 대신 판정 규칙만 줍니다(`504:1725` · `504:1724`) — 화면의 절반 이상이거나 세로 스크롤이 필요하면 `true`, 절반 이하 짧은 시트면 `false`. **바디가 통째로 `children`이라 DS는 점유율을 알 수 없으므로** 이 값은 소비자가 정하는 것이고, 기본값은 「안 정했을 때」의 안전판입니다.

  **틀렸을 때 손해가 비대칭이라 `true`를 골랐습니다.** 짧은 시트에 딤이 붙으면 시각이 무거울 뿐이지만, 긴 시트에 딤이 없으면 뒤 페이지와 섞여 **배경이 살아 있는 것처럼 보이는데 스크롤은 잠겨 있어** 고장으로 읽힙니다 — 디자이너가 딤을 지목한 바로 그 경우입니다. `Overlay`의 자체 기본값(`true`) · `ConfirmModal`이 쓰는 값과도 같아져 세 층이 하나로 맞습니다.

  기본값을 `Overlay`에서 물려받지 않고 **여기서 다시 선언한 이유**는, 판정 규칙이 `BottomSheet`에만 걸린 요구사항이라 이 컴포넌트가 자기 기본값을 소유해야 하기 때문입니다. `Overlay`가 나중에 기본을 바꿔도 여기는 흔들리지 않습니다.

- **점유율을 감지하지 않습니다.** 위 주석은 규격이라기보다 **「절반을 넘으면 딤을 넣는다」는 감지 요구**에 가깝습니다. 재는 쪽으로 가면 시트 높이를 측정해 `isDimmed`를 스스로 뒤집어야 하는데, 그러면 **소비자가 넘긴 값과 컴포넌트가 고른 값이 충돌**하고 첫 페인트 뒤에 딤이 켜지는 깜빡임이 생깁니다. **기본 `true` + 소비 앱이 필요할 때 `false`로 내리는 선에서 합의했습니다.**

  **뒤집힐 조건** — 짧은 시트에서 `false`를 넣는 것을 소비 앱이 자주 잊거나, 「절반」 판정이 화면마다 갈려 사람이 정하기 어려워지면 그때 감지를 넣습니다. 그 경우에도 prop을 없애는 게 아니라 **넘긴 값이 우선하고 안 넘겼을 때만 재는 형태**여야 충돌이 없습니다.

- **헤더는 고정, 바디만 스크롤합니다.** 시트가 `flex-v-stack max-h-full`이고 바디가 `flex-1 min-h-0 scroll-y`입니다. `Overlay`가 `fixed inset-0` + `items-end`라 시트가 콘텐츠 높이로 자라는데, **막지 않으면 긴 바디에서 헤더가 화면 위로 밀려 나가 닫기 버튼에 닿을 수 없습니다.** 시각을 더한 것이 아니라 넘침을 막은 것이라 「Figma에 없는 시각은 만들지 않는다」에 걸리지 않습니다.

  `max-h-full`이라 긴 시트는 화면 꼭대기까지 찹니다. Figma 심볼은 위에 79를 남기는데(619 중 540) 그 값을 일반화할 근거가 없어 넣지 않고 「디자인 확인 필요」에 올렸습니다.

- **`BottomActionBar`는 시트가 소유하고 `actionOption`으로 받습니다.** Figma 심볼 안에 인스턴스가 들어 있는 것(`155:851` · `334:3375`)을 그대로 옮긴 것입니다. **스위치가 아니라 데이터 뭉치라 소비자의 결정거리를 늘리지 않습니다** — 넘기면 그리고 안 넘기면 안 그립니다. `HeaderBar`의 `progressOption` · `CtaButton`의 `iconOption`과 같은 형태이고, 소비 방식(`{...actionOption}` 스프레드)도 `HeaderBarProgress`를 따랐습니다.

  **타입은 `BottomActionBarProps`를 그대로 씁니다.** 필드를 다시 나열하면 `variant` 같은 축이 늘 때마다 두 곳을 고쳐야 합니다 — 「타입 중복 금지」 그대로입니다. `variant`가 여기로 딸려 오는 것도 그래서고, 시트 안에서 두 값의 차이가 실제로 갈립니다(아래).

- **액션 바는 시트가 아니라 스크롤되는 바디 안에 넣습니다.** 바디 바깥에 형제로 두면 늘 바닥에 고정돼 **`variant` 두 값이 같아져 버립니다.** Figma는 `floating`을 「영역 내 하단에 Sticky」(`337:3669`) · `solid`를 「scroll with parent」(`337:3671`)로 갈라 놨고, 그 차이는 **스크롤 영역 안에 있어야만** 나타납니다.

  **`Scroll` 스토리에서 실측으로 확인했습니다.** 바디 스크롤포트가 326이고 액션 바가 92인데, 스크롤 위치를 0 · 600 · 끝으로 옮겨도 **바의 상단이 바디 기준 234에 그대로 고정**됩니다(234 + 92 = 326, 즉 스크롤포트 바닥에 정확히 붙음). 같은 동안 첫 블록은 28 → −778로 움직입니다.

- **시트에 `safe-area-bottom`을 걸지 않았습니다.** `@bbodek/internal-ui` `BottomSheet`는 `in-safe-area-bottom`을 시트에 겁니다. 여기서는 바닥에 놓이는 것이 `BottomActionBar`이고 그쪽이 `pb-[28px]`을 이미 갖고 있어, 시트에 또 걸면 두 번 더해집니다. 하단 여백의 주인을 하나로 둔 것이고, 값 자체의 적정성은 [`bottom-action-bar.md`](./bottom-action-bar.md) 「디자인 확인 필요」가 들고 있습니다.

- **접근성 이름은 `aria-label`로 붙입니다.** `ConfirmModal`은 `useId` + `aria-labelledby`인데, 여기 제목은 `HeaderBar` 안에 있고 `HeaderBar`가 제목 id를 밖으로 내주지 않습니다. `title`이 이미 문자열로 들어오므로 `aria-label`이면 충분하고, 그 하나 때문에 `HeaderBar` API를 넓히지 않았습니다.

- **폴더는 단독입니다.** `BottomTab` · `BottomActionBar`와 이름만 겹치고 공유 조각이 없습니다.

## API

| prop        | 필수 | 기본값     | 비고                                                       |
| ----------- | ---- | ---------- | ---------------------------------------------------------- |
| `isOpen`    | ✅   | —          | `false`면 언마운트                                          |
| `title`     | ✅   | —          | 헤더 제목이자 접근성 이름                                   |
| `children`  |      | —          | 바디. 스크롤 영역                                           |
| `actionOption` |   | —          | `BottomActionBarProps` 그대로. 넘기면 바디 끝에 액션 바를 그림 |
| `isDimmed`  |      | `true`     | 화면 절반 이하 짧은 시트면 `false`로 내림                   |
| `onClose`   |      | —          | 헤더 닫기 · 배경 탭 · ESC 공통. 없으면 헤더 닫기 버튼이 안 그려짐 |
| `target`    |      | `'portal'` | `Portal`로 전달                                             |
| `className` |      | —          | 시트에 적용                                                 |

```tsx
// 짧은 바텀시트 — 절반 이하면 딤을 내린다
<BottomSheet isDimmed={false} isOpen={isOpen} title='배송지 선택' onClose={close}>
  <AddressList />
</BottomSheet>

// 긴 바텀시트 + 하단 액션
<BottomSheet
  actionOption={{ confirm: { label: '확인', onClick: submit } }}
  isOpen={isOpen}
  title='주문 상세'
  onClose={close}
>
  <OrderDetail />
</BottomSheet>

// 액션 바가 콘텐츠와 함께 밀려 올라가야 하면 solid
<BottomSheet
  actionOption={{
    confirm: { label: '확인', onClick: submit },
    variant: BOTTOM_ACTION_BAR_VARIANTS.SOLID,
  }}
  isOpen={isOpen}
  title='주문 상세'
  onClose={close}
>
  <OrderDetail />
</BottomSheet>

// COM-008 — 이탈 판정은 소비 앱이 한다
<BottomSheet
  isOpen={isOpen}
  title='조건 조회'
  onClose={() => (hasInput ? openExitModal() : close())}
/>
```

## 디자인 확인 필요

| 항목                 | 내용                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 긴 시트 상단 여백    | 심볼이 619 중 540(위 79 남김)입니다. 구현은 `max-h-full`이라 꼭대기까지 찹니다. 상한을 둘지, 둔다면 79가 일반값인지         |
| 닫힘 모션            | 등장만 정의돼 있습니다(250ms). `Overlay`에 닫힘 모션이 없는 것과 같은 상태 — [overlay.md](./overlay.md) 「닫힘 애니메이션은 없습니다」 |
| `dimmed=false` 그림자 | `dimmed=true` 심볼에는 그림자가 없습니다(딤이 대신). 구현은 두 경우 모두 `shadow-30`인데, 딤 위에서는 보이지 않아 그대로 뒀습니다 |
| 드래그 핸들          | 두 심볼 모두 손잡이(grabber)가 없습니다. 드래그로 닫는 동작도 정의가 없습니다                                              |

## Storybook

`apps/storybook/src/stories/biz-ui/BottomSheet.stories.tsx`, `meta.title`은 `core/biz-ui/BottomSheet`.

| 스토리    | 보는 것                                                            |
| --------- | ------------------------------------------------------------------ |
| `Default`       | 기본값(`dimmed=true`) 그대로. 컨트롤로 `isDimmed` · `actionOption`을 바꿔 볼 수 있다 |
| `Undimmed`      | `dimmed=false` — 절반 이하 짧은 시트가 딤을 내린 모습               |
| `WithoutAction` | `actionOption`을 안 넘겼을 때 바디만 남는 것                        |
| `Scroll`        | 긴 바디에서 **헤더가 남고 바디만 스크롤되는 것**, 그리고 **`floating` 액션 바가 바닥에 붙어 따라오는 것** — 이번 구조의 검증 자리 |
| `SolidAction`   | `solid`는 반대로 **콘텐츠와 함께 밀려 올라가는 것** — `variant` 두 값의 차이가 보이는 자리 |

**세 스토리 모두 트리거 버튼으로 엽니다.** `confirm-modal.md` 「Storybook」과 같은 이유입니다 — autodocs가 모든 스토리를 한 번에 마운트하는데 열린 채로 두면 `fixed inset-0 z-[1000]` 오버레이가 문서를 덮습니다.

시트가 스토리 프레임이 아니라 캔버스 전체를 덮는 것도 `ConfirmModal`과 같습니다. 뒤에 깔린 `380 × 620` 판은 딤 대비를 보는 배경입니다.
