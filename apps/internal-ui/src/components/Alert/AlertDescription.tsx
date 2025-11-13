import { ALERT_LABEL_TYPOGRAPHY_VARIANTS } from '@/components/Alert/constants';
import { useAlertContext } from '@/components/Alert/context';
import { AlertDescriptionProps } from '@/components/Alert/types';
import { Typography } from '@/components/Typography';

const AlertDescription = ({ description }: AlertDescriptionProps) => {
  const { theme } = useAlertContext();

  return (
    <Typography
      as='p'
      color={ALERT_LABEL_TYPOGRAPHY_VARIANTS[theme]}
      variant='body-14-r'
    >
      {description}
    </Typography>
  );
};

export default AlertDescription;
