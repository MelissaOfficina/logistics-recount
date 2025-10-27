import { defineConfig } from "cypress";
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on('file:preprocessor', vitePreprocessor())
      // implement node event listeners here
    },
    supportFile: false,
    baseUrl: 'http://localhost:4173',
  },
});
