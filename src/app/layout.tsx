import "../client";

export async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      // data-seed
      // data-seed-user-color-scheme="light"
      // data-seed-color-mode="system"
    >
      <head>
        <title>test</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <link
          rel="shortcut icon"
          href="data:image/x-icon;,"
          type="image/x-icon"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
