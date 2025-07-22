import { Button, Flex, Typography } from '@bbodek/internal-ui';
import { getUUID } from '@bbodek/utils';
import type { Meta } from '@storybook/react';
import { useState } from 'react';

const meta: Meta = {
  title: 'core/utils/getUUID',
};

export default meta;

export const Default = {
  render: () => {
    const [UUID, setUUID] = useState<string | null>(null);

    return (
      <Flex direction='column' align={{ items: 'center' }} gap={4}>
        <Typography color={UUID ? 'black' : 'gray-06'}>
          {UUID ? UUID : '버튼을 클릭해주세요'}
        </Typography>
        <Button label='UUID 발급받기' onClick={() => setUUID(getUUID())} />
      </Flex>
    );
  },
};
