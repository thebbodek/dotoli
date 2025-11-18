import clsx from 'clsx';
import { useState } from 'react';

import AlertActionButton from '@/components/Alert/AlertActionButton';
import AlertBox from '@/components/Alert/AlertBox';
import AlertDescription from '@/components/Alert/AlertDescription';
import AlertHeading from '@/components/Alert/AlertHeading';
import { ALERT_THEMES } from '@/components/Alert/constants';
import { AlertProvider } from '@/components/Alert/context/AlertContext';
import { AlertProps } from '@/components/Alert/types';

const Alert = ({
  title,
  content,
  theme = ALERT_THEMES.PRIMARY,
  useCollapse = false,
  useClose = false,
  actionOption,
  iconOption,
  className,
}: AlertProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const hasTitle = !!title;

  if (!isVisible) return null;
  console.log('isCollapsed', isCollapsed);

  return (
    <AlertProvider
      actionOption={actionOption}
      hasTitle={hasTitle}
      isCollapsed={isCollapsed}
      setIsCollapsed={setIsCollapsed}
      setIsVisible={setIsVisible}
      theme={theme}
      useClose={useClose}
      useCollapse={useCollapse}
    >
      <AlertBox className={className}>
        <AlertHeading heading={title ?? content} iconOption={iconOption} />
        {hasTitle && (
          <div
            className={clsx(
              'pl-[1.625rem] transition-opacity',
              !isCollapsed ? 'opacity-100' : 'opacity-0',
            )}
            aria-hidden={isCollapsed}
          >
            <AlertDescription description={content} />
            <AlertActionButton className='mt-1 w-fit' />
          </div>
        )}
      </AlertBox>
    </AlertProvider>
  );
};

export default Alert;
