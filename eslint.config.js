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
]);
