import { FormEvent, useState } from 'react';

import { Button } from '@/components/Button';
import { FileNameEditFormProps } from '@/components/File/FileInfo/types';
import { InputField } from '@/components/Input';

const FileNameEditForm = ({
  id,
  name,
  onEdit,
  setIsEditing,
}: FileNameEditFormProps) => {
  const [fileName, setFileName] = useState(name);
  const isEmpty = fileName.replaceAll(' ', '').length === 0;
  const isChanged = fileName !== name;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isChanged) {
      return setIsEditing(false);
    }

    onEdit({ id: id, value: fileName });
    setIsEditing(false);
  };

  return (
    <form className='flex flex-1 items-center gap-x-2' onSubmit={handleSubmit}>
      <InputField
        className='flex-1'
        label='파일명'
        value={fileName}
        hiddenLabel
        onChange={(e) => setFileName(e.target.value)}
      />
      <Button
        className='shrink-0'
        disabled={isEmpty}
        label={isChanged ? '완료' : '취소'}
        size='md'
        theme={isChanged ? 'primary' : 'gray'}
        type='submit'
        variant='outlined'
      />
    </form>
  );
};

export default FileNameEditForm;
