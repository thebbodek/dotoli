import { PropsWithChildren, ReactPortal } from 'react';
import { createPortal } from 'react-dom';

import { PortalProps } from './types';
import { PORTAL_DEFAULT_TARGET } from '@/components/Portal/constants';

const Portal = ({
  target = PORTAL_DEFAULT_TARGET,
  children,
}: PropsWithChildren<PortalProps>) => {
  const container = document.getElementById(target) as HTMLElement;

  return container ? (createPortal(children, container) as ReactPortal) : null;
};

export default Portal;
