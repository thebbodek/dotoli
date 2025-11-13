import clsx from 'clsx';

import { Icon } from '@/components/Icon';
import { InputPasswordRuleProps } from '@/components/Input/InputPassword/types';

const InputPasswordRules = ({ rules, value }: InputPasswordRuleProps) => {
  return (
    <ul className='shadow-in-4 rounded-in-8 bg-in-white flex flex-col gap-y-0.5 px-2.5 py-2'>
      {Object.entries(rules).map(([key, { message, regex }]) => (
        <li
          className={clsx(
            'text-in-body-12-m flex gap-x-0.5',
            !!value && regex.test(value)
              ? 'text-in-green-05'
              : 'text-in-gray-05',
          )}
          key={key}
        >
          <Icon iconKey='check' />
          {message}
        </li>
      ))}
    </ul>
  );
};

export default InputPasswordRules;
