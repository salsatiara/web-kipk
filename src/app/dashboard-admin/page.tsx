"use client";

import Navbar from "@/components/Navbar";
import { AuthContext } from "@/services/storage";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import {
  BsCardChecklist,
  BsCircleFill,
  BsFillPeopleFill,
} from "react-icons/bs";
import kalkulasiWaktu from "@/libs/kalkulasiWaktu";

interface PayloadToken {
  id: string;
  username: string;
  role: string;
  nisn: string;
  iat: number;
  exp: number;
}

type AlternatifType = {
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
    jarakPositif: number;
    jarakNegatif: number;
    preferensi: number;
  }[];
};

type KriteriaType = {
  status: string;
  message: string;
  data: {
    id: number;
    kode: string;
    kriteria: string;
    tipe: string;
    bobot: number;
    rentang1: string;
    bobot1: number;
    rentang2: string;
    bobot2: number;
    rentang3: string;
    bobot3: number;
    rentang4: string;
    bobot4: number;
    rentang5: string;
    bobot5: number;
  }[];
};

type AktivitasType = {
  status: string;
  message: string;
  data: {
    id: number;
    pesan: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

export default function Home() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const [alternatif, setAlternatif] = useState<AlternatifType>();
  const [kriteria, setKriteria] = useState<KriteriaType>();
  const [aktivitas, setAktivitas] = useState<AktivitasType>();

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

  async function fetchAlternatif() {
    const response = await axios.get<AlternatifType>("/api/alternatif");
    setAlternatif(response.data);
  }
  async function fetchKriteria() {
    const response = await axios.get<KriteriaType>("/api/kriteria");
    setKriteria(response.data);
  }
  async function fetchAktivitas() {
    const response = await axios.get<AktivitasType>("/api/aktivitas");
    setAktivitas(response.data);
  }

  useEffect(() => {
    async function fetcher() {
      await refreshToken();
      await fetchAlternatif();
      await fetchKriteria();
      await fetchAktivitas();
    }
    fetcher();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-white h-screen text-black flex flex-col items-center">
        <div className="lg:w-1/3 flex flex-col items-center">
          <div className="bg-[#E6E6E6] w-full rounded-lg mt-14 px-6 py-4">
            <p className="text-sm">Total Data Calon Penerima Beasiswa</p>
            <div className="flex items-center mt-1">
              <BsFillPeopleFill size={18} color="#09A599" />
              <p className="ml-4 font-semibold">{alternatif?.data.length}</p>
            </div>
            <p className="text-xs text-right">3 data baru</p>
          </div>
          <div className="bg-[#E6E6E6] w-full rounded-lg mt-14 px-6 py-4">
            <p className="text-sm">Kriteria Penilaian</p>
            <div className="flex items-center mt-1">
              <BsCardChecklist size={18} color="#09A599" />
              <p className="ml-4 font-semibold">{kriteria?.data.length}</p>
            </div>
            <p className="text-xs text-right">parameter seleksi</p>
          </div>

          <div className="bg-[#E6E6E6] w-full rounded-lg mt-14 px-6 py-4">
            <p className="text-sm">Aktivitas Terbaru</p>
            {aktivitas?.data.map((item, index) => (
              <div className="flex items-center mt-2" key={index}>
                <BsCircleFill size={7} color="#09A599" />
                <p className="text-xs ml-4 ">{item.pesan}</p>
                <p className="text-xs ml-auto">
                  {kalkulasiWaktu(item.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
