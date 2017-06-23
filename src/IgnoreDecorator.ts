import {TestCase} from './TestCase';

export function ignore<T extends {new(...args:any[]):TestCase}>(constructor:T) {
    return class IgnoredTestCase extends constructor {
    }
}
