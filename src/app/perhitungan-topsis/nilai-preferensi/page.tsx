"use client";

import Navbar from "@/components/Navbar";
import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { BsPlusSlashMinus } from "react-icons/bs";
import jwt from "jsonwebtoken";
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

type AlternatifType = {
  status: string;
  message: string;
  data: {
    id: number;
    nisn: string;
    nama: string;
    penghasilan: number;
    jmlTanggungan: number;
    nilai: number;
    rumah: number;
    listrik: number;
    jarakPositif: number;
    jarakNegatif: number;
    preferensi: number;
  }[];
};

export default function Page() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const [alternatif, setAlternatif] = useState<AlternatifType>();

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
        if (decoded.role !== "admin") {
          router.push("/dashboard-mahasiswa");
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        router.push("/login-admin");
      }
    }
  }

  async function fetchAlternatif() {
    const response = await axios.get<AlternatifType>("/api/alternatif");
    setAlternatif(response.data);
  }

  useEffect(() => {
    refreshToken();
    fetchAlternatif();
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
        <div className="overflow-x-auto w-full flex flex-col mt-16 px-16">
          <table className="border w-full">
            <thead className="bg-[#1684A7]">
              <tr>
                <th
                  className="border border-[#A3A3A3] bg-[#FFDF00] px-3 py-2 whitespace-nowrap font-medium text-sm"
                  colSpan={4}
                >
                  Nilai Preferensi
                </th>
              </tr>
              <tr>
                <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                  No.
                </th>
                <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                  Nama
                </th>
                <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                  Alternatif
                </th>
                <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                  Hasil Perhitungan
                </th>
              </tr>
            </thead>
            <tbody>
              {alternatif?.data.map((item, index) => (
                <tr key={index}>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    {index + 1}
                  </td>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    {item.nama}
                  </td>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    A{index + 1}
                  </td>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    {item.preferensi.toFixed(5) || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
