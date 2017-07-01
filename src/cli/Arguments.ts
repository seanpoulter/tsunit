import { InvalidArgumentError } from "./InvalidArgumentError";
import { statSync } from 'fs';

function isNotDirectory(path: string | Buffer): boolean {
    try {
        let stats = statSync(path);
        return !stats.isDirectory();
    }
    catch (e) {
        if (e.code && e.code === 'ENOENT')
            return true;

        throw e;
    }
}

export class Arguments {
    directories: Set<string>
    exclude: Set<string>

    constructor(argv: string[]) {
        this.setDefaults();
        this.parseArguments(argv);
    }

    private setDefaults() {
        this.directories = new Set();
        this.exclude = new Set();
    }

    private parseArguments(argv: string[]) {
        // Remove the leading values for the `process.execPath`, and executed file path
        argv.splice(0, 2);

        for (let i = 0; i < argv.length; i += 1) {
            let arg = argv[i];
            this.parseArgument(arg);
        }
    }

    private parseArgument(arg: string) {
        if (arg.startsWith("-"))
            this.parseOption(arg);
        else
            this.addDirectory(arg);
    }

    private parseOption(arg: string) {
        let match = /^--([^=]+)=(.*$)/.exec(arg);
        if (!match)
            throw new InvalidArgumentError(arg);

        let [, longName, value] = match;
        if (longName === 'exclude') {
            this.exclude.add(value);
        }
        else {
            throw new InvalidArgumentError(arg);
        }
    }

    private addDirectory(arg: string) {
        if (isNotDirectory(arg)) {
            let message = `Cannot find directory '${arg}'`
            throw new Error(message);
        }

        this.directories.add(arg);
    }
}
