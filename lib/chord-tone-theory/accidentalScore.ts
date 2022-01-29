import { accidentalType, noteObjectType } from "./@types/note";

export interface AccidentalScore {
    judgeNote(note : noteObjectType): number;
    judgeNotes(notes : noteObjectType[]): number;
}

class AccidentalScoreImpl implements AccidentalScore {
    judgeNote(note: noteObjectType): number {
        switch(note.accidental){
            case "++":
            case "--":
                return -2;
            case "+":
            case "-":
                return -1;
            case null:
                return 0;
            default : return -100;
        }
    }

    judgeNotes(notes: noteObjectType[]): number {
        let deduction : number = 0;
        notes.map((note) => {
            deduction += this.judgeNote(note);
        });
        return deduction;
    }
}

export const AccidentalScoreRepository = () => {
    return new AccidentalScoreImpl();
}