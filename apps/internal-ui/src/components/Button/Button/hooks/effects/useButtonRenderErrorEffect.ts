import { useEffect } from 'react';

import {
  BUTTON_SIZES,
  BUTTON_STYLES_MAPPER,
  BUTTON_VARIANTS,
} from '@/components/Button/Button/constants';
import {
  ButtonElementType,
  UseButtonRenderErrorEffectProps,
} from '@/components/Button/Button/types';

const useButtonRenderErrorEffect = <T extends ButtonElementType>({
  variant,
  color,
  size,
}: UseButtonRenderErrorEffectProps<T>) => {
  const variantStyle = BUTTON_STYLES_MAPPER[color][variant];
  const isFilledVariant = variant === BUTTON_VARIANTS.FILLED;
  const isXSmallSize = size === BUTTON_SIZES.X_SMALL;

  useEffect(() => {
    if (!variantStyle) {
      throw new Error(`${color} color is not allowed for ${variant}`);
    }

    if (isFilledVariant && isXSmallSize) {
      throw new Error('extra small size is not allowed for filled button');
    }
  }, [variant, color, size]);
};

export default useButtonRenderErrorEffect;
