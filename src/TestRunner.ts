import {relative, sep} from 'path';

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
}
