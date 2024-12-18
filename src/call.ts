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

let prevRun = Promise.resolve();

function runModel(path: Parameters<typeof client.POST>[0], params: Parameters<typeof client.POST>[1], timeoutMs: number = 5000, serial: boolean = true) {
  let resolver = () => {};
  const waitRun = new Promise<void>((resolve) => {
    resolver = () => resolve();
  });
  const waitPrevRun = serial ? prevRun : Promise.resolve();
  prevRun = waitRun;
  const task = waitPrevRun.then(() => client.POST(path, params).finally(() => resolver()));
  const timeoutPromise = new Promise<never>((_, reject) => setTimeout(reject, timeoutMs));
  return Promise.race([task, timeoutPromise]).finally(() => resolver());
}

export { apiLocation, client, getModels, getModelsDict, runModel };
