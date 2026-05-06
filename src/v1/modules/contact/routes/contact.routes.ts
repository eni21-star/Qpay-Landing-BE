import { Router } from 'express';

import { container } from '../../../../container';
import { ApiKeyAuthMiddleware } from '../../../../shared/middlewares/api-key-auth';
import { validateRequest } from '../../../../shared/middlewares/validate-request';
import { ContactController } from '../controllers/contact.controller';
import { CreateContactDto } from '../dto/create-contact.dto';

const contactRoutes = Router();

const contactController = container.resolve(ContactController);
const apiKeyAuthMiddleware = container.resolve(ApiKeyAuthMiddleware);

contactRoutes.post(
  '/',
  apiKeyAuthMiddleware.handle,
  validateRequest(CreateContactDto),
  contactController.createContact,
);

export { contactRoutes };
