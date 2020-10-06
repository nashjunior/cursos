import { Encrypter } from '../../protocols/Encrypter';
import DbAddAccount from './DbAddAccount';

interface SutTypes {
  sut: DbAddAccount;
  encryptStub: Encrypter;
}

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

  test(`Should throw if Encrypter throws`, async () => {
    const { encryptStub, sut } = makeSut();
    const accountData = {
      name: `valid_name`,
      email: `valid_email`,
      password: `valid_password`,
    };

    jest
      .spyOn(encryptStub, `encrypt`)
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });
});
