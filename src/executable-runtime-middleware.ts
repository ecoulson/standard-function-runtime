import { Executable } from './executable';

export type ExecutableRuntimeMiddleware<T> = (executable: Executable<T>) => T;
