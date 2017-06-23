import {TestCase, TestResult, assert} from '../src';
import {TestSuite} from '../src';

export class TestResultTest extends TestCase {
    testTestStarted() {
        let sut = new TestResult();
        sut.testStarted();
        assert.equals(1, sut.runCount);
    }

    testTestFailed() {
        let sut = new TestResult();
        sut.testFailed();
        assert.equals(1, sut.failureCount);
    }

    testTestError() {
        let sut = new TestResult();
        sut.testError();
        assert.equals(1, sut.errorCount);
    }

    testSummary() {
        let sut = new TestResult();
        sut.testStarted();
        sut.testFailed();
        sut.testError();
        assert.equals('1 run, 1 failed, 1 error', sut.summary());
    }
}
