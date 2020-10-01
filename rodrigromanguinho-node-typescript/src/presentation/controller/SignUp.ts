import { HttpRequest, HttpResponse } from '../protocols/Http';
import MissingParamError from '../errors/MissingParamError';

export default class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const httpResponse = {} as HttpResponse;
    if (!httpRequest.body.name) {
      httpResponse.statusCode = 400;
      httpResponse.body = new MissingParamError(`name`);
    }
    if (!httpRequest.body.email) {
      httpResponse.statusCode = 400;
      httpResponse.body = new MissingParamError(`email`);
    }
    return httpResponse;
  }
}
