import {TestCase, TestResult, assert} from '../src';
import {TestSuite} from '../src';

class TestResultTest extends TestCase {
    testTestStarted() {
        let sut = new TestResult();
        sut.testStarted();
        assert.equals(1, sut.runCount);
    }

    testTestFailed() {
        let sut = new TestResult();
        sut.testFailed();
        assert.equals(1, sut.errorCount);
    }

    testSummary() {
        let sut = new TestResult();
        sut.testStarted();
        sut.testFailed();
        assert.equals('1 run, 1 failed', sut.summary());
    }
}

let suite = new TestSuite(TestResultTest);
let result = new TestResult();
result = suite.run(result);
console.log(result.summary());
