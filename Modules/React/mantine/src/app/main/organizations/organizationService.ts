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
import { MutableRefObject } from 'react';
import { MyPaginationInterface } from '@/src/components/Table/MyPagination';

export const organizationData: BaseResourceInterface = {
  title: 'Organization',
  baseUrl: process.env.NEXT_PUBLIC_DEV_URL || 'http://test.sailosoft-v2.test/api',
  resourceUrl: 'custom-apps/organizations',
};

export interface OrganizationFormInterface {
  name: string;
  label: string;
  is_active: boolean;
}

class MyApiService extends BaseApiService implements BaseApiInterface {
  resourceUrl: string = organizationData.resourceUrl;
}

class MyAppResourceService extends AppResourceService implements AppResourceInterface {
  constructor() {
    super({
      apiService: new MyApiService(),
      resource: organizationData,
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
    setSelectedRows: React.Dispatch<React.SetStateAction<number[]>>;
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

export function organizationServiceFactory() {
  return new MyAppResourceService();
}
