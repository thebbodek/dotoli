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
      alert(`ref1 is trigger root className: ${ref1.current?.className}`);
    };
    const onRef2Click = () => {
      alert(`ref2 is trigger root className: ${ref2.current?.className}`);
    };

    return (
      <div ref={mergeRefs(ref1, ref2)} className='merge-container'>
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
