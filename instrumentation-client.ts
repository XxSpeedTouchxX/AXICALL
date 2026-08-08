import * as Sentry from "@sentry/nextjs";

// Without NEXT_PUBLIC_SENTRY_DSN set, dsn is undefined and the SDK becomes a
// no-op — safe to run in dev/CI without a Sentry account (see .env.example).
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
