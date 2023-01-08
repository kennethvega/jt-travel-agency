import { menu } from './sidebarData';
import logo from '../../assets/JT-tours&travels.jpg';
import SidebarItem from './SidebarItem';
import { SidebarItemProps } from './sidebarType';
const Sidebar = () => {
  return (
    <div className="z-50">
      <div className="fixed flex flex-col gap-10 p-3 xmd:p-0 z-50">
        <>
          <img src={logo} alt="Logo" className="w-16 xmd:w-12" />
          {menu.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </>
      </div>
    </div>
  );
};

export default Sidebar;
