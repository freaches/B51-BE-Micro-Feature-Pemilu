import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm"
import { Partai } from "./Partai"
import { User } from "./User"

@Entity({name : "paslon"})
export class Paslon {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    numberPaslon: number

    @Column("text")
    visionMision: string

    @Column()
    image: string

    @OneToMany(() => User, (user) => user.votePaslon)
    user : User[]

    @ManyToMany(() => Partai)
    @JoinTable()
    partai : Partai[]

}
