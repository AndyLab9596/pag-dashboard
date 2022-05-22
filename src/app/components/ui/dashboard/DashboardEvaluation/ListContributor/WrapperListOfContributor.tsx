import styled from '@emotion/styled';

const Wrapper = styled.div`
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
      left: 16%;
    }
  }

  .contributor {
    border: 1px solid #c5dbea;
    margin: 16px 0 0 16px;
    color: #3f536e;
    font-size: 17px;
    font-weight: 500;

    &__List {
      height: 238px;
      overflow-y: scroll;
    }
    &:hover {
      cursor: auto;
    }
  }

  .contribution__FormChart {
    height: 392px;
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
