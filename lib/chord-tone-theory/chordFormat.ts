import { chordType, formatChordType, tensionType, _7thFormatType, _7thType } from "./@types/chord";
import { NoteFormat, NoteFormatRepository } from "./noteFormat";
import { accidentalFormatType ,accidentalType } from "./@types/note";

export interface ChordFormat {
    noteFormat : NoteFormat;
    translateAccidental(accidental : accidentalType): accidentalFormatType;
    translate7th(_7th : _7thType | null) : _7thFormatType;
    chordName(chord : chordType): string;
    text(chord : chordType): formatChordType;
}

class ChordFormatImpl implements ChordFormat {
    noteFormat: NoteFormat;
    constructor(){
        this.noteFormat = NoteFormatRepository();
    }
    translateAccidental(accidental: accidentalType): accidentalFormatType {
        switch(accidental){
            case "+":
                return "#";
            case "++":
                return "##";
            case "-":
                return "b";
            case "--":
                return "bb";
            default : return "";
        }
    }
    translate7th(_7th : _7thType | null): _7thFormatType{
        if(_7th == null){
            return "";
        }else{
            return _7th;
        }
    }
    chordName(chord: chordType): string {
        let root : string = this.noteFormat.text(chord.root);
        let suffix : string = chord.chordDetail.suffix;
        let _7th : string = this.translate7th(chord.chordDetail._7th);
        const translateTension = (tensions : tensionType[]) => {
            if(tensions.length == 0){
                return "";
            }else{
                let tension : string = "(";
                tensions.map((t) => {
                    if(tension != "("){
                        tension += "," + t;
                    }else{
                        tension += t;
                    }
                });
                tension += ")";
                return tension;
            }
        }
        let tension : string = translateTension(chord.chordDetail.tension);
        if(suffix == "sus2" || suffix == "sus4"){
            return root + _7th + suffix + tension;
        }else{
            return root + suffix + _7th + tension;
        }
    }
    text(chord: chordType): formatChordType {
        let chordName : string = this.chordName(chord);
        const chordRoot : string = this.noteFormat.text(chord.root);
        const root : string = this.noteFormat.text(chord.trueRoot);
        const notes : string[] = this.noteFormat.texts(chord.notes);
        let trueNotes : string[] = [];
        if(chord.trueNotes){
            trueNotes = trueNotes.concat(this.noteFormat.texts(chord.trueNotes));
        }
        return {
            chordName : chordName,
            chordRoot : chordRoot,
            root : root,
            notes : notes,
            trueNotes : trueNotes
        }
    }
}

export const ChordFormatRepository = () => {
    return new ChordFormatImpl();
}