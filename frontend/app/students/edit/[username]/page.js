"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditStudent({ params }) {

  const { username } = use(params);

  const router = useRouter();

  const [student, setStudent] = useState({

    fullName: "",
    fatherName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    cnic: "",
    address: "",
    username: ""

  });


  useEffect(() => {

    fetch(`http://localhost:8080/student/${username}`)

      .then((res) => res.json())

      .then((data) => {

        setStudent(data);

      })

      .catch((error) => {

        console.log(error);

      });


  }, [username]);



  const updateStudent = async () => {


    const response = await fetch(
      "http://localhost:8080/student/update",
      {

        method: "PUT",

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify(student)

      });


    if(response.ok){

      alert("Student Updated Successfully");

      router.push("/students");

    }


  };



  return (

    <main className="min-h-screen bg-black text-white p-10">


      <div className="max-w-xl mx-auto bg-zinc-900 p-8 rounded-xl">


        <h1 className="text-3xl font-bold mb-6">
          ✏ Edit Student
        </h1>



        <input
          className="w-full p-3 mb-3 bg-zinc-800 rounded"
          placeholder="Full Name"
          value={student.fullName}
          onChange={(e)=>setStudent({
            ...student,
            fullName:e.target.value
          })}
        />


        <input
          className="w-full p-3 mb-3 bg-zinc-800 rounded"
          placeholder="Father Name"
          value={student.fatherName}
          onChange={(e)=>setStudent({
            ...student,
            fatherName:e.target.value
          })}
        />


        <input
          className="w-full p-3 mb-3 bg-zinc-800 rounded"
          placeholder="Email"
          value={student.email}
          onChange={(e)=>setStudent({
            ...student,
            email:e.target.value
          })}
        />



        <input
          className="w-full p-3 mb-3 bg-zinc-800 rounded"
          placeholder="Phone"
          value={student.phone}
          onChange={(e)=>setStudent({
            ...student,
            phone:e.target.value
          })}
        />



        <input
          className="w-full p-3 mb-3 bg-zinc-800 rounded"
          placeholder="Address"
          value={student.address}
          onChange={(e)=>setStudent({
            ...student,
            address:e.target.value
          })}
        />



        <button

          onClick={updateStudent}

          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold"

        >

          Update Student

        </button>



      </div>


    </main>

  );

}