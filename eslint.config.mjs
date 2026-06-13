// @ts-check

import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  js.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  // Add your custom overrides here 👇
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // Turns off the forced choice between type and interface 🎯
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  }
);