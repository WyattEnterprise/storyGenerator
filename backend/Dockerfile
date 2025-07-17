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

# Copy backend source code
COPY backend/ ./backend/

# Expose port for development server
EXPOSE 8787

# Run development server using workspace command
CMD ["yarn", "workspace", "story-generator-backend", "dev"]