import { noteObjectType } from "./note";
export type suffixType = ""|"m"|"dim"|"aug"|"sus4"|"sus2"|"6"|"m6"|"test";
export type _7thType = "7"|"M7";
export type _7thFormatType = ""|"7"|"M7";
export type tensionType = "b9"|"9"|"#9"|"11"|"#11"|"b13"|"13";

export type chordDegreeType = {
    degree : number[],
    chromatic : number[]
}

export type chordDegreeMonoType = {
    degree: number,
    chromatic :number
}

export type chordDetailType = {
    suffix : suffixType,
    _7th : _7thType | null,
    tension : tensionType[]
}

export type chordObjectType = {
    note : noteObjectType,
    chordDetail : chordDetailType
}

export type chordType = {
    root : noteObjectType,
    trueRoot : noteObjectType,
    chordDetail : chordDetailType,
    notes : noteObjectType[],
    trueNotes? : noteObjectType[]
}

export type formatChordType = {
    chordName : string,
    chordRoot : string,
    root : string,
    notes : string[],
    trueNotes? : string[]
}