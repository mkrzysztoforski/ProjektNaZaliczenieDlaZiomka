import { Connection, DeleteResult, getConnectionManager, UpdateResult } from 'typeorm';
import { Note } from './../entities/Note';

export class NoteService {
    private static connection: Connection;

    public static init(): void {
        // TODO: ustawić hasła w zmiennej środowiskowej.

        getConnectionManager()
        .create({
            database: 'mnotes',
            entities: [Note],
            host: process.env.DATABASE_HOST,
            insecureAuth : true,
            multipleStatements: true,
            password: '1234',
            synchronize: true,
            type: 'mysql',
            username: 'root'
        })
        .connect()
        .then((connect: Connection) => NoteService.connection = connect)
        .catch((error) => console.log(error));
    }

    public static setNote(note: Note): Promise<Note> {
        return new Promise<Note>((resolve, reject) => {
            NoteService
                .connection
                .manager
                .save(note)
                .then((noteResolve: Note) => resolve(noteResolve))
                .catch((error) => reject(error));
        });
    }

    public static getNotes(params?: any): Promise<Note[]> {
        return new Promise<Note[]>((resolve, reject) => {
            NoteService
                .connection
                .getRepository(Note)
                .find(params ? params : {})
                .then((notes: Note[]) => resolve(notes))
                .catch((error) => reject(error));
        });
    }

    public static updateNode(note: Note): Promise<UpdateResult> {
        return new Promise<UpdateResult>((resolve, reject) => {
            NoteService
                .connection
                .manager
                .update(Note, note.id, note)
                .then((updateResult: UpdateResult) => resolve(updateResult))
                .catch((error) => reject(error));
        });
    }

    public static deleteNote(noteId: number): Promise<DeleteResult> {
        return new Promise<DeleteResult>((resolve, reject) => {
            NoteService
                .connection
                .manager
                .delete(Note, noteId)
                .then((deleteResult: DeleteResult) => resolve(deleteResult))
                .catch((error) => reject(error));
        });
    }
}
