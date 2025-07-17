import { EventHandler, SyntheticEvent, useCallback } from 'react';

import { composeEventHandler, ComposeEventHandler } from '@bbodek/utils';

const useComposeEventHandler = () => {
  const compose = useCallback(
    <T extends SyntheticEvent>(
      handler: ComposeEventHandler<T>,
    ): EventHandler<T> => composeEventHandler(handler),
    [],
  );

  return { compose };
};

export default useComposeEventHandler;
