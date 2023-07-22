import { useEffect, useState } from 'react';
import Map from '../Map';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { TbHomeSearch } from 'react-icons/tb';
import RentSearchBar from './RentSearchBar';
import LoadingScreen from '../LoadingScreen';
import LoadingSpinner from '../LoadingSpinner';

interface MapSectionProps {
  isListingOn: boolean;
  isSearchOn: boolean;
  isLoading: boolean;
  adviceOn: boolean;
  setAdviceOn: (adviceOn: boolean) => void;
  setIsListingOn: (setIsListingOn: boolean) => void;
  setIsSearchOn: (setIsSearchOn: boolean) => void;
  setSearchListings: any;
  mapListings: any;
  setMapListings: any;
}

const MapSection: React.FC<MapSectionProps> = ({
  isLoading,
  isListingOn,
  isSearchOn,
  setIsListingOn,
  setIsSearchOn,
  setSearchListings,
  mapListings,
  setMapListings,
  adviceOn,
  setAdviceOn,
}) => {
  const mapStyleCommon = `h-[74vh] sm:h-[90vh]`;

  return (
    <div
      className={`relative w-full sm:w-[50%] ${
        isListingOn ? 'hidden' : 'block'
      } ${mapStyleCommon}`}
    >
      <Map
        initCoordinate={[-74.0085514, 40.7127503]}
        mapStyleCommon={mapStyleCommon}
        mapListings={mapListings}
        setSearchListings={setSearchListings}
        setIsListingOn={setIsListingOn}
        rentmain
      />
      <RentSearchBar
        isSearchOn={isSearchOn}
        setIsSearchOn={setIsSearchOn}
        setSearchListings={setSearchListings}
        setMapListings={setMapListings}
      />
      <div
        onClick={() => setIsSearchOn(!isSearchOn)}
        className={`absolute flex justify-center items-center h-[48px] bg-[#EC662A] left-3 md:left-5 top-3 md:top-5 rounded-full border-[2px] border-[#FFFFFF] bg-[#EC662A] gap-1 cursor-pointer
      ${isSearchOn ? 'w-[48px]' : 'w-[108px]'}
      `}
      >
        {isSearchOn ? (
          <IoClose size={24} color='#fff' />
        ) : (
          <TbHomeSearch size={24} color='#fff' />
        )}
        {isSearchOn ? (
          ''
        ) : (
          <p className='text-[#fff] text-sm sm:text-base'>搜索房源</p>
        )}
      </div>
    </div>
  );
};
export default MapSection;
