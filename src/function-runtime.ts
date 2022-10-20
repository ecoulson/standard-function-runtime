import { Executable } from './executable';
import { FunctionRuntimeConfiguration } from './function-runtime-configuration';

export function executeInRuntime<T>(
    runtime: FunctionRuntimeConfiguration<T>
): T {
    const middlewareList = [runtime.tryCatch, runtime.tracing];
    const filteredMiddlewareList = middlewareList.filter((middleware) => {
        return middleware !== undefined && middleware !== null;
    });
    const runtimeDecoratedExecutable = filteredMiddlewareList.reduce<
        Executable<T>
    >((executable, middleware) => {
        return () => middleware!(executable);
    }, runtime.executable);
    return runtimeDecoratedExecutable();
}
