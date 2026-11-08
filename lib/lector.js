// Lógica compartida por las funciones de Netlify (netlify/functions/).
import { DEMO_FICHA, DEMO_NEGOCIO } from "./demo.js";

export const ACTOR = "compass~google-maps-reviews-scraper";
export const MAX_RESENAS = 50;

export const demo = () => process.env.DEMO_MODE === "1";
export { DEMO_FICHA, DEMO_NEGOCIO };

export function responder(status, data) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

export async function leerCuerpo(req) {
  try {
    return await req.json();
  } catch {
    return {};
  }
}

// Si ACCESS_CODE está definido, la página pide ese código (tu versión: el "código del domingo").
export function codigoValido(codigo) {
  const esperado = (process.env.ACCESS_CODE || "").trim().toUpperCase();
  if (!esperado) return true;
  return String(codigo || "").trim().toUpperCase() === esperado;
}

export function faltanClaves() {
  if (demo()) return [];
  return ["APIFY_TOKEN", "ANTHROPIC_API_KEY"].filter((k) => !process.env[k]);
}

export async function apify(path, options = {}) {
  const sep = path.includes("?") ? "&" : "?";
  const r = await fetch(`https://api.apify.com/v2${path}${sep}token=${process.env.APIFY_TOKEN}`, options);
  if (!r.ok) throw new Error(`apify ${r.status}`);
  return r.json();
}

// Los enlaces cortos del móvil (maps.app.goo.gl) se resuelven a la URL larga de Google Maps.
export async function resolverEnlace(url) {
  if (!/goo\.gl/.test(url)) return url;
  try {
    let actual = url;
    for (let i = 0; i < 5; i++) {
      const r = await fetch(actual, { redirect: "manual" });
      const loc = r.headers.get("location");
      if (!loc) break;
      actual = new URL(loc, actual).toString();
      if (/google\.[a-z.]+\/maps/.test(actual)) return actual;
    }
    return actual;
  } catch {
    return url;
  }
}

export function datosNegocio(items) {
  const p = items[0] || {};
  return {
    nombre: p.title || "",
    categoria: p.categoryName || "",
    ciudad: p.city || "",
    nota: p.totalScore ?? "",
    total_resenas: p.reviewsCount ?? items.length,
  };
}

export function lineasResenas(items) {
  return items
    .filter((i) => i.text && i.text.trim())
    .slice(0, MAX_RESENAS)
    .map((i) => {
      const fecha = String(i.publishedAtDate || "").slice(0, 10);
      const texto = i.text.replace(/\s+/g, " ").trim().slice(0, 600);
      const resp = i.responseFromOwnerText ? i.responseFromOwnerText.replace(/\s+/g, " ").slice(0, 300) : "sin respuesta";
      return `${i.stars ?? "?"} | ${fecha} | ${texto} | ${resp}`;
    });
}

export function construirPrompt(paraQuien, negocio, lineas) {
  return `Eres el analista de clientes de Pioneros IA. Recibes las reseñas de Google Maps de un negocio y devuelves la ficha del cliente ideal: quién compra, qué resultado busca de verdad y qué le duele.

Principio: nadie compra herramientas, la gente compra resultados. Busca en las reseñas los resultados y las frustraciones, no las características del producto.

Reglas:
- Usa SOLO lo que dicen las reseñas. No inventes datos del negocio ni de los clientes.
- Cada afirmación importante va con 1 o 2 frases literales de reseñas como prueba (cortas, sin nombres de quien las escribió).
- Lenguaje sencillo, español neutro, sin jerga técnica. No uses guiones largos.
- Si hay menos de 10 reseñas con texto, dilo en "aviso" y sé prudente.
- Las respuestas del dueño cuentan como señal: si casi no responde, o responde tarde, es un hallazgo.

Para quién es la ficha: ${paraQuien === "nicho" ? "nicho (un negocio al que la persona quiere venderle sus servicios, o un competidor)" : "propio (es el negocio de la persona)"}
Negocio: ${negocio.nombre} · ${negocio.categoria} · ${negocio.ciudad} · nota media ${negocio.nota} con ${negocio.total_resenas} reseñas
Reseñas con texto: ${lineas.length}
Formato de cada línea: estrellas | fecha | texto | respuesta del dueño
${lineas.join("\n")}

Devuelve SOLO un JSON válido, sin texto antes ni después, con esta forma:
{
  "aviso": "",
  "quien_es": "2 o 3 frases: quién es el cliente típico según las reseñas",
  "lo_que_compra": [ { "resultado": "", "pruebas": ["", ""] } ],
  "lo_que_le_duele": [ { "dolor": "", "pruebas": ["", ""] } ],
  "sus_palabras": ["frases literales del cliente que sirven para el marketing"],
  "frase_oferta": "Ayudo a ___ a conseguir ___ sin ___ (si es 'propio': cómo debería presentarse este negocio; si es 'nicho': cómo le ofrecerías tu servicio a este negocio)",
  "oportunidad_ia": "1 o 2 frases: un problema de las reseñas que la IA puede resolver, contado como resultado para el negocio y no como herramienta"
}
"lo_que_compra" y "lo_que_le_duele" tienen 3 elementos, del más repetido al menos. "sus_palabras" tiene entre 5 y 8 frases.`;
}

export function leerJSON(texto) {
  const limpio = texto.replace(/^```(?:json)?/m, "").replace(/```\s*$/m, "").trim();
  const ini = limpio.indexOf("{");
  const fin = limpio.lastIndexOf("}");
  return JSON.parse(limpio.slice(ini, fin + 1));
}

export async function analizarConClaude(prompt) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || "claude-haiku-5-5",
      max_tokens: 32000,
      output_config: { effort: "medium" },
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!r.ok) throw new Error(`anthropic ${r.status} ${(await r.text()).slice(0, 200)}`);
  const data = await r.json();
  return data.content.map((c) => c.text || "").join("");
}
