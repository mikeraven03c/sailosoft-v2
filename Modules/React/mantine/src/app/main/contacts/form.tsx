import { BaseModal, BaseModalInterface } from '@/src/components/Forms/BaseForm';
import { TextInput, Checkbox } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { ContactFormInterface, contactFormInitialData } from './contactService';

// export interface BaseModalInterface {
//   mode: string;
//   opened: boolean;
//   close: () => void;
//   title: string;
//   children?: React.ReactNode;
//   form?: UseFormReturnType<{}>;
//   onSubmit: () => void;
// }

interface ContactModalInterface extends BaseModalInterface {
  form: UseFormReturnType<{}>;
}

export default function ContactForm({
  opened,
  close,
  onSubmit,
  mode,
  form = useForm(),
}: ContactModalInterface) {
  return (
    <BaseModal
      title="Contact"
      mode={mode}
      opened={opened}
      close={close}
      onSubmit={onSubmit}
      form={form}
    >
      <TextInput
        withAsterisk
        label="Name"
        placeholder="name"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <TextInput
        withAsterisk
        label="Label"
        key={form.key('label')}
        {...form.getInputProps('label')}
      />

      <Checkbox
        mt="md"
        label="Is Active"
        key={form.key('is_active')}
        {...form.getInputProps('is_active', { type: 'checkbox' })}
      />
    </BaseModal>
  );
}
