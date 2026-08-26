import { useEffect, useState } from 'react';

import { VirtualListImageData } from '@/stories/internal-ui/VirtualList/types';

const useVirtualListStorybook = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<VirtualListImageData[]>([]);
  const itemsTotalCount = images.length;

  useEffect(() => {
    fetch('https://picsum.photos/v2/list?page=2&limit=100')
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { isLoading, images, itemsTotalCount };
};

export default useVirtualListStorybook;
