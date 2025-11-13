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
          className='bg-in-gray-02 rounded-in-8 p-4 text-center'
          ref={mergeRefs(ref1, ref2)}
        >
          Bbodek
        </div>
        <ul className='flex items-center gap-x-2'>
          <li>
            <Button label='ref1' onClick={onRef1Click} />
          </li>
          <li>
            <Button label='ref2' variant='outlined' onClick={onRef2Click} />
          </li>
        </ul>
      </div>
    );
  },
};
