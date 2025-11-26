import { NextFunction } from "express";

export class ErrorHandler extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const DBerrorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
if (!error) return next();



}
