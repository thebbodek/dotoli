import { HTMLAttributes, ReactElement } from 'react';

export interface ImageLoadingRendererProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  isLoading: boolean;
  loadingComponent: ReactElement;
}
