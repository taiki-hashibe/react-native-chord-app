import { chordType } from "../../../lib/chord-tone-theory/@types/chord";
import { ChordAppHandlerRepository } from "../../../lib/chord-tone-theory/chordAppHandler";

import { noteObjects } from "../../fixtures/noteObjects";
import { chordDetails } from "../../fixtures/chordDetail";
describe("Testing ''ChordAppHandlerRepository", () => {

    it("'getViewChordObjects", () => {
        expect(ChordAppHandlerRepository([1,5,8]).getViewChordObjects([{
            chord: {
                root : noteObjects.C,
                trueRoot : noteObjects.C,
                chordDetail : chordDetails.M7,
                notes : [
                    noteObjects.C,
                    noteObjects.E,
                    noteObjects.B,
                ],
                trueNotes : [
                    noteObjects.C,
                    noteObjects.E,
                    noteObjects.G,
                    noteObjects.B,
                ]
            },
            score : 100
        }])).toEqual([{
            chord: {
                chordName : "CM7",
                chordRoot : "C",
                root : "C",
                notes : ["C","E","B"],
                trueNotes : ["C","E","G","B"],
            },
            score : 100
        }]);
        expect(ChordAppHandlerRepository([1,5,9]).getViewChordObjects([{
            chord: {
                root : noteObjects.C,
                trueRoot : noteObjects.C,
                chordDetail : chordDetails.aug,
                notes : [
                    noteObjects.C,
                    noteObjects.E,
                    noteObjects.Gs,
                ],
                trueNotes : [
                    noteObjects.C,
                    noteObjects.E,
                    noteObjects.Gs,
                ]
            },
            score : 100
        }])).toEqual([{
            chord: {
                chordName : "Caug",
                chordRoot : "C",
                root : "C",
                notes : ["C","E","G#"],
                trueNotes : ["C","E","G#"],
            },
            score : 100
        }]);
    });
    it("'getChordObjects'", () => {
        expect(ChordAppHandlerRepository([1,5,12]).getChordObjects()).toEqual([
            {
                chord : {
                    root : noteObjects.C,
                    trueRoot : noteObjects.C,
                    chordDetail : chordDetails.M7,
                    notes : [
                        noteObjects.C,
                        noteObjects.E,
                        noteObjects.B,
                    ],
                    trueNotes : [
                        noteObjects.C,
                        noteObjects.E,
                        noteObjects.G,
                        noteObjects.B,
                    ]
                },
                score : 99
            }
        ]);
        expect(ChordAppHandlerRepository([2,6,13]).getChordObjects()).toEqual([
            {
                chord : {
                    root : noteObjects.Db,
                    trueRoot : noteObjects.Db,
                    chordDetail : chordDetails.M7,
                    notes : [
                        noteObjects.Db,
                        noteObjects.F,
                        noteObjects.C,
                    ],
                    trueNotes : [
                        noteObjects.Db,
                        noteObjects.F,
                        noteObjects.Ab,
                        noteObjects.C,
                    ]
                },
                score : 99
            }
        ]);
        expect(ChordAppHandlerRepository([12,8]).getChordObjects()).toEqual([
            {
                chord : {
                    root : noteObjects.G,
                    trueRoot : noteObjects.G,
                    chordDetail : chordDetails.M,
                    notes : [
                        noteObjects.G,
                        noteObjects.B,
                    ],
                    trueNotes : [
                        noteObjects.G,
                        noteObjects.B,
                        noteObjects.D,
                    ]
                },
                score : 99
            }
        ]);
    });
});