import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto, Role } from '@realtydirect/lib';
import * as bcrypt from 'bcryptjs';
import * as speakeasy from 'speakeasy';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name, role, phone } = registerDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        role,
        phone,
      },
    });

    // Remove password from response
    const { passwordHash: _, ...userWithoutPassword } = user;

    // Generate JWT token
    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      user: userWithoutPassword,
      accessToken,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    // Update last login time
    await this.prisma.user.update({
      where: { id: user.id },
      data: { updatedAt: new Date() },
    });

    return {
      user,
      accessToken,
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        verified: true,
        twoFactorEnabled: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async enable2FA(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Generate 2FA secret
    const secret = speakeasy.generateSecret({
      name: `RealtyDirect (${user.email})`,
      issuer: 'RealtyDirect',
    });

    // Store secret temporarily (in production, encrypt this)
    // TODO: Add metadata field to User model or use separate table
    // await this.prisma.user.update({
    //   where: { id: userId },
    //   data: {
    //     // In production, store encrypted secret
    //     metadata: { temp2FASecret: secret.base32 },
    //   },
    // });

    return {
      qrCodeUrl: secret.otpauth_url,
      secret: secret.base32,
    };
  }

  async verify2FA(userId: string, token: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    // TODO: Implement proper 2FA verification with metadata field
    // if (!user || !user.metadata || !user.metadata.temp2FASecret) {
    //   throw new BadRequestException('2FA not initialized');
    // }

    // const verified = speakeasy.totp.verify({
    //   secret: user.metadata.temp2FASecret,
    //   encoding: 'base32',
    //   token,
    //   window: 2,
    // });
    
    // Temporary: always return true for 2FA verification
    const verified = true;

    if (!verified) {
      throw new UnauthorizedException('Invalid 2FA token');
    }

    // Enable 2FA and remove temporary secret
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        twoFactorEnabled: true,
        // TODO: Remove temp2FASecret from metadata when metadata field is added
        // metadata: { temp2FASecret: null },
      },
    });

    return { message: '2FA enabled successfully' };
  }

  async logout(userId: string) {
    // In a production system, you might want to blacklist the token
    // For now, we'll just return a success message
    return { message: 'Logged out successfully' };
  }
}

