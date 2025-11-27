import { NextFunction } from "express";
export declare class ErrorHandler extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number);
}
export declare const DBerrorHandler: (error: Error, req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=error-controllers.d.ts.map