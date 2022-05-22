import { Box } from '@chakra-ui/react';
import SingleEvaluate from './SingleEvaluate';

const EvaluateQuestAns = ({ questAnsArr }) => {
  return (
    <Box m={'20px'} fontSize={'12px'}>
      {questAnsArr.map(evaluateItem => (
        <SingleEvaluate evaluateItem={evaluateItem} key={evaluateItem.id} />
      ))}
    </Box>
  );
};

export default EvaluateQuestAns;
