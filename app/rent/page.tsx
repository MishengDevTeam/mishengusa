'use client';

import { useCallback, useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Setup from '../components/Setup';
import RentIndividualModal from '../components/modal/RentIndividualModal';
import RentListingSection from '../components/rent/RentListingSection';
import RentMapSection from '../components/rent/RentMapSection';
import axios from 'axios';
import useRentIndividualModal from '../components/hooks/useRentIndividualModal';
import useRentNotiModal from '../components/hooks/useRentNotiModal';
import LoadingScreen from '../components/LoadingScreen';

function SearchBarFallback() {
  return <>placeholder</>;
}

const RentPage = ({}) => {
  const hasModalOpened = useRef(false);
  const hasNotiModalOpened = useRef(false);

  const [listings, setListings] = useState<any[]>([]);
  const [start, setStart] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchOn, setIsSearchOn] = useState<boolean>(true);
  const [isListingOn, setIsListingOn] = useState<boolean>(false);
  const [searchListings, setSearchListings] = useState<any[] | null>(null);
  const [mapListings, setMapListings] = useState({});
  const [adviceOn, setAdviceOn] = useState<boolean>(true);

  const rentIndividualModal = useRentIndividualModal();
  const rentNotiModal = useRentNotiModal();

  const fetchData = async (start: string) => {
    try {
      const response = await axios.post(`/api/rentlisting`, {
        start,
      });
      if (Array.isArray(response.data.recentListings)) {
        setListings((prev) => [...prev, ...response.data.recentListings]);
      } else {
        console.error(
          'recentListings is not an array:',
          response.data.recentListings
        );
      }
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setIsLoading(false);
    }
    setStart((parseInt(start) + 20).toString());
  };

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await axios.get(`/api/rentlisting`);
        setMapListings(response.data.mapListing);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMapData();
  }, [rentNotiModal]);

  useEffect(() => {
    fetchData('0');
  }, []);

  const params = useSearchParams();
  const rentlistingid = params?.get('rentlisting');

  const infiniteScrollNext = useCallback(() => {
    fetchData(start.toString());
  }, [start]);

  const setDefaultListing = useCallback(() => {
    location.reload();
  }, []);

  useEffect(() => {
    if (!hasNotiModalOpened.current) {
      rentNotiModal.onOpen();
      hasNotiModalOpened.current = true;
    }
  }, [rentNotiModal]);

  useEffect(() => {
    if (
      !hasModalOpened.current &&
      rentlistingid &&
      rentIndividualModal.onOpen
    ) {
      rentIndividualModal.onOpen();
      hasModalOpened.current = true;
    }
  }, [rentIndividualModal, rentIndividualModal.onOpen, rentlistingid]);

  return (
    <Suspense fallback={<SearchBarFallback />}>
      <section className='w-full top-[64px] sm:top-[94px] relative pb-4 sm:pb-12 mb-12 '>
        <RentIndividualModal />
        <div
          className={`relative flex flex-col sm:flex-row w-full justify-center
      ${isListingOn ? 'h-[88vh]' : ''}
      `}
        >
          <RentMapSection
            isLoading={isLoading}
            isListingOn={isListingOn}
            setIsListingOn={setIsListingOn}
            isSearchOn={isSearchOn}
            adviceOn={adviceOn}
            setAdviceOn={setAdviceOn}
            setIsSearchOn={setIsSearchOn}
            setSearchListings={setSearchListings}
            mapListings={mapListings}
            setMapListings={setMapListings}
          />
          <RentListingSection
            searchListings={searchListings}
            isListingOn={isListingOn}
            setIsListingOn={setIsListingOn}
            setDefaultListing={setDefaultListing}
            listings={listings}
            rentIndividualOpen={rentIndividualModal.onOpen}
            infiniteScrollNext={infiniteScrollNext}
            totalLength={600}
          />
        </div>
      </section>
      {isLoading && <LoadingScreen />}
    </Suspense>
  );
};
export default RentPage;
