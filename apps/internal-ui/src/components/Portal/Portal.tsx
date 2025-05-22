import { PropsWithChildren, ReactPortal } from 'react';
import { createPortal } from 'react-dom';

import { PortalProps } from './types';

const Portal = ({
  target = 'portal',
  children,
}: PropsWithChildren<PortalProps>) => {
  const container = document.getElementById(target) as HTMLElement;

  return container ? (createPortal(children, container) as ReactPortal) : null;
};

export default Portal;
