import { Typography } from '@bbodek/internal-ui';

import { VirtualListImageData } from '@/stories/internal-ui/VirtualList/types';

const AuthorComponent = ({ author }: Pick<VirtualListImageData, 'author'>) => {
  return (
    <Typography color='gray-07' variant='body-16-b'>
      {author}
    </Typography>
  );
};

export default AuthorComponent;
