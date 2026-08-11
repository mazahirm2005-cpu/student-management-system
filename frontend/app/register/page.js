"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [cnic, setCnic] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCnicChange = (e) => {
    let value = e.target.value;
  
    // Sirf numbers aur dash allow
    value = value.replace(/\D/g, "");
  
    // Maximum 13 digits
    value = value.slice(0, 13);
  
    // Auto dash lagana
    if (value.length > 5 && value.length <= 12) {
      value = value.slice(0, 5) + "-" + value.slice(5);
    } 
    else if (value.length > 12) {
      value =
        value.slice(0, 5) +
        "-" +
        value.slice(5, 12) +
        "-" +
        value.slice(12);
    }
  
    setCnic(value);
  };

  
  const register = async () => {

    if (loading) return;
  
    setLoading(true);
  
    console.log("========== REGISTER BUTTON CLICKED ==========");

    console.log("========== REGISTER BUTTON CLICKED ==========");

if (
  !fullName ||
  !fatherName ||
  !email ||
  !phone ||
  !dob ||
  !gender ||
  !cnic ||
  !address ||
  !username ||
  !password ||
  !confirmPassword
) {
  setMessage("Please fill all fields.");
  setLoading(false);
  return;
}
  
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setLoading(false);
      return;
    }
  
    try {
  
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName,
          fatherName,
          email,
          phone,
          dob,
          gender,
          cnic,
          address,
          username,
          password
        })
      });
      if (response.ok) {
  
        const data = await response.json();
  
        console.log("Success:", data);
  
        setMessage(data.message);
  
        if (data.message === "Account Created Successfully") {
  
          setTimeout(() => {
            router.push("/");
          }, 1500);
  
        }
  
      } else {
  
        const data = await response.json();
  
        console.log("Error:", data);
  
        setMessage(data.message);
  
      }
  
    } catch (error) {

      console.error("Fetch Error:", error);
  
      setMessage("Unable to connect to the server.");
  
  }
  finally {
  
      setLoading(false);
  
  }
  
  };
  return (
    <main className="min-h-screen bg-black flex items-center justify-center py-10">
      <div className="bg-zinc-900 border border-gray-700 rounded-xl shadow-xl p-8 w-[450px]">
        <div className="text-center mb-6">
          <div className="text-6xl">🎓</div>

          <h1 className="text-3xl font-bold text-white mt-3">
            Create Account
          </h1>

          <p className="text-gray-400">
            Student Information System
          </p>
        </div>

        <h2 className="text-blue-400 font-semibold mb-3">
          Personal Information
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-zinc-800 border border-gray-700 text-white"
        />

        <input
          type="text"
          placeholder="Father Name"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-zinc-800 border border-gray-700 text-white"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-zinc-800 border border-gray-700 text-white"
        />

<input
  type="text"
  placeholder="Phone Number (+92XXXXXXXXXX)"
  value={phone}
  maxLength="13"
  onChange={(e) => setPhone(e.target.value)}
  className="w-full p-3 mb-3 rounded bg-zinc-800 border border-gray-700 text-white"
/>
<input
  type="date"
  value={dob}
  onChange={(e) => setDob(e.target.value)}
  className="w-full p-3 mb-3 rounded bg-zinc-800 border border-gray-700 text-white cursor-pointer"
/>
        

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-zinc-800 border border-gray-700 text-white"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
  type="text"
  placeholder="CNIC (12345-1234567-1)"
  value={cnic}
  maxLength="15"
  onChange={handleCnicChange}
  className="w-full p-3 mb-3 rounded bg-zinc-800 border border-gray-700 text-white"

  
/>



        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-3 mb-5 rounded bg-zinc-800 border border-gray-700 text-white"
        />

        <h2 className="text-blue-400 font-semibold mb-3">
          Account Information
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-zinc-800 border border-gray-700 text-white"
        />

<input
  type={showPassword ? "text" : "password"}
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full p-3 mb-3 rounded bg-zinc-800 border border-gray-700 text-white"
/>

<input
  type={showPassword ? "text" : "password"}
  placeholder="Confirm Password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  className="w-full p-3 mb-3 rounded bg-zinc-800 border border-gray-700 text-white"
/>

<label className="text-gray-300 flex items-center mb-5">
  <input
    type="checkbox"
    className="mr-2"
    onChange={() => setShowPassword(!showPassword)}
  />
  Show Password
</label>

<button
  type="button"
  disabled={loading}
  onClick={register}
  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white font-semibold p-3 rounded"
>
{loading ? (
  <span className="flex items-center justify-center gap-2">
    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
    Creating Account...
  </span>
) : (
  "Create Account"
)}
</button>

<p className="text-center text-green-400 mt-4">
  {message}
</p>

</div>
</main>
);
}