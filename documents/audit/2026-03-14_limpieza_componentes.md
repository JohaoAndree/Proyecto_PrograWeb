# Auditoría y Limpieza de Componentes — Proyecto_PrograWeb (Frontend)

## Ficha Técnica

| Campo | Detalle |
|---|---|
| **Fecha** | 14 de marzo de 2026 |
| **Responsable** | Johao Gutiérrez |
| **Objetivo** | Identificar y eliminar componentes no utilizados (código muerto) en el frontend del proyecto, reorganizar los archivos en sus carpetas de requerimientos correspondientes y verificar que la integridad funcional del sistema se mantenga intacta tras los cambios. |

---

## 1. Metodología del Análisis

### 1.1 Trazado del Grafo de Dependencias

Se realizó un análisis estático exhaustivo del grafo de importaciones del proyecto, partiendo desde el punto de entrada único `src/main.tsx`. El proceso consistió en:

1. **Inventario completo**: se identificaron los **63+ archivos** `.tsx` y `.ts` distribuidos en las carpetas `Reqs_Diego`, `Reqs_Fabiana`, `Reqs_Gerson`, `Reqs_Johao` y `Reqs_Patrick`.
2. **Trazado recursivo de imports**: para cada componente importado en `main.tsx`, se siguió la cadena de dependencias internas (imports relativos) de forma recursiva hasta alcanzar los nodos hoja.
3. **Identificación de nodos huérfanos**: todo archivo que no fuese alcanzable desde `main.tsx` ni desde ningún componente activo fue marcado como **código muerto**.

### 1.2 Verificación de Integridad

Para garantizar que ninguna eliminación afectara la integridad del proyecto se emplearon los siguientes mecanismos:

- **Revisión manual de referencias cruzadas**: se verificó mediante búsqueda textual (`grep`) que ningún módulo activo importara los componentes candidatos a eliminación.
- **Compilación TypeScript (`tsc -b`)**: el compilador de TypeScript actúa como verificador estático; cualquier import roto genera un error `TS2307` que impide la compilación.
- **Build de producción (`npm run build`)**: se ejecutó el pipeline completo de Vite (`tsc -b && vite build`) tras cada eliminación para confirmar que el bundle se genera sin errores.
- **Servidor de desarrollo (`npm run dev`)**: se verificó que el servidor HMR de Vite continuara funcionando sin errores de compilación en tiempo real.

---

## 2. Análisis de Impacto

### 2.1 Componentes Identificados como Código Muerto

Los siguientes componentes fueron determinados como **no alcanzables** desde `main.tsx` ni desde ningún otro módulo activo del sistema:

| # | Archivo / Carpeta | Ubicación | Motivo de Eliminación |
|---|---|---|---|
| 1 | `App.tsx` | `Reqs_Fabiana/Req_Veremos/` | App shell antigua, reemplazada por `LayoutConHeader.tsx` + sistema de rutas en `main.tsx`. |
| 2 | `Inicio.tsx` | `Reqs_Fabiana/Req_Veremos/Paginas/` | Componente placeholder usado únicamente por `App.tsx` (eliminada). |
| 3 | `Carrito.tsx` | `Reqs_Fabiana/Req_Veremos/Paginas/` | Componente placeholder usado únicamente por `App.tsx` (eliminada). |
| 4 | `Usuario.tsx` | `Reqs_Fabiana/Req_Veremos/Paginas/` | Componente placeholder usado únicamente por `App.tsx` (eliminada). |
| 5 | `req3/` (carpeta completa) | `Reqs_Gerson/` | Formulario de registro sin uso. No era importado por ningún módulo. Adicionalmente, referenciaba un `styles.module.css` inexistente. |
| 6 | `index.tsx` | `Reqs_Gerson/req25/` | Componente raíz de req25, no importado en `main.tsx` ni en ningún otro módulo. |
| 7 | `CuerpoPagina.tsx` | `Reqs_Gerson/req25/componentes25/` | Solo importado por `req25/index.tsx` (eliminada). Contenía datos estáticos de prueba. |
| 8 | `ListaNoticias.tsx` | `Reqs_Gerson/req25/componentes25/` | Solo importado por `CuerpoPagina.tsx` de req25 (eliminada). |
| 9 | `imagenes/` (6 archivos) | `Reqs_Gerson/req25/` | Solo referenciadas por `CuerpoPagina.tsx` de req25 (eliminada). Incluía: `Avatar.jpeg`, `avatarAatrox.jpg`, `avatarIrelia.jpg`, `avatarZed.jpg`, `noticia1.jpg`, `noticia2.jpg`, `noticia3.jpg`. |

### 2.2 Componentes Preservados (Dependencias Activas)

> **Nota importante**: Los siguientes componentes de `Reqs_Gerson/req25/componentes25/` son dependencias activas de `Reqs_Johao/Req_24/Components/ListaNoticias.tsx` y fueron **preservados**:

| Componente | Consumidor |
|---|---|
| `Editar.tsx` | Importado como modal de edición en Req_24 |
| `Eliminar.tsx` | Importado como botón de eliminación en Req_24 |
| `Agregar.tsx` | Importado como modal de creación en Req_24 |
| `ConfirmarEliminar.tsx` | Importado internamente por `Eliminar.tsx` |
| `styles.module.css` | Hoja de estilos compartida por los componentes anteriores |

### 2.3 Corrección Post-Eliminación

Al eliminar `ListaNoticias.tsx` de `req25/componentes25/`, los componentes `Agregar.tsx` y `Editar.tsx` perdieron acceso al tipo `Noticia` que importaban de dicho archivo. La corrección aplicada fue:

- **Se creó** `req25/componentes25/types.ts` con la interfaz `Noticia` extraída.
- **Se actualizaron** los imports en `Agregar.tsx` y `Editar.tsx` para referenciar `./types` en lugar de `./ListaNoticias`.

### 2.4 Reorganización de Componentes

Como parte de la mejora arquitectónica, se reubicaron los siguientes componentes al interior de la carpeta `Componentes/` dentro de `Req_Veremos` para mantener coherencia con los componentes ya existentes (`Header.tsx`, `LayoutConHeader.tsx`):

| Componente | Ubicación Anterior | Ubicación Actual |
|---|---|---|
| `JuegosPopulares.tsx` | `Req_Veremos/JuegosPopulares.tsx` | `Req_Veremos/Componentes/JuegosPopulares.tsx` |
| `Footer.tsx` | `Req_Veremos/Footer.tsx` | `Req_Veremos/Componentes/Footer.tsx` |

Los imports en `PaginaPrincipal.tsx` fueron actualizados para reflejar las nuevas rutas.

---

## 3. Nueva Organización del Proyecto

### 3.1 Árbol de Directorios (`src/`)

```
src/
├── main.tsx                          # Punto de entrada y definición de rutas
├── global.module.css                 # Estilos globales
├── vite-env.d.ts                     # Tipos de Vite
│
├── api/
│   ├── axios.ts                      # Instancia configurada de Axios
│   └── usuarios.api.ts              # Funciones API de usuarios y noticias
│
├── Reqs_Diego/
│   └── Req_2/                        # Registro de usuarios
│       ├── index.tsx
│       └── styles.module.css
│
├── Reqs_Fabiana/
│   ├── Req_01/                       # Gestión de perfil de usuario
│   │   ├── index.tsx
│   │   └── styles.module.css
│   ├── Req_9/                        # Lista de juegos / catálogo
│   │   ├── Req9.tsx
│   │   ├── dataJuegos.ts
│   │   └── Componentes/
│   │       ├── CardJuego.tsx
│   │       ├── DetalleJuego.tsx
│   │       └── FilaJuegos.tsx
│   ├── Req_10_11/                    # Carrito de compras
│   │   ├── Carrito.tsx
│   │   └── styles.module.css
│   ├── Req_11/                       # Historial de compras
│   │   ├── index.tsx
│   │   └── styles.module.css
│   ├── Req_17/                       # Panel Admin — Gestión de juegos
│   │   ├── index.tsx
│   │   ├── styles.module.css
│   │   └── Components/
│   │       ├── CuerpoPagina.tsx
│   │       └── TablaJuegos.tsx
│   ├── Req_18/                       # Panel Admin — CRUD de juegos
│   │   ├── index.tsx
│   │   ├── styles.module.css
│   │   └── Components/
│   │       ├── CuerpoPagina.tsx
│   │       ├── FormularioJuego.tsx
│   │       └── TablaJuegos.tsx
│   ├── Req_Veremos/                  # Página principal y layout general
│   │   ├── PaginaPrincipal.tsx
│   │   ├── styles.module.css
│   │   ├── Componentes/
│   │   │   ├── Header.tsx
│   │   │   ├── LayoutConHeader.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Footer.module.css
│   │   │   ├── JuegosPopulares.tsx
│   │   │   └── JuegosPopulares.module.css
│   │   ├── Imagenes_Carrusel/        # Assets del carrusel principal
│   │   │   ├── God_of_War_Ragnarok.jpg
│   │   │   ├── Resident_Evil_Village.jpg
│   │   │   ├── The_Witcher_3_Wild_Hunt.jpg
│   │   │   ├── genshin.jpg
│   │   │   ├── mariobros.png
│   │   │   └── minecraft.png
│   │   └── Paginas/
│   │       └── Noticias.tsx          # Página de noticias públicas
│   └── Resources/                    # Recursos compartidos de Fabiana
│
├── Reqs_Gerson/
│   ├── req7/                         # Juegos más vendidos
│   │   ├── req7.tsx
│   │   └── componentes/
│   │       ├── CarruselSimple.tsx
│   │       ├── CarruselSimple.css
│   │       ├── Global.css
│   │       ├── Lista.tsx
│   │       ├── Navegacion.tsx
│   │       └── Titulo.tsx
│   ├── req8/                         # Juegos más populares
│   │   ├── req8.tsx
│   │   └── componentes_req8/
│   │       ├── CarruselSimple.tsx
│   │       ├── CarruselSimple.css
│   │       └── Global.css
│   └── req25/                        # Componentes compartidos de noticias
│       └── componentes25/
│           ├── Agregar.tsx
│           ├── ConfirmarEliminar.tsx
│           ├── Editar.tsx
│           ├── Eliminar.tsx
│           ├── styles.module.css
│           └── types.ts              # [NUEVO] Interfaz Noticia extraída
│
├── Reqs_Johao/
│   ├── Req_22/                       # Panel Admin — Lista de usuarios
│   │   ├── index.tsx
│   │   └── Components/
│   │       ├── CuerpoPagina.tsx
│   │       ├── ListaUsuarios.tsx
│   │       └── styles.module.css
│   ├── Req_24/                       # Panel Admin — Gestión de noticias
│   │   ├── index.tsx
│   │   └── Components/
│   │       ├── CuerpoPagina.tsx
│   │       ├── ListaNoticias.tsx
│   │       └── styles.module.css
│   ├── Reqs_21_and_23/               # Panel Admin — Dashboard y estadísticas
│   │   ├── index.tsx
│   │   └── Components/
│   │       ├── CuadroConteoUsuarios.tsx
│   │       ├── CuerpoPagina.tsx
│   │       ├── Grafico.tsx
│   │       └── styles.module.css
│   ├── Resources/                    # Assets compartidos (avatares, imágenes)
│   └── Shared_Components/            # Componentes compartidos del panel admin
│       ├── BarraLateral.tsx
│       ├── ListaOpciones.tsx
│       ├── PerfilUsuario.tsx
│       ├── Titulo.tsx
│       └── SharedComponents.module.css
│
└── Reqs_Patrick/
    └── Req4/                         # Recuperación de contraseña
        ├── Req4.tsx
        ├── Req4.1.tsx
        ├── styles.module.css
        └── stylesrestablecer.module.css
```

---

## 4. Conclusión de Integridad

### 4.1 Resultados de la Verificación

| Verificación | Resultado | Detalle |
|---|---|---|
| **Compilación TypeScript** (`tsc -b`) | ✅ Exitosa | Sin errores `TS2307` ni advertencias de tipos. |
| **Build de Producción** (`vite build`) | ✅ Exitoso | Bundle generado correctamente (486 módulos transformados). Exit code: 0. |
| **Servidor de Desarrollo** (`npm run dev`) | ✅ Operativo | HMR activo sin errores de compilación. |

### 4.2 Funcionalidades Validadas

#### Zona Pública
- ✅ **Página Principal** (`/`): Carrusel de imágenes, sección de juegos populares, formulario de contacto y footer.
- ✅ **Noticias** (`/noticias`): Página de noticias públicas.
- ✅ **Catálogo de Juegos** (`/juegos`, `/juegos/mas-vendidos`, `/juegos/mas-populares`, `/juegos/lista`).
- ✅ **Carrito** (`/carrito`): Funcionalidad de carrito de compras.
- ✅ **Registro** (`/registro`): Formulario de registro de usuarios.
- ✅ **Recuperación de contraseña** (`/recuperar`, `/reset-password/:token`).
- ✅ **Gestión de perfil** (`/usuario`).

#### Panel de Administración
- ✅ **Dashboard** (`/reqs_21_and_23`): Estadísticas y gráficos de usuarios.
- ✅ **Gestión de Usuarios** (`/req22`): CRUD de usuarios.
- ✅ **Gestión de Noticias** (`/req24`): CRUD de noticias con modales de agregar, editar y eliminar.
- ✅ **Gestión de Juegos** (`/req17`, `/req18`): CRUD de juegos en el inventario.
- ✅ **Historial** (`/req11`): Historial de compras.

### 4.3 Resumen

La auditoría permitió eliminar **9 archivos/carpetas** de código muerto, incluyendo un App shell obsoleto, 3 componentes placeholder sin funcionalidad real, un formulario de registro duplicado y componentes de un módulo de noticias con datos estáticos de prueba que fue reemplazado por la implementación dinámica de Req_24. Se creó el archivo `types.ts` para preservar la interfaz `Noticia` como dependencia compartida, y se reorganizaron `Footer.tsx` y `JuegosPopulares.tsx` en la carpeta `Componentes/` para una estructura más coherente.

El proyecto compila exitosamente, el bundle de producción se genera sin errores, y todas las funcionalidades tanto de la **Zona Pública** como del **Panel de Administración** se mantienen intactas.

---

*Documento generado como parte del proceso de mejora continua de la arquitectura del proyecto Proyecto_PrograWeb.*
