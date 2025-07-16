import { config } from 'dotenv';

// Load environment variables from .env file
config();

export interface AppConfig {
  firebase: {
    projectId: string;
    privateKey: string;
    clientEmail: string;
    databaseUrl: string;
  };
  revenuecat: {
    key: string;
  };
  posthog: {
    apiKey: string;
    host: string;
  };
  gcs: {
    bucketName: string;
    projectId: string;
  };
  cloudflare: {
    accountId: string;
    apiToken: string;
  };
  ai: {
    apiKey: string;
    apiUrl: string;
  };
  app: {
    env: string;
    nodeEnv: string;
    port: number;
  };
  security: {
    jwtSecret: string;
    encryptionKey: string;
  };
  database: {
    url: string;
  };
  features: {
    enableAnalytics: boolean;
    enableTelemetry: boolean;
    enableDebugLogging: boolean;
  };
}

function getRequiredEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Required environment variable ${key} is not defined`);
  }
  return value;
}

function getOptionalEnvVar(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}

function getBooleanEnvVar(key: string, defaultValue: boolean): boolean {
  const value = process.env[key];
  if (!value) return defaultValue;
  return value.toLowerCase() === 'true';
}

function getNumberEnvVar(key: string, defaultValue: number): number {
  const value = process.env[key];
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

export const appConfig: AppConfig = {
  firebase: {
    projectId: getRequiredEnvVar('FIREBASE_PROJECT_ID'),
    privateKey: getRequiredEnvVar('FIREBASE_PRIVATE_KEY'),
    clientEmail: getRequiredEnvVar('FIREBASE_CLIENT_EMAIL'),
    databaseUrl: getRequiredEnvVar('FIREBASE_DATABASE_URL'),
  },
  revenuecat: {
    key: getRequiredEnvVar('REVENUECAT_KEY'),
  },
  posthog: {
    apiKey: getRequiredEnvVar('POSTHOG_API_KEY'),
    host: getOptionalEnvVar('POSTHOG_HOST', 'https://app.posthog.com'),
  },
  gcs: {
    bucketName: getRequiredEnvVar('GCS_BUCKET_NAME'),
    projectId: getRequiredEnvVar('GCS_PROJECT_ID'),
  },
  cloudflare: {
    accountId: getRequiredEnvVar('CLOUDFLARE_ACCOUNT_ID'),
    apiToken: getRequiredEnvVar('CLOUDFLARE_API_TOKEN'),
  },
  ai: {
    apiKey: getRequiredEnvVar('AI_API_KEY'),
    apiUrl: getRequiredEnvVar('AI_API_URL'),
  },
  app: {
    env: getOptionalEnvVar('NODE_ENV', 'development'),
    nodeEnv: getOptionalEnvVar('NODE_ENV', 'development'),
    port: getNumberEnvVar('PORT', 8787),
  },
  security: {
    jwtSecret: getRequiredEnvVar('JWT_SECRET'),
    encryptionKey: getRequiredEnvVar('ENCRYPTION_KEY'),
  },
  database: {
    url: getRequiredEnvVar('DATABASE_URL'),
  },
  features: {
    enableAnalytics: getBooleanEnvVar('ENABLE_ANALYTICS', true),
    enableTelemetry: getBooleanEnvVar('ENABLE_TELEMETRY', false),
    enableDebugLogging: getBooleanEnvVar('ENABLE_DEBUG_LOGGING', true),
  },
};

export default appConfig;