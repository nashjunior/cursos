import { badRequest, serverError, ok } from '../../helpers/HttpHelpers';
import { MissingParamError, InvalidParamError } from '../../errors/index';
import {
  EmailValidator,
  Controller,
  HttpRequest,
  HttpResponse,
  AddAccount,
} from './SignUpProtocols';

export default class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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
      const account = await this.addAccount.add({
        name,
        email,
        password,
      });
      return ok(account);
    } catch (error) {
      return serverError(error);
    }
  }
}
