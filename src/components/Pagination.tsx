"use client";

import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";

function Pagination({ pageCount }: { pageCount: number }) {
  const router = useRouter();
  const handlePageClick = (e: { selected: number }) => {
    const page = e.selected + 1;
    router.push(`/store?page=${page}&per_page=8`);
  };

  return (
    <div className="flex justify-center mt-7 mb-20">
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        previousLabel="< previous"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName="flex items-center space-x-2"
        pageClassName="px-3 py-1 border rounded transition-all duration-200 hover:bg-black hover:text-white hover:border-black cursor-pointer"
        activeClassName="bg-black text-white border-black"
        previousClassName="px-3 py-1 border rounded transition-all duration-200 hover:bg-black hover:text-white cursor-pointer"
        nextClassName="px-3 py-1 border rounded transition-all duration-200 hover:bg-black hover:text-white cursor-pointer"
        disabledClassName="opacity-40 cursor-not-allowed hover:bg-transparent hover:text-black"
      />
    </div>
  );
}

export default Pagination;
