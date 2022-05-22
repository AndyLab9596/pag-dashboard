import styled from '@emotion/styled';

const Wrapper = styled.div`
  height: 100%;
  .performanceSummaries {
    height: 300px;
    position: relative;
    top: 54px;
  }

  .card__content-lg {
    height: 96px;
  }

  .content {
    display: flex;
    height: 160px;
    padding: 18px 15px;
    .content-left {
      display: flex;
    }
    .content-right {
      position: relative;
      left: 10%;
    }
  }

  .card {
    width: 31%;

    margin-left: 16px;
    font-size: 17px;
    color: #3f536e;

    &:hover {
      cursor: auto;
    }
  }
`;

export default Wrapper;
