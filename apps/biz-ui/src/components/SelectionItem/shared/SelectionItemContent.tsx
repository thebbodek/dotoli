import { Badge } from '@/components/Badge';
import {
  SELECTION_ITEM_BADGE_LABEL,
  SELECTION_ITEM_BADGE_STYLE,
  SELECTION_ITEM_BADGE_THEME,
  SELECTION_ITEM_BADGE_VARIANT,
  SELECTION_ITEM_LABEL_STYLE,
} from '@/components/SelectionItem/shared/constants';
import { SelectionItemContentProps } from '@/components/SelectionItem/shared/types';
import { Typography } from '@/components/Typography';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

const SelectionItemContent = ({
  label,
  isSelected,
}: SelectionItemContentProps) => {
  return (
    <>
      <Typography
        as='span'
        className={SELECTION_ITEM_LABEL_STYLE}
        color={COLOR_VARIANTS.GRAY_900}
        variant={TYPOGRAPHY_VARIANTS.BODY_LG}
      >
        {label}
      </Typography>
      {isSelected && (
        <Badge
          className={SELECTION_ITEM_BADGE_STYLE}
          label={SELECTION_ITEM_BADGE_LABEL}
          theme={SELECTION_ITEM_BADGE_THEME}
          variant={SELECTION_ITEM_BADGE_VARIANT}
        />
      )}
    </>
  );
};

export default SelectionItemContent;
