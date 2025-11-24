import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import importPlugin from "eslint-plugin-import"
import reactHooksPlugin from "eslint-plugin-react-hooks"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: {
      import: importPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      // Enforce hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // Imports
      "import/no-default-export": "warn",
      "import/order": ["warn", { "newlines-between": "always" }],
      "import/no-unresolved": "off",
      // Typescript hygiene
      "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports" }],
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      // General
      "quotes": ["error", "double"],
      "indent": ["error", 2],
    },
  },
])

export default eslintConfig
