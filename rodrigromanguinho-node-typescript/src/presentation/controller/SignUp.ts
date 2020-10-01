import { HttpRequest, HttpResponse } from '../protocols/Http';

export default class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const httpResponse = {} as HttpResponse;
    if (!httpRequest.body.name) {
      httpResponse.statusCode = 400;
      httpResponse.body = new Error(`Missing param: name`);
    }
    if (!httpRequest.body.email) {
      httpResponse.statusCode = 400;
      httpResponse.body = new Error(`Missing param: email`);
    }
    return httpResponse;
  }
}
