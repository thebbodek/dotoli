import { Button } from '@/components/Button';
import { FormRepeaterFooterProps } from '@/components/FormRepeater/types';
import { Typography } from '@/components/Typography';

const FormRepeaterFooter = ({
  onAllReset,
  changedRowsCount,
  disabled,
}: FormRepeaterFooterProps) => {
  return (
    <footer className='in-flex-h-stack items-center justify-end gap-x-1.5'>
      <Typography color='primary-05' variant='body-12-m'>
        {changedRowsCount}건 수정
      </Typography>
      <Button
        label='전체 초기화'
        theme='gray'
        variant='outlined'
        size='xs'
        onClick={onAllReset}
        disabled={disabled}
      />
    </footer>
  );
};

export default FormRepeaterFooter;
