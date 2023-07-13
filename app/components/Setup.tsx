import Image from 'next/image';

interface SetupProps {}

const Setup: React.FC<SetupProps> = ({}) => {
  return (
    <div className='flex flex-col w-full justify-center items-center h-[90vh] md:h-[50vh] pb-8'>
      <Image
        width={720}
        height={480}
        src={'/assets/images/img/setup.png'}
        alt={'logo'}
      />
      <div className='flex flex-col gap-4 justify-center items-center text-lg'>
        <div>开发者正在全力以赴地开发中</div>
      </div>
    </div>
  );
};
export default Setup;
