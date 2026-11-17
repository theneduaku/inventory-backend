import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDTO } from "./dto/signup.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    //signup
    @Post('signup')
    async create(@Body() data: CreateUserDTO) {
        return this.authService.create(data)
    }

}