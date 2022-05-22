import { Grid, GridItem } from '@chakra-ui/react';
import { useUserPermissions } from 'common/useUserPermissions';
import React from 'react';
import '../style.scss';
import DistributionYourRating from './DistributeYourRating/DistributionYourRating';
import ListOfContriButor from './ListContributor/ListOfContriButor';
import MyContriButor from './MyContributor/MyContriButor';

const Contributors: React.FC = () => {
  const { isUser, isCityAdmin, isCountryAdmin, isSpecialAdmin, isHead, isEvaluator } = useUserPermissions();

  return (
    <Grid gap="13px">
      {((isUser && !(isSpecialAdmin || isCityAdmin || isCountryAdmin)) || isEvaluator || isHead) && (
        <GridItem>
          <ListOfContriButor />
        </GridItem>
      )}
      <GridItem>
        <Grid gap="13px" minHeight="740px">
          <MyContriButor />
          <DistributionYourRating />
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default Contributors;
