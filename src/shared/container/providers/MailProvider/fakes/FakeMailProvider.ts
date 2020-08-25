import { IMailProvider } from '../models/IMailProvider';

interface Message {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  sendMail(to: string, body: string): Promise<void>;
}
