import { DynamicVirtualList, Typography } from '@bbodek/internal-ui';
import { Meta, StoryObj } from '@storybook/react';

import { default as StaticVirtualListMeta } from './StaticVirtualList.stories';
import AuthorComponent from '@/stories/internal-ui/VirtualList/components/AuthorComponent';
import ImageComponent from '@/stories/internal-ui/VirtualList/components/ImageComponent';
import useVirtualListStorybook from '@/stories/internal-ui/VirtualList/hooks/useVirtualListStorybook';

const { as, className, gap, itemsTotalCount, listOptions } =
  StaticVirtualListMeta.argTypes;

const meta = {
  title: 'core/internal-ui/VirtualList/DynamicVirtualList',
  component: DynamicVirtualList,
  argTypes: {
    as,
    className,
    gap,
    itemsTotalCount,
    listOptions,
    initialItemHeight: {
      control: 'number',
      description: 'DynamicVirtualList initial item height',
      type: {
        name: 'number',
        required: true,
      },
    },
    overScanCount: {
      control: 'number',
      description: 'DynamicVirtualList over scan count',
      type: 'number',
      table: {
        defaultValue: {
          summary: '0',
        },
      },
    },
  },
} satisfies Meta<typeof DynamicVirtualList>;

export default meta;

type Story = StoryObj<typeof DynamicVirtualList>;

export const Default: Story = {
  args: {
    initialItemHeight: 100,
    gap: 20,
  },
  render: ({ initialItemHeight, ...args }) => {
    const { isLoading, images, itemsTotalCount } = useVirtualListStorybook();

    if (isLoading) {
      return <div className='animate-bounce'>Loading...</div>;
    }

    if (itemsTotalCount === 0) {
      return <div className='animate-bounce'>Empty...</div>;
    }

    const overSizeImageIndexes = [4, 5, 8, 10, 15, 30, 45, 68, 80];

    return (
      <div className='w-[calc(100dvw-40px)] max-w-[500px]'>
        <DynamicVirtualList
          {...args}
          className='bg-in-gray-01 rounded-in-8 h-[500px] w-full p-5'
          initialItemHeight={initialItemHeight}
          itemsTotalCount={itemsTotalCount}
          listOptions={{ as: 'ul' }}
        >
          {({ startIndex, endIndex }) =>
            images.slice(startIndex, endIndex).map((image, index) => {
              const { id, author, download_url } = image;
              const isOverSizeImage = overSizeImageIndexes.includes(
                startIndex + index,
              );

              return (
                <DynamicVirtualList.Item
                  as='li'
                  className='rounded-in-8 bg-in-white shadow-in-8 flex gap-x-4 overflow-hidden p-2'
                  index={index}
                  key={id}
                >
                  <ImageComponent key={download_url} src={download_url} />
                  <div>
                    <AuthorComponent author={author} key={author} />
                    <Typography as='p' variant='body-14-r'>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                      {isOverSizeImage && (
                        <>
                          Lorem Ipsum has been the industry's standard dummy
                          text ever since the 1500s, when an unknown printer
                          took a galley of type and scrambled it to make a type
                          specimen book.
                        </>
                      )}
                    </Typography>
                  </div>
                </DynamicVirtualList.Item>
              );
            })
          }
        </DynamicVirtualList>
      </div>
    );
  },
};
