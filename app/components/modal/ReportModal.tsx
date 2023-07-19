'use client';

import { useCallback, useRef, useState } from 'react';
import { reportReason } from '@/types/ReportTypes';

import Modal from './Modal';
import emailjs from '@emailjs/browser';
// import { useSession } from 'next-auth/react';
import useReportModal from '../hooks/useReportModal';
import SelectComp from '../input/SelectComp';
import Textarea from '../input/Textarea';

interface ReportModalProps {}

const ReportModal: React.FC<ReportModalProps> = ({}) => {
  const form = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const { data: session } = useSession();
  // const currentUser = session?.user;
  // const userName = currentUser?.name;
  // const userEmail = currentUser?.email;

  const reportModal = useReportModal();

  const currentTime = new Date();
  const currentTimeString = currentTime.toString();

  const sendContactEmail = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    if (form.current !== null) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_REPORT_TEMPLATE_ID!,
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        )
        .then(
          (result) => {
            console.log(result.text);
            setSent(true);
          },
          (error) => {
            console.log(error.text);
          }
        );
    } else {
      console.error('form.current is null');
    }
  };

  const closeModal = useCallback(() => {
    reportModal.onClose();
    setSent(false);
    setIsLoading(false);
  }, [reportModal]);

  const bodyContent = sent ? (
    <div className='w-full'>
      <div className='flex flex-col items-center justify-center py-8 gap-4'>
        <div className='w-[85px] h-auto flex flex-col mb-4'>
          <div className='flex flex-row justify-center'>
            <div className='w-[9px] h-[9px] bg-[#EC662A] rounded-full'></div>
            <div className='w-[100%]'></div>
            <div className='w-[9px] h-[9px] bg-[#EC662A] rounded-full'></div>
          </div>
          <div className='w-[100%] h-[42px] border-b-2 border-l-2 border-r-2 border-[#EC662A] rounded-b-full mt-4'></div>
        </div>
        <div className='flex flex-col text-center gap-4'>
          <div>举报成功！</div>
          <div>
            对帖子的审查和处理
            <br />
            将在48小时内完成
          </div>
          <div>
            我们将尽最大努力
            <br /> 维护一个更清洁的美国生活社区
          </div>
          <div>感谢您 !</div>
        </div>
      </div>
    </div>
  ) : (
    <form
      ref={form}
      onSubmit={sendContactEmail}
      className='w-full flex flex-col gap-4 px-4'
    >
      <div className='flex flex-col gap-2'>
        <p className='text-lg font-semibold'>举报原因</p>
        <SelectComp
          placeholder={'举报原因'}
          options={reportReason}
          onChange={() => {}}
          name={'report_reason'}
          small
        />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='report_text' className='text-lg font-semibold'>
          举报内容
        </label>
        <Textarea
          id={'report_text'}
          name={'report_text'}
          onChange={() => {}}
          small
        />
      </div>
      <input
        readOnly
        className='hidden'
        name={'report_listing'}
        value={typeof window !== 'undefined' ? window.location.href : ''}
      />

      <input
        readOnly
        className='hidden'
        name={'report_time'}
        value={currentTimeString}
      />
      {/* {currentUser && (
        <>
          <input
            readOnly
            className='hidden'
            name={'report_username'}
            value={userName}
          />
          <input
            readOnly
            className='hidden'
            name={'report_useremail'}
            value={userEmail}
          />
        </>
      )} */}
      <button
        type='submit'
        disabled={isLoading}
        className={`w-full h-full py-4 text-white rounded-lg text-lg font-semibold hover:shadow-xl
        ${
          isLoading
            ? 'bg-neutral-300 cursor-not-allowed'
            : 'bg-[#EC662A] cursor-pointer'
        }
        `}
      >
        举报
      </button>
    </form>
  );

  return (
    <Modal
      isOpen={reportModal.isOpen}
      onClose={closeModal}
      title={'举报'}
      body={bodyContent}
      footer={''}
    />
  );
};
export default ReportModal;
