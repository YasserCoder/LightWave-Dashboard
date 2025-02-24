import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: "https://light-wave-dashboard.vercel.app",
        setupNodeEvents() {
            // implement node event listeners here
        },
    },
});
