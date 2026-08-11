"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function AddAdmin() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    username: "",
    password: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const addAdmin = async (e) => {

    e.preventDefault();

    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.username ||
      !form.password
    ) {

      toast.error("Please fill all fields");
      return;

    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {

      toast.error("Invalid Email Address");
      return;

    }

    if (form.phone.length !== 11) {

      toast.error("Phone number must be 11 digits");
      return;

    }

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/admin/register",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await response.json();

      if (data.message === "Admin Created Successfully") {

        toast.success(data.message);

        setTimeout(() => {

          router.push("/admin");

        }, 1000);

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      toast.error("Cannot connect to Spring Boot");

    } finally {

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center p-10">

    <Toaster position="top-right" />
  
    <form
      onSubmit={addAdmin}
      className="bg-zinc-900 border border-gray-700 w-[560px] rounded-2xl shadow-2xl p-10"
    >
  
      <div className="text-center mb-8">
  
        <div className="text-6xl mb-3">
          👨‍💼
        </div>
  
        <h1 className="text-3xl font-bold text-white">
          Create New Administrator
        </h1>
  
        <p className="text-gray-400 mt-2">
          Create a new administrator account with full system access.
        </p>
  
      </div>
  
      <div className="grid gap-4">
  
        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="p-3 rounded bg-zinc-800 border border-gray-700 text-white outline-none"
        />
  
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-3 rounded bg-zinc-800 border border-gray-700 text-white outline-none"
        />
  
        <input
          name="phone"
          placeholder="Phone Number"
          maxLength={11}
          inputMode="numeric"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value.replace(/\D/g, "")
            })
          }
          className="p-3 rounded bg-zinc-800 border border-gray-700 text-white outline-none"
        />
  
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="p-3 rounded bg-zinc-800 border border-gray-700 text-white outline-none"
        />
  
        <div className="flex">
  
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-l bg-zinc-800 border border-gray-700 text-white outline-none"
          />
  
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="bg-gray-700 hover:bg-gray-600 px-4 rounded-r text-white"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
  
        </div>
  
      </div>
  
      <button
        type="submit"
        disabled={loading}
        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold p-4 rounded-lg transition"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Creating Admin...
          </span>
        ) : (
          "👨‍💼 Create Admin"
        )}
      </button>
  
      <button
        type="button"
        onClick={() => router.push("/admin")}
        className="w-full mt-3 bg-zinc-700 hover:bg-zinc-600 p-4 rounded-lg text-white font-semibold transition"
      >
        ← Cancel
      </button>
  
    </form>
  
  </main>

  );

}

