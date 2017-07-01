import { TestCase, assert } from '../../src/';
import { App } from '../../src/cli/App';

export class AppTest extends TestCase {
    testDefaultDirectory() {
        let args = ['', '']
        let sut = new App(args);
        assert.equals('test', sut.directory);
    }

    testDirectory() {
        let args = ['', '', 'dist\\test'];
        let sut = new App(args);
        assert.equals('dist\\test', sut.directory);
    }

    testExclude() {
        let args = ['', '', '--exclude=dist\\test\\WasRun.js'];
        let sut = new App(args);
        assert.equals('dist\\test\\WasRun.js', sut.exclude);
    }

    testMoreThanOneDirectory() {
        let args = ['', '', 'test', 'dist\\test'];
        try {
            new App(args);
            assert.fail('Expected an Error to be thrown');
        }
        catch (e) {
        }
    }

    testMoreThanOneExcludedFile() {
        let args = ['', '', '--exclude=dist\\test\\WasRun.js','--exclude=dist\\test\\SlowTest.js'];
        try {
            new App(args);
            assert.fail('Expected an Error to be thrown');
        }
        catch (e) {
        }
    }
}
