import { useEffect } from 'react';

import { UseTabPanelIdEffectProps } from '@/components/Tab/types';
import { useTabListContext } from '@/components/Tab/context';

const useTabPanelIdEffect = ({ value, setTabId }: UseTabPanelIdEffectProps) => {
  const { tabRefs } = useTabListContext();

  useEffect(() => {
    if (tabRefs.current) {
      const tabItem = tabRefs.current[value];

      if (!tabItem) {
        throw new Error(
          'TabPanel value must match one of the values in Tab items',
        );
      }

      setTabId(tabItem.id);
    }
  }, [tabRefs.current]);
};

export default useTabPanelIdEffect;
