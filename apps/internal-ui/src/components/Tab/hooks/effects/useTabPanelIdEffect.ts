import { useEffect } from 'react';

import { useTabPanelContext } from '@/components/Tab/context';
import { UseTabPanelIdEffectProps } from '@/components/Tab/types';

const useTabPanelIdEffect = ({ value, setTabId }: UseTabPanelIdEffectProps) => {
  const { tabRefs } = useTabPanelContext();

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
