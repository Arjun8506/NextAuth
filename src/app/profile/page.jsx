"use client";

import { useAuthContext } from "@/context/authUserContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [errorGot, seterrorGot] = useState(null);

  const logOut = async () => {
    const confirmation = window.confirm("Are you sure to Logout?");
    if (confirmation) {
      setloading(true);
      seterrorGot(null);
      try {
        const res = await fetch("/api/logout", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.success === false) {
          seterrorGot(data.message);
          toast.error(data.message);
          return;
        }

        localStorage.removeItem("nextAuthUser");

        toast.success(data.message);
        window.location.reload();
        return router.push("/");
      } catch (error) {
        toast.error(error.message);
        seterrorGot(error.message);
      } finally {
        setloading(false);
      }
    } else {
      toast.success("You Canceled");
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white flex items-center justify-center flex-col gap-8">
      <h1 className="text-2xl font-extrabold uppercase tracking-wide underline">
        Profile Page
      </h1>
      <div className="flex items-center justify-center flex-col gap-4">
        <h1 className="text-xl font-semibold capitalize tracking-wide underline">
          user details
        </h1>
        <ol className="text-lg flex items-center justify-center flex-col gap-1">
          <li>ID: {user?._id}</li>
          <li>USERNAME: {user?.username}</li>
          <li>EMAIL: {user?.email}</li>
        </ol>

        <button
          className="py-1 px-2 rounded-lg bg-blue-700 w-full my-4 hover:bg-blue-600 font-semibold uppercase disabled:opacity-30"
          onClick={logOut}
        >
          {loading ? "Loading..." : "LogOut"}
        </button>
        {errorGot && (
          <p className="w-full text-sm text-center mx-auto capitalize py-2 px-4 bg-white text-red-500 font-semibold rounded-lg">
            {errorGot}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
