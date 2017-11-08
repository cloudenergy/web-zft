import Vue from 'vue'

test('always pass', () => {
    // make sure to add a return statement
    return expect(Promise.resolve('pass')).resolves.toBe('pass');
});