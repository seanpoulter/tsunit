import {TestCase} from './TestCase';
import {TestResult} from './TestResult';

export class TestSuite {
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