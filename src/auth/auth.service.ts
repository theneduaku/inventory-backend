import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {

    private readonly users = [{
        id: 1,
        email: 'duruakux@gmail.com',
        name: 'duruaku chinedu',
        password: 'test123'
    },
    {
        id: 2,
        email: 'amaka@gmail.com',
        name: 'amaka ugule',
        password: 'test123'
    }

    ]


    async findByEmail(email: string) {
        return this.users.find((data) => data.email === email)
    }

    async create(data: { email: string, name: string, password: string }) {
        const isExisting = await this.findByEmail(data.email)

        if (isExisting) {
            throw new ConflictException('Email address already exist')
        }

        const newUser = {
            ...data,
            id: this.users.length + 1
        }

        this.users.push(newUser)

        return {
            message: 'User created successfully',
            success: true,
            user: {
                id: newUser.id,
                email: newUser.email
            }
        };
    }
}