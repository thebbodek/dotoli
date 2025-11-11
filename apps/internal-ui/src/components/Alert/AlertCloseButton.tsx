import { useAlertContext } from '@/components/Alert/context';
import { IconButton } from '@/components/Button';

const AlertCloseButton = () => {
  const { setVisible } = useAlertContext();

  return (
    <IconButton
      iconKey='x'
      aria-label='닫기'
      theme='hover-white'
      onClick={() => setVisible(false)}
    />
  );
};

export default AlertCloseButton;
