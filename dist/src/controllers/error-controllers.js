export class ErrorHandler extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
export const DBerrorHandler = (error, req, res, next) => {
    if (!error)
        return next();
};
//# sourceMappingURL=error-controllers.js.map