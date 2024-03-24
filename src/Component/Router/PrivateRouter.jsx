import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Provider/Authprovider/AuthProvider";

const PrivateRouter = ({ children }) => {
    const { user } = useContext(AuthContext);  

    if (!user?.auth) {
         <Navigate to="/login" replace={true}/>;
    }
    return children;
};

export default PrivateRouter;