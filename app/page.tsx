'use client';

import { SERVICE_MENU, MAIN_SECTION } from '@/types/MainTypes';
import MainBannerImage from './components/main/MainBannerImage';
import MainPageCard from './components/main/MainPageCard';
import { useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const selectImage = useCallback((idx: number) => {
    switch (idx) {
      case 0:
        return `/assets/images/img/rent.png`;
      case 1:
        return `/assets/images/img/roommate.png`;
      case 2:
        return `/assets/images/img/buysell.png`;
      case 3:
        return `/assets/images/img/blog.png`;
      default:
        break;
    }
  }, []);
  return (
    <main>
      <MainBannerImage />
      <MainPageCard>
        <div className='grid grid-cols-2 sm:grid-cols-4 w-full max-w-[1280px] px-12 justify-evenly gap-2 md:gap-4 lg:gap-8'>
          {SERVICE_MENU.map((item) => (
            <Link
              className={`relative flex justify-center items-center border border-neutral-300 aspect-square w-full rounded-xl text-white`}
              key={SERVICE_MENU.indexOf(item)}
              href={`/${item.url}`}
            >
              <Image
                className='absolute rounded-xl brightness-50'
                fill
                src={selectImage(SERVICE_MENU.indexOf(item))!}
                alt={'gg'}
              />
              <div className='absolute w-full h-full text-white rounded-xl flex justify-center items-center text-2xl font-light p-2 md:p-4'>
                <div className='flex justify-center items-center w-full h-full border-2 hover:border-[#EC662A] hover:text-[#EC662A] rounded-lg'>
                  {item.label}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </MainPageCard>
    </main>
  );
}
