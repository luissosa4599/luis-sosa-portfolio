# Dominio propio para el portafolio

> **Estado (2026-11-18): no está proyectado por ahora.** El sitio usa
> `https://luis-sosa-portfolio.vercel.app` (constante `SITE_URL` en `lib/site.ts`). Esta nota
> solo registra cuánto costaría y qué habría que hacer si algún día se decide.

## Disponibilidad

Consultada en el RDAP oficial de cada registro el 2026-11-18:

| Dominio | Estado |
|---|---|
| `luissosa.dev` | Libre |
| `luis-sosa.dev` | Libre |
| `luissosa.com` | Ya tiene dueño |

El código usaba `luissosa.dev` como base (canonical, imagen OG, sitemap) sin que estuviera
registrado. Por eso las vistas previas al compartir el link salían sin imagen. Se corrigió
usando la URL de Vercel.

## Costo

Precios en USD, sin impuestos. Cambian seguido: confirmar al comprar.

| Registrador | Primer año | Renovación anual | 5 años | Nota |
|---|---|---|---|---|
| Cloudflare Registrar | 8.20 | 12.20 | 57.00 | Precio de costo. Obliga a usar los DNS de Cloudflare |
| Porkbun | 8.75 | 12.87 | 60.23 | Privacidad WHOIS incluida |
| Namecheap | 11.18 | 21.18 | 95.90 | El más caro de los tres (no verificado en su sitio) |
| Promos de primer año (Sav, Spaceship, Atom…) | 4.99–6.44 | Varía | — | Revisar la renovación antes de elegir: suele subir mucho |
| Vercel | Gratis el 1er año **solo con plan Pro** (USD 20/mes) | Precio normal | — | No conviene solo por el dominio |

- **Hosting:** el plan Hobby de Vercel es gratis para proyectos personales no comerciales.
  Conectar un dominio propio y el certificado HTTPS no cuestan nada extra en Hobby.
- **Costo real estimado: ~USD 12–13 por año** (el dominio), con Cloudflare o Porkbun.
- `.dev` obliga a HTTPS (HSTS precargado para todo el TLD). Vercel emite el certificado solo,
  así que no es un problema; solo significa que el sitio nunca puede servirse por HTTP.

## Pasos si se decide

1. Comprar `luissosa.dev` en Cloudflare o Porkbun (con privacidad WHOIS).
2. Vercel → proyecto → *Settings → Domains* → agregar `luissosa.dev` y marcarlo como
   principal. Así Vercel redirige `luis-sosa-portfolio.vercel.app` al dominio nuevo.
3. Crear en el registrador los registros DNS que indique Vercel. Si es Cloudflare, en modo
   *DNS only* (nube gris), sin proxy.
4. Cambiar `SITE_URL` en `lib/site.ts`, hacer deploy y verificar:
   - `canonical`, `og:url` y `og:image` en el HTML.
   - `/robots.txt` y `/sitemap.xml`.
5. Pedir que se vuelva a leer el link en el
   [Sharing Debugger de Meta](https://developers.facebook.com/tools/debug/) (WhatsApp y
   Facebook guardan la vista previa vieja) y actualizar el link en CV, LinkedIn y GitHub.

## Fuentes

- [Porkbun: costo de .dev a 5 años (compara Cloudflare, Porkbun y Namecheap)](https://porkbun.com/about/domain-cost-calculator/dev.txt)
- [DomainOffer: precios de .dev en 95+ registradores](https://domainoffer.net/tld/dev)
- [Vercel: dominio gratis con Pro](https://vercel.com/docs/domains/free-domain-with-pro) · [Vercel: planes](https://vercel.com/docs/plans)
- Disponibilidad: RDAP de Google Registry (`.dev`) y Verisign (`.com`)
