import * as React from 'react';
import styled from '@emotion/styled/macro';
import { P } from './P';
// import { Helmet } from 'react-helmet-async';

export function NotFoundPage() {
  return (
    <>
      <title>404 Page Not Found</title>
      <meta name="description" content="Page not found" />

      <Wrapper>
        <Title>
          4
          <span role="img" aria-label="Crying Face">
            😢
          </span>
          4
        </Title>
        <P>Page not found.</P>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const Title = styled.div`
  margin-top: -8vh;
  font-weight: bold;
  color: black;
  font-size: 3.375rem;

  span {
    font-size: 3.125rem;
  }
`;
