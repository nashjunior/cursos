import { badRequest, serverError } from '../helpers/HttpHelpers';
import { MissingParamError, InvalidParamError } from '../errors/index';
import {
  EmailValidator,
  Controller,
  HttpRequest,
  HttpResponse,
} from '../protocols/index';

export default class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
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

      const { email, password, passwordConfirmation } = httpRequest.body;

      if (hasError !== undefined)
        return badRequest(new MissingParamError(hasError));

      if (password !== passwordConfirmation)
        return badRequest(new InvalidParamError(`passwordConfirmation`));

      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError(`email`));
      }
    } catch (error) {
      return serverError();
    }

    return {
      statusCode: 200,
      body: true,
    };
  }
}
