import {
  Box,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import Input from 'app/components/ui/Form/Input';
import { Label } from 'app/components/ui/Form/Label';
import Spinner from 'app/components/ui/Spinner';
import { useAuthState } from 'app/components/Auth/useAuthState';
import React from 'react';
import Avatar from '../Avatar';
import Button from '../Button/Button';

const popoverContentStyle = {
  border: '1px solid #d8e5ee',
  borderRadius: '5px',
  boxShadow: 'none',
  color: '#3f536e',
  right: '52px',
  top: '-8px',
  '&:hover': {
    boxShadow: 'none',
  },
  '&:focus': {
    boxShadow: 'none',
  },
};

const popoverBodyStyle = {
  p: '1em 2.5em',
};

const popoverFooterStyle = {
  ...popoverBodyStyle,
  borderTop: '1px solid #d8e5ee',
};

const popoverArrowStyle = {
  borderColor: '#d8e5ee',
  left: '84px !important',
};

const inputStyle = {
  m: '10px 0',
};

export interface ProfilePopoverProps {}

const ProfilePopover: React.FC<ProfilePopoverProps> = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { identity, loading } = useAuthState();

  const handleOpen = () => setIsOpen(!isOpen);

  const handleClose = () => setIsOpen(false);

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" px="1rem">
        <Spinner />
      </Box>
    );
  }

  return (
    <Popover isOpen={isOpen} onClose={handleClose}>
      <PopoverTrigger>
        <Flex
          as="button"
          p=".5rem 1.2rem"
          align="center"
          onClick={handleOpen}
          border="none"
          outline="none"
          _active={{
            opacity: 0.5,
          }}
        >
          <Text mr="1rem" color="white" fontSize="13px">
            Hi, {identity?.firstName}
          </Text>
          <Avatar src={identity?.image as string} boxSize="35px" />
        </Flex>
      </PopoverTrigger>
      <PopoverContent sx={popoverContentStyle}>
        <PopoverArrow bg="white" sx={popoverArrowStyle} />
        <PopoverBody sx={popoverBodyStyle}>
          <Avatar
            src={identity?.image as string}
            boxSize="90px"
            borderRadius="18%"
            mb="20px"
            textAlign="left"
            d="block"
          />
          <Label align="left" label="Name" />
          <Input value={`${identity?.firstName} ${identity?.lastName}`} isReadOnly={true} sx={inputStyle} />

          <Label align="left" label="Email" />
          <Input value={identity?.email} isReadOnly={true} sx={inputStyle} />

          <Label align="left" label="Title" />
          <Input value={identity?.title?.name} isReadOnly={true} sx={inputStyle} />

          <Label align="left" label="Department" />
          <Input value={identity?.department?.name} isReadOnly={true} sx={inputStyle} />

          <Label align="left" label="Location" />
          <Input value={identity?.location?.name} isReadOnly={true} sx={inputStyle} />
        </PopoverBody>
        <PopoverFooter sx={popoverFooterStyle}>
          <Button onClick={handleClose} fontSize="13px" w="6.5rem" h="2rem" p="0 1rem">
            Close
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
export default ProfilePopover;
