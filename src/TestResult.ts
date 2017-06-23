export class TestResult {
    runCount: number;
    failureCount: number;
    errorCount: number;

    constructor() {
        this.runCount = 0;
        this.failureCount = 0;
        this.errorCount = 0;
    }

    testStarted() {
        this.runCount += 1;
    }

    testFailed() {
        this.failureCount += 1;
    }

    testError() {
        this.errorCount += 1;
    }

    summary(): string {
        return `${this.runCount} run, ${this.failureCount} failed, ${this.errorCount} error`;
    }
}
