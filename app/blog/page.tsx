'use client';

import { useEffect, useRef, useState } from 'react';
import BlogBody from '../components/blog/BlogBody';
import BlogSubNav from '../components/blog/BlogSubNav';
import axios from 'axios';
import BlogIndividualModal from '../components/modal/BlogIndividualModal';
import useBlogIndividualModal from '../components/hooks/useBlogIndividualModal';
import { useSearchParams } from 'next/navigation';

export interface IFecthBlogQuery {
  start: number;
  number: number;
  category: string | null;
}

const BlogPage = ({}) => {
  const hasModalOpened = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [listings, setListings] = useState();
  const [hideHotListing, setHideHotListing] = useState(false);

  const blogIndividualModal = useBlogIndividualModal();

  const params = useSearchParams();
  const bloglistingid = params?.get('bloglisting');

  useEffect(() => {
    if (
      !hasModalOpened.current &&
      bloglistingid &&
      blogIndividualModal.onOpen
    ) {
      blogIndividualModal.onOpen();
      hasModalOpened.current = true;
    }
  }, [blogIndividualModal, blogIndividualModal.onOpen, bloglistingid]);

  const fetchBlogListing = async (query: any) => {
    setIsLoading(true);
    axios
      .post(`/api/bloglisting`, query)
      .then((res) => setListings(res.data))
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogListing({ blogOption: { start: 0, number: 5, category: null } });
  }, []);

  return (
    <div className='relative pt-[64px] sm:pt-[94px]'>
      <BlogIndividualModal />
      <BlogSubNav
        fetchBlogListing={fetchBlogListing}
        setHideHotListing={setHideHotListing}
      />
      <BlogBody
        BlogIndividualOpen={blogIndividualModal.onOpen}
        hideHotListing={hideHotListing}
        setHideHotListing={setHideHotListing}
        isLoading={isLoading}
        listings={listings}
        setListings={setListings}
        fetchBlogListing={fetchBlogListing}
      />
    </div>
  );
};
export default BlogPage;
