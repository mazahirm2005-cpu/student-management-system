"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function AddStudent() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    fatherName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    cnic: "",
    address: "",
    username: "",
    password: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const addStudent = async (e) => {

    e.preventDefault();

    // Validation

    if (
      !form.fullName ||
      !form.fatherName ||
      !form.email ||
      !form.phone ||
      !form.dob ||
      !form.gender ||
      !form.cnic ||
      !form.address ||
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


    if (form.cnic.replace(/\D/g, "").length !== 13) {
      toast.error("CNIC must be 13 digits");
      return;
    }

    if (form.username.length < 4) {
      toast.error("Username must be at least 4 characters");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await response.json();

      if (data.message === "Account Created Successfully") {

        toast.success(data.message);

        setTimeout(() => {

          router.push("/students");

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

    <main className="min-h-screen bg-black flex items-center justify-center p-10">

      <Toaster position="top-right" />

      <form
        onSubmit={addStudent}
        className="bg-zinc-900 w-[750px] rounded-xl shadow-xl p-10"
      >

        <h1 className="text-4xl font-bold text-white text-center mb-8">
          ➕ Add Student
        </h1>

        <div className="grid grid-cols-2 gap-4">

          <input
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            className="p-3 rounded bg-zinc-800 border border-gray-700 text-white outline-none"
          />

          <input
            name="fatherName"
            placeholder="Father Name"
            onChange={handleChange}
            className="p-3 rounded bg-zinc-800 border border-gray-700 text-white outline-none"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="p-3 rounded bg-zinc-800 border border-gray-700 text-white outline-none"
          />

<input
  name="phone"
  placeholder="03XXXXXXXXX"
  value={form.phone}
  maxLength={11}
  inputMode="numeric"
  onChange={(e) =>
    setForm({
      ...form,
      phone: e.target.value.replace(/\D/g, "")
    })
  }
  className="p-3 rounded bg-zinc-800 border border-gray-700 text-white outline-none"
/>

          <input
            name="dob"
            type="date"
            onChange={handleChange}
            className="p-3 rounded bg-zinc-800 border border-gray-700 text-white outline-none"
          />

          <select
            name="gender"
            onChange={handleChange}
            className="p-3 rounded bg-zinc-800 border border-gray-700 text-white outline-none"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input
  name="cnic"
  placeholder="35202-1234567-1"
  value={form.cnic}
  maxLength={15}
  inputMode="numeric"
  onChange={(e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 5) {
      value = value.slice(0, 5) + "-" + value.slice(5);
    }

    if (value.length > 13) {
      value = value.slice(0, 13) + "-" + value.slice(13, 14);
    }

    setForm({
      ...form,
      cnic: value
    });
  }}
  className="p-3 rounded bg-zinc-800 border border-gray-700 text-white outline-none"
/>

          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="p-3 rounded bg-zinc-800 border border-gray-700 text-white outline-none"
          />

          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="p-3 rounded bg-zinc-800 border border-gray-700 text-white outline-none"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="p-3 rounded bg-zinc-800 border border-gray-700 text-white outline-none"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 p-4 rounded-lg text-xl font-bold text-white"
        >
          {loading ? "Adding Student..." : "➕ Add Student"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/students")}
          className="w-full mt-3 bg-gray-700 hover:bg-gray-800 p-4 rounded-lg text-white font-semibold"
        >
          ← Back
        </button>

      </form>

    </main>

  );

}