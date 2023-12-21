import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { GqlAuthGuard } from './gql-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { VerifyOtp } from 'src/users/dto/verify-otp.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User, { name: 'register' })
  async signup(@Args('input') input: CreateUserInput) {
    return this.authService.register(input);
  }

  @Mutation(() => User, { name: 'register' })
  async verifyEmail(@Args('input') input: VerifyOtp) {
    return this.authService.verifyOtp(input);
  }
}
