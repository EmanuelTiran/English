// Pagination.jsx
import React from 'react';
import Button from './Button';
import PageButton from './PageButton';

const Pagination = ({ currentPage, totalPages, totalWords, showingStart, showingEnd, setCurrentPage }) => {
  return (
    <div className="mt-8 mb-20 flex flex-col items-center relative z-50">
      <p className="text-sm text-gray-600 mb-4">
        Showing {showingStart}-{showingEnd} of {totalWords} words
      </p>

      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          <Button
            text="PREVIOUS"
            direction="previous"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          />

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <PageButton
                key={pageNum}
                text={pageNum}
                isActive={currentPage === pageNum}
                onClick={() => setCurrentPage(pageNum)}
              />
            );
          })}

          <Button
            text="NEXT"
            direction="next"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default Pagination;