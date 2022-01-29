import { NoteDegreeRepository } from "../../../lib/chord-tone-theory/noteDegree";
import { noteObjects } from "../../fixtures/noteObjects";
describe("Testing ''NoteDegreeRepository", () => {
    it("'getNaturalNoteFromSpecNote'", () => {
        expect(NoteDegreeRepository().getNaturalNoteFromSpecNote(
            noteObjects.C,
            5
        )).toEqual(
            noteObjects.G
        );
       expect(NoteDegreeRepository().getNaturalNoteFromSpecNote(
           noteObjects.Ab,
           3
       )).toEqual(
           noteObjects.C
       );
    });

});