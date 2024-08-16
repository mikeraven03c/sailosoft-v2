'use client';
import { useState } from 'react';
import { AppShell, Burger, Button, ScrollArea, Group, Autocomplete } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconGauge, IconFingerprint, IconActivity, IconChevronRight } from '@tabler/icons-react';
import { Box, NavLink, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import classes from './HeaderSearch.module.css';
import { MyNavigation } from './../../components/Navigations/MyNavigation';
import { Logo } from './Logo';
import { MyNavbarSimpleColored } from '@/src/components/Navigations/MyNavigationSimpleColored';
import MainNavigationShellNavbar from '@/src/components/Navigations/main/NavigationSection';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const links = [
    { link: '/about', label: 'Features' },
    { link: '/pricing', label: 'Pricing' },
    { link: '/learn', label: 'Learn' },
    { link: '/community', label: 'Community' },
  ];

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));
  // height: rem(700px);
  // width: ;
  return (
    <AppShell
      layout="alt"
      header={{ height: 48 }}
      navbar={{
        width: { sm: 200, lg: 300 },
        // width: { sm: rem(300), lg: rem(300) },
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      withBorder={true}
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      {/* Header */}
      <AppShell.Header>
        <header className={classes.header}>
          <div className={classes.inner}>
            <Group>
              <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
              <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
              <div>Sailosoft Next React</div>
              {/*  */}
              {/* <MantineLogo size={28} /> */}
            </Group>

            <Group>
              <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
                {items}
              </Group>
              <Autocomplete
                className={classes.search}
                placeholder="Search"
                leftSection={
                  <IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
                data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
                visibleFrom="xs"
              />
            </Group>
          </div>
        </header>
      </AppShell.Header>

      {/* Navigation Bar */}

      {/* <NavigationBar></NavigationBar> */}
      <MainNavigationShellNavbar />
      {/* <NavigationBarDefault></NavigationBarDefault> */}

      {/* Main Content */}
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

/** Navigation */
/* eslint-disable */
function getNavigationData() {
  return [
    { label: 'Organization', href: '/main/organizations' },
    { label: 'Contact', href: '/main/contacts' },
  ];
}

function NavigationBar() {
  return (
    <AppShell.Navbar>
      <AppShell.Section grow component={ScrollArea}>
        <MyNavbarSimpleColored></MyNavbarSimpleColored>
      </AppShell.Section>
    </AppShell.Navbar>
  );
}

function NavigationBarDefault() {
  return (
    <AppShell.Navbar p="lg">
      <AppShell.Section>Navbar header</AppShell.Section>
      <AppShell.Section grow component={ScrollArea}>
        <MyNavLink></MyNavLink>
      </AppShell.Section>
      <AppShell.Section>Navbar footer – always at the bottom</AppShell.Section>
    </AppShell.Navbar>
  );
}

function MyNavLink() {
  // const [active, setActive] = useState(0);
  const data = getNavigationData();

  const items = data.map((item, index) => (
    <NavLink href={item.href} key={item.label} label={item.label} />
  ));

  return <Box w={220}>{items}</Box>;
}
