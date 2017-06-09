class TestCase {
    name: PropertyKey;

    constructor(name: PropertyKey) {
        this.name = name;
    }

    setUp() {
    }

    run() {
        this.setUp();
        let method = (<any>this)[this.name];
        method.apply(this);
    }
}

class WasRun extends TestCase {
    wasSetUp: boolean | null;
    wasRun: boolean | null;

    constructor(name: PropertyKey) {
        super(name)
        this.wasSetUp = null;
        this.wasRun = null;
    }

    setUp() {
        this.wasSetUp = true;
    }

    testMethod() {
        this.wasRun = true;
    }
}

class TestCaseTest extends TestCase {
    test: WasRun;

    setUp() {
        this.test = new WasRun('testMethod');
    }

    testRunning() {
        assert.equals(null, this.test.wasRun);
        this.test.run();
        assert.equals(true, this.test.wasRun);
    }

    testSetUp() {
        assert.equals(null, this.test.wasSetUp);
        this.test.run();
        assert.equals(true, this.test.wasSetUp);
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
