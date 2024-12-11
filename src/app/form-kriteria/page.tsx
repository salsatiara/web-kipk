"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Form() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id") || "";
  const action = searchParams.get("action") || "tambah";

  const [kode, setKode] = useState(searchParams.get("kode") || "");
  const [kriteria, setKriteria] = useState(searchParams.get("kriteria") || "");
  const [tipe, setTipe] = useState(searchParams.get("tipe") || "");
  const [bobot, setBobot] = useState(searchParams.get("bobot") || "");
  const [rentang1, setRentang1] = useState(searchParams.get("rentang1") || "");
  const [bobot1, setBobot1] = useState(searchParams.get("bobot1") || "");
  const [rentang2, setRentang2] = useState(searchParams.get("rentang2") || "");
  const [bobot2, setBobot2] = useState(searchParams.get("bobot2") || "");
  const [rentang3, setRentang3] = useState(searchParams.get("rentang3") || "");
  const [bobot3, setBobot3] = useState(searchParams.get("bobot3") || "");
  const [rentang4, setRentang4] = useState(searchParams.get("rentang4") || "");
  const [bobot4, setBobot4] = useState(searchParams.get("bobot4") || "");
  const [rentang5, setRentang5] = useState(searchParams.get("rentang5") || "");
  const [bobot5, setBobot5] = useState(searchParams.get("bobot5") || "");

  async function tambahData(
    e: FormEvent,
    kode: string,
    kriteria: string,
    tipe: string,
    bobot: number,
    rentang1: string,
    bobot1: string,
    rentang2: string,
    bobot2: string,
    rentang3: string,
    bobot3: string,
    rentang4: string,
    bobot4: string,
    rentang5: string,
    bobot5: string
  ) {
    try {
      e.preventDefault();
      await axios.post(
        "/api/kriteria/tambah",
        {
          kode: kode,
          kriteria: kriteria,
          tipe: tipe,
          bobot: bobot,
          rentang1: rentang1,
          bobot1: bobot1,
          rentang2: rentang2,
          bobot2: bobot2,
          rentang3: rentang3,
          bobot3: bobot3,
          rentang4: rentang4,
          bobot4: bobot4,
          rentang5: rentang5,
          bobot5: bobot5,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      await router.push("/data-kriteria");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
    }
  }

  async function editData(
    e: FormEvent,
    id: string,
    kode: string,
    kriteria: string,
    tipe: string,
    bobot: number,
    rentang1: string,
    bobot1: string,
    rentang2: string,
    bobot2: string,
    rentang3: string,
    bobot3: string,
    rentang4: string,
    bobot4: string,
    rentang5: string,
    bobot5: string
  ) {
    try {
      e.preventDefault();
      await axios.post(
        "/api/kriteria/edit",
        {
          id: id,
          kode: kode,
          kriteria: kriteria,
          tipe: tipe,
          bobot: bobot,
          rentang1: rentang1,
          bobot1: bobot1,
          rentang2: rentang2,
          bobot2: bobot2,
          rentang3: rentang3,
          bobot3: bobot3,
          rentang4: rentang4,
          bobot4: bobot4,
          rentang5: rentang5,
          bobot5: bobot5,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      await router.push("/data-kriteria");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
    }
  }

  return (
    <>
      <Navbar />
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
                  value={kode}
                  onChange={(e) => setKode(e.target.value)}
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
                  value={kriteria}
                  onChange={(e) => setKriteria(e.target.value)}
                />
              </div>
            </div>
            <div className="flex mt-4 text-xs">
              <div className="flex flex-col w-1/2 mr-2">
                <label htmlFor="tipe">Tipe</label>
                <input
                  type="text"
                  name="tipe"
                  id="tipe"
                  placeholder="COST"
                  className="bg-[#D9D9D9] px-3 py-2"
                  value={tipe}
                  onChange={(e) => setTipe(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-1/2 ml-2">
                <label htmlFor="bobot">Bobot Kriteria</label>
                <input
                  type="number"
                  name="bobot"
                  id="bobot"
                  placeholder="0.15"
                  className="bg-[#D9D9D9] px-3 py-2"
                  value={bobot}
                  onChange={(e) => setBobot(e.target.value)}
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
                value={rentang1}
                onChange={(e) => setRentang1(e.target.value)}
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
                value={bobot1}
                onChange={(e) => setBobot1(e.target.value)}
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
                value={rentang2}
                onChange={(e) => setRentang2(e.target.value)}
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
                value={bobot2}
                onChange={(e) => setBobot2(e.target.value)}
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
                value={rentang3}
                onChange={(e) => setRentang3(e.target.value)}
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
                value={bobot3}
                onChange={(e) => setBobot3(e.target.value)}
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
                value={rentang4}
                onChange={(e) => setRentang4(e.target.value)}
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
                value={bobot4}
                onChange={(e) => setBobot4(e.target.value)}
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
                value={rentang5}
                onChange={(e) => setRentang5(e.target.value)}
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
                value={bobot5}
                onChange={(e) => setBobot5(e.target.value)}
              />
            </div>
            <div className="flex justify-evenly my-6 text-sm">
              <button
                className="px-5 py-2 bg-[#09A599] text-white font-bold rounded"
                onClick={(e) =>
                  action === "tambah"
                    ? tambahData(
                        e,
                        kode,
                        kriteria,
                        tipe,
                        parseFloat(bobot),
                        rentang1,
                        bobot1,
                        rentang2,
                        bobot2,
                        rentang3,
                        bobot3,
                        rentang4,
                        bobot4,
                        rentang5,
                        bobot5
                      )
                    : editData(
                        e,
                        id,
                        kode,
                        kriteria,
                        tipe,
                        parseFloat(bobot),
                        rentang1,
                        bobot1,
                        rentang2,
                        bobot2,
                        rentang3,
                        bobot3,
                        rentang4,
                        bobot4,
                        rentang5,
                        bobot5
                      )
                }
              >
                Submit
              </button>
              <button
                className="px-5 py-2 bg-[#EB0707] text-white font-bold rounded"
                onClick={(e: FormEvent) => {
                  e.preventDefault();
                  setKode("");
                  setKriteria("");
                  setRentang1("");
                  setBobot1("");
                  setRentang2("");
                  setBobot2("");
                  setRentang3("");
                  setBobot3("");
                  setRentang4("");
                  setBobot4("");
                  setRentang5("");
                  setBobot5("");
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
