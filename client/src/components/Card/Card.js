import React from 'react';
const Card = ({ card }) => {
   return (
      <>
         <div className='bg-white rounded-md p-3   first:m-3 last:mb-0 cursor-grab'>
            <label
               className={`bg-gradient-to-r cursor-grab ${
                  card.priority === 0
                     ? 'from-blue-700 to-blue-300'
                     : card.priority === 1
                     ? 'from-green-700 to-green-300'
                     : 'from-red-700 to-red-300'
               } px-3 py-0.5 rounded text-white text-sm`}
            >
               {card.priority === 0
                  ? 'Low Priority'
                  : card.priority === 1
                  ? 'Medium Priority'
                  : 'High Priority'}
            </label>
            <h5 className='text-md mt-3 text-lg leading-6'>{card.title}</h5>
         </div>
      </>
   );
};
export default Card;
