import { useAlertContext } from '@/components/Alert/context';
import { IconButton } from '@/components/Button';

const AlertCloseButton = () => {
  const { setIsVisible } = useAlertContext();

  return (
    <IconButton
      aria-label='닫기'
      iconKey='x'
      theme='hover-white'
      onClick={() => setIsVisible(false)}
    />
  );
};

export default AlertCloseButton;
