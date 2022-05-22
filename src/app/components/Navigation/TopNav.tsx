import { Box, Divider, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { defaultImgLogo } from '../../../common/helpper';
import Notification from '../Notification';
import ProfilePopover from '../ui/Popover/ProfilePopover';

const topNavStyle = {
  backgroundImage: 'linear-gradient(to right, #cc0000, #660000)',
  textAlign: 'center',
  height: '3.3em',
  justifyContent: 'space-between',
};

export const TopNav: React.FC = () => {
  return (
    <Flex sx={topNavStyle}>
      <Flex>
        <Box
          cursor="pointer"
          display="flex"
          justifyContent="center"
          alignItems="center"
          as="label"
          htmlFor="nav-toggle-menu"
          w="58px"
          color="white"
          _hover={{ bg: 'grey' }}
        >
          &#9776;
        </Box>
        <Box w="152px" p=".5em 1.5em">
          <NavLink to="/">
            <Image w="75%" m="auto" src={defaultImgLogo} alt="logo" />
          </NavLink>
        </Box>
      </Flex>
      <Flex>
        <Divider orientation="vertical" borderColor="rgb(183 183 183)" />
        <ProfilePopover />
        <Divider orientation="vertical" borderColor="rgb(183 183 183)" />
        <Notification />
      </Flex>
    </Flex>
  );
};
