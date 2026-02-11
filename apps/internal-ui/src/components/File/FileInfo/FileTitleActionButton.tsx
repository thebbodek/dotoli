import { FileTitleActionButtonProps } from '@/components/File/FileInfo/types';
import { Icon } from '@/components/Icon';

const FileTitleActionButton = ({
  iconKey,
  disabled,
  onClick,
}: FileTitleActionButtonProps) => {
  return (
    <button
      className='group-hover:in-flex-h-stack-center bg-in-primary-01 hidden h-5 w-5 shrink-0 rounded-[2px] p-0.5 disabled:cursor-not-allowed'
      disabled={disabled}
      type='button'
      onClick={(e) => {
        if (disabled) return;

        onClick?.(e);
      }}
    >
      <Icon className='text-in-gray-06 text-[1rem]' iconKey={iconKey} />
    </button>
  );
};

export default FileTitleActionButton;
