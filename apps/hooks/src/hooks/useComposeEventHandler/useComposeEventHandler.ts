import { composeEventHandler, ComposeEventHandler } from '@bbodek/utils';
import { EventHandler, SyntheticEvent, useCallback } from 'react';

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
