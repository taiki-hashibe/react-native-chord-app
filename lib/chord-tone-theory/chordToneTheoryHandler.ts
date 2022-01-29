import { chordType, formatChordType } from "./@types/chord";
import { Input, InputRepository } from "./input";
import { NoteObject, NoteObjectsRepository } from "./noteObject";
import { ChordDegree, ChordDegreeRepository } from "./chordDegree";
import { Chord, ChordRepository } from "./chord";
import { Root, RootRepository } from "./root";
import { ChordFormat, ChordFormatRepository } from "./chordFormat";
import { NoteFormat, NoteFormatRepository } from "./noteFormat";

export interface ChordToneTheoryHandler {
    planeInputNotes : number[];
    input : Input;
    note : NoteObject;
    degree : ChordDegree;
    root : Root;
    chordFormat : ChordFormat;
    noteFormat : NoteFormat;
    chord : Chord;
    getViewChordObjects(obj : { chord: chordType; score: number; }[]): { chord : formatChordType, score : number}[];
    getChordObjects(): {chord : chordType, score : number}[]
    chordAppHandler(): { chord : formatChordType; score: number; }[]
}

class ChordToneTheoryHandlerImpl implements ChordToneTheoryHandler {
    input : Input;
    planeInputNotes: number[];
    note : NoteObject;
    degree : ChordDegree;
    root : Root;
    chord: Chord;
    chordFormat: ChordFormat;
    noteFormat: NoteFormat;
    constructor(planeInputNotes : number[]){
        this.input = InputRepository(planeInputNotes);
        this.planeInputNotes = this.input.sortByOrder(planeInputNotes);
        this.note = NoteObjectsRepository();
        this.degree = ChordDegreeRepository();
        this.root = RootRepository();
        this.chordFormat = ChordFormatRepository();
        this.noteFormat = NoteFormatRepository();
        this.chord = ChordRepository(this.planeInputNotes);
    }
    getViewChordObjects(obj : { chord: chordType; score: number; }[]): { chord : formatChordType; score: number; }[] {
        let result : {chord: formatChordType; score: number;}[] = [];
        obj.map((o) => {
            let chordName : formatChordType = this.chordFormat.text(o.chord)
            result.push({
                chord : chordName,
                score : o.score
            });
        });
        return result;
    }
    getChordObjects(): { chord: chordType; score: number; }[] {
        const sampleChords : chordType[] = this.chord.getSampleChord();
        const inputChords : chordType[] = this.chord.getInputChords(sampleChords);
        let result : {chord : chordType, score : number}[] = [];
        inputChords.map((chord, c) => {
            const formatSampleChordTones : string[] = this.noteFormat.texts(sampleChords[c].notes);
            const formatInputChordTones : string[] = this.noteFormat.texts(chord.notes);
            let score : number = 100;
            formatSampleChordTones.map((sNote) => {
                if(formatInputChordTones.indexOf(sNote) == -1){
                    score -= 1;
                }
            });
            if(!(chord.root.note == chord.trueRoot.note && chord.root.accidental == chord.trueRoot.accidental)){
                score -= 1;
            }
            result.push({
                chord : {
                    root : chord.root,
                    trueRoot : chord.trueRoot,
                    chordDetail : chord.chordDetail,
                    notes : chord.notes,
                    trueNotes : sampleChords[c].notes
                },
                score : score
            })
        });
        return result;
    }

    chordAppHandler(): { chord : formatChordType; score: number; }[]{
        const chordObj = this.getChordObjects();
        const exportChords = this.getViewChordObjects(chordObj);
        return exportChords;
    }
}

export const ChordToneTheoryHandlerRepository = (planeInputNotes : number[]) => {
    return new ChordToneTheoryHandlerImpl(planeInputNotes);
}