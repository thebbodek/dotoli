import { Toaster as ReactHotToaster } from 'react-hot-toast';

const Toaster = () => {
  return (
    <ReactHotToaster
      containerStyle={{ top: 24, left: 24, bottom: 24, right: 24 }}
    />
  );
};

export default Toaster;
