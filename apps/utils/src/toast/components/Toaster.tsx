import { Toaster as ReactHotToaster } from 'react-hot-toast';

const Toaster = () => {
  return (
    <ReactHotToaster
      containerStyle={{ top: 20, left: 20, bottom: 20, right: 20 }}
      containerClassName='toaster'
    />
  );
};

export default Toaster;
