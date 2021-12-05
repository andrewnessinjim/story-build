import queries from "../Query";

test('health query returns a static value', () => {
    expect(queries.health()).toBe("OK");
});