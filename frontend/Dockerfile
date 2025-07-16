FROM node:20-alpine

WORKDIR /app

# Enable corepack for yarn 4
RUN corepack enable

# Copy package files
COPY package.json yarn.lock* ./
COPY .yarnrc.yml ./
COPY .yarn .yarn

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Expose port for Next.js dev server
EXPOSE 3000

# Run development server
CMD ["yarn", "dev"]