import clsx from 'clsx';
import { ImgHTMLAttributes, memo, useState } from 'react';

const ImageComponent = ({
  src,
}: Pick<ImgHTMLAttributes<HTMLImageElement>, 'src'>) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <div className='text-in-body-14-r rounded-in-6 bg-in-gray-02 flex aspect-video min-w-[9.375rem] items-center justify-center text-center'>
          Loading
          <br /> Image...
        </div>
      )}
      <img
        className={clsx(
          'aspect-video object-cover',
          isLoading ? 'hidden' : 'rounded-in-6 block min-w-[9.375rem]',
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
