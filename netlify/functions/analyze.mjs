// Paso 3: baja las reseñas y Claude escribe la ficha del cliente ideal.
import {
  responder, leerCuerpo, demo, codigoValido, apify, datosNegocio, lineasResenas,
  construirPrompt, analizarConClaude, leerJSON, DEMO_FICHA, DEMO_NEGOCIO,
} from "../../lib/lector.js";

export default async (req) => {
  if (req.method !== "POST") return responder(405, { ok: false, error: "metodo" });
  const { dataset_id, para_quien, codigo } = await leerCuerpo(req);
  if (!codigoValido(codigo)) return responder(403, { ok: false, error: "codigo" });
  if (!/^[A-Za-z0-9]+$/.test(String(dataset_id || ""))) return responder(400, { ok: false, error: "dataset" });
  if (demo()) return responder(200, { ok: true, negocio: DEMO_NEGOCIO, ficha: DEMO_FICHA });

  let items;
  try {
    items = await apify(`/datasets/${dataset_id}/items?clean=true&format=json`);
  } catch (e) {
    console.error(e);
    return responder(502, { ok: false, error: "apify", detalle: String(e.message) });
  }
  const lineas = lineasResenas(items);
  if (!lineas.length) return responder(200, { ok: false, error: "sin_resenas" });

  const negocio = datosNegocio(items);
  const prompt = construirPrompt(para_quien, negocio, lineas);
  let detalle = "";
  for (let intento = 0; intento < 2; intento++) {
    try {
      const ficha = leerJSON(await analizarConClaude(prompt));
      return responder(200, { ok: true, negocio, ficha });
    } catch (e) {
      console.error(e);
      detalle = String(e.message);
    }
  }
  return responder(502, { ok: false, error: "ia", detalle });
};

export const config = { path: "/api/analyze" };
