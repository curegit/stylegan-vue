import { blend, generate, mix, models } from "./client";
import type { GenerateData, Model } from "./client";
import { client } from "./client/client.gen";

const apiLocation = import.meta.env.VITE_STYLEGAN_API || "";

client.setConfig({ baseUrl: apiLocation });

const getModels = (() => {
  let cached: Model[] | null = null;
  async function get() {
    if (cached) {
      return cached;
    }
    const { data, error } = await models();
    if (data) {
      cached = data;
      return cached;
    }
    return Promise.reject(error);
  }
  return get;
})();

async function getModelsDict() {
  const list = await getModels();
  return list.reduce((a: Record<string, Model>, x: Model) => {
    a[x.id] = x;
    return a;
  }, {});
}

let prevModelCall: Promise<void> = Promise.resolve();

function runSerial<T>(task: () => Promise<T>, timeoutMs: number, serial: boolean): Promise<T> {
  let release = () => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const waitPrev = serial ? prevModelCall : Promise.resolve();
  prevModelCall = gate;
  const run = waitPrev.then(task).finally(release);
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(reject, timeoutMs);
  });
  return Promise.race([run, timeout]).finally(release);
}

function runModelGenerate(model_id: string, query: GenerateData["query"] = undefined, timeoutMs: number = 5000, serial: boolean = true) {
  return runSerial(() => generate({ path: { model_id }, query }), timeoutMs, serial);
}

function runModelBlend(model_id: string, styles: string[], timeoutMs: number = 5000, serial: boolean = true) {
  return runSerial(() => blend({ path: { model_id }, body: { styles } }), timeoutMs, serial);
}

function runModelMix(model_id: string, styles: string[], timeoutMs: number = 5000, serial: boolean = true) {
  return runSerial(() => mix({ path: { model_id }, body: { styles } }), timeoutMs, serial);
}

export { apiLocation, client, getModels, getModelsDict, runModelGenerate, runModelBlend, runModelMix };
