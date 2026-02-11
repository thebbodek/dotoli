import { clipboard } from '@bbodek/utils';

import { FILE_UPLOAD_STATES } from '@/components/File/constants';
import FileDescription from '@/components/File/FileInfo/FileDescription';
import FileTitleActionButton from '@/components/File/FileInfo/FileTitleActionButton';
import { FileInfoProps } from '@/components/File/FileInfo/types';
import { Typography } from '@/components/Typography';

const FileInfo = ({
  name,
  createdAt,
  url,
  state,
  disabled,
  errorFeedback,
  useEdit,
  setIsEditing,
}: FileInfoProps) => {
  return (
    <div className='in-flex-v-stack min-w-0 shrink grow'>
      <div className='group flex min-w-0 shrink grow gap-x-2'>
        <Typography
          className='truncate'
          color='black'
          title={name}
          variant='body-14-m'
        >
          {name}
        </Typography>
        {url && (
          <FileTitleActionButton
            disabled={disabled}
            iconKey='link'
            onClick={() => clipboard({ text: url })}
          />
        )}
        {useEdit && state !== FILE_UPLOAD_STATES.ERROR && (
          <FileTitleActionButton
            disabled={disabled}
            iconKey='pencil-simple-line'
            onClick={() => setIsEditing(true)}
          />
        )}
      </div>
      <FileDescription
        createdAt={createdAt}
        errorFeedback={errorFeedback}
        state={state}
      />
    </div>
  );
};

export default FileInfo;
