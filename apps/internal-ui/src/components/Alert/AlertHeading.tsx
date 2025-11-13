import AlertActionButton from '@/components/Alert/AlertActionButton';
import AlertCloseButton from '@/components/Alert/AlertCloseButton';
import AlertCollapseButton from '@/components/Alert/AlertCollapseButton';
import AlertIcon from '@/components/Alert/AlertIcon';
import { ALERT_LABEL_TYPOGRAPHY_VARIANTS } from '@/components/Alert/constants';
import { useAlertContext } from '@/components/Alert/context/AlertContext';
import { AlertHeadingProps } from '@/components/Alert/types';
import { Typography } from '@/components/Typography';

const AlertHeading = ({ heading, iconOption }: AlertHeadingProps) => {
  const { theme, hasTitle, useCollapse, useClose, actionOption } =
    useAlertContext();
  const hasAction = useCollapse || useClose || actionOption;

  const Heading = (
    <div className='in-flex-h-stack w-full items-center gap-x-1.5 overflow-hidden'>
      <AlertIcon iconOption={iconOption} />
      <Typography
        as={hasTitle ? 'strong' : 'p'}
        className='truncate'
        color={ALERT_LABEL_TYPOGRAPHY_VARIANTS[theme]}
        variant={hasTitle ? 'body-14-b' : 'body-14-m'}
      >
        {heading}
      </Typography>
    </div>
  );

  if (hasAction) {
    return (
      <div className='in-flex-h-stack w-full items-center justify-between'>
        {Heading}
        {!hasTitle && <AlertActionButton />}
        {hasTitle && <AlertCollapseButton />}
        {useClose && <AlertCloseButton />}
      </div>
    );
  }

  return Heading;
};

export default AlertHeading;
