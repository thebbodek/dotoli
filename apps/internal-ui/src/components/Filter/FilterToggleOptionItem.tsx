import { ChangeEvent, memo } from 'react';

import { FilterToggleOptionItemProps } from '@/components/Filter/types';
import { Toggle, TOGGLE_SIZES } from '@/components/Toggle';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const FilterToggleOptionItem = ({
  label,
  optionKey,
  checked,
  handleChange,
}: FilterToggleOptionItemProps) => {
  const toggleProps = {
    checked,
    name: optionKey,
    onChange: ({ target: { name } }: ChangeEvent<HTMLInputElement>) =>
      handleChange({ optionKey: name }),
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events -- 실제 조작 대상은 내부 Toggle(네이티브 포커스 가능), li onClick은 행 클릭 포인터 편의
    <li
      aria-selected={checked}
      className='in-flex-h-stack in-tablet:px-0 justify-between px-2'
      role='option'
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleChange({ optionKey });
        }
      }}
    >
      <Typography
        as='span'
        color='black'
        variant={TYPOGRAPHY_VARIANTS.BODY_14_R}
      >
        {label}
      </Typography>
      <Toggle
        className='in-tablet:flex hidden'
        size={TOGGLE_SIZES.SM}
        {...toggleProps}
      />
      <Toggle
        className='in-tablet:hidden flex'
        size={TOGGLE_SIZES.MD}
        {...toggleProps}
      />
    </li>
  );
};

export default memo(FilterToggleOptionItem);
