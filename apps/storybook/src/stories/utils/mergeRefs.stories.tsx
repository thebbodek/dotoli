import { Button } from '@bbodek/internal-ui';
import { mergeRefs } from '@bbodek/utils';
import { useRef } from 'react';

const meta = {
  title: 'core/utils/mergeRefs',
};

export default meta;

export const Default = {
  render: () => {
    const ref1 = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);

    const onRef1Click = () => {
      alert(`ref1 trigger root: ${ref1.current?.textContent}`);
    };
    const onRef2Click = () => {
      alert(`ref2 trigger root: ${ref2.current?.textContent}`);
    };

    return (
      <div className='in-flex-v-stack gap-y-2'>
        <div
          ref={mergeRefs(ref1, ref2)}
          className='bg-in-gray-02 rounded-in-8 p-4 text-center'
        >
          Bbodek
        </div>
        <ul className='flex items-center gap-x-2'>
          <li>
            <Button onClick={onRef1Click} label='ref1' />
          </li>
          <li>
            <Button onClick={onRef2Click} variant='outlined' label='ref2' />
          </li>
        </ul>
      </div>
    );
  },
};
