'use client';

import Image from 'next/image';
import { MdEmail, MdPhone, MdTextsms } from 'react-icons/md';
import {
  RiAlarmWarningLine,
  RiKakaoTalkFill,
  RiWechatFill,
} from 'react-icons/ri';
import { useRouter } from 'next/navigation';

interface pageProps {}

const CustomerServicePage: React.FC<pageProps> = ({}) => {
  const router = useRouter();
  return (
    <div className='relative pt-[64px] sm:pt-[94px]'>
      <div className='flex p-8 justify-center'>
        <div className='flex w-full max-w-[1860px] shadow-xl rounded-lg lg:rounded-l-full lg:rounded-r-full border-2 border-neutral-200'>
          <div className='relative flex items-center justify-center lg:justify-end w-full lg:w-3/4 lg:h-[540px] bg-white rounded-l-full'>
            <div className='flex flex-col items-center justify-center lg:justify-end w-full sm:flex-row gap-[4vw] lg:pr-[10vw] p-8'>
              <div className='flex-col flex sm:hidden md:flex items-center justify-center text-lg 2xl:text-2xl w-[240px]'>
                <div className='w-[85px] h-auto flex flex-col mb-8'>
                  <div className='flex flex-row justify-center'>
                    <div className='w-[9px] h-[9px] bg-[#EC662A] rounded-full'></div>
                    <div className='w-[100%]'></div>
                    <div className='w-[9px] h-[9px] bg-[#EC662A] rounded-full'></div>
                  </div>
                  <div className='w-[100%] h-[42px] border-b-2 border-l-2 border-r-2 border-[#EC662A] rounded-b-full mt-4'></div>
                </div>

                <p className='text-center'>
                  <span className='text-[#EC662A] font-bold'>
                    桥接异国，点亮梦想
                  </span>
                  <br />
                  <span className='text-[#EC662A] font-bold text-[28px]'>
                    米生
                  </span>
                  为同学们
                  <br />
                  在异乡的生活
                  <br />
                  提供
                  <span className='text-[#EC662A] font-bold'>服务与帮助</span>
                </p>
              </div>
              <div className='flex flex-col items-center font-light'>
                <p className='text-center'>
                  微信添加方式：
                  <br className='sm:hidden' />
                  截图后请扫描二维码
                </p>
                <Image
                  width={240}
                  height={360}
                  src={'/assets/images/img/qr_img.png'}
                  alt={'qr'}
                />
              </div>
              <div className='w-full max-w-[200px] flex flex-col'>
                <div className='w-full h-full flex flex-col items-center justify-center gap-4 py-2'>
                  {/* <div className='flex w-[320px] sm:w-[200px] h-[60px] items-center justify-center w-full bg-[#EC662A] text-[#FFF] py-2 rounded-full gap-2'>
                    +1 914 294 8785
                  </div> */}
                  <a
                    href='tel:9142948785'
                    className='flex w-[320px] sm:w-[200px] h-[60px] items-center justify-center w-full bg-green-400 text-[#FFF] py-2 rounded-full gap-2'
                  >
                    <MdPhone size={20} />
                    <p>致电请点这里～</p>
                  </a>
                  <a
                    href={`sms:9142948785`}
                    className='flex w-[320px] sm:w-[200px] h-[60px] items-center justify-center w-full bg-blue-400 text-[#FFF] py-2 rounded-full gap-2'
                  >
                    <MdTextsms size={20} />
                    <span>短信请点这里～</span>
                  </a>
                  {/* <button
                    onClick={() => {
                      router.push('weixin://dl/chat?cosHL0');
                    }}
                    className='flex w-[320px] sm:w-[200px] h-[60px] items-center justify-center w-full bg-[#1ECD18] text-[#FFF] py-2 rounded-full gap-2'
                  >
                    <RiWechatFill size={24} />
                    <span>微信请点这里～</span>
                  </button> */}
                </div>
              </div>
            </div>
            <div className='absolute hidden lg:flex justify-center items-center lg:w-[200px] lg:h-[200px] xl:w-[220px] xl:h-[220px] 2xl:w-[280px] 2xl:h-[280px] bg-white rounded-full translate-x-1/2 border-4 border-[#EC662A] shadow-xl'>
              <Image
                width={160}
                height={120}
                src={'/assets/images/logo/square.png'}
                className='lg:w-[120px] lg:h-[120px] xl:w-[160px] xl:h-[160px] 2xl:w-[200px] 2xl:h-[200px]'
                alt={'lg'}
              />
            </div>
          </div>

          <div className='hidden lg:block lg:w-1/4 h-full'>
            <Image
              className='rounded-r-full overflow-hidden'
              width={720}
              height={540}
              style={{ width: '100%', height: '100%' }}
              src={'https://misaeng.s3.amazonaws.com/asset/img/cs_bn.png'}
              alt={'banner'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerServicePage;
