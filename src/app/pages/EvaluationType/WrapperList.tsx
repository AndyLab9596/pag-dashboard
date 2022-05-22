import styled from '@emotion/styled';

const Wrapper = styled.div`
  width: 100%;
  margin: 10px;
  max-width: 100%;
  .btn-AllForm {
    border-radius: 4px;
    background-color: navy;
    height: 32px;
    width: 104px;
    color: rgb(255, 255, 255);
    font-size: 0.9rem;
    font-weight: 400;
    padding: 0.6rem 1rem;
    text-decoration: none;
    box-shadow: rgb(255 255 255 / 0%) -1px 1px 0px 0px inset;

    &:hover {
      background-color: rgb(0, 0, 128);
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .tableFormType {
    margin: 0px;
    width: 98%;
    margin-left: 1%;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
  }

  .pagination {
    padding-top: 10px;
  }
  .numberPage {
    align-items: center;
    height: 33px;
    width: 70px;
    margin: 0 4px;
    text-align-last: center;
  }

  .checkboxAllForm {
    position: relative;
    top: 3px;
  }
`;

export default Wrapper;
