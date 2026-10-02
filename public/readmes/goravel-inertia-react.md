<div align="center">

# ⚡ Goravel + Inertia.js v3 + React 19 + Shadcn UI Starter Kit

**A Modern, Full-Stack Go & React Admin Dashboard & Authentication Boilerplate**

[![Go Version](https://img.shields.io/badge/Go-1.20+-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://go.dev/)
[![Goravel](https://img.shields.io/badge/Goravel-v1.18-E02424?style=for-the-badge&logo=laravel&logoColor=white)](https://www.goravel.dev/)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-v3-9553E9?style=for-the-badge&logo=inertia&logoColor=white)](https://inertiajs.com/)
[![React](https://img.shields.io/badge/React-v19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-UI_Kit-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://github.com/Fantocaa/goravel-inertia-react/blob/main/LICENSE)

<p align="center">
  <strong>Build high-performance monolithic SPAs in Go with the fluid developer experience of Laravel + Inertia.js.</strong>
</p>

</div>

---

## 🌟 Overview

**`goravel-inertia-react`** is a production-ready full-stack boilerplate that brings the beloved developer experience (DX) of Laravel + Inertia + React directly to the **Go ecosystem**.

Powered by **Goravel v1.18**, **Inertia.js v3**, **React 19**, **Tailwind CSS v4**, and **Shadcn UI**, this starter kit comes pre-configured with authentication, dark mode, an admin analytics dashboard, auto-database creation, and Lightning-fast Vite HMR.

---

## 🚀 Key Highlights & Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Backend** | [Goravel v1.18](https://www.goravel.dev/) (Go) | High-performance Go framework using Gin engine & GORM ORM |
| **Adapter** | [gonertia/v3](https://github.com/romsar/gonertia) | Go adapter implementing the Inertia.js 3.0 protocol |
| **Frontend** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | Modern client SPA with typed component architecture |
| **Bundler** | [Vite 8](https://vite.dev/) | Sub-second build times with Fast Refresh and Hot Reload |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Next-generation CSS engine with OKLCH theme variables |
| **UI Library** | [shadcn/ui](https://ui.shadcn.com/) | Accessible Radix UI primitives with Lucide Icons |
| **Analytics** | [Recharts](https://recharts.org/) | Responsive SVG charts and data visualizations |
| **Database** | PostgreSQL / SQLite / MySQL | GORM database with automatic database provisioning |

---

## ✨ Features

- 🔐 **Complete Authentication System:**
  - Login screen with "Fill Demo Credentials" helper & remember me.
  - User registration with real-time validation error feedback.
  - Session-based authentication with `Auth` & `Guest` route middleware guards.
  - Profile settings to manage personal details and update passwords.
- 📊 **Interactive Admin Dashboard:**
  - 4 Key Performance Metric KPI cards (Revenue, Subscriptions, Sales, Active Users).
  - Monthly analytics performance chart with custom styled tooltips.
  - Recent transactions and user activity ledger.
- 🎨 **Modern Design & Layouts:**
  - Responsive collapsible sidebar (`AppSidebar`) with mobile sheet support.
  - Dark Mode, Light Mode, and System theme switching via `ThemeProvider`.
  - Flash notification banners for `success` and `error` alerts.
  - Global Inertia shared props (`auth.user`, `flash`, `errors`).
- ⚡ **Zero-Friction Developer Experience:**
  - **Auto Database Creation:** Automatically provisions the database during migration (`go run . artisan migrate`).
  - **Database Seeder:** Pre-configured admin user (`admin@goravel.dev` / `password`).
  - **Vite React Refresh:** Hot Module Replacement (HMR) for instant frontend feedback.
  - **Optimized SEO:** Open Graph, Twitter Cards, Google Font (Geist), and SVG favicon.

---

## 📁 Directory Structure

```text
goravel-inertia-react/
├── app/
│   ├── console/commands/       # Artisan console commands (db:create, etc.)
│   ├── facades/                # Global framework facades (Config, Orm, Inertia, Auth)
│   ├── helpers/                # Application helpers (Inertia shared props, Auth helpers)
│   ├── http/
│   │   ├── controllers/
│   │   │   ├── auth/           # LoginController, RegisterController
│   │   │   ├── dashboard_controller.go
│   │   │   └── profile_controller.go
│   │   └── middleware/         # Inertia, Auth, Guest middlewares
│   ├── models/                 # GORM User model
│   └── providers/              # Service providers & Vite bundle helpers
│
├── bootstrap/                  # Goravel bootstrap (App, Migrations, Seeders, Commands)
├── config/                     # Application configurations (app, database, http, session)
├── database/
│   ├── migrations/             # Database schema migrations
│   └── seeders/                # Database seeders (UserSeeder)
│
├── resources/
│   ├── css/                    # Tailwind CSS v4 stylesheets & OKLCH tokens
│   ├── js/
│   │   ├── components/         # Shadcn UI primitives, ThemeToggle, AppSidebar
│   │   ├── Layouts/            # AuthenticatedLayout, GuestLayout
│   │   ├── Pages/              # Inertia React pages (Welcome, Auth, Dashboard, Profile)
│   │   └── app.tsx             # React 19 Inertia client entrypoint
│   └── views/
│       └── app.html            # Root HTML template with SEO tags
│
├── routes/
│   └── web.go                  # Web & SPA routes
├── vite.config.ts              # Vite 8 configuration with origin & HMR settings
└── tsconfig.json               # TypeScript configuration
```

---

## ⚡ Quick Start

### Prerequisites
- [Go](https://go.dev/dl/) (v1.21 or newer)
- [Bun](https://bun.sh/) (v1.1 or newer) — runtime & package manager (replaces Node.js/npm)
- [PostgreSQL](https://www.postgresql.org/) (or your preferred database)

### 1. Clone the repository
```bash
git clone https://github.com/Fantocaa/goravel-inertia-react.git
cd goravel-inertia-react
```

### 2. Configure Environment
```bash
cp .env.example .env
go run . artisan key:generate
```

### 3. Install Dependencies
```bash
go mod download
bun install
```

### 4. Run Migrations & Seeders
```bash
go run . artisan migrate
go run . artisan db:seed
```
> **Note:** The database is created automatically if it does not already exist on your database server.

---

## 💻 Running the Application

Start both the frontend dev server and the Go backend:

### Terminal 1 (Vite Frontend):
```bash
bun run dev
```

### Terminal 2 (Goravel Backend):
```bash
go run .
# Or use Air for automatic backend live reload:
# air
```

Open your browser at **[http://localhost:3000](http://localhost:3000)**.

### Demo Account
- **Email:** `admin@goravel.dev`
- **Password:** `password`

---

## 📦 Production Deployment

```bash
# 1. Build the frontend assets bundle
bun run build

# 2. Build the production Go binary
go build -o app.exe .        # Windows
# go build -o app .          # Linux / macOS
```

---

## 🏷️ Recommended GitHub Topics

To make your repository easily discoverable on GitHub, add these topics in your GitHub repository settings:

`goravel` · `inertiajs` · `react19` · `golang` · `fullstack` · `starter-kit` · `boilerplate` · `shadcn-ui` · `tailwindcss-v4` · `admin-dashboard` · `go-inertia` · `laravel-in-go` · `vite` · `typescript`

---

## 📄 License

This open-source software is licensed under the [MIT license](https://github.com/Fantocaa/goravel-inertia-react/blob/main/LICENSE).
