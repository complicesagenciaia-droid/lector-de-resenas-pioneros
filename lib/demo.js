// Datos de ejemplo para DEMO_MODE=1: la página funciona sin claves (para probar el diseño).
export const DEMO_NEGOCIO = {
  nombre: "Clínica Dental Ejemplo",
  categoria: "Dentista",
  ciudad: "Santo Domingo",
  nota: 4.3,
  total_resenas: 212,
};

export const DEMO_FICHA = {
  aviso: "Esto es una ficha de ejemplo (modo demo). Conecta tus claves para analizar negocios reales.",
  quien_es: "Familias y adultos que llegan con miedo o con dolor y valoran que los traten con calma. Muchos vienen recomendados por alguien de confianza.",
  lo_que_compra: [
    { resultado: "Perder el miedo al dentista", pruebas: ["me explicaron todo y no sentí nada", "por fin un dentista que no me da miedo"] },
    { resultado: "Que lo atiendan rápido cuando le duele", pruebas: ["me dieron cita el mismo día", "llegué con dolor y me atendieron enseguida"] },
    { resultado: "Saber cuánto va a pagar antes de empezar", pruebas: ["me dieron el presupuesto claro desde el principio"] },
  ],
  lo_que_le_duele: [
    { dolor: "No consigue que le contesten el teléfono ni el WhatsApp", pruebas: ["llamé tres veces y nadie respondió", "escribí por WhatsApp y me contestaron al día siguiente"] },
    { dolor: "Esperas largas en la sala", pruebas: ["tenía cita a las 4 y me pasaron a las 5"] },
    { dolor: "Cobros que no esperaba", pruebas: ["al final me cobraron más de lo que me dijeron"] },
  ],
  sus_palabras: ["me explicaron todo", "no sentí nada", "me atendieron el mismo día", "trato humano", "nadie contesta", "presupuesto claro"],
  frase_oferta: "Ayudo a clínicas dentales a no perder pacientes por no contestar a tiempo, sin contratar más recepcionistas.",
  oportunidad_ia: "Un asistente que responda al instante por WhatsApp y dé cita fuera de horario resolvería la queja más repetida: los pacientes que se van porque nadie les contesta.",
};
