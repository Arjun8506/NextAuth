"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const VerifyEmailPage = () => {
  const router = useRouter();
  const [formData, setformData] = useState({
    otp: "",
  });
  const [loading, setloading] = useState(false);
  const [errorGot, seterrorGot] = useState(null);

  const handleOnChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.otp.length > 6) {
      seterrorGot("Enter Crrect OTP");
      return;
    }

    setloading(true);
    seterrorGot(null);
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        seterrorGot(data.message);
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      return router.push("/login");
    } catch (error) {
      toast.error(error.message);
      seterrorGot(error.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-900 text-white flex items-center justify-center flex-col gap-8">
      <h1 className="text-2xl font-extrabold uppercase tracking-wide underline">
        enter otp Here
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-[80%] md:w-[60%] lg:w-[40%] flex flex-col gap-2 items-start"
      >
        <input
          type="number"
          name="otp"
          id="otp"
          className=" py-1 px-2 rounded-lg text-black w-full"
          placeholder="OTP"
          value={formData.otp}
          onChange={handleOnChange}
        />
        <button
          className=" py-1 px-2 rounded-lg bg-blue-700 w-full my-4 hover:bg-blue-600 font-semibold uppercase disabled:opacity-30"
          disabled={loading}
        >
          {loading ? "Loading..." : "submit otp"}
        </button>

        {errorGot && (
          <p className="w-full text-sm text-center mx-auto capitalize py-2 px-4 bg-white text-red-500 font-semibold rounded-lg">
            {errorGot}
          </p>
        )}
      </form>
    </div>
  );
};

export default VerifyEmailPage;
