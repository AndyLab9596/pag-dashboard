import styled from '@emotion/styled';

const Wrapper = styled.div`
  height: 100%;
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
  .card {
    width: 31%;
    margin-left: 16px;
    font-size: 17px;
    color: #3f536e;
  }
  .card:hover {
    cursor: auto;
  }
`;

export default Wrapper;
