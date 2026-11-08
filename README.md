# Lector de reseñas · Pioneros IA

Pegas el enlace de Google Maps de un negocio y la herramienta lee sus últimas 80 reseñas. Te devuelve **la ficha de su cliente ideal:**
- Quién es.
- Qué resultado compra de verdad.
- Qué le duele.
- Sus palabras.
- La oferta en una frase.
- Una oportunidad con IA.

Es tuya: corre en tu cuenta, con tus claves, y no depende de nadie.

## Lo que necesitas (unos 10 minutos)
1. **Una cuenta de GitHub**, gratis, en github.com.
2. **Una cuenta de Netlify**, gratis. Entra en netlify.com con tu cuenta de GitHub.
3. **Un token de Apify**, que es lo que lee las reseñas de Google Maps.
   - Crea una cuenta en apify.com. El plan gratis trae crédito cada mes.
   - Ve a Settings, luego API & Integrations, y copia tu token.
   - Cada lectura de 80 reseñas cuesta unos 2 o 3 centavos de dólar.
4. **Una clave de Anthropic**, que es la IA que escribe la ficha.
   - Entra en console.anthropic.com, ve a API Keys y crea una.
   - Hay que cargar saldo, desde 5 dólares. Cada ficha cuesta unos centavos.

## Ponerla en marcha
1. Pulsa el botón **Deploy to Netlify** que te pasé.
2. Conecta tu GitHub. Netlify crea tu copia del proyecto.
3. Cuando te pida las variables, pega:
   - `APIFY_TOKEN`: tu token de Apify.
   - `ANTHROPIC_API_KEY`: tu clave de Anthropic.
4. Pulsa **Save & Deploy**. En uno o dos minutos tienes tu enlace, por ejemplo `tu-lector.netlify.app`.
5. Ábrelo, pega un negocio de Google Maps y listo.

## Opcional
| Variable | Para qué |
|---|---|
| `ACCESS_CODE` | Si pones un código, la página lo pide antes de usarse. Así nadie te gasta tus créditos si compartes el enlace |
| `ANTHROPIC_MODEL` | Otro modelo de Anthropic. Por defecto usa `claude-sonnet-5-5` |
| `DEMO_MODE=1` | Muestra una ficha de ejemplo sin gastar nada, para ver el diseño |

Para cambiar una variable después: en Netlify, abre el sitio, ve a Site configuration y luego a Environment variables. Al terminar, ve a Deploys y pulsa Trigger deploy.

## Cómo usarla
- **Si tienes un negocio:** analiza el tuyo y el de 2 competidores. Lo que compran sus clientes es lo que tú tienes que vender.
- **Si vendes servicios de IA:** analiza un negocio de tu nicho antes de hablar con él. Llegas sabiendo qué le duele, contado con las palabras de sus propios clientes.

## Cuida tus claves
- Nunca pegues tus claves en el código ni las compartas.
- Van solo en las variables de entorno de Netlify.
- Si una clave se te escapa, bórrala en Apify o en Anthropic y crea otra.
