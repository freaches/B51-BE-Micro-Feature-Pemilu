import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity({name : "articles"})
export class Articles {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column("text")
    description: string
    
    @Column()
    image: string

    @Column("date")
    date: string

    @ManyToOne(() => User, (user) => user.articles)
    user : User
}
