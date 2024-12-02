"use client";

import Navbar from "@/components/Navbar";
import {
  BsCardChecklist,
  BsCircleFill,
  BsClipboardXFill,
  BsFillPeopleFill,
} from "react-icons/bs";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-white h-screen text-black flex flex-col items-center">
        <div className="lg:w-1/3 flex flex-col items-center">
          <div className="bg-[#E6E6E6] w-full rounded-lg mt-14 px-6 py-4">
            <p className="text-sm">Total Data Calon Penerima Beasiswa</p>
            <div className="flex items-center mt-1">
              <BsFillPeopleFill size={18} color="#09A599" />
              <p className="ml-4 font-semibold">100</p>
            </div>
            <p className="text-xs text-right">20 data baru</p>
          </div>
          <div className="bg-[#E6E6E6] w-full rounded-lg mt-14 px-6 py-4">
            <p className="text-sm">Kriteria Penilaian</p>
            <div className="flex items-center mt-1">
              <BsCardChecklist size={18} color="#09A599" />
              <p className="ml-4 font-semibold">5</p>
            </div>
            <p className="text-xs text-right">parameter seleksi</p>
          </div>
          <div className="bg-[#E6E6E6] w-full rounded-lg mt-14 px-6 py-4">
            <p className="text-sm">Status Penilaian</p>
            <div className="flex items-center mt-1">
              <BsClipboardXFill size={18} color="#09A599" />
              <p className="ml-4 font-semibold">83</p>
            </div>
            <p className="text-xs text-right">dari 100 mahasiswa</p>
          </div>
          <div className="bg-[#E6E6E6] w-full rounded-lg mt-14 px-6 py-4">
            <p className="text-sm">Aktivitas Terbaru</p>
            <div className="flex items-center mt-2">
              <BsCircleFill size={7} color="#09A599" />
              <p className="text-xs ml-4 ">Penambahan data mahasiswa baru</p>
              <p className="text-xs ml-auto">1m</p>
            </div>
            <div className="flex items-center mt-2">
              <BsCircleFill size={7} color="#09A599" />
              <p className="text-xs ml-4 ">Pembaruan kriteria penilaian</p>
              <p className="text-xs ml-auto">12m</p>
            </div>
            <div className="flex items-center mt-2">
              <BsCircleFill size={7} color="#09A599" />
              <p className="text-xs ml-4 ">
                Penghapusan data mahasiswa yang tidak memenuhi syarat
              </p>
              <p className="text-xs ml-auto">1j</p>
            </div>
            <div className="flex items-center mt-2">
              <BsCircleFill size={7} color="#09A599" />
              <p className="text-xs ml-4 ">Perhitungan batch 4 selesai</p>
              <p className="text-xs ml-auto">5j</p>
            </div>
            <div className="flex items-center mt-2">
              <BsCircleFill size={7} color="#09A599" />
              <p className="text-xs ml-4 ">Perhitungan batch 3 selesai</p>
              <p className="text-xs ml-auto">12j</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
