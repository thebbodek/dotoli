import { HTMLAttributes, ReactElement } from 'react';

export interface ImageErrorBoundaryProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  isError: boolean;
  errorComponent: ReactElement;
}
