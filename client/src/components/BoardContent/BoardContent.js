import React, { useEffect, useState, useRef } from 'react';
import { ChevronDownIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { IoClose } from 'react-icons/io5';
import Lists from '../Lists/Lists';
import _ from 'lodash';
import { initData } from '../../data/initData.js';
import { mapOrder } from '../../utilities/sorts';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag } from '../../utilities/dragDrop';
import { v4 as uuidv4 } from 'uuid';

const BoardContent = () => {
   const [board, setBoard] = useState({});
   const [lists, setLists] = useState([]);

   const [isShowAddList, setIsShowAddList] = useState(false);

   const inputRef = useRef(null);

   const [valueInput, setValueInput] = useState('');

   useEffect(() => {
      if (isShowAddList === true && inputRef && inputRef.current) {
         inputRef.current.focus();
      }
   }, [isShowAddList]);

   useEffect(() => {
      const boardInitData = initData.boards.find(
         (item) => item.id === 'board-1'
      );
      if (boardInitData) {
         setBoard(boardInitData);

         //Sorting Lists(columns)

         setLists(mapOrder(boardInitData.lists, boardInitData.listOrder, 'id'));
      }
   }, []);

   const onColumnDrop = (dropResult) => {
      let newLists = [...lists];
      newLists = applyDrag(newLists, dropResult);

      let newBoard = { ...board };
      newBoard.listOrder = newLists.map((list) => list.id);
      newBoard.lists = newLists;

      setLists(newLists);
      setBoard(newBoard);
   };

   const onCardDrop = (dropResult, listId) => {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
         console.log(
            '>>>>inside onCardDrop : ',
            dropResult,
            'with listId : ',
            listId
         );

         let newLists = [...lists];

         let currentLists = newLists.find((list) => list.id === listId);
         currentLists.cards = applyDrag(currentLists.cards, dropResult);
         currentLists.cardOrder = currentLists.cards.map((card) => card.id);

         console.log('>>>> currrent column/list :', currentLists);
         setLists(newLists);
      }
   };

   if (_.isEmpty(board)) {
      return (
         <>
            <div className='not-found'>Board not found</div>
         </>
      );
   }

   const handleAddList = () => {
      if (!valueInput) {
         if (inputRef && inputRef.current) {
            inputRef.current.focus();
         }
         return;
      }
      //update board lists
      const _lists = _.cloneDeep(lists);
      _lists.push({
         id: uuidv4(),
         boardId: board.id,
         title: valueInput,
         cards: [],
      });
      setLists(_lists);
      setValueInput('');
      inputRef.current.focus();
      setIsShowAddList(false);
   };

   const onUpdateList = (newList) => {
      const listIdUpdate = newList.id;
      let nLists = [...lists];
      let index = nLists.findIndex((item) => item.id === listIdUpdate);
      if (newList._destroy) {
         //Remove Colume List
         nLists.splice(index, 1);
      } else {
         //Update title
         nLists[index] = newList;
      }
      setLists(nLists);
   };
   console.log(lists);
   return (
      <>
         {/* Board Headder */}
         <div className='fixed'>
            <div className='flex items-center '>
               <h4 className='text-3xl font-bold text-gray-600 '>
                  {board.boardName}
               </h4>
               <ChevronDownIcon className='w-6 h-6 text-gray-500 rounded-full p-1 bg-white ml-5 shadow-xl' />
            </div>
         </div>
         <div>&nbsp;</div>

         <div className=' flex my-5 mb-10  '>
            <Container
               orientation='horizontal'
               onDrop={onColumnDrop}
               getChildPayload={(index) => lists[index]}
               dragHandleSelector='.column-drag-handle'
               dropPlaceholder={{
                  animationDuration: 150,
                  showOnTop: true,
                  className: 'column-drop-preview ',
               }}
            >
               {lists &&
                  lists.length > 0 &&
                  lists.map((list, index) => {
                     return (
                        <Draggable key={list.id}>
                           <Lists
                              list={list}
                              onCardDrop={onCardDrop}
                              onUpdateList={onUpdateList}
                           />
                        </Draggable>
                     );
                  })}
            </Container>

            {/* Add New List column*/}
            {isShowAddList === false ? (
               <div
                  onClick={() => setIsShowAddList(true)}
                  className='flex w-60 rounded-md shadow-md justify-center  items-center gap-2 cursor-pointer  text-lg  font-semibold text-gray-500  hover:text-gray-600 bg-slate-50 bg-opacity-60 hover:bg-slate-100 hover:bg-opacity-60 py-2 px-4 h-11'
               >
                  Add another List
                  <PlusCircleIcon className='w-5 h-5 ' />
               </div>
            ) : (
               <div className='p-1.5 rounded-md h-24 w-60 shadow-md bg-slate-100 bg-opacity-60 '>
                  <input
                     type='text'
                     className='form-control shadow-none focus-within:font-poppins focus-within:font-medium focus-within:border-purple-500 focus-within:ring-purple-500 focus:ring-1'
                     ref={inputRef}
                     value={valueInput}
                     onChange={(event) => setValueInput(event.target.value)}
                  />
                  <div className='group-btn text-base font-poppins flex items-center gap-2 py-2'>
                     <button
                        className='btn btn-success '
                        onClick={() => handleAddList()}
                     >
                        Add List
                     </button>
                     <IoClose
                        className='text-3xl text-gray-600 cursor-pointer'
                        onClick={() =>
                           setIsShowAddList(false, setValueInput(''))
                        }
                     />
                  </div>
               </div>
            )}
         </div>
      </>
   );
};

export default BoardContent;
