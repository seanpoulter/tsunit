class TestCase {
    name: PropertyKey;

    constructor(name: PropertyKey) {
        this.name = name;
    }

    setUp() {
    }

    run() {
        let method = (<any>this)[this.name];
        this.setUp();
        method.apply(this);
        this.tearDown();
    }

    tearDown() {
    }
}

class WasRun extends TestCase {
    log: string;

    constructor(name: PropertyKey) {
        super(name)
        this.log = '';
    }

    setUp() {
        this.log = 'setUp ';
    }

    testMethod() {
        this.log += 'testMethod ';
    }

    tearDown() {
        this.log += 'tearDown';
    }
}

class TestCaseTest extends TestCase {
    test: WasRun;

    setUp() {
        this.test = new WasRun('testMethod');
    }

    testTemplateMethod() {
        assert.equals('', this.test.log);
        this.test.run();
        assert.equals('setUp testMethod tearDown', this.test.log);
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

new TestCaseTest('testTemplateMethod').run()
