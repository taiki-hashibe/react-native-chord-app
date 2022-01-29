import { StringsManagerRepository } from "../../../src/utils/stringsManager";

describe("StringsManagerTest", () => {
    it("setUpStrings", () => {
        expect(StringsManagerRepository({
            frets : 5,
            turning : [1,2,3]
        }).setUpStrings()).toEqual(
            [[1,2,3,4,5],[2,3,4,5,6],[3,4,5,6,7]]
        );
    });
});