import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

// @Entity("entity_contacts")
@Entity({
    name: 'entity_contacts',
    schema: "entity_contacts",
})
export class ContactEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column("json")
    data: object
}
