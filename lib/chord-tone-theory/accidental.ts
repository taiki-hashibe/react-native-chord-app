import { accidentalAttributeType, accidentalType } from "./@types/note";

export interface Accidental {
    getAccidental(diff : number): accidentalType | void;
    getAccidentalDiff(accidental : accidentalType): number | void;
    getAccidentalAttribute(accidental : accidentalType): accidentalAttributeType;
}

class AccidentalImpl implements Accidental {
    getAccidental(diff: number): void | accidentalType {
        switch(diff){
            case -2:
                return "--";
            case -1:
                return "-";
            case 0:
                return null;
            case 1:
                return "+";
            case 2:
                return "++";
            default : return;
        }
    }
    getAccidentalDiff(accidental: accidentalType): number | void {
        switch(accidental){
            case "--":
                return -2;
            case "-":
                return -1;
            case null:
                return 0;
            case "+":
                return 1;
            case "++":
                return 2;
            default : return;
        }
    }
    getAccidentalAttribute(accidental: accidentalType): accidentalAttributeType {
        switch(accidental){
            case "+":
            case "++":
                return "s";
            case "-":
            case "--":
                return "f";
            case null:
                return "n";
            default : return "n";
        }
    }
}

export const AccidentalRepository = () => {
    return new AccidentalImpl();
}