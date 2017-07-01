import { TestCase, assert } from '../src';
import { App } from '../src/App';
import { InvalidCommandLineArgumentError } from "../src/InvalidCommandLineArgumentError";

export class AppTest extends TestCase {
    testParseArguments() {
        let config = App.parseArguments(['node', '...\App']);
        assert.equals('test', config.directory);
    }

    testParseInvalidArguments() {
        try {
            App.parseArguments(['node', '...\App', 'dist/test', 'true']);
            assert.fail('Expected an InvalidCommandLineArgumentError to be thrown');
        }
        catch (e) {
            assert.equals(true, e instanceof InvalidCommandLineArgumentError);
        }
    }
}
