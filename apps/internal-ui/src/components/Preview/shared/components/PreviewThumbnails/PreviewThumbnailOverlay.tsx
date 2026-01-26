import clsx from 'clsx';

import { Icon } from '@/components/Icon';
import { PreviewThumbnailProps } from '@/components/Preview/shared/components/PreviewThumbnails/types';

const PreviewThumbnailOverlay = ({
  isCurrent,
}: Pick<PreviewThumbnailProps, 'isCurrent'>) => {
  return (
    <div
      className={clsx(
        'in-mobile:hover:bg-[#0579FB4D] absolute top-0 left-0 h-full w-full transition-colors',
        isCurrent && 'in-flex-h-stack-center bg-[#0579FB4D]',
      )}
    >
      {isCurrent && (
        <Icon
          className='text-in-primary-06 animate-in-fade-in text-[1.375rem]'
          iconKey='check-circle'
          weight='fill'
          aria-hidden
        />
      )}
    </div>
  );
};

export default PreviewThumbnailOverlay;
