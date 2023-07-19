'use client';

import { MdMenu, MdOutlineClose } from 'react-icons/md';

interface NavbarUserMenuProps {
  menuOpen: boolean;
  handleMenu: () => void;
}

const NavbarUserMenu: React.FC<NavbarUserMenuProps> = ({
  menuOpen,
  handleMenu,
}) => {
  return (
    <>
      <div
        onClick={handleMenu}
        className='flex md:hidden relative border border-neutral-700 py-1 px-2 sm:py-2 sm:px-4 cursor-pointer rounded-l-full rounded-r-full'
      >
        {menuOpen ? <MdOutlineClose size={30} /> : <MdMenu size={30} />}
      </div>
    </>
  );
};
export default NavbarUserMenu;
