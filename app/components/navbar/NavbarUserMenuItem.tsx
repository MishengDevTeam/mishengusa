import Link from 'next/link';

interface NavbarUserMenuItemProps {
  label: string;
  url: string;
  handleMenu: () => void;
}

const NavbarUserMenuItem: React.FC<NavbarUserMenuItemProps> = ({
  label,
  url,
  handleMenu,
}) => {
  return (
    <Link
      onClick={handleMenu}
      href={`/${url}`}
      className='py-4 border-t border-neutral-300 hover:text-[#EC662A]'
    >
      {label}
    </Link>
  );
};
export default NavbarUserMenuItem;
