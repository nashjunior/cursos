import bcrypt from 'bcrypt';
import BcryptAdapter from './BcryptAdapter';

describe(`Bcrypt Adapter`, () => {
  test(`Should call Bcrypt with correct values`, async () => {
    const salt = 12;
    const sut = new BcryptAdapter();
    const hashSpy = jest.spyOn(bcrypt, `hash`);
    await sut.encrypt(`any_value`);
    expect(hashSpy).toHaveBeenCalledWith(`any_value`, salt);
  });
});
