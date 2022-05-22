import { Grid, GridItem } from '@chakra-ui/react';
import { useUserPermissions } from 'common/useUserPermissions';
import React from 'react';
import DistributionOfYourSaved from './DistributionOfYourSaved/DistributionOfYourSaved';
import ListSelfAssessment from './ListSelfAssessment/ListSelfAssessment';
import MySelfAssessment from './MySelfAssessment/MySelfAssessment';

export default function SelfAssessment() {
  const { isUser, isCityAdmin, isCountryAdmin, isSpecialAdmin, isHead, isEvaluator } = useUserPermissions();

  return (
    <Grid gap="13px">
      {((isUser && !(isSpecialAdmin || isCityAdmin || isCountryAdmin)) || isEvaluator || isHead) && (
        <GridItem>
          <ListSelfAssessment />
        </GridItem>
      )}
      <GridItem>
        <Grid gap="13px" h="740px">
          <MySelfAssessment />
          <DistributionOfYourSaved />
        </Grid>
      </GridItem>
    </Grid>
  );
}
