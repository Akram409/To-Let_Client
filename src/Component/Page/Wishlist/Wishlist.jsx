import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const Wishlist = () => {
    const {auths} = useContext(AuthContext)
    const user = auths?.user;
    const [listData, setListData] = useState([])

    
    useEffect(() => {
        const getWishListDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/wishlist/${user?.email}`);
                setListData(response.data);
            } catch (error) {
                console.error("Error fetching flat details:", error);
            }
        };
        getWishListDetails();
    },[]);
    
    console.log(listData);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/wishlists/${id}`);
            setListData(prevData => prevData.filter(item => item._id !== id));
            
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-[90%] shadow-md border mx-auto border-gray-100 my-6">
                    <thead>
                    <tr className="bg-green-400 text-black">
                            <th className="py-4 px-6 text-lg text-left border-b">User Email</th>
                            <th className="py-4 px-6 text-lg text-left border-b">User ID</th>
                            <th className="py-4 px-6 text-lg text-left border-b">Types</th>
                            <th className="py-4 px-6 text-lg border-b text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listData?.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50 border-b transition duration-300">
                                <td className="py-4 px-4">{item.userEmail}</td>
                                <td className="py-4 px-6 border-b text-xl font-medium">{item.userId}</td>
                                
                                <td className="py-4 px-6 border-b text-lg font-medium">{item.flatWishList ? "FlatData" : "Roommate"}</td>
                                <td className="py-4 px-6 border-b text-end">
                                    <button onClick={() => handleDelete(item._id)} className="bg-red-500 hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-4 rounded-md">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Wishlist
