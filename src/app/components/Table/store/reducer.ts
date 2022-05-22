import { tableActionsType } from './actions';
export const tableReducer = (newState, action, prevState, totalData) => {
  let existedData, newSelectedRowsData;
  switch (action.type) {
    // TODO
    case tableActionsType.SELECT_ALL:
      const isSelectAll = action.payload;
      return {
        ...newState,
        isSelectAll,
        selectedRowsData: [],
        isException: isSelectAll,
        isSelectMulti: isSelectAll,
      };

    case tableActionsType.SELECT_ROW:
      const { original } = action.payload;

      existedData = prevState.selectedRowsData.find(item => item.id === original.id);

      if (!prevState.isException && !existedData) {
        // add to selected rows
        newSelectedRowsData = prevState.selectedRowsData.concat(original);
        return {
          ...newState,
          // check if select all => set 'exceptIds = []'
          selectedRowsData: newSelectedRowsData.length === totalData ? [] : newSelectedRowsData,
          isSelectAll: newSelectedRowsData.length === totalData,
          isSelectMulti: newSelectedRowsData.length === totalData || newSelectedRowsData.length > 1,
          isException: newSelectedRowsData.length === totalData || prevState.isException,
        };
      } else if (existedData) {
        // remove from exception list
        newSelectedRowsData = prevState.selectedRowsData.filter(item => item.id !== original.id);

        return {
          ...newState,
          selectedRowsData: prevState.selectedRowsData.filter(item => item.id !== original.id),
          isSelectAll: newSelectedRowsData.length === 0,
          isSelectMulti: totalData - newSelectedRowsData.length > 1,
        };
      }

      return {
        ...newState,
      };

    case tableActionsType.UNSELECT_ROW:
      const { original: unselectOriginal } = action.payload;
      existedData = prevState.selectedRowsData.find(item => item.id === unselectOriginal.id);

      if (prevState.isException && !existedData) {
        // add to exception list
        newSelectedRowsData = prevState.selectedRowsData.concat(unselectOriginal);

        return {
          ...newState,
          selectedRowsData: newSelectedRowsData,
          isSelectAll: false,
          isSelectMulti: totalData - newSelectedRowsData.length > 1,
        };
      } else if (existedData) {
        // remove from selected rows
        newSelectedRowsData = prevState.selectedRowsData.filter(item => item.id !== unselectOriginal.id);

        return {
          ...newState,
          selectedRowsData: newSelectedRowsData,
          isSelectAll: false,
          isSelectMulti: newSelectedRowsData.length > 1,
        };
      }

      return {
        ...newState,
        isSelectAll: false,
      };
    default:
      return newState;
  }
};
