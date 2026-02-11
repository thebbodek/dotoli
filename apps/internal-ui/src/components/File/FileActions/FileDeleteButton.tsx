import { IconButton, IconButtonProps } from '@/components/Button';

const FileDeleteButton = ({
  disabled,
  onClick,
}: Pick<IconButtonProps, 'onClick' | 'disabled'>) => {
  return (
    <IconButton
      aria-label='삭제'
      disabled={disabled}
      iconKey='trash'
      onClick={onClick}
    />
  );
};

export default FileDeleteButton;
