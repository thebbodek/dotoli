import {
  SelectBaseTriggerWrapper,
  useSelectTriggerContext,
} from '@/components/Select/shared';
import { SingleSelectBaseTriggerProps } from '@/components/Select/Single/shared/types';
import { Typography } from '@/components/Typography';

const SingleSelectBaseTrigger = ({
  displayValue,
}: SingleSelectBaseTriggerProps) => {
  const { disabled, placeholder } = useSelectTriggerContext();

  return (
    <SelectBaseTriggerWrapper>
      <Typography
        variant='body-16-r'
        color={!!displayValue && !disabled ? 'black' : 'gray-04'}
      >
        {displayValue || placeholder}
      </Typography>
    </SelectBaseTriggerWrapper>
  );
};

export default SingleSelectBaseTrigger;
