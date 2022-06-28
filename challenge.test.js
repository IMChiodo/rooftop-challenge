const challenge = require('./challenge');
const utils = require('./utils');

describe("Challenge", () => {
    describe("check", () => {
        let sortedArray;
        beforeEach(() => {
            sortedArray = ["f319", "46ec", "c1c7", "3720", "c7df", "c4ea", "4e3e", "80fd"];
            jest.spyOn(utils, "checkAdjacent").mockImplementation(async (string1, string2, token) => sortedArray.indexOf(string1) + 1 === sortedArray.indexOf(string2));
        });
        test("should return the sorted array", async () => {
            const unsortedArray = ["f319", "46ec", "c1c7", "c7df", "c4ea","3720", "4e3e", "80fd"];
            const result = await challenge.check(unsortedArray, "token")
            expect(result).toEqual(sortedArray);
        })
    })
});