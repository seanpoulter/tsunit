class TestCase {
    name: PropertyKey;

    constructor(name: PropertyKey) {
        this.name = name;
    }

    setUp() {
    }

    run(): TestResult {
        let result = new TestResult();

        result.testStarted();
        this.setUp();
        try {
            let method = (<any>this)[this.name];
            method.apply(this);
        }
        catch (e) {
            result.testFailed();
        }
        this.tearDown();

        return result;
    }

    tearDown() {
    }
}

class TestResult {
    runCount: number;
    errorCount: number;

    constructor() {
        this.runCount = 0;
        this.errorCount = 0;
    }

    testStarted() {
        this.runCount += 1;
    }

    testFailed() {
        this.errorCount += 1;
    }

    summary(): string {
        return `${this.runCount} run, ${this.errorCount} failed`;
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

    testBrokenMethod() {
        throw new Error();
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

    testResult() {
        let result = this.test.run();
        assert.equals('1 run, 0 failed', result.summary());
    }

    testFailedTest() {
        let test = new WasRun('testBrokenMethod');
        let result = test.run();
        assert.equals('1 run, 1 failed', result.summary());
    }

    testFailedResultFormatting() {
        let result = new TestResult();
        result.testStarted();
        result.testFailed();
        assert.equals('1 run, 1 failed', result.summary());
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

console.log(new TestCaseTest('testTemplateMethod').run().summary())
console.log(new TestCaseTest('testResult').run().summary())
console.log(new TestCaseTest('testFailedTest').run().summary())
console.log(new TestCaseTest('testFailedResultFormatting').run().summary())
