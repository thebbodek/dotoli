import { useClickOutside } from '@bbodek/hooks';
import { Button, ComponentPropsRef } from '@bbodek/internal-ui';
import clsx from 'clsx';
import { useState } from 'react';

const meta = {
  title: 'core/hooks/useClickOutSide',
  argTypes: {
    onClose: { action: 'clicked', type: { name: 'function', required: true } },
    useClickOutsideEvent: {
      control: 'boolean',
      description: 'useClickOutsideEvent',
      table: {
        defaultValue: {
          summary: 'true',
        },
        type: {
          summary: 'true | false',
        },
      },
    },
  },
};

export default meta;

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { contentRef } = useClickOutside({
    onClose: () => setIsOpen(false),
    useClickOutsideEvent: true,
  });

  return (
    <div
      ref={contentRef as ComponentPropsRef<HTMLDivElement>['ref']}
      className={'flex flex-col gap-y-2'}
    >
      <Button onClick={() => setIsOpen(true)} label='Open' />
      <div className='flex h-[20rem] w-[20rem]'>
        <div
          className={clsx(
            'bg-gray-01 flex flex-1 items-center justify-center rounded-lg p-4 opacity-0 transition-opacity',
            isOpen && 'opacity-100',
          )}
        >
          Open!!
        </div>
      </div>
    </div>
  );
};
