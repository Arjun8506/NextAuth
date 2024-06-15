"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setloading] = useState(false);
  const [errorGot, seterrorGot] = useState(null);
  const [isPasswoedVisible, setisPasswoedVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setisPasswoedVisible(!isPasswoedVisible);
  };

  const handleOnChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || email === "" || password === "") {
      seterrorGot("fill all the fields");
      return;
    }

    setloading(true);
    seterrorGot(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        seterrorGot(data.message);
        toast.error(data.message)
        return;
      }

      toast.success(data.message, {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      })
      return router.push("/verifyEmail");
    } catch (error) {
        toast.error(error.message)
      seterrorGot(error.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white flex items-center justify-center flex-col gap-8">
      <h1 className="text-2xl font-extrabold uppercase tracking-wide underline">
        Register Here
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-[80%] md:w-[60%] lg:w-[40%] flex flex-col gap-2 items-start"
      >
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          className=" py-1 px-2 rounded-lg text-black w-full"
          placeholder="username"
          value={formData.username}
          onChange={handleOnChange}
        />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          className=" py-1 px-2 rounded-lg text-black w-full"
          placeholder="email"
          value={formData.email}
          onChange={handleOnChange}
        />
        <div className="relative w-full">
          <label htmlFor="password">Password: </label>
          <input
            type={isPasswoedVisible ? "text" : "password"}
            name="password"
            id="password"
            className=" py-1 px-2 rounded-lg text-black w-full relative"
            placeholder="password"
            value={formData.password}
            onChange={handleOnChange}
          />
          <button
            type="button"
            className="absolute right-1 top-[50%] text-black"
            onClick={togglePasswordVisibility}
          >
            {isPasswoedVisible ? "❌" : "✔"}
          </button>
        </div>
        <button
          className=" py-1 px-2 rounded-lg bg-blue-700 w-full my-4 hover:bg-blue-600 font-semibold uppercase disabled:opacity-30"
          disabled={loading}
        >
          {loading ? "Loading..." : "Register"}
        </button>

        {errorGot && (
          <p className="w-full text-sm text-center mx-auto capitalize py-2 px-4 bg-white text-red-500 font-semibold rounded-lg">
            {errorGot}
          </p>
        )}

        <p className="w-full text-sm text-center mx-auto capitalize">
          already been Registered,
          <br /> visit{" "}
          <Link href={"/login"} className="underline text-blue-400">
            Login Page
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
