'use client';
import React, { useEffect, useState } from 'react';
import { Pagination, Select } from '@mantine/core';

export interface MyPaginationInterface {
  total: number;
  initial: number;
  current?: number;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
}

export const MyPagination: React.FC<MyPaginationInterface> = ({
  total,
  initial,
  current,
  onPageChange,
  onPerPageChange,
}) => {
  const [perPage, setPerPage] = useState(initial);
  const [page, setPage] = useState<number>(1);

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    onPageChange?.(1);
    onPerPageChange?.(newPerPage);
    setPage(1);
  };

  function onChange(e: number) {
    onPageChange?.(e);
    setPage(e);
  }

  useEffect(() => {
    setPage(current || 1);
  }, [current]);

  const totalPages = Math.ceil(total / perPage);

  const data = [
    { value: '5', label: '5 per page' },
    { value: '10', label: '10 per page' },
    { value: '20', label: '20 per page' },
    { value: '50', label: '50 per page' },
  ];

  return (
    <>
      <Pagination total={totalPages} onChange={onChange} value={page} />
      {/* <select value={perPage} onChange={(e) => handlePerPageChange(Number(e.target.value))}>
        <option value={10}>10 per page</option>
        <option value={20}>20 per page</option>
        <option value={50}>50 per page</option>
      </select> */}

      <Select
        value={perPage.toString()}
        onChange={(value) => handlePerPageChange(Number(value))}
        // data={[10, 20, 50].map((item) => ({ value: item, label: `${item} per page` }))}
        data={data}
      />
    </>
  );
};
