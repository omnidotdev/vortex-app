/**
 * Flag configuration for local development.
 */
export interface FlagConfig {
  variants: Record<string, boolean | string | number>;
  defaultVariant: string;
}

/**
 * Default flag values for local development.
 * These are used when running in development mode or when GrowthBook is unavailable.
 */
export const defaultFlags: Record<string, FlagConfig> = {
  "vortex-maintenance": {
    variants: {
      on: true,
      off: false,
    },
    defaultVariant: "off",
  },
};

/**
 * Flag keys used in the application.
 * Use these constants to avoid typos in flag key strings.
 */
export const FLAGS = {
  MAINTENANCE: "vortex-maintenance",
} as const;
