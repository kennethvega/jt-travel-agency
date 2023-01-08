import React from 'react';
import { NavLink } from 'react-router-dom';
import { SidebarItemProps } from './sidebarType';

const SidebarItem = ({ item }: SidebarItemProps) => {
  //active menu style
  const activeLink = ({ isActive }: any) =>
    isActive ? ' text-white bg-[#161A21] flex items-center gap-3 p-2 rounded-lg cursor-pointer xmd:justify-center xsm:px-0' : 'flex items-center gap-3 hover:bg-gray-200 p-2 rounded-lg cursor-pointer xmd:justify-center xsm:px-0';
  return (
    <NavLink to={item.path} className={activeLink}>
      {item.icon}
      <span className="xmd:hidden">{item.title}</span>
    </NavLink>
  );
};

export default SidebarItem;
