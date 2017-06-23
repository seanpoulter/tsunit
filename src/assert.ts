export namespace assert {
    export function equals(expected: any, actual: any) {
        if (expected === actual)
            return;

        else if (expected instanceof Array && actual instanceof Array)
            if (deepEquals(expected, actual))
                return;

        let message = `Expected ${expected} but was ${actual}`;
        throw new AssertionFailedError(message);
    }

    function deepEquals(expected: any[], actual: any[]): boolean {
        if (expected.length !== actual.length)
            return false;

        for (let i = 0; i < expected.length; i += 1) {
            if (expected[i] !== actual[i])
                return false;
        }

        return true;
    }

    export function fail(message: string) {
        throw new AssertionFailedError(message);
    }

    export class AssertionFailedError extends Error {
        constructor(message: string) {
            super(message);
            this.name = this.constructor.name;
            Object.setPrototypeOf(this, AssertionFailedError.prototype);
        }
    }
}
