# Backend

This directory contains the backend application for the Story Generator project.

## Purpose

The backend is responsible for the server-side logic, API endpoints, and business rules of the Story Generator application. It handles story generation, user authentication, data persistence, and integration with external services.

## Entry Point

The main entry point for the backend application is `src/index.ts`.

## Structure

- **src/modules/**: Business logic modules organized by domain
- **src/middlewares/**: Express.js middleware functions
- **src/utils/**: Utility functions and helpers
- **src/types/**: TypeScript type definitions

## Getting Started

1. Install dependencies: `pnpm install`
2. Copy environment variables: `cp .env.example .env`
3. Start development server: `pnpm dev`
4. Backend will be available at [http://localhost:8787](http://localhost:8787)

## Development

This backend follows the feature-first architecture pattern. New features should be developed in the `src/features/` directory structure according to the project guidelines.

## Architecture

The backend is designed to run as Cloudflare Workers with Hono Router for handling HTTP requests and business logic.