import React from 'react';
import { sideNavItemGroup } from '@/types/types';
import SideBarMenuItem from './sidebar-menu-item';

interface SideBarMenuGroupProps {
    menuGroup: sideNavItemGroup;
    toggleCollapse: boolean;
}

const SideBarMenuGroup: React.FC<SideBarMenuGroupProps> = ({ menuGroup, toggleCollapse }) => {
    return (
        <>
            <h3 className="py-4 tracking-[].1rem font-medium uppercase text-sm text-[#A5A1AA]">
                {!toggleCollapse ? menuGroup.title : '...'}
            </h3>
            {menuGroup.menuList?.map((item, index) => (
                <SideBarMenuItem key={index} item={item} toggleCollapse={toggleCollapse} />
            ))}
        </>
    );
};

export default SideBarMenuGroup;
