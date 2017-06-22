import {TestCase, assert, TestSuite, TestResult} from '../src/';
import {TestRunner} from '../src/TestRunner';

class TestRunnerTest extends TestCase {
    testConvertProjectRelativePathToModuleId() {
        const actual = TestRunner.convertProjectRelativePathToModuleId('dist/test/WasRun');
        assert.equals('../test/WasRun', actual);
    }

    testImportModule() {
        let actual = TestRunner.importTestCases('dist/test/WasRun');
        assert.equals(1, actual.length);
        assert.equals('WasRun', actual[0].name);
    }
}

let suite = new TestSuite(TestRunnerTest);
let result = new TestResult();
result = suite.run(result);
console.log(result.summary());
