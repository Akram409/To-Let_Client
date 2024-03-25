import { useState } from 'react'
import { Link } from 'react-router-dom';

const FindFlat = () => {
    const [activeButton, setActiveButton] = useState('sublet'); // Initially setting "Find Sublet/Flat" as active

  const handleClick = (button) => {
    setActiveButton(button);
  };
  return (
    <div className='px-12 flex gap-10'> 

  <div className="flex border border-black rounded-lg">
    <Link to="/">
    <button 
      className={`px-4 py-3 rounded-lg mr-2 w-44 ${activeButton === 'sublet' ? 'bg-green-400 text-black font-semibold border border-black' : 'bg-white text-black font-semibold'}`}
      onClick={() => handleClick('sublet')}
    >
      Find Sublet/Flat
    </button>
    </Link>
   <Link to="/findRoommate">
   <button
      className={`px-4 py-3 rounded-lg w-44 ${activeButton === 'roommate' ? 'bg-green-400 text-black font-semibold border border-black' : 'bg-white text-black font-semibold'}`}
      onClick={() => handleClick('roommate')}
    >
     Find Roommate
    </button>
   </Link>
    </div>
    
    <div className="flex justify-center items-center gap-5">
       <div className='bg-gray-100 border border-black rounded-full px-6'>
        <span>Where</span><br />
       <input
        
        className="bg-gray-100"
        placeholder="Search Location"
      />
       </div>
       
        <select
         
          defaultValue={"bold"}
          className="select select-bordered border border-gray-800 bg-gray-100 px-4 py-3 lg:w-auto w-[20vw] font-bold border-main focus:border-main rounded-full  join-item"
        >
          <option className="font-bold" value="bold" disabled>
            Rent
          </option>
          <option>High To Low</option>
          <option>Low To High</option>
        </select>
      
        <select
         
          defaultValue={"bold"}
          className="select select-bordered  border border-gray-800 bg-gray-100 px-10 py-2 lg:w-auto w-[20vw] font-bold border-main focus:border-main rounded-full  join-item"
        >
          <option className="font-bold " value="bold" disabled>
            Others 
          </option>
          <option>2</option>
          <option>4</option>
          <option>6</option>
          <option>8</option>
          <option>10</option>
        </select>

        <select
         
         defaultValue={"bold"}
         className="select select-bordered border border-gray-800 bg-gray-100 px-4 py-2 lg:w-auto w-[20vw] font-bold border-main focus:border-main rounded-full  join-item"
       >
         <option className="font-bold" value="bold" disabled>
           Sort
         </option>
         <option>High To Low</option>
         <option>Low To High</option>
       </select>
    </div>
  </div>
  )
}

export default FindFlat