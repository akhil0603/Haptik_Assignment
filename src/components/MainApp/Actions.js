import React, { useContext } from 'react';
import Delete from "../../Images/delete.gif"
import { FriendContext } from '../../context/FriendListContext';
import { UPDATE_FAV, DELETE_DATA } from '../../constants/ActionTypes';

const Actions = ({ friendId, isFav }) => {
   const { friendListDispatch, toggleModal } = useContext(FriendContext);

   const handleFav = (id) => {
      friendListDispatch({ type: UPDATE_FAV, id });
   };

   const handleDelete = (id) => {
      toggleModal(() => DeleteModel(id));
   };

   const deleteData = (id) => {
      friendListDispatch({ type: DELETE_DATA, id });
      toggleModal();
   };

   const DeleteModel = (id) => {
      return (
         <div className="deletePopup">
            <div className="modalTitle">
               <h1>Are you sure?</h1>
            </div>
            <div className="modalActionButtons">
               <button onClick={() => deleteData(id)}>Yes</button>
               <button onClick={toggleModal}>No</button>
            </div>
         </div>
      );
   };

   return (
      <div className="friendsAction">
         <button className="fav" onClick={() => handleFav(friendId)} ><img className={isFav ? 'favoritesButton' : 'favoritesButton1'}></img></button>
         <button className="del" onClick={() => handleDelete(friendId)}> <img className="deleteButton" src={Delete} ></img></button>
      </div>
   );
};

export default Actions;
