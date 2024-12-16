"use client";

import Navbar from "@/components/Navbar";
import kalkulasiJarak from "@/libs/kalkulasiJarak";
import kalkulasiSolusiIdeal from "@/libs/kalkulasiSolusiIdeal";
import { AuthContext } from "@/services/storage";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { BsPlusSlashMinus } from "react-icons/bs";
import jwt from "jsonwebtoken";

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

type SolusiIdeal = {
  positif: {
    penghasilan: number;
    jmlTanggungan: number;
    nilai: number;
    rumah: number;
    listrik: number;
  };
  negatif: {
    penghasilan: number;
    jmlTanggungan: number;
    nilai: number;
    rumah: number;
    listrik: number;
  };
};

export default function Page() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const [matriks, setMatriks] = useState<AlternatifType>();
  const [alternatif, setAlternatif] = useState<AlternatifType>();
  const [kriteria, setKriteria] = useState<KriteriaType>();
  const [solusiIdeal, setSolusiIdeal] = useState<SolusiIdeal>();

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
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        router.push("/login-admin");
      }
    }
  }

  async function fetchMatriks() {
    const response = await axios.get<AlternatifType>(
      "/api/bobot-ternormalisasi"
    );
    setMatriks(response.data);
  }
  async function fetchAlternatif() {
    const response = await axios.get<AlternatifType>("/api/alternatif");
    setAlternatif(response.data);
  }
  async function fetchKriteria() {
    const response = await axios.get<KriteriaType>("/api/kriteria");
    setKriteria(response.data);
  }

  async function updateAlternatif(alternatif: AlternatifType["data"]) {
    const response = await axios.post<AlternatifType>(
      "/api/alternatif/edit-all",
      {
        alternatif: JSON.stringify(alternatif),
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setAlternatif(response.data);
  }

  useEffect(() => {
    refreshToken();
    fetchMatriks();
    fetchAlternatif();
    fetchKriteria();
  }, []);

  useEffect(() => {
    if (matriks && kriteria) {
      setSolusiIdeal(kalkulasiSolusiIdeal(kriteria.data, matriks.data));
    }
  }, [matriks, kriteria]);

  useEffect(() => {
    async function kalkulasi() {
      if (solusiIdeal && alternatif && matriks) {
        const updatedAlternatif = kalkulasiJarak(
          alternatif.data,
          matriks.data,
          solusiIdeal
        );
        setAlternatif({ ...alternatif, data: updatedAlternatif });
      }
    }
    kalkulasi().then(() => {
      if (alternatif) {
        updateAlternatif(alternatif.data);
      }
    });
  }, [solusiIdeal]);

  return (
    <>
      <Navbar />
      <div className="bg-white h-screen text-black flex flex-col items-center">
        <div className="flex flex-col w-full">
          <div className="flex justify-between px-4 py-2 bg-[#E6E6E6] rounded">
            <div className="flex items-center">
              <BsPlusSlashMinus
                className="border-[1.7px] rounded border-black p-1 stroke-[1px]"
                size={24}
                color="#000"
              />
              <p className="ml-2">Perhitungan</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto w-full flex flex-col mt-16 px-16">
          <table className="border w-full">
            <thead className="bg-[#1684A7]">
              <tr>
                <th
                  className="border border-[#A3A3A3] bg-[#FFDF00] px-3 py-2 whitespace-nowrap font-medium text-sm"
                  colSpan={8}
                >
                  Solusi Ideal Positif dan Negatif
                </th>
              </tr>
              <tr>
                <th
                  className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm"
                  rowSpan={2}
                >
                  No.
                </th>
                <th
                  className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm"
                  rowSpan={2}
                  colSpan={2}
                >
                  Nama
                </th>
                <th
                  className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm"
                  colSpan={5}
                >
                  Kriteria
                </th>
              </tr>
              <tr>
                <th className="border border-[#A3A3A3] px-10 py-2 whitespace-nowrap font-medium text-sm">
                  C1
                </th>
                <th className="border border-[#A3A3A3] px-10 py-2 whitespace-nowrap font-medium text-sm">
                  C2
                </th>
                <th className="border border-[#A3A3A3] px-10 py-2 whitespace-nowrap font-medium text-sm">
                  C3
                </th>
                <th className="border border-[#A3A3A3] px-10 py-2 whitespace-nowrap font-medium text-sm">
                  C4
                </th>
                <th className="border border-[#A3A3A3] px-10 py-2 whitespace-nowrap font-medium text-sm">
                  C5
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                  1
                </td>
                <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                  Solusi Ideal Positif
                </td>
                <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                  A+
                </td>
                <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                  {solusiIdeal?.positif.penghasilan.toFixed(5)}
                </td>
                <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                  {solusiIdeal?.positif.jmlTanggungan.toFixed(5)}
                </td>
                <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                  {solusiIdeal?.positif.nilai.toFixed(5)}
                </td>
                <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                  {solusiIdeal?.positif.rumah.toFixed(5)}
                </td>
                <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                  {solusiIdeal?.positif.listrik.toFixed(5)}
                </td>
              </tr>
              <tr>
                <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                  2
                </td>
                <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                  Solusi Ideal Negatif
                </td>
                <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                  A-
                </td>
                <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                  {solusiIdeal?.negatif.penghasilan.toFixed(5)}
                </td>
                <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                  {solusiIdeal?.negatif.jmlTanggungan.toFixed(5)}
                </td>
                <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                  {solusiIdeal?.negatif.nilai.toFixed(5)}
                </td>
                <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                  {solusiIdeal?.negatif.rumah.toFixed(5)}
                </td>
                <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                  {solusiIdeal?.negatif.listrik.toFixed(5)}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="border w-full mt-16">
            <thead className="bg-[#1684A7]">
              <tr>
                <th
                  className="border border-[#A3A3A3] bg-[#FFDF00] px-3 py-2 whitespace-nowrap font-medium text-sm"
                  colSpan={5}
                >
                  Jarak Solusi Ideal Positif dan Negatif
                </th>
              </tr>
              <tr>
                <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                  No.
                </th>
                <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                  Nama
                </th>
                <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                  Alternatif
                </th>
                <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                  D+
                </th>
                <th className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap font-medium text-sm">
                  D-
                </th>
              </tr>
            </thead>
            <tbody>
              {alternatif?.data.map((item, index) => (
                <tr key={index}>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    {index + 1}
                  </td>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    {item.nama}
                  </td>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    A{index + 1}
                  </td>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    {item.jarakPositif.toFixed(5) || 0}
                  </td>
                  <td className="border border-[#A3A3A3] px-3 py-2 whitespace-nowrap text-sm text-center">
                    {item.jarakNegatif.toFixed(5) || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
