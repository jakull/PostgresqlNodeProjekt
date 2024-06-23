import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name: "angestellte"})
export class Angestellte {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name?: string

    @Column()
    dampft?: boolean

}
