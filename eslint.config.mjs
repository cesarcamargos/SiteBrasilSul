import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

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
    // Legacy static site + tooling, not part of the Next.js app being linted.
    // Legacy pages are removed page-by-page as each is ported (Phases 2-3).
    ".claude/**",
    "js/**",
    "css/**",
    "img/**",
    "blog/**",
    "*.html",
  ]),
]);

export default eslintConfig;
