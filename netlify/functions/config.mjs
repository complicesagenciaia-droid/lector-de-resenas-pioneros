import { responder, demo, faltanClaves } from "../../lib/lector.js";

export default async () =>
  responder(200, {
    requiere_codigo: Boolean((process.env.ACCESS_CODE || "").trim()),
    demo: demo(),
    faltan_claves: faltanClaves(),
  });

export const config = { path: "/api/config" };
