import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';

import FakeHashProvider from '../providers/HashProvider/fakes/fakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Ernesto Pedro',
      email: 'ernestomaria93@gmail.com',
      password: '123456',
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Nelson Maria',
      email: 'johntre@example.com',
    });

    expect(updatedUser.name).toBe('Nelson Maria');
    expect(updatedUser.email).toBe('johntre@example.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Ernesto Pedro',
      email: 'ernestomaria93@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Ernesto Pedro',
      email: 'ernestom93@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Nelson Maria',
        email: 'ernestomaria93@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Ernesto Pedro',
      email: 'ernestomaria93@gmail.com',
      password: '123456',
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Nelson Maria',
      email: 'johntre@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Ernesto Pedro',
      email: 'ernestomaria93@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Nelson Maria',
        email: 'johntre@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password without wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Ernesto Pedro',
      email: 'ernestomaria93@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Nelson Maria',
        email: 'johntre@example.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
