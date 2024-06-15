"use client";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter()
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
    if (email === "" || password === "") {
      seterrorGot("fill all the fields");
      return;
    }

    setloading(true);
    seterrorGot(null);
    try {
      const res = await fetch("/api/login", {
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

      console.log(data);

      localStorage.setItem("nextAuthUser", JSON.stringify(data.user))

      toast.success("Login Successfully")
      window.location.reload()
      return router.push("/");
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
        Login Here
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-[80%] md:w-[60%] lg:w-[40%] flex flex-col gap-2 items-start"
      >
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
          {loading ? "Loading..." : "Login"}
        </button>

        {errorGot && (
          <p className="w-full text-sm text-center mx-auto capitalize py-2 px-4 bg-white text-red-500 font-semibold rounded-lg">
            {errorGot}
          </p>
        )}

        <p className="w-full text-sm text-center mx-auto capitalize">
          Not Registered yet, visit{" "}
          <Link href={"/register"} className="underline text-blue-400">
            Register Page
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
