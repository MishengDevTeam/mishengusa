'use client';

import Image from 'next/image';
import useRentIndividualModal from '../hooks/useRentIndividualModal';
import RentListingCard from './RentListingCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import {
  MdOutlineKeyboardDoubleArrowDown,
  MdOutlineKeyboardDoubleArrowUp,
} from 'react-icons/md';

interface ListingSectionProps {
  listings: any[];
  rentIndividualOpen: () => void;
  infiniteScrollNext: any;
  totalLength: number;
  isListingOn: boolean;
  searchListings: any[] | null;
  setIsListingOn: (listingStatus: boolean) => void;
  setDefaultListing: () => void;
}

const ListingSection: React.FC<ListingSectionProps> = ({
  infiniteScrollNext,
  listings,
  totalLength,
  rentIndividualOpen,
  isListingOn,
  setIsListingOn,
  setDefaultListing,
  searchListings,
}) => {
  const [windowWidth, setWindowWidth] = useState(0);

  const rentIndiModal = useRentIndividualModal();

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let height;
  if (windowWidth > 640) {
    height = '83vh';
  } else {
    height = isListingOn ? '76vh' : '0vh';
  }

  return (
    <div
      className={`sm:relative flex flex-col w-full sm:w-[50%]
    ${isListingOn ? 'absolute top-0 h-[100vh]' : 'relative bottom-0 h-[106px]'}
    `}
    >
      <div
        onClick={() => setIsListingOn(!isListingOn)}
        className={`flex sm:hidden justify-center items-center w-full py-2 border-[1px] border-neutral-500`}
      >
        {isListingOn ? (
          <div className='flex flex-row w-full h-full items-center justify-center'>
            <span>地图视图</span>
            <MdOutlineKeyboardDoubleArrowDown size={20} />
          </div>
        ) : (
          <div className='flex flex-row items-center'>
            <span>点击打开列表</span>
            <MdOutlineKeyboardDoubleArrowUp size={20} />
          </div>
        )}
      </div>
      <div className='flex flex-row justify-between items-center p-4 shadow-md sm:shadow-none'>
        <div>
          Total{' '}
          {searchListings == null
            ? totalLength
            : searchListings?.length != 0
            ? searchListings?.length
            : `0`}{' '}
          listings
        </div>

        <div
          onClick={setDefaultListing}
          className='cursor-pointer bg-[#EC662A] text-white py-1 px-4 rounded-lg'
        >
          刷新所有房源
        </div>
      </div>
      {searchListings == null ? (
        <InfiniteScroll
          next={infiniteScrollNext}
          hasMore={listings.length < totalLength}
          scrollThreshold={0.95}
          height={height}
          loader={
            <div className='w-full flex justify-center items-center h-[60px] bg-[#F6A484] text-[#FFFFFF] gap-8'>
              刷新中……
            </div>
          }
          dataLength={listings.length}
          endMessage={
            <div className='w-full flex justify-center items-center h-[60px] bg-[#F6A484] text-[#FFFFFF] gap-8'>
              所有房源
            </div>
          }
        >
          <div className='grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-[1960px]:grid-cols-4 min-[2400px]:grid-cols-5 p-2 sm:pt-0 overflow-x-hidden overflow-y-scroll gap-2 items-start'>
            {listings.map((listing) => {
              return (
                <RentListingCard
                  key={listings.indexOf(listing)}
                  listing={listing}
                  rentIndividualOpen={rentIndividualOpen}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      ) : searchListings?.length != 0 ? (
        <div className='h-[76vh] sm:h-[83vh] overflow-y-scroll'>
          <div
            className={`grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-[1960px]:grid-cols-4 min-[2400px]:grid-cols-5 p-4 sm:pt-0 overflow-x-hidden overflow-y-scroll gap-2 items-start sm:h-auto`}
          >
            {searchListings?.map((listing) => (
              <RentListingCard
                key={(listing as any)._id + searchListings.indexOf(listing)}
                rentIndividualOpen={rentIndividualOpen}
                listing={listing}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center w-full h-[20vh] sm:h-full'>
          没有搜索结果
        </div>
      )}
    </div>
  );
};
export default ListingSection;
