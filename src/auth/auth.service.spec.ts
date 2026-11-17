import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { ConflictException } from "@nestjs/common";

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule =
            await Test.createTestingModule({
                providers: [AuthService]
            }).compile();

        authService = module.get<AuthService>(AuthService);
        
    });

    it('should find a user with email', async () => {
        await expect(
            authService.findOneByEmail('duruakux@gmail.com')
        ).resolves.toEqual({
            id: 'an1',
            name: 'duruaku chinedu',
            email: 'duruakux@gmail.com',
            password: 'bcrypthash1'
        });
    });

    it('should return undefined for an unknown email', async () => {
        await expect(
            authService.findOneByEmail('unknown@gmail.com')
        ).resolves.toBeUndefined();
    });

    it('should create a new user', async () => {
        const user = await authService.create({
            email: 'duruaku@gmail.com',
            name: 'amaka peace',
            password: '5teya'
        });

        expect(user).toEqual({
            message: 'User created successfully',
            status: true,
            user: {
                email: 'duruaku@gmail.com'
            }
        });
    });

    it('should not include password in response', async () => {
        const user = await authService.create({
            email: 'newuser@gmail.com',
            name: 'new user',
            password: '5teya'
        });

        expect(user.user).not.toHaveProperty('password');
    });

    it('should not register an existing user', async () => {
        await expect(
            authService.create({
                email: 'duruakux@gmail.com',
                name: 'amaka peace',
                password: '5teya'
            })
        ).rejects.toThrow(ConflictException);
    });
});