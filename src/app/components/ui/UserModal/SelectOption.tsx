import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import Select from '../Form/Select';
interface SelectOptionType {
  options: Array<any>;
  name: string;
  placeholder?: string;
  onMenuOpen?: () => void;
  isLoading?: boolean;
}

const SelectOption: React.FC<SelectOptionType> = ({ isLoading = false, onMenuOpen, options, name, ...props }) => {
  const { control } = useFormContext();

  return (
    <Box flex={0.7} backgroundColor="white">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Select
            isFlatInputField={true}
            isMulti={false}
            onChange={onChange}
            value={value}
            options={options}
            onMenuOpen={onMenuOpen}
            isLoading={isLoading}
            {...props}
          />
        )}
      />
    </Box>
  );
};

interface SelectInputFieldProps extends SelectOptionType {
  label: string;
  placeholder?: string;
}

export const SelectInputField: React.FC<SelectInputFieldProps> = ({
  name,
  options,
  label,
  placeholder = '',
  ...rest
}) => {
  return (
    <VStack alignItems="flex-start" w="full" my="1">
      <Flex {...defaultPropFlex} direction="row" w="full" my="0">
        <Text {...defaultPropText} textTransform="capitalize">
          {label}
        </Text>
        <SelectOption options={options} name={name} placeholder={placeholder} {...rest} />
      </Flex>
      <ErrorMessage
        name={name}
        render={({ message }) => <p className="text-error text-left mt-5 p-0 text-13 pl-10">{message}</p>}
      />
    </VStack>
  );
};

//static
const defaultPropFlex = {
  borderBottomWidth: '1px',
  borderBottomColor: '#c5d9e8',
  my: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
};

const defaultPropText = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  pl: '10px',
  flex: 0.3,
  color: '#2c405a',
  fontSize: 'sm',
  fontWeight: 'normal',
};

export default SelectOption;
