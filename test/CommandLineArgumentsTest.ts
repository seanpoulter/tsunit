import { TestCase, assert } from '../src/';
import { CommandLineArguments } from '../src/CommandLineArguments';
import { InvalidCommandLineArgumentError } from '../src/InvalidCommandLineArgumentError';

export class CommandLineArgumentsTest extends TestCase {
    testDefaultValues() {
        let args = ['', ''];
        let sut = new CommandLineArguments(args);
        assert.equals(0, sut.directories.size);
    }

    testDirectory() {
        let args = ['', '', 'dist\\test'];
        let sut = new CommandLineArguments(args);
        assert.equals(true, sut.directories.has('dist\\test'));
        assert.equals(1, sut.directories.size);
    }

    testDirectoryNotFound() {
        let args = ['', '', 'invalid\\directory'];
        try {
            new CommandLineArguments(args);
            assert.fail('Expected an Error to be thrown');
        }
        catch (e) {
            assert.equals(`Cannot find directory 'invalid\\directory'`, e.message);
        }
    }

    testExclude() {
        let args = ['', '', '--exclude=dist\\test\\WasRun.js', 'dist\\test'];
        let sut = new CommandLineArguments(args);
        assert.equals(true, sut.exclude.has('dist\\test\\WasRun.js'))
        assert.equals(1, sut.exclude.size);
    }

    testInvalidOption() {
        let args = ['', '', '--help'];
        try {
            new CommandLineArguments(args);
            assert.fail('Expected an InvalidCommandLineArgumentError error to be thrown');
        }
        catch (e) {
            assert.equals(true, e instanceof InvalidCommandLineArgumentError);
        }
    }
}
