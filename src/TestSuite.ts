import {Test} from './Test';
import {TestCase, TestCaseConstructor} from './TestCase';
import {TestResult} from './TestResult';

export class TestSuite implements Test {
    tests: TestCase[];
    name: string;

    constructor(test?: TestCaseConstructor) {
        this.tests = [];

        if (test) {
            this.addTestCaseMethods(test);
            this.name = test.name;
        }
    }

    add(...tests: TestCase[]) {
        this.tests.push(...tests);
    }

    countTestCases(): number {
        return this.tests.length;
    }

    run(result: TestResult) {
        for (let i = 0; i < this.tests.length; i += 1) {
            this.tests[i].run(result);
        }
        return result;
    }

    private addTestCaseMethods(T: TestCaseConstructor) {
        let methods = TestSuite.getTestMethods(T);

        for (let i = 0; i < methods.length; i += 1)
            this.add(new T(methods[i]));
    }

    private static getTestMethods(constructor: TestCaseConstructor): string[] {
        if (constructor.name === 'IgnoredTestCase')
            return [];

        let methods = [];

        let prototype = constructor.prototype;
        let props = Object.getOwnPropertyNames(prototype);

        for (let i = 0; i < props.length; i += 1) {
            if (TestSuite.isTestMethod(prototype, props[i]))
                methods.push(props[i]);
        }

        return methods;
    }

    private static isTestMethod(prototype: TestCase, propertyName: string): boolean {
        let property = (<any> prototype)[propertyName];

        if (typeof property !== 'function')
            return false;

        return property.name.startsWith('test');
    }
}
