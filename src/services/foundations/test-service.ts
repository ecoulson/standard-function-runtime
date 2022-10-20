import { Executable } from '../../models/runtime/executable';
import { executeInRuntime } from '../../function-runtime';

export class TestService {
    doWork(shouldFail: boolean): string {
        return executeInRuntime({
            tracing: this.doWorkTracing,
            tryCatch: this.doWorkTryCatch,
            executable: () => this.doWorkExecutable(shouldFail),
        });
    }

    doWorkExecutable(shouldFail: boolean): string {
        if (shouldFail) {
            throw new Error('I failed!');
        }
        return 'I did work!';
    }

    doWorkTryCatch(executable: Executable<string>): string {
        try {
            return executable();
        } catch (error) {
            throw new Error(`I caught this error: ${(error as Error).message}`);
        }
    }

    doWorkTracing(executable: Executable<string>): string {
        console.log('Doing tracing goodness.');
        return executable();
    }
}
