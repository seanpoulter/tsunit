export class InvalidArgumentError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, InvalidArgumentError.prototype);
    }
}
