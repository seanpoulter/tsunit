import {assert, TestCase, TestSuite, TestResult} from '../src';

export class AssertTest extends TestCase {
    testEquals() {
        try {
            assert.equals(1, 1);
        }
        catch (e) {
            assert.fail('An unexpected Exception was thrown');
        }
    }

    testEqualsFailed() {
        try {
            assert.equals(0, 1);
            assert.fail('Expected an AssertionFailedError to be thrown');
        }
        catch (e) {
            assert.equals(true, e instanceof assert.AssertionFailedError);
            assert.equals('Expected 0 but was 1', e.message);
        }
    }

    testArrayEquals() {
        assert.equals([1, 2, 3], [1, 2, 3]);
    }

    testArrayEqualsFailed() {
        try {
            assert.equals([1, 2, 3], ['1', '2', '3']);
            assert.fail('Expected an AssertionFailedError to be thrown');
        } catch (e) {
            assert.equals(true, e instanceof assert.AssertionFailedError);
        }
    }

    testFail() {
        let message = 'A message';
        try {
            assert.fail(message);
            assert.fail('Expected an AssertionFailedError to be thrown');
        }
        catch (e) {
            assert.equals(true, e instanceof assert.AssertionFailedError);
            assert.equals(message, e.message);
        }
    }
}
