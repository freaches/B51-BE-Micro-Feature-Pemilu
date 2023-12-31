import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { Articles } from "./Articles"
import { Paslon } from "./Paslon"

export type UserRoleType = "admin" | "editor" | "ghost"
export type UserGender = "male" | "female" 
@Entity({name:"users"})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    address: string

    @Column({
        type: "enum",
        enum : ["male","female"]
    })
    gender: string

    @Column()
    email: string

    @Column()
    password: number

    @Column({
        type: "enum",
        enum: ["admin", "editor", "ghost"],
        default: "ghost"
    })
    role: UserRoleType

    @OneToMany(() => Articles, (articles) => articles.user)
    articles : Articles[]

    @ManyToOne(() => Paslon , (paslon) => paslon.user)
    votePaslon : Paslon
}