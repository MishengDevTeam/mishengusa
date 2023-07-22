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
import { RiAlarmWarningLine, RiWechatFill } from 'react-icons/ri';
import RentIndiContactButton from './rent/RentIndiContactButton';
import { MdEmail, MdPhone, MdTextsms } from 'react-icons/md';
import { IoArrowDownCircleSharp } from 'react-icons/io5';
import Image from 'next/image';
import useReportModal from '../hooks/useReportModal';

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
  const reportModal = useReportModal();

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
    reportModal.onOpen();
  };

  const onCloseButton = () => {
    rentIndiModal.onClose();
    setStep(1);
  };

  const generateContact = (means: string) => {
    const currentLink =
      `I would like to ask this room: ${window.location.href}`.toLocaleLowerCase();
    switch (means) {
      case 'kakao':
        return (
          <div className='w-full h-full flex flex-col items-center justify-center gap-2 py-2'>
            <div className='flex justify-center items-center w-[42vw] max-w-[360px] py-4'>
              <Image
                width={200}
                height={300}
                src={'/assets/images/img/qr_img.png'}
                alt={'qr_image'}
              />
            </div>
            {/* <button
              onClick={() => {
                handleCopy();
                router.push('weixin://contacts/profile/cosHL0');
              }}
              className='flex justify-center items-center w-[80%] h-[40px] max-w-[240px] text-white bg-[#1ECD18] rounded-lg gap-1'
            >
              <RiWechatFill size={24} />
              <span>点击这里!</span>
            </button> */}
          </div>
        );
      // case 'email':
      //   return emailSent ? (
      //     <div className='flex flex-col w-full h-full justify-center items-center gap-1'>
      //       <Image
      //         width={200}
      //         height={300}
      //         src={'/assets/images/logo/logo_vertical.png'}
      //         alt={'logo'}
      //       />
      //       <p>문의가 완료되었습니다!</p>
      //       <p>가능한 빨리 답변드리도록 하겠습니다!</p>
      //     </div>
      //   ) : (
      //     <form
      //       ref={form}
      //       onSubmit={sendContactEmail}
      //       className='flex flex-col w-full max-w-[480px] py-2 sm:py-4 gap-1 overflow-y-scroll h-full'
      //     >
      //       <RentIndiContact
      //         label={'이름'}
      //         placeholder={'이름'}
      //         maxLength={24}
      //         name={'contact_name'}
      //       />
      //       <RentIndiContact
      //         label={'직업'}
      //         placeholder={'학생 또는 직장인'}
      //         maxLength={10}
      //         name={'contact_status'}
      //       />
      //       <RentIndiContact
      //         label={'이메일'}
      //         placeholder={'이메일'}
      //         maxLength={30}
      //         name={'contact_email'}
      //       />
      //       <RentIndiContact
      //         label={'연락처'}
      //         placeholder={'한국 또는 미국 전화번호'}
      //         maxLength={15}
      //         name={'contact_phone'}
      //       />
      //       <RentIndiContact
      //         label={'카톡아이디'}
      //         placeholder={'연락 가능한 카톡 아이디'}
      //         maxLength={36}
      //         name={'contact_kakao'}
      //       />
      //       <input
      //         readOnly
      //         className='hidden'
      //         name={'contact_listing'}
      //         value={window.location.href}
      //       />
      //       <button
      //         type='submit'
      //         className='text-white bg-[#3944BC] mt-3 py-2 text-sm font-light rounded-lg hover:shadow-lg'
      //       >
      //         이메일로 뉴욕 방찾기!
      //       </button>
      //     </form>
      //   );
      case 'phone':
        return (
          <div className='w-full h-full flex flex-col items-center justify-center gap-8 px-4 py-8'>
            {/* <div>米生: +1 914 294 8785</div> */}
            <a
              href='tel:9142948785'
              className='flex items-center justify-center w-full bg-green-400 text-[#FFF] py-2 rounded-full gap-2'
            >
              <MdPhone size={20} />
              <p>致电请点这里～</p>
            </a>
            <a
              href={`sms:9142948785&body=${currentLink}`}
              className='flex items-center justify-center w-full bg-blue-400 text-[#FFF] py-2 rounded-full gap-2'
            >
              <MdTextsms size={20} />
              <p>短信请点这里～</p>
            </a>
          </div>
        );
    }
  };

  if (!currentListing) return null;

  let bodyContent: JSX.Element;

  if (step == 1) {
    bodyContent = (
      <div
        className={`w-full flex flex-col py-1 px-2 h-[55vh] sm:h-[70vh] overflow-x-hidden overflow-y-scroll cursor-default`}
      >
        <div className='flex justify-between text-xs text-neutral-700 pb-1'>
          <div className='md:text-sm'>
            发布: {dateFormatter(new Date(currentListing.createdAt))}
          </div>
          <div className='md:text-sm'>今天: {dateFormatter(new Date())}</div>
        </div>
        <RentIndiPicture pictures={currentListing.imageSrc} />
        {currentListing.special != '' && (
          <RentSpecial special={currentListing.special} />
        )}
        <RentIndiInfo
          currentListing={currentListing}
          buildingInfo={buildingInfo}
          buildingToSubwayInfo={buildingToSubwayInfo}
          reviewInfo={reviewInfo}
        />
        <div className='absolute bottom-0 right-2 translate-y-4 w-[28px] h-[28px] rounded-full'>
          <IoArrowDownCircleSharp size={28} color='#EC662A rounded-full' />
        </div>
      </div>
    );
  } else if (step == 2) {
    bodyContent = (
      <div className='w-full flex flex-col items-center py-2 gap-2 px-4 h-full'>
        <div className='w-full grid grid-cols-2 gap-2 mt-1'>
          {/* <RentIndiContactButton
            label={'电子邮件'}
            bgColor={'bg-[#3944BC]'}
            icon={MdEmail}
            onClick={() => {
              setContact('email');
            }}
          /> */}
          <RentIndiContactButton
            label={'电话'}
            bgColor={'bg-[#028A0F]'}
            icon={MdPhone}
            onClick={() => {
              setContact('phone');
            }}
          />
          <RentIndiContactButton
            label={'微信'}
            bgColor={'bg-[#1ECD18]'}
            icon={RiWechatFill}
            onClick={() => {
              setContact('kakao');
            }}
          />
        </div>
        {generateContact(contact)}
      </div>
    );
  } else {
    bodyContent = <></>;
  }

  let footerContent = (
    <div className='flex flex-col gap-0 w-full h-full px-8'>
      <div className={`flex justify-evenly`}>
        <RentIndiFooterButton
          color='#9DCAEB'
          label='分享'
          onClick={handleCopy}
          icon={FaRegShareSquare}
        />
        {/* <RentIndiFooterButton
          color='#D0342C'
          label='举报'
          onClick={reportListing}
          icon={RiAlarmWarningLine}
        /> */}
      </div>
      <div className='w-full mt-1'>
        {step == 1 ? (
          <button
            onClick={() => {
              setStep(2);
            }}
            className='w-full bg-[#EC662A] py-2 rounded-full text-white text-xl'
          >
            我要申请
          </button>
        ) : (
          <button
            onClick={() => {
              setStep(1);
            }}
            className='w-full bg-[#EC662A] py-2 rounded-full text-white text-lg'
          >
            返回
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
