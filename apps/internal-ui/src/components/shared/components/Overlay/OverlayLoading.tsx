import { Icon } from '@/components/Icon';

const OverlayLoading = () => {
  return (
    <div className='in-flex-h-stack-center bg-in-white/80 absolute left-0 top-0 h-full w-full'>
      <Icon
        className='text-in-primary-05 animate-spin text-[2.875rem]'
        iconKey='circle-notch'
      />
    </div>
  );
};

export default OverlayLoading;
