import {Test} from './Test';

export class TestFailure {
    test: Test;
    err: Error;

    constructor(test: Test, err: Error) {
        this.test = test;
        this.err = err;
    }
}