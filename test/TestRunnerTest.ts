import { TestCase, assert } from '../src/';
import { TestRunner } from '../src/TestRunner';
import { join } from 'path';

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
        assert.equals(3, result.runCount);
        assert.equals(1, result.failureCount);
        assert.equals(1, result.errorCount);
    }

    testRunModules() {
        let result = TestRunner.runModules(
            'dist/test/WasRun',
            'dist/test/WasRun'
        );
        assert.equals(6, result.runCount);
        assert.equals(2, result.failureCount);
        assert.equals(2, result.errorCount);
    }

    testFindFiles() {
        let actual = TestRunner.findFiles('dist/test');
        assert.equals(true, actual.length >= 8);

        const expected = [
            join('dist', 'test', 'AppTest.js'),
            join('dist', 'test', 'AssertTest.js'),
            join('dist', 'test', 'IgnoreDecoratorTest.js'),
            join('dist', 'test', 'TestCaseTest.js'),
            join('dist', 'test', 'TestResultTest.js'),
            join('dist', 'test', 'TestRunnerTest.js'),
            join('dist', 'test', 'TestSuiteTest.js'),
            join('dist', 'test', 'WasRun.js')
        ];

        const NOT_FOUND = -1;
        for (let i = 0; i < expected.length; i += 1) {
            let index = actual.indexOf(expected[i]);
            assert.equals(true, index !== NOT_FOUND);
        }
    }
}

