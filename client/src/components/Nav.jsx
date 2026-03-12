import { Link, NavLink, useLocation } from "react-router";
import Drawer from "./Drawer";
import { Menu } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import UserAvatar from "./UserAvatar";

export default function Nav() {
  const location = useLocation();
   const {user }    = useAuth();





  const isHomePage = location.pathname === "/";
  const isMyTasksPage = location.pathname === "/task/alltask";
  const isEditOrNewTaskPage =
    location.pathname === "/task/edittask" || location.pathname === "/task/newtask";

  return (
 
    <div className="container mx-auto p-4 flex justify-between items-center">
      <NavLink to="/">
        <img
          src="/Group 2 (1).png"
          alt=""
        />
      </NavLink>
      <div className=" items-center space-x-3 flex justify-between">
         {user ? (
        <><div className="hidden  md:flex items-center    gap-6">
            {isHomePage && (
              <>
                <Link to="/task/newtask" className="font-medium text-xl">
                  New Task
                </Link>
                <Link to="/task/alltask" className="font-medium text-xl">
                  All Tasks
                </Link>
              </>
            )}
            {isMyTasksPage && (
              <Link to="/task/newtask" className="font-medium text-xl">
                New Task
              </Link>
            )}

            {isEditOrNewTaskPage && (
              <Link to="/task/alltask" className="font-medium text-xl">
                All Task
              </Link>
            )}
          </div><UserAvatar /></> 
            ) : (
              <div className="hidden  md:flex gap-4   md:gap-0  md:space-x-3   ">
                <Link
                  to="/auth/createAccount"
                  className=" border-0 rounded-3xl  md:px-6 md:py-2 "
                >
                  Sign Up
                </Link>
                <Link
                  to="/auth/login"
                  className="  md:px-6 md:py-2"
                >
                  Log In
                </Link>
              </div>
            )}

        {/* <div className="hidden md:block space-x-6">
          <NavLink
            to="task/newtask"
            className={({ isActive }) =>
              isActive ? "text-purple-500" : "text-black"
            }
          >
            New Task
          </NavLink>
          <NavLink
            to="task/alltask"
            className={({ isActive }) =>
              isActive ? "text-purple-500" : "text-black"
            }
          >
            {" "}
            All Tasks{" "}
          </NavLink>
        </div> */}

        {/* {links.map((item) => (
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              isActive ? "text-purple-500 font-semibold" : ""
            }
          >
            {item.name}
          </NavLink>
        ))} */}
        {/* <img src="/Group 7.png" alt="" className="w-10" /> */}

        <Drawer />
      </div>
    </div>
  );
}
