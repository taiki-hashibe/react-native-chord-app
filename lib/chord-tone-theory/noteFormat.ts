import { chordType, tensionType, _7thFormatType, _7thType } from "./@types/chord";
import { accidentalFormatType, accidentalType, noteObjectType } from "./@types/note";

export interface NoteFormat {
    translateAccidental(accidental: accidentalType): accidentalFormatType;
    text(note : noteObjectType): string;
    texts(notes : noteObjectType[]): string[];
}

class NoteFormatImpl implements NoteFormat {
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
    text(note : noteObjectType): string {
        console.log(note);
        return note.note + this.translateAccidental(note.accidental);
    }
    texts(notes : noteObjectType[]): string[]{
        let formatNotes : string[] = [];
        notes.map((note) => {
            formatNotes.push(this.text(note));
        });
        return formatNotes;
    }
}

export const NoteFormatRepository = () => {
    return new NoteFormatImpl();
}