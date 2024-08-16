import { AppShell, ScrollArea, Group, Code } from '@mantine/core';
import Link from 'next/link';
import classes from './NavigationSection.module.css';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconUser,
  IconBuildingCommunity,
} from '@tabler/icons-react';
import { useState } from 'react';

interface LinkInterface {
  link: string;
  label: string;
  icon: any;
}

const links: LinkInterface[] = [
  { link: '/main/contacts', label: 'Contact', icon: IconUser },
  { link: '/main/organizations', label: 'Organization', icon: IconBuildingCommunity },
  { link: '', label: 'Security', icon: IconFingerprint },
  { link: '', label: 'SSH Keys', icon: IconKey },
  { link: '', label: 'Databases', icon: IconDatabaseImport },
  { link: '', label: 'Authentication', icon: Icon2fa },
  { link: '', label: 'Other Settings', icon: IconSettings },
];

export default function MainNavigationShellNavbar() {
  const [active, setActive] = useState('/main/contacts');
  const navBarLink = links.map((item) => (
    <Link
      className={classes.link}
      data-active={item.link === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event: any) => {
        setActive(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));
  return (
    <AppShell.Navbar className={classes.navbar} p="lg">
      <AppShell.Section>
        <div>
          <Group className={classes.header} justify="space-between">
            Welcome! Michael
            {/* <MantineLogo size={28} inverted style={{ color: 'white' }} /> */}
            <Code fw={700} className={classes.version}>
              v3.1.2
            </Code>
          </Group>
        </div>
      </AppShell.Section>
      <AppShell.Section grow component={ScrollArea}>
        {navBarLink}
      </AppShell.Section>
      <AppShell.Section>
        <div className={classes.footer}>
          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <span>Change account</span>
          </a>

          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </div>
      </AppShell.Section>
    </AppShell.Navbar>
  );
}
