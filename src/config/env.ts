// Environment configuration
export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    timeout: 10000,
    retries: 3,
  },

  // App Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || 'TrustApp',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment: import.meta.env.VITE_NODE_ENV || 'development',
  },

  // Feature Flags
  features: {
    ai: import.meta.env.VITE_ENABLE_AI_FEATURES === 'true',
    escrow: import.meta.env.VITE_ENABLE_ESCROW === 'true',
    verification: import.meta.env.VITE_ENABLE_VERIFICATION === 'true',
  },

  // External Services
  services: {
    googleMaps: {
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    },
    stripe: {
      publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
    },
    sentry: {
      dsn: import.meta.env.VITE_SENTRY_DSN || '',
    },
  },

  // Analytics
  analytics: {
    googleAnalytics: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || '',
    mixpanel: import.meta.env.VITE_MIXPANEL_TOKEN || '',
  },

  // Social Login
  social: {
    google: {
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    },
    facebook: {
      appId: import.meta.env.VITE_FACEBOOK_APP_ID || '',
    },
  },

  // File Upload
  upload: {
    maxFileSize: parseInt(import.meta.env.VITE_MAX_FILE_SIZE || '10485760'),
    allowedTypes: (import.meta.env.VITE_ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp').split(','),
  },

  // Rate Limiting
  rateLimit: {
    requests: parseInt(import.meta.env.VITE_API_RATE_LIMIT || '100'),
    window: parseInt(import.meta.env.VITE_API_RATE_WINDOW || '60000'),
  },

  // Cache
  cache: {
    ttl: parseInt(import.meta.env.VITE_CACHE_TTL || '300000'),
    enabled: import.meta.env.VITE_ENABLE_CACHE === 'true',
  },
} as const;

// Type definitions for environment variables
export type Config = typeof config;

// Helper functions
export const isDevelopment = () => config.app.environment === 'development';
export const isProduction = () => config.app.environment === 'production';
export const isFeatureEnabled = (feature: keyof typeof config.features) => config.features[feature];
