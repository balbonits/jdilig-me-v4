# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with modern React. Showcases projects, code exercises, technical notes, resume, and contact information.

**Design Philosophy:** Mobile-first, responsive design with accessibility as a core principle.

## Tech Stack

- **React 19** with **TypeScript** (strict mode)
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework, mobile-first responsive design
- **React Router** - Client-side routing
- **Testing**: Vitest + React Testing Library (unit), Playwright (E2E)
- **Documentation**: Storybook
- **Content**: Hybrid approach (static React components + markdown files)
- **Deployment**: Vercel (web only)
- **Design**: Mobile-first responsive design, full accessibility (WCAG)

## Common Commands

### Development

```bash
npm run dev              # Start Vite dev server
npm run build            # Build for production
npm run preview          # Preview production build locally
```

### Testing

**Unit Tests (Vitest):**

```bash
npm test                 # Run Vitest unit tests (text output for automation)
npm run test:watch       # Run Vitest in watch mode
npm run test:coverage    # Run with text coverage report
npm run test:html        # Generate HTML coverage report + open in browser
npm run test:ci          # CI/CD optimized (text + lcov + json)
```

**E2E Tests (Playwright):**

```bash
npm run test:e2e         # Run Playwright E2E tests (text/list output)
npm run test:e2e:html    # Generate HTML report with screenshots
npm run test:e2e:ui      # Interactive UI mode for debugging
npm run test:e2e:debug   # Debug mode with browser DevTools
npm run test:e2e:headed  # Run with visible browser
npm run test:e2e:ci      # CI/CD optimized (list + junit + json)
```

**Combined:**

```bash
npm run test:all         # Run all tests (Vitest + Playwright) - text output
npm run test:all:html    # Run all tests with HTML reports
```

**Output Strategy:**
- **Text output** (`npm test`, `npm run test:e2e`) - For automation, Claude Code, CI/CD pipelines
- **HTML reports** (`npm run test:html`, `npm run test:e2e:html`) - For human review, visual inspection
- **CI/CD** (`npm run test:ci`, `npm run test:e2e:ci`) - Optimized with machine-readable formats (lcov, junit, json)

### Storybook

```bash
npm run storybook        # Launch Storybook server
npm run build:storybook  # Build Storybook for deployment
```

### Build & Quality

```bash
npm run build            # Build for production (Vite)
npm run lint             # Run ESLint
npm run format           # Run Prettier
npm run typecheck        # Run TypeScript compiler check
```

### Deployment

```bash
npm run build            # Build for Vercel deployment
vercel                   # Deploy preview (Vercel CLI)
vercel --prod            # Deploy to production (jdilig.me)
```

## High-Level Architecture

### Hybrid Content Strategy

The app uses a **hybrid content approach** (combining static and dynamic content):

1. **Static Screens** (React Components with Tailwind):
   - `Home` - Landing page with hero and highlights
   - `About` - Bio + embedded PDF resume viewer
   - `Contact` - Contact form (with Vercel Function backend)

2. **Dynamic Content Screens** (Markdown Files):
   - `Projects` - List and detail views from `/src/content/projects/*.md`
   - `Exercises` - Code samples from `/src/content/exercises/*.md`
   - `Notes` - Technical articles from `/src/content/notes/*.md`

**Why hybrid?** Static screens need precise UI control (forms, PDF viewer, hero sections). Content screens benefit from markdown's simplicity and version control.

### Screen Structure (9 Routes)

All screens follow routing-based naming:

```
/src/screens/
  Home.tsx                  → /
  About.tsx                 → /about
  Contact.tsx               → /contact
  Projects/
    index.tsx               → /projects (list)
    Details.tsx             → /projects/:slug (detail)
  Exercises/
    index.tsx               → /exercises (list)
    Details.tsx             → /exercises/:slug (detail)
  Notes/
    index.tsx               → /notes (list)
    Details.tsx             → /notes/:slug (detail)
```

### Content System

Markdown files in `/src/content/` are parsed at **build time**:

1. **Frontmatter** (YAML) provides metadata:

   ```yaml
   ---
   title: "Project Title"
   date: "2024-12-01"
   slug: "project-title"
   tags: ["React", "TypeScript"]
   description: "Brief description"
   ---
   ```

2. **Content** is rendered using:
   - `gray-matter` - Parse frontmatter
   - `react-markdown` - Render markdown to React components
   - `rehype-highlight` or `react-syntax-highlighter` - Syntax highlighting for code blocks

3. **Loading** via custom hooks:
   - `useProjects()` - Get all projects
   - `useProjectBySlug(slug)` - Get specific project
   - Similar hooks for exercises and notes

See `/docs/CONTENT.md` for how to add/edit content.

### Component Organization

```
/src/components/
  ui/          - Base components (Button, Input, Card, Text, Heading)
  layout/      - Layout components (Container, Header, Footer, Navigation, Grid)
  content/     - Content-specific (MarkdownRenderer, PDFViewer, CodeBlock, ProjectCard)
  forms/       - Form components (ContactForm, FormField)
```

**Key component: Navigation** (`/src/components/layout/Navigation.tsx`)
- Appears on every screen
- Handles responsive mobile menu
- Has both unit tests AND E2E tests (only component with `.spec.tsx`)

### Project Structure

```
/src/
  components/  - Reusable UI components
  screens/     - Screen/page components
  hooks/       - Custom React hooks (useContent, useResponsive, useAnalytics)
  context/     - React Context providers (Theme, Analytics)
  utils/       - Pure utility functions
  types/       - TypeScript type definitions
  constants/   - App constants (routes, config, theme)
  content/     - Markdown content files

/api/          - Vercel Functions (serverless backend)
  contact.ts   - Contact form handler

/public/       - Static assets (images, fonts, resume.pdf)
```

Use **path aliases** for imports:

```typescript
import { Button } from '@/components/ui/Button';
import { useProjects } from '@/hooks/useContent';
import type { Project } from '@/types/content';
```

## Key Patterns & Conventions

### File Naming & Organization

**Components:**
- `ComponentName.tsx` - Implementation
- `ComponentName.test.tsx` - Vitest unit tests
- `ComponentName.stories.tsx` - Storybook documentation
- Co-located with component

**Screens:**
- `ScreenName.tsx` - Implementation
- `ScreenName.spec.tsx` - Playwright E2E tests
- Co-located with screen

**Exception - Navigation:**
- `Navigation.tsx + .test.tsx + .spec.tsx + .stories.tsx` (has both unit and E2E tests)

### Styling with Tailwind CSS

**Mobile-first responsive design:**

```typescript
<div className="
  p-4              /* mobile default */
  sm:p-6           /* tablet ≥640px */
  md:p-8           /* desktop ≥768px */
  lg:p-10          /* large ≥1024px */
">
```

**Rules:**
- ✅ Use Tailwind utility classes only
- ✅ Mobile-first breakpoints (default → sm: → md: → lg:)
- ❌ No inline styles, no CSS modules (unless absolutely necessary)

### Accessibility

All interactive components must have:
- `aria-label` or descriptive text
- `role` attribute when semantic HTML isn't used
- Keyboard navigation support (tab order, Enter/Space handlers)
- Focus indicators

Example:

```typescript
<button
  aria-label="Submit contact form"
  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
  onClick={handleSubmit}
>
  Send Message
</button>
```

Playwright tests include accessibility checks in screen specs.

### TypeScript Conventions

- **Strict mode** enabled
- Use `interface` for object shapes
- Use `type` for unions/intersections
- Use `as const` for constants
- Avoid `any`, use `unknown` if truly needed
- Named exports (not default exports)

### Code Principles

- **KISS** (Keep It Simple, Stupid) - Avoid over-engineering
- **DRY** (Don't Repeat Yourself) - Extract reusable logic
- **Pure functions** in utils/ (no side effects)
- **Composition over inheritance**

## Testing Strategy

### Unit Tests (Vitest + React Testing Library)

- **Location:** Co-located `.test.tsx` files
- **Scope:** All components and utility functions
- **Tests:** Behavior, props, accessibility, edge cases
- **Output Formats:**
  - Text (default) - Fast, for automation and Claude Code
  - HTML (`npm run test:html`) - Visual coverage report with file browser
  - CI formats (`npm run test:ci`) - Text + lcov (for Codecov/Coveralls) + json

### Visual Documentation (Storybook)

- **Location:** Co-located `.stories.tsx` files
- **Scope:** All components (UI, layout, content, forms)
- **Shows:** Component states, variants, props

### E2E Tests (Playwright)

- **Location:** Co-located `.spec.tsx` files
- **Scope:** All screens + Navigation component
- **Tests:** User flows, interactions, form submissions, navigation
- **Output Formats:**
  - List (default) - Concise text output for automation
  - HTML (`npm run test:e2e:html`) - Visual report with screenshots, videos, traces
  - UI mode (`npm run test:e2e:ui`) - Interactive debugging interface
  - CI formats (`npm run test:e2e:ci`) - List + JUnit XML + JSON

**Special cases:**
- `About.spec.tsx` tests PDF viewer functionality
- `Contact.spec.tsx` tests form validation and submission
- `Navigation.spec.tsx` tests navigation across all pages

**When to use which test command:**

| Command | Use Case |
|---------|----------|
| `npm test` | Quick unit test run, automation, Claude Code |
| `npm run test:html` | Review coverage, identify untested code |
| `npm run test:ci` | CI/CD pipelines, upload to coverage services |
| `npm run test:e2e` | Quick E2E check, automation, Claude Code |
| `npm run test:e2e:html` | Review test results with screenshots/videos |
| `npm run test:e2e:ui` | Debug failing tests interactively |
| `npm run test:all` | Pre-commit checks, full validation |

## Deployment

### Web (Vercel)

- **Production URL:** `jdilig.me` (custom domain)
- **Framework:** Vite (React)
- **Preview deployments:** Automatic for all PRs
- **Deployment:** Automatic from `main` branch
- **Build command:** `npm run build`
- **Output directory:** `dist`

### Backend (Vercel Functions)

- **Contact form:** `/api/contact.ts` serverless function
- **Email service:** Resend (free tier, 3,000 emails/month)
- **Environment variables:**
  - `RESEND_API_KEY` - For sending contact form emails
  - `VITE_GOOGLE_ANALYTICS_ID` - Google Analytics tracking ID

### Configuration Files

- `vercel.json` - Vercel build configuration
- `.env.example` - Environment variables template
- `vite.config.ts` - Vite build configuration

### Deployment Workflow

1. **Development:** Push to feature branch → Vercel creates preview URL
2. **Production:** Merge to `main` → Deploys to production (`jdilig.me`)

## Important Technical Decisions

1. **React + Vite over Create React App:** Faster builds, better DX, modern tooling

2. **Vitest over Jest:** Native ESM support, faster execution, better Vite integration

3. **Tailwind CSS:** Utility-first, mobile-first, excellent DX, no CSS-in-JS overhead

4. **Markdown for content:** Version-controlled, easy to edit, portable

5. **Build-time content bundling:** Fast, works offline, no runtime API needed

6. **Hybrid content strategy:** Precise UI control for static pages, markdown simplicity for content

7. **Co-located tests:** Tests live next to code for discoverability and maintenance

8. **Vercel for hosting:** Zero-config deployment, preview URLs, custom domain support, serverless functions

9. **Google Analytics:** Standard analytics tracking for visitor insights

10. **Web-only:** Focus on web deployment, no mobile app complexity

## Development Workflow

### Adding a New Component

1. Create component file: `/src/components/{category}/{Name}.tsx`
2. Add unit tests: `{Name}.test.tsx`
3. Add Storybook story: `{Name}.stories.tsx`
4. Export from category index: `/src/components/{category}/index.ts`
5. Use with path alias: `import { Name } from '@/components/{category}/Name'`

### Adding a New Screen

1. Create screen file: `/src/screens/{Name}.tsx` (or `{Category}/index.tsx`)
2. Add E2E tests: `{Name}.spec.tsx`
3. Add route to React Router: `/src/App.tsx` or `/src/routes.tsx`
4. Add route constant: `/src/constants/routes.ts`

### Adding New Content

1. Create markdown file: `/src/content/{type}/{slug}.md`
2. Add frontmatter with required fields (title, date, slug, tags, description)
3. Write content in markdown
4. Content automatically appears in list/detail screens

See `/docs/CONTENT.md` for detailed instructions.

## Additional Documentation

- **`/docs/PROJECT.md`** - Detailed architecture, build process, deployment
- **`/docs/CODE.md`** - Complete code conventions, patterns, guidelines, examples
- **`/docs/CONTENT.md`** - How to add/edit content, frontmatter schema, markdown best practices
- **`/CHANGELOG.md`** - Project version history and notable changes

## Key Files to Review

- `/src/types/content.ts` - Content type definitions (Project, Exercise, Note)
- `/src/types/routes.ts` - React Router route types
- `/src/utils/content/loader.ts` - Content loading logic
- `/src/hooks/useContent.ts` - Content access hooks
- `/src/components/content/MarkdownRenderer.tsx` - Markdown rendering
- `/src/components/layout/Navigation.tsx` - Main navigation
- `/api/contact.ts` - Contact form serverless function

## Notes for AI Assistants

- Always check existing patterns before creating new ones
- Reference `/docs/CODE.md` for detailed conventions
- Co-locate tests and stories with components
- Use path aliases for all imports
- Follow mobile-first responsive design with Tailwind
- Include accessibility attributes on all interactive elements
- Test E2E functionality in screen specs, not component tests
- Markdown content is loaded at build time via Vite, not runtime
- Use Vitest for unit tests, not Jest
- Vercel Functions for backend logic (contact form)
