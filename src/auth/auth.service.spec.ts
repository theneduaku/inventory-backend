import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { ConflictException } from "@nestjs/common";

describe('AuthService', () => {
    let authService: AuthService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService]
        }).compile()

        authService = module.get<AuthService>(AuthService)
    })

    it('Should return a user object', async () => {
        await expect(authService.findByEmail('duruakux@gmail.com')).resolves.toEqual({
            id: 1,
            email: 'duruakux@gmail.com',
            name: 'duruaku chinedu',
            password: 'test123'
        })
    })

    it('Should throw a conflict error', async () => {
        await expect(authService.create({
            email: 'duruakux@gmail.com',
            name: 'duruaku chinedu',
            password: 'test123'
        })).rejects.toThrow(ConflictException)
    })

    it('should return undefined', async () => {
        await expect(authService.findByEmail('duruakuu@gmail.com')).resolves.toBeUndefined()
    })

    it('should create a user', async () => {
        const user = await authService.create({
            email: 'duruakuxv@gmail.com',
            name: 'duruaku chinedu',
            password: 'test123'
        })

        expect(user).toEqual({
            message: 'User created successfully',
            success: true,
            user: {
                id: 3,
                email: 'duruakuxv@gmail.com'
            }
        })

        expect(user.user).not.toHaveProperty('password')

    })


})