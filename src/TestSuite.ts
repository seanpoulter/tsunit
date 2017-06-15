import {Test} from './Test';
import {TestCase} from './TestCase';
import {TestResult} from './TestResult';

export class TestSuite implements Test {
    tests: TestCase[];

    constructor() {
        this.tests = [];
    }

    add(...tests: TestCase[]) {
        this.tests.push(...tests);
    }

    countTestCases(): number {
        return this.tests.length;
    }

    run(result: TestResult) {
        for (let i = 0; i < this.tests.length; i += 1) {
            this.tests[i].run(result);
        }
        return result;
    }
}