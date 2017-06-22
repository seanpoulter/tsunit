import {TestCase, assert, TestSuite, TestResult} from '../src/';
import {TestRunner} from '../src/TestRunner';

class TestRunnerTest extends TestCase {
    testConvertProjectRelativePathToModuleId() {
        const actual = TestRunner.convertProjectRelativePathToModuleId('dist/test/WasRun');
        assert.equals('../test/WasRun', actual);
    }
}

let suite = new TestSuite(TestRunnerTest);
let result = new TestResult();
result = suite.run(result);
console.log(result.summary());