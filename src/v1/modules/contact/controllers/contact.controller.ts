import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

import { ContactService } from '../services/contact.service';

@injectable()
export class ContactController {
  constructor(
    @inject(ContactService)
    private readonly contactService: ContactService,
  ) {}

  public createContact = async (request: Request, response: Response) => {
    const submission = await this.contactService.createContact({
      email: request.body.email,
      question: request.body.question,
      sourceIp: request.ip || null,
      userAgent: request.get('user-agent') || null,
    });

    return response.status(201).json({
      success: true,
      message: 'Question submitted successfully.',
      data: {
        id: String(submission._id),
        email: submission.email,
        question: submission.question,
        createdAt: submission.createdAt,
      },
    });
  };
}
