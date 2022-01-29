import { chordType } from "../../../lib/chord-tone-theory/@types/chord";
import { ChordRepository } from "../../../lib/chord-tone-theory/chord";

import { noteObjects } from "../../fixtures/noteObjects";
describe("Testing ''ChordRepository", () => {
    it("'getSampleChord'", () => {
        expect(ChordRepository([1,5,8,12]).getSampleChord())
        .toEqual([{
                root : noteObjects.C,
                trueRoot : noteObjects.C,
                chordDetail : {
                    suffix : "",
                    _7th : "M7",
                    tension : []
                },
                notes : [
                    noteObjects.C,
                    noteObjects.E,
                    noteObjects.G,
                    noteObjects.B,
                ]
            }
        ]);
        expect(ChordRepository([2,6,9,1]).getSampleChord())
        .toEqual([{
                root : noteObjects.Db,
                trueRoot : noteObjects.Db,
                chordDetail : {
                    suffix : "",
                    _7th : "M7",
                    tension : []
                },
                notes : [
                    noteObjects.Db,
                    noteObjects.F,
                    noteObjects.Ab,
                    noteObjects.C,
                ]
            }
        ])
    });
    it("'getInputChord'", () => {
        const chords : chordType[] = ChordRepository([2,6,1]).getSampleChord();
        expect(ChordRepository([2,6,1]).getInputChord(chords[0]))
        .toEqual({
            root : noteObjects.Db,
            trueRoot : noteObjects.Db,
            chordDetail : {
                suffix : "",
                _7th : "M7",
                tension : []
            },
            notes : [
                noteObjects.Db,
                noteObjects.F,
                noteObjects.C
            ]
        }
    )
    });

});