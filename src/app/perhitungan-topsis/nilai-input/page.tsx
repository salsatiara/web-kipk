"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsPlusLg, BsPlusSlashMinus } from "react-icons/bs";

type Data = {
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
  }[];
};

export default function Page() {
  const [data, setData] = useState<Data>();

  async function fetchData() {
    const response = await axios.get<Data>("/api/alternatif");
    setData(response.data);
  }

  useEffect(() => {
    fetchData();
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
            <div className="flex items-center">
              <Link href="/form-mahasiswa?action=tambah">
                <BsPlusLg size={24} color="#000" />
              </Link>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto w-full flex mt-16">
          <table className="border mx-auto">
            <thead className="bg-[#1684A7]">
              <tr>
                <th
                  className="border border-[#A3A3A3] bg-[#FFDF00] px-3 py-2 whitespace-nowrap font-medium text-sm"
                  colSpan={8}
                >
                  Nilai Input Alternatif
                </th>
              </tr>
              <tr>
                <th
                  className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm"
                  rowSpan={2}
                >
                  No.
                </th>
                <th
                  className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm"
                  rowSpan={2}
                >
                  Alternatif
                </th>
                <th
                  className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm"
                  rowSpan={2}
                >
                  Nama
                </th>
                <th
                  className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm"
                  colSpan={5}
                >
                  Kriteria
                </th>
              </tr>
              <tr>
                <th className="border border-[#A3A3A3] px-10 py-2 whitespace-nowrap font-medium text-sm">
                  C1
                </th>
                <th className="border border-[#A3A3A3] px-10 py-2 whitespace-nowrap font-medium text-sm">
                  C2
                </th>
                <th className="border border-[#A3A3A3] px-10 py-2 whitespace-nowrap font-medium text-sm">
                  C3
                </th>
                <th className="border border-[#A3A3A3] px-10 py-2 whitespace-nowrap font-medium text-sm">
                  C4
                </th>
                <th className="border border-[#A3A3A3] px-10 py-2 whitespace-nowrap font-medium text-sm">
                  C5
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((data, index) => (
                <tr key={index}>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    {index + 1}
                  </td>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    A{index + 1}
                  </td>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    {data.nama}
                  </td>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    {data.penghasilan}
                  </td>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    {data.jmlTanggungan}
                  </td>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    {data.nilai}
                  </td>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    {data.rumah}
                  </td>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    {data.listrik}
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
