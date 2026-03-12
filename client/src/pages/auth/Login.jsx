import { Link, useNavigate } from "react-router";
import { validateLoginUserSchema } from "../../utils/dataSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../../api/auth";

import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
// import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateLoginUserSchema),
  });
  const { setAccessToken, user } = useAuth();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      toast.success(res.data.message || "Login Successful");
      navigate("/")
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
     console.log("SUBMIT DATA", data);
    mutation.mutate(data);
  };
  return (
    <div className="container px-4 mx-auto">
      <div className=" pt-30">
        <div className="">
       <h1 className="font-bold text-4xl text-center">Welcome back!</h1>
        <h2 className=" text-center pb-3 pt-5">Enter Your Details To Continue</h2>
        </div>
        <div className="flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="fieldset bg-base-200 border-base-300 rounded flex flex-col w-90 md:w-100 justify-between gap-4 border p-4"
          >
            <input
              type="name"
              className="input w-full border p-2 rounded"
              {...register("fullname")}
              placeholder="Username"
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors?.fullname.message}</p>
            )}

            <input
              type="password"
              className="input border w-full p-2 rounded"
              {...register("password")}
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors?.password.message}</p>
            )}

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

