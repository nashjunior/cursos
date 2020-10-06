import { Encrypter } from '../../protocols/Encrypter';
import DbAddAccount from './DbAddAccount';

interface SutTypes {
  sut: DbAddAccount;
  encryptStub: Encrypter;
}

const makeSut = (): SutTypes => {
  class EncrypterStub {
    async encrypt(value: string): Promise<string> {
      return new Promise(resolve => resolve(`hashed_password`));
    }
  }

  const encryptStub = new EncrypterStub();
  const sut = new DbAddAccount(encryptStub);
  return {
    sut,
    encryptStub,
  };
};

describe(`DbAddAccount Usecase`, () => {
  test(`Should call Encrypter with correct password`, async () => {
    const { encryptStub, sut } = makeSut();
    const accountData = {
      name: `valid_name`,
      email: `valid_email`,
      password: `valid_password`,
    };
    const encryptSpy = jest.spyOn(encryptStub, `encrypt`);

    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith(`valid_password`);
  });
});
