import { TestService } from './test-service';

describe('Test Service Test Suite', () => {
    test('Sandbox: no error', () => {
        const service = new TestService();
        const expectedResult = 'I did work!';

        const result = service.doWork(false);

        expect(result).toEqual(expectedResult);
    });

    test('Sandbox: error', () => {
        const service = new TestService();
        const expectedError = new Error('I caught this error: I failed!');

        const action = () => service.doWork(true);

        expect(action).toThrowError(expectedError);
    });
});
