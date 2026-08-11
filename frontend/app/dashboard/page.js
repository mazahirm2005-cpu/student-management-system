"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {

  const [student, setStudent] = useState(null);

 


  useEffect(() => {

    const username = sessionStorage.getItem("username");


    if (!username) {

      toast.error("Your session has expired. Please login again.");
    
      setTimeout(() => {
        window.location.replace("/");
      }, 1000);
    
      return;
    
    }

    fetch("http://localhost:8080/student", {
      method: "GET",
      credentials: "include",
      headers: {
          "Content-Type": "application/json"
      }
  })


    .then((res) => {


      console.log("Response Status:", res.status);


      if (res.status === 401 || res.status === 403) {

        localStorage.removeItem("username");
    
        sessionStorage.setItem(
          "sessionExpired",
          "Your session has expired. Please login again."
        );
    
        window.location.replace("/");
    
        return null;
    }



      if (!res.ok) {

        throw new Error("Server Error");

      }



      return res.json();


    })


    .then((data) => {


      if (data) {

        setStudent(data);

      }


    })


    .catch((error) => {

      console.log(error);

    });



  }, []);



  if (!student) {


    return (

      <main className="min-h-screen bg-black flex items-center justify-center text-white">

        Loading...

      </main>

    );


  }



  return (


    <main className="min-h-screen bg-black text-white flex items-center justify-center">


      <div className="bg-zinc-900 p-10 rounded-xl w-[700px]">


        <div className="flex justify-between items-center mb-6">


          <h1 className="text-3xl font-bold">

            🎓 Student Dashboard

          </h1>


        </div>



        <h2 className="text-xl text-center mb-6">

          Welcome, {student.fullName}

        </h2>



        <div className="space-y-2">


          <p><b>Full Name:</b> {student.fullName}</p>

          <p><b>Father Name:</b> {student.fatherName}</p>

          <p><b>Email:</b> {student.email}</p>

          <p><b>Phone:</b> {student.phone}</p>

          <p><b>Date of Birth:</b> {student.dob}</p>

          <p><b>Gender:</b> {student.gender}</p>

          <p><b>CNIC:</b> {student.cnic || "Not Provided"}</p>

          <p><b>Address:</b> {student.address}</p>

          <p><b>Username:</b> {student.username}</p>


        </div>




        <div className="grid grid-cols-3 gap-3 mt-8">



          <Link href="/edit-profile">

            <button className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded">

              Edit Profile

            </button>

          </Link>




          <Link href="/change-password">

            <button className="w-full bg-yellow-600 hover:bg-yellow-700 p-3 rounded">

              Change Password

            </button>

          </Link>




          <button
  onClick={async () => {

    try {

      await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",
      });

    } catch (error) {

      console.log(error);

    }

    sessionStorage.removeItem("username");
sessionStorage.removeItem("role");

    sessionStorage.setItem(
      "logoutMessage",
      "Logged out successfully."
    );
    
    window.location.replace("/");
  }}
  className="w-full bg-red-600 hover:bg-red-700 p-3 rounded"
>
  Logout
</button>



        </div>



      </div>


    </main>


  );


}