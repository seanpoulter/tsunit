import { TestRunner } from '../TestRunner';
import { Arguments } from './Arguments';

export class App {
    private args: Arguments
    directory: string
    exclude: string

    constructor(argv: string[]) {
        this.args = new Arguments(argv);

        this.setDirectory();
        this.setExclude();
    }

    private setDirectory(): void {
        if (this.args.directories.size === 0)
            this.directory = 'test'
        else if (this.args.directories.size === 1)
            this.directory = this.args.directories.values().next().value;
        else
            throw new Error("Handling more than one directory has not been implemented");
    }

    private setExclude() {
        if (this.args.exclude.size === 0)
            this.exclude = ''
        else if (this.args.exclude.size === 1)
            this.exclude = this.args.exclude.values().next().value;
        else
            throw new Error("Handling more than one excluded file has not been implemented");
    }

    run() {
        let result = TestRunner.run(this.directory, this.exclude);

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
