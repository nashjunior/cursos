import SignUpController from './SignUp';

describe(`SignUp controller`, () => {
  test(`Should return 400 if no name is provided`, () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        name: `any_email`,
        password: `any_password`,
        passwordConfirmation: `any_password`,
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(new Error(`Missing param: email`));
  });
});
