// Paso 1: arranca la lectura de reseñas en Apify y devuelve el id para seguirla.
import {
  responder, leerCuerpo, demo, codigoValido, faltanClaves, apify, resolverEnlace, ACTOR, MAX_RESENAS,
} from "../../lib/lector.js";

export default async (req) => {
  if (req.method !== "POST") return responder(405, { ok: false, error: "metodo" });
  const { url_maps, codigo } = await leerCuerpo(req);
  if (!codigoValido(codigo)) return responder(403, { ok: false, error: "codigo" });
  if (!url_maps || !/google\.|goo\.gl/.test(url_maps)) return responder(400, { ok: false, error: "url" });
  if (faltanClaves().length) return responder(500, { ok: false, error: "configuracion" });
  if (demo()) return responder(200, { ok: true, run_id: "demo", dataset_id: "demo" });

  try {
    const url = await resolverEnlace(url_maps.trim());
    const { data } = await apify(`/acts/${ACTOR}/runs`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        startUrls: [{ url }],
        maxReviews: MAX_RESENAS,
        reviewsSort: "newest",
        language: "es",
        personalData: false,
      }),
    });
    return responder(200, { ok: true, run_id: data.id, dataset_id: data.defaultDatasetId });
  } catch (e) {
    console.error(e);
    return responder(502, { ok: false, error: "apify" });
  }
};

export const config = { path: "/api/start" };
