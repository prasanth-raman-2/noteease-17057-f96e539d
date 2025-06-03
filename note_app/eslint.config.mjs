import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      globals: {
        React: 'readable',
        HTMLInputElement: 'readable',
        HTMLElement: 'readable',
        Node: 'readable',
        Document: 'readable',
        Window: 'readable'
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      "no-undef": "off", // Turn off no-undef as TypeScript handles this
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
    ignores: ["node_modules/**", "dist/**", "build/**"]
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        React: 'readable'
      }
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "warn",
    }
  }
];
