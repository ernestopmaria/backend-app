// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';

import FakeHashProvider from '../providers/HashProvider/fakes/fakeHashProvider';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

let authenticateUser: AuthenticateUserService;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Ernesto Maria',
      email: 'ernestom@gmail.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'ernestom@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'ernestom@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Ernesto Maria',
      email: 'ernestom@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'ernestom@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
