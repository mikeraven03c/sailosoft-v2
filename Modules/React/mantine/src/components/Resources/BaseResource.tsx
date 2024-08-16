import {
  Title,
  Card,
  Text,
  Image,
  Badge,
  Group,
  Button,
  Checkbox,
  Code,
  ActionIcon,
  Modal,
  TextInput,
} from '@mantine/core';
import { IconFilePencil, IconRefresh, IconTrash } from '@tabler/icons-react';

export default function BaseResource({
  headerMenu,
  title,
  handleAdd,
  handleRefresh,
  handleDelete,
  table,
  loading,
}: {
  headerMenu?: React.ReactNode;
  title: string;
  table?: React.ReactNode;
  handleAdd?: () => void;
  handleRefresh?: () => void;
  handleDelete?: () => void;
  loading?: boolean;
}) {
  const defaultHeaderMenu = (
    <>
      <ActionIcon
        onClick={handleAdd}
        variant="filled"
        size="xl"
        radius="xl"
        aria-label="Add"
        loading={loading}
        loaderProps={{ type: 'dots' }}
      >
        <IconFilePencil style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
      <ActionIcon
        onClick={handleRefresh}
        variant="filled"
        color="green"
        size="xl"
        radius="xl"
        aria-label="Refresh"
        loading={loading}
        loaderProps={{ type: 'dots' }}
      >
        <IconRefresh style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
      <ActionIcon
        onClick={handleDelete}
        variant="filled"
        color="red"
        size="xl"
        radius="xl"
        aria-label="Delete"
        loading={loading}
        loaderProps={{ type: 'dots' }}
      >
        <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
    </>
  );

  return (
    <>
      <Title order={1} pl="md" pt="sm">
        {title}
      </Title>
      <Card padding="sm" shadow="sm" withBorder>
        {/* <Group mt="xs" mb="xs"> */}
        <Group>{headerMenu || defaultHeaderMenu}</Group>
        {table}
      </Card>
    </>
  );
}
