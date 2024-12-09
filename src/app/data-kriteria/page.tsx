"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  BsJournalText,
  BsPencilSquare,
  BsPlusLg,
  BsTrash3,
} from "react-icons/bs";

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

export default function DataKriteria() {
  return (
    <>
      <Navbar />
      <div className="bg-white h-screen w-full text-black flex flex-col">
        <div className="flex flex-col">
          <div className="flex justify-between px-4 py-2 bg-[#E6E6E6] rounded">
            <div className="flex items-center">
              <BsJournalText size={24} color="#000" />
              <p className="ml-2">Data Kriteria</p>
            </div>
            <div className="flex items-center">
              <Link href="/form-mahasiswa?action=tambah">
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
                    Kode
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Kriteria
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Rentang Nilai
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Bobot
                  </th>
                  <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                    rowSpan={5}
                  >
                    1
                  </td>
                  <td
                    className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                    rowSpan={5}
                  >
                    C1
                  </td>
                  <td
                    className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                    rowSpan={5}
                  >
                    Penghasilan Orang Tua
                  </td>
                  <td
                    className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                    rowSpan={1}
                  >
                    &le; Rp 1.500.000
                  </td>
                  <td
                    className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                    rowSpan={1}
                  >
                    5
                  </td>
                  <td
                    className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                    rowSpan={5}
                  >
                    <div className="flex items-center">
                      <Link
                        href={"/"}
                        className="bg-[#F6EC72] text-black px-2 py-1 rounded inline-block"
                      >
                        <BsPencilSquare size={14} />
                      </Link>
                      <button className="bg-[#EB0707] text-black px-2 py-1 rounded">
                        <BsTrash3 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                    rowSpan={1}
                  >
                    Rp 1.500.001 - Rp 2.500.000
                  </td>
                  <td
                    className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                    rowSpan={1}
                  >
                    4
                  </td>
                </tr>
                <tr>
                  <td
                    className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                    rowSpan={1}
                  >
                    Rp 2.500.001 - Rp 3.500.000
                  </td>
                  <td
                    className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                    rowSpan={1}
                  >
                    3
                  </td>
                </tr>
                <tr>
                  <td
                    className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                    rowSpan={1}
                  >
                    Rp 3.500.001 - Rp 5.000.000
                  </td>
                  <td
                    className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                    rowSpan={1}
                  >
                    2
                  </td>
                </tr>
                <tr>
                  <td
                    className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                    rowSpan={1}
                  >
                    &ge; Rp 5.000.001
                  </td>
                  <td
                    className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center"
                    rowSpan={1}
                  >
                    1
                  </td>
                </tr>
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
