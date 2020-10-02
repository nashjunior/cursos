import { HttpResponse } from '../protocols/Http';

const httpResponse = {} as HttpResponse;

const badRequest = (error: Error): HttpResponse => {
  httpResponse.statusCode = 400;
  httpResponse.body = error;
  return httpResponse;
};

export { badRequest as default };
