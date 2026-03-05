import { Link, NavLink } from "react-router";

export default function Home() {
  return (
    <div className="container  mx-auto p-4 flex flex-col lg:flex-row justify-between items-center mt-5">
      <div className="flex-1 text-center lg:text-start ">
        <h1 className="font-medium text-3xl">
          Manage your Tasks on
          <span className="text-purple-500">
            <br />
            TaskDuty
          </span>
        </h1>
        <p className="md:py-10 py-6  text-gray-500">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni aut
          veritatis obcaecati dolorem reprehenderit ducimus quidem adipisci
          dolore eum! Ipsam rem laudantium atque ab doloremque saepe quam
          praesentium perferendis voluptates!
        </p>
        <Link
          to="task/alltask"
          className="bg-purple-500   rounded text-white px-4 py-3"
        >
          Go To My Tasks
        </Link>
      </div>
      <div className="flex-1 pt-10 lg:pt-0">
        <img
          src="/Component 1.png"
          alt=""
          className="w-full"
        />
      </div>
    </div>
  );
}
