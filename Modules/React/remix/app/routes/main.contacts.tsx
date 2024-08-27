import { Table, Pagination, Group, Flex, Button, ActionIcon } from '@mantine/core';
import { LoaderFunctionArgs } from '@remix-run/node';
import { json, useLoaderData, NavLink as RemixNavLink, useNavigate, Form, useSubmit, useLocation } from '@remix-run/react';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { ContactRepository } from 'app/repositories/contactRepository';
import { urlParameterResolver } from 'app/utils/parameters/parameterUtils';

export const loader = async ({ request }: LoaderFunctionArgs) => {

  const contactRepository = new ContactRepository;

  await contactRepository.initialize();

  const paramterUtils = urlParameterResolver({
    url: request.url
  })

  const data = await contactRepository.getWithPagination({
    url: request.url,
    databaseParameter: paramterUtils.parameter
  })

  await contactRepository.destroy()

  return json({
    tableData: data
  })
}


export default function MainContacts() {
  const { tableData } = useLoaderData<typeof loader>();

  const rows = tableData.data.map((element, key) => (
    <Table.Tr key={key}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.emails}</Table.Td>
      <Table.Td>
        <ActionColumn id={parseInt(element.id)} />
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <>
      <Navigation></Navigation>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Id</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Emails</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Flex
        mih={50}
        justify="center"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        <Pagination.Root
          total={tableData.totalPages}
          getItemProps={(page) => ({
            component: RemixNavLink,
            to: `${tableData.path}?page=${page}&perPage=${tableData.perPage}`,
          })}
        >
          <Group gap={7} mt="xl">
            <Pagination.First component={RemixNavLink} to={tableData.first_page_url} />
            <Pagination.Previous component={RemixNavLink} to={tableData.prev_page_url} />
            <Pagination.Items />
            <Pagination.Next component={RemixNavLink} to={tableData.next_page_url} />
            <Pagination.Last component={RemixNavLink} to={tableData.last_page_url} />
          </Group>
        </Pagination.Root>
      </Flex>

      {/* <Pagination total={tableData.totalPages} value={tableData.currentPage} onChange={setPage} mt="sm" /> */}
    </>
  )
}

function Navigation() {
  const navigate = useNavigate();

  function add() {
    navigate('new')
  }

  return (
    <Flex
      mih={50}
      gap="md"
      justify="flex-start"
      align="center"
      direction="row"
      wrap="wrap"
    >
      <Button onClick={add}>Add</Button>
      {/* <Button>Delete</Button>
      <Button>More</Button> */}
    </Flex>
  );
}

function ActionColumn({ id }: { id: number }) {
  const navigate = useNavigate();
  const submit = useSubmit();
  const location = useLocation();

  function edit() {
    navigate(`${id}/edit`)
  }

  function destroy(event: React.FormEvent) {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData();

    formData.set('current', `${location.pathname}${location.search}`)

    submit(formData, {
      method: form['method'],
      action: `${id}/destroy`
    })
  }

  return (
    <Group>
      <ActionIcon onClick={edit} variant="light" radius="xl" aria-label="Edit">
        <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
      </ActionIcon>
      <Form onSubmit={destroy} action={`${id}/destroy`} method="post">
        <ActionIcon type="submit" variant="light" color="red" radius="xl" aria-label="Delete">
          <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Form>
    </Group >)
}