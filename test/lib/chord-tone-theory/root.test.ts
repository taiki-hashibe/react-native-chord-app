import { RootRepository } from "../../../lib/chord-tone-theory/root";
import { noteObjects } from "../../fixtures/noteObjects"

describe("Testing ''RootRepository", () => {

    it("'getChordRoot'", () => {
        expect(RootRepository().getChordRoot([
            noteObjects.D,
            noteObjects.C
        ])).toEqual(
            noteObjects.D
        )
    });
    it("'getPlaneRoot'", () => {
        // expect(RootRepository().getPlaneRoot([
        //     noteObjects.Db,
        //     noteObjects.Cb,
        //     noteObjects.Gs,
        // ],12)).toEqual(noteObjects.Cb);
        // expect(RootRepository().getPlaneRoot([
        //     noteObjects.C,
        //     noteObjects.E,
        //     noteObjects.G,
        // ],8)).toEqual(noteObjects.G);
        // expect(RootRepository().getPlaneRoot([
        //     noteObjects.Eb,
        //     noteObjects.G,
        //     noteObjects.Bb,
        // ],8)).toEqual(noteObjects.G);
    });
});