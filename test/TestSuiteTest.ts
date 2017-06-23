import {TestCase, assert, TestSuite, TestResult, ignore} from '../src';
import {WasRun} from './WasRun';

export class TestSuiteTest extends TestCase {
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
            new WasRun('testFailingMethod'),
            new WasRun('testBrokenMethod')
        );

        let result = new TestResult();
        suite.run(result);
        assert.equals('3 run, 1 failed, 1 error', result.summary());
    }

    testCreateFromTestCase() {
        let suite = new TestSuite(WasRun);
        assert.equals(3, suite.countTestCases());
    }

    testName() {
        let suite = new TestSuite(WasRun);
        assert.equals('WasRun', suite.name);
    }

    testCreateFromIgnoredTestCase() {
        @ignore
        class Nope extends TestCase {
            testFeature() {
            }
        }

        let suite = new TestSuite(Nope);
        assert.equals(0, suite.countTestCases());
    }
}
