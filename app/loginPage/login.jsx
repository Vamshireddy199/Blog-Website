"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false); // Toggle for new user registration
  const router = useRouter();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const endpoint = isNewUser ? "/api/register" : "/api/login";

    try {
      const response = await axios.post(endpoint, { email, password });
      if (response.data.success) {
        toast.success(response.data.msg);
        router.push("/admin"); // Redirect to the admin page
      } else {
        toast.error(response.data.msg || "Authentication failed");
      }
    } catch (error) {
      toast.error("Error during authentication. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <h1 className="text-center text-2xl font-medium">Welcome to NextBlog</h1>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col max-w-md mx-auto mt-10"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {isNewUser ? "Register & Login" : "Login"}
        </button>
      </form>
      <p
        className="text-center mt-4 cursor-pointer text-blue-500"
        onClick={() => setIsNewUser(!isNewUser)}
      >
        {isNewUser
          ? "Already have an account? Login here."
          : "New user? Register here."}
      </p>
    </div>
  );
};

export default LoginPage;
