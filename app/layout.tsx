// Root layout is intentionally minimal.
// app/[locale]/layout.tsx provides <html>, <body>, fonts, and all providers.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
