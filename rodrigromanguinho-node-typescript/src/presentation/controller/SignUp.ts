export default class SignUpController {
  handle(httpRequest: any): any {
    const httpResponse: any = {};
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
