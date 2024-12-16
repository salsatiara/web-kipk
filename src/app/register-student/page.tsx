"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [nisn, setNisn] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function register(
    e: FormEvent,
    username: string,
    nisn: string,
    password: string,
    confirmPassword: string
  ) {
    try {
      e.preventDefault();
      await axios.post(
        "/api/auth/register",
        {
          username: username,
          nisn: nisn,
          password: password,
          confirmPassword: confirmPassword,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      router.push("/login-student");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex w-full bg-gray-100 text-black justify-center">
        <div className="flex flex-col lg:w-1/4 w-full bg-white my-20 mx-4 py-14 px-8 rounded drop-shadow">
          <Image
            src="/image.jpeg"
            width={100}
            height={100}
            alt="Logo UNJ"
            className="mx-auto"
          />
          <p className="text-xl font-black mt-4 mb-6 text-[#1684A7] text-center">
            KIP-KULIAH
          </p>
          <p className="text-sm font-semibold">Selamat datang!</p>
          <p className="text-xs mt-2">
            Silahkan registrasi untuk log in ke website kami.
          </p>
          <form className="mt-6 flex flex-col">
            <input
              className="bg-[#E6E6E6] w-full rounded px-3 py-2 text-xs"
              type="text"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="bg-[#E6E6E6] w-full rounded px-3 py-2 text-xs mt-4"
              type="text"
              required
              placeholder="NISN"
              value={nisn}
              onChange={(e) => setNisn(e.target.value.replace(/[^0-9]/g, ""))}
            />
            <input
              className="bg-[#E6E6E6] w-full rounded px-3 py-2 text-xs mt-4"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="bg-[#E6E6E6] w-full rounded px-3 py-2 text-xs mt-4"
              type="password"
              required
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p className="text-[#09A599] text-xs text-right mt-2">
              Lupa password?
            </p>
            <button
              className="bg-[#09A599] w-full rounded text-white text-xs py-2 mt-4"
              onClick={(e) => {
                register(e, username, nisn, password, confirmPassword);
              }}
            >
              Register
            </button>
            <Link
              href="/login-admin"
              className="text-[#09A599] text-xs text-center mt-4 mx-auto"
            >
              Switch to Admin Login
            </Link>
            <Link
              href="/login-student"
              className="text-[#09A599] text-xs text-center mt-4 mx-auto"
            >
              Already Have an Account?
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
