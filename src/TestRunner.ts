import { TestCaseConstructor, TestCase } from './TestCase';
import { TestResult } from './TestResult';
import { TestSuite } from './TestSuite';

import { readdirSync, statSync } from 'fs';
import { relative, sep, join } from 'path';

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
    /**
     * @param path A path relative to the project, e.g.: dist/test/WasRun
     */
    static convertToModuleId(path: string): string {
        let relativePath = relative(__dirname, path);

        if (onWindows())
            relativePath = usePosixSep(relativePath);

        return relativePath;
    }

    /**
     * @param path A path relative to the project, e.g.: dist/test/WasRun
     */
    static importTestCases(path: string): TestCaseConstructor[] {
        let result = [];

        let id = TestRunner.convertToModuleId(path);
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

    /**
     * @param path A path relative to the project, e.g.: dist/test/WasRun
     */
    static runModule(path: string, result?: TestResult) {
        if (!result)
            result = new TestResult();

        let cases = TestRunner.importTestCases(path);
        for (let i = 0; i < cases.length; i += 1) {
            let suite = new TestSuite(cases[i]);
            result = suite.run(result);
        }

        return result;
    }

    /**
     * @param paths An array of paths relative to the project, e.g.: [dist/test/WasRun]
     */
    static runModules(...paths: string[]): TestResult {
        let result = new TestResult();

        for (let i = 0; i < paths.length; i += 1)
            result = TestRunner.runModule(paths[i], result);

        return result;
    }

    static findFiles(path: string, exclude?: string): string[] {
        let filepaths = [];

        if (exclude) {
            if (sep === '/')
                exclude = exclude.replace(/\\/g, sep)
            else
                exclude = exclude.replace(/\//g, sep)
        }

        let names = readdirSync(path);
        for (let i = 0; i < names.length; i += 1) {
            let p = join(path, names[i]);
            let stats = statSync(p);

            if (stats.isFile()) {
                if (exclude && exclude === p)
                    continue;

                filepaths.push(p);
            }
            else if (stats.isDirectory())
                filepaths.push(...TestRunner.findFiles(p, exclude));
        }

        return filepaths;
    }

    static run(path: string, exclude?: string): TestResult {
        let paths = TestRunner.findFiles(path, exclude);
        return TestRunner.runModules(...paths);
    }
}
