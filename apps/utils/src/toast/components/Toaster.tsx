import { Toaster as ReactHotToaster } from 'react-hot-toast';

const Toaster = () => {
  return (
    <ReactHotToaster
      containerClassName='toaster'
      containerStyle={{ top: 20, left: 20, bottom: 20, right: 20 }}
    />
  );
};

export default Toaster;
