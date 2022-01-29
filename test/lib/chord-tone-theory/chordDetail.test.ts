import { ChordDetailRepository } from "../../../lib/chord-tone-theory/chordDetail";
import * as chordDetails from "../../fixtures/chordDetail";
describe("Testing ''ChordDetailRepository", () => {
    it("getChordDetail",()=>{
        expect(ChordDetailRepository([1,5]).getChordDetail()).toEqual(chordDetails.chordDetails.M);
        expect(ChordDetailRepository([1,5,9]).getChordDetail()).toEqual(chordDetails.chordDetails.aug);
        expect(ChordDetailRepository([1,4,7]).getChordDetail()).toEqual(chordDetails.chordDetails.dim);
    });
});