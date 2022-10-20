import { Executable } from '../../models/runtime/executable';
import { executeWithRuntime } from '../../function-runtime';

export class TestService {
    doWork(shouldFail: boolean): string {
        return executeWithRuntime({
            tracing: (executable) =>
                this.doWorkTracing(
                    {
                        shouldFail: shouldFail ? 'true' : 'false',
                    },
                    executable
                ),
            tryCatch: this.doWorkTryCatch,
            businessLogic: () => this.doWorkExecutable(shouldFail),
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

    doWorkTracing(
        tags: Record<string, string>,
        executable: Executable<string>
    ): string {
        console.log('Doing tracing goodness.');
        console.log('Tags', tags);
        return executable();
    }
}
