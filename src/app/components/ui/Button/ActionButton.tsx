import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Button,
  useDisclosure,
  PopoverProps,
  BoxProps,
  Box,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { body } from 'app/components/GlobalStyleVariable';
import React, { PropsWithChildren } from 'react';
import { isEqual } from 'lodash';

const MenuStyled = styled.div`
  ul {
    list-style-type: none;
    margin: 0em;
    padding: 0em;
    li {
      color: #435368;
      font-size: ${body.fontSize.regular};
      padding: 1em;
      border-width: 0px 0px 1px;
      border-color: #d8e5ee;
      border-style: solid;

      &:hover {
        cursor: pointer;
        background-color: ${body.color.grey};
        color: #fff;
        &:last-child {
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }
        &:first-of-type {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
      }

      &:last-child {
        border-bottom-color: transparent;
      }
    }
  }
`;

interface Menu {
  label: string;
  callback: () => void;
}

interface ActionButtonProps extends BoxProps {
  menu: Menu[];
  disabled?: boolean;
  containerProps?: PopoverProps;
}
const ActionButton = React.memo(
  (props: PropsWithChildren<ActionButtonProps>) => {
    const { disabled = false, menu, containerProps = {}, ...rest } = props;
    const { onOpen, onClose, isOpen } = useDisclosure();
    return (
      <Popover
        isOpen={isOpen}
        onOpen={() => {
          if (!disabled) onOpen();
        }}
        onClose={onClose}
        placement="bottom-start"
        isLazy
        strategy="fixed"
        {...containerProps}
      >
        <PopoverTrigger>
          <Button bgColor="#0093ee" color="#fff">
            ...
          </Button>
        </PopoverTrigger>
        <PopoverContent boxShadow="none !important" w={rest.width ?? '195px'}>
          <PopoverArrow borderLeft="5px solid transparent" borderBottom="5px solid #fff" bg="#B9BEC5" />
          <PopoverBody
            borderWidth="1px 1px 0px"
            borderColor="#425368"
            borderRadius="8px"
            p="0px"
            boxShadow="inset 0 -1px 0 0 #425369, 0 1px 4px 0 #425368"
            w="195px"
            {...rest}
          >
            <MenuStyled>
              <ul>
                {menu.map((item, index) => (
                  <Box
                    as="li"
                    key={index}
                    onClick={() => {
                      onClose();
                      item.callback();
                    }}
                    className="text-left font-normal normal-case tracking-normal"
                    fontFamily={`'Heebo', sans-serif`}
                  >
                    {item.label}
                  </Box>
                ))}
              </ul>
            </MenuStyled>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  },
  (prevProps, nextProps) => isEqual(prevProps, nextProps),
);

export default ActionButton;
