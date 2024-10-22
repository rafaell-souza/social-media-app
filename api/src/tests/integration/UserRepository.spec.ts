import { PrismaService } from "../../prisma.service";
import { UserRepository } from "../../repository/UserRepository";
import * as bcrypt from "bcrypt";

describe("UserRepository tests", () => {
    let ids: string[] = [];
    let userRepo: UserRepository;
    let prisma: PrismaService;

    beforeAll(async () => {
        prisma = new PrismaService();
        userRepo = new UserRepository(prisma);
    })

    afterAll(async () => {
        for (const id of ids) {
            await prisma.user.delete({ where: { id } });
        }
        ids = [];
    })

    // Create
    test("should create a user and return an id", async () => {
        const data = [
            {
                name: "Jhon",
                email: "johnemail@gmail.com",
                password: bcrypt.hashSync("minhasenha1", 10)
            },
            {
                name: "Jhon",
                email: null,
                phone: "(00) 00000-0000",
                password: bcrypt.hashSync("minhasenha1", 10)
            }
        ]

        for (const user of data) {
            const result = await userRepo.create(user);
            ids.push(result.id);
            expect(result).toHaveProperty("id");
            expect(result.id).toHaveLength(36);
        }
    })

    // Read
    test("should return an user object by email or phone", async () => {
        const data = [
            { email: null, phone: "(00) 00000-0000" },
            { email: "johnemail@gmail.com", phone: null }
        ]

        for (const user of data) {
            const result = await userRepo.findByField(user.email, user.phone);
            expect(result).toMatchObject({
                id: expect.any(String),
                password: expect.any(String)
            })
        }
    })

    // Read
    test("should return an user object searching by id", async () => {
        const data = await userRepo.findById(ids[0]);
        const data2 = await userRepo.findById(ids[1]);

        expect(data).toMatchObject({
            id: expect.any(String),
            name: "Jhon",
            email: "johnemail@gmail.com",
            phone: null
        })

        expect(data2).toMatchObject({
            id: expect.any(String),
            name: "Jhon",
            email: null,
            phone: "(00) 00000-0000"
        })
    })
})
