import { useEffect } from 'react';

import {
  BUTTON_SIZES,
  BUTTON_STYLES,
  BUTTON_THEMES,
  BUTTON_VARIANTS,
} from '@/components/Button/shared/constants';
import { UseButtonRenderErrorEffectProps } from '@/components/Button/shared/types';

const useButtonRenderErrorEffect = ({
  variant = BUTTON_VARIANTS.FILLED,
  theme = BUTTON_THEMES.PRIMARY,
  size = BUTTON_SIZES.LG,
}: UseButtonRenderErrorEffectProps) => {
  const styles = BUTTON_STYLES[theme][variant];

  useEffect(() => {
    if (!styles) {
      throw new Error(`${theme} theme is not allowed for ${variant}`);
    }

    if (variant === BUTTON_VARIANTS.FILLED && size === BUTTON_SIZES.XS) {
      throw new Error('extra small size is not allowed for filled button');
    }
  }, [variant, theme, size]);
};

export default useButtonRenderErrorEffect;
