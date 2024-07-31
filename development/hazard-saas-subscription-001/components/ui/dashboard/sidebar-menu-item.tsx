import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BsChevronRight, BsChevronDown } from 'react-icons/bs';
import { SideNavItem } from '@/types/types';

interface SideBarMenuItemProps {
  item: SideNavItem;
  toggleCollapse: boolean;
}

const SideBarMenuItem: React.FC<SideBarMenuItemProps> = ({ item, toggleCollapse }) => {
  const navMenuDropdownItem = 'text-gray-400 pl-2 pr-4 hover:text-gray-200 transition duration-200 cursor-pointer';
  const linkStyle = 'flex items-center min-h-10 h-full text-gray-400 py-2 px-4 hover:text-gray-200 rounded-md transition duration-200';
  const activeLink = 'rounded-md text-gray-200 bg-gray-700';
  const pathName = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleSubMenu = (title: string) => {
    if (activeItem === title) {
      setSubMenuOpen(!subMenuOpen);
      if (!subMenuOpen) setActiveItem(null);
    } else {
      setSubMenuOpen(true);
      setActiveItem(title);
    }
  };

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (item.onClick) {
      e.preventDefault();
      await item.onClick();
    }
  };

  return (
    <>
      {item.submenu ? (
        <div className="mb-2">
          <div
            className={`${linkStyle} ${activeItem === item.title && subMenuOpen ? activeLink : ''}`}
            onClick={() => toggleSubMenu(item.title)}
          >
            {item.icon}
            {!toggleCollapse && (
              <>
                <span className="ml-3 text-base leading-6 font-semibold cursor-pointer">
                  {item.title}
                </span>
                {subMenuOpen && activeItem === item.title ? (
                  <BsChevronDown className="ml-auto text-xs cursor-pointer" />
                ) : (
                  <BsChevronRight className="ml-auto text-xs cursor-pointer" />
                )}
              </>
            )}
          </div>
          {subMenuOpen && !toggleCollapse && activeItem === item.title && (
            <div className="pl-4">
              <div className="grid gap-y-2 py-3 leading-5">
                {item.subMenuItems &&
                  item.subMenuItems.map((subItem, indx) => (
                    <Link key={indx} href={subItem.path} passHref>
                      <div className={navMenuDropdownItem}>
                        <span>{subItem.title}</span>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link
          href={item.path}
          passHref
          className={`${linkStyle} ${item.path === pathName || activeItem === item.title ? activeLink : ''} mb-2`}
          onClick={item.onClick ? handleClick : () => setActiveItem(item.title)}
        >
          {item.icon}
          {!toggleCollapse && (
            <span className="ml-3 leading-6 font-semibold">{item.title}</span>
          )}
        </Link>
      )}
    </>
  );
};

export default SideBarMenuItem;
