import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/signup.dto";
import { UserDTO } from "../user/dto/user.dto";
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    private readonly users: UserDTO[] = [
        {
            id: 'an1',
            name: 'duruaku chinedu',
            email: 'duruakux@gmail.com',
            password: 'bcrypthash1'
        },
        {
            id: 'an2',
            name: 'amaka ugi',
            email: 'amaka@gmail.com',
            password: 'bcrypthash2'
        }
    ]


    async findOneByEmail(email: string) {
        return this.users.find((data) => data.email === email)
    }

    async create(data: CreateUserDTO) {
        console.log('Signup reached:', data.email);

        const user = await this.findOneByEmail(data.email);

        console.log('Existing user found:', Boolean(user));

        if (user) {
            throw new ConflictException('Email already exists');
        }

        const saltRound = 12;
        const hashedPassword = await bcrypt.hash(data.password, saltRound);

        const newUser = {
            ...data,
            password: hashedPassword,
            id: `an${this.users.length + 1}`
        };

        this.users.push(newUser);

        //send email service

        return {
            message: 'User created successfully',
            status: true,
            user: {
                email: newUser.email
            }
        };
    }
}