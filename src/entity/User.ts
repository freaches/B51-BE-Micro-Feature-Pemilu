import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm"
import { Articles } from "./Articles"
import { Paslon } from "./Paslon"
import { Vote } from "./Vote"

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
    username: string

    @Column()
    password: string

    @Column({
        type: "enum",
        enum: ["admin", "editor", "ghost"],
        default: "ghost"
    })
    role: UserRoleType

    @OneToMany(() => Articles, (articles) => articles.user, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    articles : Articles[]

    @OneToOne(() => Vote , (vote) => vote.user , {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    vote : Vote

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    })
    updatedAt: Date;
}