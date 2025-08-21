import { useEffect } from 'react';

import {
  BREAKPOINT_SIZE,
  RESPONSIBLE_STATUS,
} from '@/hooks/useResponsible/constants';
import { UseResponsibleStatusEffectParams } from '@/hooks/useResponsible/types';

const useResponsibleStatusEffect = ({
  setStatus,
}: UseResponsibleStatusEffectParams) => {
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      const calculateStatus = () => {
        if (width >= BREAKPOINT_SIZE.DESKTOP) {
          return RESPONSIBLE_STATUS.DESKTOP;
        } else if (width >= BREAKPOINT_SIZE.TABLET) {
          return RESPONSIBLE_STATUS.TABLET;
        } else {
          return RESPONSIBLE_STATUS.MOBILE;
        }
      };

      setStatus(calculateStatus());
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};

export default useResponsibleStatusEffect;
