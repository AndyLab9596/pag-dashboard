import { Grid, HStack, Text, VStack } from '@chakra-ui/react';
import Button from 'app/components/ui/Button/Button';
import { InputField } from 'app/components/ui/Form';
import { DatePickerInputField } from 'app/components/ui/Form/DatePickerInputField';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

const defaultContainer = {
  border: '1px',
  borderColor: '#a8c6df',
  borderRadius: 'md',
  padding: 5,
  boxShadow: 'inset 0 -1px 0 0 #7e95a7',
  bg: 'linear-gradient(0deg, #fff 0%, #fafbfc 100%)',
};

const TitleContentEditMode = () => {
  return (
    <VStack display="flex" flex={0.5} alignItems="flex-start" spacing={2}>
      <Grid templateColumns="1fr 3fr" templateRows="repeat(2, 1fr)" gap="10px">
        <Text casing="capitalize" fontWeight="semibold" fontSize="sm" alignSelf="center">
          form title:
        </Text>
        <InputField name="name" />
        <Text casing="capitalize" fontWeight="semibold" fontSize="sm" alignSelf="center">
          creation date:
        </Text>
        <DatePickerInputField name="createdAt" />
      </Grid>
    </VStack>
  );
};

export interface EvaluationTypeEditHeaderProps {
  isEditing: boolean;
  formTypeName: string;
  createdDate: string;
  handleToggleEdit: () => void;
}

const EvaluationTypeEditHeader: React.FC<EvaluationTypeEditHeaderProps> = ({
  isEditing,
  formTypeName,
  createdDate,
  handleToggleEdit,
}) => {
  const { reset } = useFormContext();

  const onEdit = () => {
    reset();
    handleToggleEdit();
  };

  return (
    <HStack {...defaultContainer} d="flex" justifyContent="space-between">
      {isEditing ? (
        <TitleContentEditMode />
      ) : (
        <VStack display="flex" flex={0.5} alignItems="flex-start" spacing={2}>
          <Text textTransform="capitalize">{formTypeName}</Text>
          <HStack>
            <Text casing="capitalize" fontWeight="semibold" fontSize="sm">
              creation date:
            </Text>
            <Text fontSize="sm">{createdDate}</Text>
          </HStack>
        </VStack>
      )}
      <Button w="100px" textTransform="capitalize" onClick={onEdit}>
        edit
      </Button>
    </HStack>
  );
};

export default EvaluationTypeEditHeader;
