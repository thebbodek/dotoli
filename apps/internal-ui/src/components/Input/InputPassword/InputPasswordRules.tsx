import clsx from 'clsx';

import { Icon } from '@/components/Icon';
import { InputPasswordRuleProps } from '@/components/Input/InputPassword/types';

const InputPasswordRules = ({ rules, value = '' }: InputPasswordRuleProps) => {
  return (
    <ul className='shadow-4 rounded-8 flex flex-col gap-y-0.5 bg-white px-2.5 py-2'>
      {Object.entries(rules).map(([key, { message, regex }]) => (
        <li
          key={key}
          className={clsx(
            'text-body-12-m flex gap-x-0.5',
            regex.test(value) ? 'text-green-05' : 'text-gray-05',
          )}
        >
          <Icon iconKey='check' />
          {message}
        </li>
      ))}
    </ul>
  );
};

export default InputPasswordRules;
