import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import ensureAuthenticaded from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserServices'


const usersRouter = Router();
const upload = multer(uploadConfig);


usersRouter.post('/', async (request, response) => {
  try {
    const {name, email, password} = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.excecute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user)
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch('/avatar', ensureAuthenticaded, upload.single('avatar'), async(request, response)=>{
  console.log(request.file);
  return response.json({ok:true});
} )
export default usersRouter;
