import {Test} from './Test';
import {TestResult} from './TestResult';

export class TestCase implements Test {
    name: PropertyKey;

    constructor(name: PropertyKey) {
        this.name = name;
    }

    setUp() {
    }

    run(result: TestResult): TestResult {
        result.testStarted();

        try {
            this.setUp();
            let method = (<any>this)[this.name];
            method.apply(this);
        }
        catch (e) {
            result.testFailed();
        }
        this.tearDown();

        return result;
    }

    countTestCases(): number {
        return 1;
    }

    private getTestFunctions(): symbol[] {
        let tests: symbol[] = [];

        let proto = Object.getPrototypeOf(this);
        const constructorName = proto.name;

        let props = Object.getOwnPropertyNames(proto);
        for (let i = 0; i < props.length; i += 1) {
            if (this.isTestFunction(props[i]))
                tests.push((<any> this)[props[i]]);
        }

        return tests;
    }

    private isTestFunction(propertyName: string): boolean {
        let property = (<any> this)[propertyName];

        if (typeof property !== 'function')
            return false;

        return property.name.startsWith('test');
    }

    tearDown() {
    }
}