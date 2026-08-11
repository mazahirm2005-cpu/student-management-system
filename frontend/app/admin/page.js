"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

export default function Admin() {

  const [stats, setStats] = useState(null);
  const router = useRouter();

  const logout = async () => {

    console.log("Logout Clicked");
  
    try {
  
      const response = await fetch("http://localhost:8080/logout", {
        method: "POST",
        credentials: "include",
      });
  
      console.log("Logout Status:", response.status);
  
    } catch (error) {
  
      console.log(error);
  
    }
  
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
  
    sessionStorage.setItem(
      "logoutMessage",
      "Logged out successfully"
    );
  
    document.cookie = "role=; path=/; max-age=0";
  
    window.location.href = "/";
  
  };

  useEffect(() => {

    let ignore = false;   // guard flag

    const role = sessionStorage.getItem("role");

    if (!role) {
        router.push("/");
        return;
    }

    if (role !== "ADMIN") {
        alert("Access Denied");
        router.push("/login");
        return;
    }

    const loadAdminData = async () => {

        try {

            const statsResponse = await fetch(
                "http://localhost:8080/admin/stats",
                { credentials: "include" }
            );

            if (ignore) return;   // ⚠️ agar dobara mount ho chuka, purana result ignore karo

            if (statsResponse.status === 403) {
                alert("You don't have admin access");
                router.push("/");
                return;
            }

            if (!statsResponse.ok) return;

            const statsData = await statsResponse.json();
            setStats(statsData);

            // ... logs fetch bhi same pattern se

        } catch (error) {
            console.error("Admin Data Error:", error);
        }

    };

    loadAdminData();

    return () => {
        ignore = true;   // cleanup: pehla effect run cancel/ignore ho jayega
    };

}, [router]);

  if (!stats) {

    

    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </main>
    );



  }

  
  const pieData = [
    {
      name: "Male",
      value: stats.maleStudents,
    },
    {
      name: "Female",
      value: stats.femaleStudents,
    },
  ];
  
  const barData = [
    {
      category: "Male",
      Students: stats.maleStudents,
    },
    {
      category: "Female",
      Students: stats.femaleStudents,
    },
  ];
  
  const COLORS = ["#2563eb", "#ec4899"];
  
  return (

    <main className="min-h-screen bg-black p-10 text-white">

<div className="flex justify-between items-center mb-10">


<h1 className="text-5xl font-bold">
  🎓 Admin Dashboard
</h1>


<button
  type="button"
  onClick={logout}
  className="
    bg-red-600
    hover:bg-red-700
    px-6
    py-3
    rounded-xl
    font-semibold
    shadow-lg
    transition
  "
>
  🚪 Logout
</button>


</div>

      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-blue-600 rounded-xl p-6 text-center shadow-lg">
          <h2 className="text-lg">👨‍🎓 Students</h2>
          <p className="text-5xl font-bold mt-3">
            {stats.totalStudents}
          </p>
        </div>

        <div className="bg-cyan-600 rounded-xl p-6 text-center shadow-lg">
          <h2 className="text-lg">👨 Male</h2>
          <p className="text-5xl font-bold mt-3">
            {stats.maleStudents}
          </p>
        </div>

        <div className="bg-pink-600 rounded-xl p-6 text-center shadow-lg">
          <h2 className="text-lg">👩 Female</h2>
          <p className="text-5xl font-bold mt-3">
            {stats.femaleStudents}
          </p>
        </div>

        <div className="bg-emerald-600 rounded-xl p-6 text-center shadow-lg">
          <h2 className="text-lg">👨‍💼 Admins</h2>
          <p className="text-5xl font-bold mt-3">
            {stats.totalAdmins}
          </p>
        </div>

      </div>

      <div className="flex flex-col items-center gap-5 mt-8">

  <Link href="/students">
    <button className="w-100 bg-blue-600 hover:bg-blue-700 py-4 rounded-xl text-xl font-bold transition">
      📋 View Students
    </button>
  </Link>

  <Link href="/students/add">
    <button className="w-100 bg-emerald-600 hover:bg-emerald-700 py-4 rounded-xl text-xl font-bold transition">
      ➕ Add Student
    </button>
  </Link>

  <Link href="/admin/add-admin">
    <button className="w-100 bg-violet-600 hover:bg-violet-700 py-4 rounded-xl text-xl font-bold transition">
      👨‍💼 Add Admin
    </button>
  </Link>

  <Link href="/admin/logs">
  <button className="w-100 bg-orange-600 hover:bg-orange-700 py-4 rounded-xl text-xl font-bold transition">
    📜 Activity Logs
  </button>
</Link>

</div>

{/* Charts */}

<div className="grid grid-cols-2 gap-8 mt-10">

  <div className="bg-zinc-900 rounded-xl p-6">

    <h2 className="text-2xl font-bold mb-6">
      🥧 Gender Distribution
    </h2>

    <ResponsiveContainer width="100%" height={300}>
      <PieChart>

        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {pieData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
            />
          ))}
        </Pie>

        <Tooltip />

      </PieChart>
    </ResponsiveContainer>

  </div>

  <div className="bg-zinc-900 rounded-xl p-6">

    <h2 className="text-2xl font-bold mb-6">
      📊 Student Comparison
    </h2>

    <ResponsiveContainer width="100%" height={300}>

      <BarChart data={barData}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="category" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Bar
          dataKey="Students"
          fill="#2563eb"
        />

      </BarChart>

    </ResponsiveContainer>

  </div>

</div>

</main>

);
}