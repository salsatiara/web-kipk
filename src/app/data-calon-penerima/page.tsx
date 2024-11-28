"use client";

import { Fade as Hamburger } from "hamburger-react";
import { useState } from "react";
import {
  BsBook,
  BsBoxArrowRight,
  BsJournalText,
  BsPencil,
  BsPencilSquare,
  BsPersonCircle,
  BsPlusLg,
  BsPlusSlashMinus,
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

export default function Form() {
  const [isOpen, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  }>(option[0]);
  return (
    <>
      <div className="flex top-0 left-0 z-40 sticky bg-[#1684A7]">
        <Hamburger toggled={isOpen} toggle={setOpen} size={18} color="#000" />
        <div className="flex w-full justify-between items-center ml-4 mr-6 text-sm font-semibold">
          <p className="text-black">KIP-Kuliah</p>
          <BsPersonCircle size={24} color="#000" />
        </div>
      </div>
      <div
        className={`flex flex-col w-1/3 min-w-[1/3] max-w-56 top-12 left-0 fixed z-30 bg-[#CFE4EB] text-black duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-60"
        }`}
      >
        <div className="px-6 py-4 text-sm flex items-center border-b border-[#A3A3A3]">
          <BsBook size={24} color="#000" />
          <p className="ml-2">Data Calon Penerima</p>
        </div>
        <div className="px-6 py-4 text-sm flex items-center border-b border-[#A3A3A3]">
          <BsJournalText size={24} color="#000" />
          <p className="ml-2">Data Kriteria</p>
        </div>
        <div className="px-6 py-4 text-sm flex items-center border-b border-[#A3A3A3]">
          <BsPlusSlashMinus
            className="border-[1.7px] rounded border-black p-1 stroke-[1px]"
            size={24}
            color="#000"
          />
          <p className="ml-2">Perhitungan</p>
        </div>
        <div className="px-6 py-4 mt-10 ml-auto">
          <BsBoxArrowRight size={24} />
        </div>
      </div>
      <div className="bg-white h-screen w-full text-black flex flex-col">
        <div className="flex flex-col">
          <div className="flex justify-between px-4 py-2 bg-[#E6E6E6] rounded">
            <div className="flex items-center">
              <BsBook size={24} color="#000" />
              <p className="ml-2">Data Calon Penerima</p>
            </div>
            <div className="flex items-center">
              <BsPlusLg size={24} color="#000" />
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
                <tr>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    1
                  </td>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    0019102024
                  </td>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    Desi Fakhriyyah Sinaga
                  </td>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    Rp. 2.500.000
                  </td>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    5 orang
                  </td>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    95,50
                  </td>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    Mengontrak, tidak punya kendaraan
                  </td>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    900 VA
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
