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
        name='date'
        placeholder='0000.00.00'
        value={values.date || ''}
        required
        onChange={handleChange}
      />
      <InputField
        label='입력사항'
        name='input'
        placeholder='입력해주세요'
        value={values.input || ''}
        onChange={handleChange}
      />
      <DialogOverlayFormDivider />
      <InputField
        label='모달명'
        name='title'
        placeholder='입력해주세요'
        value={values.title || ''}
        required
        onChange={handleChange}
      />
      <div className='grid grid-cols-2 gap-x-2.5'>
        <InputField
          label='입력사항1'
          name='input1'
          placeholder='입력해주세요.'
          value={values.input1 || ''}
          onChange={handleChange}
        />
        <InputField
          label='입력사항2'
          name='input2'
          placeholder='입력해주세요.'
          value={values.input2 || ''}
          onChange={handleChange}
        />
      </div>
      <TextArea
        label='설명'
        maxLength={300}
        name='description'
        placeholder='내용을 입력해주세요'
        value={values.description || ''}
        onChange={handleChange}
      />
    </>
  );
};

export default FormContent;
