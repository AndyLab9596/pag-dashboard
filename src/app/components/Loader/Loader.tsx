import * as React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { BeatLoader } from 'react-spinners';

interface LoaderProps {
  isLoading?: boolean;
  size?: number;
  margin?: string;
  color?: string;
  boxWidth?: string;
  boxHeight?: string;
  loaderClass?: string;
}

const Wrapper = styled.div<LoaderProps>`
  .loading-box {
    width: 100%;
  }
`;

const Loader: React.FunctionComponent<LoaderProps> = props => {
  const {
    isLoading = false,
    size = 15,
    margin = '5px',
    color = '#123abc',
    boxWidth = '100%',
    boxHeight = '100px',
    loaderClass = 'loading-box',
  } = props;

  const override = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px auto;
    width: ${boxWidth ? boxWidth : '100%'};
    height: ${boxHeight ? boxHeight : '100px'};
  `;
  return (
    <Wrapper boxWidth={boxWidth} boxHeight={boxHeight}>
      <div className={isLoading ? `${loaderClass}` : ''}>
        <BeatLoader css={override} size={size} margin={margin} color={color} loading={isLoading} />
      </div>
    </Wrapper>
  );
};

export default Loader;
