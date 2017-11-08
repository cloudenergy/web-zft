import Vue from 'vue'
import APP from "../pages/index.vue";

test('always pass', () => {
    // make sure to add a return statement
    return expect(Promise.resolve('pass')).resolves.toBe('pass');
});