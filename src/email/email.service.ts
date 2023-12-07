import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { WelcomeEmailDto } from './dto/welcome-email.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  @OnEvent('user.welcome')
  async welcomeEmail(data: any) {
    const { email, name } = data;

    const subject = `Welcome to Skillnesthub: ${name}`;

    const response = await this.mailerService.sendMail({
      to: email,
      subject,
      template: './welcome',
      context: {
        name,
      },
    });
    return 'Email sended!';
  }

  @OnEvent('user.resetted')
  async pwdChanged(data: any) {
    const { email, name } = data;

    const subject = `Skillnesthub: ${name}, pass changed!`;

    const response = await this.mailerService.sendMail({
      to: email,
      subject,
      template: './resetted',
      context: {
        name,
      },
    });
    return 'Email sended!';
  }

  @OnEvent('user.reset-password')
  async forgotPasswordEmail(data: any) {
    const { name, email, link } = data;

    const subject = `Skillnesthub: Reset Password`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './forgot-password',
      context: {
        link,
        name,
      },
    });
  }

  @OnEvent('user.verify-email')
  async verifyEmail(data: any) {
    const { name, email, otp } = data;

    const subject = `Skillnesthub: OTP To Verify Email`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './verify-email',
      context: {
        otp,
        name,
      },
    });
  }

  @OnEvent('user.verified')
  async verified(data: any) {
    const { name, email } = data;

    const subject = `Skillnesthub: Account verified successfully!`;

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './verified',
      context: {
        name,
      },
    });
  }

  // API Endpoint
  async welcome(welcomeEmailDto: WelcomeEmailDto) {
    const { email, name } = welcomeEmailDto;

    const subject = `Welcome to Skillnesthub: ${name}`;

    const a = await this.mailerService.sendMail({
      to: email,
      subject,
      template: './welcome',
      context: {
        name,
      },
    });
    return 'Email sended';
  }

  create(createEmailDto: CreateEmailDto) {
    return 'This action adds a new email';
  }

  findAll() {
    return `This action returns all email`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
