import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const FindFlat = () => {

  const [flatData, setFlatData] = useState([])
  const [activeButton, setActiveButton] = useState('sublet');
  const [searchValue, setSearchValue] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const handleClick = (button) => {
    setActiveButton(button);
  };

  useEffect(() => {
    const getAllCat = async () => {
      const res = await axios.get(`http://localhost:5000/flatList?search=${searchValue}&sort=${priceSort}`);
      setFlatData(res.data)
    }
    getAllCat();
  }, [searchValue, priceSort])

  // console.log("flatdata", flatData);

  //search

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handlePriceSort = (e) => {
    setPriceSort(e.target.value);
  };




  // add To flat Wishlist-----------------------

  const addToWishlist = async (flat) => {
    console.log(flat);
    try {
      const flatData = {
        userEmail: flat?.userEmail,
        userId: flat?.userId,
        flatWishList: flat?._id,
        roommateWishList: "",
      }
      console.log(flatData);


      await axios.post(`http://localhost:5000/wishList`, flatData);
      console.log('Added to wishlist:', flat);

    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };


  return (
    <>
      <div className='px-5 lg:px-12 flex flex-wrap justify-center gap-10 py-5'>
        {/* this is a two button */}

        <div className="flex border border-black rounded-lg">
          <Link to="/">
            <button
              className={`px-4 py-3 rounded-lg mr-2 lg:w-44 ${activeButton === 'sublet' ? 'bg-green-400 text-black font-semibold border border-black' : 'bg-white text-black font-semibold'}`}
              onClick={() => handleClick('sublet')}
            >
              Find Sublet/Flat
            </button>
          </Link>
          <Link to="/findRoommate">
            <button
              className={`px-4 py-3 rounded-lg lg:w-44 ${activeButton === 'roommate' ? 'bg-green-400 text-black font-semibold border border-black' : 'bg-white text-black font-semibold'}`}
              onClick={() => handleClick('roommate')}
            >
              Find Roommate
            </button>
          </Link>
        </div>

        {/* search functionality */}

        <div className="flex flex-wrap justify-center items-center gap-5">
          <div className='bg-gray-100 border border-black rounded-full px-6'>
            <span>Where</span><br />
            <input
              value={searchValue}
              onChange={handleSearchChange}
              className="bg-gray-100"
              placeholder="Search Location"
            />
          </div>

          <select
            onChange={handlePriceSort}
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

      {/* find Flat cards */}


      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {
          flatData.map((flat, index) => (
            <Link key={index} to={`/flatDetails/${flat._id}`} className="block">
              <div className="shadow-lg max-w-[350px] font-sans rounded-xl space-y-6 my-5 mx-auto bg-white border-black border-2">
                <div className="flex justify-center w-full h-48 lg:h-[280px] relative">
                  <div className="flex justify-end items-center left-4 right-4 top-4 absolute">
                    <button className="flex items-center" onClick={() => addToWishlist(flat)}>
                      <svg width={30} className="hover:fill-red-500 hover:stroke-red-500 stroke-2 fill-transparent stroke-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }}>
                        <g strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"><path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path></g>
                      </svg>
                    </button>
                  </div>
                  <img className="rounded-lg bg-black/40 w-full h-full" src={`http://localhost:5000/image/${flat.flatList.images[0]}`} alt="card navigate ui" />
                </div>
                <div className="mt-3 flex justify-between text-sm px-2 ">
                  <div>
                    <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4">
                      Location {flat.flatList.description.location.address}, {flat.flatList.description.location.city}, {flat.flatList.description.location.postalCode}
                    </h3>
                    <p className="mt-1.5 text-pretty text-xs text-gray-500">
                      HomeType: {flat.flatList.description.type}, {flat.flatList.description.bedroom} bedroom Flat
                    </p>
                  </div>
                  <p className="text-gray-900 font-bold text-lg mb-6">${flat.flatList.description.rent}</p>
                </div>
              </div>
            </Link>
          ))
        }
      </div>

      {/* for pagination */}

      <div className=" flex flex-wrap justify-center mb-10 mt-24">
        <button className="join-item btn btn-outline mr-2">&larr; Previous page</button>
        <button className="join-item btn btn-outline mr-2">1</button>
        <button className="join-item btn btn-outline mr-2">2</button>
        <button className="join-item btn btn-outline mr-2">3</button>
        <button className="mr-2">.....</button>
        <button className="join-item btn btn-outline mr-2">23</button>
        <button className="join-item btn btn-outline mr-2">Next &rarr;</button>
      </div>
    </>
  )
}

export default FindFlat