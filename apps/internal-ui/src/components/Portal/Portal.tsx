import { PropsWithChildren, ReactPortal, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { PortalProps } from './types';

const Portal = ({
  target = 'portal',
  children,
}: PropsWithChildren<PortalProps>) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.getElementById(target);

    if (!element) {
      throw new Error(
        `Element with id '${target}' is missing. Ensure that the element is rendered in the DOM before using the Portal.`,
      );
    }

    setContainer(element);
  }, [target]);

  return container ? (createPortal(children, container) as ReactPortal) : null;
};

export default Portal;
