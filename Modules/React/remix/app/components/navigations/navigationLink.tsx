import { NavigationLinkInterface } from "./navigationInterfaces";

import { NavLink as MantineNavLink, Box } from "@mantine/core";
import { NavLink as RemixNavLink } from "@remix-run/react";

export function MyNavigationLink({ navigations }: NavigationLinkInterface) {
  const items = navigations.map((item, index) => (
    item.isNested ?
      (<MantineNavLink
        key={index}
        label={item.label}
        childrenOffset={28}
      >
        <MantineNavLink
          component={RemixNavLink}
          to={item.to}
          label={item.label}
        ></MantineNavLink>
      </MantineNavLink>) : (
        <MantineNavLink
          key={index}
          component={RemixNavLink}
          to={item.to}
          label={item.label}
        ></MantineNavLink>)
  ))

  return <Box w={220}>{items}</Box>;
}
