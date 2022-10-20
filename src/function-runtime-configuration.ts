import { Executable } from './executable';
import { ExecutableRuntimeMiddleware } from './executable-runtime-middleware';

export interface FunctionRuntimeConfiguration<T> {
    tracing?: ExecutableRuntimeMiddleware<T>;
    tryCatch?: ExecutableRuntimeMiddleware<T>;
    executable: Executable<T>;
}
