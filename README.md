# INTERESTELAR v2.0.0 — Autonomous Financial Governance Platform

## Descripción

INTERESTELAR v2.0.0 es una plataforma de gobernanza financiera autónoma de grado empresarial. Detecta, sobrevive y mitiga autónomamente escenarios de colapso financiero catastrófico mientras preserva la continuidad de la plataforma, la rentabilidad y la supervivencia operativa.

## Características Principales

- **10 Eventos de Crisis Simultáneos** — Black Swan Cascade stress test
- **12 Agentes Autónomos** — Cada uno con rol específico (CORE, FINANCIAL, SECURITY, INFRA)
- **3 Suites de Stress Tests** — Chaos War, Black Swan Financial, Governance Attack
- **Panel de Admin Completo** — Dashboard, Agent Control, Tenants, Governance, Audit Logs, Settings
- **5 Idiomas** — Español, English, 中文, हिन्दी, العربية
- **Diseño Profesional Luminoso** — Tema claro con oficinas de IA visuales

## Estructura del Proyecto

```
├── src/
│   ├── pages/           # 11 páginas (CommandCenter, Incidents, StressTests, Agents, FinancialDefense, Infrastructure, Tenants, Governance, Monetization, Survivability, Admin)
│   ├── components/      # Componentes compartidos (NavigationBar, StatusBadge, PageHeader, GlobalFooter)
│   ├── hooks/           # Custom hooks
│   ├── i18n/            # 5 archivos de traducción (es, en, zh, hi, ar)
│   ├── lib/             # Utilidades
│   ├── index.css        # Estilos globales
│   ├── App.tsx          # Router principal
│   └── main.tsx         # Entry point
├── api/                 # Backend tRPC + Hono
│   ├── routers/         # 9 routers (crisis, decisions, infrastructure, tenant, financial, audit, governance, monetization, survivability)
│   ├── middleware.ts    # Procedimientos tRPC
│   ├── router.ts        # App router
│   └── boot.ts          # Hono server
├── db/
│   ├── schema.ts        # 20 tablas Drizzle ORM
│   └── seed.ts          # Script de seed con datos completos
├── contracts/           # Tipos compartidos frontend/backend
├── public/assets/       # 10 imágenes profesionales generadas con IA
└── package.json         # Dependencias
```

## Requisitos

- Node.js 20+
- MySQL (para backend con DB)
- npm o pnpm

## Instalación Rápida

```bash
# 1. Clonar/Descomprimir el proyecto
cd interestelar-v2

# 2. Instalar dependencias
npm install

# 3. Configurar base de datos (opcional para frontend-only)
# Editar .env con tu DATABASE_URL

# 4. Seed la base de datos
npm run db:push
npx tsx db/seed.ts

# 5. Desarrollo
npm run dev

# 6. Build para producción
npm run build
```

## Deploy en Vercel/Netlify (Frontend Estático)

```bash
npm run build
# Desplegar la carpeta dist/public/
```

## Deploy Full-Stack (Con Backend)

El backend usa Hono + tRPC + Drizzle ORM + MySQL.

```bash
# Producción
npm run build
npm start
```

## Credenciales Admin Panel

| Campo | Valor |
|---|---|
| Username | `admin` |
| Password | `interestelar2024` |

## Rutas de la Aplicación

| Ruta | Descripción |
|---|---|
| `/` | Command Center — Dashboard de crisis en tiempo real |
| `/#/incidents` | Incident Timeline — 10 eventos con timeline |
| `/#/stress-tests` | 3 Suites de Stress Tests |
| `/#/agents` | Roster de 12 Agentes Autónomos |
| `/#/financial-defense` | Defensa Financiera |
| `/#/infrastructure` | Recuperación de Infraestructura |
| `/#/tenants` | Gestión de Tenants |
| `/#/governance` | Gobernanza y Auditoría |
| `/#/monetization` | Oficinas de IA — 12 departamentos |
| `/#/survivability` | Reporte de Supervivencia |
| `/#/admin` | Panel de Administración (protegido) |
| `/#/login` | Login para Admin |

## Stack Tecnológico

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **Backend**: Hono + tRPC 11 + Drizzle ORM
- **Base de Datos**: MySQL
- **Autenticación**: Kimi OAuth 2.0 (opcional)
- **i18n**: react-i18next (5 idiomas)
- **Animaciones**: GSAP + ScrollTrigger
- **Charts**: Chart.js

## Licencia

Proprietary — INTERESTELAR Financial Governance Systems
