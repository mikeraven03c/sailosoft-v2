import { Modal, Group, Button } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';

export const MODE_CREATE = 'create';
export const MODE_EDIT = 'edit';

export interface BaseModalInterface {
  mode: string;
  opened: boolean;
  close: () => void;
  title?: string;
  children?: React.ReactNode;
  onSubmit: () => void;
  form?: UseFormReturnType<{}>;
}

export function BaseModal({
  mode = MODE_CREATE,
  opened,
  close,
  title,
  children,
  onSubmit,
  form,
}: BaseModalInterface) {
  const textButton = mode == MODE_CREATE ? 'Create' : 'Update';
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={`${textButton} ${title}`}
        centered
        closeOnClickOutside={false}
      >
        <form>
          {children}
          <Group justify="flex-end" mt="md">
            <Button type="button" onClick={onSubmit}>
              {textButton}
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
