import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./lib/i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export const config = {
  // Exclude /admin, API routes, Next.js internals, and static files
  matcher: ["/((?!admin|api|_next|_vercel|.*\\..*).*)"],
};
