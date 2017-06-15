import {TestResult} from './TestResult';

export class TestCase {
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