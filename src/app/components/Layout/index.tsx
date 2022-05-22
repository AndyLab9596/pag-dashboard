import React from 'react';
import { TopNav } from '../Navigation/TopNav';
import Navigation from '../Navigation';
import { Box } from '@chakra-ui/react';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <TopNav />
      <Box as="div" display={'flex'} minWidth={'1280px'}>
        <Navigation />
        {children}
      </Box>
    </>
  );
};

export default Layout;
