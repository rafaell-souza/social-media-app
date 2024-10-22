import { UserUseCases } from "../../UseCases/UserUseCases.service";
import { v4 as uuid } from "uuid";
import { BadRequest, Conflict, NoContent } from "../../exceptions/excepetion";
import * as bcrypt from "bcrypt";
import { HashService } from "../../helpers/hash.service";

jest.mock("../../repository/UserRepository")

interface iUser {
    id: string,
    name: string,
    email?: string,
    phone?: string,
    password: string
}

let testObject: iUser[]

const factory = () => {
    return {
        UserRepository: jest.fn().mockImplementation(() => ({
            findByField: jest.fn().mockImplementation((email?: string, phone?: string) => {
                return testObject.find((user) => {
                    return user.email === email || user.phone === phone
                })
            }),

            create: jest.fn().mockImplementation((data) => {
                const newUser = {
                    id: uuid(),
                    ...data
                }
                testObject.push(newUser)
                return newUser
            })
        }))
    }
}

describe("UserUseCases", () => {
    let userUseCases: UserUseCases;

    beforeAll(async () => {
        const { UserRepository } = factory()
        const userRepo = new UserRepository()
        const hashService = new HashService()
        userUseCases = new UserUseCases(userRepo, hashService)

        const hash = await bcrypt.hash("novasenha13", 10)
        testObject = [
            {
                id: uuid(),
                name: "A",
                email: "abcdefg@gmail.com",
                phone: "(00) 00000-0000",
                password: hash
            },
            {
                id: uuid(),
                name: "B",
                email: "ghijklm@gmail.com",
                phone: "(11) 11111-1111",
                password: hash
            }
        ]
    })

    afterAll(() => {
        testObject = []
    })

    // createAccount method

    it("shold throw if phone/email is already in use",
        async () => {
            try {
                await userUseCases.createAccount({
                    name: "algo",
                    email: "",
                    phone: "(11) 11111-1111",
                    password: "novasenha13"
                })

                await userUseCases.createAccount({
                    name: "algo",
                    email: "abcdefg@gmail.com",
                    password: "novasenha13"
                });
            }
            catch (error) {
                if (error.message.includes("phone")) {
                    expect(error.message).toBe("This phone is already in use.")
                } else expect(error.message).toBe("This email is already in use.")

                expect(error).toBeInstanceOf(Conflict)
                expect(error.status).toBe(409)
            }
        })

    it("should create a user successfully", async () => {
        const id = await userUseCases.createAccount({
            name: "Malenia",
            email: "example@gmail.com",
            phone: "(01) 10110-1010",
            password: "Password123"
        });

        expect(typeof id).toBe("string");
        expect(id).toHaveLength(36);
    })

    // findAccount method

    it("should throw if the user have no account registered",
        async () => {
            try {
                const data = [
                    {
                        email: "",
                        phone: "(00) 55555-5555",
                        password: "mypassword12"
                    },
                    {
                        email: "myemail@gmail.com",
                        phone: "",
                        password: "mypassowrd"
                    }
                ]

                await userUseCases.findAccount(data[0])
                await userUseCases.findAccount(data[1])

            } catch (error) {
                if (error.message.includes("phone")) {
                    expect(error.message).toBe("There's no account registered with the provided phone")
                } else expect(error.message).toBe("There's no account registered with the provided email")

                expect(error).toBeInstanceOf(NoContent)
                expect(error.status).toBe(204)
            }
        })

    it("should throw if account exists but password does not match",
        async () => {
            try {
                await userUseCases.findAccount({
                    email: "abcdefg@gmail.com",
                    phone: "",
                    password: "novasenha1"
                })
            }
            catch (error) {
                expect(error).toBeInstanceOf(BadRequest)
                expect(error.message).toBe("Incorrect password")
                expect(error.status).toBe(400)
            }
        })

    it("should find and return the user's account id", async () => {
        const id = await userUseCases.findAccount({
            email: "",
            phone: "(00) 00000-0000",
            password: "novasenha13"
        })

        expect(typeof id).toBe("string");
        expect(id).toHaveLength(36)
    })
})