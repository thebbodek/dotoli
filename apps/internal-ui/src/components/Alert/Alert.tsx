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
  collapsible = false,
  useClose = false,
  actionOption,
  iconOption,
  className,
}: AlertProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(true);
  const hasTitle = !!title;

  if (!visible) return null;

  return (
    <AlertProvider
      hasTitle={hasTitle}
      theme={theme}
      collapsible={collapsible}
      actionOption={actionOption}
      useClose={useClose}
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      setVisible={setVisible}
    >
      <AlertBox className={className}>
        <AlertHeading heading={title ?? content} iconOption={iconOption} />
        {hasTitle && (
          <div
            className={clsx(
              'pl-[1.625rem] transition-opacity',
              !collapsed ? 'opacity-100' : 'opacity-0',
            )}
            aria-hidden={collapsed}
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
