import { Executable } from '../../models/runtime/executable';
import { createRunTime } from '../../function-runtime';

export class TestService {
    doWork(shouldFail: boolean): string {
        return createRunTime(() => this.doWorkExecutable(shouldFail))
            .withExceptionHandling()
            .withTracing()
            .run();
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
