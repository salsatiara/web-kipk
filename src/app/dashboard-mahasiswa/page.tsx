"use client";

import Navbar from "@/components/Navbar";
import { AuthContext } from "@/services/storage";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Link from "next/link";
import Logo from "@/images/logo.png";
import Image from "next/image";

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

interface PayloadToken {
  id: string;
  username: string;
  role: string;
  nisn: string;
  iat: number;
  exp: number;
}

export default function Home() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const [mahasiswa, setMahasiswa] = useState<AlternatifType["data"]>([]);
  const [selamat, setSelamat] = useState("");
  const [pesan, setPesan] = useState("");

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
        if (decoded.role !== "mahasiswa") {
          router.push("/dashboard-admin");
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        router.push("/login-admin");
      }
    }
  }

  async function fetchData() {
    try {
      const response = await axios.get<AlternatifType>(
        "/api/alternatif?sort=tertinggi&limit=seleksi"
      );

      const mahasiswa = response.data.data.filter((item) => {
        return item.nisn == auth.nisn;
      });
      setMahasiswa(mahasiswa);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetcher() {
      await refreshToken();
      await fetchData();
    }
    fetcher();
  }, []);

  useEffect(() => {
    if (mahasiswa.length > 0) {
      setSelamat("SELAMAT!!");
      setPesan("ANDA DINYATAKAN LULUS DALAM SELEKSI BEASISWA KIP-KULIAH");
    } else {
      setSelamat("MOHON MAAF");
      setPesan(
        "ANDA BELUM DINYATAKAN LULUS DALAM SELEKSI BEASISWA KIP-KULIAH "
      );
    }
  }, [mahasiswa]);

  return (
    <>
      <Navbar />
      <div className="bg-white h-screen text-black flex flex-col items-center">
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex mx-auto justify-center px-4 py-6 bg-[#E6E6E6] rounded">
            <div className="w-1/3 flex gap-8">
              <div className="flex items-center">
                <Image
                  src={Logo}
                  className="w-32"
                  width={512}
                  height={512}
                  alt="Logo UNJ"
                />
              </div>
              <div
                className={`flex flex-col ${
                  mahasiswa.length < 1 ? "text-[#EB0707]" : "text-[#1684A7]"
                } font-bold`}
              >
                <p className="text-xl">{selamat}</p>
                <p className="text-sm">{pesan}</p>
              </div>
            </div>
          </div>
          <div className="mt-14 w-1/3 flex flex-col text-sm">
            <p>Nama</p>
            <div className="bg-[#E6E6E6] rounded-lg px-4 py-3">
              <p>
                {mahasiswa?.length < 1
                  ? "Anda tidak terdaftar"
                  : mahasiswa[0].nama}
              </p>
            </div>
            <p className="mt-8">NISN</p>
            <div className="bg-[#E6E6E6] rounded-lg px-4 py-3">
              <p>{auth.nisn}</p>
            </div>
            <div className="flex justify-start gap-4 mt-8">
              <p className="text-[#EB0707]">*</p>
              <p className="text-justify">
                Berdasarkan analisis Sistem Pendukung Keputusan (SPK) dengan
                metode TOPSIS, Anda berhasil mencapai skor preferensi tertinggi
                dengan memperlihatkan performa unggul dalam kriteria.
              </p>
            </div>
            <div className="mx-auto mt-8">
              <Link
                className="bg-[#09A599] text-white px-3 py-3 rounded"
                href="/perhitungan-topsis"
              >
                Lihat Perhitungan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
