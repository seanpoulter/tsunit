import {assert, TestCase, TestSuite, TestResult} from '../src';
import {WasRun} from './WasRun';

class TestSuiteTest extends TestCase {
    constructor(method: string) {
        super(method);
    }

    testAdd() {
        let suite = new TestSuite();
        assert.equals(0, suite.countTestCases());

        suite.add(
            new WasRun('testMethod'),
            new WasRun('testBrokenMethod')
        );
        assert.equals(2, suite.tests.length);
    }

    testCountTestCases() {
        let suite = new TestSuite();
        suite.add(
            new WasRun('testMethod'),
            new WasRun('testBrokenMethod')
        );
        assert.equals(2, suite.countTestCases());
    }

    testRun() {
        let suite = new TestSuite();
        suite.add(
            new WasRun('testMethod'),
            new WasRun('testBrokenMethod')
        );

        let result = new TestResult();
        suite.run(result);
        assert.equals('2 run, 1 failed', result.summary());
    }
}

let suite = new TestSuite();
suite.add(
    new TestSuiteTest('testAdd'),
    new TestSuiteTest('testCountTestCases'),
    new TestSuiteTest('testRun')
);
let result = new TestResult();
suite.run(result);
console.log(result.summary());
