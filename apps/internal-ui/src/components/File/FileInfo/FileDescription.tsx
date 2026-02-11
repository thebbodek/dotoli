import { toString } from '@bbodek/utils';

import {
  FILE_STATE_DESCRIPTION_COLORS,
  FILE_UPLOAD_STATES,
} from '@/components/File/constants';
import { FileDescriptionProps } from '@/components/File/FileInfo/types';
import { Typography } from '@/components/Typography';

const FileDescription = ({
  createdAt,
  state,
  errorFeedback,
}: FileDescriptionProps) => {
  const content = () => {
    if (state === FILE_UPLOAD_STATES.ERROR) {
      return errorFeedback;
    }

    if (state === FILE_UPLOAD_STATES.LOADING) {
      return '파일 업로드 중';
    }

    if (createdAt) {
      return toString({ date: createdAt });
    }

    return null;
  };

  const description = content();

  if (!description) return null;

  return (
    <Typography
      className='truncate'
      color={FILE_STATE_DESCRIPTION_COLORS[state]}
      variant='body-12-m'
    >
      {description}
    </Typography>
  );
};

export default FileDescription;
