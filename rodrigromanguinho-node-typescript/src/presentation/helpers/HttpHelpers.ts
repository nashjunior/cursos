import ServerError from '../errors/ServerError';
import { HttpResponse } from '../protocols/Http';

const httpResponse = {} as HttpResponse;

const badRequest = (error: Error): HttpResponse => {
  httpResponse.statusCode = 400;
  httpResponse.body = error;
  return httpResponse;
};

const serverError = (): HttpResponse => {
  httpResponse.statusCode = 500;
  httpResponse.body = new ServerError();
  return httpResponse;
};

export { badRequest, serverError };
