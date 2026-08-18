import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { PORTAL_DEFAULT_TARGET } from '@/components/Portal/constants';
import { PortalProps } from '@/components/Portal/types';

const Portal = ({
  target = PORTAL_DEFAULT_TARGET,
  children,
}: PropsWithChildren<PortalProps>) => {
  if (typeof document === 'undefined') return null;

  const container = document.getElementById(target) ?? document.body;

  return createPortal(children, container);
};

export default Portal;
