import {TestCase, assert} from '../src';

export class WasRun extends TestCase {
    log: string;

    constructor(name: PropertyKey) {
        super(name)
        this.log = '';
    }

    setUp() {
        this.log = 'setUp ';
    }

    testMethod() {
        this.log += 'testMethod ';
    }

    testFailingMethod() {
        assert.equals(true, false);
    }

    testBrokenMethod() {
        throw new Error();
    }

    tearDown() {
        this.log += 'tearDown';
    }
}
