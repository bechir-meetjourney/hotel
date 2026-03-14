# Architecture

## Backend (Laravel 12)

- **Controllers**: `app/Http/Controllers/` – e.g. `HomeController`, `SetupController`, plus Auth and Settings.
- **Middleware**: `app/Http/Middleware/` – includes `LoadMadinaTranslations`, which loads Madina template translations for Inertia.
- **Models**: `app/Models/` – e.g. `User`.

## Frontend (React + TypeScript)

- **Pages**: `resources/js/pages/` – `public/` (Home, Templates, Privacy), `templates/` (Riyadh, Madina), `auth/`, `settings/`.
- **Components**: `resources/js/components/` – `public/` (landing and template gallery), `ui/`, `templates/` (e.g. ThemeSwitcher, BookingModal), `seo/`.
- **Layouts**: `resources/js/layouts/` – e.g. `public-layout`, `TemplateLayout`, `MadinaLayout`.
- **Hooks**: `resources/js/hooks/` – e.g. `useLang`, `useTemplateTranslations`, `use-appearance`.
- **Config**: `resources/js/config/` – template configs (e.g. `templates/madina.config.ts`).
- **Data**: `resources/js/data/` – e.g. `templates/madina/` for Madina section data.

## Routes

Defined in `routes/web.php`:

- Home, welcome, template-test.
- Auth-protected dashboard.
- Public: `/Privacy`, `/templates` (template gallery).
- Template previews: `/template/riyadh`, `/template/madina`.
- Locale switch: `/locale/{locale}`.
- Setup flow: `/setup/plan`, `/setup/template`, etc.

## Internationalization (i18n)

- **Language files**: `resources/lang/` – `ar/` and `en/` (e.g. `messages.php`, `templates.php`, `madina.php`).
- **Hooks**: `useLang()` for general UI; `useTemplateTranslations()` / `useTemplateT()` for template-specific strings (from Inertia props).
- **Direction**: RTL/LTR supported; templates receive locale and pass it to layout and components.

## Styling

- **Tailwind CSS 4** – Main utility and component styles.
- **Template-specific CSS** – e.g. `resources/css/templates/madina.css` with `--madina-*` variables for the Madina template. Other templates can have their own CSS and variables.
