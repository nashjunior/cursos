import { HttpRequest, HttpResponse } from '../protocols/Http';
import badRequest from '../helpers/HttpHelpers';
import MissingParamError from '../errors/MissingParamError';
import { Controller } from '../protocols/Controller';
import InvalidParamError from '../errors/InvalidParamError';
import EmailValidator from '../protocols/EmailValidator';
import ServerError from '../errors/ServerError';

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

      if (hasError !== undefined)
        return badRequest(new MissingParamError(hasError));

      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) {
        return badRequest(new InvalidParamError(`email`));
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError(),
      };
    }

    return {
      statusCode: 200,
      body: true,
    };
  }
}
