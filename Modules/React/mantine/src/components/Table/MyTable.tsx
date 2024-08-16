import {
  Table,
  Checkbox,
  Group,
  Button,
  LoadingOverlay,
  Box,
  Card,
  ActionIcon,
} from '@mantine/core';
import { Dispatch, useState, useEffect } from 'react';
import { MyPagination, MyPaginationInterface } from './MyPagination';
import { IconTrash, IconEdit } from '@tabler/icons-react';

export interface TableRowInterface {
  tableData: Array<any>;
  columns: TableColumnInterface[];
  selectedRows: any[];
  setSelectedRows: Dispatch<React.SetStateAction<any>>;
  handleEdit?: (e: any) => void;
  handleDelete?: (e: any) => void;
  pagination?: MyPaginationInterface;
  loading: boolean;
  onPerPageChange?: (page: number) => void;
}

export interface TableColumnInterface {
  name: string;
  label: string;
}

export function MyTable(props: TableRowInterface) {
  const rows = props.tableData ? buildTableRow(props) : [];
  const columns = props.columns;
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    if (props.selectedRows.length) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [props.selectedRows]);

  function handleCheckAll() {
    if (checkAll) {
      props.setSelectedRows([]);
    }
    setCheckAll(!checkAll);
  }

  return (
    <>
      <Box pos="relative">
        <LoadingOverlay
          visible={props.loading || false}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 0 }}
        />
        <Table striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <Checkbox aria-label="Select row" checked={checkAll} onChange={handleCheckAll} />
              </Table.Th>
              {columns.map((column) => (
                <Table.Th key={column.name}>{column.label}</Table.Th>
              ))}
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
          <Table.Caption style={{ textAlign: 'center' }}>
            <Group justify="center">
              {props.pagination?.total ? (
                <MyPagination
                  onPerPageChange={props.onPerPageChange}
                  total={props.pagination?.total || 1}
                  initial={10}
                  onPageChange={props.pagination?.onPageChange}
                  current={props.pagination.current}
                ></MyPagination>
              ) : (
                <>Loading</>
              )}
            </Group>
          </Table.Caption>
        </Table>
      </Box>
    </>
  );
}

function buildTableRow({
  tableData,
  columns,
  selectedRows,
  setSelectedRows,
  handleEdit = (e: any): void => {},
  handleDelete = (e: any): void => {},
}: TableRowInterface) {
  const rows = tableData.map((data, index) => (
    <Table.Tr
      key={index}
      bg={selectedRows.includes(data.id) ? 'var(--mantine-color-blue-light)' : undefined}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(data.id)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, data.id]
                : selectedRows.filter((position) => position !== data.id)
            )
          }
        />
      </Table.Td>
      {columns.map((column) => (
        <Table.Td key={column.name}>{data[column.name]}</Table.Td>
      ))}
      <Table.Td>
        <Group justify="center">
          <ActionIcon
            onClick={() => handleEdit(data)}
            variant="filled"
            color="cyan"
            size="md"
            radius="xl"
            aria-label="Edit"
          >
            <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>

          <ActionIcon
            onClick={() => handleDelete(data)}
            variant="filled"
            color="red"
            size="md"
            radius="xl"
            aria-label="Delete"
          >
            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return rows;
}
