const SELECT_ALL = 'SELECT_ALL';
const SELECT_ROW = 'SELECT_ROW';
const UNSELECT_ROW = 'UNSELECT_ROW';

export const tableActionsType = {
  SELECT_ALL,
  SELECT_ROW,
  UNSELECT_ROW,
};

const createAction = <T>(type: string, payload: T) => ({
  type,
  payload,
});
export const tableActions = {
  selectAll: isSelectAll => createAction(tableActionsType.SELECT_ALL, isSelectAll),
  selectRow: row => createAction(tableActionsType.SELECT_ROW, row),
  unSelectRow: row => createAction(tableActionsType.UNSELECT_ROW, row),
};
