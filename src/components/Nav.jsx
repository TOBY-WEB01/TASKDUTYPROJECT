import { Link, NavLink, useLocation } from "react-router";
import Drawer from "./Drawer";
import { Menu } from "lucide-react";

export default function Nav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  // const links = [
  //   {
  //     id: 1,
  //        path: "task/alltask",
  //     name: "All task",
  //   },
  //   {
  //     id: 2,
  //     path: "/task/newtask",
  //     name: "New task",
  //   },
  // ];


  const isHomePage = location.pathname === "/";
  const isMyTasksPage = location.pathname === "/task/alltask";
  const isEditOrNewTaskPage =
    location.pathname === "/task/edittask" || location.pathname === "/task/newtask";

  return (
    // <div className="container mx-auto p-4 flex justify-between items-center">
    //   <NavLink to="/">TaskDuty</NavLink>
    //   <div className="flex items-center gap-4">
    //     {links.map((item) => (
    //       <NavLink
    //         to={item.path}
    //         className={({ isActive }) =>
    //           isActive ? "text-green-500 font-semibold" : ""
    //         }
    //       >
    //         {item.name}
    //       </NavLink>
    //     ))}

    //   </div>
    // </div>
    <div className="container mx-auto p-4 flex justify-between items-center">
      <NavLink to="/">
        <img
          src="https://task-duty-proj-client.vercel.app/assets/logo-cQYmEuE8.svg"
          alt=""
        />
      </NavLink>
      <div className=" items-center space-x-3 flex justify-between">
        <div className="hidden md:flex items-center gap-6">
            {isHomePage && (
              <>
                <Link to="/task/newtask" className="font-semibold ">
                  New Task
                </Link>
                <Link to="/task/alltask" className="font-semibold ">
                  All Tasks
                </Link>
              </>
            )}
            {isMyTasksPage && (
              <Link to="/task/newtask" className="font-semibold ">
                New Task
              </Link>
            )}

            {isEditOrNewTaskPage && (
              <Link to="/task/alltask" className="font-semibold ">
                All Task
              </Link>
            )}
            </div>

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
        <img src="/Group 7.png" alt="" className="w-10" />

        <Drawer />
      </div>
    </div>
  );
}
