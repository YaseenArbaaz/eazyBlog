import React, { useState } from "react";
import authService from "../appwrite/auth_service";
import { login } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentAccount();

        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
        alert("Login successful")
      }
      else alert("Incorrect password or email. Please try again");
    } catch (error) {
      console.log(setError(error.message)) 
      alert("Login failed")
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 bg-white p-4  rounded-lg ">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-300 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Log in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        {/* React-hook-form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" w-full flex flex-col   justify-center items-center "
        >
          <Input
            type="email"
            label="Email: "
            placeholder="Enter your email"
            {...register("email", {
              required: "Email must be provided",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Invalid email address",
              },
            })}
          />

          {errors.email && (
            <p className="text-red-600 mt-1">{errors.email.message}</p>
          )}
          <Input
            label="Password: "
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-600 mt-1">{errors.password.message}</p>
          )}
          <Button type="submit" text="Login" className="w-2/3" />
        </form>
      </div>{" "}
    </div>
  );
}

export default Login;
