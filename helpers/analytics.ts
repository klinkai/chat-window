import * as Sentry from '@sentry/react';
import posthog from 'posthog-js';

const SENTRY_DSN = process.env.SENTRY_DSN;
const POSTHOG_API_HOST =
  process.env.POSTHOG_API_HOST || 'https://app.posthog.com';
const POSTHOG_TOKEN =
  process.env.POSTHOG_TOKEN || 'cQo4wipp5ipWWXhTN8kTacBItgqo457yDRtzCMOr-Tw';

export const isSentryEnabled = !!SENTRY_DSN;
export const isPostHogEnabled = !!POSTHOG_TOKEN;

export const init = () => {
  if (isSentryEnabled) {
    Sentry.init({dsn: SENTRY_DSN});
  }

  if (isPostHogEnabled) {
    posthog.init(POSTHOG_TOKEN, {
      api_host: POSTHOG_API_HOST,
    });
  }
};

export const capture = (event: string, metadata: Record<any, any> = {}) => {
  console.debug(`[${event}] -`, metadata);

  if (isPostHogEnabled) {
    posthog.capture(event, metadata);
  }
};

export default {
  init,
  capture,
};
