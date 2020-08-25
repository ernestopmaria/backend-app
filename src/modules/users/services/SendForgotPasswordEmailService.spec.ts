// import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUserRepository();

    const createUser = new SendForgotPasswordEmailService(fakeUsersRepository);

    await createUser.execute({
      name: 'Ernesto Maria',
      email: 'ernestom@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });
});
