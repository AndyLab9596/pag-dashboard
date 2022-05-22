import styled from '@emotion/styled';
export const Wrapper = styled.div`
  .chakra-select__wrapper {
    border: 1px #e6ebf2;
  }

  .css-intbzd > option,
  .css-intbzd > optgroup {
    background: #fff;
  }

  .keyDates {
    position: relative;
    left: -22px;
  }
`;

export const Content = styled.div`
  height: 100%;
  .content-dashboard-left {
    width: 75%;
  }
  .content-dashboard-right {
    width: 25%;
    &__card {
      border-radius: 4px;
      border: 1px solid rgba(183, 210, 229, 0.8);
      box-shadow: inset 0 -1px 0 0 #7e95a7;
    }
  }
`;
