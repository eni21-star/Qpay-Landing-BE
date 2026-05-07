import { Resend } from 'resend';
import { injectable } from 'tsyringe';

import { config } from '../../config/config';
import { AppError } from '../errors/app-error';
import { buildContactAcknowledgementTemplate } from '../templates/contact-acknowledgement.template';

interface SendContactAcknowledgementInput {
  toEmail: string;
  question: string;
}

@injectable()
export class EmailService {
  private readonly resendClient: Resend | null;

  constructor() {
    this.resendClient = config.email.resendApiKey
      ? new Resend(config.email.resendApiKey)
      : null;
  }

  public async sendContactAcknowledgement({
    toEmail,
    question,
  }: SendContactAcknowledgementInput): Promise<void> {
    if (!this.resendClient) {
      throw new AppError('Resend API key is not configured.', 500);
    }

    if (!config.email.fromEmail) {
      throw new AppError('Resend sender email is not configured.', 500);
    }

    const template = buildContactAcknowledgementTemplate({
      email: toEmail,
      question,
    });

    const response = await this.resendClient.emails.send({
      from: `${config.email.fromName} <${config.email.fromEmail}>`,
      to: [toEmail],
      replyTo: config.email.replyToEmail || undefined,
      subject: template.subject,
      text: template.text,
      html: template.html,
    });

    if (response.error) {
      throw new AppError(response.error.message || 'Failed to send acknowledgement email.', 502);
    }
  }
}
