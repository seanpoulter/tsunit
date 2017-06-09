class TestCase {
    name: PropertyKey;

    constructor(name: PropertyKey) {
        this.name = name;
    }

    setUp() {
    }

    run(result: TestResult): TestResult {
        result.testStarted();

        try {
            this.setUp();
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

class TestSuite {
    tests: TestCase[];

    constructor() {
        this.tests = [];
    }

    add(...tests: TestCase[]) {
        this.tests.push(...tests);
    }

    run(result: TestResult) {
        for (let i = 0; i < this.tests.length; i += 1) {
            this.tests[i].run(result);
        }
        return result;
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
    result: TestResult;

    setUp() {
        this.result = new TestResult();
    }

    testTemplateMethod() {
        this.test = new WasRun('testMethod');
        assert.equals('', this.test.log);
        this.test.run(this.result);
        assert.equals('setUp testMethod tearDown', this.test.log);
    }

    testResult() {
        this.test = new WasRun('testMethod');
        this.result = this.test.run(this.result);
        assert.equals('1 run, 0 failed', this.result.summary());
    }

    testFailedResult() {
        this.test = new WasRun('testBrokenMethod');
        this.result = this.test.run(this.result);
        assert.equals('1 run, 1 failed', this.result.summary());
    }

    testFailedResultFormatting() {
        this.result.testStarted();
        this.result.testFailed();
        assert.equals('1 run, 1 failed', this.result.summary());
    }

    testSuite() {
        let suite = new TestSuite();
        suite.add(
            new WasRun('testMethod'),
            new WasRun('testBrokenMethod')
        );

        this.result = new TestResult();
        suite.run(this.result);
        assert.equals('2 run, 1 failed', this.result.summary());
    }

    testFailedSetUp() {
        this.test = new WasRun('testMethod');
        this.test.setUp = function failedSetUp() {
            this.log = 'setUp ';
            throw new Error();
        }
        this.result = this.test.run(this.result);
        assert.equals('setUp tearDown', this.test.log);
    }

    testTearDownAlwaysRuns() {
        this.test = new WasRun('testBrokenMethod');
        this.test.run(this.result);
        assert.equals('setUp tearDown', this.test.log);
    }
}

namespace assert {
    export function equals(expected: any, actual: any) {
        if (expected === actual)
            return;

        let message = `Expected ${expected} but was ${actual}`;
        throw new AssertionFailedError(message);
    }

    export function fail(message: string) {
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

let suite = new TestSuite();
suite.add(
    new TestCaseTest('testTemplateMethod'),
    new TestCaseTest('testResult'),
    new TestCaseTest('testFailedResult'),
    new TestCaseTest('testFailedResultFormatting'),
    new TestCaseTest('testSuite'),
    new TestCaseTest('testFailedSetUp'),
    new TestCaseTest('testTearDownAlwaysRuns')
);
let result = new TestResult();
suite.run(result);
console.log(result.summary());
