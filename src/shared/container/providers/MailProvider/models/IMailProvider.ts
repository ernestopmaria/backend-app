import ISendMailDTO from '../dtos/ISendMailDTO';

export interface IMailProvider {
  sendMail(tdata: ISendMailDTO): Promise<void>;
}
