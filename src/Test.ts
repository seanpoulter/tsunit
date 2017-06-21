import {TestResult} from '.';

export interface Test {
    countTestCases(): number;
    run(result: TestResult): void;
}
