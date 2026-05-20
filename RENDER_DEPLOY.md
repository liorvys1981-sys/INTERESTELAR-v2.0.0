# Deploy en Render — INTERESTELAR v2.0.0
## LGG AUTO SUPPLIES LLC

### Opcion 1: Web Service (Recomendado)

#### Paso 1: Crear cuenta en Render
- Ve a https://render.com
- Registrate con tu email (lggautosupplies@gmail.com)
- Verifica tu cuenta

#### Paso 2: Subir codigo a GitHub
```bash
git init
git add .
git commit -m "INTERESTELAR v2.0.0 - Ready for Render"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/interestelar.git
git push -u origin main
```

#### Paso 3: Crear Web Service en Render
1. En Render, click **"New +"** → **"Web Service"**
2. Conecta tu repo de GitHub
3. Selecciona el repositorio `interestelar`

#### Paso 4: Configurar el servicio
| Campo | Valor |
|-------|-------|
| **Name** | `interestelar` |
| **Environment** | `Node` |
| **Region** | `Oregon (US West)` |
| **Branch** | `main` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `node dist/boot.js` |
| **Plan** | `Free` o `Starter ($7/mo)` |

#### Paso 5: Variables de Entorno (Environment Variables)
En Render → tu servicio → **Environment** → agrega cada variable:

| Variable | Valor / Descripcion |
|----------|---------------------|
| `NODE_ENV` | `production` |
| `PORT` | `3000` |
| `DATABASE_URL` | URL de MySQL (ver abajo) |
| `STRIPE_SECRET_KEY` | `sk_test_...` o `sk_live_...` |
| `STRIPE_PRICE_STARTER` | `price_...` de Stripe |
| `STRIPE_PRICE_GROWTH` | `price_...` de Stripe |
| `STRIPE_PRICE_PROFESSIONAL` | `price_...` de Stripe |
| `STRIPE_PRICE_ENTERPRISE` | `price_...` de Stripe |
| `VITE_APP_URL` | `https://interestelar.onrender.com` |
| `VITE_KIMI_AUTH_URL` | URL de auth de Kimi |
| `VITE_APP_ID` | Tu App ID |
| `KIMI_APP_SECRET` | Tu App Secret |
| `SESSION_SECRET` | Genera uno aleatorio largo |
| `OAUTH2_REDIRECT_URI` | `https://interestelar.onrender.com/api/oauth/callback` |

#### Paso 6: Database (MySQL)
Opcion A — MySQL en Render:
1. Render Dashboard → **New +** → **MySQL**
2. Name: `interestelar-db`
3. Plan: `Free` (1GB) o `Starter`
4. Copia la `DATABASE_URL` interna

Opcion B — PlanetScale (MySQL gratis):
1. Ve a https://planetscale.com
2. Crea database → conecta → copia la connection string
3. Pega en `DATABASE_URL` en Render

#### Paso 7: Deploy
1. Click **"Deploy"** en tu Web Service
2. Espera el build (~3-5 minutos)
3. Tu app estara en: `https://interestelar.onrender.com`

---

### Opcion 2: Docker (Mas Control)

En Render → **New +** → **Web Service** → **Deploy from Docker**:

| Campo | Valor |
|-------|-------|
| **Runtime** | `Docker` |
| **Dockerfile Path** | `./Dockerfile` |

El resto de variables de entorno son iguales.

---

### Configurar Stripe para Produccion

1. Crea cuenta en https://stripe.com
2. Stripe Dashboard → **Products** → Create 4 products:
   - Starter ($88/mo)
   - Growth ($499/mo)
   - Professional ($1,999/mo)
   - Enterprise ($4,599/mo)
3. Copia cada `price_xxx` ID a las variables de entorno en Render
4. Cambia `STRIPE_SECRET_KEY` a `sk_live_...` cuando estes listo para cobrar real

### Dominio Personalizado (opcional)

1. Compra dominio en Namecheap/GoDaddy (ej: `interestelar.ai`)
2. Render → tu servicio → **Settings** → **Custom Domains**
3. Agrega tu dominio y sigue las instrucciones de DNS

---

## Credenciales de Admin

| Campo | Valor |
|-------|-------|
| **URL** | `https://interestelar.onrender.com/login` |
| **Usuario** | `admin` |
| **Password** | `interestelar2024` |

---

## Costos en Render (Mensual)

| Servicio | Plan Free | Plan Starter |
|----------|-----------|--------------|
| Web Service | $0 (se apaga despues de inactividad) | $7/mo (siempre activo) |
| MySQL | $0 (1GB, 30 dias) | $7-15/mo |
| **Total** | **$0/mo** | **~$15-22/mo** |

> Recomendacion: Empieza con Free. Cuando tengas clientes, sube a Starter para que no se apague.

---

## Contacto

**LGG AUTO SUPPLIES LLC**
Email: lggautosupplies@gmail.com
