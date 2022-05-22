import {
  Box,
  Button,
  chakra,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  HStack,
} from '@chakra-ui/react';
import Loader from 'app/components/Loader/Loader';
import { debounce, isEmpty, isEqual } from 'lodash';
import { memo, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { MdArrowDropDown, MdArrowRight } from 'react-icons/md';
import {
  Column,
  useMountedLayoutEffect,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  useGroupBy,
  useExpanded,
} from 'react-table';

import Checkbox from './Checkbox';
import { tableActions } from './store/actions';
import { tableReducer } from './store/reducer';
import TableStyled from './TableStyled';
import { getConditionalSelectHeaderCheckboxProps } from './utils';

interface TableProps {
  loading?: boolean;
  columns: Column[];
  data: any;
  pageSize: number;
  totalData?: number;
  pageIndex?: number;
  onSelectRows?: (rows) => void;
  onSelectedRowsChange?: (args: { rows: any; isSelectAll: boolean }) => void;
  hideButtonEdit?: boolean;
  onPageChange: (pageSize: number, page: number) => void;
  onSort?: (column: any, page: number) => Promise<void>;
  editButtonCallback?: (row) => void;
  onDeleteMulti?: ({ rows: any, isSelectAll: boolean }) => void;
  loadingDelete?: boolean;
  showPagination?: boolean;
  hiddenColumns?: string[]; // Array<ColumnId: string>
  showCheckboxRows?: boolean;
  controlledPageIndex?: number;
  disableGroupBy?: boolean;
  groupBy?: string[];
  manualSortBy?: boolean;
  manualPagination?: boolean;
}

const INITIAL_SELECTED_ROW_IDS = {};

const Table = memo(
  (props: PropsWithChildren<TableProps>) => {
    const {
      onDeleteMulti,
      editButtonCallback,
      onSort,
      loading = false,
      onPageChange,
      columns,
      data,
      totalData = 1,
      pageSize,
      onSelectRows,
      hideButtonEdit = false,
      loadingDelete = false,
      showPagination = true,
      hiddenColumns = [],
      showCheckboxRows = true,
      controlledPageIndex,
      onSelectedRowsChange,
      disableGroupBy = true,
      groupBy = [],
      manualSortBy = true,
      manualPagination = true,
    } = props;

    const [totalPageCount, setTotalPageCount] = useState<number>(1);
    const [debounceData, setDebounceData] = useState<any>([]);

    const useCheckAll = hooks => {
      const manualPaginationCheckbox = {
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps, state }) => {
          let { onChange, checked, indeterminate, ...rest } = getToggleAllRowsSelectedProps();
          return (
            <div className="ml-4">
              <Checkbox
                {...rest}
                onChange={e => {
                  dispatch(tableActions.selectAll(e.target.checked));
                }}
                checked={state.selectedRowsData === totalData || state.isSelectAll}
              />
            </div>
          );
        },
        Cell: ({ row, state }) => {
          let isDisabled = row.original?.disableSelected ?? false;
          let { onChange, checked, ...rest } = row.getToggleRowSelectedProps();
          let mapSelected = state.selectedRowsData.map(item => item.id);
          let customChecked =
            !isDisabled &&
            (state.isSelectAll ||
              (state.isException ? !mapSelected.includes(row.original.id) : mapSelected.includes(row.original.id)));

          return (
            <Checkbox
              {...rest}
              disabled={isDisabled}
              style={isDisabled ? { cursor: 'not-allowed' } : {}}
              onChange={e => {
                onChange(e);
                e.target.checked
                  ? dispatch(tableActions.selectRow({ original: row.original }))
                  : dispatch(tableActions.unSelectRow({ original: row.original }));
              }}
              checked={customChecked}
            />
          );
        },
        width: '30px',
        maxWidth: '30px',
      };
      const checkbox = {
        id: 'selection',
        Header: props => {
          return (
            <div className="ml-4">
              <Checkbox
                {...getConditionalSelectHeaderCheckboxProps({
                  headerProps: props,
                  checkIfRowIsSelectable: row => !row.original.disableSelected,
                  shouldSelectPage: false,
                })}
              />
            </div>
          );
        },
        Cell: ({ row }) => {
          let isDisabled = row.original?.disableSelected ?? false;
          let { checked, ...rest } = row.getToggleRowSelectedProps({
            style: {
              cursor: isDisabled ? 'not-allowed' : 'pointer',
            },
          });

          return <Checkbox disabled={isDisabled} {...rest} checked={isDisabled ? false : checked} />;
        },
        width: '30px',
        maxWidth: '30px',
      };
      if (showCheckboxRows) {
        if (manualPagination) {
          hooks.visibleColumns.push(columns => [manualPaginationCheckbox, ...columns]);
        } else {
          hooks.visibleColumns.push(columns => [checkbox, ...columns]);
        }
      } else hooks.visibleColumns.push(columns => [...columns]);
    };

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      setHiddenColumns,
      nextPage,
      previousPage,
      canPreviousPage,
      canNextPage,
      gotoPage,
      dispatch,
      setGroupBy,
      selectedFlatRows,
      state: { pageIndex, pageSize: _pageSize, selectedRowsData, isSelectAll, isException },
    } = useTable(
      {
        columns,
        data: debounceData,
        initialState: {
          pageIndex: controlledPageIndex ?? 0,
          pageSize,
          selectedRowIds: INITIAL_SELECTED_ROW_IDS,
          hiddenColumns,
          isSelectAll: false,
          selectedRowsData: [],
          isException: false,
          isSelectMulti: false,
        },
        // selectedRows reducer for server pagination
        stateReducer: (newState, action, prevState) => {
          return tableReducer(newState, action, prevState, totalData);
        },
        manualSortBy,
        disableSortRemove: true,
        manualPagination,
        pageCount: Math.ceil(totalData / pageSize),
        groupBy,
        disableGroupBy,
        autoResetSortBy: false,
      },
      useGroupBy,
      useSortBy,
      useExpanded,
      usePagination,
      useRowSelect,
      useCheckAll,
    );
    const debounceHandlePageChange = useCallback(debounce(onPageChange, 100), []);
    const updatePageIndex = useRef<boolean>(true);

    useMountedLayoutEffect(() => {
      if (onSelectRows) {
        onSelectRows(selectedRowsData);
      }
    }, [onSelectRows, selectedRowsData]);

    useMountedLayoutEffect(() => {
      if (onSelectedRowsChange) {
        if (!manualPagination) {
          let mapOriginal = selectedFlatRows.map(item => item.original);
          onSelectedRowsChange({ rows: mapOriginal, isSelectAll: false });
          return;
        }
        // isException is true && rows.length > 0 -> take all except specific rows
        onSelectedRowsChange({ rows: selectedRowsData, isSelectAll: isSelectAll || isException });
      }
    }, [onSelectedRowsChange, selectedRowsData, manualPagination, selectedFlatRows]);

    useEffect(() => {
      setHiddenColumns(hiddenColumns);
    }, [JSON.stringify(hiddenColumns), setHiddenColumns]);

    // Listen for changes in pagination and use the state to fetch our new data
    useEffect(() => {
      if (updatePageIndex.current) {
        updatePageIndex.current = false;
        return;
      }

      debounceHandlePageChange(_pageSize, pageIndex + 1);
    }, [pageIndex, _pageSize]);

    useEffect(() => {
      if (controlledPageIndex !== undefined && controlledPageIndex !== pageIndex) {
        updatePageIndex.current = true;
      }
      return () => {
        updatePageIndex.current = false;
      };
    }, [controlledPageIndex]);

    useEffect(() => {
      if (!loading && totalData !== undefined) {
        let pageCount = Math.ceil(totalData / pageSize);
        setTotalPageCount(pageCount === 0 ? 1 : pageCount);
      }
    }, [totalData, loading]);

    useEffect(() => {
      if (!loading) {
        setDebounceData(data);
      }
    }, [data, loading]);

    useEffect(() => setGroupBy(groupBy), [setGroupBy, debounceData]);

    return (
      <Box border="1px solid rgba(0, 0, 0, 0.1)" borderRadius="5px">
        <TableStyled>
          <ChakraTable width="full" {...getTableProps()} className="tableFormType" value={_pageSize}>
            <Thead>
              {headerGroups.map(headerGroup => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <Th
                      boxShadow={
                        column.sortDirection === 'DESC' || (column.isSorted && column.isSortedDesc)
                          ? 'inset 0 -3px 0 0 rgba(255, 255, 255, 0.8)'
                          : column.sortDirection === 'ASC' || (column.isSorted && !column.isSortedDesc)
                          ? 'inset 0 3px 0 0 rgba(255, 255, 255, 0.8)'
                          : ''
                      }
                      {...column.getHeaderProps({
                        ...column.getSortByToggleProps(),
                        style: {
                          ...column.getHeaderProps.style,
                          width: column?.width ?? column.getHeaderProps.style?.width,
                          minWidth: column?.minWidth ?? column.getHeaderProps.style?.minWidth,
                          cursor: column.canSort ? 'pointer' : 'default',
                          [hiddenColumns.includes('selection') && index === 0 ? 'paddingLeft' : 'marginLeft']: '1rem',
                        },
                      })}
                      onClick={() => {
                        if (typeof onSort === 'function' && column.canSort && manualSortBy)
                          onSort(column, pageIndex + 1);
                        else if (!manualSortBy && column?.toggleSortBy) {
                          column.toggleSortBy();
                        }
                      }}
                    >
                      <div
                        className={`${
                          index === headerGroup.headers.length - 1 && hideButtonEdit && 'justify-center'
                        } flex items-center`}
                      >
                        {column.render('Header')}
                        {column.canSort && (
                          <chakra.span pl="4px">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth={0}
                              viewBox="0 0 24 24"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z" />
                            </svg>
                          </chakra.span>
                        )}
                      </div>
                    </Th>
                  ))}
                  {!hideButtonEdit && <Th></Th>}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()} opacity={loading ? 0.5 : 1}>
                    {row.cells.map((cell, index) => {
                      return (
                        <Td
                          fontSize="12px"
                          {...cell.getCellProps({
                            style: {
                              width: cell?.column?.width ?? cell?.column.originalWidth,
                              minWidth: cell?.column?.minWidth ?? cell?.column.originalWidth,
                              [hiddenColumns.includes('selection') && index === 0 ? 'paddingLeft' : 'marginLeft']:
                                '1rem',
                            },
                          })}
                          isNumeric={cell.column.isNumeric}
                        >
                          {cell.isGrouped ? (
                            // If it's a grouped cell, add an expander and row count
                            <Box display="flex" alignItems="center" {...row.getToggleRowExpandedProps()}>
                              {row.isExpanded ? (
                                <MdArrowDropDown fontSize="1.6rem" />
                              ) : (
                                <MdArrowRight fontSize="1.6rem" />
                              )}{' '}
                              {cell.render('Cell')} ({row.subRows.length})
                            </Box>
                          ) : cell.isAggregated ? (
                            // If the cell is aggregated, use the Aggregated
                            // renderer for cell
                            cell.render('Aggregated')
                          ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                            // Otherwise, just render the regular cell
                            cell.render('Cell')
                          )}
                        </Td>
                      );
                    })}
                    {!hideButtonEdit && (
                      <Td>
                        <Button
                          onClick={() => {
                            if (typeof editButtonCallback === 'function') editButtonCallback(row);
                          }}
                          variant="outline"
                          fontSize="12px"
                          w="105px"
                          h="35px"
                          fontWeight="400"
                        >
                          Edit
                        </Button>
                      </Td>
                    )}
                  </Tr>
                );
              })}
              {totalData === 0 && !loading && (
                <Tr>
                  <Td colSpan={99}>
                    <div>No data</div>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </ChakraTable>
        </TableStyled>
        {(showPagination || (showPagination && totalPageCount !== 0)) && (
          <HStack
            fontSize="13px"
            borderTop="1px solid rgba(0, 0, 0, 0.1)"
            align="center"
            justify="space-between"
            w="full"
            p="10px"
          >
            <Button
              variant="outlineSecondary"
              fontSize="13px"
              flex={1}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              Previous
            </Button>
            <div className="flex-1.5 flex justify-center items-center">
              Page&nbsp;
              <NumberInput
                onChange={pageValue => {
                  const page = pageValue ? Number(pageValue) - 1 : 0;
                  gotoPage(page);
                }}
                size="sm"
                maxW={70}
                step={1}
                value={pageIndex + 1}
                min={1}
                max={totalPageCount}
              >
                <NumberInputField />
                <NumberInputStepper className="opacity-0 hover:opacity-100">
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              &nbsp;of {totalPageCount}
            </div>
            <Button
              variant="outlineSecondary"
              fontSize="13px"
              flex={1}
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              Next
            </Button>
          </HStack>
        )}
        {typeof onDeleteMulti === 'function' &&
          ((!manualPagination && !isEmpty(selectedFlatRows)) ||
            isSelectAll ||
            (isException && selectedRowsData.length !== totalData) ||
            (!isException && !isEmpty(selectedRowsData))) && (
            <Flex
              onClick={() => {
                if (!manualPagination) {
                  let mapOriginal = selectedFlatRows.map(item => item.original);
                  onDeleteMulti({ rows: mapOriginal, isSelectAll: false });
                  return;
                }
                onDeleteMulti({ rows: selectedRowsData, isSelectAll });
              }}
              borderTop="1px solid rgba(0, 0, 0, 0.1)"
              p="10px"
              justifyContent="flex-end"
            >
              <Button isLoading={loadingDelete}>Delete</Button>
            </Flex>
          )}
        {<Loader isLoading={loading} boxHeight="80px" />}
      </Box>
    );
  },
  (prevProps, nextProps) => isEqual(prevProps, nextProps),
);

export default Table;
