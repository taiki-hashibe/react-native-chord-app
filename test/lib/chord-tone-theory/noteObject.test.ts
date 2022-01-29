import { NoteObjectsRepository } from "../../../lib/chord-tone-theory/noteObject";
import { noteObjects } from "../../fixtures/noteObjects";
describe("Testing ''NoteObjectsRepository", () => {
    it("'getNoteObject'", () => {
        expect(NoteObjectsRepository().getNoteObject("C")).toEqual(noteObjects.C);
        expect(NoteObjectsRepository().getNoteObject("C+")).toEqual(noteObjects.Cs);
        expect(NoteObjectsRepository().getNoteObject("D+")).toEqual(noteObjects.Ds);
    });

    it("'getNoteObjects",()=>{
        expect(NoteObjectsRepository().getNoteObjects(1))
        .toEqual([
          noteObjects.Bs,
          noteObjects.C,
          noteObjects.Dbb
        ]);
        expect(NoteObjectsRepository().getNoteObjects(1,2))
        .toEqual([
          noteObjects.Bss,
          noteObjects.Cs,
          noteObjects.Db
        ]);
        expect(NoteObjectsRepository().getNoteObjects(1,3))
        .toEqual([
          noteObjects.Css,
          noteObjects.D,
          noteObjects.Ebb
        ]);
        expect(NoteObjectsRepository().getNoteObjects(1,3))
        .toEqual([
          noteObjects.Css,
          noteObjects.D,
          noteObjects.Ebb
        ]);
        expect(NoteObjectsRepository().getNoteObjects(1,6))
        .toEqual([
          noteObjects.Es,
          noteObjects.F,
          noteObjects.Gbb
        ]);
    });

    it("'getNoteNumber'", () => {
        expect(NoteObjectsRepository().getNoteNumber({
            note: "C",
            accidental: null,
            octave: 0
          })).toBe(1);
          expect(NoteObjectsRepository().getNoteNumber({
            note: "B",
            accidental: "-",
            octave: 0
          })).toBe(11);
    });
});