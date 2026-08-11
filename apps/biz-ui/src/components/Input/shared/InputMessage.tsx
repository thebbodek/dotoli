import clsx from 'clsx';

import { Icon, ICON_WEIGHTS } from '@/components/Icon';
import {
  INPUT_CONDITION_ITEM_STYLE,
  INPUT_CONDITION_LIST_STYLE,
  INPUT_CONDITION_STATE_LABELS,
  INPUT_CONDITION_STATES,
  INPUT_CONDITION_STYLES,
  INPUT_COUNTER_CURRENT_STYLE,
  INPUT_COUNTER_STYLE,
  INPUT_ERROR_MESSAGE_STYLES,
  INPUT_MESSAGE_BODY_STYLE,
  INPUT_MESSAGE_ICON_KEYS,
  INPUT_MESSAGE_ICON_STYLE,
  INPUT_MESSAGE_ROW_STYLE,
} from '@/components/Input/shared/constants';
import { InputMessageProps } from '@/components/Input/shared/types';

const InputMessage = ({
  id,
  errorMessage,
  conditions,
  counter,
}: InputMessageProps) => {
  const hasConditions = !!conditions?.length;

  if (!errorMessage && !hasConditions && !counter) return null;

  return (
    <div className={INPUT_MESSAGE_ROW_STYLE}>
      {!!errorMessage && (
        <p
          className={clsx(
            INPUT_MESSAGE_BODY_STYLE,
            INPUT_ERROR_MESSAGE_STYLES.CONTAINER,
          )}
          id={id}
          role='alert'
        >
          <Icon
            className={clsx(
              INPUT_MESSAGE_ICON_STYLE,
              INPUT_ERROR_MESSAGE_STYLES.ICON,
            )}
            iconKey={INPUT_MESSAGE_ICON_KEYS.ERROR}
            weight={ICON_WEIGHTS.FILL}
            aria-hidden
          />
          {errorMessage}
        </p>
      )}

      {!errorMessage && hasConditions && (
        <ul
          className={clsx(INPUT_MESSAGE_BODY_STYLE, INPUT_CONDITION_LIST_STYLE)}
          id={id}
        >
          {conditions.map(({ label, isSatisfied }) => {
            const conditionState = isSatisfied
              ? INPUT_CONDITION_STATES.SATISFIED
              : INPUT_CONDITION_STATES.UNSATISFIED;
            const { ICON, LABEL } = INPUT_CONDITION_STYLES[conditionState];

            return (
              <li className={INPUT_CONDITION_ITEM_STYLE} key={label}>
                <Icon
                  className={clsx(INPUT_MESSAGE_ICON_STYLE, ICON)}
                  iconKey={INPUT_MESSAGE_ICON_KEYS.CONDITION}
                  weight={ICON_WEIGHTS.FILL}
                  aria-hidden
                />
                <span className={LABEL}>{label}</span>
                <span className='sr-only'>
                  {INPUT_CONDITION_STATE_LABELS[conditionState]}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {!!counter && (
        <span className={INPUT_COUNTER_STYLE}>
          <span className={INPUT_COUNTER_CURRENT_STYLE}>{counter.current}</span>
          {`/${counter.max}`}
        </span>
      )}
    </div>
  );
};

export default InputMessage;
