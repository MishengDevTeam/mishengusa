import Link from 'next/link';

interface NavbarMenuProps {}

const NavbarMenu: React.FC<NavbarMenuProps> = ({}) => {
  return (
    <div className='flex justify-end w-[140px]'>
      <Link
        href={'/'}
        className='text-xl font-light hover:text-[#EC662A] transition'
      >
        顾客服务
      </Link>
    </div>
  );
};
export default NavbarMenu;
