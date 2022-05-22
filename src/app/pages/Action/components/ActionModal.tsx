import React, { ChangeEvent } from 'react';
import { Box, BoxProps, chakra, FormLabel, HStack, Radio, RadioGroup, VStack } from '@chakra-ui/react';

import { ActionModalOption, ModalType, SelectedField } from '../types';
import ResetModal from './ResetModal';
import ExportModal from './ExportModal';
import { CheckBoxField } from 'app/components/ui/Form/CheckBoxField';
import { FormField } from 'app/components/ui/Form';
import SendReminderWrapper from './SendReminderWrapper';
import ApproveModal from './ApproveModal';

interface Props {
  modalType?: ModalType;
}

interface PartItemProps {
  title: string;
  titleProps?: BoxProps;
}

interface PartCheckboxProps {
  option: ActionModalOption;
  onChange?: (value: SelectedField, isChecked?: boolean) => void;
}

interface PartRadioProps {
  options: ActionModalOption[];
  name: string;
}

//#region -------------- Component ------------------------------------------------
const ActionModal: React.FC<Props> = ({ modalType = 'reset' }) => {
  return mapModalTypes[modalType];
};

export const PartItem: React.FC<PartItemProps> = ({ title, children, titleProps }) => {
  return (
    <Part>
      <PartTitle {...titleProps}>{title}</PartTitle>
      <Box as="ul">{children}</Box>
    </Part>
  );
};

export const PartCheckboxField: React.FC<PartCheckboxProps> = ({ option, onChange }) => {
  const handleChange = (value: SelectedField) => (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(value, event.target.checked);
  };

  return (
    <Box as="li" m="0.5rem">
      <HStack>
        <CheckBoxField
          id={option.name}
          name={option.name}
          onChange={handleChange({
            label: option.label,
            value: option.value,
          })}
        />
        <FormLabel
          htmlFor={option.name}
          mb="0"
          fontSize="13px"
          color="#666"
          ml="1rem"
          cursor="pointer"
          fontWeight={400}
          lineHeight="20px"
        >
          {option.label}
        </FormLabel>
      </HStack>
    </Box>
  );
};

export const PartRadioField: React.FC<PartRadioProps> = ({ options, name }) => {
  return (
    <Box as="li" m="0.5rem">
      <FormField
        name={name}
        component={({ value, onChange }) => (
          <RadioGroup
            sx={{
              '.chakra-radio__label': {
                fontSize: '13px',
                color: 'rgb(102, 102, 102)',
                cursor: 'pointer',
              },
            }}
            value={value}
            onChange={onChange}
            size="md"
          >
            <VStack spacing="0.7rem" alignItems="flex-start">
              {options.map((option, index) => {
                if (option.options) {
                  return (
                    <PartItem key={option.name} title={option.label}>
                      <PartRadioField options={option.options} name={option.name} />
                    </PartItem>
                  );
                }

                if (!option.value)
                  return (
                    <Box
                      sx={{
                        marginLeft: '1rem !important',
                      }}
                      key={`space-${index}`}
                    >
                      {option.label}
                    </Box>
                  );

                return (
                  <Radio key={option.name} value={option.value} color="rgb(102, 102, 102)" cursor="pointer">
                    {option.label}
                  </Radio>
                );
              })}
            </VStack>
          </RadioGroup>
        )}
      />
    </Box>
  );
};
//#endregion -------------- Component ------------------------------------------------

const mapModalTypes: {
  [key in ModalType]: React.ReactElement;
} = {
  reset: <ResetModal />,
  approve: <ApproveModal />,
  export: <ExportModal />,
  sendReminder: <SendReminderWrapper />,
};

export const Title = chakra(Box, {
  baseStyle: {
    color: '#3f536e',
    fontSize: '17px',
    fontWeight: 500,
    lineHeight: '25px',
  },
});

export const Subtitle = chakra(Box, {
  baseStyle: {
    color: '#2c405a',
    fontSize: '15px',
    lineHeight: '22px',
    fontWeight: 500,
    padding: '16px',
  },
});

export const Description = chakra(Box, {
  baseStyle: {
    color: '#3f536e',
    fontSize: '13px',
    lineHeight: '27px',
    fontWeight: 400,
  },
});

export const BodyContainer = chakra(Box, {
  baseStyle: {
    height: '300px',
    direction: 'rtl',
    overflowY: 'auto',
    mt: '1.8rem',
    ml: '.5rem',
    mb: '1rem',
  },
});

export const Part = chakra(Box, {
  baseStyle: {
    direction: 'ltr',
    pl: '1rem',
    position: 'relative',
  },
});

export const PartTitle = chakra(Box, {
  baseStyle: {
    fontSize: '15px',
    lineHeight: '22px',
    color: '#2c405a',
    mt: '1rem',
  },
});

export default ActionModal;
