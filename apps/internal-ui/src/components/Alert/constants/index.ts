import { AlertTheme } from '@/components/Alert/types';
import { ColorVariants } from '@/variants';

export const ALERT_THEMES = {
  GRAY: 'gray',
  PRIMARY: 'primary',
  GREEN: 'green',
  YELLOW: 'yellow',
  RED: 'red',
} as const;

export const ALERT_LABEL_TYPOGRAPHY_VARIANTS: Record<
  AlertTheme,
  ColorVariants
> = {
  [ALERT_THEMES.GRAY]: 'gray-07',
  [ALERT_THEMES.PRIMARY]: 'primary-08',
  [ALERT_THEMES.GREEN]: 'green-06',
  [ALERT_THEMES.YELLOW]: 'yellow-07',
  [ALERT_THEMES.RED]: 'red-07',
};

export const ALERT_THEME_STYLES = {
  [ALERT_THEMES.GRAY]: {
    root: 'bg-in-gray-02',
    icon: 'text-in-gray-05',
  },
  [ALERT_THEMES.PRIMARY]: {
    root: 'bg-in-primary-02',
    icon: 'text-in-primary-04',
  },
  [ALERT_THEMES.GREEN]: {
    root: 'bg-in-green-02',
    icon: 'text-in-green-03',
  },
  [ALERT_THEMES.YELLOW]: {
    root: 'bg-in-yellow-02',
    icon: 'text-in-yellow-04',
  },
  [ALERT_THEMES.RED]: {
    root: 'bg-in-red-02',
    icon: 'text-in-red-03',
  },
} as const;
