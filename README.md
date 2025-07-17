# Story Generator

A React Native (Expo) frontend and Hono backend application for generating stories.

## Development Setup

### Prerequisites

- Node.js 20.10.0 (managed by Volta)
- Yarn 4.0.2 (managed by Volta)
- Docker and Docker Compose (for backend only)
- Expo CLI for mobile development

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd storyGenerator
   ```

2. **Set up environment variables**
   ```bash
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   ```

3. **Install dependencies**
   ```bash
   corepack enable  # Enable package manager version management
   yarn install     # Install all workspace dependencies
   ```

4. **Start development services**
   ```bash
   yarn dev
   ```

This will start:
- Frontend (React Native/Expo) - opens Metro bundler and QR code for mobile testing
- Backend (Hono) at http://localhost:8787

### Frontend Development (React Native/Expo)

The frontend is a React Native app built with Expo. It runs natively on your development machine and connects to mobile devices or simulators.

```bash
# Start Expo development server
yarn workspace story-generator-frontend start

# Or from the frontend directory
cd frontend
npx expo start
```

Use the Expo Go app on your phone to scan the QR code, or use iOS Simulator/Android Emulator.

### Backend Development (Docker)

The backend runs in a Docker container for consistent development environment.

```bash
# Start backend only
docker-compose up backend

# View backend logs
docker-compose logs -f backend

# Stop backend
docker-compose down

# Rebuild backend container
docker-compose up --build backend
```

### Development Commands

```bash
# Start all services (recommended)
yarn dev

# Run tests
yarn test

# Run linting
yarn lint

# Run type checking
yarn typecheck

# Format code
yarn format
```

## Architecture

This project uses:
- **Frontend**: React Native with Expo SDK 53, React 19, and TypeScript
- **Backend**: Hono router with TypeScript (runs in Docker)
- **Package Manager**: Yarn 4 with workspaces
- **Tools**: Volta for Node.js version management