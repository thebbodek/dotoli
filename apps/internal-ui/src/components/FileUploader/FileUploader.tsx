import { DROPZONE_REJECT_MESSAGE, FILE_DEFAULT_MAX_SIZE } from '@bbodek/hooks';
import { ACCEPT_FILES } from '@bbodek/utils';
import clsx from 'clsx';

import { FILE_UPLOADER_STYLES } from '@/components/FileUploader/constants';
import FileUploaderDescription from '@/components/FileUploader/FileUploaderDescription';
import FileUploaderTitle from '@/components/FileUploader/FileUploaderTitle';
import { FileUploaderProps } from '@/components/FileUploader/types';
import { Typography } from '@/components/Typography';

const FileUploader = ({
  accept = ACCEPT_FILES,
  disabled,
  rejectedFiles,
  max = FILE_DEFAULT_MAX_SIZE,
  rootProps,
  inputProps,
  className,
  description,
  isPending = false,
}: FileUploaderProps) => {
  const isDisabled = disabled || isPending;

  const hasError = !!rejectedFiles && !isPending;

  const getStatusStyles = () => {
    if (hasError) return FILE_UPLOADER_STYLES.ERROR;

    if (isDisabled) return FILE_UPLOADER_STYLES.DISABLED;

    return FILE_UPLOADER_STYLES.DEFAULT;
  };

  return (
    <div
      className={clsx(
        className,
        'rounded-in-8 in-flex-v-stack-center in-tablet:py-[1.625rem] w-full border border-dashed px-5 py-4 transition-colors',
        !isDisabled && FILE_UPLOADER_STYLES.HOVER,
        isPending && 'pointer-events-none',
        getStatusStyles(),
      )}
      {...rootProps()}
    >
      <input {...inputProps()} />
      <FileUploaderTitle disabled={isDisabled} isPending={isPending} />
      <FileUploaderDescription
        accept={accept}
        description={description}
        disabled={isDisabled}
        isPending={isPending}
        max={max}
      />
      {hasError && (
        <Typography color='red-04' variant='body-12-m'>
          {DROPZONE_REJECT_MESSAGE[rejectedFiles.code]}
        </Typography>
      )}
    </div>
  );
};

export default FileUploader;
