import { HttpRequest, HttpResponse } from '../protocols/Http';
import badRequest from '../helpers/HttpHelpers';
import MissingParamError from '../errors/MissingParamError';
import { Controller } from '../protocols/Controller';

export default class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = [
      `name`,
      `email`,
      `password`,
      `passwordConfirmation`,
    ];

    const hasError = requiredFields.find(field => !httpRequest.body[field]);

    if (hasError !== undefined)
      return badRequest(new MissingParamError(hasError));
  }
}
