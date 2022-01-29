import { chordDetailType } from "./@types/chord";
import { accidentalAttributeType, noteObjectType } from "./@types/note";
import { AccidentalRepository } from "./accidental";
import { NoteObjectsRepository } from "./noteObject";

export interface Root {
    getChordRoot(notes : noteObjectType[]):noteObjectType;
    getPlaneRoot(notes : noteObjectType[], rootNumber : number):noteObjectType;
}

class RootImpl implements Root {
    getChordRoot(notes :noteObjectType[]): noteObjectType {
        return notes[0];
    }

    getPlaneRoot(notes : noteObjectType[],rootNumber : number): noteObjectType {
        const notesCandidacy = NoteObjectsRepository().getNoteObjects(rootNumber);
        let root : noteObjectType = {note : "C", accidental : null, octave :0}
        notes.map((note) => {
            notesCandidacy.map((candidacy) => {
                if(note.note == candidacy.note && note.accidental == candidacy.accidental){
                    root = note;
                    return;
                }
            });
        });
        return root;
    }
}

export const RootRepository = () => {
    return new RootImpl();
}
