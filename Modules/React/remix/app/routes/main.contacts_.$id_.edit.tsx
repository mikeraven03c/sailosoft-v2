import { Form, json, redirect, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import { Text, Button, Group, Grid, TextInput } from '@mantine/core';
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { ContactRepository } from "app/repositories/contactRepository";
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "Missing contactId param");
  const contactRepository = new ContactRepository;

  await contactRepository.initialize()
  const data = await contactRepository.show(parseInt(params.id))

  await contactRepository.destroy();

  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({
    data: data ? data : {}
  });
};


export const action = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  invariant(params.id, "Missing contactId param");
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

  const data = await contact.update(params.id, Object.fromEntries(formData))

  await contact.destroy();


  return redirect(`/main/contacts/${data['id']}`);
  return json({
    errors: {},
    data: data,
    success: true
  })
};


export default function MainContactsEdit() {
  const navigate = useNavigate();
  // const { data } = useLoaderData<typeof loader>();
  const { data } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return <>
    <Text>Edit Contact</Text>
    <Form key={data['id']} id="contact-form"  method="post">
      <Grid mt="md">
        <Grid.Col span={6}>
          <TextInput
            defaultValue={data['name']}
            aria-label="Name"
            name="name"
            placeholder="Name"
            error={actionData?.errors?.['name']}
          /></Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            defaultValue={data['label']}
            aria-label="Label"
            name="label"
            placeholder="Label"
            error={actionData?.errors?.['label']}
          /></Grid.Col>
      </Grid>
      <Group mt="md">
        <Button type="submit">Save</Button>
        <Button onClick={() => navigate(-1)} type="button">
          Cancel
        </Button>
      </Group>
    </Form>
  </>
}