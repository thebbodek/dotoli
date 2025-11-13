import { useAlertContext } from '@/components/Alert/context';
import { Button } from '@/components/Button';

const AlertCollapseButton = () => {
  const { theme, useCollapse, isCollapsed, setIsCollapsed } = useAlertContext();

  if (!useCollapse) return null;

  return (
    <Button
      iconOption={{
        iconKey: isCollapsed ? 'caret-down' : 'caret-up',
      }}
      iconPosition='right'
      label={isCollapsed ? '펼치기' : '접기'}
      size='xs'
      theme={theme}
      variant='text'
      onClick={() => setIsCollapsed((v) => !v)}
    />
  );
};

export default AlertCollapseButton;
