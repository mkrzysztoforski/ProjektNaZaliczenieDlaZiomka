import { Callback, Controller, Endpoint, EndpointType } from '@reste/x';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Note } from './../entities/Note';
import { NoteService } from './../services/NoteService';

@Controller('/api')
export class NoteController {
    private readonly errorMessage: { error: string } = {
        error: 'Something went wrong!'
    };

    @Endpoint('/create', EndpointType.POST)
    public create(callback: Callback): void {
        const note = callback.request.body?.note;
        const noteToSave = new Note();

        noteToSave.text = note ? note.text : 'not specified';
        noteToSave.title = note ? note.title : 'not specified';
        noteToSave.date = new Date();

        NoteService
            .setNote(noteToSave)
            .then((noteResolve: Note) => callback.response.send(noteResolve))
            .catch(() => callback.response.send(this.errorMessage));
    }

    @Endpoint('/getById/:id', EndpointType.GET)
    public getById(callback: Callback): void {
        const paramId = Number(callback.request.params.id);

        NoteService
            .getNotes({id: paramId ? paramId : 0})
            .then((notes: Note[]) => callback.response.send(notes[0]))
            .catch(() => callback.response.send(this.errorMessage));
    }

    @Endpoint('/getAll', EndpointType.GET)
    public getAll(callback: Callback): void {
        NoteService
            .getNotes()
            .then((notes: Note[]) => callback.response.send(notes))
            .catch(() => callback.response.send(this.errorMessage));
    }

    @Endpoint('/updateById', EndpointType.PUT)
    public updateById(callback: Callback): void {
        const note = callback.request.body?.note;
        const errorsResponse: {error: string }[] = [];
        const noteToUpdate = new Note();

        noteToUpdate.id = note ? note.id : errorsResponse.push({error: 'Note id not specified'});
        noteToUpdate.title = note ? note.title : errorsResponse.push({error: 'Note title not specified'});
        noteToUpdate.text = note ? note.title : errorsResponse.push({error: 'Note text not specified'});
        noteToUpdate.date = new Date();

        if (errorsResponse.length > 0) {
            callback.response.send({errors: errorsResponse});
            return;
        }

        NoteService
            .updateNode(note)
            .then((updateResult: UpdateResult) => callback.response.send({message: updateResult.affected > 0 ? 'Updated!' : 'Not found'}))
            .catch(() => callback.response.send(this.errorMessage));
    }

    @Endpoint('/delete', EndpointType.DELETE)
    public delete(callback: Callback): void {
        const noteId = callback.request.body?.noteId;

        NoteService
            .deleteNote(noteId)
            .then((deleteResult: DeleteResult) => callback.response.send({message: deleteResult.affected > 0 ? 'Deleted!' : 'Not found'}))
            .catch(() => callback.response.send(this.errorMessage));
    }
}
