import clsx from 'clsx';
import { HTMLAttributes, PropsWithChildren } from 'react';

const PreviewOverlayWrapper = ({
  className,
  children,
}: PropsWithChildren<Pick<HTMLAttributes<HTMLDivElement>, 'className'>>) => {
  return (
    <div className={clsx(className, 'h-full w-full overflow-auto')}>
      {children}
    </div>
  );
};

export default PreviewOverlayWrapper;
