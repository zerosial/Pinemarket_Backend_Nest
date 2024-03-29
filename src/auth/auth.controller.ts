import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiTags('Auth API')
  async signup(@Body() signupData: SignupInput, @Res() res: Response) {
    signupData.email = signupData.email.toLowerCase();
    const { accessToken, refreshToken } = await this.authService.createUser(
      signupData,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // 개발 환경에서는 false로 설정할 수 있음
      sameSite: 'none', // 배포 환경이 달라 임시적으로 none (기본은 strict)
      path: '/', // 쿠키 경로 지정
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 예: 1주일 후 만료
    });

    return res.status(HttpStatus.OK).json({ accessToken });
  }

  @Post('login')
  @ApiTags('Auth API')
  async login(@Body() loginData: LoginInput, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(
      loginData.email.toLowerCase(),
      loginData.password,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // 개발 환경에서는 false로 설정할 수 있음
      sameSite: 'none', // 배포 환경이 달라 임시적으로 none (기본은 strict)
      path: '/', // 쿠키 경로 지정
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 예: 1주일 후 만료
    });

    return res.status(HttpStatus.OK).json({ accessToken });
  }

  @Post('refresh-token')
  @ApiTags('Auth API')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    console.log('req.cookie', req.cookies);
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshToken(refreshToken);

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true, // 개발 환경에서는 false로 설정할 수 있음
      sameSite: 'none', // 배포 환경이 달라 임시적으로 none (기본은 strict)
      path: '/', // 쿠키 경로 지정
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 예: 1주일 후 만료
    });

    return res.status(HttpStatus.OK).json({ accessToken });
  }

  @Post('logout')
  @ApiTags('Auth API')
  async logout(@Res() res: Response) {
    res.cookie('refreshToken', '', {
      httpOnly: true,
      secure: true, // 개발 환경에서는 false로 설정할 수 있음
      sameSite: 'none', // 배포 환경이 달라 임시적으로 none (기본은 strict)
      path: '/', // 쿠키 경로 지정
      expires: new Date(0), // 쿠키 만료 날짜를 과거로 설정하여 삭제
    });
    return res.sendStatus(200);
  }
}
