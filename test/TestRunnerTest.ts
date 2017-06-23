import {TestCase, assert, TestSuite, TestResult} from '../src/';
import {TestRunner} from '../src/TestRunner';

export class TestRunnerTest extends TestCase {
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

    testFindFiles() {
        let actual = TestRunner.findFiles('dist/test');
        assert.equals(7, actual.length);

        const expected = [
            'dist\\test\\AppTest.js',
            'dist\\test\\AssertTest.js',
            'dist\\test\\TestCaseTest.js',
            'dist\\test\\TestResultTest.js',
            'dist\\test\\TestRunnerTest.js',
            'dist\\test\\TestSuiteTest.js',
            'dist\\test\\WasRun.js'
        ];
        assert.equals(expected, actual);
    }
}
