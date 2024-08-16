import { MODE_CREATE, MODE_EDIT } from '@/src/components/Forms/BaseForm';
import { useDisclosure, useFetch } from '@mantine/hooks';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm, UseFormReturnType } from '@mantine/form';
import { BaseApiService } from './baseApiService';
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';

export interface BaseResourceInterface {
  title: string;
  baseUrl?: string | undefined;
  resourceUrl: string;
}

export interface BaseApiInterface {
  baseUrl?: string;
  resourceUrl: string;
}

export interface AppResourceInterface {
  apiService: BaseApiService;
  resource: BaseResourceInterface;
}

export interface AppColumnInterface {
  name: string;
  label: string;
  type: string;
}

export interface PaginationDataInterface {
  data: any[];
  current_page: number;
  first_page_url: string;
  last_page_url: string;
  from: number;
  last_page: number;
  links: Array<{ url: string | null; label: string; active: boolean }>;
  next_page_url: string;
  path: string;
  per_page: 10;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface FormModalHookInterface {
  form: {
    value: UseFormReturnType<any>;
  };
  mode: {
    value: string;
    set: Dispatch<SetStateAction<string>>;
    setCreate: () => void;
    setUpdate: () => void;
  };
  modal: {
    value: boolean;
    open: () => void;
    close: () => void;
  };
}

export abstract class AppResourceService implements AppResourceInterface {
  resource: BaseResourceInterface;
  apiService: BaseApiService;
  appFormService: AppFormService;
  appNotificationService: AppNotificationService;
  title: string;

  constructor({ apiService, resource }: AppResourceInterface) {
    this.apiService = apiService;
    this.resource = resource;
    this.title = resource.title;
    this.appFormService = new AppFormService();
    this.appNotificationService = new AppNotificationService(resource);
  }

  public getFetch() {
    return this.apiService.getFetch();
  }

  public getApiService(): BaseApiService {
    return this.apiService;
  }

  public getNotificationService(): AppNotificationService {
    return this.appNotificationService;
  }

  public getModalHook() {
    return this.appFormService.modalHook();
  }

  public getFormHandle(formModalHook: FormModalHookInterface) {
    return this.appFormService.handleForm(formModalHook);
  }
}

class AppFormService {
  defaultFormField: any;
  form?: UseFormReturnType<any>;

  public modalHook() {
    const [mode, setModel] = useState<string>(MODE_CREATE);
    const [opened, { open, close }] = useDisclosure(false);
    const form = useForm();

    const formModalHook: FormModalHookInterface = {
      form: {
        value: form,
      },
      mode: {
        value: mode,
        set: setModel,
        setCreate: () => setModel(MODE_CREATE),
        setUpdate: () => setModel(MODE_EDIT),
      },
      modal: {
        value: opened,
        open,
        close,
      },
    };

    return formModalHook;
  }

  public handleForm(formHook: FormModalHookInterface) {
    return {
      handleAdd(defaultForm: any) {
        formHook.form.value.setValues(defaultForm);
        formHook.modal.open();
        formHook.mode.setCreate();
      },
      handleEdit(data: any) {
        formHook.form.value.setValues(data);
        formHook.mode.setUpdate();
        formHook.modal.open();
      },
    };
  }

  public createForm() {
    return useForm();
  }
}

class AppNotificationService {
  resource: BaseResourceInterface;
  constructor(resource: BaseResourceInterface) {
    this.resource = resource;
  }

  notifyCreated() {
    notifications.show({
      title: 'Created',
      message: this.resource.title + ' is created!',
      color: 'green',
      position: 'top-left',
    });
  }

  notifyUpdated() {
    notifications.show({
      title: 'Updated',
      message: this.resource.title + ' is updated!',
      color: 'green',
      position: 'top-right',
    });
  }

  notifyDeleted() {
    notifications.show({
      title: 'Deleted',
      message: this.resource.title + ' is deleted!',
      color: 'green',
      position: 'top-right',
    });
  }

  promptDelete({ handleConfirm }: { handleConfirm: () => void }) {
    modals.openConfirmModal({
      title: 'Delete ' + this.resource.title,
      centered: true,
      children: 'Are you sure you want to delete?',
      labels: {
        confirm: 'Delete ' + this.resource.title,
        cancel: 'Cancel',
      },
      confirmProps: { color: 'red' },
      onCancel: () => {
        console.log('on cancel');
      },
      // onConfirm: () => console.log('on confirm'),
      onConfirm: handleConfirm,
    });
  }
}
