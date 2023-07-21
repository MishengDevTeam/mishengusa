interface RentSpecialProps {
  special: string;
}

const RentSpecial: React.FC<RentSpecialProps> = ({ special }) => {
  return (
    <div className='flex flex-col items-center justify-center w-full border border-dashed border-[#EC662A] rounded-xl p-3'>
      <p className='font-bold text-[#EC662A]'>SPECIAL OFFER !!</p>
      <p className='text-sm font-light'>{special}</p>
    </div>
  );
};
export default RentSpecial;
