import Image from 'next/image';

interface MainBannerImageProps {}

const MainBannerImage: React.FC<MainBannerImageProps> = ({}) => {
  const mainText = `返现300`;
  return (
    <div className='hidden md:block w-full h-[360px] relative overflow-hidden'>
      <Image
        src={`https://misaeng.s3.amazonaws.com/asset/img/main-1.png`}
        fill
        sizes='200'
        priority
        alt='mainbanner'
        className='object-cover h-full w-full brightness-75'
      />
      <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center cursor-default'>
        <h1 className='text-base md:text-2xl lg:text-4xl text-white tracking-wider font-black'>
          {mainText}
        </h1>
      </div>
    </div>
  );
};
export default MainBannerImage;
