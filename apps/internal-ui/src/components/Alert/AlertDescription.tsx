import { ALERT_LABEL_TYPOGRAPHY_VARIANTS } from '@/components/Alert/constants';
import { useAlertContext } from '@/components/Alert/context';
import { AlertDescriptionProps } from '@/components/Alert/types';
import { Typography } from '@/components/Typography';

const AlertDescription = ({ description }: AlertDescriptionProps) => {
  const { theme } = useAlertContext();

  return (
    <Typography
      as='p'
      variant='body-14-r'
      color={ALERT_LABEL_TYPOGRAPHY_VARIANTS[theme]}
    >
      {description}
    </Typography>
  );
};

export default AlertDescription;
