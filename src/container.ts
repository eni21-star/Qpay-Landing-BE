import { container } from 'tsyringe';

import { EmailService } from './shared/services/email.service';
import { ContactController } from './v1/modules/contact/controllers/contact.controller';
import { ContactDataSource } from './v1/modules/contact/datasource/contact.datasource';
import { ContactService } from './v1/modules/contact/services/contact.service';

container.registerSingleton(EmailService, EmailService);
container.registerSingleton(ContactDataSource, ContactDataSource);
container.registerSingleton(ContactService, ContactService);
container.registerSingleton(ContactController, ContactController);

export { container };
