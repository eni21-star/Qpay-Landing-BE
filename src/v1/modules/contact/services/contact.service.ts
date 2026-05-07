import { inject, injectable } from 'tsyringe';

import { EmailService } from '../../../../shared/services/email.service';
import { ContactDataSource } from '../datasource/contact.datasource';

interface CreateContactInput {
  email: string;
  question: string;
  sourceIp: string | null;
  userAgent: string | null;
}

@injectable()
export class ContactService {
  constructor(
    @inject(ContactDataSource)
    private readonly contactDataSource: ContactDataSource,
    @inject(EmailService)
    private readonly emailService: EmailService,
  ) {}

  public async createContact(payload: CreateContactInput) {
    const email = payload.email.trim().toLowerCase();
    const question = payload.question.trim();

    const submission = await this.contactDataSource.create({
      email,
      question,
      sourceIp: payload.sourceIp,
      userAgent: payload.userAgent,
    });

    await this.emailService.sendContactAcknowledgement({
      toEmail: email,
      question,
    });

    return submission;
  }
}
