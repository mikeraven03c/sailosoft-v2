import {
  AppResourceService,
  BaseApiInterface,
  BaseResourceInterface,
  FormModalHookInterface,
} from '@/src/services/app/appService';

import { BaseApiService } from '@/src/services/app/baseApiService';
import { AppResourceInterface } from './../../../services/app/appService';

import { useForm } from '@mantine/form';
import { MODE_CREATE } from '@/src/components/Forms/BaseForm';
import { MutableRefObject, SetStateAction } from 'react';
import { MyPaginationInterface } from '@/src/components/Table/MyPagination';

export const contactData: BaseResourceInterface = {
  title: 'Contact',
  baseUrl: process.env.NEXT_PUBLIC_DEV_URL || '',
  resourceUrl: 'custom-apps/contacts',
};

export interface ContactFormInterface {
  name: string;
  label: string;
  is_active: boolean;
}

export const contactFormInitialData = {
  mode: 'uncontrolled',
  initialValues: {
    name: 'test',
    label: 'test',
    is_active: false,
  },
};

class ContactApiService extends BaseApiService implements BaseApiInterface {
  resourceUrl: string = contactData.resourceUrl;
}

class ContactAppResourceService extends AppResourceService implements AppResourceInterface {
  constructor() {
    super({
      apiService: new ContactApiService(),
      resource: contactData,
    });
  }

  public onSubmit({
    formHook,
    refetch,
    currentLink,
    pagination,
  }: {
    formHook: FormModalHookInterface;
    success?: () => void;
    refetch: (updateUrl?: string | undefined) => Promise<any> | undefined;
    currentLink?: MutableRefObject<string>;
    pagination: MyPaginationInterface;
  }) {
    const form = formHook.form.value;

    const value = form.getValues();

    const apiService = this.apiService;
    const notification = this.appNotificationService;

    if (formHook.mode.value == MODE_CREATE) {
      apiService.formSubmit({
        form: value,
        success: (result) => {
          apiService.refetchPerPage({
            refetch,
            perPage: pagination.initial,
            page: 1,
          });

          formHook.modal.close();
          notification.notifyCreated();
        },
        formValidation: (result) => {
          form.setErrors(result);
        },
      });
    } else {
      apiService.formUpdate({
        id: value.id,
        form: value,
        success: (result) => {
          apiService.refetchPerPage({
            refetch,
            perPage: pagination.initial,
            page: pagination.current || 1,
          });
          notification.notifyUpdated();
          formHook.modal.close();
        },
        formValidation: (result) => {
          form.setErrors(result);
        },
      });
    }
  }

  public processDelete({
    ids,
    pagination,
    refetch,
  }: {
    ids: number[] | number;
    refetch: (updateUrl?: string | undefined) => Promise<any> | undefined;
    pagination: MyPaginationInterface;
    setSelectedRows: React.Dispatch<SetStateAction<number[]>>;
  }) {
    const apiService = this.apiService;
    const notificationService = this.appNotificationService;

    notificationService.promptDelete({
      handleConfirm: () => {
        apiService.delete({
          ids: ids,
          success: (result: any) => {
            // setSelectedRows([]);
            // refetch(currentLink.current);
            apiService.refetchPerPage({
              refetch,
              perPage: pagination.initial,
              page: pagination.current || 1,
            });
            notificationService.notifyDeleted();
          },
        });
      },
    });
  }
}

export function contactServiceFactory() {
  return new ContactAppResourceService();
}
