import { useEffect, useState } from 'react';

import { VirtualListImageData } from '@/stories/internal-ui/VirtualList/types';

const useVirtualListStorybook = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<VirtualListImageData[]>([]);
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

  return { isLoading, images, itemsTotalCount };
};

export default useVirtualListStorybook;
