import { ApolloQueryResult } from '@apollo/client';
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
} from '@chakra-ui/react';
import { Form } from 'app/components/ui/Form';
import { GetUserEvaluationQuery, useReverseOptOutMutation, useUpdateEvaluationMutation } from 'app/generated/graphql';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import FormOptOut from './FormOptOut';
import useToastStatus from 'app/components/Toast/useToastHook';

const FormButtonBlue = {
  minHeight: '36px',
  fontSize: '13px',
  fontWeight: 500,
  _hover: { color: 'rgba(255,255,255,0.8)' },
  borderRadius: '3px',
  borderColor: 'rgba(121,122,125,0.5)',
  borderWith: '1px',
  borderStyle: 'solid',
};

const FormButtonOutline = {
  minHeight: '36px',
  fontSize: '13px',
  fontWeight: 500,
  _hover: { color: '#3F536E', backgroundColor: '#f9f9f9' },
  borderRadius: '3px',
  borderColor: 'rgba(121,122,125,0.5)',
  borderWith: '1px',
  borderStyle: 'solid',
};

enum MODE {
  OPT_OUT = 'optOut',
  REVERSE_OPT_OUT = 'reverseOptOut',
}

export interface ModalOptOutProps {
  handleClose: () => void;
  refetch: () => Promise<ApolloQueryResult<GetUserEvaluationQuery>>;
  evaluationId: number;
  mode: 'optOut' | 'reverseOptOut';
  isAdminMode: boolean;
}

const ModalOptOut: React.FC<ModalOptOutProps> = ({ handleClose, refetch, evaluationId, mode, isAdminMode }) => {
  const toast = useToastStatus();
  const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    optOutContent: yup
      .string()
      .required('content is required')
      .min(2, 'Too Short!')
      .test(
        'Should have at least three words',
        'Please enter at least three words',
        values => !!values && values.split(' ').length > 2,
      ),
  });
  const [updateEvaluationMutation, { loading: evaluateLoading }] = useUpdateEvaluationMutation({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const [reverseOptOutMutation, { loading: reverseOptOutLoading }] = useReverseOptOutMutation({
    onError: ({ graphQLErrors }) => {
      toast({
        title: `${graphQLErrors[0].extensions.code}`,
        status: 'error',
        description: `${graphQLErrors[0].message}`,
      });
    },
  });
  const onOptOutForm = async ({ optOutContent }) => {
    try {
      await updateEvaluationMutation({
        variables: {
          saveStatus: 'optOut',
          data: {
            optOutReason: optOutContent,
          },
          evaluationId: Number(evaluationId),
          isAdminMode: isAdminMode,
        },
      });
      refetch();
    } catch (err) {}
    navigate(-1);
  };
  const handleOptOutReverse = async () => {
    try {
      await reverseOptOutMutation({
        variables: {
          evaluationId: evaluationId,
        },
      });
      refetch();
    } catch (error) {}
    navigate(-1);
  };

  return (
    <Modal
      scrollBehavior="inside"
      isOpen={true}
      onClose={handleClose}
      motionPreset="scale"
      size={'2xl'}
      isCentered={true}
      autoFocus={false}
    >
      <ModalOverlay />
      <ModalContent backgroundColor={'white'}>
        <ModalHeader textAlign="left" color="black">
          {evaluateLoading || reverseOptOutLoading ? (
            <Skeleton margin="0 auto" w="100px" h="15px" />
          ) : (
            <h1 className="text-16 font-bold w[90%] mx-auto">
              {mode === MODE.OPT_OUT
                ? `Though you do not have sufficient exposure, please provide any comments that you think would be helpful in
              the evaluation process`
                : `Do you want to reverse opt out?`}
            </h1>
          )}
        </ModalHeader>
        <ModalCloseButton />
        {mode === MODE.OPT_OUT && (
          <ModalBody>
            <Skeleton isLoaded={!evaluateLoading}>
              <Form
                id="modal-form"
                validationSchema={validationSchema}
                onSubmit={onOptOutForm}
                defaultValues={{ optOutContent: '' }}
              >
                <FormOptOut />
              </Form>
            </Skeleton>
          </ModalBody>
        )}
        <Divider />
        <ModalFooter justifyContent="center" display="flex" gridGap="10px">
          <Skeleton isLoaded={!evaluateLoading || !reverseOptOutLoading}>
            <Button onClick={handleClose} variant="outline" width={'120px'} sx={FormButtonOutline}>
              Cancel
            </Button>
          </Skeleton>
          <Skeleton isLoaded={!evaluateLoading || !reverseOptOutLoading}>
            {mode === MODE.OPT_OUT ? (
              <Button form="modal-form" isLoading={evaluateLoading} type="submit" width={'120px'} sx={FormButtonBlue}>
                OK
              </Button>
            ) : (
              <Button
                isLoading={reverseOptOutLoading}
                type="button"
                width={'120px'}
                sx={FormButtonBlue}
                onClick={() => handleOptOutReverse()}
              >
                OK
              </Button>
            )}
          </Skeleton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalOptOut;
