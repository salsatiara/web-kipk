"use client";

import Navbar from "@/components/Navbar";
import listrikFormatter from "@/libs/listrikFormatter";
import nilaiFormatter from "@/libs/nilaiFormatter";
import penghasilanFormatter from "@/libs/penghasilanFormatter";
import rumahFormatter from "@/libs/rumahFormatter";
import tanggunganFormatter from "@/libs/tanggunganFormatter";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsBook, BsPencilSquare, BsPlusLg, BsTrash3 } from "react-icons/bs";

const option: {
  value: string;
  label: string;
}[] = [
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

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

export default function Form() {
  const [data, setData] = useState<Data>();

  async function fetchData() {
    const response = await axios.get<Data>(
      "http://localhost:3000/api/alternatif"
    );
    setData(response.data);
    console.log(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-white h-screen w-full text-black flex flex-col">
        <div className="flex flex-col">
          <div className="flex justify-between px-4 py-2 bg-[#E6E6E6] rounded">
            <div className="flex items-center">
              <BsBook size={24} color="#000" />
              <p className="ml-2">Data Calon Penerima</p>
            </div>
            <div className="flex items-center">
              <Link href="/form-mahasiswa">
                <BsPlusLg size={24} color="#000" />
              </Link>
            </div>
          </div>
          <div className="mx-8 my-4 flex justify-between">
            <div className="flex text-sm items-center">
              <p>Show</p>
              <select className="border border-black rounded mx-2">
                {option.map((opt) => (
                  <option
                    className="bg-white open:bg-white"
                    key={opt.value}
                    value={opt.value}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              <p>Entries</p>
            </div>
            <div className="flex text-sm">
              <p>Search:</p>
              <input
                type="text"
                placeholder="Search"
                className="border border-black rounded mx-2 w-32 px-1"
              />
            </div>
          </div>
          <div className="overflow-x-auto w-full flex">
            <table className="border mx-auto">
              <thead className="bg-[#1684A7]">
                <tr>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    No.
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    NISN
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Nama Siswa
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Penghasilan Orang Tua
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Jumlah Tanggungan Keluarga
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Nilai Rata-rata Raport
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Kondisi Rumah dan Aset
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Daya Listrik PLN
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                      {index + 1}
                    </td>
                    <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                      {item.nisn}
                    </td>
                    <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                      {item.nama}
                    </td>
                    <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                      {penghasilanFormatter(item.penghasilan)}
                    </td>
                    <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                      {tanggunganFormatter(item.jmlTanggungan)}
                    </td>
                    <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                      {nilaiFormatter(item.nilai)}
                    </td>
                    <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                      {rumahFormatter(item.rumah)}
                    </td>
                    <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                      {listrikFormatter(item.listrik)}
                    </td>
                    <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                      <button className="bg-[#F6EC72] text-black px-2 py-1 rounded">
                        <BsPencilSquare size={14} />
                      </button>
                      <button className="bg-[#EB0707] text-black px-2 py-1 rounded">
                        <BsTrash3 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mx-8 my-4 flex justify-between">
            <div className="flex">
              <p className="text-sm">Showing 1 to 5 of 5 entries</p>
            </div>
            <div className="flex border border-black rounded gap-2 px-2 items-center text-sm">
              <button>Previous</button>
              <p className="bg-[#09A599] px-2 my-1">1</p>
              <button>Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
