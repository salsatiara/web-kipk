"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { BsChevronRight, BsPlusSlashMinus } from "react-icons/bs";
import jwt from "jsonwebtoken";
import { useContext, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { AuthContext } from "@/services/storage";
import { useRouter } from "next/navigation";

interface PayloadToken {
  id: string;
  username: string;
  role: string;
  nisn: string;
  iat: number;
  exp: number;
}

export default function Page() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  async function refreshToken() {
    try {
      const response = await axios.post(
        "/api/auth/token",
        {},
        { withCredentials: true }
      );
      auth.setToken(response.data.accessToken);
      const decoded =
        (jwt.decode(response.data.accessToken) as PayloadToken) || null;
      if (decoded) {
        auth.setId(decoded.id);
        auth.setUsername(decoded.username);
        auth.setRole(decoded.role);
        auth.setNisn(decoded.nisn);
        auth.setExpire(decoded.exp);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        router.push("/login-admin");
      }
    }
  }

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-white h-screen text-black flex flex-col items-center">
        <div className="flex flex-col w-full">
          <div className="flex justify-between px-4 py-2 bg-[#E6E6E6] rounded">
            <div className="flex items-center">
              <BsPlusSlashMinus
                className="border-[1.7px] rounded border-black p-1 stroke-[1px]"
                size={24}
                color="#000"
              />
              <p className="ml-2">Perhitungan</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 flex flex-col mt-16 gap-8">
          <Link
            href="/perhitungan-topsis/nilai-input"
            className="flex w-full items-center justify-between px-3 py-3 bg-[#FFDF00] rounded"
          >
            <p>Nilai Input</p>
            <BsChevronRight />
          </Link>
          <Link
            href="/perhitungan-topsis/nilai-matriks-ternormalisasi"
            className="flex w-full items-center justify-between px-3 py-3 bg-[#FFDF00] rounded"
          >
            <p>Nilai Matriks Ternormalisasi</p>
            <BsChevronRight />
          </Link>
          <Link
            href="/perhitungan-topsis/nilai-bobot-ternormalisasi"
            className="flex w-full items-center justify-between px-3 py-3 bg-[#FFDF00] rounded"
          >
            <p>Nilai Bobot Ternormalisasi</p>
            <BsChevronRight />
          </Link>
          <Link
            href="/perhitungan-topsis/jarak-solusi-ideal"
            className="flex w-full items-center justify-between px-3 py-3 bg-[#FFDF00] rounded"
          >
            <p>Jarak Solusi Ideal +-</p>
            <BsChevronRight />
          </Link>
          <Link
            href="/perhitungan-topsis/nilai-preferensi"
            className="flex w-full items-center justify-between px-3 py-3 bg-[#FFDF00] rounded"
          >
            <p>Nilai Preferensi</p>
            <BsChevronRight />
          </Link>
          <Link
            href="/perhitungan-topsis/ranking"
            className="flex w-full items-center justify-between px-3 py-3 bg-[#FFDF00] rounded"
          >
            <p>Ranking</p>
            <BsChevronRight />
          </Link>
        </div>
      </div>
    </>
  );
}
