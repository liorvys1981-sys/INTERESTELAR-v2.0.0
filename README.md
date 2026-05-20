# INTERESTELAR v2.0.0 — Autonomous Financial Governance

## Quick Start — Ejecutar en tu maquina local

### 1. Requisitos
- **Node.js 20+** — Descargar desde https://nodejs.org
- **npm** (viene con Node.js)

### 2. Instalacion
```bash
# Descomprimir el ZIP
cd INTERESTELAR-app

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo (hot reload)
npm run dev
```

La app estara disponible en **http://localhost:3000**

### 3. Build para produccion
```bash
npm run build
```

El build se genera en `dist/public/` — sube esa carpeta a cualquier hosting estatico gratis (Vercel, Netlify, GitHub Pages).

### 4. Credenciales Admin Panel

Ve a `http://localhost:3000/#/login`

| Usuario | Contrasena |
|---|---|
| `admin` | `interestelar2024` |

### 5. Estructura del proyecto
```
INTERESTELAR-app/
  src/
    pages/          ← 11 paginas (CommandCenter, Admin, Agents, etc.)
    components/     ← NavigationBar, StatusBadge, AgentLiveMonitor
    i18n/           ← 5 idiomas (ES, EN, ZH, HI, AR)
  api/              ← Backend tRPC + Hono
  db/               ← Schema + Seed (20 tablas)
  contracts/        ← Tipos compartidos
  public/assets/    ← 10 imagenes profesionales
  package.json      ← Dependencias
```

## Caracteristicas

- **12 Agentes Autonomos** — Operando 24/7 con monitoreo en vivo
- **5 Idiomas** — ES, EN, ZH, HI, AR (selector en la navegacion)
- **Admin Panel** — Dashboard, Agent Control, Tenants, Governance, Audit Logs
- **10 Paginas** — Command Center, Incidents, Stress Tests, Agents, Financial Defense, Infrastructure, Tenants, Governance, AI Offices, Survivability
- **Imagenes IA** — 10 fotos profesionales de oficinas con IA
- **Black Swan Cascade** — Simulacion de 10 fallas simultaneas

## Stack
React 19 + TypeScript + Vite + Tailwind CSS + tRPC + Drizzle ORM
