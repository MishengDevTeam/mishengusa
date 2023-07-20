'use client';

import Image from 'next/image';
import BlogSubMenuItem from './BlogSubMenuItem';
import BlogSubMenuAd from './BlogSubMenuAd';
import { IoNewspaperOutline } from 'react-icons/io5';
import { MdOutlineLocalPolice } from 'react-icons/md';
import { GiPoliceOfficerHead } from 'react-icons/gi';
import { BsCameraReels } from 'react-icons/bs';
import { GrAnnounce, GrMicrophone } from 'react-icons/gr';
import { BiVideoRecording } from 'react-icons/bi';

interface BlogSubMenuProps {}

const BlogSubMenu: React.FC<BlogSubMenuProps> = ({}) => (
  <div className='flex flex-col gap-4'>
    <BlogSubMenuAd />
    <BlogSubMenuAd />
    <BlogSubMenuAd />
    <BlogSubMenuItem
      firstline={'为保证最佳网络社区环境'}
      secondline={'可在此处举报'}
      icon={() => <MdOutlineLocalPolice size={36} />}
    />

    <BlogSubMenuItem
      firstline={'米生服务指南'}
      secondline={'与注意事项'}
      icon={() => <GrMicrophone size={36} />}
    />

    <BlogSubMenuItem
      firstline={'APP最新通知'}
      secondline={'【通知】 今天的新房源……'}
    />
  </div>
);
export default BlogSubMenu;
