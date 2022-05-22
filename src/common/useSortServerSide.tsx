import { SORT_ASC, SORT_DESC } from 'app/components/Table/types';
import { useCallback, useState } from 'react';

const defaultRefetch = (args: any) => {};

export const useSortServerSide = (refetch = defaultRefetch, sortPrimaryKey = 'sort') => {
  const [sort, setSort] = useState({ sortDirection: 'none', columnId: '' });
  const onSort = useCallback(async (column, page) => {
    switch (column.sortDirection) {
      case 'none':
      case SORT_DESC:
        setSort({ sortDirection: SORT_ASC, columnId: column.id });
        await refetch({
          page,
          [sortPrimaryKey]: {
            field: column.id,
            order: SORT_ASC,
          },
        });
        break;
      case SORT_ASC:
        setSort({ sortDirection: SORT_DESC, columnId: column.id });
        await refetch({
          page,
          [sortPrimaryKey]: {
            field: column.id,
            order: SORT_DESC,
          },
        });
        break;
    }
  }, []);

  return {
    sort,
    onSort,
  };
};
