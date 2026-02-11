import { Icon } from '@/components/Icon';

const FileThumbnailHoverOverlay = () => {
  return (
    <div className='group-hover:in-flex-h-stack-center animate-in-fade-in absolute top-0 left-0 hidden h-full w-full bg-black/40'>
      <Icon
        className='text-in-white text-[1.5rem]'
        iconKey='magnifying-glass-plus'
      />
    </div>
  );
};

export default FileThumbnailHoverOverlay;
