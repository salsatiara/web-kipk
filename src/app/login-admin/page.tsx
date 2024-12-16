"use client";

import { AuthContext } from "@/services/storage";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";

interface PayloadToken {
  id: string;
  username: string;
  role: string;
  nisn: string;
  iat: number;
  exp: number;
}

export default function Home() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function refreshToken() {
    try {
      const response = await axios.post(
        "/api/auth/token",
        {},
        { withCredentials: true }
      );
      console.log(response.data);

      auth.setToken(response.data.accessToken);
      const decoded =
        (jwt.decode(response.data.accessToken) as PayloadToken) || null;
      if (decoded) {
        auth.setId(decoded.id);
        auth.setUsername(decoded.username);
        auth.setRole(decoded.role);
        auth.setNisn(decoded.nisn);
        auth.setExpire(decoded.exp);
        router.push("/dashboard-admin");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function loginHandler(
    e: FormEvent,
    username: string,
    password: string
  ) {
    try {
      e.preventDefault();
      await axios.post(
        "/api/auth/login",
        { username: username, password: password, role: "admin" },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      router.push("/dashboard-admin");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    refreshToken();
  }, []);
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
            Silahkan log in untuk mengakses sistem.
          </p>
          <form className="mt-6 flex flex-col">
            <input
              className="bg-[#E6E6E6] w-full rounded px-3 py-2 text-xs"
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="bg-[#E6E6E6] w-full rounded px-3 py-2 text-xs mt-8"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-[#09A599] text-xs text-right mt-2">
              Lupa password?
            </p>
            <button
              onClick={(e) => {
                loginHandler(e, username, password);
              }}
              className="bg-[#09A599] w-full rounded text-white text-xs py-2 mt-4"
            >
              Log in
            </button>
            <Link
              href="/login-student"
              className="text-[#09A599] text-xs text-center mt-4 mx-auto"
            >
              Switch to Student Login
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
