"use client";

import { Fade as Hamburger } from "hamburger-react";
import { useState } from "react";
import {
  BsBook,
  BsBoxArrowRight,
  BsJournalText,
  BsPersonCircle,
  BsPlusSlashMinus,
} from "react-icons/bs";
export default function Form() {
  const [isOpen, setOpen] = useState(false);

  const [nisn, setNisn] = useState("");
  const [nama, setNama] = useState("");
  const [penghasilan, setPenghasilan] = useState("");
  const [tanggungan, setTanggungan] = useState("");
  const [nilai, setNilai] = useState("");
  const [rumah, setRumah] = useState("");
  const [listrik, setListrik] = useState("");

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
      <div className="bg-white h-screen text-black flex flex-col items-center">
        <div className="lg:w-1/3 flex flex-col">
          <p className="text-[#1684A7] font-bold mt-8 text-center">
            Biodata Calon Penerima
          </p>
          <p className="text-red-600 text-xs mt-6">Keterangan :</p>
          <p className="text-red-600 text-xs">*adalah field yang wajib diisi</p>
          <form className="mt-2">
            <div className="flex flex-col mt-4 text-xs">
              <label htmlFor="nisn">NISN</label>
              <input
                type="number"
                name="nisn"
                id="nisn"
                placeholder="0000000000"
                className="bg-[#D9D9D9] px-3 py-2"
              />
            </div>
            <div className="flex flex-col mt-4 text-xs">
              <label htmlFor="nama">Nama Siswa</label>
              <input
                type="text"
                name="nama"
                id="nama"
                placeholder="Marselino Marselino"
                className="bg-[#D9D9D9] px-3 py-2"
              />
            </div>
            <div className="flex flex-col mt-4 text-xs">
              <label htmlFor="penghasilan">Penghasilan Orang Tua</label>
              <select
                name="penghasilan"
                id="penghasilan"
                className="bg-[#D9D9D9] px-3 py-2"
              >
                <option value="1" className="bg-white">
                  ≥ Rp 5.000.001
                </option>
                <option value="2" className="bg-white">
                  Rp 3.500.001 - Rp 5.000.000
                </option>
                <option value="3" className="bg-white">
                  Rp 2.500.001 - Rp 3.500.000
                </option>
                <option value="4" className="bg-white">
                  Rp 1.500.001 - Rp 2.500.000
                </option>
                <option value="5" className="bg-white">
                  ≤ Rp 1.500.000
                </option>
              </select>
            </div>
            <div className="flex flex-col mt-4 text-xs">
              <label htmlFor="tanggungan">Jumlah Tanggungan Keluarga</label>
              <select
                name="tanggungan"
                id="tanggungan"
                className="bg-[#D9D9D9] px-3 py-2"
              >
                <option value="1" className="bg-white">
                  1 Orang
                </option>
                <option value="2" className="bg-white">
                  2 Orang
                </option>
                <option value="3" className="bg-white">
                  3 Orang
                </option>
                <option value="4" className="bg-white">
                  4 Orang
                </option>
                <option value="5" className="bg-white">
                  &gt; 4 Orang
                </option>
              </select>
            </div>
            <div className="flex flex-col mt-4 text-xs">
              <label htmlFor="nilai">Nilai Rata-rata Rapor SMA/SMK</label>
              <select
                name="nilai"
                id="nilai"
                className="bg-[#D9D9D9] px-3 py-2"
              >
                <option value="1" className="bg-white">
                  &lt; 75
                </option>
                <option value="2" className="bg-white">
                  75 - 79,99
                </option>
                <option value="3" className="bg-white">
                  80 - 84,99
                </option>
                <option value="4" className="bg-white">
                  85 - 89,99
                </option>
                <option value="5" className="bg-white">
                  ≥ 90
                </option>
              </select>
            </div>
            <div className="flex flex-col mt-4 text-xs">
              <label htmlFor="rumah">Kondisi Rumah dan Aset</label>
              <select
                name="rumah"
                id="rumah"
                className="bg-[#D9D9D9] px-3 py-2"
              >
                <option value="1" className="bg-white">
                  Rumah milik sendiri, punya mobil dan motor
                </option>
                <option value="2" className="bg-white">
                  Rumah milik sendiri, punya motor
                </option>
                <option value="3" className="bg-white">
                  Rumah warisan, tidak punya kendaraan
                </option>
                <option value="4" className="bg-white">
                  Mengontrak/Kos, tidak punya kendaraan
                </option>
                <option value="5" className="bg-white">
                  Menumpang (ikut saudara/kerabat), tidak punya kendaraan
                </option>
              </select>
            </div>
            <div className="flex flex-col mt-4 text-xs">
              <label htmlFor="listrik">Daya Listrik PLN</label>
              <select
                name="listrik"
                id="listrik"
                className="bg-[#D9D9D9] px-3 py-2"
              >
                <option value="1" className="bg-white">
                  &gt; 2200 VA
                </option>
                <option value="2" className="bg-white">
                  2200VA
                </option>
                <option value="3" className="bg-white">
                  1300 VA
                </option>
                <option value="4" className="bg-white">
                  900 VA
                </option>
                <option value="5" className="bg-white">
                  450 VA
                </option>
              </select>
            </div>
            <div className="flex justify-evenly my-6 text-sm">
              <button className="px-5 py-2 bg-[#09A599] text-white font-bold rounded">
                Submit
              </button>
              <button className="px-5 py-2 bg-[#EB0707] text-white font-bold rounded">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
