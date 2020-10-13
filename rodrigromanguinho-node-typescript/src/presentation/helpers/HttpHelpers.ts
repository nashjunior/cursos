import ServerError from '../errors/ServerError';
import { HttpResponse } from '../protocols/Http';

const httpResponse = {} as HttpResponse;

const badRequest = (error: Error): HttpResponse => {
  httpResponse.statusCode = 400;
  httpResponse.body = error;
  return httpResponse;
};

const serverError = (error: Error): HttpResponse => {
  httpResponse.statusCode = 500;
  httpResponse.body = new ServerError(error.stack);
  return httpResponse;
};

const ok = (data: any): HttpResponse => {
  httpResponse.statusCode = 200;
  httpResponse.body = data;
  return httpResponse;
};

export { badRequest, serverError, ok };
