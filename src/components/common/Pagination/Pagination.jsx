import React from 'react'
import styles from './Pagination.module.css'

let Pagination = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize)

  let before = currentPage - 1
  before = before < 1 ? null : before
  let after = currentPage + 1
  after = after >= pagesCount ? null : after

  return (
    <div className={styles.paginator}>
      {/* pagination */}
      {/* first page */}
      <div>
        {currentPage === 1 ? null : (
          <>
            <span
              onClick={() => {
                onPageChanged(1)
              }}
            >
              {1}
            </span>
            <span>...</span>
          </>
        )}

        {/* first page */}
        {/* before current page */}
        <span
          onClick={() => {
            onPageChanged(before)
          }}
        >
          {currentPage < 3 ? null : <span>{before}</span>}
        </span>
        {/* before current page */}
        {/* current page */}
        <span>
          {currentPage < 3 ? null : <span>..</span>}
          <span className={styles.selectedPage}>{currentPage}</span>
          {currentPage > pagesCount - 2 ? null : <span>..</span>}
        </span>
        {/* current page */}
        {/* after current page */}
        <span
          onClick={() => {
            onPageChanged(after)
          }}
        >
          {after}
        </span>
        {/* after current page */}
        {/* last page */}

        {currentPage === pagesCount ? null : (
          <>
            <span>...</span>
            <span
              onClick={() => {
                onPageChanged(pagesCount)
              }}
            >
              {pagesCount}
            </span>
          </>
        )}
        {/* last page */}
      </div>
      {/* pagination */}
    </div>
  )
}

export default Pagination
