import { Form, json, redirect, useActionData, useNavigate } from "@remix-run/react";
import { Text, Button, Group, Grid, TextInput } from '@mantine/core';
import { ActionFunctionArgs } from "@remix-run/node";
import { ContactRepository } from "app/repositories/contactRepository";


export const action = async ({
  request,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const errors = {};
  if (!formData.get('name')) {
    errors['name'] = "name required"
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors: errors, success: false, data: {} });
  }

  const contact = new ContactRepository

  await contact.initialize();

  const data = await contact.create(Object.fromEntries(formData))

  await contact.destroy();

  return redirect(`/main/contacts/${data['id']}`);
  return json({
    errors: {},
    success: true,
    data: data
  })
};


export default function MainContactsNew() {
  const navigate = useNavigate();
  const actionData = useActionData<typeof action>();

  if (actionData?.success) {
    const data = actionData?.data
    navigate(`main/contacts/${data['id']}`)
  }

  return <>
    <Text>Create Contact</Text>
    <Form method="post">
      <Grid mt="md">
        <Grid.Col span={6}>
          <TextInput
            aria-label="Name"
            name="name"
            placeholder="Name"
            error={actionData?.errors?.['name'] }
          /></Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            aria-label="Label"
            name="label"
            placeholder="Label"
          /></Grid.Col>
      </Grid>
      <Group mt="md">
        <Button type="submit">Create</Button>
        <Button onClick={() => navigate(-1)} type="button">
          Cancel
        </Button>
      </Group>
    </Form>
  </>
}