import { defineConfig } from "eslint/config";
import {
  basePreset,
  bestPracticePreset,
  nodePreset,
  importPreset,
} from "@msobiecki/eslint-config";

export default defineConfig([
  basePreset,
  bestPracticePreset,
  nodePreset,
  importPreset,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
]);
