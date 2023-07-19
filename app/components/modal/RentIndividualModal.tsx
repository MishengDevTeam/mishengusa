'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useRentIndividualModal from '../hooks/useRentIndividualModal';
import Modal from './Modal';
import RentIndiInfo from './rent/RentIndiInfo';
import RentIndiPicture from './rent/RentIndiPicture';
import { useRouter, useSearchParams } from 'next/navigation';
import dateFormatter from '@/app/lib/dateFormatter';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import RentSpecial from './rent/RentSpecial';
import RentIndiFooterButton from './rent/RentIndiFooterButton';
import { FaRegShareSquare } from 'react-icons/fa';
import { RiAlarmWarningLine } from 'react-icons/ri';

interface RentIndividualModalProps {}

const RentIndividualModal: React.FC<RentIndividualModalProps> = ({}) => {
  const form = useRef<HTMLFormElement>(null);

  const [step, setStep] = useState<number>(1);
  const [buildingInfo, setBuildingInfo] = useState<any>(null);
  const [buildingToSubwayInfo, setBuildingToSubwayInfo] = useState<any>(null);
  const [reviewInfo, setReviewInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [like, setLike] = useState(false);
  const [contact, setContact] = useState('kakao');
  const [currentListing, setCurrentListing] = useState<any | null>(null);

  const rentIndiModal = useRentIndividualModal();

  const params = useSearchParams();
  const rentlistingid = params?.get('rentlisting');
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    if (rentlistingid) {
      axios
        .post(`/api/rentlisting`, {
          rentId: rentlistingid,
        })
        .then((res) => {
          setCurrentListing(res.data.listingInfo[0]);
          setBuildingInfo(res.data.buildingInfo[0]);
          setBuildingToSubwayInfo(res.data.buildingToSubwayInfo);
          setReviewInfo(res.data.reviewInfo);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    }

    // setCurrentListing(response)
  }, [rentlistingid]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('复制成功!');
    } catch (err) {
      toast.error(`Something went wrong!`);
      console.error('Failed to copy text: ', err);
    }
  }, []);

  const reportListing = () => {
    rentIndiModal.onClose();
    // reportModal.onOpen();
  };

  const onCloseButton = () => {
    rentIndiModal.onClose();
    setStep(1);
  };

  if (!currentListing) return null;

  let bodyContent: JSX.Element;

  if (step == 1) {
    bodyContent = (
      <div
        className={`w-full flex flex-col py-1 px-2 h-[60vh] sm:h-[70vh] overflow-x-hidden overflow-y-scroll`}
      >
        <div className='flex justify-between text-xs text-neutral-700 pb-1'>
          <div className='md:text-sm'>
            发布: {dateFormatter(new Date(currentListing.createdAt))}
          </div>
          <div className='md:text-sm'>今天: {dateFormatter(new Date())}</div>
        </div>
        <RentIndiPicture pictures={currentListing.imageSrc} />
        <RentSpecial />
        <RentIndiInfo
          currentListing={currentListing}
          buildingInfo={buildingInfo}
          buildingToSubwayInfo={buildingToSubwayInfo}
          reviewInfo={reviewInfo}
        />
      </div>
    );
  } else if (step == 2) {
    bodyContent = (
      <div className='flex flex-col items-center py-2 gap-2 px-4 h-full'>
        hihi
        {/* <div className='w-full grid grid-cols-2 gap-2 mt-1'>
          <RentIndiContactButton
            label={'이메일'}
            bgColor={'bg-[#3944BC]'}
            icon={MdEmail}
            onClick={() => {
              setContact('email');
            }}
          />
          <RentIndiContactButton
            label={'전화'}
            bgColor={'bg-[#028A0F]'}
            icon={MdPhone}
            onClick={() => {
              setContact('phone');
            }}
          />
          <RentIndiContactButton
            label={'카카오톡'}
            bgColor={'bg-[#FFD800]'}
            icon={RiKakaoTalkFill}
            onClick={() => {
              setContact('kakao');
            }}
          />
        </div>
        {generateContact(contact)} */}
      </div>
    );
  } else {
    bodyContent = <></>;
  }

  let footerContent = (
    <div className='flex flex-col gap-2 w-full h-full px-8'>
      <div className={`flex justify-evenly`}>
        <RentIndiFooterButton
          color='#9DCAEB'
          label='分享'
          onClick={handleCopy}
          icon={FaRegShareSquare}
        />
        <RentIndiFooterButton
          color='#D0342C'
          label='举报'
          onClick={reportListing}
          icon={RiAlarmWarningLine}
        />
      </div>
      <div className='w-full mt-1'>
        {step == 1 ? (
          <button
            onClick={() => {
              setStep(2);
            }}
            className='w-full bg-[#EC662A] py-3 rounded-full text-white text-xl'
          >
            我要申请
          </button>
        ) : (
          <button
            onClick={() => {
              setStep(1);
            }}
            className='w-full bg-[#EC662A] py-3 rounded-full text-white text-xl'
          >
            回去
          </button>
        )}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={rentIndiModal.isOpen}
      onClose={onCloseButton}
      title={currentListing.title}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
export default RentIndividualModal;
