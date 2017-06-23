import {TestRunner} from './TestRunner';
import {statSync} from 'fs';

function isDirectory(path: string | Buffer): boolean {
    let stats = statSync(path);
    return stats.isDirectory();
}

export class App {
    config: AppConfig

    constructor(argv: string[]) {
        this.config = App.parseArguments(argv);
    }

    static parseArguments(argv: string[]): AppConfig {

        // Remove the leading values for the  process.execPath, and JS path
        argv.splice(0, 2);

        if (argv.length > 1)
            throw new InvalidCommandLineArgumentError();

        let config = new AppConfig();
        if (argv.length === 1 && isDirectory(argv[0]))
            config.directory = argv[0];

        return config;
    }

    run() {
        let result = TestRunner.run(this.config.directory);
        console.log(result.summary());
    }
}

class AppConfig {
    directory: string;

    constructor() {
        this.directory = 'test';
    }
}

export class InvalidCommandLineArgumentError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, InvalidCommandLineArgumentError.prototype);
    }
}


new App(process.argv).run();
