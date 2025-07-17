FROM node:20-alpine

WORKDIR /app

# Enable corepack for yarn 4
RUN corepack enable

# Copy workspace configuration
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

# Copy all workspace package.json files
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/

# Install dependencies for entire workspace
RUN yarn install --immutable

# Copy frontend source code
COPY frontend/ ./frontend/

# Expose port for Next.js dev server
EXPOSE 3000

# Run development server using workspace command
CMD ["yarn", "workspace", "story-generator-frontend", "dev"]