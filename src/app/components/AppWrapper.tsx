import styled from '@emotion/styled';
import 'rc-slider/assets/index.css';

export default styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  height: calc(100vh);
  .middle-content {
    display: flex;
    height: inherit;
    .base-layout-content {
      display: flex;
      float: left;
      width: 100%;

      > div {
        width: inherit;
        padding: 1em;
      }
    }
  }
`;
