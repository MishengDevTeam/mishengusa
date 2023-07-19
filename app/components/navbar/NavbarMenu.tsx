import Link from 'next/link';
import NavbarUserMenu from './NavbarUserMenu';

interface NavbarMenuProps {
  menuOpen: boolean;
  handleMenu: () => void;
}

const NavbarMenu: React.FC<NavbarMenuProps> = ({ menuOpen, handleMenu }) => {
  return (
    <div className='flex justify-end w-[140px]'>
      <Link
        href={'/'}
        className='hidden md:block text-xl font-light hover:text-[#EC662A] transition'
      >
        顾客服务
      </Link>
      <NavbarUserMenu menuOpen={menuOpen} handleMenu={handleMenu} />
    </div>
  );
};
export default NavbarMenu;
