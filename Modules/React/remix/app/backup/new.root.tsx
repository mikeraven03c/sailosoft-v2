import { Links, Meta, Outlet } from "@remix-run/react";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Remix App</title>
        <Links />
        <Meta />
      </head>
      <body>
        <Outlet />
      </body>
    </html>
  );
}