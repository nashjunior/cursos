import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  Encrypter,
  AddAccountRepository,
} from './DbAddAccountProtocols';

export default class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;

  private readonly addAccountRepository: AddAccountRepository;

  constructor(
    encrypter: Encrypter,
    addAccountRepository: AddAccountRepository,
  ) {
    this.addAccountRepository = addAccountRepository;
    this.encrypter = encrypter;
  }

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password);
    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword,
    });
    return new Promise(resolve => resolve(account));
  }
}
