import { FOOTER_MENU } from '@/types/MainTypes';
import Image from 'next/image';
import Link from 'next/link';

interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className='flex flex-col items-center justify-between w-full bg-[#FCE1D6] py-8 font-light'>
      <div className='flex flex-col md:flex-row items-center gap-8'>
        {FOOTER_MENU.map((item) => (
          <Link
            href={'/'}
            key={FOOTER_MENU.indexOf(item)}
            className='hover:text-[#EC662A]'
          >
            {item}
          </Link>
        ))}
      </div>
      <div className='flex flex-col items-center gap-4 py-8 cursor-default'>
        <Image
          width={80}
          height={360}
          src={'/assets/images/logo/veri.png'}
          alt={'logo'}
        />
        <p>980 6th Ave, New York, NY 10018</p>
        <p>misheng.dev@gmail.com</p>
      </div>
      <div className='flex justify-center w-full cursor-default'>
        ⓒ 2023, All Rights Reserved. mishengusa.com
      </div>
    </footer>
  );
};
export default Footer;
