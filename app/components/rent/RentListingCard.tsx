import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import QueryString from 'query-string';
import Image from 'next/image';
import { SEARCH_OPTIONS } from '@/types/RentTypes';

interface RentListingCardProps {
  listing: any;
  rentIndividualOpen: () => void;
}

const RentListingCard: React.FC<RentListingCardProps> = ({
  listing,
  rentIndividualOpen,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const getLabel = (key: keyof typeof SEARCH_OPTIONS, value: string) => {
    const option = SEARCH_OPTIONS[key].find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const handleClick = useCallback(
    (rentId: string) => {
      let currentQuery = {};

      if (params) {
        currentQuery = QueryString.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        rentlisting: rentId,
      };

      if (params?.get('rentlisting') == rentId) {
        delete updatedQuery.category;
      }

      const url = QueryString.stringifyUrl(
        {
          url: '/rent/',
          query: updatedQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    },
    [params, router]
  );

  return (
    <div
      onClick={() => {
        rentIndividualOpen();
        handleClick((listing as any)._id);
      }}
      key={listing.imageSrc[0]}
      className='p-1 rounded-lg border-[1px] border-neutral-300 cursor-pointer group hover:border-[#EC662A] hover:shadow-lg'
    >
      <div className='w-full relative overflow-hidden rounded-lg'>
        <div className='relative '>
          <Image
            src={
              listing.imageSrc[0] != ''
                ? listing.imageSrc[0]
                : '/assets/images/logo/logo_square_small.png'
            }
            width={0}
            height={0}
            sizes='100%'
            className='aspect-square h-auto rounded-lg object-cover w-full group-hover:scale-110 transition'
            alt='thumbnail'
          />
          <div className='flex absolute top-1 left-1 gap-1'>
            {listing.broker == '중개비 없음' && (
              <div className='flex items-center justify-center w-[50px] h-[20px] bg-[#EC662A]/75 rounded-full z-5 text-[10px] text-white'>
                无中介费
              </div>
            )}
            {listing.special != '' && (
              <div className='flex items-center justify-center w-[50px] h-[20px] bg-[#1E4620]/50 rounded-full z-5 text-[10px] text-white'>
                SPECIAL
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='flex flex-col px-2 mt-1 gap-0'>
        <div className='flex flex-row justify-between'>
          <div className='text-[12px] md:text-sm xl:text-[14px]'>
            {getLabel('category', listing.category)}
          </div>
          <div className='text-[12px] md:text-sm xl:text-[14px]'>
            $ {listing.price.toLocaleString()}
          </div>
        </div>
        <div className='flex flex-row justify-between'>
          <div className='text-[12px] md:text-sm xl:text-[14px]'>
            {listing.bedCount}
          </div>
          <div className='text-[12px] md:text-sm xl:text-[14px]'>
            {listing.bathCount}
          </div>
        </div>
        <div className='text-[12px] md:text-sm xl:text-[14px] text-end'>
          入住时间: {listing.moveDate}
        </div>
      </div>
    </div>
  );
};
export default RentListingCard;
