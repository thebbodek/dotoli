import { useAlertContext } from '@/components/Alert/context';
import { Button } from '@/components/Button';

const AlertCollapseButton = () => {
  const { theme, collapsible, collapsed, setCollapsed } = useAlertContext();

  if (!collapsible) return null;

  return (
    <Button
      label={collapsed ? '펼치기' : '접기'}
      variant='text'
      size='xs'
      theme={theme}
      iconOption={{
        iconKey: collapsed ? 'caret-down' : 'caret-up',
      }}
      iconPosition='right'
      onClick={() => setCollapsed((v) => !v)}
    />
  );
};

export default AlertCollapseButton;
