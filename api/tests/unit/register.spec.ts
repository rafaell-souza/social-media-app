import { TokenRepository } from "src/repositories/TokenRepository";
import { PrismaService } from "src/prisma.service";
import { UserRepository } from "src/repositories/UserRepository";
import { HashService } from "src/helpers/hash.service";
import { JwtService } from "src/helpers/jwt.service";
import { SendEmailService } from "src/helpers/smtp/SendEmail.service";
import { AuthService } from "src/jobs/auth/auth.service";
import { Conflict } from "src/exceptions/excepetion";

jest.mock("src/repositories/TokenRepository", () => {
    return {
        TokenRepository: jest.fn()
    }
})

jest.mock("src/helpers/jwt.service", () => {
    return {
        JwtService: jest.fn().mockImplementation(() => {
            return {
                createAccessToken: jest.fn().mockResolvedValue("newtoken.aaa") as jest.MockedFunction<() => string>
            };
        }),
    };
});

jest.mock("src/helpers/hash.service")
jest.mock("src/repositories/UserRepository");
jest.mock("src/helpers/smtp/SendEmail.service")

const factory = () => {
    const prisma = new PrismaService()
    const tokenRepo = new TokenRepository(prisma)
    const userRepo = new UserRepository(prisma) as jest.Mocked<UserRepository>;
    const hashService = new HashService() as jest.Mocked<HashService>;
    const jwtService = new JwtService() as jest.Mocked<JwtService>;
    const sendEmailService = new SendEmailService() as jest.Mocked<SendEmailService>

    return {
        tokenRepo, userRepo, hashService, jwtService, sendEmailService
    }
}

describe("auth.service.ts - register", () => {
    const data = {
        id: "123",
        email: "somethiing",
        name: "maria ana",
        password: "mariana123",
        type: "email",
        verified: false
    }

    test("it should throw an error", async () => {
        const { tokenRepo, userRepo, hashService, jwtService,
            sendEmailService } = factory();

        userRepo.findByEmail.mockResolvedValue(data);
        const authService = new AuthService(tokenRepo, jwtService,
            userRepo, sendEmailService, hashService);

        await expect(authService.register(data)).rejects.toThrow(Conflict);
    })

    test("should create a user", async () => {
        const {
            tokenRepo, userRepo, hashService, jwtService, sendEmailService
        } = factory();

        userRepo.findByEmail.mockResolvedValue(null)
        hashService.hash.mockResolvedValue("a new hash");
        userRepo.create.mockResolvedValue(data)
        sendEmailService.to.mockResolvedValue(null)

        const newUser = new AuthService(tokenRepo, jwtService,
            userRepo, sendEmailService, hashService)

        const result = await newUser.register(data);
        expect(result).toBe(data.email);
    })
})