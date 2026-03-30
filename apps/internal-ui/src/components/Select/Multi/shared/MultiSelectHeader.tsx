import { PropsWithChildren } from 'react';

import { Flex } from '@/components/Flex';

const MultiSelectHeader = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      align={{ items: 'center' }}
      as='header'
      className='border-b-in-gray-02 in-tablet:px-4 in-tablet:h-15 h-16 border-b px-5'
      shrink='0'
    >
      {children}
    </Flex>
  );
};

export default MultiSelectHeader;
