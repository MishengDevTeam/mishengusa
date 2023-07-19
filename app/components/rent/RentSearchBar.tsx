'use client';

import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';

import { SEARCH_OPTIONS } from '@/types/RentTypes';
import axios from 'axios';
import { useState } from 'react';
import SearchSelect from '../input/search/SearchSelect';
import SearchButton from '../input/search/SearchButton';

interface SearchBarProps {
  isSearchOn: boolean;
  setSearchListings: any;
  // setMapListings: any;
  setIsSearchOn: (setIsSearchOn: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  isSearchOn,
  setSearchListings,
  // setMapListings,
  setIsSearchOn,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { handleSubmit, setValue, reset } = useForm<FieldValues>({
    defaultValues: {
      rentMinPrice: null,
      bed: null,
      bath: null,
      category: null,
      subway: null,
      review: null,
      broker: null,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      axios
        .post(`/api/rentlisting`, { rentOption: data })
        .then((response) => {
          setSearchListings?.(response.data.searchedListing);
          // setMapListings?.(response.data.searchedMapListing);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsSearchOn(!isSearchOn);
          setIsLoading(false);
          reset();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return isSearchOn ? (
    <div
      className={`absolute flex justify-end h-[120px] 2xl:h-[86px] items-center h-auto w-full top-0 bg-white shadow-md`}
    >
      <div className='grid w-full grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7 2xl:gap-1 py-4 justify-end items-center pl-[68px] md:pl-[80px] pr-[10px] gap-2 md:gap-x-4 md:gap-y-2 xl:gap-x-2'>
        <div className='relative flex items-center justify-center w-auto h-[50px] 2xl:h-[40px]'>
          <input
            type='number'
            id='rentMinPrice'
            onChange={(value) => {
              setCustomValue('rentMinPrice', value.target.value);
            }}
            min={500}
            max={30000}
            step={100}
            placeholder='预算'
            className='relative w-full h-full border-[1px] border-neutral-300 h-[36px] rounded-md py-1 px-4 text-sm text-end'
          />
          <label
            htmlFor='rentMinPrice'
            className='absolute 2xl:top-2 top-3 2xl:left-2 left-3'
          >
            $
          </label>
        </div>
        <SearchSelect
          placeholder={'卧室'}
          options={SEARCH_OPTIONS.bed}
          onChange={(value) => {
            setCustomValue('bed', value);
          }}
        />
        <SearchSelect
          placeholder={'浴室'}
          options={SEARCH_OPTIONS.bath}
          onChange={(value) => setCustomValue('bath', value)}
        />
        <SearchSelect
          placeholder={'中介费'}
          options={SEARCH_OPTIONS.broker}
          onChange={(value) => setCustomValue('broker', value)}
        />
        <SearchSelect
          placeholder={'地铁'}
          disabled
          multiple
          options={SEARCH_OPTIONS.subway}
          onChange={(value) => setCustomValue('subway', value)}
        />
        <SearchSelect
          placeholder={'评价'}
          disabled
          lastItemToHide
          options={SEARCH_OPTIONS.review}
          onChange={(value) => setCustomValue('review', value)}
        />
        <SearchButton
          disabled={isLoading}
          label='搜索'
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  ) : null;
};
export default SearchBar;
