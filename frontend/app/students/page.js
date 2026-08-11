"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Students() {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const deleteStudent = async (username) => {

    const response = await fetch(
      `http://localhost:8080/student/${username}`,
      {
        method: "DELETE"
      }
    );

    if (response.ok) {

      setStudents(
        students.filter(
          (student) => student.username !== username
        )
      );

      alert("Student Deleted Successfully");

    } else {

      alert("Delete Failed");

    }

  };

  useEffect(() => {

    fetch("http://localhost:8080/students")
      .then((res) => res.json())
      .then((data) => {

        console.log(data);

        setStudents(data);

      })
      .catch((error) => {

        console.log(error);

      });

  }, []);

  const filteredStudents = students.filter((student) =>

    student.fullName.toLowerCase().includes(search.toLowerCase()) ||

    student.username.toLowerCase().includes(search.toLowerCase())

  );

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Student Management System", 14, 20);

    doc.setFontSize(12);
    doc.text("Student Report", 14, 30);

    autoTable(doc, {
      startY: 40,
      head: [["#", "Full Name", "Email", "Phone", "Username",]],
      body: filteredStudents.map((student, index) => [
        index + 1,
        student.fullName,
        student.email,
        student.phone,
        student.username
      ])
    });

    doc.save("Student_Report.pdf");

  };

  const exportExcel = () => {

    const worksheet = XLSX.utils.json_to_sheet(
      filteredStudents.map((student, index) => ({
        "#": index + 1,
        "Full Name": student.fullName,
        Email: student.email,
        Phone: student.phone,
        Username: student.username
      }))
    );

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Students"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const file = new Blob(
      [excelBuffer],
      {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
      }
    );

    saveAs(file, "Student_Report.xlsx");

  };

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
        📋 All Students
        </h1>

        <Link href="/admin">

          <button className="bg-gray-700 hover:bg-gray-800 px-5 py-2 rounded">
          ← Back
          </button>

        </Link>

      </div>

      {/* Total Students */}

      <div className="bg-zinc-900 rounded-xl p-5 mb-6 w-72 shadow-lg">

        <h2 className="text-gray-400 text-lg">
        👨‍🎓 Total Students
        </h2>

        <p className="text-4xl font-bold mt-2">
          {students.length}
        </p>

      </div>

      {/* Search + Export Buttons */}

      <div className="flex justify-between items-center mb-6 gap-4">

        <input
          type="text"
          placeholder="🔍 Search by Name or Username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-zinc-800 border border-gray-700 text-white outline-none"
        />

        <button
          onClick={exportPDF}
          className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg font-semibold whitespace-nowrap"
        >
          📄 Export PDF
        </button>

        <button
          onClick={exportExcel}
          className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg font-semibold whitespace-nowrap"
        >
          📊 Export Excel
        </button>

      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-zinc-900 rounded-xl p-8 w-[420px] shadow-2xl">

            <h2 className="text-2xl font-bold text-white mb-4">
              Delete Student
            </h2>

            <p className="text-gray-300 mb-8">
              Are you sure you want to delete this student?
            </p>

            <div className="flex justify-end gap-4">

              <button
                onClick={() => {
                  setShowModal(false);
                  setStudentToDelete(null);
                }}
                className="bg-gray-600 hover:bg-gray-700 px-5 py-2 rounded text-white"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  deleteStudent(studentToDelete);
                  setShowModal(false);
                  setStudentToDelete(null);
                }}
                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded text-white"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-700">

          <thead className="bg-zinc-800">

            <tr>

              <th className="border p-3">#</th>
              <th className="border p-3">Full Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Phone</th>
              <th className="border p-3">Username</th>
              <th className="border p-3">Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredStudents.map((student, index) => (

              <tr
                key={index}
                className="text-center hover:bg-zinc-800"
              >

                <td className="border p-3">
                  {index + 1}
                </td>

                <td className="border p-3">
                  {student.fullName}
                </td>

                <td className="border p-3">
                  {student.email}
                </td>

                <td className="border p-3">
                  {student.phone}
                </td>

                <td className="border p-3">
                  {student.username}
                </td>

                <td className="border p-3">

                  <div className="flex justify-center gap-2">

                    <Link href={`/students/${student.username}`}>

                      <button
                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                      >
                       👁
                      </button>

                    </Link>

                    <Link href={`/students/edit/${student.username}`}>

                      <button className="bg-blue-600 px-3 py-1 rounded">
                      ✏️
                      </button>

                    </Link>

                    <button
                      onClick={() => {
                        setStudentToDelete(student.username);
                        setShowModal(true);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      🗑
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>

  );

}
