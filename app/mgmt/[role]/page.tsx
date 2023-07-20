'use client';

import SelectComp from '@/app/components/input/SelectComp';
import { CATEGORY_OPTION } from '@/types/BlogTypes';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { resizeAdImage } from '@/app/lib/imageResizer';
import axios from 'axios';
import ReactQuill from 'react-quill';
import toast from 'react-hot-toast';

interface pageProps {}

const MgmtPage: React.FC<pageProps> = ({}) => {
  const usr = usePathname().split('/')[2];
  const [content, setContent] = useState('');
  const [imgSrc, setImgSrc] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const { data: session } = useSession();
  // const currentUser = session?.user;

  // console.log(currentUser);
  const currentUser = process.env.NEXT_PUBLIC_CURRENT_USER;

  const handleChange = (value: any) => {
    setContent(value);
  };

  const pathname = usePathname();
  const id = pathname?.split('/')[2];
  const password = pathname?.split('/')[3];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: null,
      title: null,
      hot: null,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const today = new Date();

  const imageHandler = async () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input.files) {
        const file = input.files[0];
        const writeTime = new Date().toISOString();
        console.log(file);

        const reader = new FileReader();
        reader.readAsArrayBuffer(await resizeAdImage(file));
        let blobPic = new Blob();

        reader.onloadend = async () => {
          blobPic = new Blob([new Uint8Array(reader.result as ArrayBuffer)], {
            type: file.type,
          });

          const url = await axios.post(
            `/api/pic/blogImage/${currentUser}/${writeTime}`
          );

          const response = await fetch(url.data.signedUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: blobPic,
          });

          const resultPicture = response.url.split('?')[0];
          setImgSrc((prev) => [...prev, resultPicture]);
          setContent(
            (prev) => prev + `<image src="${resultPicture}" alt="img"/>`
          );
        };
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'list',
    'bullet',
    'link',
    'image',
  ];

  const subtitle = `썸네일은 업로드하는 첫번째 사진으로 자동 저장됨`;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post(`/api/blogRegister`, {
        ...data,
        uid: currentUser,
        content,
        thumbnail: imgSrc[0],
        createdAt: today,
        author: 'MishengUSA',
        authorPic:
          'https://misheng.s3.us-east-2.amazonaws.com/assets/image/square.png',
      })
      .then((response) => {
        toast.success('生活小助手登录成功!');
        console.log(response);
        reset();
      })
      .catch((error) => {
        toast.error(`Something went wrong`);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        location.reload();
      });
  };

  if (usr != 'simon')
    return (
      <div className='relative flex flex-col justify-center items-center pt-[64px] sm:pt-[94px] w-full h-[50vh]'>
        <Image
          width={120}
          height={120}
          src={'/assets/images/logo/square.png'}
          alt={'sq'}
        />
        <p>404 Error</p>
      </div>
    );
  return (
    <div className='relative flex flex-col justify-center items-center pt-[64px] sm:pt-[94px] w-full h-[100vh]'>
      <div className='flex flex-col gap-4 w-full px-8'>
        <div className='flex flex-col sm:flex-row gap-4'>
          <SelectComp
            small
            placeholder={'分类'}
            options={CATEGORY_OPTION}
            onChange={(value) => {
              setCustomValue('category', value);
            }}
          />
          <SelectComp
            small
            placeholder={'火热主题?'}
            options={[
              { label: 'Yes', value: 'Yes' },
              { label: 'No', value: 'No' },
            ]}
            onChange={(value) => {
              setCustomValue('hot', value);
            }}
          />
          <div className='w-full sm:w-[70%]'>
            <input
              id={'title'}
              placeholder='TITLE'
              maxLength={80}
              onChange={(e) => setCustomValue('title', e.target.value)}
              className='w-full h-full pl-2 border border-neutral-300 rounded-lg'
              // register={register}
              // errors={errors}
            />
          </div>
        </div>
        <div>
          <ReactQuill
            value={content}
            onChange={handleChange}
            placeholder='Write something...'
            modules={modules}
            formats={formats}
          />
        </div>
        <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-6'>
          {/* <button
              onClick={() => {
                console.log('Register');
              }}
              className='py-2 px-4 bg-[#EC662A] text-[#FFF] rounded-xl w-full sm:w-[300px]'
            >
              블로그 글 확인하기
            </button> */}
          <button
            onClick={handleSubmit(onSubmit)}
            className='py-2 px-4 bg-[#EC662A] text-[#FFF] rounded-xl w-full sm:w-[300px]'
          >
            发布生活小助手！
          </button>
        </div>
      </div>
    </div>
  );
};
export default MgmtPage;
