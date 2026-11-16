import { Body, ConflictException, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')

export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    async create(@Body() data: { email: string, name: string, password: string }) {

        return this.authService.create(data)

    }
}