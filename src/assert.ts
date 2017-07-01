export namespace assert {
    export function equals(expected: any, actual: any) {
        if (expected === actual)
            return;

        else if (expected instanceof Array && actual instanceof Array)
            if (deepEquals(expected, actual))
                return;

        let message = `Expected ${formatValue(expected)} but was ${formatValue(actual)}`;
        throw new AssertionFailedError(message, expected, actual);
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

    function formatValue(arg: any): string {
        if (arg === null)
            return arg;

        if (typeof arg === 'string')
            return `'${arg}'`;

        if (arg instanceof Array)
            return `[${arg.map(formatValue)}]`;

        return arg.toString();
    }

    export function fail(message: string) {
        throw new AssertionFailedError(message);
    }

    export class AssertionFailedError extends Error {
        expected: any;
        actual: any;

        constructor(message: string, expected?: any, actual?: any) {
            super(message);
            this.name = this.constructor.name;
            Object.setPrototypeOf(this, AssertionFailedError.prototype);

            if (typeof expected !== 'undefined')
                this.expected = expected;

            if (typeof actual !== 'undefined')
                this.actual = actual;
        }

        public toString(): string {
            if (typeof this.stack === 'undefined')
                return super.toString();

            return this.stack;
        }
    }
}
