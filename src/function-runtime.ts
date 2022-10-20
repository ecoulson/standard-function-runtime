import { Executable } from './models/runtime/executable';
import { ExecutableRuntimeMiddleware } from './models/runtime/executable-runtime-middleware';
import { FunctionRuntimeConfiguration } from './models/runtime/function-runtime-configuration';

export function executeInRuntime<T>(
    runtime: FunctionRuntimeConfiguration<T>
): T {
    const middlewareList = [runtime.tryCatch, runtime.tracing];
    const filteredMiddlewareList: ExecutableRuntimeMiddleware<T>[] =
        middlewareList.filter((middleware) => {
            return middleware !== undefined;
        }) as ExecutableRuntimeMiddleware<T>[];
    const runtimeDecoratedExecutable = filteredMiddlewareList.reduce<
        Executable<T>
    >((executable, middleware) => {
        return () => middleware(executable);
    }, runtime.executable);
    return runtimeDecoratedExecutable();
}
