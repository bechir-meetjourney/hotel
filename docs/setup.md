# Setup

Quick installation and run in English. For full details (including dependencies table and structure), see the root [README.md](../README.md).

## Prerequisites

- PHP >= 8.2
- Composer
- Node.js >= 18
- npm or yarn
- SQLite (default) or MySQL/PostgreSQL

## Steps

1. **Clone the repository** (if applicable).

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Environment**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Database**
   - **SQLite**: `touch database/database.sqlite`
   - **MySQL/PostgreSQL**: set `DB_*` in `.env` accordingly  
   Then run:
   ```bash
   php artisan migrate
   ```

5. **Frontend**
   ```bash
   npm install
   npm run dev
   ```

6. **Run the app**
   ```bash
   php artisan serve
   ```

Open the app in the browser (e.g. `http://localhost:8000`). Template previews: `/template/riyadh`, `/template/madina`.
