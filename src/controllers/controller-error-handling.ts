type ErrorName = 'get-username-error' | 'get-scores-error';

export class ControllerError extends Error {
  cause: any;
  constructor({ name, message, cause }: { name: ErrorName; message: string; cause?: any }) {
    super(message);
    this.name = name;
    this.cause = cause;

    Object.setPrototypeOf(this, ControllerError.prototype);
  }
}
