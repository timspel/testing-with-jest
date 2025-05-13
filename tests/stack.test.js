const stack = require('../src/stack');

function clearStack() {
    while (stack.pop() !== undefined) {}
}

test('peek on empty stack returns undefined', () => {
    expect(stack.peek()).toBeUndefined();
});

test('peek on stack with one element returns that element', () => {
    stack.push(1);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(1);
});

test('peek on stack with two or more elements returns the top element', () => {
    stack.push(1);
    stack.push("wow");
    stack.push(42);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(42);
});

// Eget test
test('push and pop multiple elements maintains order and leaves stack empty', () => {
    clearStack(); 
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.pop()).toBe(3); 
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.pop()).toBeUndefined(); 
    expect(stack.peek()).toBeUndefined(); 
});