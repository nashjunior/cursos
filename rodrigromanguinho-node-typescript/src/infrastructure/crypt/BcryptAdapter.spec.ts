import bcrypt from 'bcrypt';
import BcryptAdapter from './BcryptAdapter';

jest.mock(`bcrypt`, () => ({
  async hash(): Promise<string> {
    return new Promise(resolve => resolve(`hash`));
  },
}));
describe(`Bcrypt Adapter`, () => {
  test(`Should call Bcrypt with correct values`, async () => {
    const salt = 12;
    const sut = new BcryptAdapter();
    const hashSpy = jest.spyOn(bcrypt, `hash`);
    await sut.encrypt(`any_value`);
    expect(hashSpy).toHaveBeenCalledWith(`any_value`, salt);
  });

  test(`Should return a hash on success`, async () => {
    const sut = new BcryptAdapter();
    const hashValue = await sut.encrypt(`any_value`);
    expect(hashValue).toBe(`hash`);
  });
});
