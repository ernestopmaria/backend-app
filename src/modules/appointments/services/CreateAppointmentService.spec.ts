import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
  });
});

/* it('should note be able to create two appointment on the same time', () => {
  expect(1 + 2).toBe(3);
}); */