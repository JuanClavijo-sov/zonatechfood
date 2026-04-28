# ZonaTechFood

> Plataforma web moderna de descubrimiento gastronómico con diseño glassmorphism, animaciones fluidas y autenticación completa.

Desarrollado con **Next.js 16**, **React 19**, **Tailwind CSS 4** y **Supabase**.

---

## Características

| Funcionalidad | Descripción |
|---|---|
| **Home interactivo** | Hero con efecto typewriter, restaurantes destacados con scroll horizontal y animaciones con Framer Motion |
| **Catálogo de restaurantes** | Búsqueda por nombre/descripción/ubicación, filtro por categoría, toggle «solo destacados», ordenación (valoración ↑↓, nombre A-Z/Z-A) y paginación (9/página) |
| **Ficha de restaurante** | Página dinámica por slug con imagen, rating, ubicación, descripción y SEO dinámico |
| **Sistema de favoritos** | Marcar/desmarcar restaurantes con actualización en tiempo real y animación de eliminación |
| **Perfil de usuario** | Edición de nombre, teléfono (formato colombiano +57), cambio de correo con doble confirmación |
| **Autenticación** | Registro con nombre, login con email/contraseña, sesión persistente vía Supabase Auth |
| **Contacto funcional** | Formulario glassmorphism conectado a Supabase (tabla `contact_messages`) |
| **Protección de rutas** | Proxy centralizado: `/profile` y `/favorites` requieren sesión; `/login` y `/register` redirigen si ya hay sesión |
| **Menú móvil responsive** | Hamburger con animación ↔ X, drawer slide-from-right con spring animation y overlay |
| **SEO completo** | Metadata en todas las rutas, Open Graph, `generateMetadata` dinámico en ficha de restaurante |
| **Diseño premium** | Glassmorphism, gradientes, micro-animaciones, dark mode nativo y tipografía Inter + Outfit |

---

## Stack tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.3 |
| UI | React | 19.2.4 |
| Estilos | Tailwind CSS | 4.x |
| Animaciones | Motion (Framer Motion) | 12.x |
| Backend/Auth | Supabase (Auth + PostgreSQL) | 2.103.0 |
| SSR Cookies | @supabase/ssr | 0.10.2 |
| Componentes UI | shadcn/ui + Radix UI | 4.x |
| Iconos | Lucide React | 1.8.0 |
| Formularios | React Hook Form + Zod | 7.x / 4.x |
| Lenguaje | TypeScript | 5.x |

---

## Estructura del proyecto

```
zonatechfood/
├── src/
│   ├── app/                          # Rutas (App Router)
│   │   ├── layout.tsx                # Layout raíz (fuentes, metadata global, navbar/footer)
│   │   ├── page.tsx                  # Home — hero + restaurantes destacados
│   │   ├── not-found.tsx             # Página 404 personalizada
│   │   ├── globals.css               # Tokens de diseño y utilidades (glass, hero-glow)
│   │   ├── contact/
│   │   │   ├── layout.tsx            # Metadata SEO de contacto
│   │   │   └── page.tsx              # Formulario de contacto → Supabase
│   │   ├── favorites/
│   │   │   └── page.tsx              # Lista de favoritos (ruta protegida)
│   │   ├── login/
│   │   │   ├── layout.tsx            # Metadata SEO + redirect si ya autenticado
│   │   │   └── page.tsx              # Formulario de login
│   │   ├── register/
│   │   │   ├── layout.tsx            # Metadata SEO + redirect si ya autenticado
│   │   │   └── page.tsx              # Formulario de registro
│   │   ├── profile/
│   │   │   ├── page.tsx              # Página de perfil (ruta protegida)
│   │   │   └── profile-form.tsx      # Formulario de edición (nombre, tel, email)
│   │   └── restaurants/
│   │       ├── layout.tsx            # Metadata SEO del catálogo
│   │       ├── page.tsx              # Listado con búsqueda, filtros, orden y paginación
│   │       └── [slug]/
│   │           └── page.tsx          # Ficha de restaurante (SEO dinámico)
│   │
│   ├── components/
│   │   ├── home/                     # Hero, typewriter, featured-restaurants, etc.
│   │   ├── layout/                   # Navbar (con menú móvil) y Footer
│   │   ├── restaurants/              # RestaurantGrid, RestaurantFilters, FavoriteButton
│   │   ├── forms/                    # AuthShell, PasswordInput
│   │   ├── favorites/                # Componentes de la sección favoritos
│   │   └── ui/                       # Badge, Button, Card, Input, Label (shadcn/ui)
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts             # Cliente Supabase para CSR (browser)
│   │   │   ├── server.ts             # Cliente Supabase para SSR (cookies read-only)
│   │   │   ├── restaurants.ts        # Queries de restaurantes (cliente browser)
│   │   │   ├── restaurants.server.ts # Queries de restaurantes (Server Components)
│   │   │   └── favorites.ts          # CRUD de favoritos
│   │   ├── utils.ts                  # Utilidad cn() para clases condicionales
│   │   └── validations/              # Schemas Zod
│   │
│   ├── proxy.ts                      # Proxy centralizado (protección de rutas + sesión)
│   ├── data/                         # Datos estáticos
│   └── types/                        # Tipos TypeScript globales
│
├── supabase/
│   └── migrations/                   # SQL para ejecutar en Supabase Dashboard
│       ├── 001_create_contact_messages.sql
│       └── 002_seed_restaurants.sql
│
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## Base de datos (Supabase)

### Tablas

| Tabla | Descripción | Campos principales |
|---|---|---|
| `restaurants` | Catálogo de restaurantes | `id`, `slug` (unique), `name`, `category`, `description`, `image_url`, `location`, `rating`, `is_featured` |
| `favorites` | Relación usuario-restaurante | `id`, `user_id` (FK auth.users), `restaurant_id` (FK restaurants) |
| `contact_messages` | Mensajes del formulario de contacto | `id`, `name`, `email`, `subject`, `message`, `created_at` |

### Políticas RLS

| Tabla | Operación | Política |
|---|---|---|
| `restaurants` | SELECT | Pública (anon puede leer) |
| `favorites` | SELECT/INSERT/DELETE | Solo el usuario autenticado propietario |
| `contact_messages` | INSERT | Pública (cualquiera puede enviar) |
| `contact_messages` | SELECT | Solo `service_role` (admin) |

---

## Autenticación y seguridad

| Aspecto | Implementación |
|---|---|
| Proveedor | Supabase Auth (email/password) |
| Registro | Guarda `full_name` en `user_metadata` |
| Sesión | Tokens JWT con refresco automático via proxy |
| Protección de rutas | `src/proxy.ts` — redirige a `/login?next=...` si no hay sesión |
| Rutas protegidas | `/profile`, `/favorites` |
| Rutas solo invitados | `/login`, `/register` (redirige a `/` si ya hay sesión) |
| Cambio de email | Doble confirmación en el formulario de perfil |

---

## Sistema de diseño

| Token | Valor | Uso |
|---|---|---|
| `--color-background` | `#08172f` | Fondo principal (azul muy oscuro) |
| `--color-foreground` | `#ffffff` | Texto principal |
| `--brand` | `#FF5B04` | Naranja — CTAs, badges, rating stars |
| `.glass` | `bg-white/8 + backdrop-blur + border` | Tarjetas y paneles glassmorphism |
| `.hero-glow` | Radial gradient animado | Luces decorativas del hero |
| Fuentes | Inter (body) + Outfit (headings) | Google Fonts via `next/font` |

---

## Rutas

| Ruta | Tipo | Auth | Descripción |
|---|---|---|---|
| `/` | SSR | Pública | Home con hero y restaurantes destacados |
| `/restaurants` | CSR | Pública | Catálogo con búsqueda, filtros, orden y paginación |
| `/restaurants/[slug]` | SSR | Pública | Ficha detallada con SEO dinámico |
| `/favorites` | SSR | Protegida | Restaurantes marcados como favoritos |
| `/profile` | SSR | Protegida | Edición de perfil (nombre, teléfono, email) |
| `/login` | SSR | Solo invitados | Formulario de inicio de sesión |
| `/register` | SSR | Solo invitados | Formulario de registro |
| `/contact` | SSR | Pública | Formulario de contacto → Supabase |

---

## Instalación y ejecución

### Prerrequisitos

- Node.js ≥ 18
- pnpm (recomendado) o npm
- Proyecto en [Supabase](https://supabase.com) con las tablas creadas

### 1. Clonar el repositorio

```bash
git clone https://github.com/JuanClavijo-sov/zonatechfood.git
cd zonatechfood
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Crear `.env.local` en la raíz:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJ...tu-anon-key
```

### 4. Ejecutar migraciones en Supabase

Ve a **Supabase Dashboard → SQL Editor** y ejecuta en orden:
1. `supabase/migrations/001_create_contact_messages.sql`
2. `supabase/migrations/002_seed_restaurants.sql`

### 5. Iniciar en desarrollo

```bash
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000).

### 6. Build de producción

```bash
pnpm build
pnpm start
```

---

## Scripts disponibles

| Script | Comando | Descripción |
|---|---|---|
| `dev` | `pnpm dev` | Servidor de desarrollo con Turbopack |
| `build` | `pnpm build` | Build de producción optimizado |
| `start` | `pnpm start` | Servidor de producción |
| `lint` | `pnpm lint` | Linting con ESLint |

---

## Notas importantes

| Tema | Detalle |
|---|---|
| **Supabase pausado** | El plan gratuito pausa proyectos inactivos. Si ves error `521` o `fetch failed`, restaura el proyecto desde el dashboard de Supabase. |
| **Proxy vs Middleware** | Next.js 16 deprecó `middleware.ts` a favor de `proxy.ts`. Este proyecto ya usa la convención actual. |
| **Imágenes** | Las imágenes de restaurantes provienen de Unsplash (URLs directas). Se usa `unoptimized` en `next/image` para evitar límites del optimizador. |
| **Teléfono colombiano** | El formato del campo teléfono en perfil aplica máscara `+57 3XX XXX XXXX` automáticamente. |

---

## Autores

- **Juan Clavijo** — [juanclavijo.olaya@gmail.com](mailto:juanclavijo.olaya@gmail.com)

---

## Licencia

ZonaTechFood es un proyecto privado. Todos los derechos reservados.
