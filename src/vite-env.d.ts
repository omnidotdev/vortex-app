/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_URL: string;
  readonly TEMPORAL_ADDRESS: string;
  readonly TEMPORAL_NAMESPACE: string;
  readonly RESEND_API_KEY: string;
  readonly DATABASE_URL: string;
  readonly NODE_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
