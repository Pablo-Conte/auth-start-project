import { Mock, vi } from 'vitest';

type Mocked<T> = {
    [P in keyof T]: T[P] extends (...args: unknown[]) => unknown ? Mock : T[P];
};

export function createClassMock<T extends new (...args: unknown[]) => unknown>(
    Class: T,
): Mocked<InstanceType<T>> {
    const mockInstance: object = {};

    Object.getOwnPropertyNames(Class.prototype).forEach((methodName) => {
        if (methodName !== 'constructor') {
            mockInstance[methodName] = vi.fn();
        }
    });

    return mockInstance as Mocked<InstanceType<T>>;
}
