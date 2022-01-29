import { noteObjectType } from "./@types/note";
import { NoteObject, NoteObjectsRepository } from "./noteObject";
export interface NoteDegree {
    note : NoteObject;
    // MeasureDegree(from : naturalNoteType, to : naturalNoteType): number;
    // MeasureChromatic(from : fullNoteType, to : fullNoteType): number;
    getNaturalNoteFromSpecNote(from : noteObjectType, to : number): noteObjectType | void;
}

class NoteDegreeImpl implements NoteDegree{
    note: NoteObject;
    constructor(){
        this.note = NoteObjectsRepository();
    }
    getNaturalNoteFromSpecNote(from: noteObjectType, to: number): noteObjectType | void{
        let start : number | void = this.note.getNoteDegree(from.note);
        if(start){
            let target : number = start + to - 1;
            if(target > 7){
                target -= 7;
            }
            return this.note.getNaturalNoteObject(target);
        }else{
            return;
        }
    }
}

export const NoteDegreeRepository = () => {
    return new NoteDegreeImpl();
}