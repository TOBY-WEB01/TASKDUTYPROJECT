import { ChevronDown, ChevronLeft } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

export default function EditTask() {
  return (
  <div className="container px-4 mx-auto w-full">
      <div className="flex items-center gap-1 my-6 md:my-10 ">
        <Link to="/task/alltask">
          <ChevronLeft />
        </Link>

        <Link to="/task/alltask" className="text-2xl font-semibold">Edit Task</Link>
      </div>

      <form className=" pt-5 flex flex-col gap-6 w-full">
        <div className="flex flex-col relative border  border-gray-200">
          <label
            htmlFor=""
            className="text-lg absolute -top-3 left-7 bg-white font-medium text-gray-500"
          >
            Task Title
          </label>
          <input
            type="text"
            placeholder="E.g Project Defense, Assignment ..."
            className=" py-4 px-2 outline-none w-full pl-7"
            defaultValue="Project Completion"
          />
        </div>
        <div className="mt-6 relative border border-gray-200 ">
          <label
            htmlFor=""
            className="text-lg font-medium  absolute -top-3 left-7 bg-white  text-gray-500"
          >
            Description
          </label>
          <textarea
            name=""
            id=""
            placeholder="Briefly describe your task..."
            className="outline-none resize-none w-full pl-7 pt-5"
            rows={5}
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra sit in aliquam pretium. Diam consectetur at tincidunt sed non tempus faucibus posuere eu. Nisi, luctus turpis pharetra quis nunc nulla. At lectus faucibus mattis ante eleifend ac arcu. Nibh morbi adipiscing leo tempus non dolor viverra cras. Sapien in nulla cum fermentum auctor lectus orci. Felis tincidunt lacus, fermentum laoreet sit sit. Lacus, orci pretium, etiam justo lacus. Amet, ultrices eget auctor euismod vitae diam."
          ></textarea>
        </div>
        <div className="mt-10 relative">
        <fieldset className="border mb-4 border-gray-200 rounded w-full">
          <legend className="ml-5 text-lg text-gray-500">Tags</legend>
          <div className="flex items-center justify-between h-8 mt-2 mb-4 px-5">
            <div className="flex items-center gap-4 ">
              <span className="bg-gray-500 text-white rounded px-4 py-1 text-xs cursor-pointer">
                Urgent
              </span>
              <span className="bg-gray-500 text-white  rounded px-4 py-1 text-xs cursor-pointer">
                Important
              </span>
            </div>
            <ChevronDown size={30} className="cursor-pointer text-(--tags-color)"/>
          </div>
        </fieldset>
      </div>
      </form>
      <button className="bg-purple-500 mt-7 text-white w-full rounded py-3">
        Done
      </button>
    
    </div>
  )
}
