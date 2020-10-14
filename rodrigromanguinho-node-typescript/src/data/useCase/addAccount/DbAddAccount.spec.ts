import {
  Encrypter,
  AddAccountModel,
  AccountModel,
} from './DbAddAccountProtocols';
import DbAddAccount from './DbAddAccount';
import { AddAccountRepository } from '../../protocols/AddAccountRepository';

interface SutTypes {
  sut: DbAddAccount;
  encryptStub: Encrypter;
  addAccountRepositoryStub: AddAccountRepository;
}

const makeFakeAccountData = (): AddAccountModel => ({
  name: `valid_name`,
  email: `valid_email`,
  password: `valid_password`,
});

const makeFakeAccount = (): AccountModel => ({
  id: `valid_id`,
  name: `valid_name`,
  email: `valid_email`,
  password: `hashed_password`,
});

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()));
    }
  }

  return new AddAccountRepositoryStub();
};

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise(resolve => resolve(`hashed_password`));
    }
  }

  return new EncrypterStub();
};

const makeSut = (): SutTypes => {
  const encryptStub = makeEncrypter();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new DbAddAccount(encryptStub, addAccountRepositoryStub);
  return {
    sut,
    encryptStub,
    addAccountRepositoryStub,
  };
};

describe(`DbAddAccount Usecase`, () => {
  test(`Should call Encrypter with correct password`, async () => {
    const { encryptStub, sut } = makeSut();

    const encryptSpy = jest.spyOn(encryptStub, `encrypt`);

    await sut.add(makeFakeAccountData());
    expect(encryptSpy).toHaveBeenCalledWith(`valid_password`);
  });

  test(`Should throw if Encrypter throws`, async () => {
    const { encryptStub, sut } = makeSut();

    jest
      .spyOn(encryptStub, `encrypt`)
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const promise = sut.add(makeFakeAccountData());
    await expect(promise).rejects.toThrow();
  });

  test(`Should call AddAccountRepository with correct values`, async () => {
    const { addAccountRepositoryStub, sut } = makeSut();

    const addSpy = jest.spyOn(addAccountRepositoryStub, `add`);

    await sut.add(makeFakeAccountData());
    expect(addSpy).toHaveBeenCalledWith({
      name: `valid_name`,
      email: `valid_email`,
      password: `hashed_password`,
    });
  });

  test(`Should throw if Encrypter throws`, async () => {
    const { addAccountRepositoryStub, sut } = makeSut();

    jest
      .spyOn(addAccountRepositoryStub, `add`)
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const promise = sut.add(makeFakeAccountData());
    await expect(promise).rejects.toThrow();
  });

  test(`Should retirn an account if on success`, async () => {
    const { sut } = makeSut();

    const account = await sut.add(makeFakeAccountData());
    expect(account).toEqual(makeFakeAccount());
  });
});
