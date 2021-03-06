import { resolve } from 'path';
import { LogErrorRepository } from '../../data/protocols/LogErrorRepository';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../presentation/protocols';

export default class LogControllerDecorator implements Controller {
  private readonly controller: Controller;

  private readonly logErrorRepository: LogErrorRepository;

  constructor(controller: Controller, logErrorRepository: LogErrorRepository) {
    this.controller = controller;
    this.logErrorRepository = logErrorRepository;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);
    if (httpResponse.statusCode === 500)
      await this.logErrorRepository.log(httpResponse.body.stack);
    return httpResponse;
  }
}
