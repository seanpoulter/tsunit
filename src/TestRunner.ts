import {relative, sep} from 'path';
import {TestCaseConstructor, TestCase} from './TestCase';

function onWindows(): boolean {
    return process.platform.startsWith('win');
}

function usePosixSep(path: string): string {
    const pattern = escapeRegexpPattern(sep);
    const re = new RegExp(pattern, 'g');
    return path.replace(re, '/');
}

function escapeRegexpPattern(pattern: string): string {
    const re = new RegExp(/(\\)/, 'g');
    return pattern.replace(re, '\\$1');
}

export class TestRunner {
    static convertProjectRelativePathToModuleId(path: string): string {
        let relativePath = relative(__dirname, path);

        if (onWindows())
            relativePath = usePosixSep(relativePath);

        return relativePath;
    }

    static importTestCases(path: string): TestCaseConstructor[] {
        let result = [];

        let id = TestRunner.convertProjectRelativePathToModuleId(path);
        let module_ = require(id);
        let keys = Object.keys(module_);

        for (let i = 0; i < keys.length; i += 1) {
            let property = keys[i];
            if (TestRunner.isTestCaseClass(module_[property]))
                result.push(module_[property]);
        }

        return result;
    }

    private static isTestCaseClass(arg: any): arg is TestCaseConstructor {
        return arg instanceof Function
            && arg.prototype instanceof TestCase;
    }
}
