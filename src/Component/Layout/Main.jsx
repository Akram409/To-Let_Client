import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Main = () => {
  // Check if the current route is '/'
  return (
    <div>
    {/* this is navbar  */}
     <Navbar/>
      
      <Outlet />  
    </div>
  );
};

export default Main;
