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
- [API Backend](#api-backend)
- [Equipo de Desarrollo](#equipo-de-desarrollo)

---

## Características

### Zona Pública
- **Landing page** con carrusel de imágenes, categorías populares y sección "Sobre nosotros".
- **Catálogo de juegos** con vista en cuadrícula, detalle con tráiler, capturas y reseñas.
- **Carrusel de más vendidos y más populares**.
- **Carrito de compras** con persistencia en `localStorage`.
- **Registro de usuarios** con validación de campos.
- **Login** con redirección según rol (usuario/admin).
- **Recuperación de contraseña** por correo con token.

### Panel de Administración
- **Dashboard de estadísticas**: total de usuarios y gráfico de ganancias mensuales (Chart.js).
- **Gestión de usuarios**: listado de todos los usuarios registrados.
- **CRUD de juegos**: crear, editar, eliminar (soft delete) y filtrar por categoría.
- **CRUD de noticias**: crear, editar y eliminar noticias con imágenes.

---

## Tecnologías

| Componente | Tecnología |
|---|---|
| Framework | React 19 |
| Lenguaje | TypeScript 5.8 |
| Bundler | Vite 6 |
| Estilos | Bootstrap 5 + React-Bootstrap |
| Enrutamiento | React Router DOM v7 |
| HTTP Client | Axios |
| Gráficos | Chart.js + react-chartjs-2 |
| Carrusel | react-slick + slick-carousel |
| Iconos | react-icons |
| Linter | ESLint + typescript-eslint |
| Deploy | GitHub Pages (gh-pages) |

---

## Requisitos Previos

- **Node.js 18+** y **npm 9+**
- Backend corriendo (local o remoto) — el repo del backend es independiente

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

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_BACKEND_URL=http://localhost:5020
```

Para producción, apuntar al backend desplegado:

```env
VITE_BACKEND_URL=https://tu-backend.onrender.com
```

---

## Ejecución

```bash
# Servidor de desarrollo (con HMR)
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

La aplicación estará disponible en `http://localhost:5173/Proyecto_PrograWeb/`.

---

## Despliegue

El proyecto está configurado para desplegarse en **GitHub Pages**:

```bash
npm run deploy
```

Esto ejecuta `npm run build` y publica la carpeta `dist/` en la rama `gh-pages`.

---

## Estructura del Proyecto

```
src/
├── main.tsx                          # Punto de entrada + definición de rutas
├── api/                              # Capa de comunicación con backend
│   ├── axios.ts                          Instancia Axios preconfigurada
│   └── usuarios.api.ts                   Funciones API (usuarios, ventas, noticias)
│
├── Reqs_Fabiana/                     # Módulos de Fabiana
│   ├── Req_01/                           Login
│   ├── Req_9/                            Catálogo de juegos + detalle
│   ├── Req_10_11/                        Carrito de compras
│   ├── Req_17/                           Admin: tabla de juegos (estática)
│   ├── Req_18/                           Admin: CRUD de juegos (funcional)
│   └── Req_Veremos/                      Layout público, header, landing page
│
├── Reqs_Diego/                       # Módulos de Diego
│   └── Req_2/                            Registro de usuarios
│
├── Reqs_Gerson/                      # Módulos de Gerson
│   ├── req7/                             Juegos más vendidos (carrusel)
│   ├── req8/                             Juegos más populares (carrusel)
│   └── req25/                            Componentes CRUD de noticias
│
├── Reqs_Patrick/                     # Módulos de Patrick
│   └── Req4/                             Recuperación de contraseña
│
├── Reqs_Johao/                       # Módulos de Johao
│   ├── Reqs_21_and_23/                   Admin: dashboard de estadísticas
│   ├── Req_22/                           Admin: gestión de usuarios
│   ├── Req_24/                           Admin: CRUD de noticias
│   ├── Shared_Components/                Barra lateral, perfil, título (admin)
│   └── Resources/                        Imágenes locales (avatares, noticias)
│
└── public/
    └── imagenes/                     # Portadas de juegos (PNG)
```

---

## Rutas de la Aplicación

### Públicas (con Header)

| Ruta | Descripción |
|---|---|
| `/` | Landing page principal |
| `/usuario` | Inicio de sesión |
| `/registro` | Registro de nuevo usuario |
| `/recuperar` | Solicitar recuperación de contraseña |
| `/reset-password/:token` | Restablecer contraseña con token |
| `/juegos/mas-vendidos` | Carrusel de juegos más vendidos |
| `/juegos/mas-populares` | Carrusel de juegos más populares |
| `/juegos/lista` | Catálogo completo de juegos |
| `/carrito` | Carrito de compras |
| `/noticias` | Sección de noticias |

### Panel de Administración

| Ruta | Descripción |
|---|---|
| `/reqs_21_and_23` | Dashboard con estadísticas y gráficos |
| `/req22` | Listado de usuarios registrados |
| `/req18` | CRUD de juegos |
| `/req24` | CRUD de noticias |

---

## Funcionalidades por Módulo

### Autenticación
- **Login** (`/usuario`): Valida credenciales contra el backend. Redirige a admin si el correo es `admin@gamestore.es`, al inicio en caso contrario. Almacena sesión en `localStorage`.
- **Registro** (`/registro`): Formulario con validación de correo, contraseña y campos obligatorios.
- **Recuperación** (`/recuperar`): Envía enlace de restablecimiento por correo. El usuario ingresa nueva contraseña usando un token temporal.

### Catálogo y Tienda
- **Lista de juegos** (`/juegos/lista`): Cuadrícula de juegos con vista de detalle (tráiler, capturas, reseñas, estrellas).
- **Más vendidos** (`/juegos/mas-vendidos`): Carrusel interactivo con datos del backend.
- **Más populares** (`/juegos/mas-populares`): Carrusel similar para juegos populares.
- **Carrito** (`/carrito`): Agregar/eliminar juegos, persistido en `localStorage`, con modal de confirmación.

### Panel Admin
- **Dashboard** (`/reqs_21_and_23`): Total de usuarios registrados + gráfico de barras de ganancias de los últimos 12 meses con Chart.js.
- **Usuarios** (`/req22`): Tabla con ID, avatar, nickname y nombre de todos los usuarios.
- **Juegos** (`/req18`): CRUD completo con filtro por categoría, modales para crear/editar, y soft delete.
- **Noticias** (`/req24`): CRUD completo con subida de imagen, modales de edición y confirmación de eliminación.

---

## API Backend

El frontend consume un backend REST desplegado de forma independiente. Principales endpoints utilizados:

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/users/login` | Iniciar sesión |
| `POST` | `/api/gerson/games/registro` | Registrar usuario |
| `POST` | `/api/patrick/games/recuperar` | Solicitar recuperación de contraseña |
| `POST` | `/api/patrick/games/reset-password/:token` | Restablecer contraseña |
| `GET` | `/api/johao/usuarios` | Listar usuarios |
| `GET` | `/api/johao/usuarios/count` | Contar usuarios |
| `GET` | `/api/johao/ventas/ganancias` | Ganancias mensuales |
| `GET/POST/PUT/DELETE` | `/api/johao/noticias` | CRUD de noticias |
| `GET/POST/PUT` | `/api/juegos` | CRUD de juegos |
| `GET` | `/api/juegos/categorias` | Listar categorías |
| `GET` | `/api/gerson/games/masvendidos` | Juegos más vendidos |

---

## Equipo de Desarrollo

| Integrante | Módulos |
|---|---|
| **Johao** | Dashboard de estadísticas, gestión de usuarios, CRUD de noticias, componentes compartidos admin |
| **Fabiana** | Login, catálogo de juegos, carrito de compras, CRUD de juegos (admin), landing page y layout |
| **Diego** | Registro de usuarios |
| **Gerson** | Carruseles de juegos (más vendidos/populares), componentes CRUD de noticias |
| **Patrick** | Recuperación y restablecimiento de contraseña |

---

## Licencia

Proyecto académico con fines educativos.
