import { AccidentalRepository } from "../../../lib/chord-tone-theory/accidental";

describe("Testing ''AccidentalRepository", () => {
    it("'getAccidental'", () => {
        expect(AccidentalRepository().getAccidental(-2)).toBe("--");
        expect(AccidentalRepository().getAccidental(-1)).toBe("-");
        expect(AccidentalRepository().getAccidental(0)).toBe(null);
        expect(AccidentalRepository().getAccidental(1)).toBe("+");
        expect(AccidentalRepository().getAccidental(2)).toBe("++");
        expect(AccidentalRepository().getAccidental(10)).toBe(undefined);
    });

    it("'getAccidentalDiff'", () => {
        expect(AccidentalRepository().getAccidentalDiff("--")).toBe(-2);
        expect(AccidentalRepository().getAccidentalDiff("-")).toBe(-1);
        expect(AccidentalRepository().getAccidentalDiff(null)).toBe(0);
        expect(AccidentalRepository().getAccidentalDiff("+")).toBe(1);
        expect(AccidentalRepository().getAccidentalDiff("++")).toBe(2);
    });

    it("'getAccidentalAttribute", () => {
        expect(AccidentalRepository().getAccidentalAttribute("+")).toBe("s");
    })
});