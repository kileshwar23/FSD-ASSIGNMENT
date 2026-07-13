import { describe, expect, it } from 'vitest';
import { projectSchema, taskSchema } from '../src/validators/schemas.js';

describe('request validation', () => {
  it('accepts a valid project key', () => {
    expect(projectSchema.parse({ name: 'Web app', key: 'WEB' }).key).toBe('WEB');
  });

  it('rejects unsupported task states', () => {
    expect(() => taskSchema.parse({ title: 'Ship it', status: 'blocked' })).toThrow();
  });
});
