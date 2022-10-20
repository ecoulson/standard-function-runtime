import { Executable } from './models/runtime/executable';
import { ExecutableRuntimeMiddleware } from './models/runtime/executable-runtime-middleware';
import { FunctionRuntimeConfiguration } from './models/runtime/function-runtime-configuration';

export function executeWithRuntime<T>(
    runtime: FunctionRuntimeConfiguration<T>
): T {
    const middlewareList = [runtime.tryCatch, runtime.tracing];
    const runtimeDecoratedExecutable = middlewareList
        .filter(
            (middleware): middleware is ExecutableRuntimeMiddleware<T> =>
                middleware !== undefined
        )
        .reduce<Executable<T>>(
            (executable, middleware) => () => middleware(executable),
            runtime.executable
        );
    return runtimeDecoratedExecutable();
}
