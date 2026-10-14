import { describe, it, expect } from 'vitest';

describe('Toolchain Smoke Test', () => {
  it('runs tests successfully under Bun', () => {
    expect(1 + 1).toBe(2);
  });
});
