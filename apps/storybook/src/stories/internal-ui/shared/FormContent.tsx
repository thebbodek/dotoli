import {
  DialogOverlayFormDivider,
  InputField,
  TextArea,
} from '@bbodek/internal-ui';

import { FormContentProps } from '@/stories/internal-ui/shared/types';

const FormContent = ({ values, handleChange }: FormContentProps) => {
  return (
    <>
      <InputField
        label='생성일'
        value={values.date || ''}
        name='date'
        placeholder='0000.00.00'
        onChange={handleChange}
        required
      />
      <InputField
        label='입력사항'
        value={values.input || ''}
        name='input'
        placeholder='입력해주세요'
        onChange={handleChange}
      />
      <DialogOverlayFormDivider />
      <InputField
        label='모달명'
        value={values.title || ''}
        name='title'
        placeholder='입력해주세요'
        onChange={handleChange}
        required
      />
      <div className='grid grid-cols-2 gap-x-2.5'>
        <InputField
          label='입력사항1'
          value={values.input1 || ''}
          name='input1'
          placeholder='입력해주세요.'
          onChange={handleChange}
        />
        <InputField
          label='입력사항2'
          value={values.input2 || ''}
          name='input2'
          placeholder='입력해주세요.'
          onChange={handleChange}
        />
      </div>
      <TextArea
        label='설명'
        value={values.description || ''}
        name='description'
        placeholder='내용을 입력해주세요'
        maxLength={300}
        onChange={handleChange}
      />
    </>
  );
};

export default FormContent;
