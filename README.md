# Lector de reseñas · regalo de la sesión 1 (8 nov 2026)

## Qué hace
- La persona pega el enlace de Google Maps de un negocio: el suyo, el de un competidor o uno de su nicho.
- La herramienta lee sus últimas 80 reseñas y devuelve **la ficha de su cliente ideal:**
  - Quién es.
  - Qué resultado compra de verdad, con frases literales.
  - Qué le duele.
  - Sus palabras.
  - La oferta en una frase.
  - Una oportunidad con IA.

**Por qué encaja con la mentoría:** las reseñas nunca hablan de herramientas, hablan de resultados. Ahí está la prueba de "nadie compra IA".

## Una sola aplicación, dos caras (decidido el 8 nov)
`app/` contiene la página (`public/index.html`) y 4 funciones pequeñas (`netlify/functions/`), sin dependencias. Se despliega gratis en **Netlify**, cuyas funciones aguantan hasta 60 segundos.

| | Tu versión, la de la demo | La de cada pionero, el regalo |
|---|---|---|
| Dónde | Tu Netlify | El Netlify de cada uno |
| Claves | Las tuyas, con `ACCESS_CODE` para que nadie gaste tus créditos | Las suyas |
| Cómo | Importas tu repositorio de GitHub | Un botón **Deploy to Netlify** copia tu repositorio a su cuenta y les pide sus 2 claves |

**Probado en local (8 nov), en modo demo:** el código de acceso, la validación del enlace, el flujo completo y un cuerpo inválido. Falta la prueba real con claves.

## Paso a paso: tu versión (unos 30 minutos)
**A. Apify (5 min)**
1. Crea una cuenta en apify.com.
2. Ve a Settings, luego API & Integrations, y copia el **API token**.

**B. Subir el código a GitHub (5 min, desde la web)**
1. En github.com pulsa **New repository**.
   - Nombre: `lector-de-resenas-pioneros`.
   - Público.
   - **Sin** README.
   - Pulsa Create.
2. En la página del repositorio vacío, entra en **uploading an existing file**.
3. Arrastra **todo lo que hay dentro de `app/`**: `public`, `netlify`, `lib`, `netlify.toml`, `package.json`, `README.md` y `.gitignore`.
   - Si el explorador no te muestra `.gitignore`, no pasa nada.
   - **Nunca subas un archivo `.env`.**
4. Pulsa **Commit changes**.

**C. Netlify (10 min)**
1. En app.netlify.com ve a **Add new site**, luego **Import an existing project**, luego **GitHub**, y elige `lector-de-resenas-pioneros`.
2. Deja la configuración como viene: la lee de `netlify.toml`.
3. En **Environment variables** añade:
   - `APIFY_TOKEN`
   - `ANTHROPIC_API_KEY`
   - `ACCESS_CODE`, por ejemplo `PIONERO8`
4. Pulsa **Deploy** y, en uno o dos minutos, tienes tu enlace `algo.netlify.app`.
5. Opcional: en Domain management añade `lector.pionerosia.io`.

**D. Probar (10 min)**
- Tu negocio o el de un cliente, con "Es mi negocio".
- Un negocio de tu ciudad, con "Le quiero vender".
- Un enlace corto del móvil (`maps.app.goo.gl`).
- Un código incorrecto, que no tiene que pasar.
- **Si algo falla:** en Netlify, abre Logs y luego Functions, y mándame lo que salga. Mientras tanto, `DEMO_MODE=1` saca una ficha de ejemplo.

## El regalo: el botón para los pioneros
Con tu repositorio público, este es el enlace. Cambia `TU-USUARIO`:
```text
https://app.netlify.com/start/deploy?repository=https://github.com/TU-USUARIO/lector-de-resenas-pioneros
```
Netlify les copia el repositorio a su GitHub y les pide `APIFY_TOKEN` y `ANTHROPIC_API_KEY`. Las preguntas salen de `netlify.toml`. **No** les pide `ACCESS_CODE`, así que tu código no viaja con la copia.

## Qué les entregas y cuándo
- **En vivo:** haces la demo con tu versión.
- **Al final:** les das el botón Deploy y la guía (`app/README.md`, que es lo que verán en GitHub). Solo a quienes están, como siempre.
- **(Opcional) Un PDF** con la guía y capturas paso a paso. Te lo preparo si quieres.

## Archivos
| Archivo | Para qué |
|---|---|
| `app/public/index.html` | La página |
| `app/netlify/functions/` | `config`, `start` (arranca Apify), `status` (lo sigue) y `analyze` (baja las reseñas y Claude escribe la ficha) |
| `app/lib/lector.js` | La lógica y el prompt de la ficha |
| `app/README.md` | La guía para los pioneros |
| `prompt-analisis.md` | El prompt de la ficha, por si quieres leerlo. El que se usa está dentro de `app/lib/lector.js` |
