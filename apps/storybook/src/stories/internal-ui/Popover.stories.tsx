import {
  Button,
  BUTTON_THEMES,
  BUTTON_VARIANTS,
  IconButton,
  Popover,
  PopoverProps,
} from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Popover> = {
  title: 'core/internal-ui/Popover',
  component: Popover,
  argTypes: {
    offset: {
      control: 'number',
      description: 'trigger and popover between distance',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    useHover: {
      control: 'boolean',
      description: 'use hover to open popover',
      table: {
        type: {
          summary: 'true | false',
        },
      },
    },
    applyMaxWidth: {
      control: 'boolean',
      description: 'apply max width to popover',
      table: {
        type: {
          summary: 'true | false',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Popover>;

const ListItem = ({
  index,
  offset,
  useHover,
  applyMaxWidth,
}: { index: number } & Pick<
  PopoverProps,
  'offset' | 'useHover' | 'applyMaxWidth'
>) => {
  return (
    <li className='flex border-b p-2 first:justify-end last:border-b-0 even:justify-center'>
      <Popover
        offset={offset}
        useHover={useHover}
        applyMaxWidth={applyMaxWidth}
        trigger={
          <Button
            label={`클릭 ${index}`}
            variant={BUTTON_VARIANTS.OUTLINED}
            theme={BUTTON_THEMES.PRIMARY}
          />
        }
      >
        {({ close }) => (
          <div
            className={
              'shadow-8 rounded-8 flex items-center justify-between gap-2 bg-white px-4 py-2'
            }
          >
            Popover Content {index}
            <IconButton
              theme={BUTTON_THEMES.GRAY}
              iconKey={'x'}
              onClick={(e) => {
                close();
              }}
            />
          </div>
        )}
      </Popover>
    </li>
  );
};

export const Default: Story = {
  render: (
    args: Pick<PopoverProps, 'offset' | 'useHover' | 'applyMaxWidth'>,
  ) => {
    return (
      <>
        <div id={'portal'} />
        <ul className={'popover-root max-h-[16rem] w-60 overflow-y-auto'}>
          {Array.from({ length: 5 }).map((_, i) => (
            <ListItem key={i} index={i + 1} {...args} />
          ))}
        </ul>
      </>
    );
  },
};
