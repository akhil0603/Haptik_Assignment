import React, { useContext, useEffect, useMemo, useState } from 'react';
import Actions from './Actions';
import { FriendContext } from '../../context/FriendListContext';
import Pagination from './Pagination';

let PageSize = 4;
const Materials = ({ name }) => {
   const { friendListData } = useContext(FriendContext);
   const [displayData, setDisplayData] = useState([]);
   const [currentPage, setCurrentPage] = useState(0);

   const currentTableData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return displayData.slice(firstPageIndex, lastPageIndex);
   }, [currentPage, displayData]);

   useEffect(() => {
      const searchedData = friendListData.filter((ele) =>
         ele.name.toLowerCase().startsWith(name.toLowerCase())
      );
      setDisplayData(searchedData);
      setCurrentPage(1);
   }, [name, friendListData]);

   return (
      <div className="friendListItems">
         <ul className="friendul">
            {displayData.length ? (
               currentTableData.map((data) => (
                  <li className="friendli" key={data.id}>
                     <div className="friendsname">
                        <strong>{data.name}</strong>
                        <br />
                        <span>is your friend</span>
                     </div>
                     <Actions friendId={data.id} isFav={data.isFav} />
                  </li>
               ))
            ) : (
               <li>
                  <div style={{ margin: '0 auto' }} className="friendListItemsContent">
                     <strong>No Data Found</strong>
                     <br />
                  </div>
               </li>
            )}
         </ul>
         <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={displayData.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
         />
      </div>
   );
};

export default Materials;
