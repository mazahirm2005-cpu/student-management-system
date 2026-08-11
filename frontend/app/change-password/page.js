"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePassword() {

  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [strength, setStrength] = useState("");

  const changePassword = async () => {

    if (newPassword !== confirmPassword) {
      setMessage("New Passwords do not match");
      return;
    }

    const username = sessionStorage.getItem("username");
    console.log("Username from localStorage:", username);

    if (!username) {

      sessionStorage.setItem(
        "sessionExpired",
        "Your session has expired due to inactivity. Please sign in again to continue."
      );

      router.push("/");
      return;
    }

    try {

      console.log("Sending password change request for:", username);



      const response = await fetch(
        "http://localhost:8080/change-password",
        {

          method: "PUT",

          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            username,
            oldPassword,
            newPassword,
            confirmPassword,

          }),

        }
      );

      console.log("Change password status:", response.status);

      if (response.status === 401 || response.status === 403) {

        localStorage.removeItem("username");

        sessionStorage.setItem(
          "sessionExpired",
          "Your session has expired due to inactivity. Please sign in again to continue."
        );

        router.push("/");
        return;

      }

      const data = await response.text();

      setMessage(data);

      if (data === "Password changed successfully.") {

        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);

      }

    } catch (error) {

      console.log(error);
      setMessage("Cannot connect to Spring Boot Server");

    }

  };

  const checkPasswordStrength = (password) => {

    if (password.length === 0) {

      setStrength("");

    } else if (password.length < 8) {

      setStrength("Weak");

    } else {

      let score = 0;

      if (/[A-Z]/.test(password)) score++;
      if (/[a-z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[@$!%*?&]/.test(password)) score++;

      if (score <= 2) {

        setStrength("Weak");

      } else if (score === 3) {

        setStrength("Medium");

      } else {

        setStrength("Strong");

      }

    }

  };

  return (

    <main className="min-h-screen bg-black flex items-center justify-center">

      <div className="bg-zinc-900 p-8 rounded-xl w-[450px]">

        <h1 className="text-3xl text-white text-center font-bold mb-6">
          Change Password
        </h1>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Current Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-zinc-800 text-white"
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            checkPasswordStrength(e.target.value);
          }}
          className="w-full p-3 rounded bg-zinc-800 text-white"
        />

        <p
          className={`mb-3 font-semibold ${
            strength === "Weak"
              ? "text-red-500"
              : strength === "Medium"
              ? "text-yellow-400"
              : strength === "Strong"
              ? "text-green-500"
              : "text-gray-400"
          }`}
        >
          {strength && `Password Strength: ${strength}`}
        </p>

        <p className="text-xs text-gray-400 mb-3">
          Password should contain at least 8 characters, one uppercase letter,
          one lowercase letter, one number, and one special character.
        </p>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-zinc-800 text-white"
        />

        <label className="text-white flex items-center mb-4">

          <input
            type="checkbox"
            className="mr-2"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />

          Show Password

        </label>

        <button
          onClick={changePassword}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded text-white"
        >
          Update Password
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="w-full mt-3 bg-gray-700 hover:bg-gray-800 p-3 rounded text-white"
        >
          Back
        </button>

        <p className="text-center text-green-400 mt-4">
          {message}
        </p>

      </div>

    </main>

  );

}