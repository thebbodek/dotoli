import { generateArgTypeSummary } from '@/utils/generateArgTypeSummary';
import {
  Button,
  BUTTON_THEMES,
  BUTTON_VARIANTS,
  ICON_BUTTON_THEMES,
  IconButton,
  Popover,
  POPOVER_PLACEMENTS,
  PopoverProps,
} from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

const meta: Meta<typeof Popover> = {
  title: 'core/internal-ui/Popover',
  component: Popover,
  argTypes: {
    placement: {
      control: 'select',
      description: 'Popover placement',
      options: Object.values(POPOVER_PLACEMENTS),
      table: {
        defaultValue: {
          summary: POPOVER_PLACEMENTS.BOTTOM_LEFT,
        },
        type: {
          summary: generateArgTypeSummary({
            options: Object.values(POPOVER_PLACEMENTS),
          }),
        },
      },
    },
    threshold: {
      control: 'number',
      description: 'threshold',
      table: {
        defaultValue: {
          summary: '2',
        },
        type: {
          summary: 'number',
        },
      },
    },
    offset: {
      control: 'number',
      description: 'trigger and popover between distance',
      table: {
        defaultValue: {
          summary: '8',
        },
        type: {
          summary: 'number',
        },
      },
    },
    useAutoFocus: {
      control: 'boolean',
      description: 'use auto focus to open popover',
      table: {
        defaultValue: {
          summary: 'true',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    applyMaxWidth: {
      control: 'boolean',
      description: 'apply max width to popover',
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    useClickOutsideEvent: {
      control: 'boolean',
      description: 'use click outside event to close popover',
      table: {
        defaultValue: {
          summary: 'true',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    isOpen: {
      control: 'boolean',
      description: 'is open popover',
      type: {
        required: true,
        name: 'boolean',
      },
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
        },
      },
    },
    onPopoverClose: {
      action: 'clicked',
      description: 'on popover close',
      type: {
        name: 'function',
        required: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    useAutoFocus: true,
    applyMaxWidth: false,
  },
  render: (args: PopoverProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    return (
      <Popover
        {...args}
        useClickOutsideEvent={true}
        isOpen={args.isOpen || isOpen}
        onPopoverClose={close}
        trigger={
          <Button
            label={`클릭`}
            variant={BUTTON_VARIANTS.OUTLINED}
            theme={BUTTON_THEMES.PRIMARY}
            onClick={() => setIsOpen((v) => !v)}
          />
        }
      >
        <div
          className={
            'shadow-in-8 rounded-in-8 bg-in-white flex items-center justify-between gap-2 px-3 py-2'
          }
        >
          Popover Content
        </div>
      </Popover>
    );
  },
};

const ListItem = ({ index, ...args }: { index: number } & PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <li className='flex border-b p-2 first:justify-end last:border-b-0 even:justify-center'>
      <Popover
        {...args}
        onPopoverClose={close}
        isOpen={isOpen}
        trigger={
          <Button
            label={`클릭 ${index}`}
            variant={BUTTON_VARIANTS.OUTLINED}
            theme={BUTTON_THEMES.PRIMARY}
            onClick={() => setIsOpen((v) => !v)}
          />
        }
      >
        <div
          className={
            'shadow-in-8 rounded-in-8 bg-in-white flex items-center justify-between gap-2 px-3 py-2'
          }
        >
          Popover Content {index}
          <IconButton
            arialLabel={'닫기'}
            theme={ICON_BUTTON_THEMES.HOVER_GRAY}
            iconKey={'x'}
            onClick={close}
          />
        </div>
      </Popover>
    </li>
  );
};

export const WithListRoot: Story = {
  render: (args: PopoverProps) => {
    const rootRef = useRef<HTMLUListElement>(null);

    return (
      <ul
        ref={rootRef}
        className={
          'popover-root bg-in-yellow-02 max-h-[20rem] w-60 overflow-y-auto'
        }
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <ListItem key={i} index={i + 1} {...args} rootRef={rootRef} />
        ))}
      </ul>
    );
  },
};
