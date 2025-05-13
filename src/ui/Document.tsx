export interface DocumentProps {
  title: string;

  children: React.ReactNode;
}

export async function Document(props: DocumentProps) {
  return (
    <html
      lang="en"
      // data-seed
      // data-seed-user-color-scheme="light"
      // data-seed-color-mode="system"
    >
      <head>
        <title>{props.title}</title>
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
      <body>{props.children}</body>
    </html>
  );
}
