import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @Column()
    public text: string;

    @Column()
    public date: Date;
}
