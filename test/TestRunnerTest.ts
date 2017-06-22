import {TestCase, assert, TestSuite, TestResult} from '../src/';
import {TestRunner} from '../src/TestRunner';

class TestRunnerTest extends TestCase {
    testConvertToModuleId() {
        const actual = TestRunner.convertToModuleId('dist/test/WasRun');
        assert.equals('../test/WasRun', actual);
    }

    testImportModule() {
        let actual = TestRunner.importTestCases('dist/test/WasRun');
        assert.equals(1, actual.length);
        assert.equals('WasRun', actual[0].name);
    }

    testRunModule() {
        let result = TestRunner.runModule('dist/test/WasRun');
        assert.equals(2, result.runCount);
        assert.equals(1, result.errorCount);
    }

    testRunModules() {
        let result = TestRunner.runModules(
            'dist/test/WasRun',
            'dist/test/WasRun'
        );
        assert.equals(4, result.runCount);
        assert.equals(2, result.errorCount);
    }
}

let suite = new TestSuite(TestRunnerTest);
let result = new TestResult();
result = suite.run(result);
console.log(result.summary());
