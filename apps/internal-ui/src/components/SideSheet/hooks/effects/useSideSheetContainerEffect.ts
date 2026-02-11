import { useEffect } from 'react';

import { SideSheetProps } from '@/components/SideSheet/types';

const useSideSheetContainerEffect = ({
  containerId,
}: Required<Pick<SideSheetProps, 'containerId'>>) => {
  useEffect(() => {
    const container = document.getElementById(containerId);

    if (!container) {
      throw new Error(`SideSheet container with id "${containerId}" not found`);
    }

    container.style.position = 'relative';
  }, [containerId]);
};

export default useSideSheetContainerEffect;
