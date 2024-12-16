"use client";

import Navbar from "@/components/Navbar";
import { AuthContext } from "@/services/storage";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useContext, useEffect, useState, Suspense } from "react";
import jwt from "jsonwebtoken";

interface PayloadToken {
  id: string;
  username: string;
  role: string;
  nisn: string;
  iat: number;
  exp: number;
}

export default function FormSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form />
    </Suspense>
  );
}

function Form() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = useContext(AuthContext);

  const id = searchParams.get("id") || "";
  const action = searchParams.get("action") || "tambah";

  const [nisn, setNisn] = useState(searchParams.get("nisn") || "");
  const [nama, setNama] = useState(searchParams.get("nama") || "");
  const [penghasilan, setPenghasilan] = useState(
    searchParams.get("penghasilan") || "5"
  );
  const [tanggungan, setTanggungan] = useState(
    searchParams.get("tanggungan") || "5"
  );
  const [nilai, setNilai] = useState(searchParams.get("nilai") || "5");
  const [rumah, setRumah] = useState(searchParams.get("rumah") || "5");
  const [listrik, setListrik] = useState(searchParams.get("listrik") || "5");

  async function refreshToken() {
    try {
      const response = await axios.post(
        "/api/auth/token",
        {},
        { withCredentials: true }
      );
      auth.setToken(response.data.accessToken);
      const decoded =
        (jwt.decode(response.data.accessToken) as PayloadToken) || null;
      if (decoded) {
        auth.setId(decoded.id);
        auth.setUsername(decoded.username);
        auth.setRole(decoded.role);
        auth.setNisn(decoded.nisn);
        auth.setExpire(decoded.exp);
        if (decoded.role !== "admin") {
          router.push("/dashboard-mahasiswa");
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        router.push("/login-admin");
      }
    }
  }

  async function tambahData(
    e: FormEvent,
    nisn: string,
    nama: string,
    penghasilan: string,
    tanggungan: string,
    nilai: string,
    rumah: string,
    listrik: string
  ) {
    try {
      e.preventDefault();
      await axios.post(
        "/api/alternatif/tambah",
        {
          nisn: nisn,
          nama: nama,
          penghasilan: penghasilan,
          jmlTanggungan: tanggungan,
          nilai: nilai,
          rumah: rumah,
          listrik: listrik,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      await router.push("/data-calon-penerima");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
    }
  }

  async function editData(
    e: FormEvent,
    id: string,
    nisn: string,
    nama: string,
    penghasilan: string,
    tanggungan: string,
    nilai: string,
    rumah: string,
    listrik: string
  ) {
    try {
      e.preventDefault();
      await axios.post(
        "/api/alternatif/edit",
        {
          id: id,
          nisn: nisn,
          nama: nama,
          penghasilan: penghasilan,
          jmlTanggungan: tanggungan,
          nilai: nilai,
          rumah: rumah,
          listrik: listrik,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      await router.push("/data-calon-penerima");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      }
    }
  }

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-white text-black flex flex-col items-center">
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
                type="text"
                name="nisn"
                id="nisn"
                placeholder="0000000000"
                className="bg-[#D9D9D9] px-3 py-2"
                value={nisn}
                onChange={(e) => setNisn(e.target.value.replace(/[^0-9]/g, ""))}
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
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-4 text-xs">
              <label htmlFor="penghasilan">Penghasilan Orang Tua</label>
              <select
                name="penghasilan"
                id="penghasilan"
                className="bg-[#D9D9D9] px-3 py-2"
                value={penghasilan}
                onChange={(e) => setPenghasilan(e.target.value)}
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
                value={tanggungan}
                onChange={(e) => setTanggungan(e.target.value)}
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
                value={nilai}
                onChange={(e) => setNilai(e.target.value)}
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
                value={rumah}
                onChange={(e) => setRumah(e.target.value)}
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
                value={listrik}
                onChange={(e) => setListrik(e.target.value)}
              >
                <option value="1" className="bg-white">
                  &gt; 2200 VA
                </option>
                <option value="2" className="bg-white">
                  2200 VA
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
              <button
                className="px-5 py-2 bg-[#09A599] text-white font-bold rounded"
                onClick={(e) =>
                  action === "tambah"
                    ? tambahData(
                        e,
                        nisn,
                        nama,
                        penghasilan,
                        tanggungan,
                        nilai,
                        rumah,
                        listrik
                      )
                    : editData(
                        e,
                        id,
                        nisn,
                        nama,
                        penghasilan,
                        tanggungan,
                        nilai,
                        rumah,
                        listrik
                      )
                }
              >
                Submit
              </button>
              <button
                className="px-5 py-2 bg-[#EB0707] text-white font-bold rounded"
                onClick={(e: FormEvent) => {
                  e.preventDefault();
                  setNisn("");
                  setNama("");
                  setPenghasilan("5");
                  setTanggungan("5");
                  setNilai("5");
                  setRumah("5");
                  setListrik("5");
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
