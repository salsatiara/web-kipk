"use client";

import { Fade as Hamburger } from "hamburger-react";
import { useState } from "react";
import {
  BsBook,
  BsBoxArrowRight,
  BsJournalText,
  BsPersonCircle,
  BsPlusLg,
  BsPlusSlashMinus,
} from "react-icons/bs";
export default function Form() {
  const [isOpen, setOpen] = useState(false);
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
        className={`flex flex-col top-12 left-0 fixed z-30 bg-[#CFE4EB] text-black duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-56"
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
      <div className="bg-white h-screen w-screen text-black flex flex-col items-center">
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
          <div>tiara mungil</div>
          <div className="overflow-x-scroll">
            <table className="border">
              <thead className="bg-[#1684A7]">
                <tr>
                  <th className="border px-3 py-2 whitespace-nowrap">No.</th>
                  <th className="border px-3 py-2 whitespace-nowrap">NISN</th>
                  <th className="border px-3 py-2 whitespace-nowrap">
                    Nama Siswa
                  </th>
                  <th className="border px-3 py-2 whitespace-nowrap">
                    Penghasilan Orang Tua
                  </th>
                  <th className="border px-3 py-2 whitespace-nowrap">
                    Jumlah Tanggungan Keluarga
                  </th>
                  <th className="border px-3 py-2 whitespace-nowrap">
                    Nilai Rata-rata Raport
                  </th>
                  <th className="border px-3 py-2 whitespace-nowrap">
                    Kondisi Rumah dan Aset
                  </th>
                  <th className="border px-3 py-2 whitespace-nowrap">
                    Daya Listrik PLN
                  </th>
                  <th className="border px-3 py-2 whitespace-nowrap">Aksi</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
