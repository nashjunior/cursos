import bcrypt from 'bcrypt';
import BcryptAdapter from './BcryptAdapter';

jest.mock(`bcrypt`, () => ({
  async hash(): Promise<string> {
    return new Promise(resolve => resolve(`hash`));
  },
}));

const salt = 12;

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter();
};
describe(`Bcrypt Adapter`, () => {
  test(`Should call Bcrypt with correct values`, async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, `hash`);
    await sut.encrypt(`any_value`);
    expect(hashSpy).toHaveBeenCalledWith(`any_value`, salt);
  });

  test(`Should return a hash on success`, async () => {
    const sut = makeSut();
    const hashValue = await sut.encrypt(`any_value`);
    expect(hashValue).toBe(`hash`);
  });
  test(`Should throw if bcrypt throws`, async () => {
    const sut = makeSut();
    jest
      .spyOn(bcrypt, `hash`)
      .mockReturnValue(new Promise((resolve, reject) => reject(new Error())));
    const promise = sut.encrypt(`any_value`);
    await expect(promise).rejects.toThrow();
  });
});
