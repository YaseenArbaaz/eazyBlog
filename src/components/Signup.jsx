import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Input, Button, Logo } from "../components/index";
import authService from "../appwrite/auth_service";
import { login as Authlogin } from "../features/authSlice";
import { Account } from "appwrite";
function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const signup = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentAccount();
        alert("account created")
        if (userData) dispatch(Authlogin(userData));
        else alert("account not found")
        navigate("/");
      }
    } catch (error) {
      console.log(setError(error.message)); setError(error.message);
      alert(error)
    }
  };

  return (
    <div className=" flex flex-col gap-5 bg-white p-4  rounded-lg ">
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
         already have account&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Log in
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
    
      {/* react-hook-form */}
      <form onSubmit={handleSubmit(signup)}>
        <Input
          label="Full Name: "
          name="name"
          type="text"
          placeholder="Enter your full name"
          {...register("name", {
            required: true,
          })}
        />
        <Input
          label="Email: "
          name="email"
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: true,
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "Invalid email address",
            },
          })}
        />

        <Input
          label="Password: "
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: true,
          })}
        />
        <Button type="submit" className="w-2/3" text="Create Account" />
      </form>
    </div>  </div>
  );
}

export default Signup;
