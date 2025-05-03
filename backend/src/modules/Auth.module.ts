import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controladores/Auth.controller';
import { AuthService } from './servicios/Auth.service';
import { PersonaModule } from '../../personas/persona.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PersonaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}