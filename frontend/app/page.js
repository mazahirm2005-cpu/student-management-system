"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Home() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {

    const logoutMessage = sessionStorage.getItem("logoutMessage");
  
    if (logoutMessage) {
      toast.success(logoutMessage);
      sessionStorage.removeItem("logoutMessage");
    }
  
    const expiredMessage = sessionStorage.getItem("sessionExpired");
  
    if (expiredMessage) {
      toast.error(expiredMessage);
      sessionStorage.removeItem("sessionExpired");
    }
  
  }, []);


const login = async () => {
  try {
    setLoading(true);

    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    console.log("Login Response:", data);
    console.log("Login Status:", response.status);

    // Invalid username/password
    if (data.message !== "Login Successful") {
      toast.error(data.message || "Invalid Username or Password");
      return;
    }

    // Login successful
    sessionStorage.setItem("username", data.username);
    sessionStorage.setItem("role", data.role);

    document.cookie = `role=${data.role}; path=/`;

    toast.success("Login Successful");

    // Redirect according to role
    if (data.role === "ADMIN") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }

  } catch (error) {
    console.error("Login Error:", error);

    toast.error("Cannot connect to Spring Boot Server");

  } finally {
    setLoading(false);
  }
};




  return (

    <main className="min-h-screen bg-black flex items-center justify-center">

  <form
    onSubmit={(e) => {
      e.preventDefault();
      login();
    }}
    className="bg-zinc-900 border border-gray-700 rounded-xl shadow-xl p-8 w-96"
  >

        <div className="text-center">

          <div className="text-6xl mb-3">
            🎓
          </div>

          <h1 className="text-3xl font-bold text-white">
          Student Information & Management System
          </h1>

          <p className="text-gray-400 mt-2 mb-6">
            Login to Continue
          </p>

        </div>


        <label className="text-white font-medium">
          Username
        </label>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mt-2 mb-4 p-3 rounded bg-zinc-800 border border-gray-700 text-white outline-none"
        />


        <label className="text-white font-medium">
          Password
        </label>

        <div className="flex mt-2 mb-5">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-l bg-zinc-800 border border-gray-700 text-white outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="bg-gray-700 text-white px-4 rounded-r"
          >
            {showPassword ? "Hide" : "Show"}
          </button>

        </div>


        <button
  type="submit"
  disabled={loading}
  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold p-3 rounded"
>
{loading ? (
  <span className="flex items-center justify-center gap-2">
    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
    Logging in...
  </span>
) : (
  "Login"
)}
</button>


        <p className="text-center text-gray-400 mt-5">

          Don't have an account?{" "}

          <a
            href="/register"
            className="text-blue-400"
          >
            Create Account
          </a>

        </p>

      </form>

    </main>

  );

}