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

  .chakra-select__wrapper {
    border: 1px #e6ebf2;
  }
  .css-1mn8mba > option,
  .css-1mn8mba > optgroup {
    background: #fff;
  }

  .css-intbzd > option,
  .css-intbzd > optgroup {
    background: #fff;
  }

  @media only screen and (max-width: 1600px) {
    .dashboard-table {
      .dashboard-table-title {
        font-size: 0.85em;
      }
    }

    .content {
      .content-right {
        position: relative;
        left: -4%;
      }
    }

    .Evaluation {
      width: 64%;
      &:hover {
        cursor: auto;
      }
    }

    .card {
      width: 30%;
    }
  }
`;
export default Wrapper;
