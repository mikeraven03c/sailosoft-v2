import { ContactEntity } from "app/entities/contactEntity";
import { EntityRepository } from "./entityRepository";
import { Entity, EntityTarget } from 'typeorm';

export class ContactRepository extends EntityRepository {
  getEntity(): EntityTarget<typeof Entity> {
    return ContactEntity;
  }

  async create(formData: Record<string, unknown>) {
    try {
      const contactEntity = new ContactEntity();
      contactEntity.data = formData;
      await this.getRepository().save(contactEntity);

      return contactEntity;
    } catch(e) {
      console.error(e)
    }
  }

  async update(id: string, formData: Record<string, unknown>) {
    try {
      const contactEntity = await this.getRepository().findOneBy({
        id: id
      })

      if (contactEntity) {
        contactEntity['data'] = {
          ...contactEntity['data'],
          ...formData
        };

        await this.getRepository().save(contactEntity);
      }

      return contactEntity;
    } catch(e) {
      console.error(e)
    }
  }

  async show(id: number) {
    const data = await this.getRepository().findOneByOrFail({
      id: id
    })

    return {
      id: data[id],
      ...data['data']
    };
  }

  async remove(id: number| string) {
    const data = await this.getRepository().findOneByOrFail({
      id: id
    })

    await this.getRepository().remove(data)
  }
}
