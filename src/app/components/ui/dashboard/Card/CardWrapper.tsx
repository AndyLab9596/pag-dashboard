import styled from '@emotion/styled';

const CardContent = styled.div`
  width: 100%;
  padding: 10px 16px 10px 16px;
  width: 100%;
  font-size: 13px;
  color: #3f536e;
`;

const CardContentLeft = styled.div`
  padding-bottom: 1px;
  height: 100%;
  border-radius: 4px;
  border: 1px solid rgba(183, 210, 229, 0.8);
  box-shadow: inset 0 -1px 0 0 #7e95a7;
`;

const CardName = styled.div`
  color: rgb(58, 84, 112);
  font-size: 15px;
  line-height: 22px;
  font-weight: 600;
`;

const CardDescription = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: #3f536e;
`;

const CardDetail = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: #325473;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  &:hover {
    cursor: auto;
  }
`;
const CardDetailPerson = styled.div`
  display: flex;
  align-items: center;
  &-name {
    font-size: 13px;
  }

  @media (max-width: 768px) {
    flex-shrink: 0;
  }
`;
const CardDetailRating = styled.div`
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardDetailPersonName = styled.div`
  font-size: 13px;
`;

const CardForm = styled.div`
  height: 410px;
  overflow-y: scroll;
`;

export {
  CardName,
  CardContent,
  CardDescription,
  CardDetail,
  CardForm,
  CardDetailPerson,
  CardContentLeft,
  CardDetailRating,
  CardDetailPersonName,
};
