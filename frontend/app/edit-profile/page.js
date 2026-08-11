"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfile() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [cnic, setCnic] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {

    const user = sessionStorage.getItem("username");

if (!user) {
  router.push("/");
  return;
}

setUsername(user);

fetch("http://localhost:8080/student", {
  method: "GET",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
})
    .then((res) => {
    
      if (res.status === 401 || res.status === 403) {
    
        localStorage.removeItem("username");
    
        sessionStorage.setItem(
          "sessionExpired",
          "Your session has expired due to inactivity. Please sign in again to continue."
        );
    
        router.push("/");
    
        return null;
    
      }
    
      if (!res.ok) {
        throw new Error("Server Error");
      }
    
      return res.json();
    
    })
    .then((data) => {
    
      if (!data) return;
    
      setFullName(data.fullName || "");
      setFatherName(data.fatherName || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setDob(data.dob || "");
      setGender(data.gender || "");
      setCnic(data.cnic || "");
      setAddress(data.address || "");
    
    })
    .catch(() => {
    
      setMessage("Server Error");
    
    });

  }, []);

  const updateProfile = async () => {

    try {
      const response = await fetch("http://localhost:8080/student/update", {

        method: "PUT",
      
        credentials: "include",
      
        headers: {
          "Content-Type": "application/json",
        },
      
        body: JSON.stringify({
          username,
          fullName,
          fatherName,
          email,
          phone,
          dob,
          gender,
          cnic,
          address
        })
      
      });
       

      if (response.status === 401 || response.status === 403) {

        sessionStorage.removeItem("username");
sessionStorage.removeItem("role");
      
      
        sessionStorage.setItem(
          "sessionExpired",
          "Your session has expired due to inactivity. Please sign in again to continue."
        );
      
        router.push("/");
      
        return;
      
      }

      const data = await response.text();

      setMessage(data);

    } catch {

      setMessage("Server Error");

    }

  };

  return (

    <main className="min-h-screen bg-black flex items-center justify-center py-10">

      <div className="bg-zinc-900 p-8 rounded-xl w-[500px]">

        <h1 className="text-3xl text-white font-bold text-center mb-6">
          Edit Profile
        </h1>

        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="w-full p-3 mb-3 rounded bg-zinc-800 text-white"
        />

        <input
          type="text"
          value={fatherName}
          onChange={(e) => setFatherName(e.target.value)}
          placeholder="Father Name"
          className="w-full p-3 mb-3 rounded bg-zinc-800 text-white"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-3 rounded bg-zinc-800 text-white"
        />

        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          className="w-full p-3 mb-3 rounded bg-zinc-800 text-white"
        />

        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-zinc-800 text-white"
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-zinc-800 text-white"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          type="text"
          value={cnic}
          onChange={(e) => setCnic(e.target.value)}
          placeholder="CNIC"
          className="w-full p-3 mb-3 rounded bg-zinc-800 text-white"
        />

        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white"
        />

        <button
          onClick={updateProfile}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
        >
          Update Profile
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="w-full mt-3 bg-gray-700 hover:bg-gray-800 text-white p-3 rounded"
        >
          Back
        </button>

        <p className="text-green-400 text-center mt-4">
          {message}
        </p>

      </div>

    </main>

  );

}