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
            Tambah Data Kriteria
          </p>
          <form className="mt-6">
            <div className="flex mt-4 text-xs">
              <div className="flex flex-col w-1/2 mr-2">
                <label htmlFor="nisn">NISN</label>
                <input
                  type="number"
                  name="nisn"
                  id="nisn"
                  placeholder="0000000000"
                  className="bg-[#D9D9D9] px-3 py-2"
                />
              </div>
              <div className="flex flex-col w-1/2 ml-2">
                <label htmlFor="nisn">NISN</label>
                <input
                  type="number"
                  name="nisn"
                  id="nisn"
                  placeholder="0000000000"
                  className="bg-[#D9D9D9] px-3 py-2"
                />
              </div>
            </div>
            <p className="mt-4">Rentang Nilai</p>
            <div className="flex flex-col mt-2 text-xs">
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
              <input
                type="number"
                name="penghasilan"
                id="penghasilan"
                placeholder="Rp 2.000.000"
                className="bg-[#D9D9D9] px-3 py-2"
              />
            </div>
            <div className="flex flex-col mt-4 text-xs">
              <label htmlFor="tanggungan">Jumlah Tanggungan Keluarga</label>
              <input
                type="number"
                name="tanggungan"
                id="tanggungan"
                placeholder="3 Orang"
                className="bg-[#D9D9D9] px-3 py-2"
              />
            </div>
            <div className="flex flex-col mt-4 text-xs">
              <label htmlFor="nilai">Nilai Rata-rata Rapor SMA/SMK</label>
              <input
                type="number"
                name="nilai"
                id="nilai"
                placeholder="88"
                className="bg-[#D9D9D9] px-3 py-2"
              />
            </div>
            <div className="flex flex-col mt-4 text-xs">
              <label htmlFor="aset">Kondisi Rumah dan Aset</label>
              <input
                type="text"
                name="aset"
                id="aset"
                placeholder="Rumah milik sendiri, punya motor"
                className="bg-[#D9D9D9] px-3 py-2"
              />
            </div>
            <div className="flex flex-col mt-4 text-xs">
              <label htmlFor="listrik">Daya Listrik PLN</label>
              <input
                type="number"
                name="listrik"
                id="listrik"
                placeholder="900 VA"
                className="bg-[#D9D9D9] px-3 py-2"
              />
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
