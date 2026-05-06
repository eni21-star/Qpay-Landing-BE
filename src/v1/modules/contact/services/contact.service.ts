import { inject, injectable } from 'tsyringe';

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
  ) {}

  public async createContact(payload: CreateContactInput) {
    return this.contactDataSource.create({
      email: payload.email.trim().toLowerCase(),
      question: payload.question.trim(),
      sourceIp: payload.sourceIp,
      userAgent: payload.userAgent,
    });
  }
}
