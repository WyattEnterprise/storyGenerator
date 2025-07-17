import { config } from 'dotenv';

// Load environment variables from .env file
config();

export interface AppConfig {
  firebase: {
    projectId: string;
    apiKey: string;
    authDomain: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
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
  };
  api: {
    baseUrl: string;
    version: string;
  };
  app: {
    env: string;
    nodeEnv: string;
  };
  features: {
    enableAnalytics: boolean;
    enableTelemetry: boolean;
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

export const appConfig: AppConfig = {
  firebase: {
    projectId: getRequiredEnvVar('FIREBASE_PROJECT_ID'),
    apiKey: getRequiredEnvVar('FIREBASE_API_KEY'),
    authDomain: getRequiredEnvVar('FIREBASE_AUTH_DOMAIN'),
    storageBucket: getRequiredEnvVar('FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getRequiredEnvVar('FIREBASE_MESSAGING_SENDER_ID'),
    appId: getRequiredEnvVar('FIREBASE_APP_ID'),
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
  },
  api: {
    baseUrl: getOptionalEnvVar('API_BASE_URL', 'http://localhost:8787'),
    version: getOptionalEnvVar('API_VERSION', 'v1'),
  },
  app: {
    env: getOptionalEnvVar('NEXT_PUBLIC_ENV', 'development'),
    nodeEnv: getOptionalEnvVar('NODE_ENV', 'development'),
  },
  features: {
    enableAnalytics: getBooleanEnvVar('NEXT_PUBLIC_ENABLE_ANALYTICS', true),
    enableTelemetry: getBooleanEnvVar('NEXT_PUBLIC_ENABLE_TELEMETRY', false),
  },
};

export default appConfig;
