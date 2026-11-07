export const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(self), microphone=(self), geolocation=(self), payment=()",
  // Allow Lovable's embedded preview; disallow embedding by unrelated origins.
  "Content-Security-Policy": "frame-ancestors 'self' https://lovable.dev https://*.lovable.dev https://lovable.app https://*.lovable.app; object-src 'none'; base-uri 'self'",
};
