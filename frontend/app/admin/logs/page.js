"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ActivityLogs() {

  const [logs, setLogs] = useState([]);
  const router = useRouter();

  useEffect(() => {

    const role = sessionStorage.getItem("role");

    if (!role) {
      router.push("/");
      return;
    }

    if (role !== "ADMIN") {
      alert("Access Denied");
      router.push("/");
      return;
    }

    fetch("http://localhost:8080/admin/logs", {
      credentials: "include",
    })
      .then((res) => {

        if (res.status === 403) {
          alert("Access Denied");
          router.push("/");
          return;
        }

        return res.json();
      })
      .then((data) => {

        if (data) {
          setLogs(data);
        }

      });

  }, []);

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        📜 Activity Logs
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-700">

          <thead className="bg-zinc-800">

            <tr>

              <th className="p-4 border">Username</th>

              <th className="p-4 border">Role</th>

              <th className="p-4 border">Action</th>

              <th className="p-4 border">Description</th>

              <th className="p-4 border">Time</th>

            </tr>

          </thead>

          <tbody>

            {logs.map((log) => (

              <tr
                key={log.id}
                className="text-center hover:bg-zinc-900"
              >

                <td className="p-3 border">
                  {log.username}
                </td>

                <td className="p-3 border">
                  {log.role}
                </td>

                <td className="p-3 border">

                  <span
                    className={
                      log.action === "LOGIN"
                        ? "text-green-400 font-bold"
                        : "text-red-400 font-bold"
                    }
                  >
                    {log.action}
                  </span>

                </td>

                <td className="p-3 border">
                  {log.description}
                </td>

                <td className="p-3 border">
                  {new Date(log.activityTime).toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>

  );

}