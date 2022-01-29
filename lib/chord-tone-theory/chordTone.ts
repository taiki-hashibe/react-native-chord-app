import { chordDegreeType, chordType } from "./@types/chord";
import { accidentalType, noteObjectType } from "./@types/note";
import { NoteObject, NoteObjectsRepository } from "./noteObject";
import { NoteDegree, NoteDegreeRepository } from "./noteDegree";
import { Accidental, AccidentalRepository } from "./accidental";
import { AccidentalScore, AccidentalScoreRepository } from "./accidentalScore";

export interface ChordTone {
    note : NoteObject;
    noteDegree : NoteDegree;
    accidental : Accidental;
    accidentalScore : AccidentalScore;
    degrees : chordDegreeType;
    rootNumber : number;
    getNaturalNotesCandidacy(): noteObjectType[][];
    getChordTonesCandidacy(naturalNotesList : noteObjectType[][]): noteObjectType[][];
    getAccidentalScore(chordTonesList : noteObjectType[][]): {chordTones : noteObjectType[],score : number}[];
    returnWithTheHighestScore(chordToneWithScore : {chordTones : noteObjectType[],score : number}[]): noteObjectType[];
    getChordTone(): noteObjectType[];
}

class ChordToneImpl implements ChordTone {
    note: NoteObject;
    noteDegree: NoteDegree;
    accidental: Accidental;
    accidentalScore : AccidentalScore;
    degrees: chordDegreeType;
    rootNumber: number;
    constructor(degrees : chordDegreeType, rootNumber : number){
        this.note = NoteObjectsRepository();
        this.noteDegree = NoteDegreeRepository();
        this.accidental = AccidentalRepository();
        this.accidentalScore = AccidentalScoreRepository();
        this.degrees = degrees;
        this.rootNumber = rootNumber;
    }
    getNaturalNotesCandidacy(): noteObjectType[][]{
        let noteObjectsCandidacy : noteObjectType[][] = [];
        this.degrees.chromatic.map((chromatic) => {
            noteObjectsCandidacy.push(this.note.getNoteObjects(chromatic,this.rootNumber));
        });
        let naturalNotesList : noteObjectType[][] = [];
        noteObjectsCandidacy[0].map((root) => {
            let list :noteObjectType[] = [];
            this.degrees.degree.map((deg) => {
                const chordToneCandidacy = this.noteDegree.getNaturalNoteFromSpecNote(root, deg);
                if(chordToneCandidacy){
                    list.push(chordToneCandidacy);
                }
            });
            naturalNotesList.push(list)
        });
        return naturalNotesList;
    }
    getChordTonesCandidacy(naturalNotesList : noteObjectType[][]): noteObjectType[][] {
        let chordTones : noteObjectType[][] = [];
        naturalNotesList.map((notes,n) => {
            let tones : noteObjectType[] = [];
            notes.map((note, i) => {
                const noteNum : number | void = this.note.getNoteNumber(note);
                if(noteNum){
                    let sum : number = this.degrees.chromatic[i] + this.rootNumber - 1;
                    if(sum > 12){
                        sum -= 12;
                    }
                    let accidentalDiff : number = sum - noteNum ;
                    if(sum == 1 && noteNum == 12){
                        accidentalDiff = 1;
                    }else if(sum == 1 && noteNum == 11){
                        accidentalDiff = 2;
                    }else if(sum == 2 && noteNum == 12){
                        accidentalDiff = 2;
                    }
                    const accidental : accidentalType | void = this.accidental.getAccidental(accidentalDiff);
                    if(accidentalDiff <= 2 && accidentalDiff >= -2){
                        if(accidental){
                            tones.push({
                                note : note.note,
                                accidental : accidental,
                                octave : note.octave
                            });
                        }else{
                            tones.push({
                                note : note.note,
                                accidental : null,
                                octave : note.octave
                            });
                        }
                    }
                }
            });
            if(naturalNotesList[n].length == tones.length){
                chordTones.push(tones);
            }
        });
        return chordTones;
    }
    getAccidentalScore(chordTonesList: noteObjectType[][]): { chordTones: noteObjectType[]; score: number; }[] {
        let chordTonesWithAccidentalScore : {
            chordTones : noteObjectType[]
            score : number
        }[] = [];
        chordTonesList.map((chordTones) => {
            chordTonesWithAccidentalScore.push({
                chordTones : chordTones,
                score : this.accidentalScore.judgeNotes(chordTones)
            });
        });
        return chordTonesWithAccidentalScore;
    }
    returnWithTheHighestScore(chordToneWithScore: { chordTones: noteObjectType[]; score: number; }[]): noteObjectType[] {
        let result : noteObjectType[] = [];

        for(let i : number = 0; i >= -100; i--){
            chordToneWithScore.map((chord, c) => {
                if(chord.score == i){
                    i -= 1000;
                    result = chordToneWithScore[c].chordTones;
                }
            })
        }
        return result;
    }
    getChordTone(): noteObjectType[] {
        let naturalNotesList : noteObjectType[][] = this.getNaturalNotesCandidacy();
        let chordTones : noteObjectType[][] = this.getChordTonesCandidacy(naturalNotesList);
        let chordTonesWithAccidentalScore : {chordTones : noteObjectType[],score : number}[] = this.getAccidentalScore(chordTones);
        const result : noteObjectType[] = this.returnWithTheHighestScore(chordTonesWithAccidentalScore);
        return result;
    }
}

export const ChordToneRepository = (degrees : chordDegreeType, rootNumber : number) => {
    return new ChordToneImpl(degrees, rootNumber);
}