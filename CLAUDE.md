# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Setup
corepack enable           # Enable package manager version management
yarn install              # Install dependencies (uses Yarn 4 workspaces)
cp .env.example .env      # Copy environment variables

# Development
yarn dev                  # Start all services (Next.js:3000, CF Worker:8787, Storybook:6006)
yarn test                 # Run test suite (vitest + Playwright)
yarn lint                 # Run linter (eslint + stylelint)
yarn format               # Format code (prettier)
yarn typecheck            # Type checking
yarn size:ci              # Bundle size analysis
yarn docs:preview         # Preview docs at localhost:5173

# Workspace Commands
yarn workspace story-generator-frontend <command>  # Run command in frontend workspace
yarn workspace story-generator-backend <command>   # Run command in backend workspace
yarn workspaces list      # List all workspaces
```

## Package Management

This project uses **Yarn 4** with **Volta** for consistent tooling across development environments:

- **Yarn 4**: Modern package manager with workspace support
- **Volta**: Pins Node.js and Yarn versions per project
- **Workspaces**: Monorepo structure for frontend and backend packages
- **Corepack**: Automatically manages package manager versions

### Tool Versions
- Node.js: 20.10.0 (pinned via Volta)
- Yarn: 4.0.2 (pinned via Volta)
- Package Manager: Configured via `packageManager` field in package.json

## Architecture Overview

This is a **Story Generator** application with a feature-first architecture:

- **Frontend**: Next.js 14 with React 19 and TypeScript
- **Edge Workers**: Cloudflare Workers with Hono Router for business logic
- **Database**: Firestore (Native mode) for persistence
- **Storage**: Google Cloud Storage for assets
- **AI Integration**: External AI API for story generation and avatar creation

### Key Architectural Patterns

1. **Feature-First Structure**: Code is organized by user stories in `src/features/{storyId-slug}/`
2. **Atomic Design**: Within each feature, components follow atoms → molecules → organisms hierarchy
3. **Shared Components**: Reusable atoms/molecules are hoisted to `packages/ui-kit`

## Code Organization Rules

- Each feature maps 1-to-1 with backlog items in `src/features/{storyId-slug}/`
- Follow Atomic Design within features: `atoms/`, `molecules/`, `organisms/`
- Unit tests live in `__tests__/` directories next to source code
- E2E tests are in `tests/e2e`

## Development Workflow

1. **Planning**: Read `docs/architecture/folder-structure.mmd` and `docs/product/epics-features-user-stories.md`
2. **Branching**: Use `feat/{storyId}-{slug}` pattern
3. **Commits**: Prefix with `[Story {storyId}]`
4. **Quality Gates**: All PRs must pass lint, format, tests, typecheck, and bundle size checks

## Important Constraints

- No new dependencies without ADR approval
- No global imports that bypass feature boundaries
- No secrets in code (use environment variables)
- Bundle increases must be under 5kB gzipped per PR
- All interactive elements need ARIA labels for accessibility
- Maintain WCAG 2.1 AA color contrast standards

## Documentation

- Comprehensive docs are in `/docs` with index at `docs/index.md`
- Architecture decisions are recorded in `docs/architecture/adr/`
- AI coding guidelines are in `docs/guides/ai-coding-agent-guidelines.md`
- API reference is in `docs/reference/api/rest-api.md`
- Database schema is in `docs/reference/data/firestore-schema.md`

## Key Requirements

- 99.9% monthly SLA target
- ≤200ms p95 latency for read endpoints
- Real-time progress updates via Firestore onSnapshot
- GDPR/CCPA compliance through Firestore security rules

## Repository Information
- GitHub Owner: WyattEnterprise
- Repository Name: storyGenerator

## Current Work Status

### User Story 1.4 — Add Basic Yarn 4 Workspaces and Volta Configuration
**Status**: ✅ Complete

**Completed Work**:
- ✅ Migrated from pnpm to Yarn 4 with workspaces
- ✅ Added Volta configuration for Node.js and Yarn version pinning
- ✅ Created .yarnrc.yml configuration with node-modules linker
- ✅ Updated root package.json with workspaces field
- ✅ Updated all scripts to use Yarn workspace commands
- ✅ Enabled Corepack for automatic package manager management
- ✅ Tested workspace functionality and commands
- ✅ Updated documentation in CLAUDE.md

**Files Created/Modified**:
- `/package.json` (added workspaces, volta config, updated scripts)
- `/.yarnrc.yml` (Yarn 4 configuration)
- `/CLAUDE.md` (updated commands and documentation)

**Tool Versions**:
- Node.js: 20.10.0 (pinned via Volta)
- Yarn: 4.0.2 (pinned via Volta)

### User Story 1.3 — Configure ESLint and Prettier with TypeScript Support
**Status**: In Progress - ESLint configuration needs debugging
**Note**: ESLint packages are installed but configuration conflicts need resolution