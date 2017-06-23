import {TestCase, ignore, assert} from '../src';

export class IgnoreDecoratorTest extends TestCase {
    testIgnoreClass() {
        @ignore
        class Empty extends TestCase {
        }

        let sut = new Empty('testMethod');
        assert.equals('IgnoredTestCase', sut.constructor.name);
    }
}
