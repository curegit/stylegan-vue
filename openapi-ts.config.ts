import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "https://stylegan.mermaid.blue/api/openapi.json",
  output: "src/client",
  plugins: ["@hey-api/client-fetch"],
});
