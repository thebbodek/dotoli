import { StaticVirtualList } from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';

import AuthorComponent from '@/stories/internal-ui/VirtualList/components/AuthorComponent';
import ImageComponent from '@/stories/internal-ui/VirtualList/components/ImageComponent';
import useVirtualListStorybook from '@/stories/internal-ui/VirtualList/hooks/useVirtualListStorybook';

const meta = {
  title: 'core/internal-ui/VirtualList/StaticVirtualList',
  component: StaticVirtualList,
  argTypes: {
    itemHeight: {
      control: 'number',
      type: { name: 'number', required: true },
      description: 'VirtualList item Height',
    },
    gap: {
      control: 'number',
      type: 'number',
      description: 'VirtualList gap',
      table: {
        defaultValue: {
          summary: '0',
        },
      },
    },
    itemsTotalCount: {
      control: 'number',
      type: { name: 'number', required: true },
      description: 'VirtualList items total count',
    },
    as: {
      control: 'text',
      description: 'VirtualList root element type',
      type: 'string',
      table: {
        type: {
          summary: 'ElementType',
        },
        defaultValue: {
          summary: 'div',
        },
      },
    },
    listOptions: {
      control: 'object',
      type: {
        name: 'other',
        value: 'object',
      },
      table: {
        type: {
          summary: '{ as?: ElementType, className?: string }',
        },
      },
      description: 'VirtualList list options (as, className)',
    },
    className: {
      control: 'text',
      type: 'string',
      description: 'VirtualList root element className',
    },
  },
} satisfies Meta<typeof StaticVirtualList>;

export default meta;

type Story = StoryObj<typeof StaticVirtualList>;

export const Default: Story = {
  args: {
    itemHeight: 100,
    gap: 20,
  },
  render: ({ itemHeight, ...args }) => {
    const { isLoading, images, itemsTotalCount } = useVirtualListStorybook();

    if (isLoading) {
      return <div className='animate-bounce'>Loading...</div>;
    }

    if (itemsTotalCount === 0) {
      return <div className='animate-bounce'>Empty...</div>;
    }

    return (
      <StaticVirtualList
        {...args}
        className='bg-in-gray-01 rounded-in-8 h-[500px] w-[500px] p-5'
        itemHeight={itemHeight}
        itemsTotalCount={itemsTotalCount}
        listOptions={{ as: 'ul' }}
      >
        {({ startIndex, endIndex, getTopPosition }) =>
          images.slice(startIndex, endIndex).map((image, index) => {
            const { id, author, download_url } = image;

            return (
              <StaticVirtualList.Item
                as='li'
                className='rounded-in-8 bg-in-white shadow-in-8 flex items-center gap-x-4 overflow-hidden p-2'
                height={itemHeight}
                key={id}
                topPosition={getTopPosition({ index })}
              >
                <ImageComponent key={download_url} src={download_url} />
                <AuthorComponent author={author} key={author} />
              </StaticVirtualList.Item>
            );
          })
        }
      </StaticVirtualList>
    );
  },
};
