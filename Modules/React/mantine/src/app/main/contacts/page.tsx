'use client';
import BaseResource from '@/src/components/Resources/BaseResource';
import { MyTable, TableColumnInterface, TableRowInterface } from '@/src/components/Table/MyTable';
import { useEffect, useRef, useState } from 'react';
import {
  contactServiceFactory,
  ContactFormInterface,
  contactFormInitialData,
} from './contactService';
import ContactForm from './form';
import { MODE_CREATE } from '@/src/components/Forms/BaseForm';
import { useForm } from '@mantine/form';
import { MyPaginationInterface } from '@/src/components/Table/MyPagination';
// const headerMenu = (<><span>Test</span> </>);

export default function () {
  const ContactService = contactServiceFactory();

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const formHook = ContactService.getModalHook();
  const handleForm = ContactService.getFormHandle(formHook);
  const form = formHook.form.value;
  const currentLink = useRef<string>('');

  const defaultForm = {
    name: '',
    label: '',
    is_active: true,
  };

  const columns: TableColumnInterface[] = [
    {
      name: 'id',
      label: 'Id',
    },
    {
      name: 'name',
      label: 'Name',
    },
  ];

  useEffect(() => {
    form.setValues(defaultForm);
  }, []);

  const { data, loading, error, refetch, abort } = ContactService.getFetch();

  const tableData: TableRowInterface = {
    columns: columns,
    tableData: data?.data || [],
    selectedRows: selectedRows,
    loading: loading,
    setSelectedRows,
  };

  const pagination: MyPaginationInterface = {
    total: data?.total || 0,
    initial: data?.per_page || 10,
    current: data?.current_page,
    onPageChange,
  };

  function onSubmit() {
    ContactService.onSubmit({
      formHook,
      refetch,
      currentLink,
      pagination,
    });
  }

  function onPageChange(e: number) {
    const apiService = ContactService.getApiService();
    apiService.refetchPerPage({
      perPage: pagination.initial,
      page: e,
      refetch,
    });
  }

  function handleAdd() {
    handleForm.handleAdd(defaultForm);
  }

  function handleEdit(e: any) {
    handleForm.handleEdit(e);
  }

  function handleMultipleDelete() {
    if (!selectedRows.length) {
      return;
    }

    processDelete(selectedRows);
  }

  function handleRowDelete(e: any) {
    processDelete(e.id);
  }

  function processDelete(ids: number[] | number) {
    ContactService.processDelete({
      ids: ids,
      pagination: pagination,
      refetch,
      setSelectedRows,
    });
  }

  function handleRefresh() {
    refetch();
  }

  function onPerPageChange(page: number) {
    const apiService = ContactService.getApiService();
    apiService.refetchPerPage({
      perPage: page,
      page: 1,
      refetch,
    });
  }

  return (
    <>
      <BaseResource
        title={ContactService.title}
        handleAdd={handleAdd}
        handleDelete={handleMultipleDelete}
        handleRefresh={handleRefresh}
        loading={loading}
        table={
          <>
            <MyTable
              columns={tableData.columns}
              tableData={tableData.tableData}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              handleEdit={handleEdit}
              handleDelete={handleRowDelete}
              pagination={pagination}
              loading={loading}
              onPerPageChange={onPerPageChange}
            ></MyTable>
          </>
        }
      ></BaseResource>
      <ContactForm
        mode={formHook.mode.value}
        opened={formHook.modal.value}
        close={formHook.modal.close}
        onSubmit={onSubmit}
        form={form}
      ></ContactForm>
    </>
  );
}
