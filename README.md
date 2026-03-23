# GameStore — Tienda de Videojuegos

Aplicación web frontend de una tienda de videojuegos desarrollada con React, TypeScript y Vite. Incluye catálogo de juegos, carrito de compras, autenticación de usuarios, panel de administración con estadísticas, y gestión de contenido.

> Proyecto académico — Curso de Programación Web, Universidad de Lima.

**Demo:** [https://johaoandree.github.io/Proyecto_PrograWeb/](https://johaoandree.github.io/Proyecto_PrograWeb/)

---

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Ejecución](#ejecución)
- [Despliegue](#despliegue)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Rutas de la Aplicación](#rutas-de-la-aplicación)
- [Funcionalidades por Módulo](#funcionalidades-por-módulo)
- [Capa de API y Caché](#capa-de-api-y-caché)
- [Testing](#testing)
- [API Backend](#api-backend)
- [Equipo de Desarrollo](#equipo-de-desarrollo)

---

## Características

### Zona Pública
- **Landing page** con carrusel de imágenes, categorías populares, noticias y sección "Sobre nosotros".
- **Catálogo de juegos** con cuadrícula dinámica, detalle con tráiler, capturas, reseñas y calificaciones por estrellas.
- **Carrusel de más vendidos y más populares** con modales de detalle interactivos.
- **Carrito de compras** con persistencia en `localStorage` y modal de confirmación.
- **Registro de usuarios** con validación de campos y subida de foto de perfil.
- **Login** con redirección según rol (usuario/admin). Almacena sesión en `localStorage`.
- **Recuperación de contraseña** por correo con token temporal.
- **Sección de noticias** con vista pública de noticias activas desde el backend.

### Panel de Administración
- **Dashboard de estadísticas**: total de usuarios, total de ventas y gráfico de ganancias mensuales (Chart.js).
- **Gestión de usuarios**: listado con ID, avatar, nickname y nombre.
- **CRUD de juegos**: crear, editar, eliminar (soft delete) y filtrar por categoría.
- **CRUD de noticias**: crear, editar y eliminar noticias con subida de imágenes.
- **Perfil de administrador** dinámico con Context API global.
- **Componentes compartidos**: barra lateral, lista de opciones, perfil admin y título reutilizable.

### Infraestructura
- **Sistema de caché inteligente**: Caché LRU en memoria + `localStorage` con TTL configurable, limpieza automática y retry con backoff para cold starts.
- **Skeleton loaders**: Componentes de carga animados (tabla y tarjeta) para UX fluida.
- **Context API**: Estado global del administrador con `AdminProvider`.
- **Tipado fuerte**: Interfaces TypeScript centralizadas (`types.ts`) y CSS Modules para estilos encapsulados.
- **Testing**: Vitest + React Testing Library con entorno jsdom.

---

## Tecnologías

| Componente | Tecnología |
|---|---|
| Framework | React 19 |
| Lenguaje | TypeScript 5.8 |
| Bundler | Vite 6 |
| Estilos | Bootstrap 5 + React-Bootstrap + CSS Modules |
| Enrutamiento | React Router DOM v7 |
| HTTP Client | Axios (con caché LRU y retry) |
| Gráficos | Chart.js 4 + react-chartjs-2 |
| Carrusel | react-slick + slick-carousel |
| Iconos | react-icons 5 |
| Email (cliente) | @emailjs/browser |
| Testing | Vitest 4 + React Testing Library + jsdom |
| Linter | ESLint 9 + typescript-eslint |
| Deploy | GitHub Pages (gh-pages) |
| Tipografía | Fira Code (self-hosted, woff2) |

---

## Requisitos Previos

- **Node.js 18+** y **npm 9+**
- Backend corriendo (local o remoto) — ver [Proyecto_PrograWeb_Backend](https://github.com/JohaoAndree/Proyecto_PrograWeb_Backend)

---

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/JohaoAndree/Proyecto_PrograWeb.git
cd Proyecto_PrograWeb

# Instalar dependencias
npm install
```

---

## Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto (ver `.env.example` como referencia):

```env
# URL del backend (sin slash final)
# Desarrollo local:
VITE_BACKEND_URL=http://localhost:5020
# Producción:
# VITE_BACKEND_URL=https://proyecto-prograweb-backend.onrender.com
```

| Variable | Descripción | Requerida |
|---|---|---|
| `VITE_BACKEND_URL` | URL base del backend API (sin `/` final) | **Sí** |

---

## Ejecución

```bash
# Servidor de desarrollo (con HMR)
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Ejecutar tests
npm test

# Lint del código
npm run lint
```

| Script | Comando | Descripción |
|---|---|---|
| `dev` | `vite` | Servidor de desarrollo con HMR |
| `build` | `tsc -b && vite build` | Compila TypeScript y genera bundle de producción |
| `preview` | `vite preview` | Preview local del build de producción |
| `lint` | `eslint .` | Análisis estático del código |
| `deploy` | `gh-pages -d dist` | Publica `dist/` en rama `gh-pages` |

La aplicación estará disponible en `http://localhost:5173/Proyecto_PrograWeb/`.

---

## Despliegue

El proyecto está configurado para desplegarse en **GitHub Pages**:

```bash
npm run deploy
```

Esto ejecuta `npm run build` (vía `predeploy`) y publica la carpeta `dist/` en la rama `gh-pages`. La ruta base está configurada en `vite.config.ts` como `/Proyecto_PrograWeb/`.

---

## Estructura del Proyecto

```
src/
├── main.tsx                          # Punto de entrada + definición de rutas
├── global.css                        # Estilos globales, design tokens, tipografía y animaciones
├── vite-env.d.ts                     # Tipos de Vite para import.meta.env
│
├── api/                              # Capa de comunicación con backend
│   ├── axios.ts                      # Instancia Axios con caché LRU, retry y auto-cleanup
│   ├── axios.test.ts                 # Tests del sistema de caché (Vitest)
│   └── usuarios.api.ts              # Funciones API (usuarios, ventas, noticias)
│
├── Context/
│   └── AdminContext.tsx              # Context API global para perfil de administrador
│
├── Shared/
│   └── Components/
│       ├── SkeletonView.tsx          # Componentes Skeleton (tabla y tarjeta) para loading states
│       └── Skeleton.module.css
│
├── Reqs_Fabiana/                     # Módulos de Fabiana
│   ├── Req_01/                       # Login
│   ├── Req_9/                        # Catálogo de juegos + detalle + test
│   ├── Req_10_11/                    # Carrito de compras
│   ├── Req_17/                       # Admin: tabla de juegos (estática)
│   ├── Req_18/                       # Admin: CRUD de juegos (funcional)
│   ├── Req_Veremos/                  # Layout público, header, footer, landing page, noticias
│   │   ├── Componentes/              # Header, Footer, LayoutConHeader, JuegosPopulares
│   │   ├── Paginas/                  # Noticias (página pública)
│   │   └── Imagenes_Carrusel/        # Imágenes del carrusel del landing
│   └── Resources/                    # Avatar placeholder
│
├── Reqs_Diego/                       # Módulos de Diego
│   └── Req_2/                        # Registro de usuarios
│
├── Reqs_Gerson/                      # Módulos de Gerson
│   ├── req7/                         # Juegos más vendidos (carrusel)
│   ├── req8/                         # Juegos más populares (carrusel)
│   └── req25/                        # Componentes CRUD de noticias (Agregar, Editar, Eliminar)
│
├── Reqs_Patrick/                     # Módulos de Patrick
│   └── Req4/                         # Recuperación de contraseña (solicitar + restablecer)
│
├── Reqs_Johao/                       # Módulos de Johao
│   ├── Reqs_21_and_23/               # Admin: dashboard de estadísticas
│   ├── Req_22/                       # Admin: gestión de usuarios
│   ├── Req_24/                       # Admin: CRUD de noticias
│   ├── Shared_Components/            # Barra lateral, lista de opciones, perfil admin, título
│   └── Resources/                    # Imágenes locales (avatares, noticias)

types.ts                              # Tipo global: Juego (compartido entre módulos)
vite.config.ts                        # Config de Vite + Vitest (jsdom)
documents/
└── audit/                            # Auditorías de limpieza de código
public/
├── fonts/
│   └── FiraCode-Light.woff2          # Tipografía self-hosted
└── imagenes/                         # Portadas de juegos (PNG)
```

---

## Rutas de la Aplicación

### Públicas (con Header y Footer)

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `PaginaPrincipal` | Landing page principal |
| `/usuario` | `Req1` | Inicio de sesión |
| `/registro` | `Req2` | Registro de nuevo usuario |
| `/recuperar` | `Req4` | Solicitar recuperación de contraseña |
| `/reset-password/:token` | `RestablecerClave` | Restablecer contraseña con token |
| `/juegos` | `Req7` | Juegos más vendidos (alias) |
| `/juegos/mas-vendidos` | `Req7` | Carrusel de juegos más vendidos |
| `/juegos/mas-populares` | `Req8` | Carrusel de juegos más populares |
| `/juegos/lista` | `Req9` | Catálogo completo de juegos |
| `/carrito` | `Req_10_11` | Carrito de compras |
| `/noticias` | `Noticias` | Sección de noticias |

### Panel de Administración (sin Header público)

| Ruta | Componente | Descripción |
|---|---|---|
| `/req1` | `Req1` | Login directo (sin layout) |
| `/req17` | `Req17` | Tabla de juegos (estática) |
| `/req18` | `Req18` | CRUD de juegos |
| `/reqs_21_and_23` | `Reqs_21_and_23` | Dashboard con estadísticas y gráficos |
| `/req22` | `Req22` | Listado de usuarios registrados |
| `/req24` | `Req24` | CRUD de noticias |

---

## Funcionalidades por Módulo

### Autenticación
- **Login** (`/usuario`): Valida credenciales contra el backend. Redirige a admin si el correo es `admin@gamestore.es`, al inicio en caso contrario. Almacena sesión en `localStorage`.
- **Registro** (`/registro`): Formulario con validación de correo, contraseña, foto de perfil y campos obligatorios. Envía email de bienvenida.
- **Recuperación** (`/recuperar`): Envía enlace de restablecimiento por correo. El usuario ingresa nueva contraseña usando un token temporal con expiración de 1 hora.

### Catálogo y Tienda
- **Lista de juegos** (`/juegos/lista`): Cuadrícula de juegos con vista de detalle (tráiler, capturas, reseñas, estrellas). Datos desde el backend con loading skeleton.
- **Más vendidos** (`/juegos/mas-vendidos`): Carrusel interactivo con datos del backend y modales de detalle.
- **Más populares** (`/juegos/mas-populares`): Carrusel similar para juegos populares.
- **Carrito** (`/carrito`): Agregar/eliminar juegos, persistido en `localStorage`, con modal de confirmación y detección de duplicados.

### Panel Admin
- **Dashboard** (`/reqs_21_and_23`): Total de usuarios, total de ventas y gráfico de barras de ganancias de los últimos 12 meses con Chart.js. Usa `AdminContext` para el perfil del admin.
- **Usuarios** (`/req22`): Tabla con ID, avatar, nickname y nombre de todos los usuarios.
- **Juegos** (`/req18`): CRUD completo con filtro por categoría, modales para crear/editar, y soft delete.
- **Noticias** (`/req24`): CRUD completo con subida de imagen, modales de edición y confirmación de eliminación.

### Infraestructura Compartida
- **AdminContext**: Context API que provee el nombre y foto del administrador a todas las vistas admin, con fetching automático al montar la app y abort en cleanup.
- **Skeleton Loaders** (`Shared/Components/SkeletonView`): Componentes `Skeleton`, `SkeletonTable` y `SkeletonCard` para estados de carga con animación pulse.
- **Componentes Admin** (`Shared_Components/`): `BarraLateral`, `ListaOpciones`, `PerfilAdmin` y `Titulo` reutilizables en todas las vistas del panel admin.

---

## Capa de API y Caché

El frontend utiliza una instancia de Axios preconfigurada (`api/axios.ts`) que incluye un sistema de caché avanzado:

### Características del sistema de caché

| Característica | Detalle |
|---|---|
| **Estrategia** | LRU (Least Recently Used), dual: memoria + `localStorage` |
| **TTL por defecto** | 60 segundos (configurable por request con `cacheTtl`) |
| **Límite de entradas** | 300 (configurable con `setCacheLimit()`) |
| **Limpieza automática** | Cada 60 segundos vía `startAutoCleanup()` |
| **Scope** | Solo peticiones GET sin headers de autenticación |
| **Retry** | Hasta 2 reintentos con backoff (3s, 6s) para errores de red y timeout |
| **Timeout** | 30 segundos máximo por request |

### Funciones exportadas

| Función | Descripción |
|---|---|
| `clearCache()` | Limpia toda la caché (memoria + localStorage) |
| `invalidateKey(url, params)` | Invalida una entrada específica de caché |
| `setDefaultCacheTtl(ms)` | Cambia el TTL por defecto |
| `setCacheLimit(n)` | Cambia el límite máximo de entradas |
| `startAutoCleanup(ms)` | Inicia la limpieza automática periódica |
| `stopAutoCleanup()` | Detiene la limpieza automática |

### Funciones de la API (`usuarios.api.ts`)

| Función | Endpoint | Descripción |
|---|---|---|
| `obtenerUsuarios()` | `GET /api/johao/usuarios` | Lista todos los usuarios |
| `contarUsuarios()` | `GET /api/johao/usuarios/count` | Retorna el total de usuarios |
| `obtenerGanancias()` | `GET /api/johao/ventas/ganancias` | Ganancias mensuales |
| `contarVentas()` | `GET /api/johao/ventas/count` | Retorna el total de ventas |
| `obtenerNoticias()` | `GET /api/johao/noticias` | Lista noticias activas |
| `agregarNoticia()` | `POST /api/johao/noticias` | Crea una noticia |
| `editarNoticia()` | `PUT /api/johao/noticias/:id` | Edita una noticia |
| `eliminarNoticia()` | `DELETE /api/johao/noticias/:id` | Elimina una noticia |

---

## Testing

El proyecto incluye tests unitarios y de integración utilizando **Vitest** como framework, **React Testing Library** para testing de componentes, y **jsdom** como entorno de simulación del DOM.

```bash
# Ejecutar todos los tests
npm test
```

La configuración de Vitest se encuentra en `vite.config.ts` con `globals: true` y `environment: 'jsdom'`.

### Tests implementados

| Archivo | Módulo | Cobertura |
|---|---|---|
| `api/axios.test.ts` | Sistema de caché | Requests sin caché, caché en segunda llamada, expiración TTL, exclusión de POST, retry en errores de red |
| `Reqs_Fabiana/Req_9/Req9.test.tsx` | Catálogo de juegos | Renderizado con estado de carga, integración con backend mock, verificación de llamadas API |

---

## API Backend

El frontend consume un backend REST desplegado de forma independiente. Principales endpoints utilizados:

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/users/login` | Iniciar sesión |
| `POST` | `/api/gerson/games/registro` | Registrar usuario con email de bienvenida |
| `POST` | `/api/patrick/games/recuperar` | Solicitar recuperación de contraseña |
| `POST` | `/api/patrick/games/reset-password/:token` | Restablecer contraseña |
| `GET` | `/api/johao/usuarios` | Listar usuarios |
| `GET` | `/api/johao/usuarios/count` | Contar usuarios |
| `GET` | `/api/johao/usuarios/admin` | Obtener perfil del administrador |
| `GET` | `/api/johao/ventas/ganancias` | Ganancias mensuales |
| `GET` | `/api/johao/ventas/count` | Contar total de ventas |
| `GET/POST/PUT/DELETE` | `/api/johao/noticias` | CRUD de noticias |
| `GET/POST/PUT/DELETE` | `/api/juegos` | CRUD de juegos |
| `GET` | `/api/juegos/categorias` | Listar categorías |
| `GET` | `/api/gerson/games/masvendidos` | Juegos más vendidos |
| `GET` | `/api/gerson/games/juegos-populares` | Juegos más populares |

> Para más detalle sobre los endpoints, consultar el [README del Backend](https://github.com/JohaoAndree/Proyecto_PrograWeb_Backend).

---

## Equipo de Desarrollo

| Integrante | Módulos |
|---|---|
| **Johao** | Dashboard de estadísticas (usuarios, ventas, gráficos), gestión de usuarios, CRUD de noticias, componentes compartidos admin, Context API, Skeleton loaders, sistema de caché, tests |
| **Fabiana** | Login, catálogo de juegos con detalle, carrito de compras, CRUD de juegos (admin), landing page, header, footer, layout público, noticias públicas, tests de catálogo |
| **Diego** | Registro de usuarios con validación |
| **Gerson** | Carruseles de juegos (más vendidos/populares), componentes CRUD de noticias (Agregar, Editar, Eliminar) |
| **Patrick** | Recuperación y restablecimiento de contraseña con token |

---

## Licencia

Proyecto académico con fines educativos.
