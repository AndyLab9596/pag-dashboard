import { Box } from '@chakra-ui/react';

const Description = () => {
  return (
    <Box px="46px" py="13px">
      <Box as="p" fontSize="13px" color="#8dabc4" lineHeight="19px">
        Please list between 5-15 contributors who can provide feedback on your performance in the past year. If you have
        submitted a list of contributors last year and would like to view that list, click the "View Previous List"
        button on the left. You can select any names to add to this year's list. Once your list is complete, click the
        "Submit" button below to proceed to the next step. Your form will not be submitted unless you proceed.
      </Box>
    </Box>
  );
};

export default Description;
