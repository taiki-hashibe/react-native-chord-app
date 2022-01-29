import { accidentalType, fullNoteType, naturalNoteType, noteObjectType } from "./@types/note";
import { AccidentalRepository } from "./accidental";
export interface NoteObject {
    getNoteObject(note : fullNoteType, octave? : number): noteObjectType;
    getNoteObjects(num: number, diff? : number): noteObjectType[];
    getNaturalNoteObject(num : number , diff? : number): noteObjectType | void;
    getNaturalNoteObjects(numbers : number[] , diff? : number): noteObjectType[];
    getNoteNumber(note : noteObjectType): number | void;
    getNoteDegree(note : naturalNoteType): number | void;
}

class NoteObjectImpl implements NoteObject {
    getNoteObject(note: fullNoteType, octave? : number): noteObjectType {
        const _note : naturalNoteType = note.slice(0,1) as naturalNoteType;
        const _acid : string | null = note.slice(1);
        const _accidental : accidentalType = _acid == "" ? null : _acid as accidentalType;
        const _octave = octave ? octave : 0;
        return {
            note : _note,
            accidental : _accidental ,
            octave : _octave
        }
    }
    getNoteObjects(num: number, diff? : number): noteObjectType[] {
        if(diff){
            num += diff -1;
            if(num > 12){
                num -= 12;
            }
        }
        switch(num){
            case 1:
                return [
                    NoteObjectsRepository().getNoteObject("B+"),
                    NoteObjectsRepository().getNoteObject("C"),
                    NoteObjectsRepository().getNoteObject("D--"),
                ];
            case 2:
                return [
                    NoteObjectsRepository().getNoteObject("B++"),
                    NoteObjectsRepository().getNoteObject("C+"),
                    NoteObjectsRepository().getNoteObject("D-"),
                ];
            case 3:
                return [
                    NoteObjectsRepository().getNoteObject("C++"),
                    NoteObjectsRepository().getNoteObject("D"),
                    NoteObjectsRepository().getNoteObject("E--"),
                ];
            case 4:
                return [
                    NoteObjectsRepository().getNoteObject("D+"),
                    NoteObjectsRepository().getNoteObject("E-"),
                    NoteObjectsRepository().getNoteObject("F--"),
                ];
            case 5:
                return [
                    NoteObjectsRepository().getNoteObject("D++"),
                    NoteObjectsRepository().getNoteObject("E"),
                    NoteObjectsRepository().getNoteObject("F-"),
                ];
            case 6:
                return [
                    NoteObjectsRepository().getNoteObject("E+"),
                    NoteObjectsRepository().getNoteObject("F"),
                    NoteObjectsRepository().getNoteObject("G--"),
                ];
            case 7:
                return [
                    NoteObjectsRepository().getNoteObject("E++"),
                    NoteObjectsRepository().getNoteObject("F+"),
                    NoteObjectsRepository().getNoteObject("G-"),
                ];
            case 8:
                return [
                    NoteObjectsRepository().getNoteObject("F++"),
                    NoteObjectsRepository().getNoteObject("G"),
                    NoteObjectsRepository().getNoteObject("A--"),
                ];
            case 9:
                return [
                    NoteObjectsRepository().getNoteObject("G+"),
                    NoteObjectsRepository().getNoteObject("A-"),
                ];
            case 10:
                return [
                    NoteObjectsRepository().getNoteObject("G++"),
                    NoteObjectsRepository().getNoteObject("A"),
                    NoteObjectsRepository().getNoteObject("B--"),
                ];
            case 11:
                return [
                    NoteObjectsRepository().getNoteObject("A+"),
                    NoteObjectsRepository().getNoteObject("B-"),
                    NoteObjectsRepository().getNoteObject("C--"),
                ];
            case 12:
                return [
                    NoteObjectsRepository().getNoteObject("A++"),
                    NoteObjectsRepository().getNoteObject("B"),
                    NoteObjectsRepository().getNoteObject("C-"),
                ];
            default : return [];
        }
    }
    getNaturalNoteObject(num : number, diff? : number): noteObjectType | void {
        if(diff){
            num += diff;
            if(num > 7){
                num -= 7;
            }
        }
        switch(num){
            case 1:
                return this.getNoteObject("C");
            case 2:
                return this.getNoteObject("D");
            case 3:
                return this.getNoteObject("E");
            case 4:
                return this.getNoteObject("F");
            case 5:
                return this.getNoteObject("G");
            case 6:
                return this.getNoteObject("A");
            case 7:
                return this.getNoteObject("B");
            default : return;
        }
    }
    getNaturalNoteObjects(numbers: number[], diff? : number): noteObjectType[] {
        let noteObjects : noteObjectType[] = [];
        numbers.map((num) => {
            const noteObject : noteObjectType | void = this.getNaturalNoteObject(num, diff);
            if(noteObject){
                noteObjects.push(noteObject);
            }
        });
        return noteObjects;
    }
    getNoteNumber(note: noteObjectType): number | void {
        let num : number;
        switch(note.note){
            case "C":
                num = 1;
                break;
             case "D":
                num = 3;
                break;
             case "E":
                num = 5;
                break;
             case "F":
                num = 6;
                break;
             case "G":
                num = 8;
                break;
             case "A":
                num = 10;
                break;
             case "B":
                num = 12;
                break;
            default : return;
        }
        let diff : number | void = AccidentalRepository().getAccidentalDiff(note.accidental);
        if(diff == undefined){
            return;
        }
        num += diff;
        if(num > 12){
            num -= 12;
        }
        return num;
    }
    getNoteDegree(note: naturalNoteType): number | void {
        const naturalNotes = ["C","D","E","F","G","A","B"];
        return naturalNotes.indexOf(note) + 1;
    }
}

export const NoteObjectsRepository = () => {
    return new NoteObjectImpl();
}