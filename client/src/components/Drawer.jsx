import { LogOut, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);
  const {user, handleLogout}=useAuth()

  return (
    <>
      <Menu onClick={() => setIsOpen(true)} className=" md:hidden" />
      <div
        className={`drawer fixed top-0 left-0 z-40 ${
          isOpen ? "drawer-open" : ""
        }`}
      >
        <input
          id="my-drawer-1"
          type="checkbox"
          className="drawer-toggle"
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
        />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-1"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={() => setIsOpen(false)}
          ></label>
          <div className="menu  bg-white  text-base-content min-h-full w-90 p-4">
         <NavLink to="/">
        <img
          src="/Group 2 (1).png"
          alt=""
        />
      </NavLink>
            <button
              className="absolute right-3 top-8 btn btn-circle btn-sm btn-ghost"
              onClick={() => setIsOpen(false)}
            >
              <X className="" />
            </button>
            {user? (  <div className="flex flex-col mt-10 gap-4 ">
                {" "}
                <Link
                  to="/task/newtask"
                  className="font-medium text-xl"
                  onClick={() => setIsOpen(false)}
                >
                 New Task
                </Link>
                <Link
                  to="/task/alltask"
                  className="font-medium text-xl"
                  onClick={() => setIsOpen(false)}
                >
                  All Task
                </Link>
                 <div
                    className="flex gap-2 items-center mt-100"
                    role="button"
                    aria-label="logout button"
                    onClick={handleLogout}
                  >
                    <LogOut />
                    <span>Logout</span>
                  </div>
              </div>

            ) :  <div className="flex flex-col mt-10 gap-4 ">
            <Link
                to="/auth/createAccount"
                className="  text-2xl  "
              >
                Sign Up
              </Link><Link
                to="/auth/login"
                className=" text-2xl "
              >
                  Log In
                </Link>
                
                </div>

            }

             

          </div>
        </div>
      </div>
    </>
  );
}
