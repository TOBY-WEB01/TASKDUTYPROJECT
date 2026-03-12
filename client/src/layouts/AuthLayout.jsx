import { Outlet } from "react-router";
import Nav from "../components/Nav";
import Logo from "../components/Logo";

export default function AuthLayout() {
  return (
    <div className=" lg:grid grid-cols-12   min-h-screen auth-background auth-layout">
      <div
        className=" col-span-6"
        style={{ backgroundImage: "url('/taskAuthImage.jpeg')" }}
      >
        <div className="flex justify-center">
          <Logo />
        </div>
      </div>
      <div className=" md:pt-20 col-span-12 md:col-span-6 p-4">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
