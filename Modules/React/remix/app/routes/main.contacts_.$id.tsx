import { Form, json, useLoaderData, useNavigate } from "@remix-run/react";
import { Text, Button, Group, Grid, TextInput } from '@mantine/core';
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { ContactRepository } from "app/repositories/contactRepository";
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "Missing contactId param");
  // const contact = await getContact(params.contactId);
  const contactRepository = new ContactRepository;

  await contactRepository.initialize()
  const data = await contactRepository.show(parseInt(params.id))

  await contactRepository.destroy();

  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }



  return json({ data: data ? data : {} });
};


export const action = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const errors = {};
  if (!formData.get('name')) {
    errors['name'] = "name required"
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors: errors, success: false });
  }

  const contact = new ContactRepository

  await contact.initialize();

  await contact.create(Object.fromEntries(formData))

  await contact.destroy();

  return json({
    errors: {},
    success: true
  })
};


export default function MainContactsShow() {
  const navigate = useNavigate();
  // const { data } = useLoaderData<typeof loader>();
  const loadData = useLoaderData<typeof loader>();

  const data = loadData.data

  function show() {
    navigate(`edit`)
  }

  return <>
    <Text>Show Contact</Text>
    <Form method="post">
      <Grid mt="md">
        <Grid.Col span={6}>
          <TextInput
            defaultValue={data['name']}
            aria-label="Name"
            name="name"
            placeholder="Name"
            readOnly
          /></Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            defaultValue={data['label']}
            aria-label="Label"
            name="label"
            placeholder="Label"
            readOnly
          /></Grid.Col>
      </Grid>
      <Group mt="md">
        <Button onClick={show}>Edit</Button>
        <Button onClick={() => navigate(-1)} type="button">
          Cancel
        </Button>
      </Group>
    </Form>
  </>
}