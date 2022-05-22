import styled from '@emotion/styled';
const TableStyled = styled.div`
  display: block;
  margin: 0;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  font-size: 13px;
  Tr {
    padding-left: 0;
    padding-right: 0;
    :last-child {
      Td {
        border-bottom: 0;
      }
    }
    Th {
      min-height: 45px;
      padding: 4px;
      white-space: nowrap;
    }
  }
  Th,
  Td {
    vertical-align: middle;
    border-bottom: 1px solid #f2f2f2;
    min-width: 8rem;
    :first-of-type {
      width: 30px;
      min-width: 30px;
    }
    &:last-child {
      overflow: visible;
      text-align: center;
    }
  }

  Th {
    background-color: navy;
    color: #fff;
    min-height: 45px;
    padding-top: 8px;
    font-weight: 600;
    padding: 7px 10px;
    Td {
      &:first-of-type,
      &:last-child {
        max-width: none;
      }

      &:first-of-type {
        width: 5rem !important;
        min-width: 5rem !important;
      }
    }
  }

  td {
    position: relative;
    padding: 0.5rem;
    font-size: 13px;

    &:after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 60%;
      background-color: rgba(0, 0, 0, 0.02);
    }
    &:first-of-type {
      &:after {
        content: none;
      }
    }
  }

  thead {
    tr {
      height: 45px;
    }
  }
`;

export default TableStyled;
