import { TestRunner } from '../TestRunner';
import { InvalidArgumentError } from './InvalidArgumentError';
import { statSync } from 'fs';

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
            throw new InvalidArgumentError();

        let config = new AppConfig();
        if (argv.length === 1 && isDirectory(argv[0]))
            config.directory = argv[0];

        return config;
    }

    run() {
        let result = TestRunner.run(this.config.directory);

        console.log(result.summary());
        console.log();

        if (result.failureCount > 0) {
            console.log('Failures:');
            for (let i = 0; i < result.failures.length; i += 1) {
                console.log(`\t${result.failures[i].test}`);
                console.log(result.failures[i].err.toString());
            }
            console.log();
        }

        if (result.errorCount > 0) {
            console.log('Errors:');
            for (let i = 0; i < result.errors.length; i += 1) {
                console.log(`\t${result.errors[i].test}`);
                console.log(result.errors[i].err);
            }
            console.log();
        }
    }
}

class AppConfig {
    directory: string;

    constructor() {
        this.directory = 'test';
    }
}

new App(process.argv).run();
