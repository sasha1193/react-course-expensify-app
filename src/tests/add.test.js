const add = (a, b) => a + b;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`;


test('should add two numbers', () => {
    const result = add(3, 4);
    expect(result).toBe(7);
});

test('should generate greeting from name', () => {
    const name = generateGreeting('Mike');
    expect(name).toBe('Hello Mike!');
});

test(('shoould generate greeting'), () => {
    const result = generateGreeting();
    expect(result).toBe('Hello Anonymous!');
})