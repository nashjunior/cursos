import SignUpController from '../../presentation/controller/signUp/SignUp';
import EmailValidatorAdapter from '../../utils/EmailValidatorAdapter';
import DbAddAccount from '../../data/useCase/addAccount/DbAddAccount';
import BcryptAdapter from '../../infrastructure/crypt/BcryptAdapter';
import AccountMongoRepository from '../../infrastructure/db/mongodb/accountRepository/Account';

const makeSignUpController = (): SignUpController => {
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter();
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  return new SignUpController(emailValidatorAdapter, dbAddAccount);
};

export default makeSignUpController;
