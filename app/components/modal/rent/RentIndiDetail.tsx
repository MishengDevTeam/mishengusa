'use client';

import { SEARCH_OPTIONS } from '@/types/RentTypes';

interface RentDetailProps {
  title: string;
  category: string;
  broker: string;
  utility: string;
}

const RentIndiDetail: React.FC<RentDetailProps> = ({
  title,
  category,
  broker,
  utility,
}) => {
  const getLabel = (key: keyof typeof SEARCH_OPTIONS, value: string) => {
    const option = SEARCH_OPTIONS[key].find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const commonCSS = `flex justify-center items-center py-1 px-2 border-[1px] border-[#EC662A] rounded-full font-light text-[12px] sm:text-sm md:text-base`;

  return (
    <div className='flex flex-col gap-2'>
      <div className='font-semibold text-lg'>{title}</div>
      <div className='grid grid-cols-3 gap-x-2 gap-y-1'>
        <div className={commonCSS}>{getLabel('category', category)}</div>
        <div className={commonCSS}>{getLabel('broker', broker)}</div>
        <div className={commonCSS}>{getLabel('utility', utility)}</div>
      </div>
    </div>
  );
};
export default RentIndiDetail;
