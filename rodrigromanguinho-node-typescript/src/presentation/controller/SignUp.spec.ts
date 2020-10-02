import MissingParamError from '../errors/MissingParamError';
import { HttpResponse } from '../protocols/Http';
import SignUpController from './SignUp';

describe(`SignUp controller`, () => {
  test(`Should return 400 if no name is provided`, () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        email: `any_email@mail.com`,
        password: `any_password`,
        passwordConfirmation: `any_password`,
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(new MissingParamError(`name`));
  });

  test(`Should return 400 if no email is provided`, () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        name: `any_email`,
        password: `any_password`,
        passwordConfirmation: `any_password`,
      },
    };
    const httpResponse: HttpResponse = sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(new MissingParamError(`email`));
  });

  test(`Should return 400 if no password is provided`, () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        email: `any_email@mail.com`,
        name: `any_email`,
        passwordConfirmation: `any_password`,
      },
    };
    const httpResponse: HttpResponse = sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(new MissingParamError(`password`));
  });

  test(`Should return 400 if no passwordConfirmation is provided`, () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        email: `any_email@mail.com`,
        name: `any_email`,
        password: `any_password`,
      },
    };
    const httpResponse: HttpResponse = sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(
      new MissingParamError(`passwordConfirmation`),
    );
  });
});
