import clsx from 'clsx';
import { ImgHTMLAttributes, memo, useState } from 'react';

const ImageComponent = ({
  src,
}: Pick<ImgHTMLAttributes<HTMLImageElement>, 'src'>) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <div className='flex aspect-video w-[9.375rem] items-center justify-center'>
          Loading Image...
        </div>
      )}
      <img
        className={clsx(
          'aspect-video',
          isLoading ? 'hidden' : 'rounded-in-6 block',
        )}
        alt=''
        src={src}
        width={150}
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
};

export default memo(ImageComponent);
