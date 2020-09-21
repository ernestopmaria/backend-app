import { container } from 'tsyringe';
import mailConfig from '@config/mail';
import EtherealMailProvider from './imprementations/EtherealMailProvider';
import SESMailProvider from './imprementations/SESMailProvider';
import { IMailProvider } from './models/IMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
