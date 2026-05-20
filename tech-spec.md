# INTERESTELAR v2.0.0 — Especificación Técnica

## Dependencias

### Frontend

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| react | ^19.0.0 | Framework UI |
| react-dom | ^19.0.0 | Renderizado DOM |
| react-router | ^7.0.0 | Enrutamiento multi-página (/, /incidents, /financial-defense, /infrastructure, /tenants, /governance, /monetization, /survivability) |
| chart.js | ^4.4.0 | Gráficos financieros, burn-rate, reserve forecast, revenue projections |
| chartjs-adapter-date-fns | ^3.0.0 | Soporte time-series para Chart.js |
| gsap | ^3.12.0 | Animaciones de entrada con ScrollTrigger |
| @fontsource-variable/inter | ^5.0.0 | Fuente Inter (variable) |
| @fontsource/jetbrains-mono | ^5.0.0 | Fuente JetBrains Mono para datos monoespaciados |

### Backend

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| hono | ^4.7.0 | Servidor HTTP |
| @hono/node-server | ^1.13.0 | Adaptador Node.js para Hono |
| @trpc/server | ^11.0.0 | Router tRPC |
| @trpc/client | ^11.0.0 | Cliente tRPC |
| @tanstack/react-query | ^5.0.0 | Query management |
| superjson | ^2.2.0 | Serialización (Date, BigInt) |
| zod | ^3.24.0 | Validación schemas |
| jose | ^6.0.0 | JWT para sesiones OAuth |
| drizzle-orm | ^0.40.0 | ORM base de datos |
| mysql2 | ^3.12.0 | Driver MySQL |
| dotenv | ^16.0.0 | Variables de entorno |
| tsx | ^4.7.0 | Ejecutar TypeScript (seed, etc.) |

## Inventario de Componentes

### Layout (compartidos)

| Componente | Fuente | Reutilización |
|------------|--------|---------------|
| NavigationBar | Custom | Todas las páginas — barra horizontal sticky con wordmark, items de navegación, menú móvil |
| GlobalFooter | Custom | Todas las páginas — barra inferior con versión, estado del sistema |

### Componentes Reutilizables

| Componente | Fuente | Notas |
|------------|--------|-------|
| StatusBadge | Custom | Variantes: CRITICAL, WARNING, CAUTION, ACTIVE, RESOLVED, MONITORING — con colores, pulso CSS para CRITICAL |
| MetricCard | Custom | Label + valor grande + delta + sparkline mini-chart (Chart.js) |
| CrisisEventCard | Custom | Número, título, severidad, descripción, impacto, mitigación — usada en Command Center e Incidents |
| DataTable | Custom | Tabla con header monoespaciado, rows alternados, hover, badge de status |
| KillSwitchButton | Custom | Botón destructivo con glow pulso rojo — usado en Financial Defense |
| SectionDivider | Custom | Línea horizontal con label centrado |
| PageHeader | Custom | Breadcrumb + título + subtítulo + tabs de filtro (opcional) — usado en todas las páginas internas |

### Secciones por Página

**Command Center (`/`):**
- HeroStatusBar — barra de estado con countdown, 4 métricas pulso
- CrisisEventGrid — grid 2 cols de 10 CrisisEventCards
- AutonomousDecisionsPanel — tabla de decisiones con borde verde
- SystemHealthOverview — 4 MetricCards en grid

**Incident Timeline (`/incidents`):**
- IncidentTimeline — línea vertical central con nodos y cards alternados, dibujo progresivo con GSAP ScrollTrigger scrub

**Financial Defense (`/financial-defense`):**
- ReserveStatusPanel — donut chart (Chart.js) + 4 métricas
- BurnRateChart — área chart con 3 series y anotaciones
- LedgerIntegrityPanel — 2-column: status checks + audit table
- ReserveDepletionForecast — área chart 72h con danger zone

**Infrastructure (`/infrastructure`):**
- InfrastructureStatusGrid — 4 paneles con mini charts
- RecoveryMetricsTable — tabla de log de recuperación

**Tenants (`/tenants`):**
- TenantIsolationStatus — 2 tarjetas grandes de tenant
- TenantImpactChart — bar chart horizontal comparativo
- FairUseEnforcementLog — DataTable

**Governance (`/governance`):**
- GovernanceFirewallStatus — grid de 4 reglas con shield
- DecisionFramework — 2-column: diagrama CSS de flujo + tabla
- AuditTrail — DataTable con hashes SHA-256 truncados
- HumanEscalation — 2-column: queue status + recomendaciones

**Monetization (`/monetization`):**
- ServiceProfitabilityTable — tabla con 12 servicios
- PricingTiersGrid — 4 tarjetas de precios
- RevenueProjectionsChart — stacked bar chart 12 meses
- UsagePricingTable — tabla de precios por uso
- AgentMonetizationGrid — 2-column: direct + enabler agents

**Survivability (`/survivability`):**
- FinalScoreDisplay — score animado con contador 0→87
- ValidationResultsGrid — 10 items PASS/FAIL
- VulnerabilityTable — DataTable con severidad
- ArchitectureWeaknesses — 4 cards
- HardeningRecommendations — lista numerada con prioridad
- FinalVerdictPanel — panel destacado con borde verde

## Plan de Animaciones

| Animación | Librería | Enfoque | Complejidad |
|-----------|----------|---------|-------------|
| Section entrance (fade + translateY) | GSAP + ScrollTrigger | Triggered a 80% viewport, stagger 0.06s entre elementos | Low |
| Score count-up (0→87) | GSAP | tween numérico con easing sobre 2.5s en viewport entry | Low |
| Timeline line draw | GSAP + ScrollTrigger | scrub:true, scaleY 0→1 del elemento línea central conforme al scroll | Medium |
| Timeline node bounce | GSAP | scale 0→1.2→1 con ease-out-elastic en viewport entry | Low |
| Sparkline draw | Chart.js | animación de trazo left-to-right, 1.5s | Low |
| Countdown timer | React state | setInterval cada 1s, incrementando MM:SS | Low |
| Crisis pulse (dot) | CSS @keyframes | scale 1→1.3→1, 2s infinite ease-in-out | Low |
| Kill-switch glow | CSS @keyframes | box-shadow opacity 0.3↔0.6, 1.5s infinite | Low |
| Critical border pulse | CSS @keyframes | border-color/glow opacity oscillación 3s (CRITICAL) / 5s (WARNING) | Low |
| Nav hover transitions | CSS | color transition 0.2s ease | Low |
| Card hover lift | CSS | translateY(-2px) + bg/border transition 0.3s | Low |
| Hash copy tooltip | React state | tooltip "COPIED" visible 2s tras click | Low |

**No se usa WebGL.** Todas las visualizaciones son Chart.js (2D canvas). El hero del Command Center usa una imagen de fondo estática con baja opacidad.

## Estado y Lógica

### Backend — Tablas de Base de Datos (Drizzle ORM + MySQL)

Tablas requeridas para almacenar los datos del stress test, monetización y gobernanza:

1. **crisis_events** — Los 10 eventos de la crisis (id, number, name, description, severity, impact_value, impact_unit, mitigation_action, mitigation_timestamp, status, detection_timestamp)
2. **autonomous_decisions** — Log de decisiones autónomas (id, timestamp, decision, target, impact_description, status, severity)
3. **infrastructure_metrics** — Métricas de infraestructura (id, component, metric_name, current_value, baseline_value, peak_value, unit, status, updated_at)
4. **tenants** — Información de tenants (id, tenant_id, company_name, tier, api_calls_hourly, api_limit, tokens_hourly, token_limit, cost_hourly, cost_allocation, abuse_level, status, isolated_at)
5. **tenant_enforcement_log** — Log de acciones de aislamiento (id, timestamp, tenant_id, violation, action_taken, result)
6. **financial_metrics** — Métricas financieras (id, metric_name, current_value, baseline_value, delta, unit, updated_at)
7. **reserve_forecast** — Proyección de reservas (id, hour, uncontrolled_value, mitigated_value, critical_threshold)
8. **burn_rate_data** — Datos de burn rate para gráfico (id, minute, projected_burn, actual_burn, baseline_burn)
9. **audit_log** — Registro de auditoría inmutable (id, timestamp, event_type, actor, action_hash, verification_status)
10. **governance_rules** — Reglas del firewall de gobernanza (id, rule_name, rule_value, status, prevented_incident)
11. **recovery_log** — Log de recuperación de infraestructura (id, timestamp, component, action, value_before, value_after, status)
12. **services** — Catálogo de servicios (id, rank, service_name, profitability, complexity, infra_cost, scalability, enterprise_value, launch_priority)
13. **pricing_tiers** — Niveles de precios (id, tier_name, monthly_price, yearly_price, target_segment, features_json, gross_margin, infra_cost, support_cost)
14. **usage_pricing** — Precios por uso (id, service_name, unit, starter_price, growth_price, pro_price, enterprise_price, our_cost, margin)
15. **revenue_projections** — Proyecciones de ingresos (id, month, starter_mrr, growth_mrr, pro_mrr, enterprise_mrr, total_mrr)
16. **agents** — Agentes del sistema (id, agent_name, agent_type, description, capabilities_json, revenue_impact, cost)
17. **vulnerabilities** — Vulnerabilidades detectadas (id, severity, vulnerability, impact_description, mitigation_status)
18. **hardening_recommendations** — Recomendaciones de fortalecimiento (id, priority, recommendation, description)
19. **infrastructure_status** — Estado actual de infraestructura (id, component, current_metric, baseline, unit, status, details_json)
20. **validation_results** — Resultados de validación (id, validation_name, result, description)

### Backend — API tRPC (Routers)

1. **crisisRouter** — query: getAllEvents, getEventById; input opcional: severity filter
2. **decisionsRouter** — query: getAllDecisions, getDecisionsBySeverity
3. **infrastructureRouter** — query: getAllMetrics, getRecoveryLog, getStatusByComponent
4. **tenantRouter** — query: getAllTenants, getTenantById, getEnforcementLog; input: tenant_id filter
5. **financialRouter** — query: getAllMetrics, getReserveForecast, getBurnRateData
6. **auditRouter** — query: getAllAuditLogs; las queries incluyen hashes SHA-256 pre-computados
7. **governanceRouter** — query: getFirewallRules, getDecisionLog, getHumanEscalationStatus
8. **monetizationRouter** — query: getAllServices, getPricingTiers, getUsagePricing, getRevenueProjections, getAllAgents
9. **survivabilityRouter** — query: getFinalScore, getValidationResults, getVulnerabilities, getWeaknesses, getHardeningRecommendations

Todas las queries usan `publicQuery` — no requieren autenticación.

### Frontend — Flujo de Datos

1. **Carga inicial:** Los datos del stress test se insertan vía seed script (db/seed.ts). Este script ejecuta una sola vez para poblar las 20 tablas con los datos pre-definidos del diseño.
2. **Polling simulado:** El Command Center usa `refetchInterval: 5000` en las queries de tRPC para simular actualización en tiempo real. Los datos no cambian realmente (son estáticos pre-seed), pero el timestamp de "Last updated" se computa en el cliente.
3. **Countdown timer:** Lógica puramente en React con `useEffect` + `setInterval` — no requiere backend.
4. **Hash copy:** Estado local en el componente de Audit Trail para mostrar tooltip "COPIED" — no requiere backend.
5. **No hay WebSocket ni Server-Sent Events.** Todo es HTTP request-response con polling opcional.

### Seed Script

El archivo `db/seed.ts` debe insertar todos los datos estáticos del diseño: 10 crisis events, 8+ decisions, 4 infrastructure metrics, 2 tenants con enforcement logs, financial metrics, 72 puntos de reserve forecast, 45 puntos de burn rate, 10+ audit logs, 4 governance rules, 8 recovery logs, 12 services, 4 pricing tiers, 6 usage pricing rows, 12 months revenue projection, 6 agents, 10 validations, 6 vulnerabilities, 4 weaknesses, 8 hardening recommendations.

## Otras Decisiones Clave

### Routing

React Router v7 con `BrowserRouter` en `main.tsx` (ya provisto por la plantilla). El `App.tsx` define las 8 rutas con `<Routes>` y `<Route>`. Cada ruta carga su página como componente lazy para code-splitting.

### Chart.js Configuración Global

En `main.tsx` o un módulo de inicialización, configurar Chart.js con los colores del design system (no los defaults). Todos los gráficos usan `borderColor` y `backgroundColor` de los tokens definidos. Los sparklines son instancias de Chart.js con ejes ocultos y altura fija de 60px.

### Estructura de Directorios

```
src/
  pages/           — 8 páginas (una por ruta)
  sections/        — Secciones reutilizables (PageHeader, etc.)
  components/      — Componentes compartidos (StatusBadge, MetricCard, CrisisEventCard, DataTable, KillSwitchButton, SectionDivider)
  hooks/           — useCountdown, useInterval, useCopyToClipboard
  lib/             — chart-config.ts (colores globales Chart.js)
```

### Performance

- Las imágenes generadas se colocan en `public/assets/` y se referencian por ruta estática.
- Chart.js instancias se destruyen en cleanup de useEffect para evitar memory leaks.
- GSAP ScrollTrigger instances se matan en cleanup.
- Las páginas se cargan vía `React.lazy()` + `Suspense` con un fallback simple (spinner o texto "Loading...").
