import { Link, useNavigate } from "react-router";
import { validateLoginUserSchema } from "../../utils/dataSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../../api/auth";

import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
// import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const [revealPassword, setRevealPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateLoginUserSchema),
  });
  const { setAccessToken, user } = useAuth();

  const togglePasswordReveal = (e) => {
    e.preventDefault();
    setRevealPassword((prev) => !prev);
  };

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      toast.success(res.data.message || "Login Successful");
      navigate("/");
      //save access token and redirect user to home page
      setAccessToken(res.data.data);
      if (user && !user?.isEmailVerified) navigate("/verify-email");
    },
    onError: (error) => {
      import.meta.env.DEV && console.error(error);
      toast.error(error?.response?.data?.message || "Login failed");
    },
  });

  const onSubmitForm = async (data) => {
    mutation.mutate(data);
  };
  return (
    <div className="container px-4 mx-auto">
      <div className=" pt-20">
        <div className="">
          <h1 className="font-bold text-4xl text-center">Welcome back!</h1>
          <h2 className=" text-center pb-3 pt-5">
            Enter Your Details To Continue
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="fieldset bg-base-200 border-base-300 rounded flex flex-col w-90 md:w-100 justify-between gap-4  p-4"
          >
            <div>
              <input
                type="name"
                className="input w-full bg-white border p-2 rounded"
                {...register("fullname")}
                placeholder="Username"
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm">
                  {errors?.fullname.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                type={revealPassword ? "text" : "password"}
                className="input border w-full p-2 rounded bg-white "
                {...register("password")}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={togglePasswordReveal}
                className="absolute  right-3 top-1 translate-y-1 text-gray-600 z-10"
              >
                {revealPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors?.password.message}
                </p>
              )}
            </div>

            <button
              className="btn btn-neutral bg-purple-600 text-white mt-4 border p-2 rounded"
              type="submit"
            >
              {mutation.isPending ? (
                <>
                  {" "}
                  <Loader className="animate-spin" />{" "}
                </>
              ) : (
                "continue"
              )}
            </button>
            <h1 className="text-center">
              Don't have an account?{" "}
              <span className="text-purple-600 font-bold">
                <Link to="/auth/createAccount">SignUp</Link>
              </span>{" "}
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
}
