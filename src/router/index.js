import { createBrowserRouter, redirect } from "react-router";
import Dashboard from "../pages/Dashboard";
import Mytasks from "../pages/MyTasks";
import Settings from "../pages/Settings";
import Sidebar from "../components/SideBar";
import Login from "../pages/Login";
import Register from "../pages/Register";

const auth = () => {
    const token = localStorage.getItem("token")
    if (!token) {
        return redirect("/")
    }
}


export default createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register
  },
  {
    Component: Sidebar,
    loader: auth,
    children: [
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/mytasks",
        Component: Mytasks,
      },
      {
        path: "/settings",
        Component: Settings,
      },
    ],
  },
]);