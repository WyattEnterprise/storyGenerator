# Story Generator

A Next.js frontend and Hono backend application for generating stories.

## Development with Docker

### Prerequisites

- Docker and Docker Compose installed
- Docker Desktop running (for WSL2 users)

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

3. **Start all services**
   ```bash
   docker-compose up
   ```

This will start:
- Frontend (Next.js) at http://localhost:3000
- Backend (Hono) at http://localhost:8787

### Development Commands

```bash
# Start services in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild containers
docker-compose up --build

# Run commands in containers
docker-compose exec frontend yarn lint
docker-compose exec backend yarn test
```

## Local Development (without Docker)

See [CLAUDE.md](./CLAUDE.md) for local development setup using Node.js and Yarn workspaces.

## Architecture

This project uses:
- **Frontend**: Next.js 14 with React 19 and TypeScript
- **Backend**: Hono router with TypeScript
- **Package Manager**: Yarn 4 with workspaces
- **Tools**: Volta for Node.js version management