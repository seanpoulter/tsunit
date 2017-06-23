import {TestCase, TestResult, TestSuite, assert} from '../src';
import {WasRun} from './WasRun';

export class TestCaseTest extends TestCase {
    test: WasRun;
    result: TestResult;

    setUp() {
        this.result = new TestResult();
    }

    testRun() {
        this.test = new WasRun('testMethod');
        assert.equals('', this.test.log);
        this.test.run(this.result);
        assert.equals('setUp testMethod tearDown', this.test.log);
    }

    testResult() {
        this.test = new WasRun('testMethod');
        this.result = this.test.run(this.result);
        assert.equals(1, this.result.runCount);
        assert.equals(0, this.result.errorCount);
    }

    testFailedResult() {
        this.test = new WasRun('testBrokenMethod');
        this.result = this.test.run(this.result);
        assert.equals(1, this.result.runCount);
        assert.equals(1, this.result.errorCount);
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

    testCountTestCases() {
        let sut = new WasRun('testMethod');
        assert.equals(1, sut.countTestCases());
    }
}

let suite = new TestSuite(TestCaseTest);
let result = new TestResult();
suite.run(result);
console.log(result.summary());
