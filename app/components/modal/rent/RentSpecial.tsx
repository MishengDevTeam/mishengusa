interface RentSpecialProps {}

const RentSpecial: React.FC<RentSpecialProps> = ({}) => {
  return (
    <div className='flex justify-center w-full border border-dashed border-[#EC662A] rounded-xl p-4 '>
      <p className='font-bold text-[#EC662A]'>SPECIAL OFFER !!</p>
    </div>
  );
};
export default RentSpecial;
