// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

// For Type ORM
import "reflect-metadata"

import { AppShell, Button, Group, UnstyledButton, Burger, ColorSchemeScript, MantineProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { MyNavigationLink } from './components/navigations/navigationLink';
import { navigationList } from './configs/navigationConfig';
import { dataSource } from 'database/dataSource/dataSource';


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);



  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>
        {/* <Button onClick={toggleDesktop} visibleFrom="sm">
          Toggle navbar
        </Button>
        <Button onClick={toggleMobile} hiddenFrom="sm">
          Toggle navbar
        </Button> */}
        </AppShell.Header>
      <AppShell.Navbar>
        Nav bar
        <MyNavigationLink navigations={navigationList}/>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}