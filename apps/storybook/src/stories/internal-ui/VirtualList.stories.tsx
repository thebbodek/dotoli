import { VirtualList, VirtualListProps } from '@bbodek/internal-ui';
import { Meta } from '@storybook/react';
import clsx from 'clsx';
import { memo, useEffect, useRef, useState } from 'react';

const meta = {
  title: 'core/internal-ui/VirtualList',
  component: VirtualList,
  argTypes: {
    itemHeight: {
      control: 'number',
      description: 'VirtualList item Height',
    },
  },
} satisfies Meta<typeof VirtualList>;

export default meta;

export const Default = ({
  itemHeight = 90,
}: Pick<VirtualListProps, 'itemHeight'>) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<
    {
      id: string;
      author: string;
      width: number;
      height: number;
      url: string;
      download_url: string;
    }[]
  >([]);
  const itemsTotalCount = images.length;

  const getRandomImageList = async () => {
    try {
      const res = await fetch('https://picsum.photos/v2/list?page=2&limit=100');
      const data = await res.json();

      setImages(data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRandomImageList();
  }, []);

  if (isLoading) {
    return <div className='animate-bounce'>Loading...</div>;
  }

  if (itemsTotalCount === 0) {
    return <div className='animate-bounce'>Empty...</div>;
  }

  const onChange = () => {
    if (listRef.current && listRef.current.scrollTop !== 0) {
      listRef.current!.scrollTop = 0;
    }
  };

  return (
    <div className='in-flex-v-stack h-[500px] w-[500px]'>
      <input onChange={onChange} />
      <VirtualList
        className='bg-gray-02'
        itemHeight={itemHeight}
        itemsTotalCount={itemsTotalCount}
        listElement='ul'
        ref={listRef}
      >
        {({ startIndex, endIndex, getTopPosition }) =>
          images.slice(startIndex, endIndex).map((image, index) => {
            const { id, author, download_url } = image;

            return (
              <VirtualList.Item
                className='gap-x-3'
                element='li'
                height={itemHeight}
                key={id}
                topPosition={getTopPosition({ index })}
              >
                <ImageComponent key={download_url} src={download_url} />
                <AuthorComponent author={author} key={author} />
              </VirtualList.Item>
            );
          })
        }
      </VirtualList>
    </div>
  );
};

const AuthorComponent = memo(({ author }: { author: string }) => {
  return <div className='text-in-primary-06'>{author}</div>;
});

const ImageComponent = memo(({ src }: { src: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <div className='flex aspect-video w-[9.375rem] items-center justify-center'>
          Loading Image...
        </div>
      )}
      <img
        alt=''
        className={clsx('aspect-video', isLoading ? 'hidden' : 'block')}
        src={src}
        width={150}
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
});
