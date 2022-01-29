import { AccidentalScoreRepository } from "../../../lib/chord-tone-theory/accidentalScore";
import { noteObjects } from "../../fixtures/noteObjects";
describe("Testing ''AccidentalScoreRepository", () => {
    it("'judgeNote'", () => {
        expect(AccidentalScoreRepository().judgeNote(noteObjects.C)).toBe(0);
        expect(AccidentalScoreRepository().judgeNote(noteObjects.Cs)).toBe(-1);
        expect(AccidentalScoreRepository().judgeNote(noteObjects.Css)).toBe(-2);
    });
    it("'judgeNotes'", () => {
        expect(AccidentalScoreRepository().judgeNotes([
            noteObjects.C,
            noteObjects.E,
            noteObjects.G
        ])).toBe(0);
        expect(AccidentalScoreRepository().judgeNotes([
            noteObjects.Cs,
            noteObjects.Es,
            noteObjects.Gs
        ])).toBe(-3);
    });
});