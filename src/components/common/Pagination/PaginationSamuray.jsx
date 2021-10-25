import React, { useState } from 'react'
import styles from './Pagination.module.css'
import cn from 'classnames'

let PaginationSamuray = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize)
  let pages = []

  for (let i = 1; i < pagesCount; i++) {
    pages.push(i)
  }

  let PortionCount = Math.ceil(pagesCount / portionSize)
  let [portionNumber, setPortionNumber] = useState(1)
  let leftPortionEdge = (portionNumber - 1) * portionSize + 1
  let rightPortionEdge = portionSize * portionNumber

  return (
    <div className={styles.paginator}>
      {portionNumber > 1 && (
        <button onClick={() => setPortionNumber(portionNumber - 1)}>
          PREV
        </button>
      )}
      {pages
        .filter((p) => {
          return rightPortionEdge >= p && leftPortionEdge <= p
        })
        .map((p) => {
          return (
            <span
              className={cn(
                { [styles.selectedPage]: currentPage === p },
                styles.pageNumber
              )}
              onClick={() => {
                onPageChanged(p)
              }}
            >
              {p}
            </span>
          )
        })}
      {portionNumber < PortionCount && (
        <button onClick={() => setPortionNumber(portionNumber + 1)}>
          NEXT
        </button>
      )}
    </div>
  )
}

export default PaginationSamuray
