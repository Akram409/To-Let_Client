import { useState } from 'react'
import { Link } from 'react-router-dom';

const FindRoommate = () => {
    const [activeButton, setActiveButton] = useState('roommate');

    const handleClick = (button) => {
        setActiveButton(button);
    };

    const menus = [

        {

            location: 'Khilgaon, Dhaka',
            image: "https://source.unsplash.com/350x150/?northern",
            userImage: "https://source.unsplash.com/150x150/?portrait?3",
            HomeType: 2,
            price: 15000,
        },

        {

            location: 'Khilgaon, Dhaka',
            image: "https://source.unsplash.com/350x150/?northern",
            userImage: "https://source.unsplash.com/150x150/?portrait?3",
            HomeType: 2,
            price: 15000,
        },

        {

            location: 'Khilgaon, Dhaka',
            image: "https://source.unsplash.com/350x150/?northern",
            userImage: "https://source.unsplash.com/150x150/?portrait?3",
            HomeType: 2,
            price: 15000,
        },

        {

            location: 'Khilgaon, Dhaka',
            image: "https://source.unsplash.com/350x150/?northern",
            userImage: "https://source.unsplash.com/150x150/?portrait?3",
            HomeType: 2,
            price: 15000,
        },

    ]



    return (
        <>
            <div className='px-5 lg:px-12 flex flex-wrap justify-center gap-10 py-5'>

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
                            className={`px-4  py-3 rounded-lg lg:w-44 ${activeButton === 'roommate' ? 'bg-green-400 text-black font-semibold border border-black' : 'bg-white text-black font-semibold'}`}
                            onClick={() => handleClick('roommate')}
                        >
                            Find Roommate
                        </button>
                    </Link>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-5">
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
                        <option className="font-bold" value="bold" disabled>
                            Gender
                        </option>
                        <option>Female</option>
                        <option>Male</option>
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
            {/* roommate cards  */}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4 mt-10 gap-5'>
                {
                    menus.map((flat, index) =>
                    <Link key={index} to="/roommateDetails/:id" className='block'>
                    <div className='bg-white shadow-lg px-4 py-5 rounded-lg'>
                      <div className="relative grid h-[20rem] w-full max-w-[22rem] flex-col items-end justify-end overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
                        <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent  bg-cover bg-clip-border bg-center text-gray-700 shadow-none" style={{ backgroundImage: `url(${flat.image})` }}>
                          <div className="flex justify-end px-5 py-6">
                            <svg width={30} className="hover:fill-red-500 hover:stroke-red-500 stroke-2 fill-transparent stroke-white " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }}><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path></g></svg>
                          </div>
                        </div>
                        <div className="relative top-1 p-6 px-6 py-6 md:px-5">
                          <img alt="user" src={flat.userImage} className="relative inline-block h-[80px] w-[80px] !rounded-lg border-2 border-white object-cover object-center" />
                        </div>
                      </div>
                      <div className="mt-3 flex gap-24 text-sm">
                        <div>
                          <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4">
                            Location {flat.location}
                          </h3>
                          <p className="mt-1.5 text-pretty text-xs text-gray-500">
                            HomeType: {flat.HomeType} bedroom Flat
                          </p>
                        </div>
                        <p className="text-gray-900 font-bold text-2xl">${flat.price}</p>
                      </div>
                    </div>
                  </Link>
                    )
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

export default FindRoommate