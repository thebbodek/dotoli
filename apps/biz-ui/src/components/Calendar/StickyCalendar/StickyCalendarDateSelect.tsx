import {
  CTA_BUTTON_SIZES,
  CTA_BUTTON_THEMES,
  CTA_BUTTON_VARIANTS,
  CtaButton,
} from '@/components/Button';
import { BUTTON_ICON_POSITIONS } from '@/components/Button/shared/constants';
import { formatCalendarYear } from '@/components/Calendar/shared';
import {
  STICKY_CALENDAR_DATE_SELECT_STYLE,
  STICKY_CALENDAR_NEXT_YEAR_ICON_KEY,
  STICKY_CALENDAR_NEXT_YEAR_LABEL,
  STICKY_CALENDAR_PREV_YEAR_ICON_KEY,
  STICKY_CALENDAR_PREV_YEAR_LABEL,
  STICKY_CALENDAR_YEAR_ICON_KEY,
} from '@/components/Calendar/StickyCalendar/constants';
import { StickyCalendarDateSelectOption } from '@/components/Calendar/StickyCalendar/types';

const StickyCalendarDateSelect = ({
  year,
  isPrevYearDisabled,
  isNextYearDisabled,
  onPrevYear,
  onNextYear,
  onYearClick,
}: StickyCalendarDateSelectOption) => {
  return (
    <div className={STICKY_CALENDAR_DATE_SELECT_STYLE}>
      <CtaButton
        disabled={isPrevYearDisabled}
        iconOption={{ iconKey: STICKY_CALENDAR_PREV_YEAR_ICON_KEY }}
        iconPosition={BUTTON_ICON_POSITIONS.LEFT}
        label={STICKY_CALENDAR_PREV_YEAR_LABEL}
        size={CTA_BUTTON_SIZES.SM}
        theme={CTA_BUTTON_THEMES.GRAY}
        variant={CTA_BUTTON_VARIANTS.TEXT}
        onClick={onPrevYear}
      />
      <CtaButton
        iconOption={{ iconKey: STICKY_CALENDAR_YEAR_ICON_KEY }}
        iconPosition={BUTTON_ICON_POSITIONS.RIGHT}
        label={formatCalendarYear({ year })}
        size={CTA_BUTTON_SIZES.LG}
        theme={CTA_BUTTON_THEMES.GRAY}
        variant={CTA_BUTTON_VARIANTS.TEXT}
        onClick={onYearClick}
      />
      <CtaButton
        disabled={isNextYearDisabled}
        iconOption={{ iconKey: STICKY_CALENDAR_NEXT_YEAR_ICON_KEY }}
        iconPosition={BUTTON_ICON_POSITIONS.RIGHT}
        label={STICKY_CALENDAR_NEXT_YEAR_LABEL}
        size={CTA_BUTTON_SIZES.SM}
        theme={CTA_BUTTON_THEMES.GRAY}
        variant={CTA_BUTTON_VARIANTS.TEXT}
        onClick={onNextYear}
      />
    </div>
  );
};

export default StickyCalendarDateSelect;
