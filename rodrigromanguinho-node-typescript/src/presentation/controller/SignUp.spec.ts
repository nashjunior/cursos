import {
  InvalidParamError,
  MissingParamError,
  ServerError,
} from '../errors/index';
import { EmailValidator, HttpResponse } from '../protocols';
import SignUpController from './SignUp';
import { AccountModel } from '../../domain/models/Account';
import { AddAccount, AddAccountModel } from '../../domain/useCases/AddAccount';

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
  addAccountStub: AddAccount;
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add(account: AddAccountModel): AccountModel {
      const fakeAccount = {
        id: `valid_id`,
        name: `valid_name`,
        email: `valid.email@email.com`,
        password: `valid_password`,
      };

      return fakeAccount;
    }
  }

  return new AddAccountStub();
};

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const addAccountStub = makeAddAccount();
  const sut = new SignUpController(emailValidatorStub, addAccountStub);
  return {
    sut,
    addAccountStub,
    emailValidatorStub,
  };
};

describe(`SignUp controller`, () => {
  test(`Should return 400 if no name is provided`, () => {
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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

  test(`Should return 400 if no passwordConfirmation is fails`, () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: `any_email@mail.com`,
        name: `any_email`,
        password: `any_password`,
        passwordConfirmation: `invalid_password`,
      },
    };
    const httpResponse: HttpResponse = sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(
      new InvalidParamError(`passwordConfirmation`),
    );
  });

  test(`Should return 400 if an invalid email is provided`, () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, `isValid`).mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        email: `any_email@mail.com`,
        name: `any_email`,
        password: `any_password`,
        passwordConfirmation: `any_password`,
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(new InvalidParamError(`email`));
  });

  test(`Should call EmailValidator with correct Email`, () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, `isValid`);
    const httpRequest = {
      body: {
        email: `any_email@mail.com`,
        name: `any_email`,
        password: `any_password`,
        passwordConfirmation: `any_password`,
      },
    };

    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith(`any_email@mail.com`);
  });

  test(`Should return 500 if EmailValidator throws`, () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, `isValid`).mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        email: `any_email@mail.com`,
        name: `any_email`,
        password: `any_password`,
        passwordConfirmation: `any_password`,
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test(`Should call AddAccount with correct values`, () => {
    const { sut, addAccountStub } = makeSut();
    const addSpy = jest.spyOn(addAccountStub, `add`);
    const httpRequest = {
      body: {
        email: `any_email@mail.com`,
        name: `any_email`,
        password: `any_password`,
        passwordConfirmation: `any_password`,
      },
    };

    sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({
      name: `any_email`,
      email: `any_email@mail.com`,
      password: `any_password`,
    });
  });
});
