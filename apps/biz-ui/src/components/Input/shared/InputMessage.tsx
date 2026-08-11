import clsx from 'clsx';

import { Icon, ICON_WEIGHTS } from '@/components/Icon';
import {
  INPUT_CONDITION_ITEM_STYLE,
  INPUT_CONDITION_LIST_STYLE,
  INPUT_CONDITION_STATE_LABELS,
  INPUT_CONDITION_STATES,
  INPUT_CONDITION_STYLES,
  INPUT_ERROR_MESSAGE_STYLES,
  INPUT_MESSAGE_BASE_STYLE,
  INPUT_MESSAGE_ICON_KEYS,
  INPUT_MESSAGE_ICON_STYLE,
} from '@/components/Input/shared/constants';
import { InputMessageProps } from '@/components/Input/shared/types';

/**
 * @description: 박스 아래 한 자리를 에러 메시지와 조건 체크리스트가 나눠 씁니다.
 * 둘 다 오면 에러가 이깁니다 — 조건 미충족보다 앞선 신호입니다.
 * */
const InputMessage = ({ id, errorMessage, conditions }: InputMessageProps) => {
  if (errorMessage) {
    return (
      <p
        className={clsx(
          INPUT_MESSAGE_BASE_STYLE,
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
    );
  }

  if (!conditions?.length) return null;

  return (
    <ul
      className={clsx(INPUT_MESSAGE_BASE_STYLE, INPUT_CONDITION_LIST_STYLE)}
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
  );
};

export default InputMessage;
