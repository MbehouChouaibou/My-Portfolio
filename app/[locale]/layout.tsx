import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { getPortfolioData } from "@/lib/content";
import { locales } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { profile } = getPortfolioData();
  return {
    title:       { default: profile.name, template: `%s | ${profile.name}` },
    description: profile.bio[0],
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
    ),
    openGraph: {
      type:   "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      title:  profile.name,
      description: profile.bio[0],
    },
    twitter: { card: "summary_large_image", title: profile.name },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);

  const messages = await getMessages();
  const { profile, nav, footer } = getPortfolioData();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${bricolage.variable}`}
    >
      <body className="font-sans bg-background text-foreground antialiased overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          storageKey="portfolio_theme"
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages} locale={locale}>
            <div className="flex min-h-screen">
              <Sidebar locale={locale as Locale} profile={profile} nav={nav} />
              <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
                <main className="flex-1">{children}</main>
                <Footer profile={profile} footer={footer} />
              </div>
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
