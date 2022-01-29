import { chordDegreeType } from "../../../lib/chord-tone-theory/@types/chord";
import { ChordToneRepository } from "../../../lib/chord-tone-theory/chordTone";
import { noteObjects } from "../../fixtures/noteObjects";
describe("Testing ''ChordToneRepository", () => {
    let chordDegreesM : chordDegreeType = {
        degree : [1,3,5],
        chromatic : [1,5,8]
    };
    let chordDegreesAug : chordDegreeType = {
        degree : [1,3,5],
        chromatic : [1,5,9]
    };
    let chordDegrees_M7 : chordDegreeType = {
        degree : [1,3,5,7],
        chromatic : [1,5,8,12]
    };
    let chordDegreesM7_9 : chordDegreeType = {
        degree : [1,3,5,7,2],
        chromatic : [1,5,8,12,3]
    };
    let chordDegrees_mM7_11 : chordDegreeType = {
        degree : [1,3,5,7,4],
        chromatic : [1,4,8,12,6]
    };
    it("'getNaturalNotesCandidacy'", () => {
        expect(ChordToneRepository(chordDegrees_M7,2).getNaturalNotesCandidacy()).toEqual([[
            noteObjects.B,
            noteObjects.D,
            noteObjects.F,
            noteObjects.A,
        ],
        [
            noteObjects.C,
            noteObjects.E,
            noteObjects.G,
            noteObjects.B,
        ],[
            noteObjects.D,
            noteObjects.F,
            noteObjects.A,
            noteObjects.C,
        ]])
    })
    it("'getChordTonesCandidacy",()=>{
        expect(ChordToneRepository(chordDegreesM,1).getChordTonesCandidacy([[
            noteObjects.B,
            noteObjects.D,
            noteObjects.F,
        ],[
            noteObjects.C,
            noteObjects.E,
            noteObjects.G,
        ],[
            noteObjects.D,
            noteObjects.F,
            noteObjects.A,
        ]])).toEqual([[
            noteObjects.Bs,
            noteObjects.Dss,
            noteObjects.Fss
        ],[
            noteObjects.C,
            noteObjects.E,
            noteObjects.G,
        ],[
            noteObjects.Dbb,
            noteObjects.Fb,
            noteObjects.Abb
        ]]);
        expect(ChordToneRepository(chordDegrees_M7,2).getChordTonesCandidacy([[
            noteObjects.B,
            noteObjects.D,
            noteObjects.F,
            noteObjects.A,
        ],[
            noteObjects.C,
            noteObjects.E,
            noteObjects.G,
            noteObjects.B,
        ],[
            noteObjects.D,
            noteObjects.F,
            noteObjects.A,
            noteObjects.C,
        ]])).toEqual([[
            {
                note : "C",
                accidental :"+",
                octave : 0
            },
            {
                note : "E",
                accidental :"+",
                octave : 0
            },
            {
                note : "G",
                accidental :"+",
                octave : 0
            },
            {
                note : "B",
                accidental :"+",
                octave : 0
            },
        ],[
            {
                note : "D",
                accidental :"-",
                octave : 0
            },
            {
                note : "F",
                accidental :null,
                octave : 0
            },
            {
                note : "A",
                accidental :"-",
                octave : 0
            },
            {
                note : "C",
                accidental :null,
                octave : 0
            },
        ]]);
    });
    it("'getAccidentalScore",()=>{
        expect(ChordToneRepository(chordDegreesM,1).getAccidentalScore([[
            noteObjects.C,
            noteObjects.Eb
        ]])).toEqual([{
            chordTones : [noteObjects.C,noteObjects.Eb],
            score : -1
        }])
    });
    it("'returnWithTheHighestScore'", () => {
        expect(ChordToneRepository(chordDegreesM,1).returnWithTheHighestScore([
            {
                chordTones : [noteObjects.C],
                score : 0
            },
            {
                chordTones : [noteObjects.D],
                score : -1
            }
        ])).toEqual([noteObjects.C])
    });
    it("'getChordTone'", () => {
        const EM = ChordToneRepository(chordDegreesM,5).getChordTone()
        expect(EM).toEqual([
            noteObjects.E,
            noteObjects.Gs,
            noteObjects.B
        ]);

        const EM7_9 = ChordToneRepository(chordDegreesM7_9,5).getChordTone()
        expect(EM7_9).toEqual([
            noteObjects.E,
            noteObjects.Gs,
            noteObjects.B,
            noteObjects.Ds,
            noteObjects.Fs
        ]);

        const FM7_9 = ChordToneRepository(chordDegreesM7_9,6).getChordTone()
        expect(FM7_9).toEqual([
            noteObjects.F,
            noteObjects.A,
            noteObjects.C,
            noteObjects.E,
            noteObjects.G
        ]);
        const AmM7_11 = ChordToneRepository(chordDegrees_mM7_11,10).getChordTone()
        expect(AmM7_11).toEqual([
            noteObjects.A,
            noteObjects.C,
            noteObjects.E,
            noteObjects.Gs,
            noteObjects.D
        ]);
        const DbM7 = ChordToneRepository(chordDegrees_M7,2).getChordTone()
        expect(DbM7).toEqual([
            noteObjects.Db,
            noteObjects.F,
            noteObjects.Ab,
            noteObjects.C,
        ]);
    });
});