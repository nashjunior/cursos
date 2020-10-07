import { Request, Response, NextFunction } from 'express';

const contentType = (req: Request, res: Response, next: NextFunction): any => {
  res.type(`json`);
  next();
};

export default contentType;
