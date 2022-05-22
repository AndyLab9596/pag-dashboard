import { Box, HStack, Tooltip } from '@chakra-ui/react';

import LayoutRightSide from 'app/components/Layout/LayoutRightSide';
import TitleTable from 'app/components/TitlePage/TitleTable';
import Button from 'app/components/ui/Button/Button';
import Description from './components/Description';

interface Props {
  title: string;
  isToolVisible?: boolean;
  isDescriptionVisible?: boolean;
}

const ListOfContributors: React.FC<Props> = ({
  children,
  title,
  isToolVisible = false,
  isDescriptionVisible = false,
}) => {
  return (
    <LayoutRightSide>
      <Box
        border="1px solid #a8c6df"
        borderRadius="4px"
        display="flex"
        flexDirection="column"
        gridRowGap="10px"
        mt="1.5rem"
      >
        <HStack justifyContent="space-between" pt="20px" px="20px">
          <TitleTable>{title}</TitleTable>
          {isToolVisible && (
            <HStack spacing="32px">
              <Tooltip label="Print">
                <Button variant="outline" color="rgb(0, 0, 128)">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"></path>
                  </svg>
                </Button>
              </Tooltip>
              <Tooltip label="Export">
                <Button variant="outline" color="rgb(0, 0, 128)">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
                  </svg>
                </Button>
              </Tooltip>
            </HStack>
          )}
        </HStack>
        {isDescriptionVisible && <Description />}
        {children}
      </Box>
    </LayoutRightSide>
  );
};

export default ListOfContributors;
