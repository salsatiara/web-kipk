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
                <label htmlFor="kode">Kode</label>
                <input
                  type="text"
                  name="kode"
                  id="kode"
                  placeholder="C1"
                  className="bg-[#D9D9D9] px-3 py-2"
                />
              </div>
              <div className="flex flex-col w-1/2 ml-2">
                <label htmlFor="kriteria">Kriteria</label>
                <input
                  type="text"
                  name="kriteria"
                  id="kriteria"
                  placeholder="Penghasilan Orang Tua"
                  className="bg-[#D9D9D9] px-3 py-2"
                />
              </div>
            </div>
            <p className="mt-4">Rentang Nilai</p>
            <div className="flex flex-col mt-2 text-xs">
              <label htmlFor="rentang1">Rentang 1</label>
              <input
                type="text"
                name="rentang1"
                id="rentang1"
                placeholder="Masukkan Rentang Nilai"
                className="bg-[#D9D9D9] px-3 py-2"
              />
            </div>
            <div className="flex flex-col mt-4 text-xs">
              <label htmlFor="bobot1">Bobot 1</label>
              <input
                type="number"
                name="bobot1"
                id="bobot1"
                placeholder="1"
                className="bg-[#D9D9D9] px-3 py-2"
              />
            </div>
            <div className="flex flex-col mt-4 text-xs">
              <label htmlFor="rentang2">Rentang 2</label>
              <input
                type="text"
                name="rentang2"
                id="rentang2"
                placeholder="Masukkan Rentang Nilai"
                className="bg-[#D9D9D9] px-3 py-2"
              />
            </div>
            <div className="flex flex-col mt-4 text-xs">
              <label htmlFor="bobot2">Bobot</label>
              <input
                type="number"
                name="bobot2"
                id="bobot2"
                placeholder="2"
                className="bg-[#D9D9D9] px-3 py-2"
              />
            </div>
            <div className="flex flex-col mt-4 text-xs">
              <label htmlFor="rentang3">Rentang 3</label>
              <input
                type="text"
                name="rentang3"
                id="rentang 3"
                placeholder="Masukkan Rentang Nilai"
                className="bg-[#D9D9D9] px-3 py-2"
              />
            </div>
            <div className="flex flex-col mt-4 text-xs">
              <label htmlFor="bobot3">Bobot 3</label>
              <input
                type="number"
                name="bobot3"
                id="bobot3"
                placeholder="3"
                className="bg-[#D9D9D9] px-3 py-2"
              />
            </div>
            <div className="flex flex-col mt-4 text-xs">
              <label htmlFor="rentang4">Rentang 4</label>
              <input
                type="text"
                name="rentang4"
                id="rentang4"
                placeholder="Masukkan Rentang Nilai"
                className="bg-[#D9D9D9] px-3 py-2"
              />
            </div>
            <div className="flex flex-col mt-4 text-xs">
              <label htmlFor="bobot4">Bobot 4</label>
              <input
                type="number"
                name="bobot4"
                id="bobot4"
                placeholder="4"
                className="bg-[#D9D9D9] px-3 py-2"
              />
            </div>
            <div className="flex flex-col mt-4 text-xs">
              <label htmlFor="rentang5">Rentang 5</label>
              <input
                type="text"
                name="rentang5"
                id="rentang5"
                placeholder="Masukkan Rentang Nilai"
                className="bg-[#D9D9D9] px-3 py-2"
              />
            </div>
            <div className="flex flex-col mt-4 text-xs">
              <label htmlFor="bobot5">Bobot 5</label>
              <input
                type="number"
                name="bobot5"
                id="bobot5"
                placeholder="5"
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
