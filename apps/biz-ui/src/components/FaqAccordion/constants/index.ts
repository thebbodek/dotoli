import clsx from 'clsx';

import { ICON_WEIGHTS, IconProps } from '@/components/Icon';

export const FAQ_ACCORDION_OPEN_MODES = {
  SINGLE: 'single',
  ALL: 'all',
} as const;

export const FAQ_ACCORDION_ICON_KEY: IconProps['iconKey'] = 'caret-down';

export const FAQ_ACCORDION_ICON_WEIGHT = ICON_WEIGHTS.FILL;

export const FAQ_ACCORDION_BASE_STYLE =
  'flex-v-stack w-full border-b border-gray-100 bg-white';

export const FAQ_ACCORDION_QUESTION_STYLE =
  'flex-h-stack w-full cursor-pointer items-center gap-[8px] p-[20px]';

export const FAQ_ACCORDION_QUESTION_TEXT_STYLE = 'min-w-0 flex-1 text-left';

export const FAQ_ACCORDION_CARET_WRAPPER_STYLE =
  'flex-h-stack-center size-[24px] shrink-0';

/**
 * @description: `--animate-*` 3종이 쓰는 값과 같습니다. 그쪽은 keyframe 단축 속성이라
 * transition에 재사용할 수 없어 값만 맞췄습니다. 두 번째 소비처가 생기면 토큰으로 뺍니다.
 * */
const FAQ_ACCORDION_MOTION_STYLE =
  'duration-[250ms] ease-[cubic-bezier(0,0,0.5,1)]';

export const FAQ_ACCORDION_CARET_STYLE = clsx(
  'text-[16px] text-gray-400 transition-transform',
  FAQ_ACCORDION_MOTION_STYLE,
);

export const FAQ_ACCORDION_OPEN_CARET_STYLE = 'rotate-180';

export const FAQ_ACCORDION_ANSWER_GRID_STYLE = clsx(
  'grid w-full transition-[grid-template-rows]',
  FAQ_ACCORDION_MOTION_STYLE,
);

export const FAQ_ACCORDION_OPEN_ANSWER_GRID_STYLE = 'grid-rows-[1fr]';

export const FAQ_ACCORDION_CLOSED_ANSWER_GRID_STYLE = 'grid-rows-[0fr]';

/**
 * @description: grid item은 `min-height: auto`라 이게 없으면 0fr에서도 안 줄어듭니다.
 * 여백을 이 요소가 아니라 안쪽 wrapper가 들어야 접혔을 때 padding이 남지 않습니다.
 * */
export const FAQ_ACCORDION_ANSWER_CLIP_STYLE = 'overflow-hidden';

export const FAQ_ACCORDION_ANSWER_WRAPPER_STYLE = 'w-full px-[20px] pb-[20px]';

export const FAQ_ACCORDION_ANSWER_STYLE =
  'w-full rounded-6 bg-gray-50 px-[18px] py-[16px]';

export const FAQ_ACCORDION_LIST_BASE_STYLE = 'flex-v-stack w-full';
