'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SERVICE_MENU, USER_MENU_ITEM } from '@/types/MainTypes';
import NavbarMenu from './NavbarMenu';
import { useCallback, useState } from 'react';
import NavbarUserMenuItem from './NavbarUserMenuItem';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  return (
    <>
      <nav className='fixed w-full z-20 bg-[#fff] py-4 px-8 shadow-md top-0'>
        <div className='flex justify-between items-center w-full max-w-[1920px] h-[32px] sm:h-[60px]'>
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
              width={56}
              height={56}
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
          <NavbarMenu menuOpen={menuOpen} handleMenu={handleMenu} />
        </div>
      </nav>
      {menuOpen && (
        <menu className='fixed md:hidden flex flex-col items-center right-0 w-[30vw] max-w-[160px] h-auto bg-white shadow-md rounded-b-lg z-10 top-[64px] sm:top-[94px]'>
          {USER_MENU_ITEM.map((item) => (
            <NavbarUserMenuItem
              key={USER_MENU_ITEM.indexOf(item)}
              label={item.label}
              url={item.url}
              handleMenu={handleMenu}
            />
          ))}
        </menu>
      )}
    </>
  );
};
export default Navbar;
