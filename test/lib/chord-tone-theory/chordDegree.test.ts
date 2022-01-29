import { ChordDegreeRepository } from "../../../lib/chord-tone-theory/chordDegree";

import { noteObjects } from "../../fixtures/noteObjects";
describe("Testing ''ChordDegreeRepository", () => {
    it("'getSuffixDegree'", () => {
        expect(ChordDegreeRepository().getSuffixDegree("m")).toEqual({
            degree : [1,3,5],
            chromatic : [1,4,8]
        });
    });
    it("'get7thDegree'", () => {
        expect(ChordDegreeRepository().get7thDegree("7")).toEqual({
           degree : 7,
           chromatic : 11
        });
    });
    it("'getTensionDegree'", () => {
        expect(ChordDegreeRepository().getTensionDegree(["9","13"])).toEqual({
            degree: [2,6],
            chromatic : [3,10]
        });
    });

    it("'getChordDegree", ()=>{
        expect(ChordDegreeRepository().getChordDegree({
            suffix : "m",
            _7th : "7",
            tension : ["9"]
        })).toEqual({
            degree : [1,3,5,7,2],
            chromatic : [1,4,8,11,3]
        })
    })
});