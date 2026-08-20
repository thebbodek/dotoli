import {
  CTA_BUTTON_SIZES,
  CTA_BUTTON_THEMES,
  CTA_BUTTON_VARIANTS,
} from '@/components/Button/CtaButton/constants';
import { BUTTON_ICON_POSITIONS } from '@/components/Button/shared/constants';
import { ICON_WEIGHTS } from '@/components/Icon/constants';
import { IconProps } from '@/components/Icon/types';
import {
  NotificationActionOption,
  NotificationColors,
  NotificationVariant,
} from '@/components/Notification/types';
import { COLOR_VARIANTS } from '@/variants';

export const NOTIFICATION_VARIANTS = {
  NO_READ: 'noRead',
  READ: 'read',
} as const;

export const NOTIFICATION_DEFAULT_VARIANT = NOTIFICATION_VARIANTS.NO_READ;

export const NOTIFICATION_ICON_KEYS = {
  ALARM: 'alarm',
  CHECK_CIRCLE: 'check-circle',
  INVOICE: 'invoice',
} as const satisfies Record<string, IconProps['iconKey']>;

export const NOTIFICATION_ICON_WEIGHT = ICON_WEIGHTS.FILL;

export const NOTIFICATION_ACTION_OPTION: NotificationActionOption = {
  label: '바로가기',
  variant: CTA_BUTTON_VARIANTS.TEXT,
  theme: CTA_BUTTON_THEMES.PRIMARY,
  size: CTA_BUTTON_SIZES.SM,
  iconPosition: BUTTON_ICON_POSITIONS.RIGHT,
  iconOption: { iconKey: 'caret-right' },
};

export const NOTIFICATION_BASE_STYLE =
  'flex-v-stack w-full gap-[8px] px-[20px] py-[22px]';

export const NOTIFICATION_VARIANT_STYLES: Record<NotificationVariant, string> =
  {
    [NOTIFICATION_VARIANTS.NO_READ]: 'bg-blue-50',
    [NOTIFICATION_VARIANTS.READ]: 'bg-white',
  };

export const NOTIFICATION_HEADER_STYLE =
  'flex-h-stack items-center justify-between gap-[8px]';

export const NOTIFICATION_SOURCE_STYLE =
  'flex-h-stack min-w-0 items-center gap-[8px]';

/**
 * @description: 글리프 폭이 `font-size`보다 좁아(alarm 12.12) 박스를 14로 고정합니다.
 * 본문 `pl-[22px]`가 「아이콘 14 + gap 8」이라, 고정하지 않으면 업체명이 제목보다 왼쪽에 섭니다.
 * */
export const NOTIFICATION_ICON_STYLE =
  'size-[14px] shrink-0 text-[14px] text-blue-300';

export const NOTIFICATION_COMPANY_NAME_STYLE = 'min-w-0 truncate';

export const NOTIFICATION_RECEIVED_AT_STYLE = 'shrink-0';

export const NOTIFICATION_BODY_STYLE =
  'flex-v-stack items-start gap-[8px] pl-[22px]';

export const NOTIFICATION_TEXT_STYLE = 'flex-v-stack w-full gap-[2px]';

export const NOTIFICATION_DESCRIPTION_STYLE = 'whitespace-pre-line';

export const NOTIFICATION_COLORS: NotificationColors = {
  COMPANY_NAME: COLOR_VARIANTS.GRAY_500,
  RECEIVED_AT: COLOR_VARIANTS.GRAY_400,
  TITLE: COLOR_VARIANTS.BLACK,
  DESCRIPTION: COLOR_VARIANTS.GRAY_700,
};
