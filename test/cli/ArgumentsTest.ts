import { TestCase, assert } from '../../src/';
import { Arguments } from '../../src/cli/Arguments';
import { InvalidArgumentError } from '../../src/cli/InvalidArgumentError';

export class ArgumentsTest extends TestCase {
    testDefaultValues() {
        let args = ['', ''];
        let sut = new Arguments(args);
        assert.equals(0, sut.directories.size);
    }

    testDirectory() {
        let args = ['', '', 'dist\\test'];
        let sut = new Arguments(args);
        assert.equals(true, sut.directories.has('dist\\test'));
        assert.equals(1, sut.directories.size);
    }

    testDirectoryNotFound() {
        let args = ['', '', 'invalid\\directory'];
        try {
            new Arguments(args);
            assert.fail('Expected an Error to be thrown');
        }
        catch (e) {
            assert.equals(`Cannot find directory 'invalid\\directory'`, e.message);
        }
    }

    testExclude() {
        let args = ['', '', '--exclude=dist\\test\\WasRun.js', 'dist\\test'];
        let sut = new Arguments(args);
        assert.equals(true, sut.exclude.has('dist\\test\\WasRun.js'))
        assert.equals(1, sut.exclude.size);
    }

    testInvalidOption() {
        let args = ['', '', '--help'];
        try {
            new Arguments(args);
            assert.fail('Expected an InvalidArgumentError error to be thrown');
        }
        catch (e) {
            assert.equals(true, e instanceof InvalidArgumentError);
        }
    }
}
