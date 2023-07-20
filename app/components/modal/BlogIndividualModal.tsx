'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import useBlogIndividualModal from '../hooks/useBlogIndividualModal';
import Modal from './Modal';
// import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
// import { BlogListing } from '@prisma/client';
import dateFormatter from '@/app/lib/dateFormatter';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { IoArrowDownCircleSharp } from 'react-icons/io5';
import QueryString from 'query-string';
import BlogTextBox from './blogindividual/BlogTextBox';
import toast from 'react-hot-toast';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { FaRegShareSquare } from 'react-icons/fa';
import { RiAlarmWarningLine } from 'react-icons/ri';
import RentIndiFooterButton from './rent/RentIndiFooterButton';
import useReportModal from '../hooks/useReportModal';

interface BlogIndividualModalProps {}

const BlogIndividualModal: React.FC<BlogIndividualModalProps> = ({}) => {
  const [currentListing, setCurrentListing] = useState<any | null>(null);
  const [nextListing, setNextListing] = useState<any | null>(null);

  const blogIndividualModal = useBlogIndividualModal();
  const reportModal = useReportModal();

  const params = useSearchParams();
  const blogid = params?.get('bloglisting');

  // const { data: session } = useSession();
  // const currentUser = session?.user;

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    if (blogid) {
      axios
        .post(`/api/bloglisting`, {
          blogId: blogid,
        })
        .then((res) => {
          setCurrentListing(res.data.blogIndiListing[0]);
          setNextListing(res.data.nextIndiListing[0]);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [blogid]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('주소가 복사되었습니다!');
    } catch (err) {
      toast.error(`Something went wrong!`);
      console.error('Failed to copy text: ', err);
    }
  }, []);

  const handleClick = useCallback(
    (blogId: string) => {
      let currentQuery = {};

      if (params) {
        currentQuery = QueryString.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        bloglisting: blogId,
      };

      if (params?.get('bloglisting') == blogId) {
        delete updatedQuery.category;
      }

      const url = QueryString.stringifyUrl(
        {
          url: '/blog/',
          query: updatedQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    },
    [params, router]
  );

  const reportListing = () => {
    blogIndividualModal.onClose();
    reportModal.onOpen();
  };

  if (!currentListing) return null;

  const titleContent = (
    <div className='w-full flex justify-center'>
      <div className='w-3/4 truncate'>{currentListing.title}</div>
    </div>
  );

  const bodyContent = (
    <div className='flex flex-col h-[55vh] sm:h-[70vh] overflow-y-scroll py-2 px-4 w-full'>
      <div className='flex justify-center flex-col w-full relative gap-4 '>
        <div className='w-full flex justify-center'>
          <p className='font-semibold text-lg w-full truncate'>
            {currentListing.title}
          </p>
        </div>

        <div className='flex flex-row justify-between'>
          <div className='flex gap-1'>
            <Image
              className='border border-[#EC662A] rounded-full'
              width={24}
              height={24}
              src={currentListing.authorPic}
              alt={'g'}
            />
            <p className='text-[14px] text-neutral-600'>
              {currentListing.author}
            </p>
          </div>

          <p>{dateFormatter(new Date(currentListing.createdAt))}</p>
        </div>
        <div>
          <BlogTextBox content={currentListing.content} />
        </div>
      </div>
      <div className='absolute bottom-0 right-2 translate-y-4 w-[28px] h-[28px] rounded-full'>
        <IoArrowDownCircleSharp size={28} color='#EC662A rounded-full' />
      </div>
    </div>
  );

  const footerContent = (
    <div className='flex flex-col py-2 px-4 w-full sm:gap-1'>
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

      {nextListing ? (
        <div
          onClick={() => {
            handleClick((nextListing as any)._id);
          }}
          className='flex flex-row gap-2 sm:gap-4 w-full h-[56px] overflow-hidden items-center cursor-pointer hover:bg-[#EC662A]/10 rounded-lg'
        >
          <Image
            className='border border-[#EC662A] aspect-video sm:aspect-square rounded-lg w-1/6 max-w-[64px] h-[6vh] sm:h-full'
            width={40}
            height={40}
            src={nextListing.thumbnail}
            alt={'g'}
          />
          <div className='flex items-center justify-start w-5/6 h-full'>
            <p className='text-[14px] sm:text-lg text-neutral-600 overflow-hidden whitespace-wrap'>
              {`上一条 :${nextListing.title}`}
            </p>
          </div>
        </div>
      ) : (
        <div className='w-full mt-4 h-full flex justify-center items-center font-semibold'>
          已到第一条生活小助手！
        </div>
      )}
    </div>
  );

  return (
    <Modal
      isOpen={blogIndividualModal.isOpen}
      onClose={blogIndividualModal.onClose}
      title={titleContent}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
export default BlogIndividualModal;
