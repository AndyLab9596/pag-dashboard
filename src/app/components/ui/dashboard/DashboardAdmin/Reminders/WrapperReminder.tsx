import styled from '@emotion/styled';

const Wrapper = styled.div`
  .reminders {
    position: relative;
    border-bottom: none;
    .chakra-select__wrapper {
      border: 1px #e6ebf2;
    }
    .css-intbzd > option,
    .css-intbzd > optgroup {
      background: #fff;
    }
    &__form {
      height: 1040px;
      overflow-y: scroll;
      background-color: $bg-color-reminder;
    }
    &__content {
      margin-top: 10px;
      padding: 10px 16px 10px 16px;
      width: 100%;
      &-title {
        color: #3a5470;
        font-size: 15px;
        line-height: 22px;
        display: flex;
        justify-content: space-between;
      }
      &-left,
      &-right {
        font-weight: 600;
      }
    }

    p:nth-of-type(3) {
      color: #8dabc4;
      span {
        font-weight: 500;
        cursor: pointer;
        color: $color-blue;
        font-size: 10px;
        opacity: 1;
      }
    }

    .selectNameReminder {
      width: 200px;
    }
  }
  .btn-open-notify,
  .sub-subject {
    font-size: 11px;
    font-weight: 500;
  }

  .btn-open-notify {
    color: blue;
    cursor: pointer;
  }

  .reminderContent {
    font-size: 13px;
    color: #8dabc4;
  }
  .spinnerLoading {
    text-align: center;
  }

  .buttonClose {
    color: #8dabc4;
    font-weight: 700;
    float: right;
    cursor: pointer;
  }

  .remindersSubject {
    color: #373535;
  }
`;

export default Wrapper;
