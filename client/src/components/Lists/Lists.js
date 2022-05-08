import React, { useEffect, useRef, useState } from 'react';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/outline';
import { IoClose } from 'react-icons/io5';

import Card from '../Card/Card';
import { mapOrder } from '../../utilities/sorts';
import { Container, Draggable } from 'react-smooth-dnd';
import { Fragment } from 'react';
import WarningModal from '../Common/WarningModal';
import {
   MODAL_ACTION_CLOSE,
   MODAL_ACTION_CONFIRM,
} from '../../utilities/constant';
import { v4 as uuidv4 } from 'uuid';

const Lists = (props) => {
   const { list, onCardDrop, onUpdateList } = props;
   const cards = mapOrder(list.cards, list.cardOrder, 'id');

   const [isShowModalDelete, setsShowModalDelete] = useState(false);

   const [titleList, setTitleList] = useState('');

   const [isFirstClick, setIsFirstClick] = useState(true);
   const inputRef = useRef(null);

   const [isShowAddNewCard, setIsShowAddNewCard] = useState(false);
   const [valueTextArea, setValueTextArea] = useState('');
   const textAreaRef = useRef(null);
   const [valuePriority, setValuePriotity] = useState('');
   const priorityRef = useRef(null);

   useEffect(() => {
      if (list && list.title) {
         setTitleList(list.title);
      }
   }, [list]);

   useEffect(() => {
      if (isShowAddNewCard === true && textAreaRef && textAreaRef.current) {
         textAreaRef.current.focus();
      }
   }, [isShowAddNewCard]);

   const toggleModal = () => {
      setsShowModalDelete(!isShowModalDelete);
   };
   const onModalAction = (type) => {
      if (type === MODAL_ACTION_CLOSE) {
         //Do Nothing
      }
      if (type === MODAL_ACTION_CONFIRM) {
         //Remove a Column Lists
         const newList = {
            ...list,
            _destroy: true,
         };
         onUpdateList(newList);
      }
      toggleModal();
   };

   const selectAllText = (event) => {
      setIsFirstClick(false);

      if (isFirstClick) {
         event.target.select();
      } else {
         inputRef.current.setSelectionRange(titleList.length, titleList.lenght);
      }
      // event.target.focus();
   };
   const handleClickOutside = () => {
      //do somthing
      setIsFirstClick(true);
      const newList = {
         ...list,
         title: titleList,
         _destroy: false,
      };
      onUpdateList(newList);
   };

   const handleAddNewcard = () => {
      //Validate
      if (!valueTextArea) {
         textAreaRef.current.focus();
         return;
      }
      const newCard = {
         id: uuidv4(),
         boardId: list.boardId,
         listId: list.id,
         title: valueTextArea,
         priority: parseInt(valuePriority),
      };
      let newList = { ...list };
      newList.cards = [...newList.cards, newCard];
      newList.cardOrder = newList.cards.map((card) => card.id);

      onUpdateList(newList);
      setValueTextArea('');
      setIsShowAddNewCard(false);
   };

   return (
      <>
         {/*Board List Column */}

         <div className='mr-11 '>
            <div className='w-60 '>
               <div>
                  <div
                     className={`bg-gray-100 rounded-md shadow-md
                                     flex flex-col relative  
                                     `}
                  >
                     <span
                        className='w-full h-1 bg-gradient-to-r from-purple-700 to-indigo-200
                                   absolute inset-x-0 top-0 rounded-t-lg'
                     ></span>
                     <h4 className=' p-2 pb-0 flex justify-between items-center mb-2 cursor-grab column-drag-handle '>
                        <span className='text-2xl text-gray-600'>
                           <div>
                              <input
                                 type='text'
                                 onClick={selectAllText}
                                 onChange={(event) =>
                                    setTitleList(event.target.value)
                                 }
                                 className='bg-inherit  text-gray-600 pr-0 py-0 text-xl font-semibold w-44 rounded-sm focus:bg-white focus:py-0.5 border-hidden focus:ring-purple-400 cursor-grab '
                                 value={titleList}
                                 spellCheck='false'
                                 onBlur={handleClickOutside}
                                 onMouseDown={(e) => e.preventDefault()}
                                 ref={inputRef}
                              ></input>
                           </div>
                        </span>
                        <button
                           onClick={toggleModal}
                           type='button'
                           className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
                        >
                           <TrashIcon className='w-5 text-gray-500 cursor-pointer' />
                        </button>
                     </h4>
                     <div
                        className='overflow-y-auto overflow-x-hidden h-auto'
                        style={{
                           maxHeight: isShowAddNewCard
                              ? 'calc(100vh - 435px)'
                              : 'calc(100vh - 320px)',
                        }}
                     >
                        <Container
                           groupName='col'
                           onDrop={(dropResult) =>
                              onCardDrop(dropResult, list.id)
                           }
                           getChildPayload={(index) => cards[index]}
                           dragClass='card-ghost'
                           dropClass='card-ghost-drop'
                           dropPlaceholder={{
                              animationDuration: 150,
                              showOnTop: true,
                              className: 'drop-preview',
                           }}
                           dropPlaceholderAnimationDuration={200}
                        >
                           {cards &&
                              cards.length > 0 &&
                              cards.map((card, index) => {
                                 return (
                                    <Draggable key={card.id}>
                                       <Card card={card} className='m-3' />
                                    </Draggable>
                                 );
                              })}
                        </Container>
                     </div>

                     {/* Add New Card */}

                     {isShowAddNewCard === true && (
                        <div className='p-1.5 rounded-md h-48 mt-2.5 w-60 shadow-md bg-slate-100 bg-opacity-60 '>
                           <textarea
                              rows='2'
                              type='text'
                              placeholder='Enter a title for this card'
                              className='form-control shadow-none focus-within:border-purple-500 focus-within:ring-purple-500 focus:ring-1 focus-within:font-poppins font-poppins focus-within:text-gray-500 focus-within:font-medium'
                              ref={textAreaRef}
                              value={valueTextArea}
                              onChange={(e) => setValueTextArea(e.target.value)}
                           ></textarea>
                           <div className='text-gray-600 my-2.5 font-medium'>
                              <h6 className='ml-1'>Priority</h6>
                              <div
                                 ref={priorityRef}
                                 value={setValuePriotity}
                                 onChange={(event) =>
                                    setValuePriotity(event.target.value)
                                 }
                                 className='flex flex-row justify-between mx-1 text-md font-normal text-gray-500 hover:text-gray-600'
                              >
                                 <div>
                                    <input
                                       type='radio'
                                       id='Low'
                                       value={0}
                                       name='priority'
                                       checked
                                       className='mb-1 mr-1 focus-within:ring-0 text-purple-500'
                                    />
                                    <label for='Low'>Low</label>
                                 </div>
                                 <div>
                                    <input
                                       type='radio'
                                       id='Medium'
                                       value={1}
                                       name='priority'
                                       className='mb-1 mr-1 focus-within:ring-0 text-purple-500'
                                    />
                                    <label for='Medium'>Medium</label>
                                 </div>
                                 <div>
                                    <input
                                       type='radio'
                                       id='High'
                                       value={2}
                                       name='priority'
                                       className='mb-1 mr-1 focus-within:ring-0 text-purple-500'
                                    />
                                    <label for='High'>High</label>
                                 </div>
                              </div>
                           </div>
                           <div className='group-btn text-base font-poppins flex items-center gap-2 py-2'>
                              <button
                                 onClick={() => handleAddNewcard()}
                                 className='btn btn-primary bg-purple-500 border-purple-500 focus:ring-2 focus:ring-purple-600 hover:bg-purple-600 focus:bg-purple-600'
                              >
                                 Add Task
                              </button>
                              <IoClose
                                 onClick={() => setIsShowAddNewCard(false)}
                                 className='text-3xl text-gray-600 cursor-pointer'
                              />
                           </div>
                        </div>
                     )}
                     {isShowAddNewCard === false && (
                        <button
                           onClick={() => setIsShowAddNewCard(true)}
                           className='flex justify-center items-center mb-3 mt-3 space-x-2 text-lg font-semibold text-gray-500 hover:text-gray-600'
                        >
                           <span>Add task</span>
                           <PlusCircleIcon className='w-5 h-5 ' />
                        </button>
                     )}
                  </div>
               </div>
            </div>
         </div>
         <WarningModal
            show={isShowModalDelete}
            title={'Remove a column'}
            content={`Are you sure you want to delete this List <b className='text-slate-700'>${list.title}</b>  ?`}
            onAction={onModalAction}
         />
      </>
   );
};

export default Lists;
