import SignUpController from '../../presentation/controller/signUp/SignUp';
import EmailValidatorAdapter from '../../utils/EmailValidatorAdapter';
import DbAddAccount from '../../data/useCase/addAccount/DbAddAccount';
import BcryptAdapter from '../../infrastructure/crypt/BcryptAdapter';
import AccountMongoRepository from '../../infrastructure/db/mongodb/accountRepository/Account';
import { Controller } from '../../presentation/protocols';
import LogControllerDecorator from '../decorators/Log';

const makeSignUpController = (): Controller => {
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter();
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  const signUpController = new SignUpController(
    emailValidatorAdapter,
    dbAddAccount,
  );
  return new LogControllerDecorator(signUpController);
};

export default makeSignUpController;
