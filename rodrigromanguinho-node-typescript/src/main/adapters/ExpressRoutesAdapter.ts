import { Request, Response } from 'express';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../presentation/protocols';

const adapterRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
    };
    await controller.handle(httpRequest);
    const httpResponse: HttpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};

export default adapterRoute;
