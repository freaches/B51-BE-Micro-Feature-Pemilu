import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name : "articles"})
export class Articles {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    author: string

    @Column("text")
    description: string
    
    @Column()
    image: string

    @Column("date")
    date: string
}
