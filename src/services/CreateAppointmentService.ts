import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';

import {getCustomRepository} from 'typeorm';
import {startOfHour} from 'date-fns';

interface Request {
  provider: string,
  date: Date;

}

class CreateAppointmentService {

  public async execute({provider, date}:Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );
    if (findAppointmentInSameDate){
      throw Error('this appointment is already booked');
    }
   const appointment = appointmentsRepository.create({
     provider,
     date:appointmentDate,
   });
   await appointmentsRepository.save(appointment);
   return appointment;
    }

  }

export default CreateAppointmentService;
