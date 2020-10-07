import request from 'supertest';
import app from '../confg/app';

describe(`Signup Routes`, () => {
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
