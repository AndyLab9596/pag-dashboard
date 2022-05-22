import { useState, useCallback } from 'react';

export default function useSelectRows<P>() {
  const [selectedRows, setSelectedRows] = useState<P[]>([]);
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);

  const onSelectedRowsChange = useCallback((args: { rows: any; isSelectAll: boolean }) => {
    setSelectedRows(args.rows);
    setIsSelectAll(args.isSelectAll);
  }, []);

  return {
    selectedRows,
    isSelectAll,
    onSelectedRowsChange,
    setSelectedRows,
  };
}
