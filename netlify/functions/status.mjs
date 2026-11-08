// Paso 2: la página pregunta cada pocos segundos si Apify terminó.
import { responder, demo, apify } from "../../lib/lector.js";

export default async (req) => {
  const runId = new URL(req.url).searchParams.get("run_id") || "";
  if (!/^[A-Za-z0-9]+$/.test(runId)) return responder(400, { ok: false, error: "run" });
  if (demo()) return responder(200, { ok: true, estado: "SUCCEEDED" });
  try {
    const { data } = await apify(`/actor-runs/${runId}`);
    return responder(200, { ok: true, estado: data.status });
  } catch (e) {
    console.error(e);
    return responder(502, { ok: false, error: "apify" });
  }
};

export const config = { path: "/api/status" };
