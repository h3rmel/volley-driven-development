/// <reference types="vitest" />

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any>
    extends jest.Matchers<void>,
      TestingLibraryMatchers<T, void> {}
  interface AsymmetricMatchersContaining
    extends jest.Matchers<void>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      TestingLibraryMatchers<any, void> {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface JestAssertion<T = any>
    extends jest.Matchers<void>,
      TestingLibraryMatchers<T, void> {}
}
