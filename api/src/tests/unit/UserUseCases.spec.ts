import { UserUseCases } from "../../UseCases/UserUseCases.service";
import { UserRepository } from "../../repository/UserRepository";
import { TokenRepository } from "../../repository/TokenRepository";
import { HashService } from "../../helpers/hash.service";
import { JwtService } from "../../helpers/jwt.service";
import { PrismaService } from "../../prisma.service";
import { BadRequest, Conflict, NoContent } from "../../exceptions/excepetion";
import { v4 as uuid } from "uuid";
import * as bcrypt from "bcrypt";

jest.mock('../../repository/UserRepository')
jest.mock('../../repository/TokenRepository')

const factory = (
    userRepoReturn: any,
    tokenRepoReturn: any,
    userRepoCreateReturn?: any,
) => {
    const prisma = new PrismaService()
    const hash = new HashService()
    const jwt = new JwtService()

    const userRepoMock = new UserRepository(prisma) as jest.Mocked<UserRepository>
    const tokenRepoMock = new TokenRepository(prisma) as jest.Mocked<TokenRepository>

    userRepoMock.findByEmail.mockResolvedValue(userRepoReturn)
    tokenRepoMock.create.mockResolvedValue(tokenRepoReturn)
    userRepoMock.create.mockResolvedValue(userRepoCreateReturn);

    return { tokenRepoMock, userRepoMock, hash, jwt }
}

describe('UserUseCases - createAccount', () => {
    let data: any;

    beforeEach(() => {
        data = {
            id: uuid(),
            name: "name test",
            email: "emailtest@gmail.com",
            password: bcrypt.hashSync("password1", 10),
            verified: false
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return access_token", async () => {
        const { tokenRepoMock, userRepoMock, hash, jwt } = factory(null, null, data)
        const userUseCases = new UserUseCases(userRepoMock, hash, tokenRepoMock, jwt)

        const result = await userUseCases.createAccount(data)
        expect(result).toHaveLength(297);
    })

    it("should throw, since email is in use", async () => {
        const { tokenRepoMock, userRepoMock, hash, jwt } = factory(data, null)
        const userUseCases = new UserUseCases(userRepoMock, hash, tokenRepoMock, jwt)

        await expect(userUseCases.createAccount(data)).rejects.toBeInstanceOf(Conflict);
    })
})

describe("UserUserCases - findAccount", () => {
    let data: any;

    beforeEach(() => {
        data = {
            id: uuid(),
            name: "name test",
            email: "emailtest@gmail.com",
            password: bcrypt.hashSync("password1", 10),
            verified: false
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should throw, since any account was found", async () => {
        const { tokenRepoMock, userRepoMock, hash, jwt } = factory(null, null)
        const userUseCases = new UserUseCases(userRepoMock, hash, tokenRepoMock, jwt)

        await expect(userUseCases.findAccount({
            email: "testing@gmail.com",
            password: "password1"
        })).rejects.toBeInstanceOf(NoContent);
    })

    it("should throw, since passwords aren't equal", async () => {
        const { tokenRepoMock, userRepoMock, hash, jwt } = factory(data, null)
        const userUseCases = new UserUseCases(userRepoMock, hash, tokenRepoMock, jwt)

        await expect(userUseCases.findAccount({
            email: data.email,
            password: "password2"
        })).rejects.toBeInstanceOf(BadRequest);
    })

    it("should return access_token", async () => {
        const { tokenRepoMock, userRepoMock, hash, jwt } = factory(data, null, data)
        const userUseCases = new UserUseCases(userRepoMock, hash, tokenRepoMock, jwt)

        const result = await userUseCases.findAccount({
            email: data.email,
            password: "password1"
        })
        expect(result).toHaveLength(297);
    })
})