'use client';

import BlogHotCard from './BlogHotCard';

interface BlogHotProps {
  hotListing: any;
  BlogIndividualOpen: () => void;
  month: number;
}

const BlogHot: React.FC<BlogHotProps> = ({
  hotListing,
  BlogIndividualOpen,
  month,
}) => {
  if (!hotListing) return null;
  return (
    <div className='w-full'>
      <div className='text-2xl font-semibold mb-2'>{month}月火热主题🔥</div>
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        {hotListing.map((listing: any) => (
          <BlogHotCard
            key={(listing as any)._id}
            id={(listing as any)._id}
            title={listing.title}
            imgsrc={listing.thumbnail}
            BlogIndividualOpen={BlogIndividualOpen}
          />
        ))}
      </div>
    </div>
  );
};
export default BlogHot;
