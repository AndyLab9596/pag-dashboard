import { Spinner as ChakraSpinner } from '@chakra-ui/spinner';
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="w-full mt-6 text-center">
      <ChakraSpinner color="#123abc" className="spinnerLoading" />
    </div>
  );
};

export default Spinner;
