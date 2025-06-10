import { PropsWithChildren } from 'react';

const MultiSelectList = ({ children }: PropsWithChildren) => {
  return (
    <ul
      className='flex-v-stack h-full gap-y-1 overflow-y-auto'
      role='listbox'
      aria-label='검색 가능 목록'
      aria-multiselectable='true'
    >
      {children}
    </ul>
  );
};

export default MultiSelectList;
