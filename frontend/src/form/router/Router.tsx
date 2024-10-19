import { createBrowserRouter } from "react-router-dom";
import { AppConst } from "../../helper/AppConst";
import Signup from "../user/Signup";
import { Login } from "../login/Login";
import { Layout } from "../layout/Layout";
import Profile from "../user/Profile";

export const router = createBrowserRouter([
    {
        path:"/login",
        Component: Login
    },
    {
        path:AppConst.RouteLink_Signup,
        Component: Signup
    },
    {
        path:AppConst.RouteLink_Root,
        Component: Layout,
        children: [
            {
                path:`${AppConst.RouteLink_Profile}`,
                Component: Profile
            }
        ]
    }
]);