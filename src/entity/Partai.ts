import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name : "partai"})
export class Partai {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    partyLeader: string

    @Column("text")
    visionMision: string
    
    @Column()
    address: string

    @Column()
    image: string
}
