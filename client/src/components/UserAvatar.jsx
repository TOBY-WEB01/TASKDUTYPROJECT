
import { ChevronDown, Lock, LogOut, Notebook, User } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";


export default function UserAvatar() {
const {user, handleLogout}=useAuth()
  return (

          <div className="flex gap-2 items-center">
            <div className="avatar avatar-placeholder">
              <div className="bg-black text-neutral-content w-10 rounded-full">
                {user?.avatar ? (
                  <img src={user?.avatar} alt={user?.fullname} loading="lazy" />
                ) : (
                  <span className="text-xl text-white">
                    {user?.fullname
                      ?.split(" ")
                      .map((name) => name[0])
                      .join("")
                      .toUpperCase()}{" "}
                  </span>
                )}
              </div>
            </div>
            <div className="hidden  md:block dropdown dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost capitalize  p-1 "
              >
                {user?.fullname} <ChevronDown />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-(--darkgrey) rounded-box z-1 w-52 p-2 shadow-sm  "
              >
              
                {user?.role === "admin" && (
                  <li>
                    <Link to="/admin">
                      <div className="flex gap-2 items-center">
                        <Lock />
                        <span>Admin</span>
                      </div>
                    </Link>
                  </li>
                )}
                <li>
                  <div
                    className="flex gap-2 items-center"
                    role="button"
                    aria-label="logout button"
                    onClick={handleLogout}
                  >
                    <LogOut />
                    <span>Logout</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
  )
}
