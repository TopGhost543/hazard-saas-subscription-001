'use client';

export type SideNavItem = {
    title: string;
    path: string;
    icon?: JSX.Element;
    submenu?: boolean;
    subMenuItems?: SideNavItem[];
    onClick?: () => Promise<void>;
}

export type sideNavItemGroup = {
    title: string,
    menuList: SideNavItem[]
}