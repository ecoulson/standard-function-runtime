import { Executable } from './models/runtime/executable';
import { ExecutableRuntimeMiddleware } from './models/runtime/executable-runtime-middleware';
import { FunctionRuntimeConfiguration } from './models/runtime/function-runtime-configuration';

export function createRunTime<T>(func: Executable<T>) {
    return {
        withExceptionHandling: () => withExceptionHandling(func),
        withTracing: () => withTracing(func),
        run: () => run(func),
    };
}

function withExceptionHandling<T>(func: Executable<T>) {
    const wrapped = () => {
        try {
            return func();
        } catch (error) {
            throw error;
        }
    };
    return {
        withExceptionHandling: () => withExceptionHandling(wrapped),
        withTracing: () => withTracing(wrapped),
        run: () => run(wrapped),
    };
}

function withTracing<T>(func: Executable<T>) {
    const wrapped = () => {
        console.log('tracing!');
        return func();
    };
    return {
        withExceptionHandling: () => withExceptionHandling(wrapped),
        withTracing: () => withTracing(wrapped),
        run: () => run(wrapped),
    };
}

function run<T>(func: Executable<T>) {
    return func();
}
