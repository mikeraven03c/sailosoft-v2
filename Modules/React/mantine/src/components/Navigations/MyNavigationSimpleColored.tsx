import { useState } from 'react';
import Link from 'next/link';
import { Group, Code, NavLink } from '@mantine/core';
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
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './NavbarSimpleColored.module.css';

const data = [
  { link: '/main/contacts', label: 'Contact', icon: IconUser },
  { link: '/main/organizations', label: 'Organization', icon: IconBuildingCommunity },
  { link: '', label: 'Security', icon: IconFingerprint },
  { link: '', label: 'SSH Keys', icon: IconKey },
  { link: '', label: 'Databases', icon: IconDatabaseImport },
  { link: '', label: 'Authentication', icon: Icon2fa },
  { link: '', label: 'Other Settings', icon: IconSettings },
];

export function MyNavbarSimpleColored() {
  // const currentPath = window.location.pathname;
  const [active, setActive] = useState('/main/contacts');

  const handleClick = (href: any) => {
    setActive(href);
  };

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={item.link === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        handleClick(item.link);
        // event.preventDefault();
        // setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      {/* <NavLink
        href={item.link}
        key={item.label}
        label={item.label}

      /> */}
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          Welcome! Michael
          {/* <MantineLogo size={28} inverted style={{ color: 'white' }} /> */}
          <Code fw={700} className={classes.version}>
            v3.1.2
          </Code>
        </Group>
        {links}
      </div>

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
    </nav>
  );
}
