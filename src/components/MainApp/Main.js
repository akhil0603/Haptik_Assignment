import React, { useReducer, useState } from 'react';
import { Provider, FriendsListReducer } from '../../context/FriendListContext';
import { v4 as uuidv4 } from 'uuid';
import { getFromLocalStorage } from '../../storage/index';
import Popup from './Popup';
import { ADD_DATA } from '../../constants/ActionTypes';
import Materials from './Materials';



const Main = () => {
   const [friendName, setFriendName] = useState('');
   const [isOpen, setIsOpen] = useState(false);
   const [children, setChildren] = useState('');

   const [friendListData, friendListDispatch] = useReducer(
      FriendsListReducer,
      getFromLocalStorage() || []
   );

   const toggleModal = (component) => {
      if (component) {
         setChildren(component);
      }
      setIsOpen((prev) => !prev);
   };

   const handleInput = () => {
      const value = friendName;
      setFriendName('');

      if (!value) return;
      const friendData = {
         id: uuidv4(),
         name: value,
         isFav: false,
      };

      friendListDispatch({ type: ADD_DATA, payload: friendData });
   };

   return (
      <div className="Main">
         <div className="heading">
            <h1 className="head">Friends List</h1>
         </div>
         <div className="searchButton">
            <input
               className="input1"
               type="text"
               value={friendName}
               placeholder="Enter your friend's name..."
               onChange={(e) => setFriendName(e.target.value)}
               onKeyUp={(e) => (e.key === 'Enter' ? handleInput() : null)}
            />
         </div>
         <div className="Materials">
            <Provider value={{ friendListData, friendListDispatch, toggleModal }}>
               <Materials name={friendName} />
            </Provider>
         </div>
         <Popup open={isOpen} onClose={toggleModal} children={children} />
      </div>
   );
};

export default Main;
