class TestCase {
    name: PropertyKey;

    constructor(name: PropertyKey) {
        this.name = name;
    }

    run() {
        let method = (<any>this)[this.name];
        method.apply(this);
    }
}

class WasRun extends TestCase {
    wasRun: boolean | null;

    constructor(name: PropertyKey) {
        super(name)
        this.wasRun = null;
    }

    testMethod() {
        this.wasRun = true;
    }
}

class TestCaseTest extends TestCase {
    testRunning() {
        let test = new WasRun('testMethod');
        assert.equals(null, test.wasRun);
        test.run();
        assert.equals(true, test.wasRun);
    }
}

namespace assert {
    export function equals(expected: any, actual: any) {
        if (expected === actual)
            return;

        let message = `Expected ${expected} but was ${actual}`;
        throw new AssertionFailedError(message);
    }

    class AssertionFailedError extends Error {
        constructor(message: string) {
            super(message);
            this.name = this.constructor.name;
            Object.setPrototypeOf(this, AssertionFailedError.prototype);
        }
    }
}

new TestCaseTest('testRunning').run()
