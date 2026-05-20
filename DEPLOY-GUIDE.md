# INTERESTELAR v2.0.0 — Guia de Publicacion

## Opcion 1: Vercel (Recomendado) — Gratis + Dominio .vercel.app

### Paso 1: Crear cuenta
1. Ve a https://vercel.com
2. Registrate gratis con GitHub, GitLab o email
3. Confirmar email

### Paso 2: Subir proyecto
1. En el dashboard de Vercel, click **"Add New..." > "Project"**
2. Selecciona **"Import from a directory"** o usa Vercel CLI:
```bash
npm i -g vercel
vercel login
vercel --prod
```
3. O simplemente arrastra esta carpeta (INTERESTELAR-deploy/) al dashboard

### Paso 3: Configurar
- Framework: **Other** (o Vite)
- Build Command: (dejar vacio, ya esta buildado)
- Output Directory: `./` (raiz)

### Paso 4: Deploy
- Click **"Deploy"**
- En ~30 segundos tendras tu URL: `https://tu-proyecto.vercel.app`

---

## Opcion 2: Netlify — Gratis + Dominio .netlify.app

### Paso 1: Crear cuenta
1. Ve a https://www.netlify.com
2. Registrate gratis con GitHub o email

### Paso 2: Subir proyecto
1. En el dashboard, click **"Add new site" > "Deploy manually"**
2. Arrastra esta carpeta completa (INTERESTELAR-deploy/) a la zona de drop

### Paso 3: Listo
- Automaticamente te da un dominio: `https://tu-proyecto.netlify.app`
- Cada vez que subas una nueva version, se redeploya

---

## Acceso al Admin Panel

1. Ve a `https://tu-dominio.com/#/login`
2. Introduce las credenciales:
   - **Username:** `admin`
   - **Password:** `interestelar2024`

---

## Estructura de esta carpeta

```
INTERESTELAR-deploy/
  index.html          ← Punto de entrada
  vercel.json         ← Config para Vercel
  _redirects          ← Config para Netlify
  DEPLOY-GUIDE.md     ← Esta guia
  assets/
    hero-office.jpg
    command-center.jpg
    crisis-room.jpg
    financial-office.jpg
    office-gateway.jpg
    office-billing.jpg
    office-analytics.jpg
    office-security.jpg
    office-chaos.jpg
    office-workflow.jpg
    index-*.js         ← JavaScript bundle
    index-*.css        ← CSS bundle
```

## Notas

- Usa **HashRouter** (/#/) para SPA routing — funciona en cualquier hosting estatico
- Las imagenes ya estan optimizadas y empaquetadas
- No necesitas backend para la version estatica (todos los datos estan en el codigo)
- El admin panel esta protegido con autenticacion local (localStorage)
- 5 idiomas: ES, EN, ZH, HI, AR
