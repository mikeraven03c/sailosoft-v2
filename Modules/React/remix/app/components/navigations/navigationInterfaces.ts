export interface NavigationItemInterface {
  label: string,
  to: string,
  icon?: Element
  isNested?: boolean,
  children?: NavigationItemInterface[]
}

export interface NavigationLinkInterface {
  navigations: NavigationItemInterface[]
}
