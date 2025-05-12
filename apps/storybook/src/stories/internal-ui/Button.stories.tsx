import { Button } from '@bbodek/internal-ui';

const meta = {
  title: 'core/internal-ui/Button',
};

export default meta;

export const Default = () => {
  return (
    <Button
      content='button'
      className='cursor-pointer rounded-md bg-black px-3 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300'
      onClick={() => alert('clicked')}
    />
  );
};
