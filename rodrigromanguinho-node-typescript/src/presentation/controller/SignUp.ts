import { badRequest, serverError } from '../helpers/HttpHelpers';
import { MissingParamError, InvalidParamError } from '../errors/index';
import {
  EmailValidator,
  Controller,
  HttpRequest,
  HttpResponse,
} from '../protocols/index';
import { AddAccount } from '../../domain/useCases/AddAccount';

export default class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        `name`,
        `email`,
        `password`,
        `passwordConfirmation`,
      ];

      const hasError = requiredFields.find(field => !httpRequest.body[field]);

      const { name, email, password, passwordConfirmation } = httpRequest.body;

      if (hasError !== undefined)
        return badRequest(new MissingParamError(hasError));

      if (password !== passwordConfirmation)
        return badRequest(new InvalidParamError(`passwordConfirmation`));

      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError(`email`));
      }
      this.addAccount.add({
        name,
        email,
        password,
      });
    } catch (error) {
      return serverError();
    }

    return {
      statusCode: 200,
      body: true,
    };
  }
}
