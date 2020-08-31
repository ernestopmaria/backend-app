import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });
  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123');
  });
});

it('should note be able to create two appointment on the same time', async () => {
  const appointmentData = new Date(2020, 4, 10, 11);

  await createAppointment.execute({
    date: appointmentData,
    provider_id: '123',
  });

  await expect(
    createAppointment.execute({
      date: appointmentData,
      provider_id: '123',
    }),
  ).rejects.toBeInstanceOf(AppError);
});
