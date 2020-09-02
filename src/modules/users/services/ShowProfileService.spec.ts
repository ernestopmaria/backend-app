import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';

import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Ernesto Pedro',
      email: 'ernestomaria93@gmail.com',
      password: '123456',
    });
    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Ernesto Pedro');
    expect(profile.email).toBe('ernestomaria93@gmail.com');
  });
  it('should not be able to show the profile from non-existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'non existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
