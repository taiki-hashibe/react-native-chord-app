import { chordDegreeType, chordDetailType, chordType } from "./@types/chord";
import { noteObjectType } from "./@types/note";
import { ChordDegree, ChordDegreeRepository } from "./chordDegree";
import { ChordDetailRepository } from "./chordDetail";
import { ChordToneRepository } from "./chordTone";
import { ChordFormat, ChordFormatRepository } from "./chordFormat";
import { Input, InputRepository } from "./input";
import { NoteFormat, NoteFormatRepository } from "./noteFormat";
import { NoteObject, NoteObjectsRepository } from "./noteObject";
import { Root, RootRepository } from "./root";

export interface Chord {
    input : Input;
    note : NoteObject;
    degree : ChordDegree;
    getSampleChord(): chordType[];
    getInputChord(chords : chordType): chordType;
    getInputChords(chords : chordType[]): chordType[];
}

class ChordImpl implements Chord {
    input : Input;
    note : NoteObject;
    degree : ChordDegree;
    root : Root;
    chordFormat: ChordFormat;
    noteFormat: NoteFormat;
    constructor(planeInputNotes : number[]){
        this.input = InputRepository(planeInputNotes);
        this.note = NoteObjectsRepository();
        this.degree = ChordDegreeRepository();
        this.root = RootRepository();
        this.chordFormat = ChordFormatRepository();
        this.noteFormat = NoteFormatRepository();
    }
    getSampleChord(): chordType[] {
        const patterns : {planeRootNumber : number,inputNumbers : number[]}[] = this.input.formatChordInputNumbers();
        let chordTonesList : {notes : noteObjectType[], detail : chordDetailType}[] = [];
        patterns.map((pattern)=>{
            const chordDetail : chordDetailType | void = ChordDetailRepository(pattern.inputNumbers).getChordDetail();
            if(chordDetail){
                const degrees : chordDegreeType = this.degree.getChordDegree(chordDetail);
                const chordTones = ChordToneRepository(degrees, pattern.planeRootNumber).getChordTone();
                chordTonesList.push({
                    notes : chordTones,
                    detail : chordDetail
                });
            }
        });
        let result : chordType[] = [];
        chordTonesList.map((chordTones) => {
            const root : noteObjectType = this.root.getChordRoot(chordTones.notes);
            const trueRoot : noteObjectType = this.root.getPlaneRoot(chordTones.notes, this.input.getPlaneRootNumber());
            result.push({
                root : root,
                trueRoot : trueRoot,
                chordDetail : chordTones.detail,
                notes : chordTones.notes
            })
        })
        return result;
    }

    getInputChord(chords: chordType): chordType {
        let inputChord : chordType = {
            root : this.root.getChordRoot(chords.notes),
            trueRoot : chords.trueRoot,
            chordDetail : chords.chordDetail,
            notes : [],
        }
        const formatInputNumbers = this.input.compressIntoOctave();
        chords.notes.map((note) => {
            const noteNum = this.note.getNoteNumber(note);
            if(noteNum){
                if(formatInputNumbers.indexOf(noteNum) != -1){
                    inputChord.notes.push(note)
                }
            }
        })
        return inputChord;
    }

    getInputChords(samples : chordType[]): chordType[] {
        let inputChords : chordType[] = [];
        samples.map((sample) => {
            inputChords.push(this.getInputChord(sample));
        });
        return inputChords;
    }
}

export const ChordRepository = (planeInputNotes : number[]) => {
    return new ChordImpl(planeInputNotes);
}