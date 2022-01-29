import {ChordFormatRepository} from "../../../lib/chord-tone-theory/chordFormat";

import * as noteObjects from "../../fixtures/noteObjects";
import * as chordDetails from "../../fixtures/chordDetail";

describe("Testing 'ChordFormat'",()=>{
    it("chordName",()=>{
        expect(ChordFormatRepository().chordName({
            root : noteObjects.noteObjects.C,
            chordDetail : chordDetails.chordDetails.m,
            notes : [
                noteObjects.noteObjects.C,
                noteObjects.noteObjects.Eb,
                noteObjects.noteObjects.G
            ]
        })).toEqual("Cm");
        expect(ChordFormatRepository().chordName({
            root : noteObjects.noteObjects.C,
            chordDetail : chordDetails.chordDetails.aug,
            notes : [
                noteObjects.noteObjects.C,
                noteObjects.noteObjects.E,
                noteObjects.noteObjects.Gs
            ]
        })).toEqual("Caug");
    })
});