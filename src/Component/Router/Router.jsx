import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Page/Home/Home";
import Login from "../Authentication/Login/Login";
import SignUp from "../Authentication/SignUp/SignUp";
import FindRoommate from "../Page/FindRoommate/FindRoommate";
import FlatDetails from "../Page/FindFlat/FlatDetails";
import RoommateDetails from "../Page/FindRoommate/RoommateDetails";
// import Profile from "../Share/Profile/Profile";
// import PrivateRouter from "./PrivateRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element:  <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      // {
      //   path: "/profile",
      //   element: <PrivateRouter><Profile /></PrivateRouter>,
      // },
      // {
      //   path: "/private",
      //   element: <PrivateRouter /> ,
      // },

      {
        path:"/findRoommate",
        element:<FindRoommate/>
      },
      {
        path:"/flatDetails/:id",
        element:<FlatDetails/>
      },
      {
        path:"/roommateDetails/:id",
        element:<RoommateDetails/>
      }
    ],
  },
]);
