import { Icon } from '@/components/Icon';

const OverlayLoading = () => {
  return (
    <div className='flex-h-stack-center absolute left-0 top-0 h-full w-full bg-white/80'>
      <Icon
        iconKey={'circle-notch'}
        className='text-primary-05 animate-spin text-[2.875rem]'
      />
    </div>
  );
};

export default OverlayLoading;
