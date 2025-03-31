"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false)

    if (result?.error) {
      toast.error(result.error)
    } else {

      toast.success("Login successfully!")
      router.replace("/");
      router.refresh()
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <label htmlFor="password" className="block mb-1">
          Password
        </label>
        <div className="relative mt-5">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
          <button type="button" className="absolute right-3 top-2 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full disabled:cursor-not-allowed disabled:bg-blue-300 bg-blue-500 text-white py-2 rounded hover:bg-blue-600`}
        >
          {loading ? <Loader className='animate-spin' /> : "Login"}

        </button>
        <p className="text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
