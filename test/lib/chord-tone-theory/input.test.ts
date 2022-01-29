import { InputRepository } from "../../../lib/chord-tone-theory/input";

describe("Testing ''InputRepository", () => {
    it("'compressIntoOctave'", () => {
        expect(InputRepository([1,13,14]).compressIntoOctave())
        .toEqual([1,2]);
        expect(InputRepository([1,13,14]).compressIntoOctave())
        .toEqual([1,2]);
        expect(InputRepository([2,14,15]).compressIntoOctave())
        .toEqual([2,3]);
        expect(InputRepository([2,14,24]).compressIntoOctave())
        .toEqual([2,12]);
        expect(InputRepository([13,17,21]).compressIntoOctave())
        .toEqual([1,5,9]);
    });
    it("'formatChordInputNumbers",()=>{
        expect(InputRepository([1,5,8]).formatChordInputNumbers())
        .toEqual([
            { planeRootNumber : 1,inputNumbers:[1,5,8]},
            { planeRootNumber : 5,inputNumbers:[1,4,9]},
            { planeRootNumber : 8,inputNumbers:[1,6,10]}
        ]);
        expect(InputRepository([2,6,9]).formatChordInputNumbers())
        .toEqual([
            { planeRootNumber : 2,inputNumbers:[1,5,8]},
            { planeRootNumber : 6,inputNumbers:[1,4,9]},
            { planeRootNumber : 9,inputNumbers:[1,6,10]}
        ]);
        expect(InputRepository([13,14,15]).formatChordInputNumbers())
        .toEqual([
            { planeRootNumber : 1,inputNumbers:[1,2,3]},
            { planeRootNumber : 2,inputNumbers:[1,2,12]},
            { planeRootNumber : 3,inputNumbers: [1,11,12]}
        ]);
        expect(InputRepository([8,13,17]).formatChordInputNumbers())
        .toEqual([
            { planeRootNumber : 1,inputNumbers: [1,5,8]},
            { planeRootNumber : 5,inputNumbers: [1,4,9]},
            { planeRootNumber : 8,inputNumbers: [1,6,10]}
        ]);
    });
    it("'getRootNumber",()=>{
        expect(InputRepository([1,5,8]).getRootNumber()).toBe(1);
        expect(InputRepository([2,14,24]).getRootNumber()).toBe(2);
    });
    it("'getPlaneRootNumber",()=>{
        expect(InputRepository([1,5,8]).getRootNumber()).toBe(1);
        expect(InputRepository([2,14,24]).getRootNumber()).toBe(2);
    })
    it("'sortByOrder'",()=>{
        expect(InputRepository([1]).sortByOrder([3,2,1])).toEqual([1,2,3])
    });
});