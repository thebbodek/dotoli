import AlertButton from '@/components/Alert/AlertButton';
import AlertCloseButton from '@/components/Alert/AlertCloseButton';
import AlertCollapseButton from '@/components/Alert/AlertCollapseButton';
import AlertIcon from '@/components/Alert/AlertIcon';
import { ALERT_LABEL_TYPOGRAPHY_VARIANTS } from '@/components/Alert/constants';
import { useAlertContext } from '@/components/Alert/context/AlertContext';
import { AlertHeadingProps } from '@/components/Alert/types';
import { Typography } from '@/components/Typography';

const AlertHeading = ({ heading, iconOption }: AlertHeadingProps) => {
  const { theme, useTitle, collapsible, useClose, buttonOption } =
    useAlertContext();
  const hasAction = collapsible || useClose || buttonOption;

  const Heading = (
    <div className='in-flex-h-stack items-center gap-x-1.5'>
      <AlertIcon iconOption={iconOption} />
      <Typography
        as={useTitle ? 'strong' : 'p'}
        variant={useTitle ? 'body-14-b' : 'body-14-m'}
        color={ALERT_LABEL_TYPOGRAPHY_VARIANTS[theme]}
      >
        {heading}
      </Typography>
    </div>
  );

  if (hasAction) {
    return (
      <div className='in-flex-h-stack w-full items-center justify-between'>
        {Heading}
        {!useTitle && <AlertButton />}
        {useTitle && <AlertCollapseButton />}
        {useClose && <AlertCloseButton />}
      </div>
    );
  }

  return Heading;
};

export default AlertHeading;
