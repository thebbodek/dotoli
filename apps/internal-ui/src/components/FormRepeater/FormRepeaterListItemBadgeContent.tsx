import {
  Badge,
  BADGE_VARIANTS,
  BadgeProps,
  BadgeVariant,
} from '@/components/Badge';
import FormRepeaterListItemContent from '@/components/FormRepeater/FormRepeaterListItemContent';

const FormRepeaterListItemBadgeContent = <T extends BadgeVariant>({
  variant = BADGE_VARIANTS.OUTLINED,
  className,
  ...badgeProps
}: BadgeProps<T>) => {
  return (
    <FormRepeaterListItemContent className={className}>
      <Badge variant={variant} {...badgeProps} />
    </FormRepeaterListItemContent>
  );
};

export default FormRepeaterListItemBadgeContent;
