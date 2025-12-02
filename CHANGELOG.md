# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Project Setup

- Initialized React Native 0.82 project with TypeScript
- Added React 19.1+ support
- Created project documentation (CLAUDE.md, PROJECT.md, CODE.md, CONTENT.md)
- Configured hybrid content strategy (static screens + markdown files)

### Architecture

- Set up 9-screen routing structure (Home, About, Contact, Projects, Exercises, Notes)
- Implemented mobile-first responsive design with NativeWind
- Created component organization (ui/, layout/, content/, forms/)
- Added hooks architecture (useContent, useResponsive, useAnalytics)
- Set up Context providers (Theme, Analytics)

### Development Tools

- Configured Jest with multiple output formats (text, HTML, CI)
- Configured Playwright for E2E testing with multiple reporters
- Set up Storybook for component documentation
- Added ESLint and Prettier for code quality
- Configured TypeScript strict mode

### Testing

- Implemented testing strategy: unit tests (.test.tsx), E2E tests (.spec.tsx), Storybook (.stories.tsx)
- Added test scripts for automation (text output) and human review (HTML reports)
- Configured CI/CD-optimized test commands

### Accessibility

- Implemented comprehensive accessibility patterns (ARIA attributes, semantic roles)
- Added accessibility testing in Playwright E2E tests
- Configured keyboard navigation support

---

## Version History

Versions will be added here as releases are published.

### Version Format

- **Major** (1.0.0) - Breaking changes, major new features
- **Minor** (0.1.0) - New features, backwards compatible
- **Patch** (0.0.1) - Bug fixes, backwards compatible

### Change Categories

- **Added** - New features
- **Changed** - Changes in existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security updates

---

[Unreleased]: https://github.com/johndilig/jdilig-me-v4/compare/HEAD
