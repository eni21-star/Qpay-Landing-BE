import { Router } from 'express';

import { contactRoutes } from './modules/contact/routes/contact.routes';

const v1Router = Router();

v1Router.use('/contact', contactRoutes);

export { v1Router };
