import {Test} from './Test'
import {TestFailure} from './TestFailure';
import {assert} from './assert';

export class TestResult {
    runCount: number;
    failures: TestFailure[];
    errors: TestFailure[];

    constructor() {
        this.runCount = 0;
        this.failures = [];
        this.errors = [];
    }

    testStarted() {
        this.runCount += 1;
    }

    testFailed(test: Test, err: assert.AssertionFailedError) {
        this.failures.push(new TestFailure(test, err));
    }

    testError(test: Test, err: Error) {
        this.errors.push(new TestFailure(test, err));
    }

    get failureCount(): number {
        return this.failures.length;
    }

    get errorCount(): number {
        return this.errors.length;
    }

    summary(): string {
        return `${this.runCount} run, ${this.failureCount} failed, ${this.errorCount} error`;
    }
}
