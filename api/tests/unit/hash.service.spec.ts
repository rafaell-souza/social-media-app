import { HashService } from "src/helpers/hash.service";

describe("hash.service", () => {
    test("It should return a hasehd string", async () => {
        const hash = await new HashService().hash("string test");
        expect(hash).toBeDefined();
    })

    test("It should have be equal", async () => {
        const hash = await new HashService().hash("new hash");
        expect(new HashService().compare("new hash", hash)).toBeTruthy();
    })
})