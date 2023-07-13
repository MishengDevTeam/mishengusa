import Image from 'next/image';
import Link from 'next/link';
import { SERVICE_MENU } from '@/types/MainTypes';
import NavbarMenu from './NavbarMenu';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <nav className='py-4 px-8 shadow-md'>
      <div className='flex justify-between items-center w-full max-w-[1920px] h-[60px]'>
        <Link href='/' className='w-[140px]'>
          <Image
            className='hidden sm:block'
            width={140}
            height={40}
            src={'/assets/images/logo/hori.png'}
            alt={'logo'}
          />
          <Image
            className='block sm:hidden'
            width={80}
            height={80}
            src={'/assets/images/logo/square.png'}
            alt={'logo'}
          />
        </Link>
        <div className='hidden md:flex gap-8'>
          {SERVICE_MENU.map((item) => (
            <Link
              key={SERVICE_MENU.indexOf(item)}
              href={`/${item.url}`}
              className='text-xl font-light hover:text-[#EC662A] transition'
            >
              {item.label}
            </Link>
          ))}
        </div>
        <NavbarMenu />
      </div>
    </nav>
  );
};
export default Navbar;
