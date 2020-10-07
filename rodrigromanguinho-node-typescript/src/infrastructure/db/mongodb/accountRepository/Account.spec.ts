import MongoHelper from '../helpers/MongoHelper';
import AccountMongoRepository from './Account';

describe(`Account Mongo Repository`, () => {
  beforeAll(async () => {
    await MongoHelper.connect(``);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection(`accounts`);
    accountCollection.deleteMany({});
  });

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository();
  };

  test(`Should return an account on success`, async () => {
    const sut = makeSut();
    const account = await sut.add({
      name: `any_name`,
      email: `any_email@mail.com`,
      password: `any_password`,
    });

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe(`any_name`);
    expect(account.password).toBe(`any_password`);
    expect(account.email).toBe(`any_email@mail.com`);
  });
});