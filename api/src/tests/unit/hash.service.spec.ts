import { HashService } from "../../helpers/hash.service";

describe("HashService", () => {
    let hashService: HashService;
    beforeAll(() => hashService = new HashService());

    test("should hash a string", async () => {
        const hashed = await hashService.hash("test");
        expect(hashed).toBeTruthy();
    })

    test("should compare a string with a hash", async () => {
        const hashed = await hashService.hash("test");
        const compared = await hashService.compare("test", hashed);
        expect(compared).toBeTruthy();
    })
});