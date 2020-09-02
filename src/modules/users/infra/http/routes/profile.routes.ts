import { Router } from 'express';

import ensureAuthenticaded from '../middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticaded);
profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
