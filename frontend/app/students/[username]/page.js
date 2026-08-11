"use client";

import { use, useEffect, useState } from "react";

export default function StudentProfile({ params }) {

  const { username } = use(params);

  const [student, setStudent] = useState(null);

  useEffect(() => {

    const loadStudent = async () => {

      try {

        const response = await fetch(
          `http://localhost:8080/student/${username}`
        );

        if (!response.ok) {
          console.log("Student not found");
          return;
        }

        const data = await response.json();

        setStudent(data);

      } catch (error) {

        console.log(error);

      }

    };

    loadStudent();

  }, [username]);

  if (!student) {

    return (

      <main className="min-h-screen bg-black flex items-center justify-center text-white">

        <h1 className="text-3xl font-bold">
          Loading...
        </h1>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-3xl mx-auto bg-zinc-900 rounded-xl p-8 shadow-xl">

        <h1 className="text-4xl font-bold mb-8">
          👤 Student Details
        </h1>

        <div className="space-y-4">

          <p><strong>Full Name:</strong> {student.fullName}</p>

          <p><strong>Father Name:</strong> {student.fatherName}</p>

          <p><strong>Email:</strong> {student.email}</p>

          <p><strong>Phone:</strong> {student.phone}</p>

          <p><strong>Date of Birth:</strong> {student.dob}</p>

          <p><strong>Gender:</strong> {student.gender}</p>

          <p><strong>CNIC:</strong> {student.cnic}</p>

          <p><strong>Address:</strong> {student.address}</p>

          <p><strong>Username:</strong> {student.username}</p>

        </div>

      </div>

    </main>

  );

}