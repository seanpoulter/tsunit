import {assert, TestCase, TestSuite, TestResult} from '../src';

class TestSuiteTest extends TestCase {
    constructor(method: string) {
        super(method);
    }
 
    testCountTestCases() {
        let suite = new TestSuite();
        assert.equals(0, suite.countTestCases());
        
        suite.add(new TestSuiteTest('testCountTestCases'));
        assert.equals(1, suite.countTestCases());
    }
}

let suite = new TestSuite();
suite.add(
    new TestSuiteTest('testCountTestCases')
);
let result = new TestResult();
suite.run(result);
console.log(result.summary());
