'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const Pagination = ({ page, pageSize, totalItems }) => {
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalItems / pageSize);

  // Generate the URL with search params
  const generateUrl = (pageNum) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNum.toString());
    return `?${params.toString()}`;
  };

  return (
    <section className='container mx-auto flex justify-center items-center my-8'>
      {page > 1 && (
        <Link
          className='mr-2 px-2 py-1 border border-gray-300 rounded'
          href={generateUrl(page - 1)}
        >
          Previous
        </Link>
      )}

      <span className='mx-2'>
        Page {page} of {totalPages}
      </span>

      {page < totalPages && (
        <Link
          className='ml-2 px-2 py-1 border border-gray-300 rounded'
          href={generateUrl(page + 1)}
        >
          Next
        </Link>
      )}
    </section>
  );
};

export default Pagination;
