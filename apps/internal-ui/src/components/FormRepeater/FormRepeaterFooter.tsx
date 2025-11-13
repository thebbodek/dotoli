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
        disabled={disabled}
        label='전체 초기화'
        size='xs'
        theme='gray'
        variant='outlined'
        onClick={onAllReset}
      />
    </footer>
  );
};

export default FormRepeaterFooter;
