import { TestCase, assert } from '../../src';
import { App } from '../../src/cli/App';
import { InvalidArgumentError } from '../../src/cli/InvalidArgumentError'

export class AppTest extends TestCase {
    testParseArguments() {
        let config = App.parseArguments(['', '']);
        assert.equals('test', config.directory);
    }

    testParseInvalidArguments() {
        try {
            console.dir(App)
            App.parseArguments(['', '', 'dist/test', 'true']);
            assert.fail('Expected an InvalidArgumentError to be thrown');
        }
        catch (e) {
            assert.equals(true, e instanceof InvalidArgumentError);
        }
    }
}
