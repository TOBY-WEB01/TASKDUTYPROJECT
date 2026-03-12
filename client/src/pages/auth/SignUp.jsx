import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { validateRegisterUserSchema } from "../../utils/dataSchema";

import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { registerUser } from "../../api/auth";
import { Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

export default function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateRegisterUserSchema),
  });
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      toast.success(res.data.message || "Registration Successful");
      navigate("/");
      //save access token and redirect user to home page
      setAccessToken(res.data.data);
    },
    onError: (error) => {
      import.meta.env.DEV && console.error(error);
      toast.error(error?.response?.data?.message || "Registration failed");
    },
  });

  const onSubmitForm = async (data) => {
    console.log("SUBMIT DATA", data);
    mutation.mutate(data);
  };

  return (
    <div className="container px-4 mx-auto">
      <div className="flex flex-col justify-center items-center pt-20">
        <div className="">
          <h1 className="font-bold text-4xl text-center">Register for an account</h1>
           <h2 className="text-center pb-3 pt-5">
          Enter Your Information To Create An Account
        </h2>
        </div>
        <div className="">
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="fieldset bg-base-200 border-base-300 rounded flex flex-col w-90 md:w-100 justify-between gap-4 border p-4"
          >
            <input
              type="name"
              className="input border p-2 w-full rounded"
              placeholder="Username"
              {...register("fullname")}
            />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors?.fullname.message}</p>
            )}
            <input
              type="email"
              className="input border p-2 w-full  rounded"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors?.email.message}</p>
            )}

            <input
              type="password"
              className="input border p-2 w-full rounded"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors?.password.message}</p>
            )}

            <button
              className="btn btn-neutral text-white bg-purple-600 mt-4 border p-2 rounded"
              disabled={mutation.isPending}
              type="submit"
            >
              {mutation.isPending ? "Loading..." : "Sign Up"}
            </button>
            <h1 className="text-center">
              Have an account?{" "}
              <span className="text-purple-600 font-bold">
                {" "}
                <Link to="/auth/login">Login</Link>
              </span>{" "}
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
}
