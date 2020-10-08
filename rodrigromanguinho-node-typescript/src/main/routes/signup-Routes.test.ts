import request from 'supertest';
import app from '../confg/app';
import MongoHelper from '../../infrastructure/db/mongodb/helpers/MongoHelper';
import env from '../confg/env';

describe(`Signup Routes`, () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection(`accounts`);
    accountCollection.deleteMany({});
  });
  test(`Should return an account on success`, async () => {
    await request(app)
      .post(`/api/signup`)
      .send({
        name: `any_name`,
        email: `any_mail@mail.com`,
        password: `123`,
        passwordConfirmation: `123`,
      })
      .expect(200);
  });
});
