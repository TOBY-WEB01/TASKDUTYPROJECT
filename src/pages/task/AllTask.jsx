import { SquarePen } from "lucide-react";
import { Link } from "react-router";

export default function AllTask() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container px-4 mx-auto space-y-10">
      <div className="flex justify-between my-10">
        <div>
          <h1 className="text-4xl">My Tasks</h1>
        </div>
        <div className="pt-3">
          <Link to="/task/newtask" className="text-xl text-purple-600">
            + Add new task
          </Link>
        </div>
      </div>
      <div className="border border-gray-300 rounded-md px-3">
        <div className="flex justify-between py-4">
          <p className="mt-3 text-[17px] text-red-300">Urgent</p>
          <div className="flex gap-2">
            <div className="">
              <Link to="/task/edittask" className="bg-purple-600 py-1 px-4 border-purple-600 text-white rounded-sm flex gap-2">
                <img src="/clarity_note-edit-line.png" alt="" />
                Edit
              </Link>
            </div>
            <div>
              <button className="py-1 px-2 border border-purple-600 text-purple-600 rounded-sm flex gap-2">
                <img src="/fluent_delete-24-regular.png" alt="" />
                Delete
              </button>
            </div>
          </div>
        </div>
        <hr className="text-gray-300" />
        <h2 className="py-3 text-3xl font-medium">Fintech Website Update</h2>
        <p className="text-justify text-gray-700 pb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut dui
          varius turpis facilisis ultricies a id elit. Pellentesque at ante in
          tortor pharetra finibus. In volutpat, risus vitae fringilla porttitor,
          ipsum ante porta ex, ut pellentesque tellus ipsum non orci. Donec sit
          amet euismod mi. Ut vel eros in ipsum congue porttitor.
        </p>
      </div>

      <div className="border border-gray-300 rounded-md px-3">
        <div className="flex justify-between py-4">
          <p className="mt-3 text-[17px] text-green-300">Important</p>
          <div className="flex gap-2">
            <div className="">
              <Link to="/task/edittask" className="bg-purple-600 py-1 px-4 border-purple-600 text-white rounded-sm flex gap-2">
                <img src="/clarity_note-edit-line.png" alt="" />
                Edit
              </Link>
            </div>
            <div>
              <button className="py-1 px-2 border border-purple-600 text-purple-600 rounded-sm flex gap-2">
                <img src="/fluent_delete-24-regular.png" alt="" />
                Delete
              </button>
            </div>
          </div>
        </div>
        <hr className="text-gray-300" />
        <h2 className="py-3 text-3xl font-medium">Agro Website Update</h2>
        <p className="text-justify text-gray-700 pb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut dui
          varius turpis facilisis ultricies a id elit. Pellentesque at ante in
          tortor pharetra finibus. In volutpat, risus vitae fringilla porttitor,
          ipsum ante porta ex, ut pellentesque tellus ipsum non orci. Donec sit
          amet euismod mi. Ut vel eros in ipsum congue porttitor.
        </p>
      </div>

      <div className="border border-gray-300 rounded-md px-3">
        <div className="flex justify-between py-4">
          <p className="mt-3 text-[17px] text-red-300">Urgent</p>
          <div className="flex gap-2">
            <div className="">
              <Link to="/task/edittask" className="bg-purple-600 py-1 px-4 border-purple-600 text-white rounded-sm flex gap-2">
                <img src="/clarity_note-edit-line.png" alt="" />
                Edit
              </Link>
            </div>
            <div>
              <button className="py-1 px-2 border border-purple-600 text-purple-600 rounded-sm flex gap-2">
                <img src="/fluent_delete-24-regular.png" alt="" />
                Delete
              </button>
            </div>
          </div>
        </div>
        <hr className="text-gray-300" />
        <h2 className="py-3 text-3xl font-medium">Fintech Website Update</h2>
        <p className="text-justify text-gray-700 pb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut dui
          varius turpis facilisis ultricies a id elit. Pellentesque at ante in
          tortor pharetra finibus. In volutpat, risus vitae fringilla porttitor,
          ipsum ante porta ex, ut pellentesque tellus ipsum non orci. Donec sit
          amet euismod mi. Ut vel eros in ipsum congue porttitor.
        </p>
      </div>

      <div className="border border-gray-300 rounded-md px-3">
        <div className="flex justify-between py-4">
          <p className="mt-3 text-[17px] text-green-300">Important</p>
          <div className="flex gap-2">
            <div className="">
              <Link to="/task/edittask" className="bg-purple-600 py-1 px-4 border-purple-600 text-white rounded-sm flex gap-2">
                <img src="/clarity_note-edit-line.png" alt="" />
                Edit
              </Link>
            </div>
            <div>
              <button className="py-1 px-2 border border-purple-600 text-purple-600 rounded-sm flex gap-2">
                <img src="/fluent_delete-24-regular.png" alt="" />
                Delete
              </button>
            </div>
          </div>
        </div>
        <hr className="text-gray-300" />
        <h2 className="py-3 text-3xl font-medium">Agro Website Update</h2>
        <p className="text-justify text-gray-700 pb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut dui
          varius turpis facilisis ultricies a id elit. Pellentesque at ante in
          tortor pharetra finibus. In volutpat, risus vitae fringilla porttitor,
          ipsum ante porta ex, ut pellentesque tellus ipsum non orci. Donec sit
          amet euismod mi. Ut vel eros in ipsum congue porttitor.
        </p>
      </div>
      <button
        onClick={scrollToTop}
        className="underline text-purple-500 my-4 text-center w-full"
      >
        Back To Top
      </button>
    </div>
  );
}
