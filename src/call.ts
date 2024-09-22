import createClient from "openapi-fetch";
import type { paths } from "./schemas";

const apiLocation = "" + (import.meta.env.VITE_STYLEGAN_API || "http://localhost:8000");

const client = createClient<paths>({ baseUrl: apiLocation });

const getModels = (() => {
  let cached: Model[] | null = null;
  async function get() {
    if (cached) {
      return cached;
    }
    const { data, error } = await client.GET("/models/");
    if (data) {
      cached = data;
      return cached;
    }
    return Promise.reject({ data, error });
  }
  return get;
})();

async function getModelsDict() {
  const models = await getModels();
  return models.reduce((a: Record<string, Model>, x: Model) => {
    a[x.id] = x;
    return a;
  }, {});
}

export { apiLocation, client, getModels, getModelsDict };
