import { NoteFormatRepository } from "../../../lib/chord-tone-theory/noteFormat";
import * as noteObjects from "../../fixtures/noteObjects";
describe("Testing ''ChordAppHandlerRepository", () => {
    it("translateAccidental",()=>{
        expect(NoteFormatRepository().translateAccidental("+")).toBe("#");
        expect(NoteFormatRepository().translateAccidental(null)).toBe("");
    });
    it("text", () => {
        expect(NoteFormatRepository().text(noteObjects.noteObjects.B)).toEqual("B");
        expect(NoteFormatRepository().text(noteObjects.noteObjects.Bs)).toEqual("B#");
    });
    it("texts",()=>{
        expect(NoteFormatRepository().texts([noteObjects.noteObjects.C,noteObjects.noteObjects.E])).toEqual(
            [
                "C",
                "E"
            ]
        )
    })
});