import {Test} from './Test';
import {TestResult} from './TestResult';

export interface TestCaseConstructor {
    new(name: PropertyKey): TestCase
}

export class TestCase implements Test {
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

    countTestCases(): number {
        return 1;
    }

    tearDown() {
    }
}