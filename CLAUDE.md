# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Setup
corepack enable           # Enable package manager version management
yarn install              # Install dependencies (uses Yarn 4 workspaces)
cp frontend/.env.example frontend/.env      # Copy frontend environment variables
cp backend/.env.example backend/.env        # Copy backend environment variables

# Development
yarn dev                  # Start all services (React Native Expo + Hono backend:8787)
yarn test                 # Run test suite (backend only)
yarn lint                 # Run linter (Expo + backend)
yarn format               # Format code (backend only)
yarn typecheck            # Type checking (backend only)

# Frontend Development (React Native/Expo)
yarn workspace story-generator-frontend start      # Start Expo development server
cd frontend && npx expo start                      # Alternative: run from frontend directory
npx expo start --web                              # Run on web browser
npx expo start --android                          # Run on Android emulator
npx expo start --ios                              # Run on iOS simulator

# Backend Development (Docker)
docker-compose up backend                          # Start backend only
docker-compose logs -f backend                     # View backend logs
docker-compose down                               # Stop backend

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

## Environment Configuration

This project uses a shared environment configuration pattern:

- **Environment Files**: Both frontend and backend have `.env.example` files listing required variables
- **Configuration Loaders**: Each project has a `config/index.ts` file that loads and validates environment variables
- **Type Safety**: All configuration is type-safe with proper TypeScript interfaces
- **Validation**: Required variables throw errors if missing, optional variables have defaults

### Required Environment Variables

**Frontend** (`frontend/.env`):
- `FIREBASE_PROJECT_ID`, `FIREBASE_API_KEY`, etc. - Firebase configuration
- `REVENUECAT_KEY` - RevenueCat subscription management
- `POSTHOG_API_KEY` - PostHog analytics
- `GCS_BUCKET_NAME` - Google Cloud Storage

**Backend** (`backend/.env`):
- `FIREBASE_PROJECT_ID`, `FIREBASE_PRIVATE_KEY`, etc. - Firebase admin configuration
- `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN` - Cloudflare Workers deployment
- `AI_API_KEY`, `AI_API_URL` - AI service integration
- `JWT_SECRET`, `ENCRYPTION_KEY` - Security configuration

### Usage
```typescript
// Import configuration in your code
import { appConfig } from './config';

// Use type-safe configuration
const firebaseConfig = appConfig.firebase;
const isAnalyticsEnabled = appConfig.features.enableAnalytics;
```

## Architecture Overview

This is a **Story Generator** application with a feature-first architecture:

- **Frontend**: React Native with Expo SDK 53, React 19, and TypeScript
- **Backend**: Hono Router with TypeScript (runs in Docker container)
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

### Development Environment Setup

- **Frontend**: React Native/Expo runs natively on your development machine (no Docker)
- **Backend**: Runs in Docker container for consistent development environment
- **Mobile Testing**: Use Expo Go app on your phone or iOS Simulator/Android Emulator
- **Hot Reloading**: Both frontend (Metro bundler) and backend (Docker volumes) support hot reloading

## Important Constraints

- No new dependencies without ADR approval
- No global imports that bypass feature boundaries
- No secrets in code (use environment variables)
- Bundle increases must be under 5kB gzipped per PR
- All interactive elements need ARIA labels for accessibility
- Maintain WCAG 2.1 AA color contrast standards

## GitHub Operations

**IMPORTANT**: Always use GitHub MCP server tools for ALL GitHub operations. Never use GitHub CLI.

- Use MCP tools: `mcp__github__*` functions for all GitHub interactions
- Do NOT use: `gh` commands or GitHub CLI for any operations

The GitHub MCP server provides comprehensive GitHub functionality without requiring separate authentication.

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

### User Story 1.5 — Create a Shared `.env.example` and Config Pattern
**Status**: ✅ Complete

**Completed Work**:
- ✅ Created `.env.example` files in both frontend and backend directories
- ✅ Added environment variables for PostHog, RevenueCat, Firestore, GCS, AI APIs, etc.
- ✅ Set up dotenv configuration for both projects
- ✅ Added comprehensive `.gitignore` file to ignore `.env` files and other artifacts
- ✅ Created `config/` folders with TypeScript configuration loaders
- ✅ Added type-safe configuration interfaces with validation
- ✅ Tested configuration loading in both projects
- ✅ Updated documentation in CLAUDE.md

**Files Created/Modified**:
- `/frontend/.env.example` (frontend environment variables template)
- `/backend/.env.example` (backend environment variables template)
- `/frontend/config/index.ts` (frontend configuration loader)
- `/backend/config/index.ts` (backend configuration loader)
- `/.gitignore` (comprehensive gitignore file)
- `/CLAUDE.md` (updated with environment configuration documentation)

### User Story 1.6 — Dockerize Frontend and Backend Projects
**Status**: ✅ Complete (Backend Only)

**Completed Work**:
- ✅ Created `backend/Dockerfile` for Hono development environment  
- ✅ Set up `docker-compose.yml` with backend service configuration
- ✅ Fixed Yarn 4 workspace structure in Docker containers
- ✅ Updated containers to use correct Yarn version (4.0.2)
- ✅ Configured port exposures (backend:8787)
- ✅ Set up volume mounts for development hot-reloading
- ✅ Updated documentation for Docker backend + native frontend approach

**Files Created/Modified**:
- `/backend/Dockerfile` (Hono container configuration)
- `/docker-compose.yml` (backend-only container orchestration)
- `/README.md` (Updated for React Native + Docker backend setup)

### User Story 1.4 — Add Basic Yarn 4 Workspaces and Volta Configuration
**Status**: ✅ Complete

### User Story 1.3 — Configure ESLint and Prettier with TypeScript Support
**Status**: In Progress - ESLint configuration needs debugging
**Note**: ESLint packages are installed but configuration conflicts need resolution

### User Story 2.1 — Scaffold React Native App with TypeScript Template
**Status**: ✅ Complete

**Completed Work**:
- ✅ Replaced Next.js frontend with React Native Expo app
- ✅ Initialized app with TypeScript template using Expo SDK 53 (latest)
- ✅ Configured app to render basic Text elements via ThemedText components
- ✅ Verified app compiles and runs with TypeScript support (`npx tsc --noEmit`)
- ✅ Integrated with existing Yarn 4 workspace structure
- ✅ Updated root package.json scripts for Expo development workflow
- ✅ Updated documentation for React Native development workflow
- ✅ Removed Docker configuration for frontend (not needed for React Native)

**Files Created/Modified**:
- `/frontend/` (Complete React Native Expo app with TypeScript)
- `/frontend/package.json` (Updated workspace name and dependencies)
- `/package.json` (Updated root scripts for Expo development)
- `/README.md` (Updated for React Native development)
- `/CLAUDE.md` (Updated architecture and development commands)
- `/frontend-nextjs-backup/` (Backup of original Next.js frontend)