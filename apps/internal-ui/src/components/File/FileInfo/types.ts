import { Dispatch, HTMLAttributes, SetStateAction } from 'react';

import { FileProps } from '@/components/File/types';
import { IconProps } from '@/components/Icon';
import { PreviewFileData } from '@/components/Preview';

export interface FileInfoSectionProps
  extends Pick<FileProps['file'], 'id' | 'name'>,
    Pick<FileProps, 'createdAt' | 'errorFeedback' | 'url' | 'onEdit'>,
    Required<Pick<FileProps, 'state' | 'disabled'>> {}

export interface FileInfoProps
  extends Pick<
    FileInfoSectionProps,
    'name' | 'createdAt' | 'errorFeedback' | 'url' | 'state' | 'disabled'
  > {
  useEdit: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export interface FileTitleActionButtonProps
  extends Pick<IconProps, 'iconKey'>,
    Pick<FileInfoSectionProps, 'disabled'>,
    Pick<HTMLAttributes<HTMLButtonElement>, 'onClick'> {}

export interface FileNameEditFormProps
  extends Required<Pick<FileProps, 'onEdit'>>,
    Pick<PreviewFileData, 'name' | 'id'> {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export interface FileDescriptionProps
  extends Pick<FileInfoProps, 'createdAt' | 'errorFeedback' | 'state'> {}
