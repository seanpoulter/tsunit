import {TestCase, TestResult, assert} from '../src';
import {WasRun} from './WasRun';

export class TestResultTest extends TestCase {
    testTestStarted() {
        let sut = new TestResult();
        sut.testStarted();
        assert.equals(1, sut.runCount);
    }

    testTestFailed() {
        let sut = new TestResult();
        let test = new WasRun('testFailingMethod');
        let err = new assert.AssertionFailedError('');
        sut.testFailed(test, err);

        assert.equals(1, sut.failureCount);
    }

    testTestError() {
        let sut = new TestResult();
        let test = new WasRun('testBrokenMethod');
        let err = new Error();
        sut.testError(test, err);

        assert.equals(1, sut.errorCount);
    }

    testSummary() {
        let sut = new TestResult();
        sut.testStarted();

        let test = new WasRun('testFailingMethod');
        let failure = new assert.AssertionFailedError('');
        sut.testFailed(test, failure);

        test = new WasRun('testBrokenMethod');
        let err = new Error();
        sut.testError(test, err);

        assert.equals('1 run, 1 failed, 1 error', sut.summary());
    }
}
