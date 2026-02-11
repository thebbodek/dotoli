import dynamic from 'next/dynamic';
import { useState } from 'react';

import FileInfo from '@/components/File/FileInfo/FileInfo';
import { FileInfoSectionProps } from '@/components/File/FileInfo/types';

const FileNameEditForm = dynamic(
  () => import('@/components/File/FileInfo/FileNameEditForm'),
  { ssr: false },
);

const FileInfoSection = ({
  id,
  name,
  createdAt,
  disabled,
  state,
  url,
  errorFeedback,
  onEdit,
}: FileInfoSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing && onEdit) {
    return (
      <FileNameEditForm
        id={id}
        name={name}
        setIsEditing={setIsEditing}
        onEdit={onEdit}
      />
    );
  }

  return (
    <FileInfo
      createdAt={createdAt}
      disabled={disabled}
      errorFeedback={errorFeedback}
      name={name}
      setIsEditing={setIsEditing}
      state={state}
      url={url}
      useEdit={!!onEdit}
    />
  );
};

export default FileInfoSection;
