
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { ContactRepository } from 'app/repositories/contactRepository';

export const action = async({ params, request } : ActionFunctionArgs) => {

  const formData = await request.formData();

  const current = formData.get('current') as string;

  const contactRepository = new ContactRepository
  await contactRepository.initialize()
  await contactRepository.remove(params.id)
  await contactRepository.destroy()

  return redirect(current);
}
