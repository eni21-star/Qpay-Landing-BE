import { injectable } from 'tsyringe';

import {
  ContactSubmissionDocument,
  ContactSubmissionModel,
} from '../../../../database/models/contact-submission.model';

interface CreateContactSubmissionInput {
  email: string;
  question: string;
  sourceIp: string | null;
  userAgent: string | null;
}

@injectable()
export class ContactDataSource {
  public async create(
    payload: CreateContactSubmissionInput,
  ): Promise<ContactSubmissionDocument> {
    const submission = await ContactSubmissionModel.create(payload);
    return submission as ContactSubmissionDocument;
  }
}
